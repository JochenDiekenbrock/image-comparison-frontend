import { browser, by, element } from 'protractor';
import { ImageComparison } from '../src';

describe('angularjs homepage todo list', () => {
    it('should add a todo', async () => {
        browser.get('https://angularjs.org');

        const imageComparison = new ImageComparison();
        await imageComparison.checkScreen('startPage');

        element(by.model('todoList.todoText')).sendKeys('write first protractor test');
        element(by.css("[value='add']")).click();

        await imageComparison.checkElement(element(by.model('todoList.todoText')), 'anElement');

        const todoList = element.all(by.repeater('todo in todoList.todos'));
        expect(todoList.count()).toEqual(3);
    });
});
