import { browser, by, element } from "protractor";

describe("angularjs homepage todo list", () => {
    it("should add a todo", () => {
        browser.get("https://angularjs.org");

        expect(
            browser.protractorImageComparison.checkScreen("startPage")
        ).toEqual(0);

        element(by.model("todoList.todoText")).sendKeys(
            "write first protractor test"
        );
        element(by.css("[value='add']")).click();

        expect(
            browser.protractorImageComparison.checkElement(
                element(by.model("todoList.todoText")),
                "anElement"
            )
        ).toEqual(0);

        const todoList = element.all(by.repeater("todo in todoList.todos"));
        expect(todoList.count()).toEqual(3);
    });
});
