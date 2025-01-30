import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./playwright-tests/tests",
  globalTeardown: require.resolve("./global-teardown.ts"),
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 3,
  reporter: "html",
  use: {
    baseURL: `http://localhost:300${process.env.TEST_PARALLEL_INDEX}/`,
    trace: "on-first-retry",
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    navigationTimeout: 40 * 1000,
    screenshot: "only-on-failure",
    video: "off",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: {
          args: ["--headless=chrome"],
        },
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: "npm run dev",
  //   url: "http://localhost:3000/",
  //   reuseExistingServer: !process.env.CI,
  // },
});
