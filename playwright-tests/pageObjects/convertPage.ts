import test, { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { Text } from "../testData/textData";
import * as path from "path";
import { readFileSync } from "fs";

export class ConvertPage extends BasePage {
  readonly convertInput: Locator;
  readonly historyLink: Locator;
  readonly convertButton: Locator;
  readonly progressBar: Locator;
  readonly progressMessage: Locator;
  readonly dragAndDropArea: Locator;
  readonly removeFieldButton: Locator;
  readonly downLoadFileButton: Locator;

  constructor(page: Page) {
    super(page);
    this.convertInput = page.locator('[role="presentation"]');
    this.historyLink = page.locator('a[href="/history"]', {
      hasNotText: "Loading history",
    });
    this.convertButton = page.locator('button[type="submit"]');
    this.progressBar = page.locator(".progress");
    this.progressMessage = page.getByText("Progress");
    this.dragAndDropArea = page.locator(".card-body");
    this.removeFieldButton = page.locator(".card button");
    this.downLoadFileButton = page.locator("a", {
      hasText: "Download DOCX file",
    });
  }

  public async goToHistoryPage(): Promise<void> {
    await test.step("Go to history page", async () => {
      await this.actions.click(this.historyLink);
    });
  }

  public async checkHistoryLinkIsVisible(): Promise<void> {
    await test.step("Check history link", async () => {
      await this.assertions.expectToBeVisible(this.historyLink);
      await this.assertions.expectToHaveText(
        this.historyLink,
        new RegExp(Text.GO_TO_HISTORY)
      );
    });
  }

  public async checkConvertButtonIsVisible(): Promise<void> {
    await test.step("Check convert button", async () => {
      await this.assertions.expectToBeVisible(this.convertButton);
      await this.assertions.expectToHaveText(
        this.convertButton,
        Text.CONVERT_PDF_FILE
      );
    });
  }

  public async checkDropDownAreaTextIsVisible(): Promise<void> {
    await test.step("Check dropdown text", async () => {
      await this.assertions.expectToBeVisible(this.convertInput);
      await this.assertions.expectToHaveText(
        this.convertInput,
        new RegExp(Text.DRAG_AND_DROP)
      );
    });
  }

  public async checkProgressBarIsVisible(): Promise<void> {
    await test.step("Check progress bar", async () => {
      await this.assertions.expectToBeVisible(this.progressBar);
    });
  }

  public async clickOnHistoryLink(): Promise<void> {
    await test.step("Click on history link", async () => {
      await this.actions.click(this.historyLink);
    });
  }

  public async dragAndDropFile(fileName: string): Promise<void> {
    await test.step("Drag and drop file", async () => {
      await this.assertions.expectToBeVisible(this.convertInput);
      const selector = await this.elementUtils.getSelectorFromLocator(
        this.convertInput
      );
      await this.actions.dragAndDropFileToElement(
        this.page,
        selector,
        fileName
      );
      await this.assertions.expectToContain(
        await this.elementUtils.getTextByLocator(this.dragAndDropArea),
        fileName
      );
    });
  }

  public async convertFile(fileName: string): Promise<void> {
    await test.step("Convert file", async () => {
      await this.dragAndDropFile(fileName);
      await this.actions.click(this.convertButton);
      await this.assertions.expectToBeVisible(this.progressBar);
      await this.assertions.expectToBeVisible(this.progressMessage);
      await this.assertions.expectNotToExist(this.progressBar);
      await this.assertions.expectToBeDisabled(this.convertButton);
    });
  }

  public async removeFile(): Promise<void> {
    await test.step("Remove file", async () => {
      await this.actions.click(this.removeFieldButton);
      await this.assertions.expectToBeVisible(this.convertInput);
    });
  }

  public async getNumberOfUploadedFiles(): Promise<number> {
    return await test.step("Get number of uploaded files", async () => {
      const text = await this.elementUtils.getTextByLocator(this.historyLink);
      const amount = text.split(":")[1];
      if (amount === undefined) {
        return 0;
      } else {
        return Number(amount);
      }
    });
  }

  public async checkNumberOfUploadedFiles(
    expectedNumber: number
  ): Promise<void> {
    await test.step("Check number of uploaded files", async () => {
      const numberOfUploadedFiles = await this.getNumberOfUploadedFiles();
      await this.assertions.expectToBeEqual(
        numberOfUploadedFiles,
        expectedNumber
      );
    });
  }

  public async downloadFile(): Promise<void> {
    await test.step("Download file", async () => {
      const filePath: string = path.join(__dirname, `../downloads/`);

      const downloadPromise = this.page.waitForEvent("download");
      await this.actions.click(this.downLoadFileButton);
      const download = await downloadPromise;
      await download.saveAs(filePath + download.suggestedFilename());
      await this.assertions.expectToBeEqual(
        download.suggestedFilename(),
        "converted-file.docx"
      );
      // const buffer = readFileSync(`${filePath}converted-file.docx`);
      // const base64data = buffer.toString("base64");

      // console.log(base64data);
    });
  }
}
