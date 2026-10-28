# SauceDemo Automation Testing Framework

A UI and API automation testing project built using **Playwright and TypeScript** to practice real-world QA automation practices, improve test coverage, and create a maintainable test framework.

## Project Overview

This project automates key workflows of the SauceDemo e-commerce application, including login, product management, shopping cart operations, and checkout. It also includes API testing, reusable fixtures, authentication setup, and continuous integration using GitHub Actions.

The framework follows the Page Object Model (POM) design pattern to keep test logic organized, reusable, and easier to maintain.

## Tech Stack

- **Language:** TypeScript
- **Automation Framework:** Playwright
- **Testing:** Playwright Test
- **API Testing:** Playwright APIRequestContext
- **Design Pattern:** Page Object Model (POM)
- **Environment Configuration:** dotenv
- **Version Control:** Git and GitHub
- **CI:** GitHub Actions
- **Reporting:** Playwright HTML Report

## Application Under Test

- **Website:** https://www.saucedemo.com/
- **Application Type:** E-commerce demo application

## Test Coverage

### UI Automation

- Login with valid credentials
- Login validation with invalid credentials
- Product listing and product selection
- Add products to the shopping cart
- Remove products from the cart
- Checkout workflow
- Checkout form validation
- User-specific scenarios supported by the demo application

### API Automation

The project includes API tests using JSONPlaceholder to practise HTTP methods and response validation.

- GET — retrieve resources
- POST — create a resource
- PUT — update a resource
- DELETE — delete a resource

These tests help validate API responses and practise common HTTP operations.

## Framework Features

- Page Object Model for reusable page interactions
- Custom fixtures for shared test setup
- Authentication setup using Playwright storage state
- Reusable API helper methods
- Environment-based configuration
- Separation of test data from test logic
- Automated execution through GitHub Actions
- HTML reports for test result analysis
- Test artifacts uploaded from CI runs when configured

## Project Structure

```text
saucedemo/
├── .github/
│   └── workflows/
├── fixtures/
├── pages/
├── test-data/
├── tests/
├── utils/
├── playwright.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
├── .gitignore
└── README.md
```

**Folder responsibilities**

- `pages/` — Page Object Model classes and page interactions
- `tests/` — UI and API test specifications
- `fixtures/` — Reusable test fixtures and shared setup
- `test-data/` — Test data used by automated tests
- `utils/` — Helper functions and reusable API methods
- `.github/workflows/` — GitHub Actions CI workflow configuration

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js (LTS version recommended)
- npm
- Git
- Visual Studio Code or another code editor

### 1. Clone the repository

```bash
git clone https://github.com/Shreya5673/saucedemo.git
cd saucedemo
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

On Linux-based CI environments, you may need:

```bash
npx playwright install --with-deps
```

### 4. Configure environment variables

Create the environment files expected by your local configuration, such as `.env.qa`, if required.

Use the variable names referenced in `playwright.config.ts` and your test code. For example:

```env
BASE_URL=https://www.saucedemo.com/
API_BASE_URL=https://jsonplaceholder.typicode.com
```

Add any required test credentials using your local environment configuration. Never commit real credentials, tokens, or private environment files to GitHub.

### 5. Run the tests

Run the complete Playwright test suite:

```bash
npx playwright test
```

Run tests with a visible browser:

```bash
npx playwright test --headed
```

Run a specific test file:

```bash
npx playwright test tests/login.spec.ts
```

Open the HTML report after a test run:

```bash
npx playwright show-report
```

**Note:** Test file names and available npm scripts may vary according to the current repository. Check the files in `tests/` and the scripts in `package.json` if a command needs adjustment.

## Continuous Integration

GitHub Actions is configured to run automated tests in CI using the workflow files in `.github/workflows/`.

The CI workflow is intended to support:

- Automated test execution
- Environment variable configuration
- Secure handling of credentials through GitHub Secrets when required
- Test result and report artifact uploads

Refer to the Actions tab in this repository for the actual workflow execution results.

## Test Reports and
