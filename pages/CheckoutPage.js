const PARCEL_BOX_TRIGGER = '[data-qa="checkout-shippingoptions-parcelselect"]';   // parcel box location dropdown trigger
const PARCEL_BOX_DROPDOWN = '.h-dropdown-list__dropdown';                   // the dropdown list container
const PARCEL_BOX_OPTION = '.h-dropdown-list__dropdown .h-t-body-2';         // individual parcel box location option

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.getByPlaceholder(/email/i);
    this.fullNameField = page.getByPlaceholder(/full name/i);
    this.postalCodeField = page.getByPlaceholder(/postal code/i);
    this.phoneField = page.getByPlaceholder(/phone number/i);
    this.specialRequestsField = page.getByRole('textbox', { name: /special requests/i });
    this.placeOrderBtn = page.getByRole('button', { name: /place an order/i });

    this.emailError = page.getByRole('alert').filter({ hasText: /email/i });
    this.nameError = page.getByRole('alert').filter({ hasText: /full name/i });
    this.phoneError = page.getByRole('alert').filter({ hasText: /phone/i });
    this.specialRequestsError = page.getByRole('alert').filter({ hasText: /special requests/i });
    this.shippingError = page.getByRole('alert').filter({ hasText: /parcel address/i });
    this.postalCodeError = page.getByRole('alert').filter({ hasText: /postal/i });
  }

  async fillContactAndDelivery({ email, fullName, postalCode, phone, specialRequests }) {
    await this.emailField.fill(email);
    await this.fullNameField.fill(fullName);
    if (postalCode !== undefined) await this.postalCodeField.fill(postalCode);
    await this.phoneField.fill(phone);
    await this.specialRequestsField.fill(specialRequests);
  }

  async selectFirstParcelBox() {
    await this.page.locator(PARCEL_BOX_TRIGGER).click();
    await this.page.locator(PARCEL_BOX_DROPDOWN).waitFor({ state: 'visible' });
    await this.page.locator(PARCEL_BOX_OPTION).first().click();
  }

  async placeOrder() {
    await this.placeOrderBtn.click();
  }
}

module.exports = { CheckoutPage };
