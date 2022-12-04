import BasePage from "./BasePage";

class AddressPage extends BasePage {
    visit() {
        cy.log('**Open address page**');
        cy.visit('/#/address/select')
    }

    getAddNewAddressButton() {
        return cy.get('[aria-label="Add a new address"]');
    }

    getCountryField() {
        return cy.get('[placeholder="Please provide a country."]');
    }

    getNameField() {
        return cy.get('[placeholder="Please provide a name."]');
    }

    getMobileNumberField() {
        return cy.get('[placeholder="Please provide a mobile number."]');
    }

    getZIPCodeField() {
        return cy.get('[placeholder="Please provide a ZIP code."]');
    }

    getAddressField() {
        return cy.get('[placeholder="Please provide an address."]');
    }

    getCityField() {
        return cy.get('[placeholder="Please provide a city."]');
    }

    getNewAddedAddressFromList() {
        return cy.get(`mat-table mat-row:last-of-type`);
    }

    getContinueButton() {
        return cy.get('[aria-label="Proceed to payment selection"]');
    }

    getSubmitButton() {
        return cy.get('#submitButton');
    }

    clickOnAddNewAddressButton() {
        cy.log(`**Click on Add New Address button**`);
        this.getAddNewAddressButton().click();
    }

    typeTextToCountryField(country) {
        cy.log(`**Type country ${country} to Country field**`);
        this.getCountryField().type(country);
    }

    typeTextToNameField(name) {
        cy.log(`**Type name ${name} to Name field**`);
        this.getNameField().type(name);
    }

    typeTextToMobileNumberField(mobileNumber) {
        cy.log(`**Type mobile number ${mobileNumber} to Mobile Number field**`);
        this.getMobileNumberField().type(mobileNumber);
    }

    typeTextToZIPCodeField(zipCode) {
        cy.log(`**Type ZIP coode ${zipCode} to ZIP Code field**`);
        this.getZIPCodeField().type(zipCode);
    }

    typeTextToAddressField(address) {
        cy.log(`**Type address ${address} to Address field**`);
        this.getAddressField().type(address);
    }

    typeTextToCityyField(city) {
        cy.log(`**Type city ${city} to City field**`);
        this.getCityField().type(city);
    }

    clickOnSubmitButton() {
        cy.log(`**Click on Submit button**`);
        this.getSubmitButton().click();
    }

    selectNewAddedAddress() {
        cy.log(`**Select new added address from list**`);
        this.getNewAddedAddressFromList().click();
        this.getContinueButton().click();
    }
}

export default new AddressPage();