// cypress/e2e/registration.cy.ts

describe("Registration Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/register");
  });

  it("should show the registration form", () => {
    cy.get("form").should("exist");
    cy.get('input[name="name"]').should("exist");
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");
  });

  it("should register a user", () => {
    const randomEmail = `user${Date.now()}@test.com`;

    cy.get('input[name="name"]').type("Test User");
    cy.get('input[name="email"]').type(randomEmail);
    cy.get('input[name="password"]').type("password123");

    cy.get("form").submit();

    // Check for page redirection or alert message
    cy.url().should("include", "/login");
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Account created successfully!");
    });
  });

  // TODO : Add more tests for validation errors, etc.
});
