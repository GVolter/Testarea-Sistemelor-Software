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

## Prezentare PPT

[Link canva](https://www.canva.com/design/DAGFCa5awGU/89vtjkPE8Y1inL3qfqUZyw/edit?utm_content=DAGFCa5awGU&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

## Comparatia cu AI

Folosind varianta gratis a ChatGPT 3.5 am cerut prin intermediul urmatorului prompt a ni se genera o suita de teste unitare si de integrare.

``` Salut, doresc sa imi generezi teste unitare si de integrare pentru acest cod ce reprezinta un joc de x si 0 in limbajul javascript: <cod aici>```

Rezultatul obtinut poate fi vizualizat [aici](https://imgur.com/a/2oy1PVE). Pe baza acestor imagini putem aduce cateva mentiuni:

- Suita de teste este formata doar din 5 teste unitare scurte, fara teste de integrare;
- In urma rularii testelor au esuat 5/5 teste, suita a fost un esec total;
- Coverage-ul obtinut este de 16.98%, in comparatie cu coverage-ul de 100% obtinut in urma modificarilor făcute de noi specific pentru implementarea aplicatiei;
- Codul este simplist, nu ia în considerare niciun fel de excepție, edge-caseuri; singura utilitate pe care am putea să o găsim este faptul că acest cod poate fi folosit ca un șablon la care se pot aduce îmbunătățiri de către dezvoltator.

Chiar daca la prima vedere suita de teste pare ar fi una promitatoare pentru inceput, aceasta vine cu erori banale care necesita timp in plus pentru a fi rezolvate. Continuand pe aceasta linie suita de teste poate sa devina si mai problematica in testarea unor situatii mai specifice si ar fi predispusa la mutation.

In concluzie, realizarii testarii prin intermediul tool-urilor de AI poate sa para varianta mai usoara, insa de cele mai multe ori o sa fie depasit de o aplicatie putin mai complexa si va fi doar o pierdere de timp. 
