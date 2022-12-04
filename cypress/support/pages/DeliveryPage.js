import BasePage from "./BasePage";

class DeliveryPage extends BasePage {
    visit() {
        cy.log('**Open delivery page**');
        cy.visit('/#/address/select')
    }

    getStandardDeliveryMethod() {
        return cy.get('.fa-truck');
    }

    getContinueButton() {
        return cy.get('[aria-label="Proceed to delivery method selection"]');
    }

    selectStandardDeliveryMethod() {
        cy.log(`**Select standard delivery method**`);
        this.getStandardDeliveryMethod().click();
        this.getContinueButton().click();
    }
}

export default new DeliveryPage();