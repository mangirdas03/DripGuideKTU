# T120B165 Saityno taikomųjų programų projektavimas 
## Projekto „DripGuide“ ataskaita 
Mangirdas Šakėnas IFF-9/1
## 
![image](https://user-images.githubusercontent.com/79504320/208492732-5a8d1992-0a8b-4bd6-9f94-dde70e24a78d.png)

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
4. peržiūrėti komentarus,
5. detaliau peržiūrėti pasirinktą daiktą,
6. detaliau peržiūrėti pasirinktą prekinį ženklą,
7. ieškoti daiktų (filtruoti).

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
11. pašalinti komentarą.
12. pridėti prekinį ženklą,
13. pašalinti prekinį ženklą,
14. redaguoti prekinį ženklą,

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

# Tinklapio ekranvaizdžiai bei naudojimosi gidas

![image](https://user-images.githubusercontent.com/79504320/208753457-16cf856b-4788-453b-ba3a-dc32ea7a58ef.png)
## Pagrindinis tinklapio langas
Titulinis langas, jame galite rasti įvairios informacijos apie tinklapį

![image](https://user-images.githubusercontent.com/79504320/208492780-6820e511-6cd4-4a79-aa45-5a1222d559b1.png)
## Prekinių ženklų peržiūra
Galite peržiūrėti visus prekinius ženklus

![image](https://user-images.githubusercontent.com/79504320/208753586-89838682-9e68-46de-a9c7-3607dcca5ad8.png)
## Pasirinkto prekinio ženklo peržiūra
Gali pamatyti detalią pasirinkto prekinio ženklo informaciją

![image](https://user-images.githubusercontent.com/79504320/208754296-9b710efb-c3a2-498f-b303-9d94ca1e02fc.png)
## Daiktų peržiūra
Galite peržiūrėti visus naudotojų pridėtus daiktus

![image](https://user-images.githubusercontent.com/79504320/208492884-8c4aca52-d037-4eb3-9adc-07f70ec8402a.png)
![image](https://user-images.githubusercontent.com/79504320/208492934-6392c372-e05b-43ec-bd65-669bcc65d8e2.png)
## Pasirinkto daikto peržiūra
Gali pamatyti detalią pasirinkto daikto informaciją bei komentarus

![image](https://user-images.githubusercontent.com/79504320/208754998-5b31ff97-e0ff-4dd1-a87f-bb6b8bc13916.png)
## Komentaro pridėjimas
Registruotas naudotojas gali pridėti, redaguoti bei trinti komentarus

![image](https://user-images.githubusercontent.com/79504320/208754382-beae6122-2bd2-465d-9159-19b07f04409d.png)
## Daikto redagavimas
Administratoriui pasiekiamas daikto redagavimo langas

![image](https://user-images.githubusercontent.com/79504320/208754487-e0bf7929-f525-43b6-ad33-a1b4728e5734.png)
## Naujo daikto pridėjimas
Registruotas naudotojas gali pridėti daiktus

![image](https://user-images.githubusercontent.com/79504320/208754667-f1c53979-b8af-4918-a7b1-c488480c390c.png)
## Prekinio ženklo redagavimas
Administratoriui pasiekiamas prekinio ženklo redagavimo langas

![image](https://user-images.githubusercontent.com/79504320/208754734-dc9e12c2-f3ac-42b3-b600-3fd049aab3b1.png)
## Naujo prekinio ženklo pridėjimas
Administratorius gali pridėti prekinius ženklus

![image](https://user-images.githubusercontent.com/79504320/208754822-39771c2d-a4d3-4179-abc2-b665f174dec3.png)
## Naudotojo profilis
Langas, kuris yra pasiekimas visiems registruotiems naudotojams, šiame lange galima sužinoti informaciją apie savo paskyrą bei pasikeisti slaptažodį

![image](https://user-images.githubusercontent.com/79504320/208754897-187623d0-14d8-4c71-8b6b-7bcc2c09287c.png)
## Naudotojų sąrašas
Administratoriams prieinamas langas, kuriame galima peržiūrėti visus registruotus sistemos naudotojus, pakeisti jų rolę ar ištrinti paskyrą.

![image](https://user-images.githubusercontent.com/79504320/208755080-5ef869bb-ddd8-485c-8a95-294728393dc1.png)
## Registracijos langas
Langas, kuriame galima užsiregistruoti

![image](https://user-images.githubusercontent.com/79504320/208755130-353ebf3e-d043-406b-ad8f-bd508e8ac5b2.png)
## Prisijungimo langas
Langas skirtas registruotų naudotojų prisijungimui


# API specifikacija
## Neregistruotas naudotojas
### POST /register
Siunčia naudotojo įvestus duomenis paskyros sukūrimui
#### Metodo URL
`https://dripguide.azurewebsites.net/api/register`
#### Atsakymų kodai
|Pavadinimas  |Kodas   |
| ----------- | ------ |
|Created      |201     |
|Conflict     |409     |
#### Užklausos pavyzdys
`POST https://dripguide.azurewebsites.net/api/register`
#### Atsakymo pavyzdys
```
{
  "id": 0,
  "name": "string",
  "email": "string",
  "role": 0
}
```
### GET /posts/page/{pageNumber}/{query?}
Grąžina nurodytą daiktų puslapį, taip pat galima įvesti raktažodį/filtrą
#### Metodo URL
`https://dripguide.azurewebsites.net/api/posts/{pageNumber}/{query?}`
#### Atsakymų kodai
|Pavadinimas   |Kodas   |
| ------------ | ------ |
|OK            |200     |
|No Content    |204     |
#### Parametrai
|Pavadinimas   |Ar būtinas?   |Apibūdinimas         |Pavyzdys   |
| ------------ | ------------ | ------------------- | --------- |
|pageNumber    |Taip          | puslapio numeris    | `1`       |
|query         |Ne            | Raktažodis/filtras  | `nike`    |
#### Užklausos pavyzdys
`GET https://dripguide.azurewebsites.net/api/posts/page/1/adidas`
#### Atsakymo pavyzdys
```
[
  {
    "id": 1,
    "title": "string",
    "description": "string",
    "description2": "string",
    "material": "string",
    "price": "string",
    "releasedate": "datetime",
    "stylecode": "string",
    "colorway": "string",
    "fK_User": 0,
    "submitDate": "datetime",
    "status": 0,
    "fK_Brand": "string",
    "image": "string",
  },
  {
    "id": 2,
    "title": "string",
    "description": "string",
    "description2": "string",
    "material": "string",
    "price": "string",
    "releasedate": "datetime",
    "stylecode": "string",
    "colorway": "string",
    "fK_User": 0,
    "submitDate": "datetime",
    "status": 0,
    "fK_Brand": "string",
    "image": "string",
  }
]
```
### GET /brands
Grąžina prekinių ženklų sąrašą
#### Metodo URL
`https://dripguide.azurewebsites.net/api/brands`
#### Atsakymų kodai
|Pavadinimas   |Kodas   |
| ------------ | ------ |
|OK            |200     |
|No Content    |204     |
#### Užklausos pavyzdys
`GET https://dripguide.azurewebsites.net/api/brands`
#### Atsakymo pavyzdys
```
[
  {
    "id": 1,
    "name": "string",
    "description": "string",
    "establishmentDate": "datetime",
    "founder": "string",
    "headquarters": "string",
    "image": "string",
  },
  {
    "id": 2,
    "name": "string",
    "description": "string",
    "establishmentDate": "datetime",
    "founder": "string",
    "headquarters": "string",
    "image": "string",
  }
]
```
### GET /brands/{id}
Grąžina pasirinktą prekinį ženklą
#### Metodo URL
`https://dripguide.azurewebsites.net/api/brands/{id}`
#### Atsakymų kodai
|Pavadinimas   |Kodas   |
| ------------ | ------ |
|OK            |200     |
|No Found      |404     |
#### Parametrai
|Pavadinimas   |Ar būtinas?   |Apibūdinimas                |Pavyzdys   |
| ------------ | ------------ | -------------------------- | --------- |
|id            |Taip          | prekinio zenklo numeris    | `1`       |
#### Užklausos pavyzdys
`GET https://dripguide.azurewebsites.net/api/brands/1`
#### Atsakymo pavyzdys
```
{
    "id": 1,
    "name": "string",
    "description": "string",
    "establishmentDate": "datetime",
    "founder": "string",
    "headquarters": "string",
    "image": "string",
}
```
### GET /posts/{id}
Grąžina pasirinktą daiktą
#### Metodo URL
`https://dripguide.azurewebsites.net/api/posts/{id}`
#### Atsakymų kodai
|Pavadinimas   |Kodas   |
| ------------ | ------ |
|OK            |200     |
|No Found      |404     |
|Unauthorized  |401     |
#### Parametrai
|Pavadinimas   |Ar būtinas?   |Apibūdinimas       |Pavyzdys   |
| ------------ | ------------ | ----------------- | --------- |
|id            |Taip          | daikto numeris    | `1`       |
#### Užklausos pavyzdys
`GET https://dripguide.azurewebsites.net/api/posts/1`
#### Atsakymo pavyzdys
```
{
    "id": 1,
    "title": "string",
    "description": "string",
    "description2": "string",
    "material": "string",
    "price": "string",
    "releasedate": "datetime",
    "stylecode": "string",
    "colorway": "string",
    "fK_User": 0,
    "submitDate": "datetime",
    "status": 0,
    "fK_Brand": "string",
    "image": "string",
}
```
### GET /comments
Grąžina komentarų sąrašą
#### Metodo URL
`https://dripguide.azurewebsites.net/api/comments`
#### Atsakymų kodai
|Pavadinimas   |Kodas   |
| ------------ | ------ |
|OK            |200     |
#### Užklausos pavyzdys
`GET https://dripguide.azurewebsites.net/api/comments`
#### Atsakymo pavyzdys
```
{
    "id": 1,
    "text": "string",
    "user": 1,
    "submitTime": "datetime",
    "postId": 1
},
{
    "id": 2,
    "text": "string",
    "user": 1,
    "submitTime": "datetime",
    "postId": 1
}
```
## Registruotas naudotojas
### POST /login
Siunčia naudotojo įvestus duomenis prisijungimui
#### Metodo URL
`https://dripguide.azurewebsites.net/api/login`
#### Atsakymų kodai
|Pavadinimas  |Kodas   |
| ----------- | ------ |
|OK           |200     |
|Bad Request  |400     |
#### Užklausos pavyzdys
`POST https://dripguide.azurewebsites.net/api/login`
#### Atsakymo pavyzdys
```
{
  "name": "string",
  "role": 0,
  "token": "string"
}
```
### POST /posts
Siunčia naudotojo įvestus duomenis naujo daikto pridėjimui
#### Metodo URL
`https://dripguide.azurewebsites.net/api/posts`
#### Atsakymų kodai
|Pavadinimas  |Kodas   |
| ----------- | ------ |
|Created      |201     |
|Bad Request  |400     |
|Unauthorized |401     |
#### Užklausos pavyzdys
`POST https://dripguide.azurewebsites.net/api/posts`
#### Atsakymo pavyzdys
```
{
    "id": 1,
    "title": "string",
    "description": "string",
    "description2": "string",
    "material": "string",
    "price": "string",
    "releasedate": "datetime",
    "stylecode": "string",
    "colorway": "string",
    "fK_User": 0,
    "submitDate": "datetime",
    "status": 0,
    "fK_Brand": "string",
    "image": "string",
}
```
### PUT /changepassword
Skirtas slaptažodžio pakeitimui
#### Metodo URL
`https://dripguide.azurewebsites.net/api/changepassword`
#### Atsakymų kodai
|Pavadinimas  |Kodas   |
| ----------- | ------ |
|OK           |200     |
|Unauthorized |401     |
#### Užklausos pavyzdys
`PUT https://dripguide.azurewebsites.net/api/changepassword`
#### Atsakymo pavyzdys
```
"Changed."
```
### POST /comments
Skirtas naujo komentaro pridėjimui
#### Metodo URL
`https://dripguide.azurewebsites.net/api/comments`
#### Atsakymų kodai
|Pavadinimas  |Kodas   |
| ----------- | ------ |
|Created      |201     |
|Bad Request  |400     |
|Unauthorized |401     |
#### Užklausos pavyzdys
`POST https://dripguide.azurewebsites.net/api/comments`
#### Atsakymo pavyzdys
```
{
    "id": 1,
    "text": "string",
    "user": 1,
    "submitTime": "datetime",
    "postId": 1
}
```
### PUT /comments/{id}
Skirtas komentaro redagavimui
#### Metodo URL
`https://dripguide.azurewebsites.net/api/comments/{id}`
#### Atsakymų kodai
|Pavadinimas  |Kodas   |
| ----------- | ------ |
|OK           |200     |
|Bad Request  |400     |
|Not Found    |404     |
|Unauthorized |401     |
#### Parametrai
|Pavadinimas   |Ar būtinas?   |Apibūdinimas       |Pavyzdys   |
| ------------ | ------------ | ----------------- | --------- |
|id            |Taip          | komentaro id      | `1`       |
#### Užklausos pavyzdys
`PUT https://dripguide.azurewebsites.net/api/comments/1`
#### Atsakymo pavyzdys
```
{
    "id": 1,
    "text": "string",
    "user": 1,
    "submitTime": "datetime",
    "postId": 1
}
```
### DELETE /comments/{id}
Skirtas komentaro pašalinimui
#### Metodo URL
`https://dripguide.azurewebsites.net/api/comments/{id}`
#### Atsakymų kodai
|Pavadinimas  |Kodas   |
| ----------- | ------ |
|OK           |200     |
|Not Found    |404     |
|Unauthorized |401     |
#### Parametrai
|Pavadinimas   |Ar būtinas?   |Apibūdinimas       |Pavyzdys   |
| ------------ | ------------ | ----------------- | --------- |
|id            |Taip          | komentaro id      | `1`       |
#### Užklausos pavyzdys
`DELETE https://dripguide.azurewebsites.net/api/comments/1`
#### Atsakymo pavyzdys
```
{
    "id": 1,
    "text": "string",
    "user": 1,
    "submitTime": "datetime",
    "postId": 1
}
```
## Administratorius
### GET /posts/pending/{pageNumber}
Grąžina nepatvirtintų daiktų sąrašą
#### Metodo URL
`https://dripguide.azurewebsites.net/api/posts/pending/{pageNumber}`
#### Atsakymų kodai
|Pavadinimas   |Kodas   |
| ------------ | ------ |
|OK            |200     |
|Unauthorized  |401     |
#### Parametrai
|Pavadinimas   |Ar būtinas?   |Apibūdinimas       |Pavyzdys   |
| ------------ | ------------ | ----------------- | --------- |
|pageNumber    |Taip          | puslapio numeris  | `1`       |
#### Užklausos pavyzdys
`GET https://dripguide.azurewebsites.net/api/posts/pending/1`
#### Atsakymo pavyzdys
```
[
  {
    "id": 1,
    "title": "string",
    "description": "string",
    "description2": "string",
    "material": "string",
    "price": "string",
    "releasedate": "datetime",
    "stylecode": "string",
    "colorway": "string",
    "fK_User": 0,
    "submitDate": "datetime",
    "status": 0,
    "fK_Brand": "string",
    "image": "string",
  },
  {
    "id": 2,
    "title": "string",
    "description": "string",
    "description2": "string",
    "material": "string",
    "price": "string",
    "releasedate": "datetime",
    "stylecode": "string",
    "colorway": "string",
    "fK_User": 0,
    "submitDate": "datetime",
    "status": 0,
    "fK_Brand": "string",
    "image": "string",
  }
]
```
### PUT /posts/confirm/{id}
Daikto redagavimas/patvirtinimas
#### Metodo URL
`https://dripguide.azurewebsites.net/api/posts/confirm/{id}`
#### Atsakymų kodai
|Pavadinimas  |Kodas   |
| ----------- | ------ |
|OK           |200     |
|Bad Request  |400     |
|Not Found    |404     |
|Unauthorized |401     |
#### Parametrai
|Pavadinimas   |Ar būtinas?   |Apibūdinimas       |Pavyzdys   |
| ------------ | ------------ | ----------------- | --------- |
|id            |Taip          | daikto numeris    | `1`       |
#### Užklausos pavyzdys
`PUT https://dripguide.azurewebsites.net/api/posts/confirm/{id}`
#### Atsakymo pavyzdys
```
{
    "id": 1,
    "title": "string",
    "description": "string",
    "description2": "string",
    "material": "string",
    "price": "string",
    "releasedate": "datetime",
    "stylecode": "string",
    "colorway": "string",
    "fK_User": 0,
    "submitDate": "datetime",
    "status": 0,
    "fK_Brand": "string",
    "image": "string",
}
```
### DELETE /posts/{id}
Daikto pašalinimas
#### Metodo URL
`https://dripguide.azurewebsites.net/api/posts/{id}`
#### Atsakymų kodai
|Pavadinimas  |Kodas   |
| ----------- | ------ |
|OK           |200     |
|Not Found    |404     |
|Unauthorized |401     |
#### Parametrai
|Pavadinimas   |Ar būtinas?   |Apibūdinimas       |Pavyzdys   |
| ------------ | ------------ | ----------------- | --------- |
|id            |Taip          | daikto numeris    | `1`       |
#### Užklausos pavyzdys
`DELETE https://dripguide.azurewebsites.net/api/posts/{id}`
#### Atsakymo pavyzdys
```
{
    "id": 1,
    "title": "string",
    "description": "string",
    "description2": "string",
    "material": "string",
    "price": "string",
    "releasedate": "datetime",
    "stylecode": "string",
    "colorway": "string",
    "fK_User": 0,
    "submitDate": "datetime",
    "status": 0,
    "fK_Brand": "string",
    "image": "string",
}
```
### GET /users/{pageNumber}
Grąžina registruotų naudotojų sąrašą
#### Metodo URL
`https://dripguide.azurewebsites.net/api/users/{pageNumber}`
#### Atsakymų kodai
|Pavadinimas   |Kodas   |
| ------------ | ------ |
|OK            |200     |
|Unauthorized  |401     |
#### Parametrai
|Pavadinimas   |Ar būtinas?   |Apibūdinimas       |Pavyzdys   |
| ------------ | ------------ | ----------------- | --------- |
|pageNumber    |Taip          | puslapio numeris  | `1`       |
#### Užklausos pavyzdys
`GET https://dripguide.azurewebsites.net/api/users/1`
#### Atsakymo pavyzdys
```
{
    "id": 1,
    "name": "string",
    "email": "string",
    "role": 0
},
{
    "id": 2,
    "name": "string",
    "email": "string",
    "role": 1
}
```
### PUT /changerole/{id}
Registruoto naudotojo rolės keitimas
#### Metodo URL
`https://dripguide.azurewebsites.net/api/changerole/{id}`
#### Atsakymų kodai
|Pavadinimas  |Kodas   |
| ----------- | ------ |
|OK           |200     |
|Not Found    |404     |
|Unauthorized |401     |
#### Parametrai
|Pavadinimas   |Ar būtinas?   |Apibūdinimas       |Pavyzdys   |
| ------------ | ------------ | ----------------- | --------- |
|id            |Taip          | naudotojo id      | `1`       |
#### Užklausos pavyzdys
`PUT https://dripguide.azurewebsites.net/api/changerole/{id}`
#### Atsakymo pavyzdys
```
Tuščias OK reponse
```
### DELETE /user/{id}
Naudotojo paskyros pašalinimas
#### Metodo URL
`https://dripguide.azurewebsites.net/api/user/{id}`
#### Atsakymų kodai
|Pavadinimas  |Kodas   |
| ----------- | ------ |
|OK           |200     |
|Not Found    |404     |
|Unauthorized |401     |
#### Parametrai
|Pavadinimas   |Ar būtinas?   |Apibūdinimas       |Pavyzdys   |
| ------------ | ------------ | ----------------- | --------- |
|id            |Taip          | naudotojo id      | `1`       |
#### Užklausos pavyzdys
`DELETE https://dripguide.azurewebsites.net/api/user/{id}`
#### Atsakymo pavyzdys
```
Tuščias OK reponse
```
### DELETE /posts/{id}
Daikto pašalinimas
#### Metodo URL
`https://dripguide.azurewebsites.net/api/posts/{id}`
#### Atsakymų kodai
|Pavadinimas  |Kodas   |
| ----------- | ------ |
|OK           |200     |
|Not Found    |404     |
|Unauthorized |401     |
#### Parametrai
|Pavadinimas   |Ar būtinas?   |Apibūdinimas       |Pavyzdys   |
| ------------ | ------------ | ----------------- | --------- |
|id            |Taip          | daikto id         | `1`       |
#### Užklausos pavyzdys
`DELETE https://dripguide.azurewebsites.net/api/posts/{id}`
#### Atsakymo pavyzdys
```
{
    "id": 1,
    "title": "string",
    "description": "string",
    "description2": "string",
    "material": "string",
    "price": "string",
    "releasedate": "datetime",
    "stylecode": "string",
    "colorway": "string",
    "fK_User": 0,
    "submitDate": "datetime",
    "status": 0,
    "fK_Brand": "string",
    "image": "string",
}
```
### PUT /posts/confirm/{id}
Daikto redagavimas/patvirtinimas
#### Metodo URL
`https://dripguide.azurewebsites.net/api/posts/confirm/{id}`
#### Atsakymų kodai
|Pavadinimas  |Kodas   |
| ----------- | ------ |
|OK           |200     |
|Not Found    |404     |
|Bad Request  |404     |
|Unauthorized |401     |
#### Parametrai
|Pavadinimas   |Ar būtinas?   |Apibūdinimas       |Pavyzdys   |
| ------------ | ------------ | ----------------- | --------- |
|id            |Taip          | daikto id         | `1`       |
#### Užklausos pavyzdys
`PUT https://dripguide.azurewebsites.net/api/posts/{id}`
#### Atsakymo pavyzdys
```
{
    "id": 1,
    "title": "string",
    "description": "string",
    "description2": "string",
    "material": "string",
    "price": "string",
    "releasedate": "datetime",
    "stylecode": "string",
    "colorway": "string",
    "fK_User": 0,
    "submitDate": "datetime",
    "status": 0,
    "fK_Brand": "string",
    "image": "string",
}
```
### POST /brands
Naujo prekinio ženklo pridėjimas
#### Metodo URL
`https://dripguide.azurewebsites.net/api/brands`
#### Atsakymų kodai
|Pavadinimas  |Kodas   |
| ----------- | ------ |
|Created      |201     |
|Bad Request  |404     |
|Unauthorized |401     |
#### Užklausos pavyzdys
`POST https://dripguide.azurewebsites.net/api/brands`
#### Atsakymo pavyzdys
```
{
    "id": 1,
    "name": "string",
    "description": "string",
    "establishmentDate": "datetime",
    "founder": "string",
    "headquarters": "string",
    "image": "string",
  }
```
### DELETE /brands/{id}
Prekinio ženklo pašalinimas
#### Metodo URL
`https://dripguide.azurewebsites.net/api/brands/{id}`
#### Atsakymų kodai
|Pavadinimas  |Kodas   |
| ----------- | ------ |
|OK           |200     |
|Not Found    |404     |
|Conflict     |409     |
|Unauthorized |401     |
#### Užklausos pavyzdys
`DELETE https://dripguide.azurewebsites.net/api/brands/1`
#### Atsakymo pavyzdys
```
{
    "id": 1,
    "name": "string",
    "description": "string",
    "establishmentDate": "datetime",
    "founder": "string",
    "headquarters": "string",
    "image": "string",
  }
```
### PUT /brands/{id}
Prekinio ženklo redagavimas
#### Metodo URL
`https://dripguide.azurewebsites.net/api/brands/{id}`
#### Atsakymų kodai
|Pavadinimas  |Kodas   |
| ----------- | ------ |
|OK           |200     |
|Bad Request  |404     |
|Not Found    |409     |
|Unauthorized |401     |
#### Užklausos pavyzdys
`PUT https://dripguide.azurewebsites.net/api/brands/1`
#### Atsakymo pavyzdys
```
{
    "id": 1,
    "name": "string",
    "description": "string",
    "establishmentDate": "datetime",
    "founder": "string",
    "headquarters": "string",
    "image": "string",
  }
```

# Išvados
Šio modulio metu buvo sukurta "DriGuide" informacinė sistema. Back-end dalis buvo kuriama naudojant C#, o Front-end - React.js su Typescript. Duomebų bazei buvo naudojama MsSQL. Sistema yra skirta dokumentuoti ir rinkti informaciją apie įvairius retus daiktus. Sistemos naudotojai taip pat patys gali prisidėti prie jos plėtimo pridėdami naujus daiktus. Taip pat sistemoje egzistuoja komentarų sistema, kurios pagalba registruoti naudotojai gali palikti komentarą bei įvertinti pasirinktą daiktą. Kuriant sistemą buvo stengiamasi lakytis gerųjų C# bei Typescript programavimo praktikų bei Resful API reikalavimų.
