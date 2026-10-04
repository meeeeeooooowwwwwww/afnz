import test from "node:test";
import assert from "node:assert/strict";
import { unstable_startWorker } from "wrangler";

let worker;
test.before(async()=>{worker=await unstable_startWorker({config:"wrangler.toml"});});
test.after(async()=>{if(worker)await worker.dispose();});

const routes=[
 ["/","Commercial vision."],
 ["/about","Founded by: David A. Ruck."],
 ["/about/david-ruck","<h1>David Ruck</h1>"],
 ["/approach","Clear direction. Faster development."],
 ["/services","Develop the opportunity."],
 ["/services/business-commercial-development","Build the commercial case."],
 ["/services/project-management-delivery","Give ambitious projects"],
 ["/services/ai-business-systems","Put AI to work"],
 ["/services/discovery-feasibility","Know what matters"],
 ["/services/product-brand-development","Build an offer people understand"],
 ["/projects","A history of building."],
 ["/projects/grid-eater","America First is behind GRID EATER."],
 ["/projects/cdip","Developing the case for Canterbury"],
 ["/contact","Let’s put your next move into focus."]
];

for(const [route,marker] of routes){
 test("real Wrangler route serves "+route+" with global shell",async()=>{
  const response=await worker.fetch("https://americafirst.co.nz"+route);
  assert.equal(response.status,200);
  assert.equal(response.redirected,false);
  assert.match(response.headers.get("content-security-policy")||"",/default-src 'self'/);
  assert.equal(response.headers.get("x-content-type-options"),"nosniff");
  const body=await response.text();
  assert.ok(body.includes(marker));
  assert.ok(body.includes("<header"));
  assert.ok(body.includes("<footer"));
  assert.ok(body.includes("AMERICA FIRST"));
  assert.ok(body.includes("AI · BUSINESS DEVELOPMENT · PROJECT DELIVERY"));
  assert.ok(body.includes("Founded by: David A. Ruck."));
  assert.ok(body.includes('/favicon.ico'));
  assert.ok(body.includes('/favicon.svg'));
  assert.ok(body.includes('/apple-touch-icon.png'));
  assert.ok(body.includes('/site.webmanifest'));
  assert.ok(!body.includes('id="site-header"'));
  assert.ok(!body.includes('id="site-footer"'));
 });
}

test("illustrative assets are served locally",async()=>{
 for(const asset of ["/assets/hero-ai-nz.webp","/assets/service-commercial.webp","/assets/service-projects.webp","/assets/service-ai.webp","/assets/service-feasibility.webp","/assets/service-product.webp","/assets/tech-grid.svg","/assets/tech-nodes.svg"]){
  const response=await worker.fetch("https://americafirst.co.nz"+asset);
  assert.equal(response.status,200,asset);
  assert.match(response.headers.get("cache-control")||"",/max-age=86400/);
 }
});

test("legacy paths still redirect to GRID EATER search",async()=>{
 const response=await worker.fetch("https://americafirst.co.nz/business/legacy?old=1",{redirect:"manual"});
 assert.equal(response.status,301);
 assert.equal(response.headers.get("location"),"https://grideater.com/search");
});



test("global navigation active state follows the current route",async()=>{
 const response=await worker.fetch("https://americafirst.co.nz/services/ai-business-systems");
 const body=await response.text();
 assert.ok(body.includes('<a href="/services" aria-current="page">Services</a>'));
 assert.ok(!body.includes('<a href="/about" aria-current="page">About</a>'));
});


test("premium service artwork uses individual local assets rather than the retired sprite",async()=>{
 const cssResponse=await worker.fetch("https://americafirst.co.nz/styles.css");
 const css=await cssResponse.text();
 for(const name of ["service-commercial.webp","service-projects.webp","service-ai.webp","service-feasibility.webp","service-product.webp"]){
  assert.ok(css.includes("/assets/"+name),name);
 }
 assert.ok(!css.includes("services-ai-nz.webp"));
});

test("complete favicon set is served as cacheable local assets",async()=>{
 for(const asset of ["/favicon.ico","/favicon.svg","/favicon-16x16.png","/favicon-32x32.png","/favicon-48x48.png","/apple-touch-icon.png","/android-chrome-192x192.png","/android-chrome-512x512.png","/mstile-150x150.png","/site.webmanifest","/browserconfig.xml"]){
  const response=await worker.fetch("https://americafirst.co.nz"+asset);
  assert.equal(response.status,200,asset);
  assert.match(response.headers.get("cache-control")||"",/max-age=86400/,asset);
 }
});
