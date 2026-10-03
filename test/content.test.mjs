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
  assert.ok(home.includes("Business development for companies adapting to AI and change."));
  assert.ok(home.includes("Business &amp; Commercial Development") || home.includes("Business & Commercial Development"));
  assert.ok(services.includes("Business / Commercial Development"));
  assert.ok(services.includes("Practical AI integration & business operations"));
  assert.ok(detail.includes("Turn a messy commercial problem into a clear development programme."));
});

test("corporate navigation uses approved IA across principal pages",()=>{
  const links=[
    'href="/">Home</a>',
    'href="/about">Company</a>',
    'href="/services">Services</a>',
    'href="/projects">Projects</a>',
    'href="/contact">Contact</a>'
  ];
  for(const name of pages){
    const html=read(name);
    for(const link of links) assert.ok(html.includes(link),name+" missing "+link);
  }
});

test("new Business and Commercial Development route is linked from the public surface",()=>{
  const link='href="/services/business-commercial-development"';
  assert.ok(read("index.html").includes(link));
  assert.ok(read("services.html").includes(link));
});

test("America First pages do not duplicate GRID EATER pricing or leak held claims",()=>{
  const forbidden=[
    "NZ$","+ GST","HPC","GPU","research computing","University of Canterbury",
    "NDY","Enable Networks","Orion","EVD-","ACT-","MAP-","DEC-"
  ];
  for(const name of pages){
    const html=read(name).toLowerCase();
    for(const term of forbidden){
      assert.ok(!html.includes(term.toLowerCase()),name+" leaked forbidden term: "+term);
    }
  }
});

test("brand and project architecture remains accurate",()=>{
  const about=read("about.html");
  const projects=read("projects.html");
  const grid=read("projects-grid-eater.html");
  const cdip=read("projects-cdip.html");
  assert.ok(about.includes("GRID EATER"));
  assert.ok(about.toLowerCase().includes("feasibility-stage cdip"));
  assert.ok(!about.toLowerCase().includes("subsidiar"));
  assert.ok(projects.includes("not as client case studies"));
  assert.ok(grid.includes("A business of America First Limited"));
  assert.ok(grid.includes("own operating work"));
  assert.ok(cdip.includes("Feasibility stage means feasibility stage."));
  assert.ok(cdip.includes("does not imply that a final site, power allocation, fibre architecture, construction programme, customer commitment, funding package or compute capacity has already been secured"));
});

test("GRID EATER remains the tactical digital route",()=>{
  const services=read("services.html");
  const contact=read("contact.html");
  assert.ok(services.includes("https://grideater.com/"));
  assert.ok(contact.includes("https://grideater.com/contact"));
});

test("contact page minimises first-contact data and avoids response SLA promises",()=>{
  const contact=read("contact.html").toLowerCase();
  assert.ok(contact.includes("do not send passwords, api keys, payment credentials"));
  assert.ok(contact.includes("does not publish a fixed enquiry-response sla"));
});