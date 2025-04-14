/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      registerTestUser(): Chainable<Subject>;
      loginTestUser(): Chainable<Subject>;
    }
  }
}

Cypress.Commands.add("registerTestUser", () => {
  cy.fixture("testUser").then((user) => {
    cy.request("POST", "http://localhost:5000/register", user); // Fixed endpoint
  });
});

Cypress.Commands.add("loginTestUser", () => {
  cy.fixture("testUser").then((user) => {
    cy.visit("/login");
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('button[type="submit"]').click(); // Fixed form submission
  });
});

export {};
