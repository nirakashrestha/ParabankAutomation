import test, { expect, Locator } from "@playwright/test";
import { PageProvider } from "../helpers/PageProvider";


let pages: PageProvider;
const userName = "ecarter_test5";


test.beforeEach(async ({ page }) => {
     pages = new PageProvider(page);

     //visit parabankwebsite
     await page.goto("parabank/about.htm");
});

test('Verify Page Title', async ({ page }) => {
     await expect(page).toHaveTitle("ParaBank | About Us");
});

test('Register New User', async ({ page }) => {

     await page.waitForLoadState('networkidle');// wait for page load to complete
     await page.getByRole('link', { name: 'Register' }).click();  //click link

     //fill user details
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

     //wait for welcome user message to be visible
     await page.waitForSelector('h1', { state: 'visible', timeout: 1000 });

     //assertion
     const welcomeUser = page.locator("h1");
     const accountCreateMsg = page.locator("//*[@id='rightPanel']/p");
     await expect(welcomeUser).toHaveText("Welcome " + userName);
     await expect(accountCreateMsg).toHaveText("Your account was created successfully. You are now logged in.");

});


test('Login to Parabank', async ({ page }) => {     

     await pages.loginPage.user.fill(userName);
     await pages.loginPage.password.fill("Test@1234");
     await pages.loginPage.login.click();

     await expect(page).toHaveTitle("ParaBank | Accounts Overview");
                 

});

