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

/*
Cypress parancsok (cy. után használhatóak):

1️ Backend / API tesztelés:
- cy.request(url)                             → Egyszerű GET kérés
- cy.request(method, url, body)               → GET/POST/PUT/DELETE + body
- cy.request({ method, url, body, headers, failOnStatusCode }) → Objektumos, rugalmas request
- cy.intercept(url | options, handler)        → API hívás elkapása, mockolása vagy stubolása
- cy.wait(ms)                                 → Fix idő várakozás
- cy.wait("@alias")                            → Várakozás egy aliasolt request-re
- cy.as("alias")                               → Alias létrehozása (request vagy más objektum)
- cy.get("@alias")                             → Alias lekérése a tesztben

2️ DOM / UI tesztelés:
- cy.get(selector)                             → Elem kiválasztása CSS selectorral
- cy.contains(text)                            → Elem kiválasztása szöveg alapján
- cy.click()                                   → Kattintás
- cy.type("text")                              → Szöveg beírása input mezőbe
- cy.select(value)                             → Legördülő kiválasztása
- cy.check() / cy.uncheck()                    → Checkbox kezelése
- cy.should(assertion)                         → Assertion (ellenőrzés)
- cy.find(selector)                            → Kiválasztás a már kiválasztott elemhez
- cy.parent(), cy.children()                   → DOM navigáció

3️ Teszt kontroll / láncolás:
- cy.wrap(value)                               → Bármilyen érték Cypress láncba csomagolása
- cy.log("message")                            → Teszt logolása
- cy.then(callback)                            → Láncolt callback futtatása
- cy.each(callback)                            → Iteráció egy listán

4 Környezet / állapot:
- cy.viewport(width, height)                   → Ablakméret beállítása UI teszthez
- cy.clearCookies()                            → Cookie-k törlése
- cy.clearLocalStorage()                       → LocalStorage törlése
- cy.reload()                                  → Oldal újratöltése
- cy.visit(url)                                → Oldal betöltése frontend tesztnél
- cy.session(name, callback)                   → Session létrehozása (login tárolása)

5️ Assertion helper-ek (Chai + jQuery):
- expect(value).to.eq(val)                     → Érték egyenlő
- expect(value).to.be.an("array")             → Típus ellenőrzés
- expect(value).to.have.property("key")       → Objektum property ellenőrzése
- expect(value).to.include(member)            → Tartalmazás ellenőrzés
- expect(value).to.be.true / false            → Boolean ellenőrzés
- expect(value).to.have.length(n)             → Array hossz ellenőrzés

 Tipp:
- Backend teszteknél a `cy.request()` + `failOnStatusCode:false` a legfontosabb
- UI teszteknél a `cy.get()`, `cy.click()`, `cy.type()`, `cy.should()` használatos
- Aliasokat (`as()`) és `wait("@alias")`-t érdemes a komplexebb API teszteknél használni
*/