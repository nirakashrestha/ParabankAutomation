import test, { expect, Locator } from "@playwright/test";
import { PageProvider } from "../helpers/PageProvider";


let pages: PageProvider;
const userName = "ecarter_test8";


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

     await pages.registerPage.firstName.fill('Emily');
     await pages.registerPage.lastName.fill('Carter');
     await pages.registerPage.street.fill('742 Evergreen Terrace');
     await pages.registerPage.city.fill('Springfield');
     await pages.registerPage.state.fill('IL');
     await pages.registerPage.zipCode.fill('62704');
     await pages.registerPage.phoneNumber.fill('2175559382');
     await pages.registerPage.ssn.fill('123456789');
     await pages.registerPage.userName.fill(userName);
     await pages.registerPage.password.fill('Test@1234');
     await pages.registerPage.repeatedPassword.fill('Test@1234');
     await pages.registerPage.register.click();


     //wait for welcome user message to be visible
     await page.waitForSelector('h1', { state: 'visible', timeout: 1000 });

     //assertion     
     await expect(pages.registerPage.welcomeUser).toHaveText("Welcome " + userName);
     await expect(pages.registerPage.accountCreateMsg).toHaveText("Your account was created successfully. You are now logged in.");

});


test('Login to Parabank', async ({ page }) => {     

     await pages.loginPage.user.fill(userName);
     await pages.loginPage.password.fill("Test@1234");
     await pages.loginPage.login.click();

     await expect(page).toHaveTitle("ParaBank | Accounts Overview");
                 

});

