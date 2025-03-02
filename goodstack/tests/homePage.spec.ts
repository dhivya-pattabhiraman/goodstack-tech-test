import { expect, test } from '@playwright/test'

import { HomePage } from '../pages/homePage'
import { DonationsPage } from '../pages/donationsPage'

import {
    navigationMenu,
    productsMenuItems,
    solutionsMenuItems,
    resourcesMenuItems,
    companyMenuItems
} from '../assertions/navigation'
import {
    categories,
    productsLinks,
    solutionsLinks,
    resourcesLinks,
    companyLinks
} from '../assertions/footer'

let homePage: HomePage

test.describe('Verify Home page', () => {
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        await homePage.visit()
        await expect(homePage.page).toHaveTitle('Goodstack for Businesses')
    })

    test(`Navigation menu`, async () => {
        const navigation = homePage.navigation

        // Verify the logo displayed in the Navigation bar
        await expect(navigation.logo).toBeVisible()
        await expect(navigation.logo).toHaveAttribute('href', '/')

        // Verify the various menu and menu items displayed in the Navigation bar
        // Verify menu
        Object.values(navigationMenu)
            .map(async (name) => await expect(navigation.menu(name)).toBeVisible())

        async function verifyMenuItems(menuItems: { [s: string]: unknown } ) {
            return Object.values(menuItems)
                .map(async ({label, description, link}) => {
                    await expect(navigation.menuItem(label)).toBeVisible()
                    await expect(navigation.menuItem(label)).toContainText(description)
                    await expect(navigation.menuItem(label)).toHaveAttribute('href', link)
                })
        }

        // Verify the various items displayed in the Products menu
        await navigation.clickMenu(navigationMenu.products)
        await verifyMenuItems(productsMenuItems)

        // Verify the various items displayed in the Solutions menu
        await navigation.clickMenu(navigationMenu.solutions)
        await verifyMenuItems(solutionsMenuItems)

        // Verify the various items displayed in the Resources menu
        await navigation.clickMenu(navigationMenu.resources)
        await verifyMenuItems(resourcesMenuItems)

        // Verify the various items displayed in the Company menu
        await navigation.clickMenu(navigationMenu.company)
        await verifyMenuItems(companyMenuItems)

        // Verify Get started button
        await expect(navigation.getStartedButton).toBeVisible()
        await expect(navigation.getStartedButton).toBeEnabled()
    })

    test(`Footer`, async () => {
        const footer = homePage.footer

        // Verify the Footer
        await expect(footer.logo).toBeVisible()
        await expect(footer.socLogo).toBeVisible()
        await expect(footer.isoLogo).toBeVisible()

        // Verify the various categories and links displayed in the footer
        // Verify categories
        Object.values(categories)
            .map(async (name) => await expect(footer.category(name)).toBeVisible())

        async function verifyFooterLinks(footerLinks: { [s: string]: unknown } ) {
            return Object.values(footerLinks)
                .map(async ({label, link}) => {
                    await expect(footer.footerLink(label)).toBeVisible()
                    await expect(footer.footerLink(label)).toHaveAttribute('href', link)
                })
        }

        // Verify the various links displayed in the Products category
        await verifyFooterLinks(productsLinks)

        // Verify the various links displayed in the Solutions category
        await verifyFooterLinks(solutionsLinks)

        // Verify the various links displayed in the Company category
        await verifyFooterLinks(companyLinks)

        // Verify the various links displayed in the Resources category
        await verifyFooterLinks(resourcesLinks)
    })

    test(`Header section`, async () => {
        const headerSection = homePage.headerSection
        await expect(headerSection.title).toContainText('Donations infrastructure forIMPACTPURPOSEROICHANGEIMPACT')
        await expect(headerSection.subText)
            .toHaveText('Thousands of leading brands and causes connect using Goodstack’s global donations infrastructure — driving ROI while changing the world, for good.')
        await expect(headerSection.getStartedButton).toBeVisible()
        await expect(headerSection.getStartedButton).toBeEnabled()
        await expect(headerSection.video).toBeVisible()
        await expect(headerSection.carouselText).toHaveText(`Trusted by the world's most innovative companies`)
    })
})

test.describe('Verify', () => {
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        await homePage.visit()
        await expect(homePage.page).toHaveTitle('Goodstack for Businesses')
    })

    test(`Navigation to donations page from menu`, async ({ page }) => {
        // Click the Donations menu item from the Products menu in the Home page
        const navigation = homePage.navigation
        await expect(navigation.menu(navigationMenu.products)).toBeVisible()
        await navigation.clickMenu(navigationMenu.products)
        await expect(navigation.menuItem(productsMenuItems.donations.label)).toBeVisible()
        await navigation.clickMenuItem(productsMenuItems.donations.label)

        const donationsPage = new DonationsPage(page)

        // Verify the Donations page
        await expect(donationsPage.page).toHaveTitle('Goodstack for Businesses - Donations')
        await expect(donationsPage.page).toHaveURL('/donations')

        await expect(donationsPage.title).toHaveText('Donations')
        await expect(donationsPage.heading).toHaveText('The best way to send donations globally')
        await expect(donationsPage.subText).toHaveText('Send donations to causes around the world quickly, securely and cost-\n' +
            'effectively with Goodstack’s global donation rails.')

        await expect(donationsPage.getStartedButton).toBeVisible()
        await expect(donationsPage.getStartedButton).toBeEnabled()

        const timestamp = new Date().getTime()
        await page.screenshot({ path: `screenshots/screenshot-${timestamp}.png` })
    })
})
