class CartDrawer {
  constructor(page) {
    this.page = page;
    this.cartDrawer = page.locator('aside[class*="site-drawer"]');
    this.goToCartBtn = page.getByRole('button', { name: /go to cart/i });
    this.checkoutBtn = page.getByRole('link', { name: /checkout/i }).or(
      page.getByRole('button', { name: /checkout/i })
    ).first();
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
