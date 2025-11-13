import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

export class PageProvider{
    loginPage : LoginPage;

    constructor(page: Page){
        this.loginPage = new LoginPage(page);
    }
}