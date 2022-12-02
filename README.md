# T120B165 Saityno taikomųjų programų projektavimas 
## Projekto „DripGuide“ ataskaita 
Mangirdas Šakėnas IFF-9/1
## 

### Projekto tikslas – sistema, kurioje būtų galima rasti detalią informaciją apie retus drabužius 
bei kitus daiktus. Internete egzistuoja svetainės, kuriose galima įsigyti panašių daiktų, tačiau 
juose dažnai trūksta detalesnės informacijos. Ši interneto svetainė skirta padėti naudotojui rasti 
visą šią informaciją vienoje vietoje bei leisti patiems prisidėti prie tinklapio pildymo.

## 
### Veikimo principas – sistemą sudaro: 
- Internetinė svetainė, kurią klientas matys ir galės naudotis. (Front-end)
- Programa, skirta logikai ir įvairiems skaičiavimams įgyvendinti, nematoma 
klientui. (Back-end)
- Duomenų bazė, kurioje yra saugoma informacija apie daiktus bei sistemos 
naudotojus.



Su sistema DripGuide komunikuoja trijų rūšių naudotojai: svečias, registruotas naudotojas bei 
administratorius.
- Sistemos svečias gali matyti visų sistemos įrašų sąrašą, peržiūrėti pasirinktą įrašą
(daiktą), ieškoti įrašų bei užsiregistruoti.
- Registruotas naudotojas gali prisijungti, atsijungti, pridėti naują įrašą į sistemą bei 
pasikeisti slaptažodį.
- Administratorius gali peržiūrėti naudotojų pridėtų, bet dar nepatvirtintų, įrašų 
sąrašą, detaliau peržiūrėti pasirinktą nepatvirtintą įrašą iš šio sąrašo, patvirtinti 
peržiūrimą įrašą arba jį atmesti, peržiūrėti registruotų naudotojų sąrašą, ištrinti 
naudotoją, pakeisti jo rolę, ištrinti arba redaguoti pasirinktą įrašą.

### Funkciniai reikalavimai:
### Neregistruotas naudotojas galės: 
1. Užsiregistruoti,
2. peržiūrėti daiktus,
3. peržiūrėti prekinius ženklus,
4. detaliau peržiūrėti pasirinktą daiktą,
5. detaliau peržiūrėti pasirinktą prekinį ženklą,
6. ieškoti daiktų (filtruoti).

### Registruotas naudotojas galės: 
1. Prisijungti,
2. atsijungti,
3. pridėti naują daiktą,
4. pasikeisti slaptažodį,
5. pridėti komentarą,
6. redaguoti savo komentarą,
7. pašalinti savo komentarą.

### Administratorius galės: 
1. Peržiūrėti nepatvirtintų daiktų sąrašą,
2. peržiūrėti pasirinktą nepatvirtintą daiktą,
3. patvirtinti naudotojo pridėtą (nepatvirtintą) daiktą,
4. atmesti naudotojo pridėtą (nepatvirtintą) daiktą,
5. redaguoti naudotojo pridėtą (nepatvirtintą) daiktą,
6. peržiūrėti naudotojų sąrašą,
7. pakeisti naudotojo rolę,
8. pašalinti naudotoją,
9. pašalinti daiktą,
10. redaguoti daiktą,
11. pridėti prekinį ženklą,
12. pašalinti prekinį ženklą,
13. redaguoti prekinį ženklą,
14. pašalinti komentarą.

## Sistemos architektūra 
### Sistemos sudedamosios dalys: 
- Kliento pusė (ang. Front-End) – naudojant React.js.
- Serverio pusė (angl. Back-End) – naudojant .NET C# Web API su EF Core
- Duomenų bazė – MSSQL (SSMS)

Žemiau pavaizduota kuriamos sistemos diegimo diagrama. DripGuide sistema yra talpinama 
Azure serveryje. Sistemos naudotojas gali pasiekti DripGuide jei turi kompiuterį su naršykle, 
bei prieigą prie interneto. Tiek naudotojas su kliento puse, tiek kliento pusė su serverio puse 
bendrauja HTTP protokolu. Serverio dalis su duomenų baze bendrauja MySqlConnector ryšiu 
naudojant EF Core ORM.

![image](https://user-images.githubusercontent.com/79504320/191046330-c8651f06-14ac-4183-a107-aa1ee36fba00.png)
