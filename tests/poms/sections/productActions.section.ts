import { Page } from '@playwright/test';

export default class ProductActions {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    productSubmitButton = () => this.page.getByRole('button', { name: "Submit" });
    productCancelButton = () => this.page.getByRole('link', { name: "Cancel" });


    // Actions
    public async createNewProduct() {
        await this.productSubmitButton().click();
    }
}