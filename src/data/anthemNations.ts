export interface AnthemNation {
  id: string;
  name: string;
  code: string;
  colors: string[];
  anthem: {
    title: string;
    lyrics: {
      original: string;
      english: string;
    };
    history: string;
    facts: string[];
    audioUrl?: string;

    haka?: {
      kaMate: {
        title: string;
        description: string;
        original: string;
        english: string;
      };
      kapaOPango: {
        title: string;
        description: string;
        original: string;
        english: string;
      };
    };
  };
}

export const anthemNations: AnthemNation[] = [

/* ================= SOUTH AFRICA ================= */
{
  id: "south-africa",
  name: "South Africa",
  code: "za",
  colors: ["#007A4D", "#FFB612", "#000000"],
  anthem: {
    title: "Nkosi Sikelel’ iAfrika / Die Stem van Suid-Afrika",
    audioUrl: "/audio/anthems/south-african-anthem.mp3",
    lyrics: {
      original: `Nkosi sikelel' iAfrika,
Maluphakanyisw' uphondo lwayo;
Yizwa imithandazo yethu,
Nkosi sikelela, thina lusapho lwayo.

Morena boloka setjhaba sa heso,
O fedise dintwa le matshwenyeho,
O se boloke setjhaba sa heso,
Setjhaba sa South Afrika – South Afrika.

Uit die blou van onse hemel,
Uit die diepte van ons see,
Oor ons ewige gebergtes,
Waar die kranse antwoord gee.

Sounds the call to come together,
And united we shall stand,
Let us live and strive for freedom,
In South Africa our land.`,
      english: `God bless Africa,
May her glory be lifted high;
Hear our prayers,
God bless us, Your children.

Lord, protect our nation,
End all wars and suffering,
Protect our nation,
South Africa.

From the blue of our skies,
From the depth of our seas,
Over our everlasting mountains,
Where the crags echo.

Sounds the call to come together,
And united we shall stand,
Let us live and strive for freedom,
In South Africa our land.`
    },
    history: `Adopted in 1997, this anthem uniquely combines "Nkosi Sikelel’ iAfrika" and "Die Stem van Suid-Afrika" to represent unity after apartheid.

🏉 Rugby Context:
One of the most powerful pre-match moments in world rugby, symbolizing unity across languages and cultures.`,
    facts: [
      "Five-language hybrid anthem",
      "Adopted in 1997",
      "Symbol of reconciliation",
      "Emotionally powerful in rugby"
    ]
  }
},

/* ================= NEW ZEALAND ================= */
{
  id: "new-zealand",
  name: "New Zealand",
  code: "nz",
  colors: ["#000000", "#FFFFFF"],
  anthem: {
    title: "God Defend New Zealand",
    audioUrl: "/audio/anthems/new-zealand-anthem.mp3",
    lyrics: {
      original: `E Ihowā Atua,
O ngā iwi mātou rā,
Āta whakarangona,
Me aroha noa.

Kia hua ko te pai,
Kia tau tō atawhai,
Manaakitia mai
Aotearoa.`,
      english: `God of nations at Thy feet,
Hear our voices, we entreat;
Guard Pacific's triple star,
God defend New Zealand.`
    },
    history: `Adopted in 1977. One of two official anthems.

🏉 Rugby Context:
Always followed by the haka, forming the most iconic pre-match ritual in world sport.`,
    facts: [
      "Two official anthems",
      "Māori and English versions",
      "Haka follows anthem",
      "Unique rugby ritual"
    ],
    haka: {
      kaMate: {
        title: "Ka Mate",
        description: "Traditional haka",
        original: `Ka mate, ka mate! Ka ora, ka ora!`,
        english: "It is death, it is life."
      },
      kapaOPango: {
        title: "Kapa o Pango",
        description: "Modern haka",
        original: `Kapa o pango kia whakawhenua au i ahau!`,
        english: "Let me become one with the land."
      }
    }
  }
},

/* ================= AUSTRALIA ================= */
{
  id: "australia",
  name: "Australia",
  code: "au",
  colors: ["#00008B", "#FF0000", "#FFFFFF"],
  anthem: {
    title: "Advance Australia Fair",
    audioUrl: "/audio/anthems/australian-anthem.mp3",
    lyrics: {
      original: `Australians all let us rejoice,
For we are one and free;
We've golden soil and wealth for toil;
Our home is girt by sea;
Our land abounds in nature's gifts
Of beauty rich and rare;
In history's page, let every stage
Advance Australia Fair.
In joyful strains then let us sing,
Advance Australia Fair.

Beneath our radiant Southern Cross
We'll toil with hearts and hands;
To make this Commonwealth of ours
Renowned of all the lands;
For those who've come across the seas
We've boundless plains to share;
With courage let us all combine
To Advance Australia Fair.
In joyful strains then let us sing,
Advance Australia Fair.`,
      english: `English (same language)`
    },
    history: `Written in 1878, adopted in 1984.

🏉 Rugby Context:
Typically only the first verse is sung.`,
    facts: [
      "1878 origin",
      "Adopted 1984",
      "Updated 2021",
      "Second verse rarely sung"
    ]
  }
},

/* ================= ARGENTINA ================= */
{
  id: "argentina",
  name: "Argentina",
  code: "ar",
  colors: ["#74ACDF", "#FFFFFF", "#F6B40E"],
  anthem: {
    title: "Himno Nacional Argentino",
    audioUrl: "/audio/anthems/argentina-anthem.mp3",
    lyrics: {
      original: `Oíd, mortales, el grito sagrado:
¡Libertad! ¡Libertad! ¡Libertad!
Oíd el ruido de rotas cadenas,
ved en trono a la noble igualdad.
Ya su trono dignísimo abrieron
las Provincias Unidas del Sud
y los libres del mundo responden:
¡Al gran pueblo argentino, salud!

Sean eternos los laureles
que supimos conseguir.
Coronados de gloria vivamos
¡o juremos con gloria morir!`,
      english: `Hear, mortals, the sacred cry: Freedom!`
    },
    history: `Written in 1813.

🏉 Rugby Context:
Final line is shouted passionately.`,
    facts: [
      "1813 origin",
      "Shortened version used",
      "Iconic final line"
    ]
  }
},

/* ================= JAPAN ================= */
{
  id: "japan",
  name: "Japan",
  code: "jp",
  colors: ["#BC002D", "#FFFFFF"],
  anthem: {
    title: "Kimigayo",
    audioUrl: "/audio/anthems/japanese-anthem.mp3",
    lyrics: {
      original: `君が代は
千代に八千代に
細石の
巌となりて
苔の生すまで`,
      english: `May your reign continue for thousands of generations.`
    },
    history: `Ancient poem-based anthem.

🏉 Rugby Context:
Short and symbolic.`,
    facts: [
      "Very short anthem",
      "Ancient origin"
    ]
  }
},

/* ================= ENGLAND ================= */
{
  id: "england",
  name: "England",
  code: "gb-eng",
  colors: ["#FFFFFF", "#C8102E"],
  anthem: {
    title: "God Save the King / Swing Low",
    audioUrl: "/audio/anthems/england-anthem.mp3",
    lyrics: {
      original: `God save our gracious King!
Long live our noble King!
God save the King!

Swing low, sweet chariot,
Coming for to carry me home.`,
      english: `Traditional anthem + rugby spiritual.`
    },
    history: `Historic monarchy anthem.

🏉 Rugby Context:
Swing Low defines the atmosphere.`,
    facts: [
      "Dual anthem culture",
      "Fan-driven tradition"
    ]
  }
}

];