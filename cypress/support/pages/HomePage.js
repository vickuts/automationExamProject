import BasePage from "./BasePage";

class HomePage extends BasePage {
    visit() {
        cy.log('**Open home page**');
        cy.visit('/')
    }

    getYourBasketButton() {
        return cy.get('[routerlink="/basket"]');
    }

    getYourBasketBadgeCounter() {
        return cy.get('.fa-layers-counter.fa-layers-top-right');
    }

    getAccountButton() {
        return cy.get('#navbarAccount');
    }

    getLoginButton() {
        return cy.get('#navbarLoginButton');
    }

    getLogoutButton() {
        return cy.get('#navbarLogoutButton');
    }

    getUserProfileButton() {
        return cy.get('[aria-label="Go to user profile"] [class="menu-text truncate"]');
    }

    getProductBySequenceNumber(sequenceNumber) {
        return cy.get(`.mat-grid-tile.ng-star-inserted:nth-child(${sequenceNumber})`);
    }

    getAddtoBasketButtonForProductBySequenceNumber(sequenceNumber) {
        return cy.get(`.mat-grid-tile.ng-star-inserted:nth-child(${sequenceNumber}) button`);
    }

    getAddtoBasketButtonForFoundProductByName(productName) {
        return cy.get(`[alt*="${productName}"] `).closest('div[class*=product]').siblings()
    }

    getHamburgerMenuButton() {
        return cy.get('mat-icon').contains('menu');
    }

    getCustomerFeedbackButton() {
        return cy.get('[href="#/contact"]');
    }

    clickOnAccountButton() {
        cy.log(`**Click on Account button**`);
        this.getAccountButton().click();
    }

    clickOnLoginButton() {
        cy.log(`**Click on Login button**`);
        this.clickOnAccountButton();
        this.getLoginButton().click();
    }

    addToBasketProductWithSequenceNumber(sequenceNumber) {
        cy.log(`**Add to basket product with sequence number ${sequenceNumber}**`);
        this.getAddtoBasketButtonForProductBySequenceNumber(sequenceNumber).click();
    }

    addToBasketFoundProductWithName(productName) {
        cy.log(`**Add to basket found product with name ${productName}**`);
        this.getAddtoBasketButtonForFoundProductByName(productName).click();
    }

    clickOnYourBasketButton() {
        cy.log(`**Click on Your Basket button**`);
        this.getYourBasketButton().click();
    }

    clickOnHamburgerMenuButton() {
        cy.log(`**Click on Hamburger Menu button**`);
        this.getHamburgerMenuButton().click();
    }

    clickOnCustomerFeedbackButton() {
        cy.log(`**Click on Customer Feedback button**`);
        this.getCustomerFeedbackButton().click();
    }
}

export default new HomePage();