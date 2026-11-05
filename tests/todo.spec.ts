import {test, expect} from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';



test.describe('Todo Page',()=> {
    test.beforeEach(async ({ page }) => {
        await page.goto('/todos');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
    });

    test('user can add todos', async ({page})=>{
        
        const todoPage= new TodoPage(page);

        await todoPage.addTodo("Learn Playwright");
        await todoPage.addTodo("Write tests");
        await expect(todoPage.getTodo('Learn Playwright') ).toContainText('Learn Playwright');

        await expect(todoPage.getTodo('Write tests')).toContainText('Write tests');

    });

    test('user can delete a todo', async ({ page }) => {
        
        const todoPage= new TodoPage(page);
        await todoPage.addTodo("Learn Playwright");
        
        await todoPage.addTodo("Write tests");
        
        const playwrighttodo = todoPage.getTodo('Learn Playwright');
        const teststodo = todoPage.getTodo('Write tests');
        await playwrighttodo.getByRole('button',{name : "Delete"}).click();
        
        await expect(playwrighttodo).toHaveCount(0);
        await expect(teststodo).toContainText('Write tests');
    })

    test('check form behaviour', async ({ page }) => {
        
        const todoPage = new TodoPage(page);
        await todoPage.todoInput.fill("Learn Playwright");
        await expect(todoPage.todoInput).toHaveValue("Learn Playwright");
        await todoPage.addButton.click();
        const todo = todoPage.getTodo('Learn Playwright');
        await expect(todo).toContainText('Learn Playwright');
        await expect(todoPage.todoInput).toHaveValue("");
    })

    test('input clears after todo is added', async ({ page })=>{
        
        const todoPage = new TodoPage(page);
        await todoPage.addTodo('Learn playwright');
        await expect(todoPage.todoInput).toHaveValue("");
    })

    test('user can add todo by pressing enter', async ({page})=>{
        
        const todoPage = new TodoPage(page);
        await todoPage.todoInput.fill("Learn Playwright");
        await todoPage.todoInput.press('Enter');

        await expect(todoPage.getTodo('Learn Playwright')).toContainText('Learn Playwright');
    })

    test('should keep a todo after page reload', async ({ page }) => {
        const todoPage = new TodoPage(page);
        const todoText = 'Learn Playwright';

        await todoPage.addTodo(todoText);

        await expect(todoPage.getTodo(todoText)).toContainText(todoText);

        await page.reload();

        await expect(todoPage.getTodo(todoText)).toContainText(todoText);
        });

    test('should not add an empty todo', async ({ page }) => {
        await page.getByRole('button', { name: 'Add' }).click();
        await expect(page.locator('.todo-list .todo-item')).toHaveCount(0);
        //await expect(page.getByRole('listitem')).toHaveCount(0);
    });

    test('should not add a whitespace-only todo', async ({ page }) => {
        await page.getByPlaceholder('Enter new to-do item').fill('   ');
        await page.getByRole('button', { name: 'Add' }).click();

        await expect(page.getByRole('listitem')).toHaveCount(0);
    });

    test('active filter shows only incomplete todos', async ({page}) => {
        const todoPage = new TodoPage(page);
        await todoPage.addTodo("Learn Playwright");
        await todoPage.addTodo("Learn Git");
        await todoPage.completeTodo("Learn Playwright");
        await expect(todoPage.getTodo("Learn Playwright").getByRole('checkbox')).toBeChecked();
        
        await todoPage.selectFilter("Active");
        await expect(todoPage.getTodo("Learn Git")).toBeVisible();
        await expect(todoPage.getTodo("Learn Playwright")).toHaveCount(0);
    });

    test('completed filter shows only completed todos', async ({page}) => {
        const todoPage = new TodoPage(page);
        await todoPage.addTodo("Learn Playwright");
        await todoPage.addTodo("Learn Git");
        await todoPage.completeTodo("Learn Playwright");
        await expect(todoPage.getTodo("Learn Playwright").getByRole('checkbox')).toBeChecked();
        await todoPage.selectFilter("Completed");
        await expect(todoPage.getTodo("Learn Playwright")).toBeVisible();
        await expect(todoPage.getTodo("Learn Git")).toHaveCount(0);
    });

    test('all filter shows both completed and active todos', async ({page}) => {
        const todoPage = new TodoPage(page);
        await todoPage.addTodo("Learn Playwright");
        await todoPage.addTodo("Learn Git");
        await todoPage.completeTodo("Learn Playwright");
        await expect(todoPage.getTodo("Learn Playwright").getByRole('checkbox')).toBeChecked();
        await todoPage.selectFilter("Completed");
        await todoPage.selectFilter("All");
        await expect(todoPage.getTodo("Learn Playwright")).toBeVisible();
        await expect(todoPage.getTodo("Learn Git")).toBeVisible();
    });

    test('remaining todos count updates when a todo is completed', async ( {page} ) => {
        const todoPage = new TodoPage(page);
        await todoPage.addTodo("Learn Playwright");
        await todoPage.addTodo("Learn Git");
        await expect(page.getByText('2 tasks remaining')).toBeVisible();
        await todoPage.completeTodo("Learn Playwright");
        await expect(page.getByText('1 task remaining')).toBeVisible();
    });

    test('remaining todos count updates when a todo is deleted', async ( {page} ) => {
        const todoPage = new TodoPage(page);
        await todoPage.addTodo("Learn Playwright");
        await todoPage.addTodo("Learn Git");
        await expect(page.getByText('2 tasks remaining')).toBeVisible();
        await todoPage.deleteTodo("Learn Playwright");
        await expect(page.getByText('1 task remaining')).toBeVisible();
    });
})