import { expect, Page } from '@playwright/test';
import ProductActions from '../sections/productActions.section';
import ProductForm from '../sections/productForm.section';

export default class AddProductPage {
    page: Page;
    productActions: ProductActions;
    productForm: ProductForm;

    constructor(page: Page) {
        this.page = page;
        this.productActions = new ProductActions(this.page);
        this.productForm = new ProductForm(this.page);
    }

    public async goto() {
        await this.page.goto('https://commitquality.com/add-product');
    }

    // master method
    public async addNewProduct(productName: string, productPrice: string, productDate: string) {
        await this.productForm.enterProductDetails(productName, productPrice, productDate);
        await this.productActions.createNewProduct();
    }

}
