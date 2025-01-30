import test, { Locator, Page } from "@playwright/test";
import { IClickOptions, ITypeOptions } from "../dataTypes/actionDataTypes";
import { readFileSync } from "fs";
import * as path from "path";

export class Actions {
  public async type(
    element: Locator,
    text: string | number,
    index: number = 0,
    options: ITypeOptions = {}
  ): Promise<void> {
    await test.step(`Type text: "${text}" in the ${element}`, async () => {
      const pageElement: Locator = element.nth(index);
      if (options.withClear) {
        await pageElement.fill("");
      }
      await pageElement.fill(text.toString(), options);
    });
  }

  public async click(
    element: Locator,
    options?: IClickOptions,
    index: number = 0
  ): Promise<void> {
    await test.step(`Click on the element with locator: ${element}`, async () => {
      await element.nth(index).click(options);
    });
  }

  public async dragAndDropFileToElement(
    page: Page,
    selector: string,
    fileName: string,
    fileType = ""
  ) {
    const filePath: string = path.join(__dirname, `../testData/${fileName}`);
    const buffer = readFileSync(`${filePath}`).toString("base64");
    const dataTransfer = await page.evaluateHandle(
      async ({ bufferData, localFileName, localFileType }) => {
        const dt = new DataTransfer();

        const blobData = await fetch(bufferData).then((res) => res.blob());

        const file = new File([blobData], localFileName, {
          type: localFileType,
        });
        dt.items.add(file);
        return dt;
      },
      {
        bufferData: `data:application/octet-stream;base64,${buffer}`,
        localFileName: fileName,
        localFileType: fileType,
      }
    );

    await page.dispatchEvent(selector, "drop", { dataTransfer });
  }

  public async hoverElement(element: Locator): Promise<void> {
    await test.step(`Hover on element: ${element}`, async () => {
      await element.hover();
    });
  }
}
