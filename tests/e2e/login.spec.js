const { test } = require('../support')

test('Deve logar como administrador', async ({page}) =>{
    
    await page.login.visit()

    await page.login.submit('admin@zombieplus.com', 'pwd123')
    
    await page.login.isLoggedIn('Admin')
})

test('Não deve logar com senha incorreta', async ({page}) =>{
    
    await page.login.visit()

    await page.login.submit('admin@zombieplus.com', '123')
    
    const message = 'Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'

    await page.popup.haveText(message)
})

test('Não deve logar quando o email não é inválido', async ({page}) =>{
    
    await page.login.visit()

    await page.login.submit('www.papito.com', '123')

    await page.login.alertHaveText('Email incorreto')
    
})

test('Não deve logar quando o email não é preenchido', async ({page}) =>{
    
    await page.login.visit()

    await page.login.submit('', '123')

    await page.login.alertHaveText('Campo obrigatório')
    
})

test('Não deve logar quando a senha não é preenchida', async ({page}) =>{
    
    await page.login.visit()

    await page.login.submit('papito@yahoo.com', '')
    
    await page.login.alertHaveText('Campo obrigatório')

})

test('Não deve logar quando nenhum campo não é preenchida', async ({page}) =>{
    
    await page.login.visit()

    await page.login.submit('', '')
    
    await page.login.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})