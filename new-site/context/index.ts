import { HomePage } from '../page-objects/pages/homePage'

export const context = new Map()

export const setHomePage = (homePage: HomePage) => context.set('HOME_PAGE', homePage)
export const getHomePage = () => context.get('HOME_PAGE')

export const reset = () => context.clear()
