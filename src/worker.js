const ALLOWED = new Map([
  ["/", "/index.html"],
  ["/index.html", "/index.html"],
  ["/about", "/about.html"],
  ["/about/", "/about.html"],
  ["/about.html", "/about.html"],
  ["/projects", "/projects.html"],
  ["/projects/", "/projects.html"],
  ["/projects.html", "/projects.html"],
  ["/projects/grid-eater", "/projects-grid-eater.html"],
  ["/projects/grid-eater/", "/projects-grid-eater.html"],
  ["/projects/cdip", "/projects-cdip.html"],
  ["/projects/cdip/", "/projects-cdip.html"],
  ["/services", "/services.html"],
  ["/services/", "/services.html"],
  ["/services.html", "/services.html"],
  ["/services/business-commercial-development", "/services-business-commercial-development.html"],
  ["/services/business-commercial-development/", "/services-business-commercial-development.html"],
  ["/services-business-commercial-development.html", "/services-business-commercial-development.html"],
  ["/contact", "/contact.html"],
  ["/contact/", "/contact.html"],
  ["/contact.html", "/contact.html"],
  ["/styles.css", "/styles.css"],
  ["/favicon.svg", "/favicon.svg"],
  ["/robots.txt", "/robots.txt"],
  ["/sitemap.xml", "/sitemap.xml"],
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