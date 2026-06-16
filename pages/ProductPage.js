const DEFAULT_PRODUCT_SLUG = '/delicious-freshly-baked-muffins-product';

class ProductPage {
  constructor(page) {
    this.page = page;
    this.addToBagBtn = page.getByRole('button', { name: /add to bag/i });
  }

  async goto(slug = DEFAULT_PRODUCT_SLUG) {
    await this.page.goto(slug);
  }

  async addToBag() {
    await this.addToBagBtn.click();
  }
}

module.exports = { ProductPage };
