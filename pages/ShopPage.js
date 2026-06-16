class ShopPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/shop');
  }

  async clickProductByName(name) {
    await this.page
      .locator('[data-qa="product-list-section-item-title"]')
      .filter({ hasText: name })
      .click();
  }
}

module.exports = { ShopPage };
