import { expect, Locator, Page } from "@playwright/test";
import { ToDoItem } from "../organisms/ToDoItem";
import { faker } from "@faker-js/faker/locale/en";

export class ToDoPage {
  readonly page: Page;
  private readonly url = "https://todo-app.tallinn-learning.ee/";
  readonly header: Locator;
  readonly main: Locator;
  readonly footer: Locator;
  readonly todoItemInput: Locator;
  //readonly externalFooter: Locator

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByTestId("header");
    this.main = page.getByTestId("main");
    this.footer = page.getByTestId("footer");
    this.todoItemInput = page.getByTestId("text-input");
  }

  getToDoItemByIndex(index: number): ToDoItem {
    return new ToDoItem(this.main.getByTestId("todo-item").nth(index));
  }

  getToDoItemByText(text: string): ToDoItem {
    return new ToDoItem(
      this.main.locator('[data-testid="todo-item"]', { hasText: text }),
    );
  }

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  async createToDoItem(text?: string): Promise<ToDoItem> {
    await this.todoItemInput.fill(
      text == undefined ? faker.word.words(2) : text,
    );
    await this.todoItemInput.press("Enter");

    const todoItems = this.main.getByTestId("todo-item");
    const itemCount = await todoItems.count();
    return this.getToDoItemByIndex(itemCount - 1);
  }

  async checkToDoItemsVisible(expectedCount: number): Promise<void> {
    //const todoItems: ToDoItem[] = this.main.getByTestId('todo-item');
    const itemCount: number = await this.main.getByTestId("todo-item").count();
    expect(itemCount).toBe(expectedCount);
  }

  // Homework 19
  async clearCompleted(): Promise<void> {
    const footerClearCompleted = await this.footer.getByRole("button", {
      name: "Clear completed",
    });
    await footerClearCompleted.click();
  }

  async completed(): Promise<void> {
    const footerCompleted = await this.footer.getByRole("link", {
      name: "Completed",
    });
    await footerCompleted.click();
    await expect(footerCompleted).toHaveClass("selected");
  }

  async active(): Promise<void> {
    const footerActive = await this.footer.getByRole("link", {
      name: "Active",
    });
    await footerActive.click();
    await expect(footerActive).toHaveClass("selected");
  }

  async all(): Promise<void> {
    const all = await this.footer.getByRole("link", { name: "All" });
    await all.click();
    await expect(all).toHaveClass("selected");
  }
}
