import { Page, Locator } from '@playwright/test';

export class TodoPage {
    readonly todoInput: Locator;
    readonly addButton : Locator;
    
    constructor(private page: Page) {
        this.todoInput = this.page.getByPlaceholder('Enter Todo');
        this.addButton = this.page.getByRole('button',{name : 'Add'});
    }

    async addTodo(text:  string){
        await this.todoInput.fill(text);
        await this.addButton.click();
    }
    getTodo(text: string): Locator{
        return this.page.getByRole('listitem').filter({hasText: text});
    }

    async deleteTodo(text: string){
        const todo = this.getTodo(text);
        await todo.getByRole('button', {name: 'Delete'}).click();
    }
}