import test, { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { Url } from "../testData/urlData";
import { historyCookies } from "../testData/history.json";

export class WelcomePage extends BasePage {
  readonly convertButton: Locator;
  readonly welcomeLabel: Locator;

  constructor(page: Page) {
    super(page);
    this.convertButton = page.locator('a[href="/convert"]', {
      hasText: "Go to Convert PDF",
    });
    this.welcomeLabel = page.locator("h1", {
      hasText: "Welcome!",
    });
  }

  public async checkWelcomePageIsVisible(): Promise<void> {
    await test.step("Check welcome page is visible", async () => {
      await this.assertions.expectToBeVisible(this.welcomeLabel);
    });
  }

  public async goToConvertPage(): Promise<void> {
    await test.step("Click on go to convert button", async () => {
      await this.page.goto("/");
      await this.assertions.expectToBeVisible(this.welcomeLabel);
      await this.actions.click(this.convertButton);
    });
  }

  public async goToHistoryPage(): Promise<void> {
    await test.step("Go to history page from Welcome page", async () => {
      await this.page.goto("/");
      await this.assertions.expectToBeVisible(this.welcomeLabel);
      await this.page.goto(Url.HISTORY);
    });
  }
}
