import test from "node:test";
import assert from "node:assert/strict";
import worker from "../src/worker.js";

const env={
  ASSETS:{
    async fetch(request){
      return new Response(new URL(request.url).pathname,{status:200});
    }
  }
};

test("legacy directory paths permanently redirect to GRID EATER search", async()=>{
  const response=await worker.fetch(new Request("https://americafirst.co.nz/business/some-old-company"),env);
  assert.equal(response.status,301);
  assert.equal(response.headers.get("location"),"https://grideater.com/search");
});

test("legacy query strings are not forwarded", async()=>{
  const response=await worker.fetch(new Request("https://americafirst.co.nz/directory?category=old"),env);
  assert.equal(response.status,301);
  assert.equal(response.headers.get("location"),"https://grideater.com/search");
});

for (const [route, asset] of [
  ["/", "/index.html"],
  ["/about", "/about.html"],
  ["/projects", "/projects.html"],
  ["/projects/grid-eater", "/projects-grid-eater.html"],
  ["/projects/cdip", "/projects-cdip.html"],
  ["/services", "/services.html"],
  ["/services/business-commercial-development", "/services-business-commercial-development.html"],
  ["/contact", "/contact.html"],
]) {
  test(route+" remains local", async()=>{
    const response=await worker.fetch(new Request("https://americafirst.co.nz"+route),env);
    assert.equal(response.status,200);
    assert.equal(await response.text(),asset);
  });
}

test("sitemap remains local", async()=>{
  const response=await worker.fetch(new Request("https://americafirst.co.nz/sitemap.xml"),env);
  assert.equal(response.status,200);
  assert.equal(await response.text(),"/sitemap.xml");
});