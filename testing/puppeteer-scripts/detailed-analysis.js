const puppeteer = require('puppeteer');

async function detailedAnalysis() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    try {
        await page.goto('http://localhost:3000/goals', { waitUntil: 'networkidle0' });
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log('🔍 DETAILED ANALYSIS OF GOALS PAGE\n');
        
        // 1. Analyze the create goal form
        console.log('1. CREATE GOAL FORM ANALYSIS:');
        
        const newGoalBtn = await page.evaluateHandle(() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            return buttons.find(btn => btn.textContent.trim().includes('New Goal'));
        });
        
        if (newGoalBtn.asElement()) {
            await newGoalBtn.asElement().click();
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const formAnalysis = await page.evaluate(() => {
                const modal = document.querySelector('[role="dialog"]');
                if (!modal) return { modalFound: false };
                
                return {
                    modalFound: true,
                    modalTitle: modal.querySelector('h2, h3, .modal-title')?.textContent?.trim(),
                    formFields: Array.from(modal.querySelectorAll('input, select, textarea')).map(field => ({
                        type: field.type,
                        name: field.name,
                        placeholder: field.placeholder,
                        required: field.required,
                        value: field.value
                    })),
                    buttons: Array.from(modal.querySelectorAll('button')).map(btn => ({
                        text: btn.textContent.trim(),
                        type: btn.type,
                        disabled: btn.disabled
                    })),
                    goalTypeButtons: Array.from(modal.querySelectorAll('button')).filter(btn => 
                        ['Strength', 'Endurance', 'Weight Loss', 'Consistency'].some(type => 
                            btn.textContent.includes(type)
                        )
                    ).map(btn => btn.textContent.trim()),
                    colorOptions: modal.querySelectorAll('[class*="color"], .color-option').length
                };
            });
            
            console.log('Modal Analysis:', JSON.stringify(formAnalysis, null, 2));
            
            // Test form interactions
            if (formAnalysis.modalFound) {
                console.log('\n2. FORM INTERACTION TESTS:');
                
                // Fill out the form
                const nameField = await page.$('input[name="name"]');
                if (nameField) {
                    await nameField.type('Test Goal for Analysis');
                    console.log('✓ Goal name field works');
                }
                
                // Try to select goal type
                const strengthBtn = await page.evaluateHandle(() => {
                    const buttons = Array.from(document.querySelectorAll('button'));
                    return buttons.find(btn => btn.textContent.includes('Strength'));
                });
                
                if (strengthBtn.asElement()) {
                    await strengthBtn.asElement().click();
                    await new Promise(resolve => setTimeout(resolve, 300));
                    console.log('✓ Goal type selection works');
                }
                
                // Fill target and current values
                const targetField = await page.$('input[name="target_value"]');
                const currentField = await page.$('input[name="current_value"]');
                
                if (targetField && currentField) {
                    await targetField.type('225');
                    await currentField.type('185');
                    console.log('✓ Value fields work');
                }
                
                // Try to submit
                const createBtn = await page.evaluateHandle(() => {
                    const buttons = Array.from(document.querySelectorAll('button'));
                    return buttons.find(btn => btn.textContent.includes('Create') && btn.type === 'submit');
                });
                
                if (createBtn.asElement()) {
                    await createBtn.asElement().click();
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    console.log('✓ Create button clicked');
                    
                    // Check if goal was created
                    const goalCreated = await page.evaluate(() => {
                        return document.body.textContent.includes('Test Goal for Analysis');
                    });
                    console.log(goalCreated ? '✓ Goal creation successful' : '✗ Goal creation failed');
                }
            }
        }
        
        // 3. Analyze existing goals display
        console.log('\n3. EXISTING GOALS ANALYSIS:');
        
        const goalsAnalysis = await page.evaluate(() => {
            const body = document.body;
            const text = body.textContent;
            
            return {
                hasActiveGoalsCount: text.includes('Active goals'),
                hasBenchPress: text.includes('Bench Press'),
                hasRunning: text.includes('Run 5K'),
                progressPercentages: (text.match(/\d+%/g) || []),
                currentTargetValues: {
                    bench185: text.includes('185'),
                    bench225: text.includes('225'),
                    lbsUnit: text.includes('lbs'),
                    minutesUnit: text.includes('minutes')
                },
                targetDates: (text.match(/\d{1,2}\/\d{1,2}\/\d{4}/g) || []),
                visualElements: {
                    progressCircles: document.querySelectorAll('[class*="progress"], [style*="conic"], [style*="circle"]').length,
                    goalCards: document.querySelectorAll('[class*="goal"], [class*="card"]').length
                }
            };
        });
        
        console.log('Goals Display Analysis:', JSON.stringify(goalsAnalysis, null, 2));
        
        // 4. Test goal selection and details
        console.log('\n4. GOAL INTERACTION ANALYSIS:');
        
        const goalHeaders = await page.$$('h3');
        if (goalHeaders.length > 0) {
            await goalHeaders[0].click();
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const detailsAnalysis = await page.evaluate(() => {
                return {
                    editBtnVisible: !!Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('Edit')),
                    archiveBtnVisible: !!Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('Archive')),
                    copyBtnVisible: !!Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('Copy')),
                    deleteBtnVisible: !!Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('Delete')),
                    goalSelected: document.querySelector('.selected, .active, [aria-selected="true"]') !== null
                };
            });
            
            console.log('Goal Details Analysis:', JSON.stringify(detailsAnalysis, null, 2));
        }
        
        // 5. Accessibility analysis
        console.log('\n5. ACCESSIBILITY ANALYSIS:');
        
        const a11yAnalysis = await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const images = Array.from(document.querySelectorAll('img'));
            
            return {
                buttonsWithoutText: buttons.filter(btn => 
                    !btn.textContent.trim() && 
                    !btn.getAttribute('aria-label') && 
                    !btn.getAttribute('title')
                ).length,
                totalButtons: buttons.length,
                imagesWithoutAlt: images.filter(img => !img.getAttribute('alt')).length,
                totalImages: images.length,
                headingStructure: Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => h.tagName),
                focusableElements: document.querySelectorAll('button, a, input, select, textarea, [tabindex]').length
            };
        });
        
        console.log('Accessibility Analysis:', JSON.stringify(a11yAnalysis, null, 2));
        
        // 6. Performance analysis
        console.log('\n6. PERFORMANCE ANALYSIS:');
        
        const perfMetrics = await page.evaluate(() => {
            const perf = performance.timing;
            const paintEntries = performance.getEntriesByType('paint');
            
            return {
                pageLoadTime: perf.loadEventEnd - perf.navigationStart,
                domReadyTime: perf.domContentLoadedEventEnd - perf.navigationStart,
                firstPaint: paintEntries.find(entry => entry.name === 'first-paint')?.startTime || 0,
                firstContentfulPaint: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
                resourceCount: performance.getEntriesByType('resource').length
            };
        });
        
        console.log('Performance Metrics:', JSON.stringify(perfMetrics, null, 2));
        
        // Take final screenshot
        await page.screenshot({ path: 'goals-page-final-analysis.png', fullPage: true });
        console.log('\n📸 Final screenshot saved as goals-page-final-analysis.png');
        
    } catch (error) {
        console.error('Analysis error:', error);
    } finally {
        await browser.close();
    }
}

detailedAnalysis();