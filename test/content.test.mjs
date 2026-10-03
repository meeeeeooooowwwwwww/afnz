import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const publicDir=path.resolve("public");
const read=(name)=>fs.readFileSync(path.join(publicDir,name),"utf8");

test("corporate capabilities are explicit and route commercial digital work to GRID EATER",()=>{
  const home=read("index.html");
  const services=read("services.html");
  assert.match(home,/Brand and technology capability/);
  assert.match(home,/Data, AI &amp; automation/);
  assert.match(services,/Digital agency capability/);
  assert.match(services,/Branding &amp; digital presence/);
  assert.match(services,/AI &amp; automation/);
  assert.match(services,/https:\/\/grideater\.com\//);
  assert.match(services,/https:\/\/grideater\.com\/contact/);
});

test("America First corporate pages do not duplicate GRID EATER product pricing",()=>{
  for(const name of fs.readdirSync(publicDir).filter(name=>name.endsWith(".html"))){
    const html=read(name);
    assert.doesNotMatch(html,/NZ\$\s*\d|\+\s*GST|Website Starter\s+NZ\$/i, name);
  }
});

test("brand architecture remains accurate",()=>{
  const about=read("about.html");
  const grid=read("projects-grid-eater.html");
  const cdip=read("projects-cdip.html");
  assert.match(about,/GRID EATER is the customer-facing digital business/i);
  assert.match(grid,/A business of America First Limited/);
  assert.match(cdip,/feasibility stage/i);
  assert.doesNotMatch(about,/subsidiar/i);
});

test("corporate navigation exposes Capabilities across principal pages",()=>{
  for(const name of ["index.html","about.html","projects.html","projects-grid-eater.html","projects-cdip.html","services.html","contact.html"]){
    assert.match(read(name),/href="\/services">Capabilities<\/a>/, name);
  }
});
