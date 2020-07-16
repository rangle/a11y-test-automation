
import {  getDocument, /* getQueriesForElement */ } from 'pptr-testing-library';

describe('E2E Test', () => {

    let $document: any;

    beforeEach(async () => {
        // Given: Any User
        // When: They land on the Homepage
        await page.goto('http://localhost:3000');
        $document = await getDocument(page);
    });

    it.skip('dnu', async ()=> {
      console.log($document);
    })

    it('should have title "A11y Demo"', async () => {
      // Then: The page-title is Correct
      await expect(page.title()).resolves.toMatch('A11y Demo');
    });

    
    it('should have a <Tabs> component', async () => {
      // Then: the Tabs Component exists
      const component = await page.waitForSelector('#tabsDemo');
      expect(component).toBeDefined();
    });

    it('Can keyboard tab in and out of the TabList', async () => {

      // And When: The User presses the <Tab> key
      await page.focus('body');
      await page.keyboard.press('Tab');
      
      const activeElement = await page.evaluateHandle(()=>document.activeElement);
      const tabs = await page.$$('[role=tab]');

      // Then: The focus is on the Second Tab
      expect(await page.evaluate((a,b)=> a === b, activeElement, tabs[1])).toEqual(true);

      // And Then: The <Tab> key is pressed again
      await page.keyboard.press('Tab');
      const activeElement2 = await page.evaluateHandle(()=>document.activeElement);
      
      // And Then:  The focus is no longer in the tabs
      expect(await page.evaluate((a,b)=> a === b, activeElement2, tabs[1])).toEqual(false);
      
    })

});