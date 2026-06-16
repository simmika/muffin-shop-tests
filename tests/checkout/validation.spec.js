const { test: base, expect } = require('@playwright/test');
const { ProductPage } = require('../../pages/ProductPage');
const { CartDrawer } = require('../../pages/CartDrawer');
const { CheckoutPage } = require('../../pages/CheckoutPage');

const test = base.extend({
  checkoutPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    const cartDrawer = new CartDrawer(page);

    await productPage.goto();
    await productPage.addToBag();
    await cartDrawer.open();
    await cartDrawer.proceedToCheckout();

    await use(new CheckoutPage(page));
  },
});

test.describe('Checkout form validation', () => {
  test('required fields show validation errors when placing order empty', async ({ checkoutPage }) => {
    await checkoutPage.placeOrder();

    await expect(checkoutPage.emailError).toBeVisible();
    await expect(checkoutPage.nameError).toBeVisible();
    await expect(checkoutPage.phoneError).toBeVisible();
    await expect(checkoutPage.specialRequestsError).toBeVisible();
    await expect(checkoutPage.shippingError).toBeVisible();
  });

  test('shows error for invalid email format', async ({ checkoutPage }) => {
    await checkoutPage.emailField.fill('notanemail');
    await checkoutPage.emailField.blur();

    await expect(checkoutPage.emailError).toBeVisible();
  });

  test('shows error for invalid phone number format', async ({ checkoutPage }) => {
    await checkoutPage.phoneField.fill('123');
    await checkoutPage.phoneField.blur();

    await expect(checkoutPage.phoneError).toBeVisible();
  });

  test('shows error when full name exceeds 250 characters', async ({ checkoutPage }) => {
    await checkoutPage.fullNameField.fill('a'.repeat(251));
    await checkoutPage.fullNameField.blur();

    await expect(checkoutPage.nameError).toBeVisible();
  });

  test('shows error when special requests exceeds 500 characters', async ({ checkoutPage }) => {
    await checkoutPage.specialRequestsField.fill('a'.repeat(501));
    await checkoutPage.specialRequestsField.blur();

    await expect(checkoutPage.specialRequestsError).toBeVisible();
  });

  test('shows error for postal code shorter than 5 digits', async ({ checkoutPage }) => {
    await checkoutPage.postalCodeField.fill('1234');
    await checkoutPage.postalCodeField.blur();
    await expect(checkoutPage.postalCodeError).toBeVisible();
  });

  test('shows error for postal code longer than 5 digits', async ({ checkoutPage }) => {
    await checkoutPage.postalCodeField.fill('123456');
    await checkoutPage.postalCodeField.blur();
    await expect(checkoutPage.postalCodeError).toBeVisible();
  });

});
