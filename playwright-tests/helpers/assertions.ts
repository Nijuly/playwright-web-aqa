import test, { Locator, Page, expect } from "@playwright/test";

export class Assertions {
  public async expectToBeVisible(element: Locator): Promise<void> {
    await test.step(`Expect "${element}" to be visible`, async () => {
      await expect.soft(element).toBeVisible({ timeout: 30000 });
    });
  }

  public async expectNotToBeVisible(
    element: Locator,
    timeout: number = 15000
  ): Promise<void> {
    await test.step(`Expect "${element}" not to be visible`, async () => {
      await expect.soft(element).not.toBeVisible({ timeout: timeout });
    });
  }

  public async expectToBeDisabled(element: Locator): Promise<void> {
    await test.step(`Expect "${element}" to be disabled`, async () => {
      await expect.soft(element).toBeDisabled({ timeout: 30000 });
    });
  }

  public async expectNotToExist(
    element: Locator,
    timeout: number = 15000
  ): Promise<void> {
    await test.step(`Expect "${element}" not to exist`, async () => {
      await expect.soft(element).not.toBeAttached({ timeout: timeout });
    });
  }

  public async expectToHaveAttribute(
    element: Locator,
    attributeName: string,
    attributeValue: string
  ): Promise<void> {
    await test.step(`Expect "${element}"  to have attribute "${attributeName}" with value "${attributeValue}"`, async () => {
      await expect(element).toHaveAttribute(attributeName, attributeValue);
    });
  }

  public async expectToHaveUrl(
    page: Page,
    url: string | RegExp,
    timeout?: number
  ): Promise<void> {
    await test.step(`Expect to have URL "${url}"`, async () => {
      await expect(page).toHaveURL(url, { timeout: timeout });
    });
  }

  public async expectToHaveText(
    element: Locator,
    text: string | RegExp | ReadonlyArray<string>,
    timeout: number = 500
  ): Promise<void> {
    await test.step(`Expect "${element}" to have text "${text}"`, async () => {
      await expect(element).toHaveText(text, { timeout: timeout });
    });
  }

  public async expectToContain(
    actual: string | string[],
    expected: string,
    isStrict = false
  ): Promise<void> {
    await test.step(`Expect value: "${JSON.stringify(
      actual
    )}" to contain Value: "${JSON.stringify(expected)}"`, async () => {
      if (!isStrict) {
        expect.soft(actual).toContain(expected);
      } else {
        expect(actual).toContain(expected);
      }
    });
  }

  public async expectToBeEqual<T>(actual: T, expected: T): Promise<void> {
    await test.step(`Expect Actual result "${actual}"  to Be equal with Expected "${expected}"`, async () => {
      expect.soft(actual).toBe(expected);
    });
  }
}
