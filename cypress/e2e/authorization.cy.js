///<reference types="cypress"/>

import homePage from "../support/pages/HomePage";
import loginPage from "../support/pages/LoginPage";
import user from '../fixtures/user.json';

it('Authorization', () => {
  cy.setCookie('welcomebanner_status', 'dismiss');
  cy.setCookie('cookieconsent_status', 'dismiss');
  
  homePage.visit();
  homePage.clickOnLoginButton();
  
  cy.url().should('eq', 'http://juice-shop-sanitarskyi.herokuapp.com/#/login');
  // cy.url().should('eq', 'https://juice-shop.herokuapp.com/#/login');

  loginPage.submitLoginForm(user.email, user.password);

  cy.url().should('eq', 'http://juice-shop-sanitarskyi.herokuapp.com/#/search');
  // cy.url().should('eq', 'https://juice-shop.herokuapp.com/#/search');

  homePage.clickOnAccountButton();

  homePage.getLogoutButton().should('be.visible');

  homePage.getUserProfileButton().should('contain', user.email);
})