import { Page } from '@playwright/test'

export class Navigation {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    // Locators
    get navigation() {
        return this.page.getByRole('navigation')
    }
    get logo() {
        return this.navigation.getByRole('link').filter({has: this.page.getByAltText('OrangeHRM Logo')}).first()
    }
    get bookAFreeDemoButton() {
        return this.navigation.getByRole('button', { name: 'Book a Free Demo' })
    }
    get contactSalesButton() {
        return this.navigation.getByRole('button', { name: 'Contact Sales' })
    }
    menu(name: string) {
        return this.navigation.locator('li a').filter({ hasText: name }).first()
    }
    menuItem(name: string) {
        return this.navigation.locator('li.sub-menu-title').filter({hasText: name})
    }

    // Methods
    async clickMenu(name: string) {
        return this.menu(name).click()
    }
    async clickMenuItem(name: string) {
        return this.menuItem(name).click()
    }
    async clickBookAFreeDemoButton() {
        return this.bookAFreeDemoButton.click()
    }
    async clickContactSalesButton() {
        return this.contactSalesButton.click()
    }
}
