import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    readonly user: Locator;
    readonly password: Locator;
    readonly login: Locator;

    constructor(page: Page) {
        super(page);
        this.user = this.getElement("//input[@name='username']");
        this.password = this.getElement("//input[@name='password']");
        this.login = this.getElement("//input[@value='Log In']");
    }
   
}