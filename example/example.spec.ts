import { browser, by, element } from "protractor";

describe("angularjs homepage todo list", () => {
    it("should add a todo", () => {
        browser.get("https://angularjs.org");

        element(by.model("todoList.todoText")).sendKeys(
            "write first protractor test"
        );
        element(by.css("[value='add']")).click();

        const todoList = element.all(by.repeater("todo in todoList.todos"));
        expect(todoList.count()).toEqual(3);
    });
});
