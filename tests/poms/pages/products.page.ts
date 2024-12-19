import { expect, Page } from '@playwright/test';

export default class ProductsPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    public async goto() {
        await this.page.goto('https://commitquality.com');
    }

    // Locators
    addProductLink = () => this.page.getByRole('link', { name: 'Add a product' }).first();
    filterProductsInput = () => this.page.getByPlaceholder('filter by', { exact: false });
    filterProductsButton = () => this.page.getByRole('button', { name: 'Filter' });
    productsList = () => this.page.locator('table');
    firstProductDate = () => this.page.locator('td:nth-child(4)');

    // Actions
    public async clickAddProductLink() {
        await this.addProductLink().click();
    }

    public async filterProducts(filter: string) {
        await this.filterProductsInput().fill(filter);
        await this.filterProductsButton().click();
    }

    public async assertNewProductAddedByYear() {
        await expect(this.firstProductDate()).toBeVisible();
    }
}