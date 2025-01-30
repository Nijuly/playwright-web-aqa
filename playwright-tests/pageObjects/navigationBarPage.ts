import test, { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { LoginPage } from "./loginPage";

export class NavigationBarPage extends BasePage {
  readonly logo: Locator;
  readonly logOutButton: Locator;
  readonly loginPage: LoginPage;

  constructor(page: Page) {
    super(page);
    this.loginPage = new LoginPage(page);
    this.logo = page.locator("a.btn-ghost");
    this.logOutButton = page.locator("button", { hasText: "Log out" });
  }

  public async checkLogoIsVisible(): Promise<void> {
    await test.step("Check sign in button is visible", async () => {
      await this.assertions.expectToBeVisible(this.logo);
    });
  }

  public async userLogout(): Promise<void> {
    await test.step("User logout", async () => {
      await this.actions.click(this.logOutButton);
      await this.loginPage.checkEmailAndPasswordFieldsAreVisible();
    });
  }
}
