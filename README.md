# Scope

**Fixture Demo** - _product-list.spec.ts_

1. Login using credentials "test:test"
2. Make sure user lands on homepage
3. Make sure the displayed list of sample Products conforms to the following criterias:
    - The unexpanded product list should always show 10 items when landing
    - The expanded product list should show more than 10 items when landing
    - The total product list should never be higher than 15
    - The product list should be empty after removing all items



**POM Demo** - _product-actions.spec.ts_
1. Go to product page
2. Add a new product
3. Make sure it takes you to home page
4. Filter product list with name of newly added product
5. Assess visibility of the newly product after filtering
