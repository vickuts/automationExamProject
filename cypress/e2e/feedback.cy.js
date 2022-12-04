///<reference types="cypress"/>
import{faker} from '@faker-js/faker';

import loginPage from "../support/pages/LoginPage";
import homePage from "../support/pages/HomePage";
import contactPage from "../support/pages/ContactPage"
import user from '../fixtures/user.json';

const text = faker.random.alphaNumeric(100);

it('Customer Feedback', async () => {
  cy.setCookie('welcomebanner_status', 'dismiss');
  cy.setCookie('cookieconsent_status', 'dismiss');

  loginPage.visit();
  loginPage.submitLoginForm(user.email, user.password);

  homePage.clickOnHamburgerMenuButton();
  homePage.clickOnCustomerFeedbackButton();

  cy.url().should('eq', 'http://juice-shop-sanitarskyi.herokuapp.com/#/contact');
  // cy.url().should('eq', 'https://juice-shop.herokuapp.com/#/contact');

  contactPage.typeTextToCommentTextArea(text);
  contactPage.moveSliderToValue(3);
  contactPage.typeCaptchaValueToResultField();
  contactPage.clickOnSubmitButton();
  
  contactPage.getFeedbackToast().should('contain', 'Thank you for your feedback.');
})
