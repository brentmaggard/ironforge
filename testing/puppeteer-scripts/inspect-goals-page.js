const puppeteer = require('puppeteer');

async function inspectGoalsPage() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    try {
        await page.goto('http://localhost:3000/goals', { waitUntil: 'networkidle0' });
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        console.log('📋 Inspecting Goals Page Structure...\n');
        
        // Get page title and heading
        const title = await page.title();
        console.log(`Page Title: ${title}`);
        
        // Get all headings
        const headings = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
                tag: h.tagName,
                text: h.textContent.trim()
            }));
        });
        console.log('Headings found:', headings);
        
        // Get all buttons
        const buttons = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('button')).map(btn => ({
                text: btn.textContent.trim(),
                className: btn.className,
                id: btn.id,
                disabled: btn.disabled,
                type: btn.type
            }));
        });
        console.log('Buttons found:', buttons);
        
        // Get page structure
        const structure = await page.evaluate(() => {
            const getElementInfo = (el) => ({
                tag: el.tagName.toLowerCase(),
                id: el.id,
                className: el.className,
                textContent: el.textContent.trim().substring(0, 100)
            });
            
            return {
                body: getElementInfo(document.body),
                main: document.querySelector('main') ? getElementInfo(document.querySelector('main')) : null,
                goalsList: document.querySelector('[class*="goal"], [data-testid*="goal"]') ? 'Found goals container' : 'No goals container found',
                forms: Array.from(document.querySelectorAll('form')).map(getElementInfo),
                modals: Array.from(document.querySelectorAll('[class*="modal"], [role="dialog"]')).map(getElementInfo)
            };
        });
        console.log('Page structure:', JSON.stringify(structure, null, 2));
        
        // Look for specific goal-related elements
        const goalElements = await page.evaluate(() => {
            const selectors = [
                '[class*="goal"]',
                '[data-testid*="goal"]',
                '[class*="card"]',
                '.goal-item',
                '.goal-card',
                '[id*="goal"]'
            ];
            
            const results = {};
            selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                if (elements.length > 0) {
                    results[selector] = Array.from(elements).map(el => ({
                        tag: el.tagName.toLowerCase(),
                        className: el.className,
                        id: el.id,
                        text: el.textContent.trim().substring(0, 50)
                    }));
                }
            });
            return results;
        });
        console.log('Goal-related elements:', JSON.stringify(goalElements, null, 2));
        
        // Take a screenshot
        await page.screenshot({ path: 'goals-page-screenshot.png', fullPage: true });
        console.log('Screenshot saved as goals-page-screenshot.png');
        
    } catch (error) {
        console.error('Error inspecting page:', error);
    } finally {
        await browser.close();
    }
}

inspectGoalsPage();