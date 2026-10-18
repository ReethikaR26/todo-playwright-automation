import {test, expect} from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';


test.describe('Todo Page',()=> {

    test('user can add todos', async ({page})=>{
        await page.goto('/');
        const todoPage= new TodoPage(page);

        await todoPage.addTodo("Learn Playwright");
        await todoPage.addTodo("Write tests");
        await expect(todoPage.getTodo('Learn Playwright') ).toContainText('Learn Playwright');

        await expect(todoPage.getTodo('Write tests')).toContainText('Write tests');


        //await expect(page.getByRole('listitem', {name: 'Learn Playwright'})).toContainText('Learn Playwright');
        //await expect(page.getByRole('listitem',{name: 'Write tests'})).toHaveText('Write tests');
    });

    test('user can delete a todo', async ({ page }) => {
        await page.goto('/');
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
        await page.goto('/');
        const todoPage = new TodoPage(page);
        await todoPage.todoInput.fill("Learn Playwright");
        await expect(todoPage.todoInput).toHaveValue("Learn Playwright");
        await todoPage.addButton.click();
        const todo = todoPage.getTodo('Learn Playwright');
        await expect(todo).toContainText('Learn Playwright');
        await expect(todoPage.todoInput).toHaveValue("");
    })

    test('input clears after todo is added', async ({ page })=>{
        await page.goto('/');
        const todoPage = new TodoPage(page);
        await todoPage.addTodo('Learn playwright');
        await expect(todoPage.todoInput).toHaveValue("");
    })

    test('user can add todo by pressing enter', async ({page})=>{
        await page.goto('/');
        const todoPage = new TodoPage(page);
        await todoPage.todoInput.fill("Learn Playwright");
        await todoPage.todoInput.press('Enter');

        await expect(todoPage.getTodo('Learn Playwright')).toContainText('Learn Playwright');
    })

})