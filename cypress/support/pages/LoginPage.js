import BasePage from "./BasePage";

class LoginPage extends BasePage {
    visit() {
        cy.log('**Open login page**');
        cy.visit('/#/login')
    }

    getLoginButton() {
        return cy.get('#loginButton');
    }

    getEmailField() {
        return cy.get('#email');
    }

    getPasswordField() {
        return cy.get('#password');
    }
    
    typeTextToEmailField(email) {
        cy.log(`**Type email ${email} to Email field**`);
        this.getEmailField().type(email);
    }

    typeTextToPasswordField(password) {
        cy.log(`**Type password ${password} to Password field**`);
        this.getPasswordField().type(password);
    }

    clickOnLoginButton() {
        cy.log(`**Click on Log in button**`);
        this.getLoginButton().click();
    }

    submitLoginForm(email, password) {
        cy.log(`**Fill login form**`);
        this.typeTextToEmailField(email);
        this.typeTextToPasswordField(password);
        this.clickOnLoginButton();
    }
}

export default new LoginPage();