"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const __1 = require("../");
const scrollIntoView = async (el) => {
    await protractor_1.browser.executeScript((finder) => {
        finder.scrollIntoView();
    }, el.getWebElement());
};
describe('angularjs homepage todo list', () => {
    it('should add a todo', async () => {
        await protractor_1.browser.get('https://angularjs.org');
        const imageComparison = new __1.ImageComparison({ reportPath: protractor_1.browser.params.reportPath });
        await protractor_1.browser.executeScript('window.scrollTo(0,0);');
        const input = protractor_1.element(protractor_1.by.model('todoList.todoText'));
        // await scrollIntoView(input);
        input.sendKeys('write first protractor test');
        protractor_1.element(protractor_1.by.css('[value="add"]')).click();
        await imageComparison.checkElement(input, 'anElement after adding');
        await imageComparison.checkPage('startPage');
        // await browser.actions().mouseMove(input).perform();
        // await input.getWebElement().scrollIntoView();
        // await browser.sleep(5 * 1000);
    });
});
//# sourceMappingURL=example.spec.js.map