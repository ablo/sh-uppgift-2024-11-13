const express = require("express");
const app = express();
var xml = require("xml");
const path = require("path");

import { Eta } from "eta";



// respond with "hello world" when a GET request is made to the homepage
app.get("/", async (req: any, res: any) => {
  // Data: Simulerar data från radbaserad fil
  const eta = new Eta({ views: path.join(__dirname, "templates") })
  const { rowbasedDataString } = require("../modules/data");
  rowbasedDataString().then((data: string) => {
    console.log("data", data);
    const page = eta.render("./form.eta", { data });
    res.send(page);
    return data;
  });
});

app.get("/xml", (req: any, res: any) => {
  // Data: Simulerar data från radbaserad fil
  const { rowbasedDataString } = require("../modules/data");

  // Funktioner för att konvertera data från radbaserad fil till JSON
  const { alt1AsJSON, alt1AsXML } = require("../modules/convert");

  // Alternativ 1:
  // Bygg struktur med loop (OBS! kräver en spikad struktur i filen)
  rowbasedDataString()
    .then((data: string) => {
      const xmldata = alt1AsXML(data);
      res.type("application/xml");
      res.send(xmldata);
    })
    .catch((error: any) => console.error(error));
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
