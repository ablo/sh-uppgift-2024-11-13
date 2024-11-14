# sh-uppgift-2024-11-13

## Installera

``` bash
git clone git@github.com:ablo/sh-uppgift-2024-11-13.git johans-sh-uppgift-2024-11-13 && cd johans-sh-uppgift-2024-11-13
```

``` bash
npm install
```

``` bash
npx ts-node src/app.ts 
```

## Integration mellan två system

### System 1

Levererar ett radbaserat filformat

### System 2

XML output

### Problem

[System 1] levererar idag radbaserad output.
En integration behövs för att konvertera radbaserat format(text) till XML för att matcha [System 2]

### Lösning

Behöver utveckla en node.js-modul som går att använda/integrera i befintligt system.

#### Struktur

Personer kan ha följande data:

- firstname
- lastname
- address ...
- phone
- family *se kommentar
  - name
  - born
  - address
- family *se kommentar
  - ...

> ### [!] Reflektioner/anteckningar till SH-möte
> 
> Förstår att detta är demodata för testsyfte, men har noterat några saker
> - `<family>` bör ändras till  `<person>` och ha en wrapper som är `<family>`? Det blir då lättare att sätta data-attribut på `<family>`, hämta alla familjemedlemmar etc. 
>   - Eftersom detta är ett befintligt system så är troligtvis ej möjligt att ändra, och man får i då hålla sig till format i befintligt system.
> - För att försvåra testet, ändra "Carl Gustaf", "Victoria" och "Carl Philip" till "Kalle", "Lisa" och "Nisse", så att man inte kan dra slutsatser om struktur av namnen.

Filformat:

``` text
P|förnamn|efternamn
T|mobilnummer|fastnätsnummer
A|gata|stad|postnummer
F|namn|födelseår
```

P kan följas av T, A och F
F kan följas av T och A

Exempel:

``` text
P|Carl Gustaf|Bernadotte
T|0768-101801|08-101801
A|Drottningholms slott|Stockholm|10001
F|Victoria|1977
A|Haga Slott|Stockholm|10002
F|Carl Philip|1979
T|0768-101802|08-101802
P|Barack|Obama
A|1600 Pennsylvania Avenue|Washington, D.C
```

Ger XML som:

``` xml
<people>
    <person>
        <firstname>Carl Gustaf</firstname>
        <lastname>Bernadotte</lastname>
        <address>
            <street>Drottningholms slott</street>
            ...
        </address>
        <phone>
            <mobile>0768-101801</mobile>
            ...
        </phone>
        <family>
            <name>Victoria</name>
            <born>1977</born>
            <address>...</address>
        </family>
        <family>...</family>
    </person>
    <person>
        ...
    </person>
</people>
```
