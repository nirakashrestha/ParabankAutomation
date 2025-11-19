import { test, expect } from "@playwright/test";
import { PageProvider } from "../helpers/PageProvider";
import DataSet from "../data/loginData.json";
import Titles from "../data/titles.json"
import PageMessage from "../data/messages.json"


let pages: PageProvider;
const loginData : any = JSON.parse(JSON.stringify(DataSet));

test.beforeEach(async ({ page }) => {
     pages = new PageProvider(page);

     //visit parabankwebsite
     await page.goto("parabank/about.htm");
});

test('Verify Page Title', async ({ page }) => {
     await expect(page).toHaveTitle(Titles.aboutUs);
});

test('Register New User', async ({ page }) => {

     await page.waitForLoadState('networkidle');// wait for page load to complete
     await page.getByRole('link', { name: 'Register' }).click();  //click link

     //fill user details   

     await pages.registerPage.firstName.fill(loginData.firstName);
     await pages.registerPage.lastName.fill(loginData.lastName);
     await pages.registerPage.street.fill(loginData.street);
     await pages.registerPage.city.fill(loginData.city);
     await pages.registerPage.state.fill(loginData.state);
     await pages.registerPage.zipCode.fill(loginData.zipCode);
     await pages.registerPage.phoneNumber.fill(loginData.phoneNumber);
     await pages.registerPage.ssn.fill(loginData.ssn);
     await pages.registerPage.userName.fill(loginData.userName);
     await pages.registerPage.password.fill(loginData.password);
     await pages.registerPage.repeatedPassword.fill(loginData.repeatedPassword);
     await pages.registerPage.register.click();


     //wait for welcome user message to be visible
     await page.waitForSelector('h1', { state: 'visible', timeout: 1000 });

     //assertion     
     await expect(pages.registerPage.welcomeUser).toHaveText("Welcome " + loginData.userName);
     await expect(pages.registerPage.accountCreateMsg).toHaveText(PageMessage.accountCreateMessage);

});


test('Login to Parabank', async ({ page }) => {     

     await pages.loginPage.user.fill(loginData.userName);
     await pages.loginPage.password.fill(loginData.password);
     await pages.loginPage.login.click();
     //assertion - landed on accounts overview page
     await expect(page).toHaveTitle(Titles.accountsOverview);                

});

test("Invalid Login", async ()=>{  
     
     await pages.loginPage.user.fill(loginData.invalidUserName);
     await pages.loginPage.password.fill(loginData.password);
     await pages.loginPage.login.click();
     await expect(pages.loginPage.error).toHaveText(PageMessage.accountCreateErrorMessage);

});

