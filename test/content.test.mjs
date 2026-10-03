import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const publicDir=path.resolve("public");
const read=(name)=>fs.readFileSync(path.join(publicDir,name),"utf8");

const pages=[
  "index.html","about.html","services.html","services-business-commercial-development.html",
  "projects.html","projects-grid-eater.html","projects-cdip.html","contact.html"
];

test("approved America First proposition is explicit",()=>{
  const home=read("index.html");
  const services=read("services.html");
  const detail=read("services-business-commercial-development.html");
  assert.match(home,/Business development for companies adapting to AI and change/i);
  assert.match(home,/Business &amp; Commercial Development|Business & Commercial Development/i);
  assert.match(services,/Business \/ Commercial Development/);
  assert.match(services,/Practical AI integration &amp; business operations/);
  assert.match(detail,/Turn a messy commercial problem into a clear development programme/i);
});

test("corporate navigation uses approved IA across principal pages",()=>{
  for(const name of pages){
    const html=read(name);
    assert.match(html,/href="/">Home</a>/,name);
    assert.match(html,/href="/about">Company</a>/,name);
    assert.match(html,/href="/services">Services</a>/,name);
    assert.match(html,/href="/projects">Projects</a>/,name);
    assert.match(html,/href="/contact">Contact</a>/,name);
  }
});

test("new Business and Commercial Development route is linked from the public surface",()=>{
  assert.match(read("index.html"),/href="/services/business-commercial-development"/);
  assert.match(read("services.html"),/href="/services/business-commercial-development"/);
});

test("America First pages do not duplicate GRID EATER pricing or leak held claims",()=>{
  const forbidden=/NZ$s*d|+s*GST|HPC|GPU|research computing|University of Canterbury|NDY|Enable Networks|Orion|EVD-d+|ACT-d+|MAP-d+|DEC-d+/i;
  for(const name of pages){
    assert.doesNotMatch(read(name),forbidden,name);
  }
});

test("brand and project architecture remains accurate",()=>{
  const about=read("about.html");
  const projects=read("projects.html");
  const grid=read("projects-grid-eater.html");
  const cdip=read("projects-cdip.html");
  assert.match(about,/GRID EATER/);
  assert.match(about,/feasibility-stage CDIP/i);
  assert.doesNotMatch(about,/subsidiar/i);
  assert.match(projects,/not as client case studies/i);
  assert.match(grid,/A business of America First Limited/);
  assert.match(grid,/own operating work/i);
  assert.match(cdip,/Feasibility stage means feasibility stage/i);
  assert.match(cdip,/does not imply that a final site, power allocation, fibre architecture, construction programme, customer commitment, funding package or compute capacity has already been secured/i);
});

test("GRID EATER remains the tactical digital route",()=>{
  const services=read("services.html");
  const contact=read("contact.html");
  assert.match(services,/https://grideater.com//);
  assert.match(contact,/https://grideater.com/contact/);
});

test("contact page minimises first-contact data and avoids response SLA promises",()=>{
  const contact=read("contact.html");
  assert.match(contact,/do not send passwords, API keys, payment credentials/i);
  assert.match(contact,/does not publish a fixed enquiry-response SLA/i);
});