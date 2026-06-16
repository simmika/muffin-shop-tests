const { expect } = require('@playwright/test');

class SuccessModal {
  constructor(page) {
    this.modal = page.locator('[data-qa="ecommerce-modal-checkout-success-order"]');
    this.heading = this.modal.getByRole('heading');
  }

  async assertSuccess() {
    await this.modal.waitFor({ state: 'visible' });
    await expect(this.heading).toContainText(/thank you|order/i);
  }
}

module.exports = { SuccessModal };
