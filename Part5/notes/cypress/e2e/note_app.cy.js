describe("Note app", () => {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Jesús Alarcón",
      username: "root",
      password: "root",
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit("http://localhost:5173/");
  });

  it("front page can be opened", () => {
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, University of Helsinki 2023"
    );
  });

  it("login form can be opened", function () {
    cy.contains("log in").click();
  });

  it("user can login", function () {
    cy.contains("log in").click();
    cy.get("#username").type("root");
    cy.get("#password").type("root");
    cy.get("#login-button").click();
    cy.contains("Jesús Alarcón logged in");
  });

  it("login fails with wrong password", function () {
    cy.contains("log in").click();
    cy.get("#username").type("root");
    cy.get("#password").type("wrongPassword");
    cy.get("#login-button").click();

    /*   cy.contains("Wrong credentials"); */
    /* cy.get(".error").contains("Wrong credentials"); */
    cy.get(".error")
      .should("contain", "Wrong credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");

    cy.get("html").should("not.contain", "Jesús Alarcón logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "root", password: "root" });
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("#inputNote").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });

    describe("and a note exists", function () {
      beforeEach(function () {
        cy.createNote({
          content: "another note cypress",
          important: false,
        });
      });

      it("it can be made important", function () {
        cy.contains("another note cypress").contains("make important").click();

        cy.contains("another note cypress").contains("make not important");
      });
    });
  });
});
