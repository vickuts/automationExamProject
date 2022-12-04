export default class BasePage {
    getSearchField() {
        return cy.get('#searchQuery').click().get('#mat-input-0');
    }

    performSearch(searchQuery){
        cy.log(`**Perform search with search query ${searchQuery}**`)
        this.getSearchField().type(searchQuery);
    }
}