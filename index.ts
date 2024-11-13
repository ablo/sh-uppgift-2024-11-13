const fs = require('node:fs');

// Data: Simulerar data från radbaserad fil
const { rowbasedDataString } = require("./data");

// Funktioner för att konvertera data från radbaserad fil till JSON
const { alt1AsJSON, alt1AsXML } = require("./convert");

const writeFile = (data: string) => {
  const unixtime = Math.floor(Date.now() / 1000)
  const file = `./data/alt1-${unixtime}.xml`
  try {
    fs.writeFileSync(file, data);
    console.log(`File written successfully to [${file}]`);
  } catch (error) {
    console.log('error', error)
  }
}

// Alternativ 1:
// Bygg struktur med loop (OBS! kräver en spikad struktur i filen)
rowbasedDataString().then((data: string) => {
  const xml = alt1AsXML(data);
  writeFile(xml);
})
.catch((error: any) => console.error(error));
