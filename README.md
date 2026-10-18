# Todo Application — Playwright Automation

End-to-end test automation for a React Todo application using Playwright and TypeScript.

## Overview

This project demonstrates practical UI automation testing skills, including reusable Page Object Models, test isolation, cross-browser execution, and failure debugging.

## Tech Stack

- Playwright
- TypeScript
- React
- Node.js
- Git and GitHub

## Automated Test Coverage

- Add todos
- Delete specific todos
- Validate input behavior
- Interact with the application using UI locators
- Verify todo list behavior
- Run tests across Chromium, Firefox, and WebKit
- Capture screenshots and traces for failed tests

## Project Structure

```text
playwright_/
├── pages/
│   └── TodoPage.ts
├── tests/
│   └── todo.spec.ts
├── playwright.config.ts
├── package.json
├── package-lock.json
└── .gitignore
```

## Getting Started

Install dependencies:

```bash
npm install
npx playwright install
```

Run the test suite:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Open the HTML report:

```bash
npx playwright show-report
```

## Reporting and Debugging

The Playwright configuration supports HTML reports and captures screenshots and traces when tests fail, helping investigate failures efficiently.

## Future Improvements

- Expand coverage for filtering and localStorage persistence
- Add CI execution with GitHub Actions
- Add API testing
