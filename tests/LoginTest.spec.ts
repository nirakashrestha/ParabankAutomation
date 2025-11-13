import test, { expect, Locator } from "@playwright/test";
import { PageProvider } from "../helpers/PageProvider";


let pages: PageProvider;


test.beforeEach(async ({ page }) => {
     pages = new PageProvider(page);

});


test('Login to Parabank', async ({ page }) => {

     const errorMsg: Locator = page.getByText("The username and password could not be verified.");     
     const accountsOverview: Locator = page.locator("//div[@id='showOverview']/h1");

     await page.goto("https://parabank.parasoft.com/parabank/index.htm");
     await expect(page).toHaveTitle("ParaBank | Welcome | Online Banking");

     await pages.loginPage.user.fill("ecarter_test6");
     await pages.loginPage.password.fill("Test@1234");
     await pages.loginPage.login.click();

     await page.waitForLoadState('networkidle'); //this line is important

     if (await accountsOverview.isVisible()) {
          await expect(page).toHaveTitle("ParaBank | Accounts Overview");
     } else {
          await page.waitForSelector('//*[@id="rightPanel"]/p', { state: 'visible', timeout: 5000 });
     }


     if (await errorMsg.isVisible()) {
          const userName = "ecarter_test6";


          await page.locator("//a[@href='register.htm']").click();
          await page.waitForSelector('.title', { state: 'visible', timeout: 2000 });

          await page.locator('[id="customer.firstName"]').fill('Emily');
          await page.locator('[id="customer.lastName"]').fill('Carter');
          await page.locator('[id="customer.address.street"]').fill('742 Evergreen Terrace');
          await page.locator('[id="customer.address.city"]').fill('Springfield');
          await page.locator('[id="customer.address.state"]').fill('sdfdf');
          await page.locator('[id="customer.address.state"]').fill('IL');
          await page.locator('[id="customer.address.zipCode"]').fill('62704');
          await page.locator('[id="customer.phoneNumber"]').fill('2175559382');
          await page.locator('[id="customer.ssn"]').fill('123456789');
          await page.locator('[id="customer.username"]').fill(userName);
          await page.locator('[id="customer.password"]').fill('Test@1234');
          await page.locator('#repeatedPassword').fill('Test@1234');
          await page.getByRole('button', { name: 'Register' }).click();

          await page.waitForSelector('h1', { state: 'visible', timeout: 1000 });

          const welcomeUser = page.locator("h1");
          const accountCreateMsg = page.locator("//*[@id='rightPanel']/p");
          await expect(welcomeUser).toHaveText("Welcome " + userName);
          await expect(accountCreateMsg).toHaveText("Your account was created successfully. You are now logged in.");

     } else {
          await expect(page).toHaveTitle("ParaBank | Accounts Overview");
     }



});

