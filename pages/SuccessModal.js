const { expect } = require('@playwright/test');

class SuccessModal {
  constructor(page) {
    this.modal = page.locator('[class*="modal"], [role="dialog"]').filter({ hasText: /thank you|order/i }).first();
    this.heading = this.modal.locator('h1, h2, h3, h4, h5').first();
  }

  async assertSuccess() {
    await this.modal.waitFor({ state: 'visible' });
    await expect(this.heading).toContainText(/thank you|order/i);
  }
}

module.exports = { SuccessModal };
