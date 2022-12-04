import BasePage from "./BasePage";

class PaymentPage extends BasePage {
    visit() {
        cy.log('**Open payment page**');
        cy.visit('/#/payment/shop')
    }

    getAddNewCardOption() {
        return cy.get('app-payment-method mat-expansion-panel');
    }

    getNameField() {
        // return cy.get('input#mat-input-1');
        return cy.get('app-payment-method mat-form-field:first-of-type');
    }

    getCardNumberField() {
        return cy.get('app-payment-method mat-form-field:nth-child(2)');
    }

    getExpiryMonthDropdown() {
        return cy.get('app-payment-method mat-form-field:nth-child(3) select');
    }

    getExpiryYearDropdown() {
        return cy.get('app-payment-method mat-form-field:nth-child(4) select');
    }

    getSubmitButton() {
        return cy.get('#submitButton');
    }

    getNewAddedCardFromList() {
        return cy.get(`mat-table mat-row:last-of-type mat-radio-button`);
    }
    
    getContinueButton() {
        return cy.get('[aria-label="Proceed to review"]');
    }
    
    selectAddNewCardOption() {
        cy.log(`**Select Add new card option**`);
        this.getAddNewCardOption().click();
    }

    typeTextToNameField(name) {
        cy.log(`**Type name ${name} to Name field**`);
        this.getNameField().type(name);
    }

    typeTextToCardNumberField(cardNumber) {
        cy.log(`**Type number ${cardNumber} to Card Number field**`);
        this.getCardNumberField().type(cardNumber);
    }

    selectOptionInExpiryMonthDropdown(expiryMonth) {
        cy.log(`**Select month ${expiryMonth} in Expiry Month dropdown**`);
        this.getExpiryMonthDropdown().select(expiryMonth);
    }

    selectOptionInExpiryYearDropdown(expiryYear) {
        cy.log(`**Select year ${expiryYear} in Expiry Year dropdown**`);
        this.getExpiryYearDropdown().select(expiryYear);
    }

    clickOnSubmitButton() {
        cy.log(`**Click on Submit button**`);
        this.getSubmitButton().click();
    }

    selectNewAddedCard() {
        cy.log(`**Select new added card from list**`);
        this.getNewAddedCardFromList().click();
        this.getContinueButton().click();
    }
}

export default new PaymentPage();