const puppeteer = require('puppeteer');

async function debugGoalsContent() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    try {
        await page.goto('http://localhost:3000/goals', { waitUntil: 'networkidle0' });
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        console.log('🔍 DEBUGGING GOALS PAGE CONTENT\n');
        
        // Get the exact text content
        const fullText = await page.evaluate(() => document.body.textContent);
        console.log('FULL PAGE TEXT:');
        console.log('='.repeat(80));
        console.log(fullText);
        console.log('='.repeat(80));
        
        // Get HTML structure
        const htmlStructure = await page.evaluate(() => {
            const main = document.querySelector('main');
            return main ? main.innerHTML : document.body.innerHTML;
        });
        
        console.log('\nHTML STRUCTURE (truncated):');
        console.log('='.repeat(80));
        console.log(htmlStructure.substring(0, 2000) + (htmlStructure.length > 2000 ? '...' : ''));
        console.log('='.repeat(80));
        
        // Check for specific elements by different selectors
        const elementAnalysis = await page.evaluate(() => {
            return {
                divs: document.querySelectorAll('div').length,
                spans: document.querySelectorAll('span').length,
                sections: document.querySelectorAll('section').length,
                articles: document.querySelectorAll('article').length,
                allElementsWithBench: Array.from(document.querySelectorAll('*')).filter(el => 
                    el.textContent.includes('Bench')).map(el => ({
                    tag: el.tagName,
                    className: el.className,
                    text: el.textContent.trim().substring(0, 100)
                })),
                allElementsWithPercent: Array.from(document.querySelectorAll('*')).filter(el => 
                    el.textContent.includes('%')).map(el => ({
                    tag: el.tagName,
                    className: el.className,
                    text: el.textContent.trim().substring(0, 50)
                }))
            };
        });
        
        console.log('\nELEMENT ANALYSIS:');
        console.log(JSON.stringify(elementAnalysis, null, 2));
        
        // Try clicking New Goal to see the form
        console.log('\n🔄 TESTING NEW GOAL FORM...');
        
        const newGoalButton = await page.evaluateHandle(() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            return buttons.find(btn => btn.textContent.trim().includes('New Goal'));
        });
        
        if (newGoalButton.asElement()) {
            console.log('Found New Goal button, clicking...');
            await newGoalButton.asElement().click();
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Check what appeared
            const afterClick = await page.evaluate(() => {
                return {
                    modals: document.querySelectorAll('[role="dialog"], .modal').length,
                    forms: document.querySelectorAll('form').length,
                    overlays: document.querySelectorAll('.overlay, .backdrop').length,
                    newText: document.body.textContent
                };
            });
            
            console.log('After clicking New Goal:');
            console.log(JSON.stringify(afterClick, null, 2));
            
            if (afterClick.newText !== fullText) {
                console.log('\n📝 NEW CONTENT APPEARED:');
                const newContent = afterClick.newText.replace(fullText, '');
                console.log(newContent);
            }
        }
        
        // Take screenshot of current state
        await page.screenshot({ path: 'goals-debug-screenshot.png', fullPage: true });
        console.log('\n📸 Debug screenshot saved');
        
    } catch (error) {
        console.error('Debug error:', error);
    } finally {
        await browser.close();
    }
}

debugGoalsContent();