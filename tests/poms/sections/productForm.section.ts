import { Page } from '@playwright/test';

export default class ProductForm {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    nameTextBox = () => this.page.getByPlaceholder('Enter a product name')
    priceTextBox = () => this.page.getByPlaceholder('Enter a price')
    datePicker = () => this.page.getByTestId('date-stocked');

    // Actions
    public async enterProductDetails(productName: string, productPrice: string, stockedDate: string) {
        await this.nameTextBox().fill(productName);
        await this.priceTextBox().fill(productPrice);
        await this.datePicker().fill(stockedDate);
    }
}