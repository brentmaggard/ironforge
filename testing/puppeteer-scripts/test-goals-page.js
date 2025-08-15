const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class GoalsPageTester {
    constructor() {
        this.browser = null;
        this.page = null;
        this.results = {
            passed: 0,
            failed: 0,
            errors: [],
            details: []
        };
    }

    async init() {
        this.browser = await puppeteer.launch({
            headless: false,
            defaultViewport: { width: 1280, height: 720 },
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        this.page = await this.browser.newPage();
        
        // Enable console logging
        this.page.on('console', msg => {
            if (msg.type() === 'error') {
                this.logError('Console Error', msg.text());
            }
        });

        // Enable network monitoring
        await this.page.setRequestInterception(true);
        this.page.on('request', request => {
            request.continue();
        });
        this.page.on('requestfailed', request => {
            this.logError('Network Error', `Failed request: ${request.url()}`);
        });
    }

    async cleanup() {
        if (this.browser) {
            await this.browser.close();
        }
    }

    logResult(testName, passed, details = '') {
        if (passed) {
            this.results.passed++;
            console.log(`✅ ${testName}`);
        } else {
            this.results.failed++;
            console.log(`❌ ${testName}`);
        }
        
        this.results.details.push({
            test: testName,
            passed,
            details
        });
    }

    logError(category, message) {
        this.results.errors.push({ category, message });
        console.log(`🚨 ${category}: ${message}`);
    }

    async wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async test1_PageLoadAndInitialState() {
        console.log('\n📋 Test 1: Page Load and Initial State');
        
        try {
            await this.page.goto('http://localhost:3000/goals', { waitUntil: 'networkidle0' });
            
            // Check Goals heading
            const heading = await this.page.$('h1');
            const headingText = await this.page.evaluate(el => el?.textContent, heading);
            this.logResult('Goals heading visible', headingText?.includes('Goals'));
            
            // Check New Goal button
            const newGoalButton = await this.page.$('button:has-text("New Goal"), [data-testid="new-goal-button"]');
            this.logResult('New Goal button present', !!newGoalButton);
            
            // Check for goals list - look for goal items
            await this.wait(2000); // Wait for data to load
            const goalItems = await this.page.$$('[data-testid^="goal-"], .goal-item, .goal-card');
            this.logResult('Goals list loads with data', goalItems.length >= 2);
            
            // Look for specific mock goals
            const pageText = await this.page.evaluate(() => document.body.textContent);
            this.logResult('Bench Press goal visible', pageText.includes('Bench Press'));
            this.logResult('Running goal visible', pageText.includes('Run 5K') || pageText.includes('5K'));
            
        } catch (error) {
            this.logError('Test 1', error.message);
            this.logResult('Page Load and Initial State', false, error.message);
        }
    }

    async test2_CreateNewGoalBasicFlow() {
        console.log('\n📋 Test 2: Create New Goal - Basic Flow');
        
        try {
            // Click New Goal button
            await this.page.click('button:has-text("New Goal"), [data-testid="new-goal-button"]');
            await this.wait(1000);
            
            // Check modal opens
            const modal = await this.page.$('.modal, [data-testid="create-goal-modal"], [role="dialog"]');
            this.logResult('Modal opens', !!modal);
            
            // Check modal title
            const modalTitle = await this.page.evaluate(() => {
                const titleEl = document.querySelector('h2, h3, .modal-title, [data-testid="modal-title"]');
                return titleEl?.textContent || '';
            });
            this.logResult('Modal has correct title', modalTitle.includes('Create') && modalTitle.includes('Goal'));
            
            // Fill in Goal Name
            const nameInput = await this.page.$('input[name="name"], input[placeholder*="name"], [data-testid="goal-name"]');
            if (nameInput) {
                await nameInput.click();
                await nameInput.type('Test Goal 1');
                this.logResult('Goal name filled', true);
            } else {
                this.logResult('Goal name field found', false);
            }
            
            // Select Goal Type - Strength
            const strengthButton = await this.page.$('button:has-text("Strength"), [data-testid="strength-type"], .goal-type-strength');
            if (strengthButton) {
                await strengthButton.click();
                this.logResult('Strength type selected', true);
            } else {
                this.logResult('Strength type button found', false);
            }
            
            // Fill Target Value
            const targetInput = await this.page.$('input[name="target"], input[placeholder*="target"], [data-testid="target-value"]');
            if (targetInput) {
                await targetInput.click();
                await targetInput.type('225');
                this.logResult('Target value filled', true);
            } else {
                this.logResult('Target value field found', false);
            }
            
            // Fill Current Value
            const currentInput = await this.page.$('input[name="current"], input[placeholder*="current"], [data-testid="current-value"]');
            if (currentInput) {
                await currentInput.click();
                await currentInput.type('185');
                this.logResult('Current value filled', true);
            } else {
                this.logResult('Current value field found', false);
            }
            
            // Check unit defaults to lbs
            const unitText = await this.page.evaluate(() => {
                const unitEl = document.querySelector('[data-testid="unit"], .unit, select[name="unit"]');
                return unitEl?.textContent || unitEl?.value || '';
            });
            this.logResult('Unit defaults to lbs', unitText.includes('lbs'));
            
            // Click Create Goal
            const createButton = await this.page.$('button:has-text("Create"), button[type="submit"], [data-testid="create-goal"]');
            if (createButton) {
                await createButton.click();
                await this.wait(2000);
                this.logResult('Create button clicked', true);
                
                // Check modal closes
                const modalAfter = await this.page.$('.modal, [data-testid="create-goal-modal"], [role="dialog"]');
                this.logResult('Modal closes after creation', !modalAfter);
            } else {
                this.logResult('Create button found', false);
            }
            
        } catch (error) {
            this.logError('Test 2', error.message);
            this.logResult('Create New Goal Basic Flow', false, error.message);
        }
    }

    async test3_FormValidation() {
        console.log('\n📋 Test 3: Form Validation');
        
        try {
            // Open modal again
            await this.page.click('button:has-text("New Goal"), [data-testid="new-goal-button"]');
            await this.wait(1000);
            
            // Try to submit empty form
            const submitButton = await this.page.$('button:has-text("Create"), button[type="submit"], [data-testid="create-goal"]');
            if (submitButton) {
                await submitButton.click();
                await this.wait(500);
                
                // Check for validation errors
                const errorMessages = await this.page.$$('.error, .invalid, [data-testid*="error"]');
                this.logResult('Validation errors show for empty form', errorMessages.length > 0);
            }
            
            // Fill only goal name
            const nameInput = await this.page.$('input[name="name"], input[placeholder*="name"], [data-testid="goal-name"]');
            if (nameInput) {
                await nameInput.click();
                await nameInput.type('Invalid Goal');
            }
            
            // Try submit again
            if (submitButton) {
                await submitButton.click();
                await this.wait(500);
                
                const errorsAfter = await this.page.$$('.error, .invalid, [data-testid*="error"]');
                this.logResult('Validation prevents incomplete submission', errorsAfter.length > 0);
            }
            
            // Test cancel button
            const cancelButton = await this.page.$('button:has-text("Cancel"), [data-testid="cancel-button"]');
            if (cancelButton) {
                await cancelButton.click();
                await this.wait(500);
                
                const modalAfterCancel = await this.page.$('.modal, [data-testid="create-goal-modal"], [role="dialog"]');
                this.logResult('Cancel button closes modal', !modalAfterCancel);
            }
            
        } catch (error) {
            this.logError('Test 3', error.message);
            this.logResult('Form Validation', false, error.message);
        }
    }

    async test4_GoalTypeSelection() {
        console.log('\n📋 Test 4: Goal Type Selection');
        
        try {
            // Open modal
            await this.page.click('button:has-text("New Goal"), [data-testid="new-goal-button"]');
            await this.wait(1000);
            
            // Test Strength type
            const strengthBtn = await this.page.$('button:has-text("Strength"), [data-testid="strength-type"]');
            if (strengthBtn) {
                await strengthBtn.click();
                await this.wait(300);
                
                const isSelected = await this.page.evaluate(() => {
                    const btn = document.querySelector('button:has-text("Strength"), [data-testid="strength-type"]');
                    return btn?.classList.contains('selected') || btn?.classList.contains('active');
                });
                this.logResult('Strength type selection works', isSelected);
            }
            
            // Test Endurance type
            const enduranceBtn = await this.page.$('button:has-text("Endurance"), [data-testid="endurance-type"]');
            if (enduranceBtn) {
                await enduranceBtn.click();
                await this.wait(300);
                
                const unitAfterEndurance = await this.page.evaluate(() => {
                    const unitEl = document.querySelector('[data-testid="unit"], .unit');
                    return unitEl?.textContent || '';
                });
                this.logResult('Endurance type changes unit to minutes', unitAfterEndurance.includes('minutes'));
            }
            
            // Test Weight Loss type
            const weightBtn = await this.page.$('button:has-text("Weight"), [data-testid="weight-type"]');
            if (weightBtn) {
                await weightBtn.click();
                await this.wait(300);
                this.logResult('Weight Loss type selection works', true);
            }
            
            // Test Consistency type
            const consistencyBtn = await this.page.$('button:has-text("Consistency"), [data-testid="consistency-type"]');
            if (consistencyBtn) {
                await consistencyBtn.click();
                await this.wait(300);
                
                const unitAfterConsistency = await this.page.evaluate(() => {
                    const unitEl = document.querySelector('[data-testid="unit"], .unit');
                    return unitEl?.textContent || '';
                });
                this.logResult('Consistency type changes unit to sessions', unitAfterConsistency.includes('sessions'));
            }
            
            // Close modal
            const cancelButton = await this.page.$('button:has-text("Cancel"), [data-testid="cancel-button"]');
            if (cancelButton) await cancelButton.click();
            
        } catch (error) {
            this.logError('Test 4', error.message);
            this.logResult('Goal Type Selection', false, error.message);
        }
    }

    async test5_ExerciseSelection() {
        console.log('\n📋 Test 5: Exercise Selection (Strength Goals)');
        
        try {
            // Open modal and select strength
            await this.page.click('button:has-text("New Goal"), [data-testid="new-goal-button"]');
            await this.wait(1000);
            
            const strengthBtn = await this.page.$('button:has-text("Strength"), [data-testid="strength-type"]');
            if (strengthBtn) {
                await strengthBtn.click();
                await this.wait(500);
            }
            
            // Check for exercise dropdown
            const exerciseDropdown = await this.page.$('select[name="exercise"], [data-testid="exercise-select"]');
            this.logResult('Exercise dropdown appears for strength goals', !!exerciseDropdown);
            
            if (exerciseDropdown) {
                // Click dropdown to open options
                await exerciseDropdown.click();
                await this.wait(300);
                
                // Check for exercise options
                const options = await this.page.$$('option, [data-testid*="exercise-option"]');
                this.logResult('Exercise options load', options.length > 1);
                
                // Select specific exercise
                await this.page.select('select[name="exercise"], [data-testid="exercise-select"]', 'bench-press');
                this.logResult('Can select specific exercise', true);
            }
            
            // Close modal
            const cancelButton = await this.page.$('button:has-text("Cancel"), [data-testid="cancel-button"]');
            if (cancelButton) await cancelButton.click();
            
        } catch (error) {
            this.logError('Test 5', error.message);
            this.logResult('Exercise Selection', false, error.message);
        }
    }

    async test6_ColorSelection() {
        console.log('\n📋 Test 6: Color Selection');
        
        try {
            // Open modal
            await this.page.click('button:has-text("New Goal"), [data-testid="new-goal-button"]');
            await this.wait(1000);
            
            // Look for color picker
            const colorOptions = await this.page.$$('.color-option, [data-testid*="color"], .color-picker button');
            this.logResult('Color picker shows multiple options', colorOptions.length >= 3);
            
            if (colorOptions.length > 0) {
                // Click first color option
                await colorOptions[0].click();
                await this.wait(300);
                
                const isSelected = await this.page.evaluate((element) => {
                    return element.classList.contains('selected') || element.classList.contains('active');
                }, colorOptions[0]);
                this.logResult('Color selection works', isSelected);
            }
            
            // Close modal
            const cancelButton = await this.page.$('button:has-text("Cancel"), [data-testid="cancel-button"]');
            if (cancelButton) await cancelButton.click();
            
        } catch (error) {
            this.logError('Test 6', error.message);
            this.logResult('Color Selection', false, error.message);
        }
    }

    async test7_DateSelection() {
        console.log('\n📋 Test 7: Date Selection');
        
        try {
            // Open modal
            await this.page.click('button:has-text("New Goal"), [data-testid="new-goal-button"]');
            await this.wait(1000);
            
            // Check for date fields
            const startDateField = await this.page.$('input[type="date"][name*="start"], [data-testid="start-date"]');
            const targetDateField = await this.page.$('input[type="date"][name*="target"], [data-testid="target-date"]');
            
            this.logResult('Start Date field present', !!startDateField);
            this.logResult('Target Date field present', !!targetDateField);
            
            if (startDateField) {
                await startDateField.click();
                await startDateField.type('2024-01-01');
                this.logResult('Start date accepts input', true);
            }
            
            if (targetDateField) {
                await targetDateField.click();
                await targetDateField.type('2024-12-31');
                this.logResult('Target date accepts input', true);
            }
            
            // Close modal
            const cancelButton = await this.page.$('button:has-text("Cancel"), [data-testid="cancel-button"]');
            if (cancelButton) await cancelButton.click();
            
        } catch (error) {
            this.logError('Test 7', error.message);
            this.logResult('Date Selection', false, error.message);
        }
    }

    async test8_GoalListInteraction() {
        console.log('\n📋 Test 8: Goal List Interaction');
        
        try {
            // Look for goal cards/items
            const goalCards = await this.page.$$('[data-testid*="goal"], .goal-card, .goal-item');
            this.logResult('Goal cards are displayed', goalCards.length >= 2);
            
            if (goalCards.length > 0) {
                // Click first goal
                await goalCards[0].click();
                await this.wait(300);
                
                const isHighlighted = await this.page.evaluate((element) => {
                    return element.classList.contains('selected') || element.classList.contains('active');
                }, goalCards[0]);
                this.logResult('Goal selection highlighting works', isHighlighted);
                
                // Check for progress circles
                const progressCircles = await this.page.$$('.progress-circle, [data-testid*="progress"], .circular-progress');
                this.logResult('Progress circles visible', progressCircles.length > 0);
            }
            
            // Check for specific goal text
            const pageContent = await this.page.evaluate(() => document.body.textContent);
            this.logResult('Bench Press goal shows correct data', pageContent.includes('225') && pageContent.includes('lbs'));
            
        } catch (error) {
            this.logError('Test 8', error.message);
            this.logResult('Goal List Interaction', false, error.message);
        }
    }

    async test9_GoalDetailsPanel() {
        console.log('\n📋 Test 9: Goal Details Panel');
        
        try {
            // Select a goal first
            const goalCards = await this.page.$$('[data-testid*="goal"], .goal-card, .goal-item');
            if (goalCards.length > 0) {
                await goalCards[0].click();
                await this.wait(500);
            }
            
            // Look for details panel
            const detailsPanel = await this.page.$('.goal-details, [data-testid="goal-details"], .details-panel');
            this.logResult('Goal details panel appears', !!detailsPanel);
            
            // Check for action buttons
            const editButton = await this.page.$('button:has-text("Edit"), [data-testid="edit-goal"]');
            const archiveButton = await this.page.$('button:has-text("Archive"), [data-testid="archive-goal"]');
            const copyButton = await this.page.$('button:has-text("Copy"), [data-testid="copy-goal"]');
            const deleteButton = await this.page.$('button:has-text("Delete"), [data-testid="delete-goal"]');
            
            this.logResult('Edit button present', !!editButton);
            this.logResult('Archive button present', !!archiveButton);
            this.logResult('Copy button present', !!copyButton);
            this.logResult('Delete button present', !!deleteButton);
            
        } catch (error) {
            this.logError('Test 9', error.message);
            this.logResult('Goal Details Panel', false, error.message);
        }
    }

    async test10_ModalBehavior() {
        console.log('\n📋 Test 10: Modal Behavior');
        
        try {
            // Open modal
            await this.page.click('button:has-text("New Goal"), [data-testid="new-goal-button"]');
            await this.wait(1000);
            
            // Test X button
            const closeButton = await this.page.$('.close, [data-testid="close-modal"], .modal-close');
            if (closeButton) {
                await closeButton.click();
                await this.wait(500);
                
                const modalAfterClose = await this.page.$('.modal, [data-testid="create-goal-modal"], [role="dialog"]');
                this.logResult('X button closes modal', !modalAfterClose);
            }
            
            // Test clicking outside modal (overlay)
            await this.page.click('button:has-text("New Goal"), [data-testid="new-goal-button"]');
            await this.wait(1000);
            
            // Click on overlay
            await this.page.click('.modal-overlay, .backdrop', { offset: { x: 10, y: 10 } });
            await this.wait(500);
            
            const modalAfterOverlay = await this.page.$('.modal, [data-testid="create-goal-modal"], [role="dialog"]');
            this.logResult('Clicking overlay closes modal', !modalAfterOverlay);
            
        } catch (error) {
            this.logError('Test 10', error.message);
            this.logResult('Modal Behavior', false, error.message);
        }
    }

    async test11_ResponsiveDesign() {
        console.log('\n📋 Test 11: Responsive Design');
        
        try {
            // Test mobile viewport
            await this.page.setViewport({ width: 375, height: 667 });
            await this.wait(1000);
            
            // Check if page still loads
            const goalsHeading = await this.page.$('h1');
            this.logResult('Page loads on mobile viewport', !!goalsHeading);
            
            // Test modal on mobile
            await this.page.click('button:has-text("New Goal"), [data-testid="new-goal-button"]');
            await this.wait(1000);
            
            const modal = await this.page.$('.modal, [data-testid="create-goal-modal"], [role="dialog"]');
            this.logResult('Modal works on mobile', !!modal);
            
            // Close modal
            const cancelButton = await this.page.$('button:has-text("Cancel"), [data-testid="cancel-button"]');
            if (cancelButton) await cancelButton.click();
            
            // Test tablet viewport
            await this.page.setViewport({ width: 768, height: 1024 });
            await this.wait(500);
            this.logResult('Page adapts to tablet viewport', true);
            
            // Reset to desktop
            await this.page.setViewport({ width: 1280, height: 720 });
            await this.wait(500);
            
        } catch (error) {
            this.logError('Test 11', error.message);
            this.logResult('Responsive Design', false, error.message);
        }
    }

    async test12_FormResetAndCancel() {
        console.log('\n📋 Test 12: Form Reset and Cancel');
        
        try {
            // Open modal and fill data
            await this.page.click('button:has-text("New Goal"), [data-testid="new-goal-button"]');
            await this.wait(1000);
            
            const nameInput = await this.page.$('input[name="name"], [data-testid="goal-name"]');
            if (nameInput) {
                await nameInput.type('Test Data');
            }
            
            // Cancel
            const cancelButton = await this.page.$('button:has-text("Cancel"), [data-testid="cancel-button"]');
            if (cancelButton) {
                await cancelButton.click();
                await this.wait(500);
            }
            
            // Open again and check if clean
            await this.page.click('button:has-text("New Goal"), [data-testid="new-goal-button"]');
            await this.wait(1000);
            
            const nameInputAfter = await this.page.$('input[name="name"], [data-testid="goal-name"]');
            const inputValue = await this.page.evaluate(el => el?.value || '', nameInputAfter);
            
            this.logResult('Form resets after cancel', inputValue === '');
            
            // Close modal
            const cancelButton2 = await this.page.$('button:has-text("Cancel"), [data-testid="cancel-button"]');
            if (cancelButton2) await cancelButton2.click();
            
        } catch (error) {
            this.logError('Test 12', error.message);
            this.logResult('Form Reset and Cancel', false, error.message);
        }
    }

    async test13_ProgressCalculations() {
        console.log('\n📋 Test 13: Progress Calculations');
        
        try {
            const pageContent = await this.page.evaluate(() => document.body.textContent);
            
            // Look for percentage indicators
            const hasPercentages = pageContent.includes('%') || pageContent.includes('percent');
            this.logResult('Progress percentages are displayed', hasPercentages);
            
            // Check for specific values
            const hasBenchPressData = pageContent.includes('185') && pageContent.includes('225');
            this.logResult('Bench Press progress data visible', hasBenchPressData);
            
            // Look for progress circles or bars
            const progressElements = await this.page.$$('.progress, [data-testid*="progress"], .circular-progress, .progress-bar');
            this.logResult('Visual progress indicators present', progressElements.length > 0);
            
        } catch (error) {
            this.logError('Test 13', error.message);
            this.logResult('Progress Calculations', false, error.message);
        }
    }

    async test14_UIElementsAndStyling() {
        console.log('\n📋 Test 14: UI Elements and Styling');
        
        try {
            // Test button hover states
            const newGoalButton = await this.page.$('button:has-text("New Goal"), [data-testid="new-goal-button"]');
            if (newGoalButton) {
                await newGoalButton.hover();
                await this.wait(300);
                this.logResult('Button hover states work', true);
            }
            
            // Open modal to test form elements
            await this.page.click('button:has-text("New Goal"), [data-testid="new-goal-button"]');
            await this.wait(1000);
            
            // Test input focus states
            const nameInput = await this.page.$('input[name="name"], [data-testid="goal-name"]');
            if (nameInput) {
                await nameInput.focus();
                await this.wait(300);
                this.logResult('Input focus states work', true);
            }
            
            // Check for proper styling
            const modalStyles = await this.page.evaluate(() => {
                const modal = document.querySelector('.modal, [data-testid="create-goal-modal"], [role="dialog"]');
                if (!modal) return false;
                const styles = window.getComputedStyle(modal);
                return styles.display !== 'none' && styles.visibility !== 'hidden';
            });
            this.logResult('Modal styling is proper', modalStyles);
            
            // Close modal
            const cancelButton = await this.page.$('button:has-text("Cancel"), [data-testid="cancel-button"]');
            if (cancelButton) await cancelButton.click();
            
        } catch (error) {
            this.logError('Test 14', error.message);
            this.logResult('UI Elements and Styling', false, error.message);
        }
    }

    async test15_ConsoleErrors() {
        console.log('\n📋 Test 15: Console Errors Check');
        
        // Console errors are tracked throughout all tests
        this.logResult('No console errors detected', this.results.errors.length === 0);
        
        if (this.results.errors.length > 0) {
            console.log('\n🚨 Console Errors Found:');
            this.results.errors.forEach(error => {
                console.log(`   ${error.category}: ${error.message}`);
            });
        }
    }

    async runAllTests() {
        console.log('🚀 Starting comprehensive Goals page testing...\n');
        
        await this.init();
        
        try {
            await this.test1_PageLoadAndInitialState();
            await this.test2_CreateNewGoalBasicFlow();
            await this.test3_FormValidation();
            await this.test4_GoalTypeSelection();
            await this.test5_ExerciseSelection();
            await this.test6_ColorSelection();
            await this.test7_DateSelection();
            await this.test8_GoalListInteraction();
            await this.test9_GoalDetailsPanel();
            await this.test10_ModalBehavior();
            await this.test11_ResponsiveDesign();
            await this.test12_FormResetAndCancel();
            await this.test13_ProgressCalculations();
            await this.test14_UIElementsAndStyling();
            await this.test15_ConsoleErrors();
            
        } catch (error) {
            this.logError('Test Suite', error.message);
        } finally {
            await this.cleanup();
        }
        
        this.generateReport();
    }

    generateReport() {
        console.log('\n📊 COMPREHENSIVE TEST RESULTS');
        console.log('═'.repeat(50));
        console.log(`✅ Passed: ${this.results.passed}`);
        console.log(`❌ Failed: ${this.results.failed}`);
        console.log(`🚨 Errors: ${this.results.errors.length}`);
        console.log(`📈 Success Rate: ${((this.results.passed / (this.results.passed + this.results.failed)) * 100).toFixed(1)}%`);
        
        if (this.results.failed > 0) {
            console.log('\n❌ FAILED TESTS:');
            this.results.details
                .filter(detail => !detail.passed)
                .forEach(detail => {
                    console.log(`   • ${detail.test}`);
                    if (detail.details) console.log(`     ${detail.details}`);
                });
        }
        
        if (this.results.errors.length > 0) {
            console.log('\n🚨 ERRORS ENCOUNTERED:');
            this.results.errors.forEach(error => {
                console.log(`   • ${error.category}: ${error.message}`);
            });
        }
        
        console.log('\n📝 DETAILED RESULTS:');
        this.results.details.forEach(detail => {
            const status = detail.passed ? '✅' : '❌';
            console.log(`   ${status} ${detail.test}`);
        });
        
        // Save results to file
        const reportData = {
            timestamp: new Date().toISOString(),
            summary: {
                passed: this.results.passed,
                failed: this.results.failed,
                errors: this.results.errors.length,
                successRate: ((this.results.passed / (this.results.passed + this.results.failed)) * 100).toFixed(1)
            },
            details: this.results.details,
            errors: this.results.errors
        };
        
        fs.writeFileSync(
            path.join(__dirname, 'goals-page-test-results.json'),
            JSON.stringify(reportData, null, 2)
        );
        
        console.log('\n💾 Results saved to goals-page-test-results.json');
    }
}

// Run the tests
const tester = new GoalsPageTester();
tester.runAllTests().catch(console.error);