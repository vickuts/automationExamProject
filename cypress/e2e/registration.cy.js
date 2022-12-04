///<reference types="cypress"/>
import{faker} from '@faker-js/faker';

import registrationPage from "../support/pages/RegistrationPage";
import loginPage from "../support/pages/LoginPage";
import homePage from "../support/pages/HomePage";

const user = {
  email: faker.internet.email(),
  password: faker.internet.password(10),
  answerOnQuestion: faker.name.firstName()
}

it('Registration', () => {
  cy.setCookie('welcomebanner_status', 'dismiss');
  cy.setCookie('cookieconsent_status', 'dismiss');
  
  registrationPage.visit();
  console.log(user);
  registrationPage.typeTextToEmailField(user.email);
  registrationPage.typeTextToPasswordField(user.password);
  registrationPage.typeTextToRepeatPasswordField(user.password);
  registrationPage.selectSecurityQuestionInDropdown('Name of your favorite pet?');
  registrationPage.typeTextToAnswerField(user.answerOnQuestion);
  registrationPage.clickOnRegisterButton();

  registrationPage.getFeedbackToast().should('contain', 'Registration completed successfully. You can now log in.');

  cy.url().should('eq', 'http://juice-shop-sanitarskyi.herokuapp.com/#/login');
  // cy.url().should('eq', 'https://juice-shop.herokuapp.com/#/login');
  loginPage.getLoginButton().should('be.visible');

  loginPage.submitLoginForm(user.email, user.password);

  cy.url().should('eq', 'http://juice-shop-sanitarskyi.herokuapp.com/#/search');
  // cy.url().should('eq', 'https://juice-shop.herokuapp.com/#/search');
  homePage.getYourBasketButton().should('be.visible');
})