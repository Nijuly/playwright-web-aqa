import test, { Locator } from "@playwright/test";

export class ElementUtils {
  public async getTextByLocator(
    locator: Locator,
    index: number = 0
  ): Promise<string> {
    return await test.step(`Get text by ${locator} locator`, async () => {
      const pageElement: Locator = await locator.nth(index);
      return await pageElement.innerText();
    });
  }

  public async getValueByInput(
    locator: Locator,
    index: number = 0
  ): Promise<string> {
    return await test.step(`Get text by ${locator} input`, async () => {
      const pageElement: Locator = await locator.nth(index);
      return await pageElement.inputValue();
    });
  }

  public async getTextListByLocator(locator: Locator): Promise<string[]> {
    return await test.step(`Get text list by ${locator} locator`, async () => {
      return await locator.allInnerTexts();
    });
  }

  public async getSelectorFromLocator(locator: Locator): Promise<string> {
    console.log("locator", locator.toString());
    return locator.toString().slice(9, -2);
  }
}
