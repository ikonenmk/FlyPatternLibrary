# FlyPatternLibrary (Pågående projekt, ej klart utan under arbete)

## Beskrivning

Backend för en webbapplikation där användare kan söka i en databas efter flugbindningsmönster baserat på bl.a. fiskart, typ av fluga (t.ex. torrfluga, våtfluga m.m.) och på en kombination av flugbidningsmaterial.

Ett flugmönster består oftast av en bild, en lista på material som krävs för att binda flugan, en beskrivning av hur man binder flugan och ofta lite historisk bakgrund eller annan information om hur man fiskar flugan bäst.

Många flugbindare har mycket material hemma, men det kan vara en utmaning att hitta nya flugmönster som man kan binda med det material man har. Det gör att man ofta måste köpa ännu mer material istället för att använda befintligt.
Genom att ange vilka material man vill använda för att binda en fluga ger applikationen förslag på lämpliga mönster.

Användaren ska kunna spara mönster i ett eget bibliotek för att komma ihåg dem. Det ska vara möjligt att generera en inköpslista över material baserat på mönstren som finns i det egna biblioteket.

Det ska finnas en möjlighet för användare att lägga upp egna mönster och sälja egenbundna flugor till andra användare.


## ER-diagram över databas

![image](https://github.com/ikonenmk/FlyPatternLibrary/assets/153864857/748e2d05-6fb8-487f-8038-f6ed91dee926)


## Krav

### Galleriet

1. Hämta alla mönster i databasen (klar, findAll i Pattern)
2. Filtrera alla mönster på typ av fluga
3. Filtrera alla mönster på typ av fisk
4. Filtrera alla mönster baserat på keyword
5. Filtrera alla mönster baserat på till salu eller inte

### Mönster

1. Lägga till mönster (klar)
2. Hämta mönster baserat på id (klar)
3. Uppdatera mönster baserat på id (klar)
4. Ta bort mönster baserat på id (klar)

### Användare
1. Skapa användare (klar)
2. Ta bort användare baserat på id (klar)
3. Uppdatera användare baserat på id (klar)
4. Hämta användare baserat på id (klar)

### Användarbibliotek

1. Spara flugmönster till bibliotek (klar)
2. Ta bort flugmönster från bibliotek 
3. Visa alla flugmönster i bibliotek
4. Generera lista över material för alla flugmönster i biblioteket, listan sparas inte i DB.

### Order
1. Skapa order
2. Lägg till mönster i order samt antal av mönster
3. Räkna ut totalpris för alla mönster i ordern
4. Ta bort order
5. Uppdatera order
6. Hämta order


## Blandat att göra
1. Ändra så att krokstorlek är ett intervall mellan två siffror
2. Validering av input
3. Åtkomst till apier
