"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const __1 = require("../");
describe('angularjs homepage todo list', () => {
    it('should add a todo', async () => {
        protractor_1.browser.get('https://angularjs.org');
        const imageComparison = new __1.ImageComparison();
        await imageComparison.checkPage('startPage');
        protractor_1.element(protractor_1.by.model('todoList.todoText')).sendKeys('write first protractor test');
        protractor_1.element(protractor_1.by.css('[value="add"]')).click();
        await imageComparison.checkElement(protractor_1.element(protractor_1.by.model('todoList.todoText')), 'anElement after adding');
    });
});
//# sourceMappingURL=example.spec.js.map