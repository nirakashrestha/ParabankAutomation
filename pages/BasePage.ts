import { Locator, Page } from "@playwright/test";

export class BasePage {

readonly page : Page;


constructor(page : Page){
    this.page = page;
}

getElement(locator : string) : Locator {
    return this.page.locator(locator);
}


}