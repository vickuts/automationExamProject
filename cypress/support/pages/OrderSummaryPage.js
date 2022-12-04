import BasePage from "./BasePage";

class OrderSummaryPage extends BasePage {
    visit() {
        cy.log('**Open order summary page**');
        cy.visit('/#/order-summary')
    }

    getPlaceYourOrderAndPayButton() {
        return cy.get('#checkoutButton');
    }

    getTitle() {
        return cy.get('h1');
    }

    clickOnPlaceYourOrderAndPayButton() {
        cy.log(`**Click on Place your order and pay button**`);
        this.getPlaceYourOrderAndPayButton().click();
    }
}

export default new OrderSummaryPage();