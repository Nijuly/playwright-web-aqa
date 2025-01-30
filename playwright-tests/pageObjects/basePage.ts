import test, { Locator, Page } from "@playwright/test";
import { Actions } from "../helpers/actions";
import { Assertions } from "../helpers/assertions";
import { MakeData } from "../helpers/makeData";
import { ElementUtils } from "../helpers/elementUtils";

export class BasePage {
  protected readonly page: Page;
  public actions: Actions;
  public assertions: Assertions;
  public elementUtils: ElementUtils;
  public makeData: MakeData;
  readonly alertMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.actions = new Actions();
    this.assertions = new Assertions();
    this.elementUtils = new ElementUtils();
    this.makeData = new MakeData();
    this.alertMessage = page.locator("div.alert");
  }

  public async checkURL(
    page: Page,
    urlValue: string,
    timeout?: number
  ): Promise<void> {
    await test.step(`Check URL`, async () => {
      await this.assertions.expectToHaveUrl(
        page,
        new RegExp(urlValue),
        timeout
      );
    });
  }

  public async checkAlertMessageHasText(
    text: string | string[]
  ): Promise<void> {
    await test.step("Check alert message is visible and has text", async () => {
      await this.assertions.expectToBeVisible(this.alertMessage);
      const alertText = await this.elementUtils.getTextByLocator(
        this.alertMessage
      );
      await this.assertions.expectToContain(text, alertText);
    });
  }
}
