import { browser, by, element } from 'protractor';

import { ImageComparison } from '../';

describe('angularjs homepage todo list', () => {
    it('should add a todo', async () => {
        browser.get('https://angularjs.org');

        const imageComparison = new ImageComparison();
        await imageComparison.checkScreen('startPage');

        element(by.model('todoList.todoText')).sendKeys('write first protractor test');
        // element(by.css('[value="add"]')).click();

        await imageComparison.checkElement(element(by.model('todoList.todoText')), 'anElement');
    });
});