import { Page } from '@playwright/test'

import { Navigation } from '../components/navigation'

export class HomePage {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    // Navigation Menu
    get navigation() {
        return new Navigation(this.page)
    }

    // Methods
    async visit(url: string): Promise<any> {
        return this.page.goto(url, {waitUntil: 'domcontentloaded'})
    }
}
