import test, { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class HistoryPage extends BasePage {
  readonly historyLable: Locator;
  readonly backToConvertButton: Locator;
  readonly documentBlcock: Locator;
  readonly clearHistoryButton: Locator;

  constructor(page: Page) {
    super(page);
    this.historyLable = page.locator("h3", { hasText: "Items History" });
    this.backToConvertButton = page.locator('a[href="/convert"]');
    this.documentBlcock = page.locator("//div[contains(@class,'w-80')]");
    this.clearHistoryButton = page.locator("button", {
      hasText: "Clear all entries",
    });
  }

  public getDocumentBlockByFileName(fileName: string): Locator {
    return this.page.locator(
      `//div[contains(@class,'w-80') and contains(.,"${fileName}")]`
    );
  }

  public getRemoveButtonByFileName(fileName: string): Locator {
    return this.getDocumentBlockByFileName(fileName).locator("button");
  }

  public async checkHistoryPageIsVisible(): Promise<void> {
    await test.step("Check history page is visible", async () => {
      await this.assertions.expectToBeVisible(this.historyLable);
    });
  }

  public async checkDocumentIsVisible(documentName: string): Promise<void> {
    await test.step("Check document is visible", async () => {
      await this.assertions.expectToBeVisible(
        this.getDocumentBlockByFileName(documentName)
      );
    });
  }

  public async checkDocumentIsNotExist(documentName: string): Promise<void> {
    await test.step("Check document is visible", async () => {
      await this.assertions.expectNotToExist(
        this.getDocumentBlockByFileName(documentName)
      );
    });
  }

  public async removeHistory(): Promise<void> {
    await test.step("Remove all history", async () => {
      await this.actions.click(this.clearHistoryButton);
    });
  }

  public async removeFileFromHistory(fileName: string): Promise<void> {
    await test.step("Remove file from history", async () => {
      await this.actions.hoverElement(
        this.getDocumentBlockByFileName(fileName)
      );
      await this.actions.click(this.getRemoveButtonByFileName(fileName));
    });
  }

  public async backToConvertPage(): Promise<void> {
    await test.step("Back to convert page", async () => {
      await this.actions.click(this.backToConvertButton);
    });
  }
}
