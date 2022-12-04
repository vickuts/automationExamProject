import BasePage from "./BasePage";

class RegistrationPage extends BasePage {
    visit() {
        cy.log('**Open registration page**');
        cy.visit('/#/register')
    }

    getEmailField() {
        return cy.get('#emailControl');
    }

    getPasswordField() {
        return cy.get('#passwordControl');
    }

    getRepeatPasswordField() {
        return cy.get('#repeatPasswordControl');
    }

    getSecurityQuestionDropdown() {
        return cy.get('[name=securityQuestion]');
    }

    getSecurityQuestionInDropdown(question) {
        return cy.get(`span:contains(" ${question} ")`);
    }

    getAnswerField() {
        return cy.get('#securityAnswerControl');
    }

    getRegisterButton() {
        return cy.get('button[id=registerButton]');
    }

    getFeedbackToast() {
        return cy.get('.mat-simple-snack-bar-content');
        mat-simple-snack-bar-content
    }
    
    typeTextToEmailField(email) {
        cy.log(`**Type email ${email} to Email field**`);
        this.getEmailField().type(email);
    }

    typeTextToPasswordField(password) {
        cy.log(`**Type password ${password} to Password field**`);
        this.getPasswordField().type(password);
    }

    typeTextToRepeatPasswordField(password) {
        cy.log(`**Type password ${password} to Repeat Password field**`);
        this.getRepeatPasswordField().type(password);
    }

    selectSecurityQuestionInDropdown(question) {
        cy.log(`**Select '${question}' as security question in dropdown**`);
        this.getSecurityQuestionDropdown().click();
        this.getSecurityQuestionInDropdown(question).click();
    }

    typeTextToAnswerField(answer) {
        cy.log(`**Type answer '${answer}' to Answer field**`);
        this.getAnswerField().type(answer);
    }

    clickOnRegisterButton() {
        cy.log(`**Click on Register button**`);
        this.getRegisterButton().click();
    }
}

export default new RegistrationPage();