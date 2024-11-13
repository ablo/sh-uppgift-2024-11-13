const express = require("express");
const app = express();
var xml = require("xml");

// respond with "hello world" when a GET request is made to the homepage
app.get("/", async (req: any, res: any) => {
  // Data: Simulerar data från radbaserad fil

  const { rowbasedDataString } = require("../modules/data");
  rowbasedDataString().then((data: string) => {
    console.log("data", data);
    res.send(`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body style="padding: 0; font-family: verdana;">
                    <h1>Radbasera data</h1>
                    <textarea readonly style="margin: 0;position: absolute; top: 100px; right: 10px; bottom: 100px; left: 10px; padding: 10px;">${data}</textarea>
                    <div style="display: flex; align-items: center; justify-content: center; position: absolute; width: 100vw; bottom: 0; height: 100px;">
                        <a href="/xml" style="background-color: lightblue; color: #000; padding: 10px 16px; border-radius: 3px; text-decoration: none;">Konvertera 🐣</a>
                    </div>
                </body>
                </html>`);
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
