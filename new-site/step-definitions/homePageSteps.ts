import {expect} from '@playwright/test'
import {Given, Then, When} from "@cucumber/cucumber"

import {baseDomain} from '../config'
import {pageFixture} from '../hooks/pageFixture'
import {setHomePage, getHomePage} from '../context'

import {HomePage} from '../page-objects/pages/homePage'

Given(/^I load the OrangeHRM website$/, async () => {
    const homePage = new HomePage(pageFixture.page)
    setHomePage(homePage)
    await homePage.visit(baseDomain)
})

When(/^I land on the Home page$/, async () => {
    const homePage = getHomePage()
    await expect(homePage.page).toHaveTitle('Human Resources Management Software | OrangeHRM')
})

Then(/^I can see the top navigation menu bar with the OrangeHRM logo$/, async () => {
    const homePage = getHomePage()
    await expect(homePage.navigation.logo).toBeVisible()
    await expect(homePage.navigation.logo).toHaveAttribute('href', '/')
})

Then(/^the navigation menu bar contains the "([^"]*)" menu$/, async (givenMenuName) => {
    const homePage = getHomePage()
    await expect(homePage.navigation.menu(givenMenuName)).toBeVisible()
})

Then(/^the navigation menu bar contains the Book a Free Demo button$/, async () => {
    const homePage = getHomePage()
    await expect(homePage.navigation.bookAFreeDemoButton).toBeVisible()
    await expect(homePage.navigation.bookAFreeDemoButton).toBeEnabled()
})

Then(/^the navigation menu bar contains the Contact Sales button$/, async () => {
    const homePage = getHomePage()
    await expect(homePage.navigation.contactSalesButton).toBeVisible()
    await expect(homePage.navigation.contactSalesButton).toBeEnabled()
})

When(/^I click the "([^"]*)" menu in the navigation menu bar$/, async (givenMenuName) => {
    const homePage = getHomePage()
    await homePage.navigation.menu(givenMenuName).click()
})

Then(/^I can see the various solutions that OrangeHRM offers$/, async () => {
    const homePage = getHomePage()
    await expect(homePage.navigation.menuItem('People Management')).toBeVisible()
    await expect(homePage.navigation.menuItem('Talent Management')).toBeVisible()
    await expect(homePage.navigation.menuItem('Compensation')).toBeVisible()
    await expect(homePage.navigation.menuItem('Connectors')).toBeVisible()
})

Then(/^I can see the various reasons why OrangeHRM is better$/, async () => {
    const homePage = getHomePage()
    await expect(homePage.navigation.menuItem('Our Customers')).toBeVisible()
    await expect(homePage.navigation.menuItem('Partners')).toBeVisible()
    await expect(homePage.navigation.menuItem('Stakeholder Solutions')).toBeVisible()
    await expect(homePage.navigation.menuItem('Switch to OrangeHRM')).toBeVisible()
    await expect(homePage.navigation.menuItem('Flexible Hosting')).toBeVisible()
})

Then(/^I can see the various resources available$/, async () => {
    const homePage = getHomePage()
    await expect(homePage.navigation.menuItem('eBooks')).toBeVisible()
    await expect(homePage.navigation.menuItem('Blog')).toBeVisible()
    await expect(homePage.navigation.menuItem('Learn in Depth')).toBeVisible()
    await expect(homePage.navigation.menuItem('Product Overview')).toBeVisible()
    await expect(homePage.navigation.menuItem('The HR Dictionary')).toBeVisible()
    await expect(homePage.navigation.menuItem('Other Resources')).toBeVisible()
    await expect(homePage.navigation.menuItem('Certification Program')).toBeVisible()
})

Then(/^I can see the various information links about the company$/, async () => {
    const homePage = getHomePage()
    await expect(homePage.navigation.menuItem('About Us')).toBeVisible()
    await expect(homePage.navigation.menuItem('Executive Profiles')).toBeVisible()
    await expect(homePage.navigation.menuItem('Press Releases')).toBeVisible()
    await expect(homePage.navigation.menuItem('News Articles')).toBeVisible()
    await expect(homePage.navigation.menuItem('Careers')).toBeVisible()
})
