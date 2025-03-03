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
        return this.navigation.getByRole('link').filter({has: this.page.getByAltText('Goodstack logo')}).first()
    }
    get getStartedButton() {
        return this.navigation.getByRole('button', { name: 'Get started' })
    }
    menu(name: string) {
        return this.navigation.getByRole('button', { name })
    }
    menuItem(name: string) {
        return this.navigation.getByRole('menuitem').filter({hasText: name})
    }

    // Methods
    clickMenu(name: string) {
        return this.menu(name).click()
    }
    async clickMenuItem(name: string) {
        await this.menuItem(name).click()
        return this.page.waitForLoadState('domcontentloaded')
    }
    clickGetStartedButton() {
        return this.getStartedButton.click()
    }
}
