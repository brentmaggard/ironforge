#!/usr/bin/env node

/**
 * Comprehensive Puppeteer Test Suite for Goals Page Functionality
 * Tests the Goals page at http://localhost:3001/goals
 */

const puppeteer = require('puppeteer');

class GoalsPageTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.testResults = [];
    this.baseUrl = 'http://localhost:3001';
    this.testGoals = []; // Track created test goals for cleanup
  }

  async init() {
    console.log('🚀 Launching browser...');
    const headless = process.env.HEADLESS === 'true' || process.env.CI === 'true';
    console.log(`Mode: ${headless ? 'Headless' : 'Visible'}`);
    
    this.browser = await puppeteer.launch({
      headless: headless,
      defaultViewport: { width: 1280, height: 720 },
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    this.page = await this.browser.newPage();
    
    // Set up error tracking
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.log('❌ Console Error:', msg.text());
      }
    });

    this.page.on('pageerror', (error) => {
      console.log('❌ Page Error:', error.message);
    });
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  logResult(testName, passed, message = '') {
    const result = {
      test: testName,
      passed,
      message,
      timestamp: new Date().toISOString()
    };
    this.testResults.push(result);
    
    const status = passed ? '✅' : '❌';
    console.log(`${status} ${testName}${message ? ': ' + message : ''}`);
    
    return passed;
  }

  async navigateToGoals() {
    console.log('\n📍 Navigating to Goals page...');
    try {
      await this.page.goto(`${this.baseUrl}/goals`, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });
      return true;
    } catch (error) {
      this.logResult('Navigation', false, `Failed to load page: ${error.message}`);
      return false;
    }
  }

  async handleAuthentication() {
    console.log('\n🔐 Checking authentication...');
    try {
      // Check if redirected to login
      const currentUrl = this.page.url();
      if (currentUrl.includes('/login')) {
        this.logResult('Authentication Check', false, 'Redirected to login - manual authentication required');
        console.log('⚠️  Please log in manually and then re-run the tests');
        return false;
      }
      
      this.logResult('Authentication Check', true, 'User appears to be logged in');
      return true;
    } catch (error) {
      this.logResult('Authentication Check', false, error.message);
      return false;
    }
  }

  async waitForPageLoad() {
    console.log('\n⏳ Waiting for page to fully load...');
    try {
      // Wait for main elements to be present
      await this.page.waitForSelector('h1', { timeout: 10000 });
      await this.page.waitForTimeout(2000); // Allow for dynamic content
      return this.logResult('Page Load', true);
    } catch (error) {
      return this.logResult('Page Load', false, error.message);
    }
  }

  // Test 1: Page Load and Initial State
  async testPageLoadAndInitialState() {
    console.log('\n🧪 Test 1: Page Load and Initial State');
    
    try {
      // Check Goals heading
      const heading = await this.page.$('h1');
      const headingText = heading ? await this.page.evaluate(el => el.textContent, heading) : '';
      if (!headingText.includes('Goals')) {
        return this.logResult('Goals Heading', false, `Expected "Goals", got "${headingText}"`);
      }
      this.logResult('Goals Heading', true);

      // Check New Goal button
      const newGoalButton = await this.page.$('button:has-text("New Goal"), button[aria-label*="New Goal"], button:contains("New Goal")');
      if (!newGoalButton) {
        // Try alternative selector
        const buttons = await this.page.$$('button');
        let foundNewGoalButton = false;
        for (const button of buttons) {
          const text = await this.page.evaluate(el => el.textContent, button);
          if (text && text.includes('New Goal')) {
            foundNewGoalButton = true;
            break;
          }
        }
        if (!foundNewGoalButton) {
          return this.logResult('New Goal Button', false, 'Button not found');
        }
      }
      this.logResult('New Goal Button', true);

      // Check for goals list or empty state
      const goalsList = await this.page.$('[class*="goal"], [data-testid="goals-list"], .space-y-4');
      const emptyState = await this.page.$('text="No goals yet", text="Create your first goal"');
      
      if (goalsList || emptyState) {
        this.logResult('Goals List/Empty State', true);
      } else {
        this.logResult('Goals List/Empty State', false, 'Neither goals list nor empty state found');
      }

      return true;
    } catch (error) {
      return this.logResult('Page Load Test', false, error.message);
    }
  }

  // Test 2: Create New Goal - Basic Flow
  async testCreateNewGoalBasicFlow() {
    console.log('\n🧪 Test 2: Create New Goal - Basic Flow');
    
    try {
      // Click New Goal button
      const buttons = await this.page.$$('button');
      let newGoalButton = null;
      for (const button of buttons) {
        const text = await this.page.evaluate(el => el.textContent, button);
        if (text && text.includes('New Goal')) {
          newGoalButton = button;
          break;
        }
      }
      
      if (!newGoalButton) {
        return this.logResult('Click New Goal Button', false, 'Button not found');
      }
      
      await newGoalButton.click();
      await this.page.waitForTimeout(1000);
      this.logResult('Click New Goal Button', true);

      // Verify modal opens
      const modal = await this.page.$('[class*="modal"], [class*="dialog"], .fixed.inset-0');
      if (!modal) {
        return this.logResult('Modal Opens', false, 'Modal not found');
      }
      this.logResult('Modal Opens', true);

      // Check for "Create New Goal" title
      const modalTitle = await this.page.$('h2, h3');
      const titleText = modalTitle ? await this.page.evaluate(el => el.textContent, modalTitle) : '';
      if (!titleText.includes('Create New Goal')) {
        this.logResult('Modal Title', false, `Expected "Create New Goal", got "${titleText}"`);
      } else {
        this.logResult('Modal Title', true);
      }

      // Fill in Goal Name
      const nameInput = await this.page.$('#name, input[name="name"], input[placeholder*="goal"]');
      if (nameInput) {
        await nameInput.click();
        await nameInput.type('Test Goal 1');
        this.logResult('Fill Goal Name', true);
      } else {
        return this.logResult('Fill Goal Name', false, 'Name input not found');
      }

      // Select Goal Type: "Strength"
      const strengthButton = await this.page.$('button:has-text("Strength"), button[aria-label*="Strength"]');
      if (strengthButton) {
        await strengthButton.click();
        await this.page.waitForTimeout(500);
        this.logResult('Select Strength Type', true);
      } else {
        // Try finding by text content
        const buttons = await this.page.$$('button');
        let found = false;
        for (const button of buttons) {
          const text = await this.page.evaluate(el => el.textContent, button);
          if (text && text.includes('Strength')) {
            await button.click();
            found = true;
            break;
          }
        }
        if (!found) {
          return this.logResult('Select Strength Type', false, 'Strength button not found');
        }
        this.logResult('Select Strength Type', true);
      }

      // Fill Target Value
      const targetInput = await this.page.$('#target_value, input[name="target_value"]');
      if (targetInput) {
        await targetInput.click();
        await targetInput.type('225');
        this.logResult('Fill Target Value', true);
      } else {
        return this.logResult('Fill Target Value', false, 'Target value input not found');
      }

      // Fill Current Value
      const currentInput = await this.page.$('#current_value, input[name="current_value"]');
      if (currentInput) {
        await currentInput.click();
        await currentInput.type('185');
        this.logResult('Fill Current Value', true);
      } else {
        return this.logResult('Fill Current Value', false, 'Current value input not found');
      }

      // Verify unit defaults to "lbs" (should happen automatically)
      const unitSelect = await this.page.$('select[name="unit"], [role="combobox"]');
      if (unitSelect) {
        const unitValue = await this.page.evaluate(el => el.value || el.textContent, unitSelect);
        if (unitValue && unitValue.includes('lbs')) {
          this.logResult('Unit Defaults to lbs', true);
        } else {
          this.logResult('Unit Defaults to lbs', false, `Unit is "${unitValue}"`);
        }
      } else {
        this.logResult('Unit Defaults to lbs', false, 'Unit selector not found');
      }

      // Click Create Goal button
      const createButtons = await this.page.$$('button');
      let createButton = null;
      for (const button of createButtons) {
        const text = await this.page.evaluate(el => el.textContent, button);
        if (text && text.includes('Create Goal')) {
          createButton = button;
          break;
        }
      }
      
      if (createButton) {
        await createButton.click();
        await this.page.waitForTimeout(2000);
        this.logResult('Click Create Goal', true);
        
        // Track this goal for cleanup
        this.testGoals.push('Test Goal 1');
      } else {
        return this.logResult('Click Create Goal', false, 'Create button not found');
      }

      // Verify modal closes
      await this.page.waitForTimeout(1000);
      const modalAfter = await this.page.$('[class*="modal"], [class*="dialog"], .fixed.inset-0');
      if (!modalAfter) {
        this.logResult('Modal Closes', true);
      } else {
        this.logResult('Modal Closes', false, 'Modal still visible');
      }

      // Verify new goal appears in list
      const goalText = await this.page.evaluate(() => document.body.textContent);
      if (goalText.includes('Test Goal 1')) {
        this.logResult('Goal Appears in List', true);
      } else {
        this.logResult('Goal Appears in List', false, 'Goal not found in page content');
      }

      return true;
    } catch (error) {
      return this.logResult('Create Goal Basic Flow', false, error.message);
    }
  }

  // Test 3: Create Goal - Form Validation
  async testCreateGoalFormValidation() {
    console.log('\n🧪 Test 3: Create Goal - Form Validation');
    
    try {
      // Open New Goal form
      const buttons = await this.page.$$('button');
      let newGoalButton = null;
      for (const button of buttons) {
        const text = await this.page.evaluate(el => el.textContent, button);
        if (text && text.includes('New Goal')) {
          newGoalButton = button;
          break;
        }
      }
      
      if (newGoalButton) {
        await newGoalButton.click();
        await this.page.waitForTimeout(1000);
      } else {
        return this.logResult('Open Form for Validation', false, 'New Goal button not found');
      }

      // Try to submit empty form
      const createButtons = await this.page.$$('button');
      let createButton = null;
      for (const button of createButtons) {
        const text = await this.page.evaluate(el => el.textContent, button);
        if (text && text.includes('Create Goal')) {
          createButton = button;
          break;
        }
      }
      
      if (createButton) {
        await createButton.click();
        await this.page.waitForTimeout(1000);
        
        // Check for validation errors
        const errorMessages = await this.page.$$('.text-red-600, .text-red-500, [class*="error"]');
        if (errorMessages.length > 0) {
          this.logResult('Empty Form Validation', true, 'Validation errors displayed');
        } else {
          this.logResult('Empty Form Validation', false, 'No validation errors shown');
        }
      }

      // Fill only Goal Name and test validation
      const nameInput = await this.page.$('#name, input[name="name"]');
      if (nameInput) {
        await nameInput.click();
        await nameInput.type('Invalid Goal');
      }

      // Try to submit with incomplete data
      if (createButton) {
        await createButton.click();
        await this.page.waitForTimeout(1000);
        
        const errorMessages = await this.page.$$('.text-red-600, .text-red-500, [class*="error"]');
        if (errorMessages.length > 0) {
          this.logResult('Incomplete Form Validation', true, 'Validation errors for incomplete form');
        } else {
          this.logResult('Incomplete Form Validation', false, 'No validation errors for incomplete form');
        }
      }

      // Test Cancel button
      const cancelButtons = await this.page.$$('button');
      let cancelButton = null;
      for (const button of cancelButtons) {
        const text = await this.page.evaluate(el => el.textContent, button);
        if (text && text.includes('Cancel')) {
          cancelButton = button;
          break;
        }
      }
      
      if (cancelButton) {
        await cancelButton.click();
        await this.page.waitForTimeout(1000);
        
        // Verify modal closes
        const modalAfter = await this.page.$('[class*="modal"], [class*="dialog"], .fixed.inset-0');
        if (!modalAfter) {
          this.logResult('Cancel Button Works', true);
        } else {
          this.logResult('Cancel Button Works', false, 'Modal still visible after cancel');
        }
      } else {
        this.logResult('Cancel Button Works', false, 'Cancel button not found');
      }

      return true;
    } catch (error) {
      return this.logResult('Form Validation Test', false, error.message);
    }
  }

  // Test 4: Goal Type Selection
  async testGoalTypeSelection() {
    console.log('\n🧪 Test 4: Goal Type Selection');
    
    try {
      // Open New Goal form
      const buttons = await this.page.$$('button');
      let newGoalButton = null;
      for (const button of buttons) {
        const text = await this.page.evaluate(el => el.textContent, button);
        if (text && text.includes('New Goal')) {
          newGoalButton = button;
          break;
        }
      }
      
      if (newGoalButton) {
        await newGoalButton.click();
        await this.page.waitForTimeout(1000);
      } else {
        return this.logResult('Open Form for Goal Types', false, 'New Goal button not found');
      }

      // Test each goal type
      const goalTypes = ['Strength', 'Endurance', 'Weight Loss', 'Consistency'];
      const expectedUnits = ['lbs', 'minutes', 'lbs', 'sessions'];
      
      for (let i = 0; i < goalTypes.length; i++) {
        const goalType = goalTypes[i];
        const expectedUnit = expectedUnits[i];
        
        // Find and click goal type button
        const allButtons = await this.page.$$('button');
        let goalTypeButton = null;
        for (const button of allButtons) {
          const text = await this.page.evaluate(el => el.textContent, button);
          if (text && text.includes(goalType)) {
            goalTypeButton = button;
            break;
          }
        }
        
        if (goalTypeButton) {
          await goalTypeButton.click();
          await this.page.waitForTimeout(500);
          
          // Check if button is visually highlighted
          const isHighlighted = await this.page.evaluate(button => {
            const styles = window.getComputedStyle(button);
            return styles.backgroundColor !== 'rgba(0, 0, 0, 0)' && 
                   styles.backgroundColor !== 'transparent';
          }, goalTypeButton);
          
          this.logResult(`${goalType} Selection Visual`, isHighlighted, 
            isHighlighted ? 'Button highlighted' : 'Button not highlighted');
          
          // Check unit change (simplified check)
          const unitText = await this.page.evaluate(() => document.body.textContent);
          if (unitText.includes(expectedUnit)) {
            this.logResult(`${goalType} Unit Change`, true, `Unit changed to ${expectedUnit}`);
          } else {
            this.logResult(`${goalType} Unit Change`, false, `Expected ${expectedUnit}`);
          }
        } else {
          this.logResult(`${goalType} Button Found`, false, 'Button not found');
        }
      }

      // Close the form
      const cancelButtons = await this.page.$$('button');
      let cancelButton = null;
      for (const button of cancelButtons) {
        const text = await this.page.evaluate(el => el.textContent, button);
        if (text && text.includes('Cancel')) {
          cancelButton = button;
          break;
        }
      }
      
      if (cancelButton) {
        await cancelButton.click();
        await this.page.waitForTimeout(1000);
      }

      return true;
    } catch (error) {
      return this.logResult('Goal Type Selection Test', false, error.message);
    }
  }

  // Test 5: Exercise Selection (Strength Goals)
  async testExerciseSelection() {
    console.log('\n🧪 Test 5: Exercise Selection (Strength Goals)');
    
    try {
      // Open New Goal form
      const buttons = await this.page.$$('button');
      let newGoalButton = null;
      for (const button of buttons) {
        const text = await this.page.evaluate(el => el.textContent, button);
        if (text && text.includes('New Goal')) {
          newGoalButton = button;
          break;
        }
      }
      
      if (newGoalButton) {
        await newGoalButton.click();
        await this.page.waitForTimeout(1000);
      } else {
        return this.logResult('Open Form for Exercise Selection', false, 'New Goal button not found');
      }

      // Select Strength goal type
      const allButtons = await this.page.$$('button');
      let strengthButton = null;
      for (const button of allButtons) {
        const text = await this.page.evaluate(el => el.textContent, button);
        if (text && text.includes('Strength')) {
          strengthButton = button;
          break;
        }
      }
      
      if (strengthButton) {
        await strengthButton.click();
        await this.page.waitForTimeout(1000);
        this.logResult('Select Strength for Exercise Test', true);
      } else {
        return this.logResult('Select Strength for Exercise Test', false, 'Strength button not found');
      }

      // Check if Exercise dropdown appears
      const exerciseDropdown = await this.page.$('select, [role="combobox"]');
      if (exerciseDropdown) {
        this.logResult('Exercise Dropdown Appears', true);
        
        // Try to interact with dropdown
        await exerciseDropdown.click();
        await this.page.waitForTimeout(1000);
        
        // Check for "No specific exercise" option
        const pageText = await this.page.evaluate(() => document.body.textContent);
        if (pageText.includes('No specific exercise')) {
          this.logResult('No Specific Exercise Option', true);
        } else {
          this.logResult('No Specific Exercise Option', false, 'Option not found');
        }
        
        // Check if other exercise options load
        if (pageText.includes('Loading') || pageText.match(/\w+\s+(Press|Squat|Deadlift|Row)/i)) {
          this.logResult('Exercise Options Load', true);
        } else {
          this.logResult('Exercise Options Load', false, 'No exercise options found');
        }
      } else {
        this.logResult('Exercise Dropdown Appears', false, 'Dropdown not found');
      }

      // Close the form
      const cancelButtons = await this.page.$$('button');
      let cancelButton = null;
      for (const button of cancelButtons) {
        const text = await this.page.evaluate(el => el.textContent, button);
        if (text && text.includes('Cancel')) {
          cancelButton = button;
          break;
        }
      }
      
      if (cancelButton) {
        await cancelButton.click();
        await this.page.waitForTimeout(1000);
      }

      return true;
    } catch (error) {
      return this.logResult('Exercise Selection Test', false, error.message);
    }
  }

  // Test 6: Color Selection
  async testColorSelection() {
    console.log('\n🧪 Test 6: Color Selection');
    
    try {
      // Open New Goal form
      const buttons = await this.page.$$('button');
      let newGoalButton = null;
      for (const button of buttons) {
        const text = await this.page.evaluate(el => el.textContent, button);
        if (text && text.includes('New Goal')) {
          newGoalButton = button;
          break;
        }
      }
      
      if (newGoalButton) {
        await newGoalButton.click();
        await this.page.waitForTimeout(1000);
      } else {
        return this.logResult('Open Form for Color Selection', false, 'New Goal button not found');
      }

      // Look for color picker elements
      const colorButtons = await this.page.$$('button[style*="background-color"], .w-8.h-8.rounded-full');
      if (colorButtons.length > 0) {
        this.logResult('Color Picker Present', true, `Found ${colorButtons.length} color options`);
        
        // Test clicking different colors
        if (colorButtons.length >= 2) {
          // Click first color
          await colorButtons[0].click();
          await this.page.waitForTimeout(500);
          
          const firstColorSelected = await this.page.evaluate(button => {
            return button.classList.contains('scale-110') || 
                   button.style.transform.includes('scale') ||
                   button.classList.contains('selected');
          }, colorButtons[0]);
          
          this.logResult('First Color Selection', firstColorSelected, 
            firstColorSelected ? 'Color highlighted' : 'Color not highlighted');
          
          // Click second color
          await colorButtons[1].click();
          await this.page.waitForTimeout(500);
          
          const secondColorSelected = await this.page.evaluate(button => {
            return button.classList.contains('scale-110') || 
                   button.style.transform.includes('scale') ||
                   button.classList.contains('selected');
          }, colorButtons[1]);
          
          this.logResult('Second Color Selection', secondColorSelected, 
            secondColorSelected ? 'Color highlighted' : 'Color not highlighted');
        }
      } else {
        this.logResult('Color Picker Present', false, 'No color options found');
      }

      // Close the form
      const cancelButtons = await this.page.$$('button');
      let cancelButton = null;
      for (const button of cancelButtons) {
        const text = await this.page.evaluate(el => el.textContent, button);
        if (text && text.includes('Cancel')) {
          cancelButton = button;
          break;
        }
      }
      
      if (cancelButton) {
        await cancelButton.click();
        await this.page.waitForTimeout(1000);
      }

      return true;
    } catch (error) {
      return this.logResult('Color Selection Test', false, error.message);
    }
  }

  // Test 7: Date Selection
  async testDateSelection() {
    console.log('\n🧪 Test 7: Date Selection');
    
    try {
      // Open New Goal form
      const buttons = await this.page.$$('button');
      let newGoalButton = null;
      for (const button of buttons) {
        const text = await this.page.evaluate(el => el.textContent, button);
        if (text && text.includes('New Goal')) {
          newGoalButton = button;
          break;
        }
      }
      
      if (newGoalButton) {
        await newGoalButton.click();
        await this.page.waitForTimeout(1000);
      } else {
        return this.logResult('Open Form for Date Selection', false, 'New Goal button not found');
      }

      // Check for date inputs
      const startDateInput = await this.page.$('#start_date, input[type="date"][name*="start"]');
      const targetDateInput = await this.page.$('#target_date, input[type="date"][name*="target"]');
      
      if (startDateInput) {
        // Check if start date defaults to today
        const startValue = await this.page.evaluate(input => input.value, startDateInput);
        const today = new Date().toISOString().split('T')[0];
        
        if (startValue === today) {
          this.logResult('Start Date Defaults to Today', true);
        } else {
          this.logResult('Start Date Defaults to Today', false, `Start date is ${startValue}, expected ${today}`);
        }
        
        // Test setting custom start date
        await startDateInput.click();
        await startDateInput.evaluate(input => input.value = '2024-01-01');
        this.logResult('Set Custom Start Date', true);
      } else {
        this.logResult('Start Date Input Found', false, 'Start date input not found');
      }
      
      if (targetDateInput) {
        // Test setting target date
        await targetDateInput.click();
        const futureDate = new Date();
        futureDate.setMonth(futureDate.getMonth() + 3);
        const futureDateString = futureDate.toISOString().split('T')[0];
        
        await targetDateInput.evaluate((input, date) => input.value = date, futureDateString);
        this.logResult('Set Target Date', true);
      } else {
        this.logResult('Target Date Input Found', false, 'Target date input not found');
      }

      // Close the form
      const cancelButtons = await this.page.$$('button');
      let cancelButton = null;
      for (const button of cancelButtons) {
        const text = await this.page.evaluate(el => el.textContent, button);
        if (text && text.includes('Cancel')) {
          cancelButton = button;
          break;
        }
      }
      
      if (cancelButton) {
        await cancelButton.click();
        await this.page.waitForTimeout(1000);
      }

      return true;
    } catch (error) {
      return this.logResult('Date Selection Test', false, error.message);
    }
  }

  // Test 8: Goal List Interaction
  async testGoalListInteraction() {
    console.log('\n🧪 Test 8: Goal List Interaction');
    
    try {
      // Create a second test goal first
      await this.createTestGoal('Test Goal 2', 'endurance', '60', '30');
      
      // Wait for goals to load
      await this.page.waitForTimeout(2000);
      
      // Find goal cards
      const goalCards = await this.page.$$('[class*="goal"], [onclick], .cursor-pointer');
      if (goalCards.length >= 2) {
        this.logResult('Multiple Goals Present', true, `Found ${goalCards.length} goal cards`);
        
        // Click on different goal cards
        await goalCards[0].click();
        await this.page.waitForTimeout(1000);
        
        const firstCardHighlighted = await this.page.evaluate(card => {
          return card.classList.contains('bg-blue-50') || 
                 card.classList.contains('selected') ||
                 card.style.backgroundColor.includes('blue');
        }, goalCards[0]);
        
        this.logResult('First Goal Selection Highlighting', firstCardHighlighted,
          firstCardHighlighted ? 'Card highlighted' : 'Card not highlighted');
        
        if (goalCards.length > 1) {
          await goalCards[1].click();
          await this.page.waitForTimeout(1000);
          
          const secondCardHighlighted = await this.page.evaluate(card => {
            return card.classList.contains('bg-blue-50') || 
                   card.classList.contains('selected') ||
                   card.style.backgroundColor.includes('blue');
          }, goalCards[1]);
          
          this.logResult('Second Goal Selection Highlighting', secondCardHighlighted,
            secondCardHighlighted ? 'Card highlighted' : 'Card not highlighted');
        }
        
        // Check for progress circles
        const progressCircles = await this.page.$$('[class*="progress"], .relative.w-12.h-12');
        if (progressCircles.length > 0) {
          this.logResult('Progress Circles Present', true, `Found ${progressCircles.length} progress circles`);
        } else {
          this.logResult('Progress Circles Present', false, 'No progress circles found');
        }
        
        // Check for goal information display
        const pageText = await this.page.evaluate(() => document.body.textContent);
        if (pageText.includes('/') && (pageText.includes('lbs') || pageText.includes('minutes'))) {
          this.logResult('Goal Information Display', true, 'Current/target values visible');
        } else {
          this.logResult('Goal Information Display', false, 'Goal values not visible');
        }
        
      } else {
        this.logResult('Multiple Goals Present', false, `Only found ${goalCards.length} goal cards`);
      }

      return true;
    } catch (error) {
      return this.logResult('Goal List Interaction Test', false, error.message);
    }
  }

  // Test 9: Goal Details Panel
  async testGoalDetailsPanel() {
    console.log('\n🧪 Test 9: Goal Details Panel');
    
    try {
      // Ensure a goal is selected
      const goalCards = await this.page.$$('[class*="goal"], [onclick], .cursor-pointer');
      if (goalCards.length > 0) {
        await goalCards[0].click();
        await this.page.waitForTimeout(1000);
      }
      
      // Check for goal details panel in right column
      const detailsPanel = await this.page.$('[class*="space-y-4"] h3, .bg-white.rounded-lg');
      if (detailsPanel) {
        this.logResult('Goal Details Panel Present', true);
        
        // Check for progress chart
        const chart = await this.page.$('svg, canvas, [class*="recharts"]');
        if (chart) {
          this.logResult('Progress Chart Renders', true);
        } else {
          this.logResult('Progress Chart Renders', false, 'Chart not found');
        }
        
        // Check for goal details information
        const pageText = await this.page.evaluate(() => document.body.textContent);
        if (pageText.includes('Current Value') && pageText.includes('Target Value')) {
          this.logResult('Goal Details Information', true);
        } else {
          this.logResult('Goal Details Information', false, 'Goal details not found');
        }
        
        // Check for action buttons
        const editButton = await this.page.$('button:has-text("Edit"), button[aria-label*="Edit"]');
        const archiveButton = await this.page.$('button:has-text("Archive"), button[aria-label*="Archive"]');
        const deleteButton = await this.page.$('button:has-text("Delete"), button[aria-label*="Delete"]');
        const copyButton = await this.page.$('button:has-text("Copy"), button[aria-label*="Copy"]');
        
        // Use text-based search for buttons if selectors don't work
        const allButtons = await this.page.$$('button');
        let editFound = false, archiveFound = false, deleteFound = false, copyFound = false;
        
        for (const button of allButtons) {
          const text = await this.page.evaluate(el => el.textContent, button);
          if (text) {
            if (text.includes('Edit')) editFound = true;
            if (text.includes('Archive') || text.includes('Restore')) archiveFound = true;
            if (text.includes('Delete')) deleteFound = true;
            if (text.includes('Copy')) copyFound = true;
          }
        }
        
        this.logResult('Edit Button Present', editFound);
        this.logResult('Archive Button Present', archiveFound);
        this.logResult('Copy Button Present', copyFound);
        this.logResult('Delete Button Present', deleteFound);
        
      } else {
        this.logResult('Goal Details Panel Present', false, 'Details panel not found');
      }

      return true;
    } catch (error) {
      return this.logResult('Goal Details Panel Test', false, error.message);
    }
  }

  // Test 10: Archive/Restore Functionality
  async testArchiveRestoreFunctionality() {
    console.log('\n🧪 Test 10: Archive/Restore Functionality');
    
    try {
      // Create a test goal for archiving
      await this.createTestGoal('Archive Test Goal', 'strength', '200', '150');
      await this.page.waitForTimeout(2000);
      
      // Select the test goal
      const goalCards = await this.page.$$('[class*="goal"], [onclick], .cursor-pointer');
      let testGoalCard = null;
      
      for (const card of goalCards) {
        const text = await this.page.evaluate(el => el.textContent, card);
        if (text && text.includes('Archive Test Goal')) {
          testGoalCard = card;
          break;
        }
      }
      
      if (testGoalCard) {
        await testGoalCard.click();
        await this.page.waitForTimeout(1000);
        
        // Find and click Archive button
        const allButtons = await this.page.$$('button');
        let archiveButton = null;
        
        for (const button of allButtons) {
          const text = await this.page.evaluate(el => el.textContent, button);
          if (text && text.includes('Archive')) {
            archiveButton = button;
            break;
          }
        }
        
        if (archiveButton) {
          await archiveButton.click();
          await this.page.waitForTimeout(2000);
          this.logResult('Archive Button Click', true);
          
          // Check if goal is archived (should have Archived badge or be moved)
          const pageText = await this.page.evaluate(() => document.body.textContent);
          if (pageText.includes('Archived') || !pageText.includes('Archive Test Goal')) {
            this.logResult('Goal Archived', true);
            
            // Check for "Show Archived" button
            const showArchivedButton = await this.findButtonByText('Show Archived');
            if (showArchivedButton) {
              this.logResult('Show Archived Button Appears', true);
              
              // Click to show archived goals
              await showArchivedButton.click();
              await this.page.waitForTimeout(1000);
              
              // Check if archived goal appears with badge
              const archivedPageText = await this.page.evaluate(() => document.body.textContent);
              if (archivedPageText.includes('Archive Test Goal') && archivedPageText.includes('Archived')) {
                this.logResult('Archived Goal Shows with Badge', true);
              } else {
                this.logResult('Archived Goal Shows with Badge', false, 'Archived goal not found or no badge');
              }
            } else {
              this.logResult('Show Archived Button Appears', false, 'Button not found');
            }
          } else {
            this.logResult('Goal Archived', false, 'Goal still appears in active list');
          }
        } else {
          this.logResult('Archive Button Click', false, 'Archive button not found');
        }
      } else {
        this.logResult('Test Goal Selection', false, 'Archive test goal not found');
      }

      return true;
    } catch (error) {
      return this.logResult('Archive/Restore Test', false, error.message);
    }
  }

  // Test 11: Delete Functionality
  async testDeleteFunctionality() {
    console.log('\n🧪 Test 11: Delete Functionality');
    
    try {
      // Create a test goal for deletion
      await this.createTestGoal('Delete Test Goal', 'strength', '150', '100');
      await this.page.waitForTimeout(2000);
      
      // Select the test goal
      const goalCards = await this.page.$$('[class*="goal"], [onclick], .cursor-pointer');
      let testGoalCard = null;
      
      for (const card of goalCards) {
        const text = await this.page.evaluate(el => el.textContent, card);
        if (text && text.includes('Delete Test Goal')) {
          testGoalCard = card;
          break;
        }
      }
      
      if (testGoalCard) {
        await testGoalCard.click();
        await this.page.waitForTimeout(1000);
        
        // Find and click Delete button
        let deleteButton = await this.findButtonByText('Delete');
        
        if (deleteButton) {
          // Set up dialog handler for confirmation
          this.page.on('dialog', async (dialog) => {
            console.log('Dialog appeared:', dialog.message());
            await dialog.accept(); // Confirm deletion
          });
          
          await deleteButton.click();
          await this.page.waitForTimeout(2000);
          this.logResult('Delete Button Click', true);
          
          // Check if goal is removed from list
          const pageText = await this.page.evaluate(() => document.body.textContent);
          if (!pageText.includes('Delete Test Goal')) {
            this.logResult('Goal Removed After Deletion', true);
          } else {
            this.logResult('Goal Removed After Deletion', false, 'Goal still appears in list');
          }
        } else {
          this.logResult('Delete Button Click', false, 'Delete button not found');
        }
      } else {
        this.logResult('Test Goal Selection for Delete', false, 'Delete test goal not found');
      }

      return true;
    } catch (error) {
      return this.logResult('Delete Functionality Test', false, error.message);
    }
  }

  // Test 12: Drag and Drop (if functional)
  async testDragAndDrop() {
    console.log('\n🧪 Test 12: Drag and Drop (if functional)');
    
    try {
      // Check for drag handles (grip icons)
      const dragHandles = await this.page.$$('[class*="grip"], .cursor-move, svg[class*="grip"]');
      if (dragHandles.length > 0) {
        this.logResult('Drag Handles Present', true, `Found ${dragHandles.length} drag handles`);
        
        // Test if elements are draggable
        if (dragHandles.length >= 2) {
          const isDraggable = await this.page.evaluate(handle => {
            return handle.draggable || handle.getAttribute('draggable') === 'true';
          }, dragHandles[0]);
          
          this.logResult('Elements Draggable', isDraggable, 
            isDraggable ? 'Elements have draggable attribute' : 'Elements not draggable');
        }
      } else {
        this.logResult('Drag Handles Present', false, 'No drag handles found');
      }

      return true;
    } catch (error) {
      return this.logResult('Drag and Drop Test', false, error.message);
    }
  }

  // Test 13: Show/Hide Archived Goals
  async testShowHideArchivedGoals() {
    console.log('\n🧪 Test 13: Show/Hide Archived Goals');
    
    try {
      // First ensure we have an archived goal
      const showArchivedButton = await this.findButtonByText('Show Archived');
      if (showArchivedButton) {
        this.logResult('Show Archived Button Present', true);
        
        // Click to show archived goals
        await showArchivedButton.click();
        await this.page.waitForTimeout(1000);
        
        // Check if archived goals appear
        const pageText = await this.page.evaluate(() => document.body.textContent);
        if (pageText.includes('Archived')) {
          this.logResult('Archived Goals Shown', true);
          
          // Look for Hide Archived button
          const hideArchivedButton = await this.findButtonByText('Hide Archived');
          if (hideArchivedButton) {
            this.logResult('Hide Archived Button Appears', true);
            
            // Click to hide archived goals
            await hideArchivedButton.click();
            await this.page.waitForTimeout(1000);
            
            // Check if button text changed back
            const buttonText = await this.page.evaluate(() => document.body.textContent);
            if (buttonText.includes('Show Archived')) {
              this.logResult('Hide Archived Functionality', true);
            } else {
              this.logResult('Hide Archived Functionality', false, 'Button text did not change back');
            }
          } else {
            this.logResult('Hide Archived Button Appears', false, 'Button not found');
          }
        } else {
          this.logResult('Archived Goals Shown', false, 'No archived goals visible');
        }
      } else {
        this.logResult('Show Archived Button Present', false, 'No archived goals to show');
      }

      return true;
    } catch (error) {
      return this.logResult('Show/Hide Archived Test', false, error.message);
    }
  }

  // Test 14: Responsive Design
  async testResponsiveDesign() {
    console.log('\n🧪 Test 14: Responsive Design');
    
    try {
      // Test mobile viewport
      await this.page.setViewport({ width: 375, height: 667 });
      await this.page.waitForTimeout(1000);
      
      // Check if page layout adapts
      const pageContent = await this.page.$('body');
      if (pageContent) {
        this.logResult('Mobile Viewport Load', true);
        
        // Test if New Goal button is still accessible
        const newGoalButton = await this.findButtonByText('New Goal');
        if (newGoalButton) {
          this.logResult('Mobile New Goal Button', true);
          
          // Test modal on mobile
          await newGoalButton.click();
          await this.page.waitForTimeout(1000);
          
          const modal = await this.page.$('[class*="modal"], [class*="dialog"], .fixed.inset-0');
          if (modal) {
            this.logResult('Mobile Modal Responsive', true);
            
            // Close modal
            const cancelButton = await this.findButtonByText('Cancel');
            if (cancelButton) {
              await cancelButton.click();
              await this.page.waitForTimeout(1000);
            }
          } else {
            this.logResult('Mobile Modal Responsive', false, 'Modal not found on mobile');
          }
        } else {
          this.logResult('Mobile New Goal Button', false, 'Button not accessible on mobile');
        }
      }
      
      // Test tablet viewport
      await this.page.setViewport({ width: 768, height: 1024 });
      await this.page.waitForTimeout(1000);
      this.logResult('Tablet Viewport Load', true);
      
      // Reset to desktop
      await this.page.setViewport({ width: 1280, height: 720 });
      await this.page.waitForTimeout(1000);

      return true;
    } catch (error) {
      return this.logResult('Responsive Design Test', false, error.message);
    }
  }

  // Test 15: Error States
  async testErrorStates() {
    console.log('\n🧪 Test 15: Error States');
    
    try {
      // Check for loading states
      const pageText = await this.page.evaluate(() => document.body.textContent);
      
      // Look for loading indicators
      if (pageText.includes('Loading') || pageText.includes('...')) {
        this.logResult('Loading States Present', true, 'Loading text found');
      } else {
        const spinners = await this.page.$$('[class*="spin"], [class*="loading"]');
        if (spinners.length > 0) {
          this.logResult('Loading States Present', true, 'Loading spinners found');
        } else {
          this.logResult('Loading States Present', false, 'No loading indicators found');
        }
      }
      
      // Check console for errors
      const consoleErrors = [];
      this.page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });
      
      // Trigger some actions to test for errors
      const newGoalButton = await this.findButtonByText('New Goal');
      if (newGoalButton) {
        await newGoalButton.click();
        await this.page.waitForTimeout(1000);
        
        const cancelButton = await this.findButtonByText('Cancel');
        if (cancelButton) {
          await cancelButton.click();
          await this.page.waitForTimeout(1000);
        }
      }
      
      if (consoleErrors.length === 0) {
        this.logResult('No Console Errors', true);
      } else {
        this.logResult('No Console Errors', false, `Found ${consoleErrors.length} console errors`);
      }

      return true;
    } catch (error) {
      return this.logResult('Error States Test', false, error.message);
    }
  }

  // Test 16: Progress Calculations
  async testProgressCalculations() {
    console.log('\n🧪 Test 16: Progress Calculations');
    
    try {
      // Create a goal with specific values for calculation testing
      await this.createTestGoal('Progress Test Goal', 'strength', '200', '100');
      await this.page.waitForTimeout(2000);
      
      // Find and select the progress test goal
      const goalCards = await this.page.$$('[class*="goal"], [onclick], .cursor-pointer');
      let progressTestCard = null;
      
      for (const card of goalCards) {
        const text = await this.page.evaluate(el => el.textContent, card);
        if (text && text.includes('Progress Test Goal')) {
          progressTestCard = card;
          break;
        }
      }
      
      if (progressTestCard) {
        await progressTestCard.click();
        await this.page.waitForTimeout(1000);
        
        // Check if progress percentage is calculated correctly (100/200 = 50%)
        const pageText = await this.page.evaluate(() => document.body.textContent);
        if (pageText.includes('50%')) {
          this.logResult('Progress Percentage Calculation', true, 'Correct 50% calculation');
        } else {
          // Look for any percentage
          const percentageMatch = pageText.match(/(\d+)%/);
          if (percentageMatch) {
            const percentage = parseInt(percentageMatch[1]);
            if (percentage >= 45 && percentage <= 55) {
              this.logResult('Progress Percentage Calculation', true, `Close to expected: ${percentage}%`);
            } else {
              this.logResult('Progress Percentage Calculation', false, `Incorrect: ${percentage}%, expected ~50%`);
            }
          } else {
            this.logResult('Progress Percentage Calculation', false, 'No percentage found');
          }
        }
        
        // Check if current/target values are displayed correctly
        if (pageText.includes('100') && pageText.includes('200')) {
          this.logResult('Current/Target Values Display', true);
        } else {
          this.logResult('Current/Target Values Display', false, 'Values not displayed correctly');
        }
      } else {
        this.logResult('Progress Test Goal Selection', false, 'Test goal not found');
      }

      return true;
    } catch (error) {
      return this.logResult('Progress Calculations Test', false, error.message);
    }
  }

  // Test 17: Form Reset and Cancel
  async testFormResetAndCancel() {
    console.log('\n🧪 Test 17: Form Reset and Cancel');
    
    try {
      // Open new goal form
      const newGoalButton = await this.findButtonByText('New Goal');
      if (newGoalButton) {
        await newGoalButton.click();
        await this.page.waitForTimeout(1000);
      } else {
        return this.logResult('Open Form for Reset Test', false, 'New Goal button not found');
      }
      
      // Fill in some data
      const nameInput = await this.page.$('#name, input[name="name"]');
      if (nameInput) {
        await nameInput.click();
        await nameInput.type('Reset Test Goal');
      }
      
      const targetInput = await this.page.$('#target_value, input[name="target_value"]');
      if (targetInput) {
        await targetInput.click();
        await targetInput.type('300');
      }
      
      // Click Cancel
      const cancelButton = await this.findButtonByText('Cancel');
      if (cancelButton) {
        await cancelButton.click();
        await this.page.waitForTimeout(1000);
        this.logResult('Cancel Button Works', true);
        
        // Verify modal closes
        const modalAfter = await this.page.$('[class*="modal"], [class*="dialog"], .fixed.inset-0');
        if (!modalAfter) {
          this.logResult('Modal Closes on Cancel', true);
        } else {
          this.logResult('Modal Closes on Cancel', false, 'Modal still visible');
        }
        
        // Open form again to test reset
        const newGoalButton2 = await this.findButtonByText('New Goal');
        if (newGoalButton2) {
          await newGoalButton2.click();
          await this.page.waitForTimeout(1000);
          
          // Check if form is clean
          const nameInput2 = await this.page.$('#name, input[name="name"]');
          if (nameInput2) {
            const nameValue = await this.page.evaluate(input => input.value, nameInput2);
            if (nameValue === '') {
              this.logResult('Form Reset on Reopen', true);
            } else {
              this.logResult('Form Reset on Reopen', false, `Name field contains: "${nameValue}"`);
            }
          }
          
          // Close form again
          const cancelButton2 = await this.findButtonByText('Cancel');
          if (cancelButton2) {
            await cancelButton2.click();
            await this.page.waitForTimeout(1000);
          }
        }
      } else {
        this.logResult('Cancel Button Works', false, 'Cancel button not found');
      }

      return true;
    } catch (error) {
      return this.logResult('Form Reset and Cancel Test', false, error.message);
    }
  }

  // Helper method to create a test goal
  async createTestGoal(name, type, targetValue, currentValue) {
    try {
      const newGoalButton = await this.findButtonByText('New Goal');
      if (!newGoalButton) return false;
      
      await newGoalButton.click();
      await this.page.waitForTimeout(1000);
      
      // Fill form
      const nameInput = await this.page.$('#name, input[name="name"]');
      if (nameInput) {
        await nameInput.click();
        await nameInput.type(name);
      }
      
      // Select goal type
      const typeButtons = await this.page.$$('button');
      for (const button of typeButtons) {
        const text = await this.page.evaluate(el => el.textContent, button);
        if (text && text.toLowerCase().includes(type.toLowerCase())) {
          await button.click();
          break;
        }
      }
      
      const targetInput = await this.page.$('#target_value, input[name="target_value"]');
      if (targetInput) {
        await targetInput.click();
        await targetInput.type(targetValue);
      }
      
      const currentInput = await this.page.$('#current_value, input[name="current_value"]');
      if (currentInput) {
        await currentInput.click();
        await currentInput.type(currentValue);
      }
      
      // Submit
      const createButton = await this.findButtonByText('Create Goal');
      if (createButton) {
        await createButton.click();
        await this.page.waitForTimeout(2000);
        this.testGoals.push(name);
        return true;
      }
      
      return false;
    } catch (error) {
      console.log('Error creating test goal:', error.message);
      return false;
    }
  }

  // Helper method to find button by text
  async findButtonByText(text) {
    const buttons = await this.page.$$('button');
    for (const button of buttons) {
      const buttonText = await this.page.evaluate(el => el.textContent, button);
      if (buttonText && buttonText.includes(text)) {
        return button;
      }
    }
    return null;
  }

  // Post-test cleanup
  async cleanupTestGoals() {
    console.log('\n🧹 Cleaning up test goals...');
    
    for (const goalName of this.testGoals) {
      try {
        // Find goal card
        const goalCards = await this.page.$$('[class*="goal"], [onclick], .cursor-pointer');
        for (const card of goalCards) {
          const text = await this.page.evaluate(el => el.textContent, card);
          if (text && text.includes(goalName)) {
            await card.click();
            await this.page.waitForTimeout(1000);
            
            // Find and click delete button
            const deleteButton = await this.findButtonByText('Delete');
            if (deleteButton) {
              // Handle confirmation dialog
              this.page.on('dialog', async (dialog) => {
                await dialog.accept();
              });
              
              await deleteButton.click();
              await this.page.waitForTimeout(2000);
              console.log(`✅ Cleaned up goal: ${goalName}`);
            }
            break;
          }
        }
      } catch (error) {
        console.log(`❌ Failed to cleanup goal ${goalName}:`, error.message);
      }
    }
  }

  // Generate test report
  generateReport() {
    console.log('\n📊 TEST REPORT');
    console.log('='.repeat(50));
    
    const totalTests = this.testResults.length;
    const passedTests = this.testResults.filter(r => r.passed).length;
    const failedTests = totalTests - passedTests;
    const passRate = totalTests > 0 ? (passedTests / totalTests * 100).toFixed(1) : 0;
    
    console.log(`Total Tests: ${totalTests}`);
    console.log(`Passed: ${passedTests}`);
    console.log(`Failed: ${failedTests}`);
    console.log(`Pass Rate: ${passRate}%`);
    console.log('');
    
    if (failedTests > 0) {
      console.log('❌ FAILED TESTS:');
      this.testResults
        .filter(r => !r.passed)
        .forEach(r => {
          console.log(`  • ${r.test}: ${r.message}`);
        });
      console.log('');
    }
    
    console.log('✅ PASSED TESTS:');
    this.testResults
      .filter(r => r.passed)
      .forEach(r => {
        console.log(`  • ${r.test}${r.message ? ': ' + r.message : ''}`);
      });
    
    return {
      total: totalTests,
      passed: passedTests,
      failed: failedTests,
      passRate: parseFloat(passRate),
      results: this.testResults
    };
  }

  // Main test runner
  async runAllTests() {
    console.log('🎯 Starting Goals Page Test Suite');
    console.log('=' .repeat(50));
    
    try {
      await this.init();
      
      // Navigate and setup
      if (!await this.navigateToGoals()) return;
      if (!await this.handleAuthentication()) return;
      if (!await this.waitForPageLoad()) return;
      
      // Run all tests
      await this.testPageLoadAndInitialState();
      await this.testCreateNewGoalBasicFlow();
      await this.testCreateGoalFormValidation();
      await this.testGoalTypeSelection();
      await this.testExerciseSelection();
      await this.testColorSelection();
      await this.testDateSelection();
      await this.testGoalListInteraction();
      await this.testGoalDetailsPanel();
      await this.testArchiveRestoreFunctionality();
      await this.testDeleteFunctionality();
      await this.testDragAndDrop();
      await this.testShowHideArchivedGoals();
      await this.testResponsiveDesign();
      await this.testErrorStates();
      await this.testProgressCalculations();
      await this.testFormResetAndCancel();
      
      // Cleanup
      await this.cleanupTestGoals();
      
      // Generate final report
      const report = this.generateReport();
      
      console.log('\n🎉 Test suite completed!');
      return report;
      
    } catch (error) {
      console.error('❌ Test suite failed:', error);
      return null;
    } finally {
      await this.cleanup();
    }
  }
}

// Run the tests if this file is executed directly
if (require.main === module) {
  const tester = new GoalsPageTester();
  tester.runAllTests()
    .then(report => {
      if (report) {
        process.exit(report.failed > 0 ? 1 : 0);
      } else {
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('Test execution failed:', error);
      process.exit(1);
    });
}

module.exports = GoalsPageTester;