import { Page } from '@playwright/test'

import { Navigation } from '../components/navigation'
import { Footer } from '../components/footer'

export class HomePage {
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
    // Header section elements
    get header() {
        return this.main.locator('header')
    }
    get headerSection() {
        return {
            title: this.header.getByRole('heading'),
            subText: this.header.getByRole('paragraph').first(),
            video: this.header.locator('video'),
            getStartedButton: this.header.getByRole('button', {name: 'Get started'}),
            carouselText: this.header.getByRole('paragraph').last(),
            carouselImages: this.header.getByRole('img')
        }
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
