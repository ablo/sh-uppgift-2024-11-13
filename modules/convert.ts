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
      const rest = rows.slice(index + 1);
      const familyIndex = rest.findIndex((row) => row.startsWith("F|"));
      const data = rest.slice(0, familyIndex != -1 ? familyIndex : rest.length); // Make sure we we check data to the end even if wwe have no family
      console.log(familyIndex, row, data)
      const phone = data.find((_row) => _row.startsWith("T|"));
      const address = data.find((_row) => _row.startsWith("A|"));
      const family = rest.filter((_row) => _row.startsWith("F|"));
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
      family.forEach((familyRow) => {
        const familyData = familyRow.split("|");
        person.family?.push({
          person: {
            name: familyData[1],
            born: familyData[2],
            address: {
              street: familyData[3],
              city: familyData[4],
              zip: familyData[5],
            },
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
  };
}

interface Address {
  street: string;
  city: string;
  zip: string;
}
