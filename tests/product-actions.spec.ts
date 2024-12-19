import { test, expect } from '@playwright/test';
import ProductsPage from './poms/pages/products.page';
import AddProductPage from './poms/pages/addProduct.page';

test('product test without POM', async ({ page }) => {
    await page.goto('https://commitquality.com/');
    await page.getByRole('link', { name: 'Add a product' }).first().click();

    await page.getByPlaceholder('Enter a product name').fill('product 12');
    await page.getByPlaceholder('Enter a price').fill('12');
    const datePicker = page.locator('label:has-text("Date stocked") + input');
    await datePicker.fill('1994-06-14');
    await page.getByRole('button', { name: "Submit" }).click();

    const filterInput = page.getByPlaceholder('filter by', { exact: false });
    await filterInput.click();
    await filterInput.fill('product 12');
    const filterButton = page.getByRole('button', { name: 'Filter' });
    await filterButton.click();

    const firstRow = page.locator('tbody tr:first-child');
    const dateCell = firstRow.locator('td:nth-child(4)');
    const dateValue = await dateCell.textContent();
    expect(dateValue).toBe('1994-06-14');
});

test('basic test with POM', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const addProductPage = new AddProductPage(page);

    await productsPage.goto();
    await productsPage.clickAddProductLink();
    await addProductPage.goto();
    await addProductPage.addNewComputer('product 12', '125', '1994-06-14');
    await productsPage.filterProducts('product 12');

    expect(await productsPage.firstProductDate().textContent()).toBe('1994-06-14');
});