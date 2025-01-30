## 📌 Technical Task of Fedoronchuk Yulianna

# 📖 Description

This repository contains the technical task of Fedoronchuk Yulianna. The project is configured to run automated tests using Playwright.

# 🚀 Running Tests

To execute all Playwright tests, simply run:
```sh
npx playwright test
```
# 🔧 Server & Application Setup

There is no need to manually start the application.

The server and application will start automatically on localhost before Playwright begins test execution.

# 🛠 Requirements

Make sure you have the following installed:

Node.js (Latest LTS version recommended)

Project uses React 19, but react-dropzone doesn't support it yet, so need legacy deps. 
```sh
npm install --legacy-peer-deps
```
# ✅ Notes
Make sure there are no other important processes running on ports :3000, :3001, :3002. They will be stopped automatically before starting the tests.

Happy testing! 🚀
