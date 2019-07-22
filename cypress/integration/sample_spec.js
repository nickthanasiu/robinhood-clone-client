describe('My First Test', () => {
    it('clicking "Not a user? Sign up here" navigates to a new url "/signup"', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Not a user? Sign up here').click();
        cy.url().should('include', '/signup');
    });
});