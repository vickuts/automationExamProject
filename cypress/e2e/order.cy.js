///<reference types="cypress"/>
import{faker} from '@faker-js/faker';

import loginPage from "../support/pages/LoginPage";
import homePage from "../support/pages/HomePage";
import basketPage from "../support/pages/BasketPage";
import addressPage from "../support/pages/AddressPage";
import deliveryPage from "../support/pages/DeliveryPage";
import paymentPage from "../support/pages/PaymentPage";
import orderSummaryPage from '../support/pages/OrderSummaryPage';
import user from '../fixtures/user.json';
import {searchProductOnMainPage} from '../support/helper';

beforeEach('Login to app', () => {
  cy.setCookie('welcomebanner_status', 'dismiss');
  cy.setCookie('cookieconsent_status', 'dismiss');

  loginPage.visit();
  loginPage.submitLoginForm(user.email, user.password);
})

it('Order', () => {
  homePage.addToBasketProductWithSequenceNumber(3);
  
  homePage.getYourBasketBadgeCounter().should('contain', 1);

  homePage.clickOnYourBasketButton();

  cy.url().should('eq', 'http://juice-shop-sanitarskyi.herokuapp.com/#/basket');
  // cy.url().should('eq', 'https://juice-shop.herokuapp.com/#/basket');

  basketPage.getProductName().should('contain', 'Banana Juice (1000ml)');
  basketPage.getQuantityOfProducts().should('contain', 1);
  basketPage.clickOnCheckoutButton();

  cy.url().should('eq', 'http://juice-shop-sanitarskyi.herokuapp.com/#/address/select');
  // cy.url().should('eq', 'https://juice-shop.herokuapp.com/#/address/select');

  addressPage.clickOnAddNewAddressButton();

  cy.url().should('eq', 'http://juice-shop-sanitarskyi.herokuapp.com/#/address/create');
  // cy.url().should('eq', 'https://juice-shop.herokuapp.com/#/address/create');

  addressPage.typeTextToCountryField(faker.address.country());
  addressPage.typeTextToNameField(faker.name.firstName());
  addressPage.typeTextToMobileNumberField(faker.random.numeric(7));
  addressPage.typeTextToZIPCodeField(faker.random.numeric(5));
  addressPage.typeTextToAddressField(faker.address.streetAddress());
  addressPage.typeTextToCityyField(faker.address.city());
  addressPage.clickOnSubmitButton();

  cy.url().should('eq', 'http://juice-shop-sanitarskyi.herokuapp.com/#/address/select');
  // cy.url().should('eq', 'https://juice-shop.herokuapp.com/#/address/select');

  addressPage.selectNewAddedAddress();

  cy.url().should('eq', 'http://juice-shop-sanitarskyi.herokuapp.com/#/delivery-method');
  // cy.url().should('eq', 'https://juice-shop.herokuapp.com/#/delivery-method');

  deliveryPage.selectStandardDeliveryMethod();

  cy.url().should('eq', 'http://juice-shop-sanitarskyi.herokuapp.com/#/payment/shop');
  // cy.url().should('eq', 'https://juice-shop.herokuapp.com/#/payment/shop');

  paymentPage.selectAddNewCardOption();
  paymentPage.typeTextToNameField(faker.name.firstName());
  paymentPage.typeTextToCardNumberField(faker.random.numeric(16));
  paymentPage.selectOptionInExpiryMonthDropdown(0);
  paymentPage.selectOptionInExpiryYearDropdown(3);
  paymentPage.clickOnSubmitButton();
  paymentPage.selectNewAddedCard();

  cy.url().should('eq', 'http://juice-shop-sanitarskyi.herokuapp.com/#/order-summary');
  // cy.url().should('eq', 'https://juice-shop.herokuapp.com/#/order-summary');

  orderSummaryPage.clickOnPlaceYourOrderAndPayButton();

  cy.url().should('contain', 'order-completion');

  orderSummaryPage.getTitle().should('have.text', 'Thank you for your purchase!');
})

it('Order found product', () => {
  homePage.performSearch('Strawberry Juice');
  searchProductOnMainPage('Strawberry Juice');
  homePage.addToBasketFoundProductWithName('Strawberry Juice');

  homePage.getYourBasketBadgeCounter().should('contain', 1);

  homePage.clickOnYourBasketButton();

  cy.url().should('eq', 'http://juice-shop-sanitarskyi.herokuapp.com/#/basket');
  // cy.url().should('eq', 'https://juice-shop.herokuapp.com/#/basket');

  basketPage.getProductName().should('contain', 'Strawberry Juice (500ml)');
  basketPage.getQuantityOfProducts().should('contain', 1);
  basketPage.clickOnCheckoutButton();

  cy.url().should('eq', 'http://juice-shop-sanitarskyi.herokuapp.com/#/address/select');
  // cy.url().should('eq', 'https://juice-shop.herokuapp.com/#/address/select');

  addressPage.clickOnAddNewAddressButton();

  cy.url().should('eq', 'http://juice-shop-sanitarskyi.herokuapp.com/#/address/create');
  // cy.url().should('eq', 'https://juice-shop.herokuapp.com/#/address/create');

  addressPage.typeTextToCountryField(faker.address.country());
  addressPage.typeTextToNameField(faker.name.firstName());
  addressPage.typeTextToMobileNumberField(faker.random.numeric(7));
  addressPage.typeTextToZIPCodeField(faker.random.numeric(5));
  addressPage.typeTextToAddressField(faker.address.streetAddress());
  addressPage.typeTextToCityyField(faker.address.city());
  addressPage.clickOnSubmitButton();

  cy.url().should('eq', 'http://juice-shop-sanitarskyi.herokuapp.com/#/address/select');
  // cy.url().should('eq', 'https://juice-shop.herokuapp.com/#/address/select');

  addressPage.selectNewAddedAddress();

  cy.url().should('eq', 'http://juice-shop-sanitarskyi.herokuapp.com/#/delivery-method');
  // cy.url().should('eq', 'https://juice-shop.herokuapp.com/#/delivery-method');

  deliveryPage.selectStandardDeliveryMethod();

  cy.url().should('eq', 'http://juice-shop-sanitarskyi.herokuapp.com/#/payment/shop');
  // cy.url().should('eq', 'https://juice-shop.herokuapp.com/#/payment/shop');

  paymentPage.selectAddNewCardOption();
  paymentPage.typeTextToNameField(faker.name.firstName());
  paymentPage.typeTextToCardNumberField(faker.random.numeric(16));
  paymentPage.selectOptionInExpiryMonthDropdown(0);
  paymentPage.selectOptionInExpiryYearDropdown(3);
  paymentPage.clickOnSubmitButton();
  paymentPage.selectNewAddedCard();

  cy.url().should('eq', 'http://juice-shop-sanitarskyi.herokuapp.com/#/order-summary');
  // cy.url().should('eq', 'https://juice-shop.herokuapp.com/#/order-summary');

  orderSummaryPage.clickOnPlaceYourOrderAndPayButton();

  cy.url().should('contain', 'order-completion');

  orderSummaryPage.getTitle().should('have.text', 'Thank you for your purchase!');
})
