# Weboldal Képkonvertáló

## Áttekintés
Ez az alkalmazás egy Express.js alapú szerver, amely weboldalakat vagy HTML kódot képekké alakít át. A weboldalak rendereléséhez Puppeteer-t használ.

## Telepítés
Az alkalmazás futtatásához telepíteni kell a Node.js-t és az npm-et.
1. Klónozza a repót
2. Navigáljon a projekt könyvtárába, és futtassa a `npm install` parancsot a függőségek telepítéséhez.

## Az alkalmazás futtatása
A szerver elindításához hajtsa végre a `node app.js` parancsot. Elérhető lesz a `http://localhost:3000` címen.

## Használat
- Nyissa meg a `http://localhost:3000` címet a böngészőjében.
- Adjon meg egy URL-t vagy HTML kódot a megadott mezőkben.
- Kattintson a 'Konvertálás' gombra a kép megkapásához.

## Végpontok
- `GET /`: A főoldalt szolgáltatja ki, ahol a felhasználók beküldhetik a konvertálandó URL-eket vagy HTML-t.
- `POST /convert`: Űrlapadatokat fogad, amelyek URL-t vagy HTML-t tartalmaznak, és visszaküldi a konvertált képet.

## Megjegyzések
- Az alkalmazás az egész weboldalt vagy HTML tartalmat egyetlen képpé alakítja át.
- A nagyobb weboldalak feldolgozása hosszabb időt vehet igénybe.

