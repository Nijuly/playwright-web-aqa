import test, { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { Text } from "../testData/textData";

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('input[type="email"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.signInButton = page.locator('button[type="submit"]');
  }

  public async loginUser(userEmail: string, password?: string): Promise<void> {
    await test.step(`Login user ${userEmail}`, async () => {
      password ??= "";
      await this.page.goto("/");
      await this.actions.type(this.emailInput, userEmail);
      await this.actions.type(this.passwordInput, password);
      await this.actions.click(this.signInButton);
    });
  }

  public async checkEmailAndPasswordFieldsAreVisible(): Promise<void> {
    await test.step("Check email and password fields are visible", async () => {
      await this.assertions.expectToBeVisible(this.emailInput);
      await this.assertions.expectToHaveAttribute(
        this.emailInput,
        "placeholder",
        Text.EMAIL_PLACEHOLDER
      );
      await this.assertions.expectToBeVisible(this.passwordInput);
      await this.assertions.expectToHaveAttribute(
        this.passwordInput,
        "placeholder",
        Text.PASSWORD_PLACEHOLDER
      );
    });
  }

  public async checkSignInButtonIsVisible(): Promise<void> {
    await test.step("Check sign in button is visible", async () => {
      await this.assertions.expectToBeVisible(this.signInButton);
    });
  }
}
