import BasePage from "./BasePage";

class BasketPage extends BasePage {
    visit() {
        cy.log('**Open basket page**');
        cy.visit('/#/basket')
    }

    getProductName() {
        return cy.get('.mat-cell.cdk-cell.cdk-column-product');
    }

    getQuantityOfProducts() {
        return cy.get('[style="font-size: initial;"]');
    }

    getCheckoutButton() {
        return cy.get('#checkoutButton');
    }

    clickOnCheckoutButton() {
        cy.log(`**Click on Checkout button**`);
        this.getCheckoutButton().click();
    }
}

export default new BasketPage();