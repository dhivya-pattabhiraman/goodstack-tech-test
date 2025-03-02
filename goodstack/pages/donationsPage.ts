import { Page } from '@playwright/test'

import { Navigation } from '../components/navigation'
import { Footer } from "../components/footer";

export class DonationsPage {
    page: Page
    url: string

    constructor(page: Page) {
        this.page = page
        this.url = '/'
    }

    // Navigation Menu
    get navigation() {
        return new Navigation(this.page)
    }

    // Main content of the page
    get main() {
        return this.page.locator('main')
    }
    // Header
    get header() {
        return this.main.locator('header')
    }
    get title() {
        return this.header.getByRole('paragraph').first()
    }
    get heading() {
        return this.header.getByRole('heading')
    }
    get subText() {
        return this.header.getByRole('paragraph').last()
    }
    get getStartedButton() {
        return this.header.getByRole('button', {name: 'Get started'})
    }

    // Footer
    get footer() {
        return new Footer(this.page)
    }

    // Methods
    async visit(): Promise<any> {
        return this.page.goto(this.url, {waitUntil: 'domcontentloaded'})
    }

}
