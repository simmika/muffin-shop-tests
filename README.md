# Muffin Shop — Playwright Test Suite

End-to-end tests for [Freshly Baked Muffins - Cozy Online Muffin Shop](https://ai-generated-builder-jiu9y1ttcck0mxhl.hostingersite.com), covering the full purchase flow and checkout form validation.

## Setup

**Requirements:** Node.js 18+

```bash
npm install
npx playwright install chromium
```

## Running tests

| Command | Description |
|---|---|
| `npm test` | Run all tests headless |
| `npm run test:headed` | Run with browser visible |
| `npm run test:ui` | Open Playwright UI mode |
| `npm run report` | Open the last HTML report |

## What's tested

**`tests/checkout/purchase.spec.js`** — Full happy-path purchase flow:
browse shop → select product → add to bag → checkout → place order → verify success

**`tests/checkout/validation.spec.js`** — Checkout form validation:
required fields, email format, phone format, name length, special requests length, postal code length

## Project structure

```
pages/
  ShopPage.js       # Shop listing page
  ProductPage.js    # Product detail page
  CartDrawer.js     # Cart side drawer
  CheckoutPage.js   # Checkout form
  SuccessModal.js   # Order confirmation modal
tests/
  checkout/
    purchase.spec.js
    validation.spec.js
```
