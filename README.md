# Testarea-Sistemelor-Software || Tic-Tac-Toe

Aplicatia Tic-Tac-Toe exemplifca un simplu joc de X si 0 intre doi jucatori, prezentat pe o pagina HTML cu interactiune javascript prin intermediul browserului.

## Rularea proiectului si a testelor

```sh
npm i           # instaleaza dependencies
npm run test    # echivalent cu npm run coverage si npx stryker run
npm run serve   # server localhost:3000
```

## Teste

### - Unitare

Aceste teste sunt prezente in ``domTicTacToe.test.js`` si testeaza functionalitatea unor bucati individuale din cod precum daca tabla de joc a fost initializata corect.

### - Integrare

Testele de integrare sunt de asemenea prezente in ``domTicTacToe.test.js`` si testeaza interactiunea componentei de UI cu logica jocului, de exemplu daca obiectele din DOM se modifica corect si reprezinta intradevar state-ul prezent al jocului sau conditiile de castig reale.

### - Mutation

Configurarea uneltei ``Stryker`` este prezenta in ``stryker.config.json`` iar raportul rezultatelor obtinute este salvat in directorul ``reports/mutation``.

## Justificarea frameworkurilor

Pentru testele unitare si de integrare am ales folosirea frameworkului ``Jest`` datorita popularitatii sale si simplicitatii de utilizare iar pentru mutation testing si reports unealta ``Stryker`` pentru calitatea raporturilor generate si usurinta de integrat cu testele noastre existente.

## Video Demo

![demo](./media/demo.gif)

## Comparatia cu AI

Folosind varianta gratis a ChatGPT 3.0 am cerut prin intermediul urmatorului prompt a ni se genera o suita de teste unitare si de integrare.

``` Salut, doresc sa imi generezi teste unitare si de integrare pentru acest cod ce reprezinta un joc de x si 0 in limbajul javascript: <cod aici>```

Acesta a generat testele urmatoare:
