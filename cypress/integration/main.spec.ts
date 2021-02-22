describe('Home', () => {
  it('should render the home page', () => {
    cy.visit('/');
    cy.contains('Sign in');
  });

  it('should fill up login form and redirect to profile', () => {
    cy.visit('/');
    cy.findByLabelText('Login Button').click();
    cy.findByLabelText('Email address').type(Cypress.env('SHIPPER_EMAIL'));
    cy.findByLabelText('Password').type(Cypress.env('SHIPPER_PASSWORD'));
    cy.findByText('Continue').click();
    cy.findByText(`Signed in as ${Cypress.env('SHIPPER_EMAIL')}`);
    cy.findByLabelText('Logout').click();
    cy.contains('Sign in');
  });
});

export {};
