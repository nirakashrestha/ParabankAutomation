import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage {

    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly street: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly zipCode: Locator;
    readonly phoneNumber: Locator;
    readonly ssn: Locator;
    readonly userName: Locator;
    readonly password: Locator;
    readonly repeatedPassword: Locator;
    readonly register: Locator;
    readonly accountCreateMsg : Locator;
    readonly welcomeUser : Locator;

    constructor(page: Page) {
        super(page);
        this.firstName = this.getElement('[id="customer.firstName"]');
        this.lastName = this.getElement('[id="customer.lastName"]');
        this.street = this.getElement('[id="customer.address.street"]');
        this.city = this.getElement('[id="customer.address.city"]');
        this.state = this.getElement('[id="customer.address.state"]');
        this.zipCode = this.getElement('[id="customer.address.zipCode"]');
        this.phoneNumber = this.getElement('[id="customer.phoneNumber"]');
        this.ssn = this.getElement('[id="customer.ssn"]');
        this.userName = this.getElement('[id="customer.username"]');
        this.password = this.getElement('[id="customer.password"]');
        this.repeatedPassword = this.getElement('#repeatedPassword');
        this.register = page.getByRole('button', { name: 'Register' });
        this.accountCreateMsg = this.getElement("//*[@id='rightPanel']/p");
        this.welcomeUser = this.getElement(("h1"));

    }

}