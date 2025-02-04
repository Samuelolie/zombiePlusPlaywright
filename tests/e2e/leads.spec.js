const { test, expect } = require('../support')
const { faker } = require('@faker-js/faker')
const { executeSQL } = require('../support/database')

test.beforeAll(async() =>{
    await executeSQL(`DELETE FROM leads`)
})

test('Deve cadastrar um lead na lista de espera', async ({ page }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()
  
  await page.leads.visit()

  await page.leads.openLeadModal()

  await page.leads.submitLeadForm(leadName, leadEmail)
  
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.'
  
  await page.popup.haveText(message)

});

test('Não deve cadastrar quando o email já existe', async ({ page, request }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()
  
  const newLead = await request.post('http://localhost:3333/leads', {
    data:{
      name: leadName,
      email: leadEmail
    }
  })

  expect(newLead.ok()).toBeTruthy()
  
  await page.leads.visit()

  await page.leads.openLeadModal()

  await page.leads.submitLeadForm(leadName, leadEmail)
  
  const message = 'Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.'
  
  await page.popup.haveText(message)

});

test('Não deve cadastrar com email inválido', async ({ page }) => {

  await page.leads.visit()

  await page.leads.openLeadModal()

  await page.leads.submitLeadForm('Fernando Papito', 'papito.com.br')

  await page.login.alertHaveText('Email incorreto')
});

test('Não deve cadastrar quando o nome não é preenchido', async ({ page }) => {

  await page.leads.visit()

  await page.leads.openLeadModal()

  await page.leads.submitLeadForm('', 'papito@yahoo.com')

  await page.login.alertHaveText('Campo obrigatório')
});

test('Não deve cadastrar quando o email não é preenchido', async ({ page }) => {

  await page.leads.visit()

  await page.leads.openLeadModal()

  await page.leads.submitLeadForm('Fernando Papito', '')

  await page.login.alertHaveText('Campo obrigatório')
});

test('Não deve cadastrar quando nenhum campo é preechido', async ({ page }) => {

  await page.leads.visit()

  await page.leads.openLeadModal()

  await page.leads.submitLeadForm('', '')

  await page.login.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])
});

