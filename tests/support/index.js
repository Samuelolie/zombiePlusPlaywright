const { test: base, expect } = require('@playwright/test')

const {LoginPage} = require('../pages/loginPage')
const {LandingPage} = require('../pages/landingPage')
const { MoviesPage } = require('../pages/moviePage')
const {Toast} = require('../pages/Components')

const test = base.extend({
    page : async ({page}, use) =>{
         
        await use({
            ...page,
            landing: new LandingPage(page),
            login: new LoginPage(page),
            movies: new MoviesPage(page),
            toast: new Toast(page)
        })
    
    } 
})

export { test, expect }