import { expect, test as base } from '@playwright/test';

const test = base.extend({
    loggedInPage: async ({ page }, use) => {
        await page.goto("https://commitquality.com/");
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByPlaceholder('Enter Username').fill('test');
        await page.getByTestId('password-textbox').fill('test');
        await page.keyboard.press('Enter');
        await use(page);
    },

    expandProductList: async ({ loggedInPage }, use) => {
        const expandList = async () => {
            await loggedInPage.getByRole('button', { name: 'Show More ' }).click();
        }
        await use(expandList);
    },

    productList: async ({ loggedInPage }, use) => {
        const getProductList = async () => {
            return await loggedInPage.locator('table.product-list-table tbody tr');
        }
        await use(getProductList);
    },

    countProducts: async ({ productList }, use) => {
        const getCount = async () => {
            const listLocator = await productList();
            return await listLocator.count();
        };
        await use(getCount);
    },

    deleteProductFromList: async ({ countProducts, productList }, use) => {
        const deleteItem = async (index: number) => {
            const list = await productList();
            const locatedItem = await list.nth(index);
            await locatedItem.getByRole('link', { name: "Delete" }).click();
            return await countProducts();
        }
        await use(deleteItem);
    },

    logout: async ({ loggedInPage }, use) => {
        const logout = async () => {
            await loggedInPage.getByRole('button', { name: 'Logout' }).click();
        };

        await use(logout);
    },
});

export { test, expect };