import { browser, by, element } from 'protractor';

import { ImageComparison } from '../';

describe('angularjs homepage todo list', () => {
    it('should add a todo', async () => {
        await browser.get('https://angularjs.org');

        const imageComparison = new ImageComparison({ reportPath: browser.params.reportPath });

        // await browser.executeScript('window.scrollTo(0,0);');
        const input = element(by.model('todoList.todoText'));
        input.sendKeys('write first protractor test');
        await element(by.css('[value="add"]')).click();

        await imageComparison.checkElement(input, 'anElement after adding');

        await imageComparison.checkPage('startPage');
    });
});
