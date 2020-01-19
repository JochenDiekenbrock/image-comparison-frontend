"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const __1 = require("../");
describe('angularjs homepage todo list', () => {
    it('should add a todo', async () => {
        await protractor_1.browser.get('https://angularjs.org');
        const imageComparison = new __1.ImageComparison({ reportPath: protractor_1.browser.params.reportPath });
        // await browser.executeScript('window.scrollTo(0,0);');
        const input = protractor_1.element(protractor_1.by.model('todoList.todoText'));
        input.sendKeys('write first protractor test');
        await protractor_1.element(protractor_1.by.css('[value="add"]')).click();
        await imageComparison.checkElement(input, 'anElement after adding');
        await imageComparison.checkPage('startPage');
    });
});
//# sourceMappingURL=example.spec.js.map