import BasePage from "./BasePage";

class ContactPage extends BasePage {
    visit() {
        cy.log('**Open contact page**');
        cy.visit('/#/contact')
    }

    getCommentTextArea() {
        return cy.get('#comment');
    }

    getRatingSlider() {
        return cy.get('#rating');
    }

    getCaptchaCode() {
        return cy.get('#captcha');
    }

    getCaptchaResultField() {
        return cy.get('#captchaControl');
    }

    getSubmitButton() {
        return cy.get('#submitButton');
    }

    getFeedbackToast() {
        return cy.get('.mat-simple-snack-bar-content');
    }

    typeTextToCommentTextArea(comment) {
        cy.log(`**Type comment ${comment} to Comment text area**`);
        this.getCommentTextArea().type(comment);
    }

    moveSliderToValue(rate) {
        cy.log(`**Move Rating slider to value ${rate}**`);
        this.getRatingSlider().invoke('val', 3).trigger('change').click( {force: true} );
    }

    typeCaptchaValueToResultField() {
        cy.log(`**Type calculated captcha value to Result field**`);
        this.getCaptchaCode().invoke('text').then((res) => {
            this.getCaptchaResultField().type(eval(res));
        })
    }

    clickOnSubmitButton() {
        cy.log(`**Click on Submit button**`);
        this.getSubmitButton().click();
    }
}

export default new ContactPage();