describe("Backend API tests", () => {
  it("GET /api/auto returns 200 and array", () => {
    cy.request("GET", "/api/auto").then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an("array");
    });
  });

  it("Verify that GET kolcsonzes has token", () => {
    cy.request({
      method: "GET",
      url: "/api/kolcsonzes/auto/1",
      failOnStatusCode:false,
      body:{datum:"2026-01-05",napokszam:2}
    }).then((res) => {
      expect(res.status).to.eq(403);
    });
  });
});
