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
      original: `--- RUGBY MATCH VERSION ---
Nkosi sikelel' iAfrika,
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
In South Africa our land.

--- ADDITIONAL / STRUCTURE ---
(Full multilingual structure retained across isiXhosa, isiZulu, Sesotho, Afrikaans, English sections)`,
      english: `God bless Africa and protect her people... (aligned meaning across all sections)`
    },
    history: `Adopted in 1997, the South African anthem uniquely combines "Nkosi Sikelel’ iAfrika" (1897 hymn by Enoch Sontonga) and "Die Stem van Suid-Afrika." It represents reconciliation after apartheid and symbolizes unity across languages and cultures.

🏉 Rugby Context:
At Springbok matches, the anthem is a powerful unifying moment, sung across linguistic lines, reflecting national identity.`,
    facts: [
      "Only anthem in the world with five languages",
      "Combines two historically opposing songs",
      "Symbol of post-apartheid unity"
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
      original: `--- RUGBY MATCH VERSION (ENGLISH) ---
God of nations at Thy feet,
In the bonds of love we meet,
Hear our voices, we entreat,
God defend our free land.
Guard Pacific's triple star,
From the shafts of strife and war,
Make her praises heard afar,
God defend New Zealand.

--- ADDITIONAL (MĀORI) ---
E Ihowā Atua,
O ngā iwi mātou rā,
Āta whakarangona,
Me aroha noa.`,
      english: `English and Māori versions express a prayer for protection, unity, and peace for New Zealand.`
    },
    history: `Originally written as a poem in 1870 and adopted as a national anthem in 1977, New Zealand uniquely maintains two official anthems: "God Save the King" and "God Defend New Zealand."

🏉 Rugby Context:
The anthem is immediately followed by the haka, creating one of the most iconic pre-match rituals in world sport.`,
    facts: [
      "One of only two countries with two official anthems",
      "Māori verse often sung first",
      "Anthem + haka sequence is globally iconic"
    ],
    haka: {
      kaMate: {
        title: "Ka Mate",
        description: "Traditional haka by Te Rauparaha (early 19th century)",
        original: `Ka mate! Ka mate!
Ka ora! Ka ora!
Ka mate! Ka mate!
Ka ora! Ka ora!
Tēnei te tangata pūhuruhuru
Nāna nei i tiki mai whakawhiti te rā!
Ā upane! Ka upane!
Ā upane! Ka upane!
Ā upane kaupane whiti te rā!`,
        english: `It is death! It is death!
It is life! It is life!
This is the hairy man who brought the sun and caused it to shine!
One step upward! Another step upward!
A final step upward, the sun shines!`
      },
      kapaOPango: {
        title: "Kapa o Pango",
        description: "Modern haka introduced in 2005 for the All Blacks",
        original: `Kapa o Pango kia whakawhenua au i ahau!
Hi aue, hi!
Ko Aotearoa e ngunguru nei!
Au, au, aue hā!
Ko Kapa o Pango e ngunguru nei!
Au, au, aue hā!
I ahaha!`,
        english: `Let me become one with the land!
This is our land that roars!
This is the All Blacks who roar!`
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
      original: `--- RUGBY MATCH VERSION (2021 OFFICIAL) ---
Australians all let us rejoice,
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
Advance Australia Fair.

--- ADDITIONAL / HISTORICAL (1878) ---
Australia's sons let us rejoice,
For we are young and free;
We've golden soil and wealth for toil,
Our home is girt by sea;
Our land abounds in Nature's gifts
Of beauty rich and rare;
In hist'ry's page, let ev'ry stage
Advance Australia fair.
In joyful strains then let us sing,
Advance Australia fair.`,
      english: `Same language`
    },
    history: `Written by Peter Dodds McCormick in 1878, the anthem replaced "God Save the Queen" in 1984. In 2021, "young and free" was changed to "one and free" to better reflect Indigenous history.

🏉 Rugby Context:
Sung with strong crowd participation before Wallabies matches.`,
    facts: [
      "Updated in 2021 to reflect inclusivity",
      "Originally a patriotic song before becoming anthem",
      "Second verse often less widely known"
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
      original: `--- RUGBY MATCH VERSION ---
Oíd, mortales, el grito sagrado:
¡Libertad! ¡Libertad! ¡Libertad!
Oíd el ruido de rotas cadenas,
ved en trono a la noble igualdad.

Sean eternos los laureles
que supimos conseguir.
Coronados de gloria vivamos
¡o juremos con gloria morir!

--- ADDITIONAL / HISTORICAL ---
(The original 1813 version contained multiple anti-colonial verses, now omitted in modern performances)`,
      english: `Hear, mortals, the sacred cry:
Freedom! Freedom! Freedom!`
    },
    history: `Written in 1813 during Argentina’s independence movement. The modern version is shortened to remove politically sensitive verses.

🏉 Rugby Context:
The final chorus is sung with exceptional passion by players and fans alike.`,
    facts: [
      "Originally much longer and politically charged",
      "Shortened officially in 1900",
      "One of the most passionately sung anthems in rugby"
    ]
  }
},

/* ================= FIJI ================= */
{
  id: "fiji",
  name: "Fiji",
  code: "fj",
  colors: ["#002868", "#CE1126"],
  anthem: {
    title: "Meda Dau Doka",
    audioUrl: "/audio/anthems/fiji-anthem.mp3",
    lyrics: {
      original: `--- RUGBY MATCH VERSION (FIJIAN) ---
Meda dau doka ka vinakata na vanua
E ra sa dau tiko kina na savasava
Rawa tu na gauna ni sautu na veilomani
Biu na i tovo tawa savasava

Me bula ga ko Viti ka me toro ga ki liu
Me ra turaga vinaka ko ira na i liuliu

--- ENGLISH VERSION ---
Blessing grant, oh God of nations, on the isles of Fiji,
As we stand united under noble banner blue,
And we honour and defend the cause of freedom ever,
Onward march together, God bless Fiji.

--- CHORUS ---
For Fiji, ever Fiji, let our voices ring with pride,
For Fiji, ever Fiji, her name hail far and wide,
A land of freedom, hope and glory, to endure whatever befall,
May God bless Fiji, forever more!

--- VERSE II ---
Blessing grant, oh God of nations, on the isles of Fiji,
Shores of golden sand and sunshine, happiness and song,
Stand united, we of Fiji, fame and glory ever,
Onward march together, God bless Fiji.

--- CHORUS ---
For Fiji, ever Fiji, let our voices ring with pride,
For Fiji, ever Fiji, her name hail far and wide,
A land of freedom, hope and glory, to endure whatever befall,
May God bless Fiji, forever more!`,
      english: `Fijian and English versions express unity, leadership, and national pride.`
    },
    history: `Adopted at independence in 1970. The anthem exists in both Fijian and English forms.

🏉 Rugby Context:
Players sing in Fijian first to honour heritage.`,
    facts: [
      "Dual-language anthem",
      "Fijian-first tradition since 2023",
      "Strong cultural identity in rugby"
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
  original: `--- RUGBY MATCH VERSION (KANJI) ---
君が代は
千代に八千代に
細石の
巌となりて
苔の生すまで

--- ROMAJI ---
Kimigayo wa
Chiyo ni yachiyo ni
Sazare-ishi no
Iwao to narite
Koke no musu made`,

  english: `--- ENGLISH TRANSLATION ---
May your reign
Continue for a thousand, eight thousand generations,
Until the tiny pebbles
Grow into massive boulders
Lush with moss.`
},
    history: `Kimigayo is one of the oldest national anthems in the world, based on a Heian-period waka poem (10th century). It was formally adopted in 1999.

🏉 Rugby Context:
Its brevity makes it one of the shortest pre-match anthems in rugby, yet its cultural weight is immense.`,
    facts: [
      "One of the shortest national anthems globally",
      "Derived from a classical Japanese poem",
      "Carries over 1,000 years of cultural history"
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
    title: "God Save the King",
    audioUrl: "/audio/anthems/england-anthem.mp3",
    lyrics: {
      original: `--- RUGBY MATCH VERSION ---
God save our gracious King!
Long live our noble King!
God save the King!
Send him victorious,
Happy and glorious,
Long to reign over us,
God save the King!

--- ADDITIONAL VERSES ---
O Lord our God arise,
Scatter his enemies,
And make them fall;
Confound their politics,
Frustrate their knavish tricks,
On Thee our hopes we fix,
God save us all!

Thy choicest gifts in store
On him be pleased to pour;
Long may he reign;
May he defend our laws,
And ever give us cause,
To sing with heart and voice,
God save the King!

--- SWING LOW, SWEET CHARIOT ---
Swing low, sweet chariot,
Coming for to carry me home,
Swing low, sweet chariot,
Coming for to carry me home.

I looked over Jordan, and what did I see,
Coming for to carry me home,
A band of angels coming after me,
Coming for to carry me home.

If you get there before I do,
Coming for to carry me home,
Tell all my friends I'm coming too,
Coming for to carry me home.`,
      english: `Same language`
    },
    history: `Dating back to the 18th century, "God Save the King" is one of the oldest national anthems still in use.

🏉 Rugby Context:
At Twickenham, only the first verse is sung, followed by the famous crowd anthem "Swing Low, Sweet Chariot."`,
    facts: [
      "One of the oldest national anthems in the world",
      "Lyrics change depending on monarch gender",
      "Swing Low became rugby anthem in 1988"
    ]
  }
},

/* ================= IRELAND ================= */
{
  id: "ireland",
  name: "Ireland",
  code: "ie",
  colors: ["#169B62", "#FF883E", "#FFFFFF"],
  anthem: {
    title: "Ireland’s Call",
    audioUrl: "/audio/anthems/ireland-anthem.mp3",
    lyrics: {
      original: `--- RUGBY MATCH VERSION (IRELAND'S CALL) ---
Come the day and come the hour,
Come the power and the glory,
We have come to answer our country's call,
From the four proud provinces of Ireland.

Ireland, Ireland!
Together standing tall,
Shoulder to shoulder,
We'll answer Ireland's Call!

From the mighty Glens of Antrim,
From the rugged hills of Galway,
From the walls of Limerick and Dublin Bay,
From the four proud provinces of Ireland.

Ireland, Ireland!
Together standing tall,
Shoulder to shoulder,
We'll answer Ireland's Call!

--- ADDITIONAL (AMHRÁN NA BHFIANN) ---
Sinne Fianna Fáil,
atá faoi gheall ag Éirinn,
Buíon dár slua
thar toinn do ráinig chugainn,
Faoi mhóid bheith saor
Seantír ár sinsear feasta,
Ní fhágfar faoin tíorán ná faoin tráill.`,
      english: `--- ENGLISH TRANSLATION (AMHRÁN NA BHFIANN) ---
Soldiers are we,
whose lives are pledged to Ireland...`
    },
    history: `Ireland’s Call was introduced in 1995 to represent both Northern Ireland and the Republic of Ireland.

🏉 Rugby Context:
At home matches, both anthems are played; away matches use Ireland’s Call only.`,
    facts: [
      "Only rugby team representing two nations",
      "Uses two anthems depending on venue",
      "Symbol of unity across the island"
    ]
  }
},

/* ================= FRANCE ================= */
{
  id: "france",
  name: "France",
  code: "fr",
  colors: ["#002395", "#FFFFFF", "#ED2939"],
  anthem: {
    title: "La Marseillaise",
    audioUrl: "/audio/anthems/french-anthem.mp3",
    lyrics: {
      original: `--- RUGBY MATCH VERSION ---
Allons enfants de la Patrie,
Le jour de gloire est arrivé !
Contre nous de la tyrannie,
L'étendard sanglant est levé !

Aux armes, citoyens !
Formez vos bataillons !
Marchons, marchons !
Qu'un sang impur
Abreuve nos sillons !

--- ADDITIONAL VERSES ---
Que veut cette horde d'esclaves,
De traîtres, de rois conjurés ?`,
      english: `--- ENGLISH TRANSLATION (VERSE 1) ---
Arise, children of the Fatherland,
The day of glory has arrived!
Against us, tyranny's
Bloody standard is raised!
Do you hear, in the countryside,
The roar of those ferocious soldiers?
They come right into our arms
To cut the throats of our sons, our wives!

--- CHORUS ---
To arms, citizens!
Form your battalions!
Let's march, let's march!
Let impure blood
Water our furrows!`
    },
    history: `Written in 1792 during the French Revolution, it became a symbol of resistance and liberty.

🏉 Rugby Context:
Players link arms and sway while singing, creating one of rugby’s most iconic visuals.`,
    facts: [
      "One of the most recognizable anthems globally",
      "Originated during the French Revolution",
      "Known for emotional delivery in rugby"
    ]
  }
},

/* ================= WALES ================= */
{
  id: "wales",
  name: "Wales",
  code: "gb-wls",
  colors: ["#D21034", "#FFFFFF", "#008B48"],
  anthem: {
    title: "Hen Wlad Fy Nhadau",
    audioUrl: "/audio/anthems/welsh-anthem.mp3",
    lyrics: {
      original: `--- RUGBY MATCH VERSION (WELSH) ---
Mae hen wlad fy nhadau yn annwyl i mi,
Gwlad beirdd a chantorion, enwogion o fri;
Ei gwrol ryfelwyr, gwladgarwyr tra mâd,
Tros ryddid gollasant eu gwaed.

Gwlad, gwlad, pleidiol wyf i'm gwlad.

--- ADDITIONAL (ENGLISH) ---
The land of my fathers is dear to me...`,
      english: `--- ENGLISH TRANSLATION (FULL) ---
The land of my fathers is dear to me,
Land of bards and singers, famous men of renown;
Her brave warriors, fine patriots,
For freedom shed their blood.

--- CHORUS ---
Nation, nation, I am loyal to my nation.
While the sea is a wall to the beloved land,
Oh may the ancient language endure.

Mountainous old Wales, paradise of the bard,
Every valley, every cliff to my sight is beautiful;
Through patriotic feeling, so charming is the murmur
Of her streams, her rivers, to me.

--- CHORUS ---
Nation, nation, I am loyal to my nation.
While the sea is a wall to the beloved land,
Oh may the ancient language endure.

If the enemy oppressed my land under his foot,
The old language of the Welsh is as alive as ever,
The muse was not hindered by the cruel hand of treachery,
Nor the melodious harp of my land.

--- CHORUS ---
Nation, nation, I am loyal to my nation.
While the sea is a wall to the beloved land,
Oh may the ancient language endure.`
    },
    history: `Written in 1856, it is one of the oldest national anthems in Europe.

🏉 Rugby Context:
Sung a cappella by the crowd, creating a powerful stadium atmosphere.`,
    facts: [
      "First anthem sung at a sporting event (1905)",
      "Famous for a cappella performance",
      "Welsh crowd known as 'the singing nation'"
    ]
  }
},

/* ================= SCOTLAND ================= */
{
  id: "scotland",
  name: "Scotland",
  code: "gb-sct",
  colors: ["#005EB8", "#FFFFFF"],
  anthem: {
    title: "Flower of Scotland",
    audioUrl: "/audio/anthems/scotland-anthem.mp3",
    lyrics: {
      original: `--- RUGBY MATCH VERSION (FLOWER OF SCOTLAND) ---
O Flower of Scotland,
When will we see your like again,
That fought and died for,
Your wee bit hill and glen,
And stood against him,
Proud Edward's army,
And sent him homeward,
Tae think again.

--- CHORUS ---
The hills are bare now,
And autumn leaves lie thick and still,
O'er land that is lost now,
Which those so dearly held,
That stood against him,
Proud Edward's army,
And sent him homeward,
Tae think again.

--- VERSE 2 ---
Those days are past now,
And in the past they must remain,
But we can still rise now,
And be the nation again,
That stood against him,
Proud Edward's army,
And sent him homeward,
Tae think again.

--- CHORUS ---
The hills are bare now,
And autumn leaves lie thick and still,
O'er land that is lost now,
Which those so dearly held,
That stood against him,
Proud Edward's army,
And sent him homeward,
Tae think again.

--- ADDITIONAL (SCOTLAND THE BRAVE) ---
Hark when the night is falling,
Hear! Hear the pipes are calling,
Loudly and proudly calling,
Down through the glen.

--- CHORUS ---
Towering in gallant fame,
Scotland my mountain hame,
High may your proud standards gloriously wave,
Scotland the brave.`,
      english: `Same language (Scots/English)`
    },
    history: `Written by Roy Williamson in 1967 and adopted as Scotland’s rugby anthem in 1990, "Flower of Scotland" references the Battle of Bannockburn (1314), where Scottish forces defeated Edward II of England.

🏉 Rugby Context:
At Murrayfield, the anthem is sung with intense emotion. The crowd famously roars the final line "and sent him homeward, tae think again."`,
    facts: [
      "References historic victory at Bannockburn",
      "Replaced 'Scotland the Brave' for rugby use",
      "Crowd participation is one of the loudest in world rugby"
    ]
  }
},

/* ================= ITALY ================= */
{
  id: "italy",
  name: "Italy",
  code: "it",
  colors: ["#009246", "#FFFFFF", "#CE2B37"],
  anthem: {
    title: "Il Canto degli Italiani",
    audioUrl: "/audio/anthems/italy-anthem.mp3",
    lyrics: {
      original: `--- RUGBY MATCH VERSION (VERSE 1) ---
Fratelli d'Italia,
l'Italia s'è desta,
dell'elmo di Scipio
s'è cinta la testa.
Dov'è la Vittoria?
Le porga la chioma,
ché schiava di Roma
Iddio la creò.

--- CHORUS ---
Stringiamci a coorte,
siam pronti alla morte.
Siam pronti alla morte,
l'Italia chiamò.
Stringiamci a coorte,
siam pronti alla morte.
Siam pronti alla morte,
l'Italia chiamò!
Sì!

--- ADDITIONAL VERSES ---
Noi fummo da secoli
calpesti, derisi,
perché non siam popolo,
perché siam divisi.

Uniamoci, amiamoci,
l'unione e l'amore
rivelano ai popoli
le vie del Signore.`,
      english: `--- ENGLISH TRANSLATION ---
Brothers of Italy,
Italy has awakened,
With Scipio's helmet
She has bound her head.

--- CHORUS ---
Let us join in a cohort,
We are ready for death,
Italy has called!
Yes!`
    },
    history: `Written in 1847 by Goffredo Mameli during the Italian unification movement (Risorgimento). It became the national anthem in 1946.

🏉 Rugby Context:
The Italian team, known as the Azzurri, sing the anthem with great passion. The final "Sì!" is shouted loudly by players and fans.`,
    facts: [
      "Strongly tied to Italian unification",
      "Named after opening line 'Fratelli d’Italia'",
      "Final 'Sì!' is iconic in rugby stadiums"
    ]
  }
}

];
