import test from "node:test";
import assert from "node:assert/strict";
import { unstable_startWorker } from "wrangler";

let worker;
test.before(async()=>{worker=await unstable_startWorker({config:"wrangler.toml"});});
test.after(async()=>{if(worker)await worker.dispose();});

const routes=[
 ["/","Turning opportunity into"],
 ["/about","Founded by: David A. Ruck."],
 ["/approach","Evidence first."],
 ["/services","Five service families"],
 ["/services/business-commercial-development","Turn a messy commercial problem"],
 ["/services/project-management-delivery","Give complicated work structure"],
 ["/services/ai-business-systems","Use AI where it improves"],
 ["/services/discovery-feasibility","Make the important decision"],
 ["/services/product-brand-development","Build the proposition"],
 ["/projects","Our own operating and development work."],
 ["/projects/grid-eater","America First is behind GRID EATER."],
 ["/projects/cdip","Feasibility before commitment."],
 ["/contact","Start with what you are trying to solve."]
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
  assert.ok(!body.includes('id="site-header"'));
  assert.ok(!body.includes('id="site-footer"'));
 });
}

test("illustrative assets are served locally",async()=>{
 for(const asset of ["/assets/hero-ai-nz.svg","/assets/service-commercial.svg","/assets/service-projects.svg","/assets/service-ai.svg","/assets/service-feasibility.svg","/assets/service-product.svg","/assets/tech-grid.svg","/assets/tech-nodes.svg"]){
  const response=await worker.fetch("https://americafirst.co.nz"+asset);
  assert.equal(response.status,200,asset);
  assert.match(response.headers.get("cache-control")||"",/max-age=86400/);
 }
});

test("legacy paths still redirect to GRID EATER search",async()=>{
 const response=await worker.fetch("https://americafirst.co.nz/business/legacy?old=1");
 assert.equal(response.status,301);
 assert.equal(response.headers.get("location"),"https://grideater.com/search");
});

test("global navigation active state follows the current route",async()=>{
 const response=await worker.fetch("https://americafirst.co.nz/services/ai-business-systems");
 const body=await response.text();
 assert.ok(body.includes('<a href="/services" aria-current="page">Services</a>'));
 assert.ok(!body.includes('<a href="/about" aria-current="page">About</a>'));
});
