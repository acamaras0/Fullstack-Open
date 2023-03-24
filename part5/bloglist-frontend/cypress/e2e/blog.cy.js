describe("Blog", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "rootie",
      username: "root",
      password: "secret",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("http://localhost:3000");
  });

  it("front page can be open", function () {
    cy.contains("blogs");
    cy.contains("log in");
  });

  it("login form can be opened", function () {
    cy.contains("log in").click();
  });

  it("succeeds with correct credentials", function () {
    cy.get("#username").type("root");
    cy.get("#password").type("secret");
    cy.get("#login-button").click();
    cy.contains("Logged in as root.");
  });

  it("fails with wrong credentials", function () {
    cy.get("#username").type("root");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();
    cy.contains("wrong username or password");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("root");
      cy.get("#password").type("secret");
      cy.get("#login-button").click();
    });

    it("a new blog can be created", function () {
      cy.contains("New blog").click();
      cy.get("#title").type("a blog created by cypress");
      cy.get("#author").type("cypress");
      cy.get("#url").type("cypress.com");
      cy.get("#create-button").click();
      cy.contains("a blog created by cypress");
    });

    it("a blog can be liked", function () {
      cy.contains("New blog").click();
      cy.get("#title").type("a blog created by cypress");
      cy.get("#author").type("cypress");
      cy.get("#url").type("cypress.com");
      cy.get("#create-button").click();
      cy.contains("view").click();
      cy.contains("like").click();
      cy.contains("1 like");
    });

    it("a blog can be deleted", function () {
      cy.contains("New blog").click();
      cy.get("#title").type("a blog created by cypress");
      cy.get("#author").type("cypress");
      cy.get("#url").type("cypress.com");
      cy.get("#create-button").click();
      cy.contains("view").click();
      cy.contains("remove").click();
      cy.contains("a blog created by cypress").should("not.exist");
    });

    it("blogs are ordered by likes", function () {
      cy.contains("New blog").click();
      cy.get("#title").type("a blog created by cypress");
      cy.get("#author").type("cypress");
      cy.get("#url").type("cypress.com");
      cy.get("#create-button").click();
      cy.contains("view").click();
      cy.contains("like").click();
      cy.get("#title").type("a blog created by cypress 2");
      cy.get("#author").type("cypress");
      cy.get("#url").type("cypress.com");
      cy.get("#create-button").click();
      cy.contains("view").click();
      cy.contains("like").click();
      cy.contains("like").click();
      cy.get("[data-cy=blog]").then((blogs) => {
        const likes = blogs.map((i, el) => {
          return Cypress.$(el).find("[data-cy=likes]").text();
        });
        const sortedLikes = [...likes].sort((a, b) => b - a);
        expect(likes.get()).to.deep.equal(sortedLikes);
      });
    });
  });
});
