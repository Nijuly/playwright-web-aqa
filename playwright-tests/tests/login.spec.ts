import test from "@playwright/test";
import { LoginPage } from "../pageObjects/loginPage";
import { NavigationBarPage } from "../pageObjects/navigationBarPage";
import { Url } from "../testData/urlData";
import { errorMessage } from "../testData/textData";
import { VALID_USER } from "../testData/credentialsData";
import { MakeData } from "../helpers/makeData";
import { restartServer } from "../helpers/restartServer";

let loginPage: LoginPage;
let navigationBarPage: NavigationBarPage;
const makeData = new MakeData();

test.describe("Login user test", () => {
  test.beforeAll(async () => {
    test.setTimeout(60000);

    await restartServer();
  });
  test("Validate elements at the login page", async ({ page }) => {
    loginPage = new LoginPage(page);
    navigationBarPage = new NavigationBarPage(page);

    await page.goto("/");
    await loginPage.checkEmailAndPasswordFieldsAreVisible();
    await loginPage.checkSignInButtonIsVisible();
    await navigationBarPage.checkLogoIsVisible();
  });

  test("Login with a valid username and valid password", async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.loginUser(VALID_USER.email, VALID_USER.password);
    await loginPage.checkURL(page, Url.CONVERT);
  });

  [
    {
      testName: "Login with a valid username and invalid password",
      email: VALID_USER.email,
      password: makeData.generateRandomString(10),
      errorMessage: errorMessage,
    },
    {
      testName: "Login with a invalid username and invalid password",
      email: makeData.generateRandomString(10),
      password: makeData.generateRandomString(10),
      errorMessage: errorMessage,
    },
    {
      testName: "Login with a invalid username and valid password",
      email: makeData.generateRandomString(10),
      password: VALID_USER.password,
      errorMessage: errorMessage,
    },
    {
      testName: "Login with a empty username and password",
      email: "",
      password: "",
      errorMessage: errorMessage,
    },
    {
      testName: "Login with a empty username and valid password",
      email: "",
      password: VALID_USER.password,
      errorMessage: errorMessage,
    },
    {
      testName: "Login with a valid username and empty password",
      email: VALID_USER.email,
      password: makeData.generateRandomString(7),
      errorMessage: errorMessage,
    },
    {
      testName: "Login with password for another user",
      email: `${makeData.generateRandomString(6)}@gmail.com`,
      password: makeData.generateRandomString(7),
      errorMessage: errorMessage,
    },
  ].forEach(({ testName, email, password, errorMessage }) => {
    test(`${testName}`, async ({ page, baseURL }) => {
      loginPage = new LoginPage(page);

      await loginPage.loginUser(email, password);
      await loginPage.checkEmailAndPasswordFieldsAreVisible();
      await loginPage.checkURL(page, baseURL as string);
      if (await loginPage.alertMessage.isVisible()) {
        await loginPage.checkAlertMessageHasText(errorMessage);
      }
    });
  });
});
