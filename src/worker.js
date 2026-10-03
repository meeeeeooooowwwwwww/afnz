import { renderHeader, renderFooter } from "./site-shell.js";

const ROUTES = new Map([
  ["/", "/index.html"], ["/index.html", "/index.html"],
  ["/about", "/about.html"], ["/about/", "/about.html"], ["/about.html", "/about.html"],
  ["/about/david-ruck", "/founder.html"], ["/about/david-ruck/", "/founder.html"],
  ["/approach", "/approach.html"], ["/approach/", "/approach.html"], ["/approach.html", "/approach.html"],
  ["/services", "/services.html"], ["/services/", "/services.html"], ["/services.html", "/services.html"],
  ["/services/business-commercial-development", "/services-business-commercial-development.html"], ["/services/business-commercial-development/", "/services-business-commercial-development.html"],
  ["/services/project-management-delivery", "/services-project-management-delivery.html"], ["/services/project-management-delivery/", "/services-project-management-delivery.html"],
  ["/services/ai-business-systems", "/services-ai-business-systems.html"], ["/services/ai-business-systems/", "/services-ai-business-systems.html"],
  ["/services/discovery-feasibility", "/services-discovery-feasibility.html"], ["/services/discovery-feasibility/", "/services-discovery-feasibility.html"],
  ["/services/product-brand-development", "/services-product-brand-development.html"], ["/services/product-brand-development/", "/services-product-brand-development.html"],
  ["/projects", "/projects.html"], ["/projects/", "/projects.html"], ["/projects.html", "/projects.html"],
  ["/projects/grid-eater", "/projects-grid-eater.html"], ["/projects/grid-eater/", "/projects-grid-eater.html"],
  ["/projects/cdip", "/projects-cdip.html"], ["/projects/cdip/", "/projects-cdip.html"],
  ["/contact", "/contact.html"], ["/contact/", "/contact.html"], ["/contact.html", "/contact.html"],
  ["/styles.css", "/styles.css"], ["/favicon.svg", "/favicon.svg"], ["/robots.txt", "/robots.txt"], ["/sitemap.xml", "/sitemap.xml"],
]);

class ReplaceWith {
  constructor(html) { this.html = html; }
  element(element) { element.replace(this.html, { html: true }); }
}

function withHeaders(response, isAsset = false) {
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  headers.set("Content-Security-Policy", "default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self' mailto:; object-src 'none'");
  headers.set("Cache-Control", isAsset ? "public, max-age=86400, stale-while-revalidate=604800" : "public, max-age=300, must-revalidate");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.americafirst.co.nz") {
      url.hostname = "americafirst.co.nz";
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }
    if (url.pathname.startsWith("/assets/")) return withHeaders(await env.ASSETS.fetch(request), true);

    const assetPath = ROUTES.get(url.pathname);
    if (!assetPath) return new Response(null, { status: 301, headers: { Location: "https://grideater.com/search", "Cache-Control": "public, max-age=3600", "X-Content-Type-Options": "nosniff", "Referrer-Policy": "strict-origin-when-cross-origin" } });

    const assetUrl = new URL(request.url);
    assetUrl.pathname = assetPath;
    assetUrl.search = "";
    const response = await env.ASSETS.fetch(new Request(assetUrl, request));
    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("text/html")) return withHeaders(response, assetPath.endsWith(".css") || assetPath.endsWith(".svg"));

    const transformed = new HTMLRewriter()
      .on("#site-header", new ReplaceWith(renderHeader(url.pathname)))
      .on("#site-footer", new ReplaceWith(renderFooter()))
      .transform(response);

    return withHeaders(transformed, false);
  }
};
