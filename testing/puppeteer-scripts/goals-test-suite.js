const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class GoalsPageTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.testResults = [];
    this.issues = [];
    this.baseUrl = 'http://localhost:3001';
  }

  async setup() {
    console.log('🚀 Setting up test environment...');
    this.browser = await puppeteer.launch({
      headless: false, // Set to true for CI/CD
      slowMo: 100, // Add delay for better visibility
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: 1200, height: 800 });
    
    // Listen for console errors
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('❌ Console Error:', msg.text());
        this.addIssue('Console Error', msg.text(), 'high');
      }
    });
    
    // Listen for page errors
    this.page.on('pageerror', error => {
      console.log('❌ Page Error:', error.message);
      this.addIssue('Page Error', error.message, 'high');
    });
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
    await this.generateReport();
  }

  addIssue(title, description, priority = 'medium', test = '') {
    this.issues.push({
      title,
      description,
      priority,
      test,
      timestamp: new Date().toISOString()
    });
  }

  async waitForElement(selector, timeout = 5000) {
    try {
      await this.page.waitForSelector(selector, { timeout });
      return true;
    } catch (error) {
      this.addIssue(
        `Element not found: ${selector}`,
        `Element "${selector}" was not found within ${timeout}ms`,
        'high'
      );
      return false;
    }
  }

  async navigateAndLogin() {
    console.log('📍 Navigating to Goals page...');
    try {
      await this.page.goto(`${this.baseUrl}/goals`, { waitUntil: 'networkidle0' });
      
      // Check if redirected to login
      const currentUrl = this.page.url();
      if (currentUrl.includes('/login') || currentUrl.includes('/signin')) {
        console.log('🔐 Login required - handling authentication...');
        // Add your login logic here
        // await this.handleLogin();
        this.addIssue(
          'Login Required',
          'User was redirected to login page - manual authentication needed',
          'medium'
        );
        return false;
      }
      
      await this.page.waitForLoadState('networkidle');
      return true;
    } catch (error) {
      this.addIssue('Navigation Failed', `Failed to navigate to goals page: ${error.message}`, 'high');
      return false;
    }
  }

  // TEST 1: Page Load and Initial State
  async testPageLoadAndInitialState() {
    console.log('🧪 Test 1: Page Load and Initial State');
    
    // Check Goals heading
    const headingExists = await this.waitForElement('h1, h2, h3');
    if (headingExists) {
      const headingText = await this.page.$eval('h1, h2, h3', el => el.textContent);
      if (!headingText.toLowerCase().includes('goals')) {
        this.addIssue('Missing Goals Heading', 'Goals heading not found on page', 'medium', 'Test 1');
      }
    }

    // Check New Goal button
    const newGoalButton = await this.page.$('[data-testid="new-goal-button"], button:has-text("New Goal"), button[aria-label*="New Goal"]');
    if (!newGoalButton) {
      this.addIssue('Missing New Goal Button', 'New Goal button not found', 'high', 'Test 1');
    } else {
      const isClickable = await this.page.evaluate(el => !el.disabled, newGoalButton);
      if (!isClickable) {
        this.addIssue('New Goal Button Disabled', 'New Goal button is not clickable', 'medium', 'Test 1');
      }
    }

    // Check goals list or empty state
    const goalsList = await this.page.$('[data-testid="goals-list"], .goals-container, .goals-grid');
    if (!goalsList) {
      this.addIssue('Missing Goals Container', 'Goals list container not found', 'high', 'Test 1');
    }
  }

  // TEST 2: Create New Goal - Basic Flow
  async testCreateNewGoalBasicFlow() {
    console.log('🧪 Test 2: Create New Goal - Basic Flow');
    
    try {
      // Click New Goal button
      const newGoalButton = await this.page.$('button:has-text("New Goal"), [data-testid="new-goal-button"]');
      if (newGoalButton) {
        await newGoalButton.click();
        
        // Wait for modal
        const modalExists = await this.waitForElement('[role="dialog"], .modal, [data-testid="goal-modal"]');
        if (!modalExists) {
          this.addIssue('Modal Not Opening', 'New Goal modal did not open after clicking button', 'high', 'Test 2');
          return;
        }

        // Check modal title
        const modalTitle = await this.page.$eval('[role="dialog"] h1, [role="dialog"] h2, .modal h1, .modal h2', el => el.textContent.trim()).catch(() => '');
        if (!modalTitle.toLowerCase().includes('create') || !modalTitle.toLowerCase().includes('goal')) {
          this.addIssue('Incorrect Modal Title', `Modal title "${modalTitle}" doesn't match expected "Create New Goal"`, 'medium', 'Test 2');
        }

        // Fill form fields
        await this.fillGoalForm({
          name: 'Test Goal 1',
          type: 'Strength',
          targetValue: '225',
          currentValue: '185'
        });

        // Submit form
        const createButton = await this.page.$('button:has-text("Create Goal"), button:has-text("Create"), [data-testid="create-goal-button"]');
        if (createButton) {
          await createButton.click();
          
          // Wait for modal to close
          await this.page.waitForSelector('[role="dialog"], .modal', { state: 'hidden', timeout: 3000 }).catch(() => {
            this.addIssue('Modal Not Closing', 'Modal did not close after creating goal', 'medium', 'Test 2');
          });
          
          // Check if goal appears in list
          await this.page.waitForTimeout(1000); // Allow time for goal to appear
          const goalExists = await this.page.$('text="Test Goal 1"');
          if (!goalExists) {
            this.addIssue('Goal Not Created', 'New goal does not appear in goals list after creation', 'high', 'Test 2');
          }
        } else {
          this.addIssue('Missing Create Button', 'Create Goal button not found in modal', 'high', 'Test 2');
        }
      }
    } catch (error) {
      this.addIssue('Goal Creation Failed', `Error during goal creation: ${error.message}`, 'high', 'Test 2');
    }
  }

  async fillGoalForm(data) {
    // Goal Name
    const nameInput = await this.page.$('input[name="name"], input[placeholder*="name"], [data-testid="goal-name"]');
    if (nameInput) {
      await nameInput.fill(data.name);
    } else {
      this.addIssue('Missing Name Input', 'Goal name input field not found', 'high');
    }

    // Goal Type
    if (data.type) {
      const typeButton = await this.page.$(`button:has-text("${data.type}"), [data-value="${data.type}"]`);
      if (typeButton) {
        await typeButton.click();
      } else {
        this.addIssue(`Missing Goal Type: ${data.type}`, `Goal type "${data.type}" option not found`, 'medium');
      }
    }

    // Target Value
    if (data.targetValue) {
      const targetInput = await this.page.$('input[name="target"], input[placeholder*="target"], [data-testid="target-value"]');
      if (targetInput) {
        await targetInput.fill(data.targetValue);
      } else {
        this.addIssue('Missing Target Input', 'Target value input not found', 'high');
      }
    }

    // Current Value
    if (data.currentValue) {
      const currentInput = await this.page.$('input[name="current"], input[placeholder*="current"], [data-testid="current-value"]');
      if (currentInput) {
        await currentInput.fill(data.currentValue);
      } else {
        this.addIssue('Missing Current Input', 'Current value input not found', 'high');
      }
    }
  }

  // TEST 3: Form Validation
  async testFormValidation() {
    console.log('🧪 Test 3: Create Goal - Form Validation');
    
    try {
      // Open new goal modal
      const newGoalButton = await this.page.$('button:has-text("New Goal")');
      if (newGoalButton) {
        await newGoalButton.click();
        await this.waitForElement('[role="dialog"], .modal');

        // Try to submit empty form
        const createButton = await this.page.$('button:has-text("Create Goal"), button:has-text("Create")');
        if (createButton) {
          await createButton.click();
          
          // Check for validation errors
          const errorElements = await this.page.$$('.error, .invalid, [role="alert"]');
          if (errorElements.length === 0) {
            this.addIssue('Missing Form Validation', 'Empty form submission should show validation errors', 'high', 'Test 3');
          }
        }

        // Test partial form (name only)
        await this.fillGoalForm({ name: 'Invalid Goal' });
        await createButton.click();
        
        // Should still show validation errors for missing required fields
        const stillHasErrors = await this.page.$('.error, .invalid, [role="alert"]');
        if (!stillHasErrors) {
          this.addIssue('Incomplete Validation', 'Form should validate all required fields', 'medium', 'Test 3');
        }

        // Test cancel button
        const cancelButton = await this.page.$('button:has-text("Cancel"), [data-testid="cancel-button"]');
        if (cancelButton) {
          await cancelButton.click();
          
          // Check modal closes
          const modalClosed = await this.page.waitForSelector('[role="dialog"], .modal', { state: 'hidden', timeout: 2000 }).catch(() => false);
          if (!modalClosed) {
            this.addIssue('Cancel Button Not Working', 'Cancel button does not close modal', 'medium', 'Test 3');
          }
        } else {
          this.addIssue('Missing Cancel Button', 'Cancel button not found in modal', 'medium', 'Test 3');
        }
      }
    } catch (error) {
      this.addIssue('Form Validation Test Failed', `Error testing form validation: ${error.message}`, 'medium', 'Test 3');
    }
  }

  // TEST 4: Goal Type Selection
  async testGoalTypeSelection() {
    console.log('🧪 Test 4: Goal Type Selection');
    
    try {
      // Open modal
      const newGoalButton = await this.page.$('button:has-text("New Goal")');
      await newGoalButton.click();
      await this.waitForElement('[role="dialog"], .modal');

      const goalTypes = [
        { type: 'Strength', expectedUnit: 'lbs' },
        { type: 'Endurance', expectedUnit: 'minutes' },
        { type: 'Weight Loss', expectedUnit: 'lbs' },
        { type: 'Consistency', expectedUnit: 'sessions' }
      ];

      for (const { type, expectedUnit } of goalTypes) {
        const typeButton = await this.page.$(`button:has-text("${type}")`);
        if (typeButton) {
          await typeButton.click();
          
          // Check if unit changes
          await this.page.waitForTimeout(500); // Allow time for unit to update
          const unitText = await this.page.$eval('text="lbs", text="minutes", text="sessions"', el => el.textContent).catch(() => '');
          
          if (!unitText.includes(expectedUnit)) {
            this.addIssue(
              `Goal Type Unit Mismatch`, 
              `Selecting "${type}" should set unit to "${expectedUnit}", but got "${unitText}"`, 
              'medium', 
              'Test 4'
            );
          }

          // Check visual highlighting
          const isHighlighted = await this.page.evaluate((button) => {
            const styles = window.getComputedStyle(button);
            return styles.backgroundColor !== 'rgba(0, 0, 0, 0)' || button.classList.contains('selected') || button.classList.contains('active');
          }, typeButton);
          
          if (!isHighlighted) {
            this.addIssue(
              `Goal Type Not Highlighted`, 
              `"${type}" button should be visually highlighted when selected`, 
              'low', 
              'Test 4'
            );
          }
        } else {
          this.addIssue(`Missing Goal Type: ${type}`, `Goal type "${type}" button not found`, 'medium', 'Test 4');
        }
      }

      // Close modal
      const cancelButton = await this.page.$('button:has-text("Cancel")');
      if (cancelButton) await cancelButton.click();
    } catch (error) {
      this.addIssue('Goal Type Selection Test Failed', `Error testing goal type selection: ${error.message}`, 'medium', 'Test 4');
    }
  }

  // TEST 5: Exercise Selection (Strength Goals)
  async testExerciseSelection() {
    console.log('🧪 Test 5: Exercise Selection (Strength Goals)');
    
    try {
      const newGoalButton = await this.page.$('button:has-text("New Goal")');
      await newGoalButton.click();
      await this.waitForElement('[role="dialog"], .modal');

      // Select Strength goal type
      const strengthButton = await this.page.$('button:has-text("Strength")');
      if (strengthButton) {
        await strengthButton.click();
        
        // Check if Exercise dropdown appears
        const exerciseDropdown = await this.waitForElement('select[name="exercise"], [data-testid="exercise-select"]', 2000);
        if (!exerciseDropdown) {
          this.addIssue('Missing Exercise Dropdown', 'Exercise dropdown should appear when Strength is selected', 'medium', 'Test 5');
        } else {
          // Click dropdown to open options
          await this.page.click('select[name="exercise"], [data-testid="exercise-select"]');
          
          // Check for "No specific exercise" option
          const noExerciseOption = await this.page.$('option:has-text("No specific exercise")');
          if (!noExerciseOption) {
            this.addIssue('Missing No Exercise Option', '"No specific exercise" option not found in dropdown', 'low', 'Test 5');
          }
          
          // Select an option
          const options = await this.page.$$('option');
          if (options.length > 1) {
            await this.page.selectOption('select[name="exercise"], [data-testid="exercise-select"]', { index: 1 });
          } else {
            this.addIssue('Empty Exercise Dropdown', 'Exercise dropdown has no options', 'medium', 'Test 5');
          }
        }
      }

      const cancelButton = await this.page.$('button:has-text("Cancel")');
      if (cancelButton) await cancelButton.click();
    } catch (error) {
      this.addIssue('Exercise Selection Test Failed', `Error testing exercise selection: ${error.message}`, 'medium', 'Test 5');
    }
  }

  // Add remaining test methods following the same pattern...
  // TEST 6-17 would follow similar implementation patterns

  async runAllTests() {
    console.log('🎯 Starting Goals Page Test Suite...\n');
    
    try {
      await this.setup();
      
      const navigationSuccess = await this.navigateAndLogin();
      if (!navigationSuccess) {
        console.log('❌ Cannot proceed without successful navigation');
        return;
      }

      // Run all tests
      await this.testPageLoadAndInitialState();
      await this.testCreateNewGoalBasicFlow();
      await this.testFormValidation();
      await this.testGoalTypeSelection();
      await this.testExerciseSelection();
      
      // Add calls to remaining tests here...
      
    } catch (error) {
      console.error('❌ Test suite failed:', error);
      this.addIssue('Test Suite Error', `Test suite crashed: ${error.message}`, 'high');
    } finally {
      await this.cleanup();
    }
  }

  async generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      totalIssues: this.issues.length,
      issuesByPriority: {
        high: this.issues.filter(i => i.priority === 'high').length,
        medium: this.issues.filter(i => i.priority === 'medium').length,
        low: this.issues.filter(i => i.priority === 'low').length
      },
      issues: this.issues
    };

    console.log('\n📊 TEST RESULTS SUMMARY');
    console.log('========================');
    console.log(`Total Issues Found: ${report.totalIssues}`);
    console.log(`High Priority: ${report.issuesByPriority.high}`);
    console.log(`Medium Priority: ${report.issuesByPriority.medium}`);
    console.log(`Low Priority: ${report.issuesByPriority.low}`);

    if (this.issues.length > 0) {
      console.log('\n🐛 ISSUES FOUND:');
      console.log('================');
      
      ['high', 'medium', 'low'].forEach(priority => {
        const priorityIssues = this.issues.filter(i => i.priority === priority);
        if (priorityIssues.length > 0) {
          console.log(`\n${priority.toUpperCase()} PRIORITY (${priorityIssues.length}):`);
          priorityIssues.forEach((issue, index) => {
            console.log(`${index + 1}. ${issue.title}`);
            console.log(`   Description: ${issue.description}`);
            if (issue.test) console.log(`   Test: ${issue.test}`);
            console.log('');
          });
        }
      });
    }

    // Save detailed report to file
    const reportPath = path.join(process.cwd(), 'goals-test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
  }
}

// Usage
async function runGoalsTests() {
  const tester = new GoalsPageTester();
  await tester.runAllTests();
}

// Export for use in other files
module.exports = { GoalsPageTester, runGoalsTests };

// Run if called directly
if (require.main === module) {
  runGoalsTests().catch(console.error);
}