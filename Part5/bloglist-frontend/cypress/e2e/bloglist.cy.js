describe("Blog app", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3000/api/testing/reset");
    const user = {
      name: "Jesús",
      username: "root",
      password: "root",
    };

    const userfake = {
      name: "JesúsFalso",
      username: "falso",
      password: "falso",
    };
    cy.request("POST", "http://localhost:3000/api/users", user);
    cy.request("POST", "http://localhost:3000/api/users", userfake);
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

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "root", password: "root" });
    });

    it("A blog can be created", function () {
      cy.contains("New Blog").click();
      cy.get("#title").type("new blog in the website");
      cy.get("#author").type("Jesús Alarcón");
      cy.get("#url").type("http://localhost:3000/");
      cy.contains("save").click();
      cy.contains("a new blog new blog in the website by Jesús Alarcón added");
    });

    describe("add three blogs", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "first blog",
          author: "jesus",
          url: "google.com",
        });
        cy.createBlog({
          title: "second blog",
          author: "jesus",
          url: "google.com",
        });
        cy.createBlog({
          title: "third blog",
          author: "jesus",
          url: "google.com",
        });
      });

      it("like a blog", function () {
        cy.contains("third blog").contains("View").click();
        cy.contains("third blog")
          .parent()
          .find("button:contains('Like')")
          .click();
      });

      it("delete a blog", function () {
        cy.contains("second blog").contains("View").click();
        cy.contains("second blog")
          .parent()
          .find("button:contains('remove')")
          .click();
      });
    });

    describe("when there are more than one users", function () {
      beforeEach(function () {
        cy.contains("Log out").click();

        cy.get("#username").type("falso");
        cy.get("#password").type("falso");
        cy.get("#login-button").click();
        cy.contains("JesúsFalso logged in -");
      });

      it("only user who created the blog can delete it", function () {
        cy.contains("New Blog").click();
        cy.get("#title").type("fourth blog");
        cy.get("#author").type("Jesús Alarcón");
        cy.get("#url").type("google.com");
        cy.contains("save").click();
        cy.contains("a new blog fourth blog by Jesús Alarcón added");

        cy.contains("Log out").click();
        cy.get("#username").type("root");
        cy.get("#password").type("root");
        cy.get("#login-button").click();
        cy.contains("Jesús logged in -");
        cy.wait(5000);

        cy.contains("fourth blog").contains("View").click();
        cy.contains("fourth blog")
          .parent()
          .find("button:contains('remove')")
          .click();
        cy.contains("unauthorized access");
      });

      it.only("blogs ordered by likes", function () {
        cy.contains("New Blog").click();
        cy.get("#title").type("blog with no likes");
        cy.get("#author").type("Jesús Alarcón");
        cy.get("#url").type("google.com");
        cy.contains("save").click();
        cy.contains("a new blog blog with no likes by Jesús Alarcón added");

        /* cy.contains("New Blog").click(); */
        cy.get("#title").type("blog with one like");
        cy.get("#author").type("Jesús Alarcón");
        cy.get("#url").type("google.com");
        cy.contains("save").click();
        cy.contains("a new blog blog with one like by Jesús Alarcón added");

        cy.contains("blog with one like").contains("View").click();
        cy.contains("blog with one like")
          .parent()
          .find("button:contains('Like')")
          .click();

        cy.get(".blog").eq(0).should("contain", "blog with one like");
        cy.get(".blog").eq(1).should("contain", "blog with no likes");
      });
    });
  });
});
