# BlazeDemo Playwright Test Framework

End-to-end testing framework for [blazedemo.com](http://blazedemo.com) built with Playwright and TypeScript using the Page Object Model pattern.

> 📖 This repository is the companion codebase for the blog post series:
> **[Stop Writing New Tests — Supercharge the Ones You Already Have](https://medium.com/@markocurlinoski.uie/stop-writing-new-tests-supercharge-the-ones-you-already-have-bc133787a69e)**

## Blog Post Series Progress

| Part | Topic | Status |
|------|-------|--------|
| Part 1 | Framework Setup — Playwright + TypeScript + Page Object Model | ✅ Done |
| Part 2 | Visual / Image Comparison — `toHaveScreenshot()`, pixelmatch, baselines, dynamic content | ✅ Done |
| Part 3 | Lighthouse Integration — Performance, SEO & Accessibility scores with CI thresholds | 🔜 Coming soon |
| Part 4 | Accessibility Testing — `@axe-core/playwright`, WCAG violations, false positives, severity rules | 🔜 Coming soon |
| Part 5 | Load Testing — k6 browser module, Playwright scripts under real load, virtual users | 🔜 Coming soon |

## Prerequisites
- Node.js 18+

## Setup

```bash
npm install
npx playwright install
```

## Running Tests

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests (headless) |
| `npx playwright test tests/visual-regression.spec.ts` | Run visual regression tests only |
| `npx playwright test --update-snapshots` | Regenerate all visual baselines |

## Project Structure

```
├── pages/
│   ├── HomePage.ts           # Home page with flight search
│   ├── FlightResultsPage.ts  # Flight results listing
│   ├── PurchasePage.ts       # Passenger & payment form
│   └── ConfirmationPage.ts   # Purchase confirmation
├── tests/
│   ├── homepage.spec.ts      # Homepage UI tests
│   ├── flight-search.spec.ts # Flight search flow tests
│   └── purchase-flow.spec.ts # End-to-end purchase tests
├── playwright.config.ts      # Playwright configuration
├── tsconfig.json
└── package.json
```

## Test Coverage

1. **Homepage Tests** (`homepage.spec.ts`) — Title, selects, and search button visibility
2. **Flight Search Tests** (`flight-search.spec.ts`) — Search navigation and results listing
3. **Purchase Flow Tests** (`purchase-flow.spec.ts`) — Full E2E purchase from search to confirmation
