describe("Blog app", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Jesús",
      username: "root",
      password: "root",
    };
    cy.request("POST", "http://localhost:3000/api/users", user);
    cy.visit("http://localhost:3000");
  });
  it("login form is shown", () => {
    cy.contains("Log in");
  });
  describe("login", function () {
    it("login success with right credentials", function () {
      cy.contains("Log in").click();
      cy.get("#username").type("root");
      cy.get("#password").type("root");
      cy.get("#login-button").click();

      cy.contains("Jesús logged in -");
    });
    it("login failed with wrong credentials", function () {
      cy.contains("Log in").click();
      cy.get("#username").type("root");
      cy.get("#password").type("wrongroot");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");
    });
  });
});
