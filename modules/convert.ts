// Konvertera json till xml
const json2xml = require("json2xml");

// Funktion för att konvertera data från radbaserad fil till JSON
export const alt1AsJSON = (data: string): People[] => {
  const rows = data.split("\n");

  const people: People[] = [];

  rows.forEach((row, index) => {
    const isPerson = row.startsWith("P|");
    if (isPerson) {
      const personData = row.split("|");
      // Get data following person index
      var personIndex = index
      var nextPersonIndex = rows.findIndex((_row, i) => i > index && _row.startsWith("P|"));
      const rest = rows.slice(index + 1, nextPersonIndex != -1 ? nextPersonIndex : rows.length);
      const familyIndex = rest.findIndex((row) => row.startsWith("F|"));
      const data = rest.slice(0, familyIndex != -1 ? familyIndex : rest.length); // Make sure we we check data to the end even if wwe have no family
      const phone = data.find((_row) => _row.startsWith("T|"));
      const address = data.find((_row) => _row.startsWith("A|"));
      let person: Person = {
        firstname: personData[1],
        lastname: personData[2],
        address: {
          street: address?.split("|")[1] || "",
          city: address?.split("|")[2] || "",
          zip: address?.split("|")[3] || "",
        },
        phone: {
          mobile: phone?.split("|")[1] || "",
          landline: phone?.split("|")[2] || "",
        },
        family: [],
      };
      const family = rest.filter((_row) => _row.startsWith("F|"));
      console.log('family', family)
      family.forEach((familyRow, i) => { // Looop through family members
        console.log('nextPersonIndex', nextPersonIndex)
        const familyData = familyRow.split("|"); // Extract family data
        const familyPersonIndex = rest.findIndex((_row, idx) => {
          return _row.startsWith(`F|${familyData[1]}`)
        }); // Index for family row
        const hasMoreFamilyMembers = family.length > i + 1;
        const nextFamilyPersonIndex = hasMoreFamilyMembers ? rest.findIndex((_row) => {
          return _row.startsWith(`F|${family[i + 1].split("|")[1]}`)
        }) : rest.length;
        const familyPersonRest = rest.slice(familyPersonIndex + 1, nextFamilyPersonIndex);
        console.log(familyData[1],familyData)
        let addressRow = familyPersonRest.find((_row) => _row.startsWith("A|")) || 'A|'
        let phoneRow = familyPersonRest.find((_row) => _row.startsWith("T|")) || 'T|'
        console.log('addressRow', addressRow)
        console.log('phoneRow', phoneRow)
        let addressData = addressRow?.split('|') || [];
        let phoneData = phoneRow?.split('|') || [];
        person.family?.push({
          person: {
            name: familyData[1],
            born: familyData[2],
            address: {
              street: addressData[1],
              city: addressData[2],
              zip: addressData[3],
            },
            phone: {
              mobile: phoneData[1],
              landline: phoneData[2],
            }
          },
        });
      });
      people.push({ person });
    }
  });
  return people;
};

// Funktion för att konvertera JSON till XML
export const alt1AsXML = (data: string): People[] => {
  const people = alt1AsJSON(data);
  return json2xml({ people }, { header: true });
};

// Typdefinitioner för JSON-strukturen

interface PeopleList {
  people?: People[];
}

interface People {
  person?: Person;
}

interface Phone {
  mobile: string;
  landline?: string;
}

interface Person {
  firstname: string;
  lastname: string;
  address: Address;
  phone: Phone;
  family?: FamilyPerson[];
}

interface Family {
  person: FamilyPerson;
}

interface FamilyPerson {
  person: {
    name: string;
    born: string;
    address: Address;
    phone: Phone;
  };
}

interface Address {
  street: string;
  city: string;
  zip: string;
}
