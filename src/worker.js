const ALLOWED = new Map([
  ["/", "/index.html"],
  ["/index.html", "/index.html"],
  ["/services", "/services.html"],
  ["/services/", "/services.html"],
  ["/services.html", "/services.html"],
  ["/about", "/about.html"],
  ["/about/", "/about.html"],
  ["/about.html", "/about.html"],
  ["/styles.css", "/styles.css"],
  ["/favicon.svg", "/favicon.svg"],
  ["/robots.txt", "/robots.txt"],
]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const assetPath = ALLOWED.get(url.pathname);

    if (!assetPath) {
      return new Response(null, {
        status: 301,
        headers: {
          Location: "https://grideater.com/search",
          "Cache-Control": "public, max-age=3600"
        }
      });
    }

    const assetUrl = new URL(request.url);
    assetUrl.pathname = assetPath;
    assetUrl.search = "";

    return env.ASSETS.fetch(new Request(assetUrl, request));
  }
};
