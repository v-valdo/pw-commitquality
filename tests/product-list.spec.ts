import { expect, test } from "./fixtures/fixtures.ts";

test.use({ baseURL: "https://commitquality.com/" });

// Using Fixtures to extend test method
test.describe('test dynamic list', () => {
  test("product list should show 10 items", async ({ countProducts }) => {
    let count = await countProducts();
    expect(count).toBe(10);
  });

  test('product list should show over 10 items when expanded', async ({ expandProductList, countProducts }) => {
    await expandProductList();
    let count = await countProducts();
    expect(count).toBeGreaterThan(10);
  })

  test('lesser or equal to 10 products should be visible after deleting 5', async ({ countProducts, deleteProductFromList }) => {
    let count = await countProducts();
    expect(count).toBe(10);

    count = await deleteProductFromList(0);
    count = await deleteProductFromList(9);
    count = await deleteProductFromList(2);
    count = await deleteProductFromList(7);
    count = await deleteProductFromList(1);

    expect(count).toBeLessThanOrEqual(10);
  });

  test('deleting all items should produce an empty list', async ({ productList, countProducts, deleteProductFromList, expandProductList }) => {
    await expandProductList();
    let count = await countProducts();
    let list = await productList();

    while (count > 0) {
      await deleteProductFromList(count - 1);
      count = await countProducts();
    };

    expect(count).toBe(0);
  })
});