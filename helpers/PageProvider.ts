import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

export class PageProvider{
    loginPage : LoginPage;
    registerPage : RegisterPage;

    constructor(page: Page){
        this.loginPage = new LoginPage(page);
        this.registerPage = new RegisterPage(page);
    }
}