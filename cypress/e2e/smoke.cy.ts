describe('Smoke Test', () => {
    it('successfully loads the homepage', () => {
        cy.visit('/');
        // Check for the presence of the main element or a key header to confirm load
        cy.get('body').should('be.visible');
    });
});
