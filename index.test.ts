import { http, HttpResponse } from "msw";
import { setupServer, SetupServerApi } from "msw/node";

describe("MSW redirection issue", () => {
  let server: SetupServerApi;

  beforeAll(async () => {
    server = setupServer();
    await server.listen();
  });

  afterEach(async () => {
    await server.resetHandlers();
  });

  afterAll(async () => {
    await server.close();
  });

  it("should follow redirects", async () => {
    const handler = http.get("http://thing.com", () =>
      HttpResponse.redirect("http://thing.com/redirected", 302)
    );

    const handler2 = http.get("http://thing.com/redirected", () =>
      HttpResponse.html("<html><body>Successful redirect</body></html>")
    );

    server.use(handler, handler2);

    const response = await fetch("http://thing.com", { redirect: "follow" });

    // https://developer.mozilla.org/en-US/docs/Web/API/RequestInit#redirect - should automatically follow redirects
    expect(response.status).toEqual(200);
    expect(response.text).toContain("Successful redirect");
  });
});
