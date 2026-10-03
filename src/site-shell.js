const NAV = [
  { href: "/", label: "Home", key: "home" },
  { href: "/services", label: "Services", key: "services" },
  { href: "/about", label: "About", key: "about" },
  { href: "/approach", label: "Our Approach", key: "approach" },
  { href: "/projects", label: "Projects", key: "projects" },
  { href: "/contact", label: "Contact", key: "contact" },
];

function activeKey(pathname) {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/services")) return "services";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/approach")) return "approach";
  if (pathname.startsWith("/projects")) return "projects";
  if (pathname.startsWith("/contact")) return "contact";
  return "";
}

export function renderHeader(pathname) {
  const current = activeKey(pathname);
  const links = NAV.map(({ href, label, key }) =>
    `<a href="${href}"${current === key ? ' aria-current="page"' : ""}>${label}</a>`
  ).join("");

  return `<header class="site-header">
    <div class="shell nav-shell">
      <a class="brand" href="/" aria-label="America First Limited home">
        <span class="brand-mark" aria-hidden="true"><i></i><i></i></span>
        <span class="brand-copy"><strong>AMERICA FIRST</strong><small>AI · BUSINESS DEVELOPMENT · PROJECT DELIVERY</small></span>
      </a>
      <nav class="navlinks" aria-label="Primary navigation">${links}</nav>
    </div>
  </header>`;
}

export function renderFooter() {
  return `<footer class="site-footer">
    <div class="shell footer-grid">
      <div class="footer-brand">
        <a class="brand" href="/" aria-label="America First Limited home">
          <span class="brand-mark" aria-hidden="true"><i></i><i></i></span>
          <span class="brand-copy"><strong>AMERICA FIRST</strong><small>AI · SYSTEMS · DELIVERY · NEW ZEALAND</small></span>
        </a>
        <p>Founder-led business development, AI systems and project delivery from Christchurch, New Zealand.</p>
      </div>
      <div><strong class="footer-title">Company</strong><a href="/about">About</a><a href="/about/david-ruck">David Ruck — The Founder</a><a href="/approach">Our Approach</a><a href="/projects">Projects</a><a href="/contact">Contact</a></div>
      <div><strong class="footer-title">Services</strong><a href="/services/business-commercial-development">Business &amp; Commercial</a><a href="/services/project-management-delivery">Project Management</a><a href="/services/ai-business-systems">AI &amp; Business Systems</a><a href="/services/discovery-feasibility">Discovery &amp; Feasibility</a><a href="/services/product-brand-development">Product &amp; Brand</a></div>
      <div><strong class="footer-title">Connect</strong><a href="mailto:david@americafirst.co.nz">david@americafirst.co.nz</a><a href="https://davidaruck.com/" rel="external">Founded by: David A. Ruck.</a><a href="https://grideater.com/" rel="external">GRID EATER ↗</a></div>
    </div>
    <div class="shell footer-base"><span>© 2026 America First Limited</span><span>Christchurch · New Zealand</span></div>
  </footer>`;
}
