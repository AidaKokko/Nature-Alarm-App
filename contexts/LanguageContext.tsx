import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'fi' | 'en';

interface Service {
  title: string;
  subtitle: string;
  description: string;
  details: string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getService: (serviceId: string) => Service;
  getAllServiceIds: () => string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  fi: {
    // Navigation
    hq: 'HQ',
    challenge: 'Haaste',
    setAlarm: 'Aseta Hälytys',
    myGarden: 'Minun Puutarha',
    myAccount: 'Tilini',
    
    // HQ Screen
    welcome: 'Tervetuloa Ulkohälytiniin',
    ekokumppanitServices: 'Ekokumppanit Oy palvelut',
    environmentalAwareness: 'Ympäristötietoisuus',
    weatherForecast: 'Sääennuste',
    
    // Account Screen
    helloNotSignedIn: 'Hei rakas, et ole kirjautunut sisään.',
    signInWithApple: 'Kirjaudu sisään Applen avulla',
    signInWithGoogle: 'Kirjaudu sisään Googlen avulla',
    signInWithEmail: 'Kirjaudu sisään sähköpostilla',

    // Environmental Awareness
    environmentalAwarenessTitle: 'YMPÄRISTÖTIETOISUUS',
    envSection1Title: 'Älä lähesty villieläimiä',
    envSection1Body1:
      "Vaikka joidenkin hyönteisten, sienten ja kasvien käsittely voi olla turvallista, useimpia villieläimiä on parasta tarkkailla etäältä. Kaikista muista do's and don'ts -ohjeista tämä voi olla yksi tärkeimmistä oman turvallisuutesi kannalta.",
    envSection1Body2:
      'Kaikki, jolla on suu, voi purra, ja jopa pienet eläimet kuten oravat tai hiiret voivat aiheuttaa ikävän haavan, jos niitä käsitellään.',
    envSection2Title: 'Älä käytä toistoja lintujen tai muun villieläimistön houkuttelemiseen',
    envSection2Body1:
      'Monissa lintuihin liittyvissä verkkosivuissa ja sovelluksissa on toimintoja, jotka soittavat lintujen laulua tai kutsuja oppimisen tueksi. Kuten jotkut ovat huomanneet, nämä toistot voivat myös houkutella tai ärsyttää lintuja ja tehdä ne helpommin nähtäviksi.',
    envSection2Body2:
      'Vaikka tämä saattaa kuulostaa hyvältä idealta, se voi olla pitkällä aikavälillä hyvin haitallista. Lintujen laulun toisto simuloi tunkeutujaa lintujen reviirillä, mikä voi aiheuttaa niille paljon stressiä. Se olisi samanlaista kuin joku kävelisi kotiisi ja soittaisi ääntä, jossa sanotaan haluttavan ryöstää sinut!',
    envNext: 'seuraava',

    // Weather Forecast
    weatherTitle: 'Sääennuste',
    sunrise: 'Auringonnousu',
    sunset: 'Auringonlasku',
    weatherMorningTitle: 'Aamu',
    weatherMorningBody:
      'Tampereella aamulla lämpötila on 4°C, mutta se voi tuntua 1°C:ltä.',
    weatherMorningBody2:
      'Sateen todennäköisyys on 0 %, ja tuuli puhaltaa 12 km/h.',
    weatherNoonTitle: 'Päivä',
    weatherNoonBody:
      'Päivän aikaan lämpötila on 6°C, mutta se voi tuntua 3°C:ltä. Ilmankosteus on noin 73 % ja tuulen nopeus 15 km/h.',
    weatherEveningTitle: 'Ilta',
    weatherEveningBody:
      'Alkuillasta lämpötila on 6°C.',
    weatherEveningBody2:
      'Sateen todennäköisyys on 0 %, ja tuuli puhaltaa 17 km/h.',
    weatherNightTitle: 'Yö',
    weatherNightBody:
      'Yöllä lämpötila on 5°C ja tuulen nopeus 16 km/h.',
    weatherLocation: 'Tampere, Finland',
    weatherLoading: 'Haetaan säätietoja...',
    weatherError: 'Säätietoja ei voitu hakea.',
    weatherClear: 'Selkeää',
    weatherMostlyClear: 'Melko selkeää',
    weatherOvercast: 'Pilvistä',
    weatherFog: 'Sumua',
    weatherDrizzle: 'Tihkusadetta',
    weatherRain: 'Sadetta',
    weatherSnow: 'Lunta',
    weatherShowers: 'Sadekuuroja',
    weatherThunder: 'Ukkosta',
    weatherUnknown: 'Sää tuntematon',
  },
  en: {
    // Navigation
    hq: 'HQ',
    challenge: 'Challenge',
    setAlarm: 'Set Alarm',
    myGarden: 'My Garden',
    myAccount: 'My Account',
    
    // HQ Screen
    welcome: 'Welcome to Ulkohälytin',
    ekokumppanitServices: 'Ekokumppanit Oy Services',
    environmentalAwareness: 'Environmental Awareness',
    weatherForecast: 'Weather Forecast',
    
    // Account Screen
    helloNotSignedIn: 'Hello dear, you are not signed in.',
    signInWithApple: 'Sign in with Apple',
    signInWithGoogle: 'Sign in with Google',
    signInWithEmail: 'Sign in with email',

    // Environmental Awareness
    environmentalAwarenessTitle: 'ENVIRONMENTAL AWARENESS',
    envSection1Title: 'Don’t approach wildlife',
    envSection1Body1:
      'While handling some insects, fungi, and plants can be safe, most wildlife are best observed from a distance. Among all the other do’s and don’ts, this may be one of the most important for your own personal safety.',
    envSection1Body2:
      'Anything with a mouth can bite, and even small animals like squirrels or mice can inflict a nasty wound if handled.',
    envSection2Title: 'Don’t use playback to attract birds or other wildlife',
    envSection2Body1:
      'Many bird-related websites and apps have features that will play back bird songs or calls to help you learn. However, as some people have learned, these playbacks can also attract or agitate birds, making them easier to see.',
    envSection2Body2:
      'While this might sound like a great idea, it can be very harmful in the long run. Song playback simulates an intruder on a birds’ territory, which can cause them a lot of stress. That would be similar to someone walking into your home and playing audio of a voice saying they wanted to rob you!',
    envNext: 'next',

    // Weather Forecast
    weatherTitle: 'Weather Forecast',
    sunrise: 'Sunrise',
    sunset: 'Sunset',
    weatherMorningTitle: 'Morning',
    weatherMorningBody:
      'The temperature in Tampere early in the morning today is 4°C, but it can feel like 1°C.',
    weatherMorningBody2:
      'The chance of rain is 0%, and the wind blows at 12 km/h.',
    weatherNoonTitle: 'Noon',
    weatherNoonBody:
      'The temperature at noon today is 6°C, but it can feel like 3°C. The humidity will be around 73% with wind speed of 15 km/h.',
    weatherEveningTitle: 'Evening',
    weatherEveningBody:
      'The temperature in the early evening today is 6°C.',
    weatherEveningBody2:
      'The chance of rain is 0%, with wind speed at 17 km/h.',
    weatherNightTitle: 'Night',
    weatherNightBody:
      'The temperature at night today is 5°C with the wind speed of 16 km/h.',
    weatherLocation: 'Tampere, Finland',
    weatherLoading: 'Loading weather...',
    weatherError: 'Unable to load weather data.',
    weatherClear: 'Clear',
    weatherMostlyClear: 'Mostly clear',
    weatherOvercast: 'Overcast',
    weatherFog: 'Fog',
    weatherDrizzle: 'Drizzle',
    weatherRain: 'Rain',
    weatherSnow: 'Snow',
    weatherShowers: 'Showers',
    weatherThunder: 'Thunderstorm',
    weatherUnknown: 'Unknown',
  },
};

const services: Record<Language, Record<string, Service>> = {
  fi: {
    ekokumppanit: {
      title: 'Neuvoo.fi',
      subtitle: 'ILMAINEN JA PUOLUEETON ENERGIA-NEUVONTA',
      description: 'Tarjoaa puolueetonta neuvontaa energiatehokkaasta asumisesta, remontoinnista ja rakentamisesta sekä ajankohtaisia tietoja muun muassa eri energiamuodoista ja lämmityksestä.',
      details: 'Neuvonnan rahoittavat Energiavirasto, Tampereen Energia ja Tampereen kaupunki. Neuvoo.fi – Energianeuvonta, Ekokumppanit Oy:n tytäryhtiö, Tampereen kaupunkiryhmän osa, on osa Motivan koordinoimaa maakunnallista energianeuvontaverkostoa.',
    },
    outdoor: {
      title: 'Outdoorstampere.fi',
      subtitle: 'Tampere urban region outdoor and hiking map service',
      description: 'Palvelu esittelee Tampereen kaupunkiseudun retkeilyreittejä, uimarantoja, nuotiopaikkoja ja muita ulkoiluun liittyviä palveluja ja kohteita kuntarajojen yli.',
      details: 'Palvelun lähtökohtana on ollut koota kaikki Tampereen, Kangasalan, Lempäälän, Nokian, Oriveden, Pirkkalan, Vesilahden ja Ylöjärven retkeilypalvelut ja kohteet yhteen paikkaan, jota kuka tahansa voi käyttää vapaasti ja ilmaiseksi.',
    },
    jarvienreitit: {
      title: 'Jarvienreitit.fi',
      subtitle: 'Löydä Suomen järviseutujen parhaat pyöräretket',
      description: 'Nauti suunnitelluista reiteistä kokonaan polkupyörällä tai yhdistä ne juna- ja laivayhteyksiin seikkailuasi varten, valinta on sinun. Voit myös suunnitella ja räätälöidä matkasi reittisuunnittelijan avulla.',
      details: 'Kulje rapsakkaa sorapolkua maatilalle, missä viihtyisä majoitus ja järvenrantasaunan kutsu odottavat sinua.',
    },
  },
  en: {
    ekokumppanit: {
      title: 'Neuvoo.fi',
      subtitle: 'FREE AND IMPARTIAL ENERGY ADVICE',
      description: 'Offers unbiased advice regarding energy-efficient living, renovation and construction, as well as the latest information on, among other things, different forms of energy and heating.',
      details: 'The consultation is funded by Energiavirasto, Tampereen Energia and City of Tampere. Neuvoo.fi – Energianeuvonta, a subsidiary of Ekokumppanit Oy, part of the Tampere city group, is part of the provincial energy advisory network coordinated by Motiva.',
    },
    outdoor: {
      title: 'Outdoorstampere.fi',
      subtitle: 'Tampere urban region outdoor and hiking map service',
      description: 'The service presents the Tampere urban region\'s hiking trails, beaches, campfire sites, and other outdoor-related services and destinations, across municipal borders.',
      details: 'The starting point of the service has been to gather all the hiking services and destinations in Tampere, Kangasala, Lempäälä, Nokia, Orivesi, Pirkkala, Vesilahti, and Ylöjärvi into one place, which anyone can use freely and without charge.',
    },
    jarvienreitit: {
      title: 'Jarvienreitit.fi',
      subtitle: 'Discover the best of Finnish countryside travel by bike along the Lake Trails',
      description: 'Enjoy the planned routes entirely on your bicycle or combine them with train and boat connections for your adventure, the choice is yours. You can also plan and customize your trip using our route planner.',
      details: 'Follow a crunchy gravel path leading to a farmstead, where cozy accommodation and the call of a lakeside sauna await you.',
    },
  },
};

// Service order for navigation
const serviceOrder = ['ekokumppanit', 'outdoor', 'jarvienreitit'];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load saved language preference
    AsyncStorage.getItem('app_language').then((savedLang) => {
      if (savedLang === 'fi' || savedLang === 'en') {
        setLanguageState(savedLang);
      }
    });
  }, []);

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    await AsyncStorage.setItem('app_language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.fi] || key;
  };

  const getService = (serviceId: string): Service => {
    return services[language][serviceId] || services.en[serviceId] || {
      title: '',
      subtitle: '',
      description: '',
      details: '',
    };
  };

  const getAllServiceIds = (): string[] => {
    return serviceOrder;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getService, getAllServiceIds }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
