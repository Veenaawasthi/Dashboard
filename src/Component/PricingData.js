// pricing.js

const pricingData = {
  cities: {
    'Tokyo': true,
    'Kobe': true,
    'Kamakura Yokohama': true,
    'Osaka': true,
    'Kyoto': true,
    'Nara' : true,
    'Hiroshima' : true,
    'Nagoya' : true
  },
  services: {
    'Tokyo': {
      //Central Tokyo
      'Tsukiji Outer Market(Fish)': 0,
      'Akihabara': 0,
      'Koishikawa Korakuen(Garden)': 300,
      'Hama Rikyu (Hamarikyu)(Garden) ': 300,
      'Imperial Palace East Gardens': 0,
      //Tokyo Imperial Palace :	Closed
      'Ginza Japan’s premier shopping district': 0,
      'Nakamise Dori' : 0,
      'Sumo Museum' : 0,
      'Happoen Garden(Tea Ceremony)' : 0,
      'Rikugien Garden(Tea Ceremony)': 0,
      'Hotel Chinzanso (Chinzanso Garden)(Tea Ceremony)': 0,
      'Chidorigafuchi Boat Ride(Garden)' : 0,
      //North Tokyo
      'Tokyo Skytree' : 0,
      'First observatory' : 2300,
      'Both observatories' : 3400,
      'Tokyo Solamachi' : 1500,
      'Sumida Aquarium' : 2300,
      'Asakusa Kannon Temple' : 0,
      'Sensoji Temple' : 0,
      'Rikugien Garden' : 300,
      'Ueno Park Cheery Blossom(Garden)' : 0,
      'Koishikawa Botanical Garden' : 500,
      //West Tokyo	
      'Shibuya	' : 0,
       'Shinjuku	' : 0,
      //  a. Shinjuku Skyscraper District - restaurants	
      // b. Kabukicho - restaurants & bars	
      // c. Golden Gai - night life	
	
      'Tokyo Metropolitan Government Office'	: 0,
      'Shinjuku Gyoen(Garden)'	:500,
      'Shinjuku Central Park(Garden)':	0,
      'Meiji Shrine': 0,
      'Harajuku - shopping' :	0,
      'Yoyogi Park(Garden)': 0,
      'Metropolitan Government Building'	: 0,
      'Nakano Broadway - shopping & anime' :	0,
      'Kagurazaka - shopping'	: 0,
      'Daikanyama - Shibuya High neighborhood': 0,
      //South Tokyo	
      // Odaiba	
      // a. Fuji TV Building	700
      // b. Decks Tokyo Beach	Free
      // c. Aquacity Odaiba	Free
      // d. DiverCity Tokyo Plaza (Gundam)	Free
      // e. Rainbow Bridge	Free
      // f. Miraiken -  National Museum of Emerging Science & Innovation	630
      // g. Small Worlds Tokyo	2700
        
     'Institute for Nature Study(Garden)':	320,
      'Roppongi - Multifaceted district in central Tokyo(Night Life)'	: 0,
      'Roppongi Hills - shopping & entertainment(Fish)' : 0,
      'Toyosu Market' : 0,
      "Tokyo Tower 	Main Deck"	: 1200,
      'Tokyo Tower Both Decks(Graveyard)'	:3000,
      'Sengakuji Temple':	0,
      'Sengakuji Museum' :	500,
      'Zojoji Temple' :	0,
      'Kyu Shiba Rikyu Garden'	: 150,
      // Tokyo Water Bus	
      // a. Asakusa-Odaiba Direct Line	1720
      // b. Sumida River Line	1040
      // c. Odaiba Line	520
      // d. Mizube Cruise Line	1200
      // Shinagawa	Free(Station)
      'Maxell Aqua Park Shinagawa' 	: 2300,
      // Toyosu	3 - 7 K
      // a. Lalaport Toyosu is one of the largest shopping malls in central Tokyo	
      // b. Kidzania, an indoor theme park for children (aged 3-15) to play-act as different professionals like cooks or pilots.	
      
      //Outlying		
      //Tokyo DisneySea		
      
          
      // Tokyo Disneyland		
      // Theme Lands		
      // a. World Bazaar		
      // b. Tomorrowland		
      // c. Toontown		
      // d. Fantasyland		
      // e. Critter Country		
      // f. Westernland		
      // g. Adventureland		
          
      // Shibamata Temple	Free	
      // Shibamata Wood Carving Gallery	400	
      // Ghibli Museum	1000 - 1500	
      // Mount Mitake	
      	
      
   },

    'Kobe': {
      'Kobe Port Tower ': 700,
      'Kobe Earthquake Memorial Museum': 600,
      'Akashi Kaikyo Bridge(Longest) ': 0,
      'Earthquake Memorial Museum': 600,
      'Shin-Kobe Ropeway' : 0,
      //a. round trip and admission to herb garden : 1500
      //b. b. one way and admission to herb garden : 950
       'Sorakuen Garden' : 300,
       'Mount Rokko' : 0,
       'Kitano-cho' : 650 -3000,
       'Sake Breweries ' : 0,
       'Akashi Kaikyo Bridge' : 300,
       'Hyogo Prefectural Museum' : 500,
       'Kobe City Museum' : 300,
       'Meriken Park' : 900,
       //a. Kobe Maritime Museum
       //b. Kawasaki Good Times World
      'Kobe Chinatown ' : 0,

      //       Arima Onsen	
      // The following is a list of some hot spring baths around Arima Onsen that are open to day trip visitors:	
      'Kin no Yu	' : 650,
      'Gin no Yu'	: 550,
      'Taiko no Yu'	: 2600,
      // Goshobo	
      // a. Daytime Admission	1650
      // b. Overnight Stay with 2 meals	25000 PP
	
	
      'Kobe Harborland	' : 0,
      // The most prominent shopping complex in Kobe Harborland is Umie which consists of three parts: Mosaic, South Mall and North Mall.	
     // Gaslight Street, is lit up in the evenings by old-fashioned gas street lamps and electric lights.	
     // Renga Soko, a small collection of 19th-century brick warehouses which remain from a former dockyard that used to cover the waterfront. 	

    },
    'Kamakura Yokohama': {
     ' Great Buddha of Kamakura'	:300,
      'Hokokuji Temple(Zen)':	300,
      'Hase Temple (Hasedera)': 400,
     ' Enoshima - Pleasantly island near Kamakura	' : 0,
      // a. Enoshima Shrine	200
      // b. Samuel Cocking Garden and Sea Candle	500
      // c. Iwaya Caves	500
      // d. Enoshima Daishi	Free
      // e. Love Bell	
      'Enoshima Aquarium': 2500,
        
     ' Ryukoji Temple	' :0,
      'Tsurugaoka Hachimangu Shrine': 200,
      'Engakuji Temple(Zen)' :	500,
      'Kenchoji Temple(Zen)': 500,
      'Zeniarai Benten Shrine (- wash money)':	0,
      
      // Yokohama Japan’s second largest city	
      'Sankeien Garden'	:700,
      // Minato Mirai 21	
      // a. Sky Garden Observatory	1000
      // b. Cosmo World(Themen Park)	: 0, attractions cost 300-900 yen each
      // c. Manyo Club(Spa)	: 2750 (many services require additional fees)
      // d. Yokohama Air Cabin(Cable Car)	: OW 1000 RT 1800
      "'Queen's Square(Shopping)" : 0,
      'Landmark Plaza(Shopping)' : 0,
      'World Porters(Shopping)':	0,
        
      'Nippon Maru and Yokohama Port Museum(Ship)	': 800,
      'Only Nippon Maru':	400,
     ' Yokohama Port Museum'	:500,
      
    },
    'Osaka': {
      // 'Universal Studios Japan': 8400 - 9400,
      // Express Passes allow holders to skip lines for selected rides and are available for four rides (between 6,800 and 18,800 yen depending on the rides and day) or seven rides (between 10,800 and 23,800 yen depending on the rides and day) online in advance or on the day at the entrance gate and inside the park. Express Passes may sell out on busy days.
      // Note that there is a limit on how many people can visit the popular Super Nintendo World each day. Guaranteed access is possible by purchasing in advance an Express Pass (see above) or travel package that includes entry to the Super Nintendo World. Otherwise, it is possible to get a "numbered ticket" at the park on the day of your vist via the official app or at a ticket office. On busy days when the limit of visitors is exceeded, it is possible to apply for a "admission lottery ticket" instead.

      'Minami (Namba)(Shopping)': 0,
      'Osaka Aquarium Kaiyukan': 2400,
      'Sumiyoshi Taisha': 0,
      'Osaka Castle (Osakajo)' : 600,
      //Shitennoji Temple: 300 Garden ,500 treasure house
      'Kita (Umeda)' : 0,
      'Abeno Harukas(Skyscraper )' : 1500,
      'Umeda Sky Building(Skyscraper) - The 173 meter tall building consists of two towers that are connected with each other by the (Floating Garden Observatory) on the 39th floor.': 1500,
      'Asahi Beer Suita Brewery' : 1000,
      'Tempozan Ferry' : 800,
      'Tonbori River Cruise' : 1200,
      'Grand Front Osaka(Shooping)' : 0,
      // 'Osaka Aqua Liner' : 55 minutes 1700 RT 850 OW
      //Between March 28th and April 15th there is a higher spring fare of 2,000 yen for adults and 1,000 yen for children.
      'Minoo Park (Park)' :0,
    },

    'Kyoto': {
      //Central Kyoto	
      'Nijo Castle (Nijojo)(UNESCO)':	800,
      'Kyoto Railway Museum':	1500,
      'Nishiki Market(Food)' : 0,
      'Sento Imperial Palace(Palace Garden)' : 0,
      'Kyoto Imperial Palace' : 0,
      'Pontocho - riverside dining': 0,
      'Honganji Temples' : 0,	
      'Kyoto Aquarium':	2200,
      'Kyoto Tower':	800,

      //Eastern Kyoto	
      // Kiyomizudera Temple	400
      // Higashiyama District	Free
      // a. Kiyomizudera Temple	400
      // b. Kodaiji Temple	600
      // c. Yasaka Pagoda	500
      // d. Yasaka Shrine	Free
      // e. Maruyama Park (Cheery blossom)	Free
        
      'Ginkakuji (Silver Pavilion)':	500,
      'Sanjusangendo':	600,
      //Nanzenji Temple(Zen)	
      // a. Sanmon Gate	600
      // b. Hojo	600
      // c. Nanzenin	400
      // d. Konchi-in Temple	400
      // e. Tenjuan Temple	600
        
      'Kyoto National Museum': 700,
      'Gion - Hanami-koji & Shirakawa Area ': 0,
      'Gion Corner (T ceremony + dance)(Giesha)':	5500,
      'Kenninji Temple(Oldest Zen)':	600,
      'Philosopher’s Path(Cherry Bloossom)	': '',
      'Kodaiji Temple(Rock Garden)':	900,
      'Heian Shrine(Cherry + Torry Gate)': 0,
      'Maruyama Park(Cherry Bloossom)': 0,

      // Southern Kyoto	
      'Fushimi Inari Shrine': 0,
      // Daigoji Temple	
      // a. Sanboin & Shimo Daigo	1000
      // b. Sanboin only	500
      // c. Reihokan Museum	500
      // d. Reihokan Garden	Free
      // e. Kami Daigo	600,
        
      // Tofukuji Temple(Red Yellow)	
      // a. Tsutenkyo Bridge and Kaisando Hall	600
      // b. Hojo and gardens	500
      // Both	1000
        
      'Toji Temple - Pagoda':	800,
      'Fushimi Sake breweries':	600,

      //North Kyoto	
      'Kinkakuji (Golden Pavilion)':	500,
      'Shugakuin Imperial Villa(Garden)':	0,
      'Ninnaji Temple':	800,
      'Ryoanji Temple(Zen Rock)':	500,
      'Daitokuji Temple':	400,

      // Western Kyoto	
      // Arashiyama and Sagano	
      // a. Togetsukyo Bridge	
      // b. Bamboo Groves	
      // c. Okochi Sanso Villa	1000
      // d. Monkey Park Iwatayama	550
      // e. Saga-Toriimoto Preserved Street	
      // f. Tenryuji Temple	500+300
      // g. Daikakuji Temple	600
      // h. Jojakkoji Temple	500
      // i. Nisonin Temple	500
      // j. Gioji Temple	600
      // k. Adashino Nenbutsuji Temple	500
      // l. Otagi Nenbutsuji Temple	300,
        
      'Sagano Scenic Railway'	:900,
        
      'Kokedera (Moss Temple)':	4000,
      'Katsura Imperial Villa(Garden)':	1000,
     ' Yoshiminedera Temple':	500,
      'Daikakuji Temple':	500+300,
      'Tenryuji Temple(Zen)':	500+300,
      'Hozugawa River Cruise': 4100,
      'Sagano Scenic Railway(Train)': 880,
      //880 yen one way between Torokko Saga and Torokko Kameoka stations	
        
      'Suntory Yamazaki Distillery':	1000,  
      
    },


    'Nara' : {
      'Todaiji Temple' : 600,
      'Nara Park (Deer)' : 0,
      'Kasuga Taisha Shrine' : 0,
      'Kasuga Taisha Botanical Park' :500,
      'Horyuji Temple': 1500,
      'Isuien Garden' : 1200,
      'Toshodaiji Temple' : 1000,
      'Yakushiji Temple' : 1100,
      'Nara National Museum' : 700,
      'Heijo Palace' : 0,
      'Mount Wakakusayama' : 150,
      'Ikoma Sanjo Amusement Park' : 0,
      // .a. Kintetsu Ikoma Cable Car :360
      // b. Hozanji Temple : 290
      // c. c. Shigisan Chogosonshi-ji (tiger temple) : 300
    },

    'Hiroshima' : {
      'Peace Memorial Park ' : 200,
      'Peace Memorial Museum' : 200,
      'Mazda Museum' : 0,
      'Shukkeien Garden' : 260,
      'Downtown Hiroshima' : 0,
      // 'Hiroshima Castle ' : 0 - 300,
      // 'Miyajima	'
      'Itsukushima Shrine' : 300,
      'Mount Misen' : 0,
      // 'Miyajima Ropeway @ Misen' : '1000 OW 2000RT'
      'Daisho-in Temple @ the foot of Mt Misen' : 0,
      'Senjokaku Hall' : 100,
      'Museum of History' : 300,
      'Miyajima Aquarium' : 1420
    },

    'Nagoya' : {
      'Railway Museum' : 1000,
      'Nagashima Resort(Theme Park)' : 6800,
      'Nagoya Castle' : 500,
      'Korankei' : 300,
      'Legoland' : 7400,
      'Ghibli Park' : 3500,
    }
    },

  modes: {
    'Bus': 15,
    'Train': 25,
    'Car Rental': 50,
    'Taxi': 30,
  },

  meals: {
    'Breakfast': 100,
    'Lunch': 200,
    'Dinner': 300,
    'Snack': 50,
  },

  hotels: {
    'Budget': 500,
    'Standard': 100,
    'Deluxe': 200,
    'Luxury': 300,
  },

  flights: {
    'Economy': 500,
    'Business': 1000,
    'First Class': 2000,
  },
};

export default function getPricingData() {
  return pricingData;
}
