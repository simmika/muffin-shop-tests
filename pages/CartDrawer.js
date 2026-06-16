class CartDrawer {
  constructor(page) {
    this.page = page;
    this.cartDrawer  = page.locator('[data-qa="site-drawer"]');
    this.goToCartBtn = page.locator('[data-qa="header-btn-shoppingbag"]');
    this.checkoutBtn = page.locator('[data-qa="shoppingcart-btn-checkout"]');
  }

  async open() {
    if (await this.cartDrawer.isVisible()) return;
    await this.goToCartBtn.click();
    await this.cartDrawer.waitFor({ state: 'visible' });
  }

  async proceedToCheckout() {
    await this.checkoutBtn.click();
    await this.page.waitForURL(/checkout/);
  }
}

module.exports = { CartDrawer };
