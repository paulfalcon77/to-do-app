import { test, expect } from "@playwright/test";
import { ToDoPage } from "../poms/pages/ToDoPage";

test("Create to-do item", async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  await toDoPage.checkToDoItemsVisible(0);
  await toDoPage.createToDoItem();
  await toDoPage.checkToDoItemsVisible(1);
});

test("Create 2 to-do item", async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  await toDoPage.createToDoItem();
  await toDoPage.createToDoItem();
  await toDoPage.checkToDoItemsVisible(2);
});

test("Activate card test", async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  const createdToDo = await toDoPage.createToDoItem();
  await toDoPage.checkToDoItemsVisible(1);
  await createdToDo.activate();
  await createdToDo.checkIsActivated();
});

test("Activate card test - search by text", async ({ page }) => {
  const cardText = "test text";
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  await toDoPage.createToDoItem(cardText);
  await toDoPage.checkToDoItemsVisible(1);
  const createdToDo = toDoPage.getToDoItemByText(cardText);
  await createdToDo.activate();
  await createdToDo.checkIsActivated();
});

test("Delete card test", async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  const createdToDo = await toDoPage.createToDoItem();
  await toDoPage.checkToDoItemsVisible(1);
  await createdToDo.deleteItem();
  await toDoPage.checkToDoItemsVisible(0);
});

// Homework 19

test("Create 2 to-do item and check Clear completed ", async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  await toDoPage.createToDoItem();
  await toDoPage.createToDoItem();
  await toDoPage.checkToDoItemsVisible(2);
  const createdToDo = toDoPage.getToDoItemByIndex(0);
  await createdToDo.activate();
  await createdToDo.checkIsActivated();
  await toDoPage.clearCompleted();
  await toDoPage.checkToDoItemsVisible(1);
});

test("Create 2 to-do item and check Completed and ALL links ", async ({
  page,
}) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  await toDoPage.createToDoItem();
  await toDoPage.createToDoItem();
  await toDoPage.checkToDoItemsVisible(2);
  const createdToDo = toDoPage.getToDoItemByIndex(0);
  await createdToDo.activate();
  await createdToDo.checkIsActivated();
  await toDoPage.completed();
  await toDoPage.checkToDoItemsVisible(1);
  await toDoPage.all();
  await toDoPage.checkToDoItemsVisible(2);
});

test("Create 2 to-do item and check Active and ALL links ", async ({
  page,
}) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  await toDoPage.createToDoItem();
  await toDoPage.createToDoItem();
  await toDoPage.checkToDoItemsVisible(2);
  const createdToDo = toDoPage.getToDoItemByIndex(0);
  await createdToDo.activate();
  await createdToDo.checkIsActivated();
  await toDoPage.active();
  await toDoPage.checkToDoItemsVisible(1);
  await toDoPage.all();
  await toDoPage.checkToDoItemsVisible(2);
});

//npx playwright test -g "Activate card test" --debug
