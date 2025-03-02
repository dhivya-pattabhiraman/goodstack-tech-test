import {Before, BeforeAll, setDefaultTimeout, After, AfterAll, Status} from '@cucumber/cucumber'
import {Browser, BrowserContext, chromium} from '@playwright/test'
import {pageFixture} from './pageFixture'
import { reset } from '../context'

let browser: Browser
let context: BrowserContext

BeforeAll(async function () {
    setDefaultTimeout(60 * 2 * 1000)
    browser = await chromium.launch({ headless: true })
})

Before(async function (scenario) {
    console.info('\nStarting Scenario:', scenario.pickle.name)

    context = await browser.newContext()
    pageFixture.page = await context.newPage()

    reset()
})

After(async function ({ pickle, result }) {
    if (result?.status === Status.FAILED) {
        console.error('\nScenario Failed:', pickle.name)
        // Screenshots are saved in the directory after the test is completed for each scenario
        await pageFixture.page.screenshot({ path: `new-site/screenshots/${pickle.name}.png`, type: 'png' })
    } else {
        console.info('\nScenario Finished:', pickle.name)
    }
    await pageFixture.page.close()
    await context.close()
})

AfterAll(async function () {
    await browser.close()
})
