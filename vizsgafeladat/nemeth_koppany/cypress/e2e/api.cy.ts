describe("Backend API tests", () => {

  it("GET /api/auto returns 200 and array", () => {
    cy.request("GET", "/api/auto").then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.be.an("array")
    })
  })

})
