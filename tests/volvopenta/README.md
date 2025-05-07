# Volvo Penta E-commerce Tests

This directory contains tests for the Volvo Penta e-commerce website.

## Structure

- `pages/volvopenta/shop.page.ts` - Page Object for the Volvo Penta shop page
- `fixtures/volvo-penta-fixture.ts` - Fixture for the Volvo Penta shop Page Object
- `tests/volvopenta/shop.spec.ts` - Tests for the Volvo Penta shop page

## Running the Tests

To run the tests, use the following command:

```bash
npx playwright test tests/volvopenta/shop.spec.ts
```

## Page Object

The `ShopPage` class provides methods for interacting with the Volvo Penta e-commerce shop page. It includes:

- Navigation to the shop page
- Getting products on the page
- Clicking on products
- Adding products to cart
- Searching for products
- Going to the cart
- Getting the page title
- Checking if the page is loaded
- Changing the location to UK

## Tests

The tests verify basic functionality of the Volvo Penta e-commerce shop page with UK location:

1. **Navigate to shop page, change location to UK, and verify it loads**
   - Navigates to the shop page
   - Verifies the page is loaded
   - Changes the location to UK
   - Gets and logs the page title
   - Verifies the page title contains expected text

2. **Check product listing functionality with UK location**
   - Navigates to the shop page
   - Waits for the page to load
   - Changes the location to UK
   - Gets the product count
   - Verifies there are products on the page
   - Clicks on the first product if available

## Notes

- The selectors in the Page Object are based on common e-commerce website patterns and may need to be adjusted based on the actual structure of the Volvo Penta website.
- Additional tests can be added to cover more functionality of the website.
