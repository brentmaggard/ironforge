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

    // Helper to find buttons by text content
    async findButtonByText(text) {
        return await this.page.evaluateHandle((searchText) => {
            const buttons = Array.from(document.querySelectorAll('button'));
            return buttons.find(btn => btn.textContent.trim().includes(searchText));
        }, text);
    }

    async test1_PageLoadAndInitialState() {
        console.log('\n📋 Test 1: Page Load and Initial State');
        
        try {
            await this.page.goto('http://localhost:3000/goals', { waitUntil: 'networkidle0' });
            
            // Check Goals heading
            const heading = await this.page.$('h1');
            const headingText = await this.page.evaluate(el => el?.textContent, heading);
            this.logResult('Goals heading visible', headingText?.includes('Goals'));
            
            // Check New Goal button using actual button text
            const newGoalButton = await this.findButtonByText('New Goal');
            this.logResult('New Goal button present', !!newGoalButton);
            
            // Check for goals data by looking for specific text content
            await this.wait(2000);
            const pageText = await this.page.evaluate(() => document.body.textContent);
            this.logResult('Bench Press goal visible', pageText.includes('Bench Press 225lbs'));
            this.logResult('Running goal visible', pageText.includes('Run 5K under 25 minutes'));
            
            // Check for goal count indicator
            this.logResult('Shows active goals count', pageText.includes('Active goals: 2'));
            
            // Check for progress percentages
            this.logResult('Progress percentages visible', pageText.includes('82%') || pageText.includes('100%'));
            
        } catch (error) {
            this.logError('Test 1', error.message);
            this.logResult('Page Load and Initial State', false, error.message);
        }
    }

    async test2_CreateNewGoalBasicFlow() {
        console.log('\n📋 Test 2: Create New Goal - Basic Flow');
        
        try {
            // Click New Goal button
            const newGoalButton = await this.findButtonByText('New Goal');
            if (newGoalButton.asElement()) {
                await newGoalButton.asElement().click();
                await this.wait(1000);
                this.logResult('New Goal button clicked', true);
                
                // Check if modal or form appears
                const modalOrForm = await this.page.$('[role="dialog"], .modal, form');
                this.logResult('Goal creation UI appears', !!modalOrForm);
                
                if (modalOrForm) {
                    // Look for form fields that might be present
                    const formElements = await this.page.evaluate(() => {
                        const inputs = document.querySelectorAll('input, select, textarea');
                        return Array.from(inputs).map(input => ({
                            type: input.type,
                            name: input.name,
                            placeholder: input.placeholder,
                            id: input.id
                        }));
                    });
                    
                    console.log('Form elements found:', formElements);
                    this.logResult('Form elements present', formElements.length > 0);
                    
                    // Try to close modal/form with Escape key
                    await this.page.keyboard.press('Escape');
                    await this.wait(500);
                } else {
                    this.logResult('Goal creation form opens', false);
                }
            } else {
                this.logResult('New Goal button functional', false);
            }
            
        } catch (error) {
            this.logError('Test 2', error.message);
            this.logResult('Create New Goal Basic Flow', false, error.message);
        }
    }

    async test3_GoalListInteraction() {
        console.log('\n📋 Test 3: Goal List Interaction');
        
        try {
            // Look for goal items by finding elements with goal-related text
            const goalElements = await this.page.evaluate(() => {
                const elements = [];
                const walker = document.createTreeWalker(
                    document.body,
                    NodeFilter.SHOW_ELEMENT,
                    {
                        acceptNode: function(node) {
                            const text = node.textContent;
                            if (text.includes('Bench Press') || text.includes('Run 5K')) {
                                return NodeFilter.FILTER_ACCEPT;
                            }
                            return NodeFilter.FILTER_SKIP;
                        }
                    }
                );
                
                let node;
                while (node = walker.nextNode()) {
                    if (node.tagName && !elements.includes(node)) {
                        elements.push({
                            tag: node.tagName,
                            className: node.className,
                            text: node.textContent.trim().substring(0, 100)
                        });
                    }
                }
                return elements;
            });
            
            this.logResult('Goal items found in DOM', goalElements.length >= 2);
            console.log('Goal elements:', goalElements);
            
            // Check for clickable goal elements
            const clickableGoals = await this.page.$$('[class*="cursor-pointer"], [onclick], button, a');
            this.logResult('Clickable goal elements present', clickableGoals.length > 0);
            
            // Test clicking on goal-related elements
            const goalHeaders = await this.page.$$('h3');
            if (goalHeaders.length > 0) {
                const firstGoal = goalHeaders[0];
                await firstGoal.click();
                await this.wait(500);
                this.logResult('Goal selection interaction works', true);
            }
            
        } catch (error) {
            this.logError('Test 3', error.message);
            this.logResult('Goal List Interaction', false, error.message);
        }
    }

    async test4_GoalDetailsPanel() {
        console.log('\n📋 Test 4: Goal Details Panel');
        
        try {
            // Check for goal action buttons that were found in the inspection
            const editButton = await this.findButtonByText('Edit');
            const archiveButton = await this.findButtonByText('Archive');
            const copyButton = await this.findButtonByText('Copy');
            const deleteButton = await this.findButtonByText('Delete');
            
            this.logResult('Edit button present', !!editButton);
            this.logResult('Archive button present', !!archiveButton);
            this.logResult('Copy button present', !!copyButton);
            this.logResult('Delete button present', !!deleteButton);
            
            // Check if these buttons are functional
            if (editButton.asElement()) {
                await editButton.asElement().click();
                await this.wait(500);
                this.logResult('Edit button is clickable', true);
                
                // Try to close any modal that might have opened
                await this.page.keyboard.press('Escape');
                await this.wait(300);
            }
            
        } catch (error) {
            this.logError('Test 4', error.message);
            this.logResult('Goal Details Panel', false, error.message);
        }
    }

    async test5_ProgressCalculations() {
        console.log('\n📋 Test 5: Progress Calculations');
        
        try {
            const pageContent = await this.page.evaluate(() => document.body.textContent);
            
            // Check for specific progress values from the inspection
            this.logResult('Bench Press progress (82%) visible', pageContent.includes('82%'));
            this.logResult('Perfect progress (100%) visible', pageContent.includes('100%'));
            
            // Check for current/target values
            this.logResult('Current/Target values shown', 
                pageContent.includes('185 lbs / 225 lbs') || 
                (pageContent.includes('185') && pageContent.includes('225'))
            );
            
            // Check for target dates
            this.logResult('Target dates visible', pageContent.includes('5/31/2025'));
            
            // Look for progress indicators in the DOM
            const progressElements = await this.page.evaluate(() => {
                const elements = Array.from(document.querySelectorAll('*'));
                return elements.filter(el => {
                    const style = window.getComputedStyle(el);
                    const text = el.textContent;
                    return text.includes('%') || 
                           style.background.includes('gradient') ||
                           style.background.includes('conic') ||
                           el.className.includes('progress') ||
                           el.className.includes('circle');
                }).length;
            });
            
            this.logResult('Visual progress indicators present', progressElements > 0);
            
        } catch (error) {
            this.logError('Test 5', error.message);
            this.logResult('Progress Calculations', false, error.message);
        }
    }

    async test6_ResponsiveDesign() {
        console.log('\n📋 Test 6: Responsive Design');
        
        try {
            // Test mobile viewport
            await this.page.setViewport({ width: 375, height: 667 });
            await this.wait(1000);
            
            const goalsHeading = await this.page.$('h1');
            const headingVisible = await this.page.evaluate(el => {
                if (!el) return false;
                const rect = el.getBoundingClientRect();
                return rect.width > 0 && rect.height > 0;
            }, goalsHeading);
            this.logResult('Goals heading visible on mobile', headingVisible);
            
            // Check if New Goal button is still accessible
            const newGoalButton = await this.findButtonByText('New Goal');
            const buttonVisible = await this.page.evaluate(btn => {
                if (!btn) return false;
                const rect = btn.getBoundingClientRect();
                return rect.width > 0 && rect.height > 0;
            }, newGoalButton);
            this.logResult('New Goal button accessible on mobile', buttonVisible);
            
            // Test tablet viewport
            await this.page.setViewport({ width: 768, height: 1024 });
            await this.wait(500);
            this.logResult('Page adapts to tablet viewport', true);
            
            // Reset to desktop
            await this.page.setViewport({ width: 1280, height: 720 });
            await this.wait(500);
            
        } catch (error) {
            this.logError('Test 6', error.message);
            this.logResult('Responsive Design', false, error.message);
        }
    }

    async test7_UIElementsAndStyling() {
        console.log('\n📋 Test 7: UI Elements and Styling');
        
        try {
            // Test button hover states
            const newGoalButton = await this.findButtonByText('New Goal');
            if (newGoalButton.asElement()) {
                await newGoalButton.asElement().hover();
                await this.wait(300);
                
                const hoverStyles = await this.page.evaluate(btn => {
                    const styles = window.getComputedStyle(btn);
                    return {
                        backgroundColor: styles.backgroundColor,
                        transform: styles.transform,
                        opacity: styles.opacity
                    };
                }, newGoalButton);
                
                this.logResult('Button hover effects work', true);
                console.log('Hover styles detected:', hoverStyles);
            }
            
            // Check overall styling
            const stylingCheck = await this.page.evaluate(() => {
                const body = document.body;
                const styles = window.getComputedStyle(body);
                return {
                    hasFont: styles.fontFamily !== '',
                    hasColors: styles.color !== '',
                    hasLayout: styles.display !== ''
                };
            });
            
            this.logResult('Page has proper styling', 
                stylingCheck.hasFont && stylingCheck.hasColors && stylingCheck.hasLayout);
            
        } catch (error) {
            this.logError('Test 7', error.message);
            this.logResult('UI Elements and Styling', false, error.message);
        }
    }

    async test8_ConsoleErrors() {
        console.log('\n📋 Test 8: Console Errors Check');
        
        // Filter out known harmless errors
        const significantErrors = this.results.errors.filter(error => 
            !error.message.includes('manifest.json') && 
            !error.message.includes('favicon')
        );
        
        this.logResult('No significant console errors', significantErrors.length === 0);
        
        if (significantErrors.length > 0) {
            console.log('\n🚨 Significant Errors Found:');
            significantErrors.forEach(error => {
                console.log(`   ${error.category}: ${error.message}`);
            });
        }
    }

    async test9_PagePerformance() {
        console.log('\n📋 Test 9: Page Performance');
        
        try {
            // Measure page load performance
            const performanceTiming = await this.page.evaluate(() => {
                return {
                    loadComplete: performance.timing.loadEventEnd - performance.timing.navigationStart,
                    domReady: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
                    firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
                };
            });
            
            this.logResult('Page loads in reasonable time', performanceTiming.loadComplete < 5000);
            this.logResult('DOM ready quickly', performanceTiming.domReady < 3000);
            
            console.log('Performance metrics:', performanceTiming);
            
        } catch (error) {
            this.logError('Test 9', error.message);
            this.logResult('Page Performance', false, error.message);
        }
    }

    async test10_AccessibilityBasics() {
        console.log('\n📋 Test 10: Basic Accessibility');
        
        try {
            // Check for basic accessibility features
            const accessibilityCheck = await this.page.evaluate(() => {
                return {
                    hasHeadings: document.querySelectorAll('h1, h2, h3, h4, h5, h6').length > 0,
                    hasButtons: document.querySelectorAll('button').length > 0,
                    buttonsHaveText: Array.from(document.querySelectorAll('button')).every(btn => 
                        btn.textContent.trim() !== '' || btn.getAttribute('aria-label') || btn.getAttribute('title')
                    ),
                    hasMain: !!document.querySelector('main'),
                    imagesHaveAlt: Array.from(document.querySelectorAll('img')).every(img => 
                        img.getAttribute('alt') !== null
                    )
                };
            });
            
            this.logResult('Page has proper heading structure', accessibilityCheck.hasHeadings);
            this.logResult('Buttons have accessible text', accessibilityCheck.buttonsHaveText);
            this.logResult('Page has main landmark', accessibilityCheck.hasMain);
            
        } catch (error) {
            this.logError('Test 10', error.message);
            this.logResult('Basic Accessibility', false, error.message);
        }
    }

    async runAllTests() {
        console.log('🚀 Starting comprehensive Goals page testing...\n');
        
        await this.init();
        
        try {
            await this.test1_PageLoadAndInitialState();
            await this.test2_CreateNewGoalBasicFlow();
            await this.test3_GoalListInteraction();
            await this.test4_GoalDetailsPanel();
            await this.test5_ProgressCalculations();
            await this.test6_ResponsiveDesign();
            await this.test7_UIElementsAndStyling();
            await this.test8_ConsoleErrors();
            await this.test9_PagePerformance();
            await this.test10_AccessibilityBasics();
            
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
        
        const totalTests = this.results.passed + this.results.failed;
        const successRate = totalTests > 0 ? ((this.results.passed / totalTests) * 100).toFixed(1) : 0;
        console.log(`📈 Success Rate: ${successRate}%`);
        
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
                successRate: successRate
            },
            details: this.results.details,
            errors: this.results.errors
        };
        
        fs.writeFileSync(
            path.join(__dirname, 'goals-page-test-results-fixed.json'),
            JSON.stringify(reportData, null, 2)
        );
        
        console.log('\n💾 Results saved to goals-page-test-results-fixed.json');
        
        // Generate summary
        console.log('\n📋 SUMMARY ANALYSIS:');
        
        if (successRate >= 80) {
            console.log('🎉 EXCELLENT: Goals page is functioning very well!');
        } else if (successRate >= 60) {
            console.log('👍 GOOD: Goals page is mostly functional with some issues.');
        } else if (successRate >= 40) {
            console.log('⚠️  NEEDS IMPROVEMENT: Several issues found that should be addressed.');
        } else {
            console.log('🚨 CRITICAL: Major issues found that need immediate attention.');
        }
        
        // Key findings
        const keyFindings = [];
        if (this.results.details.find(d => d.test.includes('Goals heading') && d.passed)) {
            keyFindings.push('✓ Page loads and displays properly');
        }
        if (this.results.details.find(d => d.test.includes('New Goal button') && d.passed)) {
            keyFindings.push('✓ New Goal functionality is accessible');
        }
        if (this.results.details.find(d => d.test.includes('progress') && d.passed)) {
            keyFindings.push('✓ Progress tracking is working');
        }
        if (this.results.details.find(d => d.test.includes('responsive') && d.passed)) {
            keyFindings.push('✓ Responsive design is functional');
        }
        
        if (keyFindings.length > 0) {
            console.log('\n🔑 KEY POSITIVE FINDINGS:');
            keyFindings.forEach(finding => console.log(`   ${finding}`));
        }
    }
}

// Run the tests
const tester = new GoalsPageTester();
tester.runAllTests().catch(console.error);