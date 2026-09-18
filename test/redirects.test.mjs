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

test("corporate pages remain local", async()=>{
  const response=await worker.fetch(new Request("https://americafirst.co.nz/services"),env);
  assert.equal(response.status,200);
  assert.equal(await response.text(),"/services.html");
});

test("sitemap remains local", async()=>{
  const response=await worker.fetch(new Request("https://americafirst.co.nz/sitemap.xml"),env);
  assert.equal(response.status,200);
  assert.equal(await response.text(),"/sitemap.xml");
});
