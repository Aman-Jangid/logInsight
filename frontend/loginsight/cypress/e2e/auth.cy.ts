// cypress/e2e/auth.cy.ts

import { faker } from "@faker-js/faker";
// generate random user
const randomUser = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

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

  it("should register a user via UI", () => {
    cy.get('input[name="name"]').type(randomUser.name);
    cy.get('input[name="email"]').type(randomUser.email);
    cy.get('input[name="password"]').type(randomUser.password);
    cy.get("form").submit();

    // cy.url().should("include", "/login");
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Account created successfully!");
    });
  });

  // TODO : Add more tests for validation errors, etc.
});

describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("should show the login form", () => {
    cy.get("form").should("exist");
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");
  });

  it("should login a user", () => {
    cy.get('input[name="email"]').type(randomUser.email);
    cy.get('input[name="password"]').type(randomUser.password);
    cy.get("form").submit();

    // Check for page redirection or alert message
    cy.url().should("include", "/dashboard");
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Login successful!");
    });
  });
});
