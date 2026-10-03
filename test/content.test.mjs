import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const publicDir=path.resolve("public");
const read=(name)=>fs.readFileSync(path.join(publicDir,name),"utf8");
const pages=[
 "index.html","about.html","founder.html","approach.html","services.html",
 "services-business-commercial-development.html","services-project-management-delivery.html",
 "services-ai-business-systems.html","services-discovery-feasibility.html","services-product-brand-development.html",
 "projects.html","projects-grid-eater.html","projects-cdip.html","contact.html"
];

test("all public pages use global shell placeholders instead of copied header/footer",()=>{
 for(const name of pages){
  const html=read(name);
  assert.ok(html.includes('<div id="site-header"></div>'),name);
  assert.ok(html.includes('<div id="site-footer"></div>'),name);
  assert.ok(!html.includes('<header class="site-header">'),name+" copied header");
  assert.ok(!html.includes('<footer class="site-footer">'),name+" copied footer");
 }
});

test("five approved service lanes are explicit and linked",()=>{
 const home=read("index.html"), services=read("services.html");
 const routes=[
  "/services/business-commercial-development",
  "/services/project-management-delivery",
  "/services/ai-business-systems",
  "/services/discovery-feasibility",
  "/services/product-brand-development"
 ];
 for(const route of routes){assert.ok(home.includes(route),route);assert.ok(services.includes(route),route);}
});

test("AI SI positioning remains future-oriented rather than a possession claim",()=>{
 const home=read("index.html").toLowerCase();
 const approach=read("approach.html").toLowerCase();
 assert.ok(home.includes("ai"));
 assert.ok(approach.includes("superintelligence (si) is a future horizon"));
 assert.ok(approach.includes("available ai tools under active human direction"));
 assert.ok(!home.includes("we have superintelligence"));
 assert.ok(!home.includes("our superintelligence"));
});

test("About uses approved founder attribution and brief GRID EATER framing",()=>{
 const about=read("about.html");
 assert.ok(about.includes("Founded by: David A. Ruck."));
 assert.ok(about.includes("https://davidaruck.com/"));
 assert.ok(about.includes("America First is behind"));
 assert.ok(!about.toLowerCase().includes("trading as grid eater"));
});

test("public pages do not leak pricing, private counterparties or held compute claims",()=>{
 const caseSensitive=["NZ$","+ GST","University of Canterbury","NDY","Enable Networks","Orion","EVD-","ACT-","MAP-","DEC-"];
 const lowerCase=["hpc access","gpu availability"];
 for(const name of pages){
  const html=read(name);
  for(const term of caseSensitive) assert.ok(!html.includes(term),name+" leaked "+term);
  const lower=html.toLowerCase();
  for(const term of lowerCase) assert.ok(!lower.includes(term),name+" leaked "+term);
 }
});

test("visual system has no CSS gradients and includes accessibility controls",()=>{
 const css=read("styles.css").toLowerCase();
 assert.ok(!css.includes("linear-gradient"));
 assert.ok(!css.includes("radial-gradient"));
 assert.ok(css.includes("prefers-reduced-motion"));
 assert.ok(css.includes("prefers-contrast"));
 assert.ok(css.includes("focus-visible"));
});

test("all illustrative images carry explicit dimensions",()=>{
 for(const name of pages){
  const html=read(name);
  for(const tag of html.matchAll(/<img\b[^>]*>/g)){
   assert.match(tag[0],/\bwidth="/,name+" image missing width");
   assert.match(tag[0],/\bheight="/,name+" image missing height");
  }
 }
});

test("metadata is present on every HTML page",()=>{
 for(const name of pages){
  const html=read(name);
  assert.match(html,/<meta name="description" content="[^"]+"/,name);
  assert.match(html,/<link rel="canonical" href="https:\/\/americafirst\.co\.nz\//,name);
  assert.match(html,/<meta property="og:title"/,name);
  assert.match(html,/<html lang="en-NZ">/,name);
 }
});

test("public HTML permits only valid non-executable structured data scripts",()=>{
 for(const name of pages){
  const html=read(name);
  const scripts=[...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)];
  assert.equal(scripts.length,1,name+" must have one schema graph");
  for(const [,attrs,body] of scripts){
   assert.equal(attrs.trim(),'type="application/ld+json"',name+" executable script");
   const schema=JSON.parse(body);
   assert.equal(schema['@context'],'https://schema.org');
   const canonical=html.match(/<link rel="canonical" href="([^"]+)"/)[1];
   const entity=schema['@graph'].find(x=>x['@id']===canonical+'#webpage');
   assert.equal(entity.url,canonical,name+" schema/canonical mismatch");
   assert.ok(read('sitemap.xml').includes('<loc>'+canonical+'</loc>'),name+" missing from sitemap");
  }
  assert.ok(!/\sstyle="/.test(html),name+" contains inline style");
 }
});


test("premium NZ robot imagery replaces flat service placeholders",()=>{
 const joined=pages.map(read).join("\n");
 assert.ok(joined.includes("/assets/hero-ai-nz.webp"));
 assert.ok(!joined.includes("/assets/hero-ai-nz.svg"));
 const css=read("styles.css");
 for(const name of ["commercial","projects","ai","feasibility","product"]){
   assert.ok(!joined.includes("/assets/service-"+name+".svg"),"flat placeholder still referenced: "+name);
   assert.ok(joined.includes("photo-"+name),"premium service scene missing: "+name);
   assert.ok(css.includes('/assets/service-'+name+'.webp'),"premium CSS asset missing: "+name);
 }
 assert.ok(!css.includes('/assets/services-ai-nz.webp'));
});
