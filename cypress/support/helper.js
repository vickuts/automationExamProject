export function searchProductOnMainPage(productName) {
    cy.get('body').then(body => {
        if (body.find(`img[alt*="${productName}"]`).length > 0) {
            return cy.get(`img[alt*="${productName}"]`);
        } else {
            cy.get('[aria-label="Next page"]').click();
            searchProductOnMainPage(productName);
        }
    })
}