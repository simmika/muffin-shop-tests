const { test, expect } = require('@playwright/test');
const { ShopPage } = require('../../pages/ShopPage');
const { ProductPage } = require('../../pages/ProductPage');
const { CartDrawer } = require('../../pages/CartDrawer');
const { CheckoutPage } = require('../../pages/CheckoutPage');
const { SuccessModal } = require('../../pages/SuccessModal');

test.describe('Full purchase flow', () => {
  test('guest user can browse, add to bag and complete checkout', async ({ page }) => {
    const shopPage = new ShopPage(page);
    const productPage = new ProductPage(page);
    const cartDrawer = new CartDrawer(page);
    const checkoutPage = new CheckoutPage(page);
    const successModal = new SuccessModal(page);

    await shopPage.goto();
    await expect(page).toHaveURL(/shop/);

    await shopPage.clickProductByName('Blueberry Burst Muffins');
    await productPage.addToBag();

    await cartDrawer.open();
    await cartDrawer.proceedToCheckout();

    await checkoutPage.fillContactAndDelivery({
      email: 'testuser@example.com',
      fullName: 'Jane Doe',
      postalCode: '01001',
      phone: '+37060000000',
      specialRequests: 'no special requests',
    });
    await checkoutPage.selectFirstParcelBox();
    await checkoutPage.placeOrder();

    await successModal.assertSuccess();
  });
});
