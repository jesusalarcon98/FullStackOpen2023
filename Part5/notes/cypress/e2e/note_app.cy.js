describe("Note app", () => {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    /* http://localhost:5173/api/testing/reset */
    const user = {
      name: "Jesús Alarcón",
      username: "root",
      password: "root",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
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

    describe("and a(severals) note exists", function () {
      beforeEach(function () {
        cy.createNote({
          content: "first note",
          important: false,
        });
        cy.createNote({
          content: "second note",
          important: false,
        });
        cy.createNote({
          content: "third note",
          important: false,
        });
      });

      it("it can be made important", function () {
        cy.contains("third note").contains("make important").click();

        cy.contains("third note").contains("make not important");
      });

      it("one of those can be made important", function () {
        cy.contains("second note").contains("make important").click();
        cy.contains("second note").contains("make not important").click();
      });

      it("other of those can be made important", function () {
        cy.contains("second note").parent().find("button").as("theButton");
        cy.get("@theButton").click({ multiple: true });
        cy.get("@theButton").should("contain", "make not important");
      });
    });
  });
});
