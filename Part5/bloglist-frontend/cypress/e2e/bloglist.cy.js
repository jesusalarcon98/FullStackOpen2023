describe("Blog app", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3000/api/testing/reset");
    cy.visit("http://localhost:3000");
  });
  it("login form is shown", () => {
    cy.contains("Log in");
  });
});
