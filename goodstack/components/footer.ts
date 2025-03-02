import { Page } from '@playwright/test'

export class Footer {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    // Locators
    get footer() {
        return this.page.locator('footer')
    }
    get logo() {
        return this.footer.getByAltText('Goodstack logo')
    }
    get socLogo() {
        return this.footer.getByAltText('SOC logo')
    }
    get isoLogo() {
        return this.footer.getByAltText('ISO logo')
    }
    category(name: string) {
        return this.footer.getByText(name)
    }
    footerLink(name: string) {
        return this.footer.getByRole('link', { name, exact: true })
    }

    // Methods
    async clickFooterLink(name: string) {
        return this.footerLink(name).click()
    }
}
