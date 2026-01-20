import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Image } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { Fonts } from '@/constants/theme';

const TAMPERE_COORDS = { lat: 61.4978, lon: 23.761 };

type HourlyItem = {
  time: string;
  temp: string;
  labelKey: string;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
};

function formatTime(isoString: string) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '--:--';
  return date.toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function weatherCodeToKey(code: number): string {
  if (code === 0) return 'weatherClear';
  if (code === 1 || code === 2) return 'weatherMostlyClear';
  if (code === 3) return 'weatherOvercast';
  if (code === 45 || code === 48) return 'weatherFog';
  if (code >= 51 && code <= 57) return 'weatherDrizzle';
  if (code >= 61 && code <= 67) return 'weatherRain';
  if (code >= 71 && code <= 77) return 'weatherSnow';
  if (code >= 80 && code <= 82) return 'weatherShowers';
  if (code >= 95 && code <= 99) return 'weatherThunder';
  return 'weatherUnknown';
}

function weatherCodeToIcon(code: number): keyof typeof MaterialCommunityIcons.glyphMap {
  if (code === 0) return 'weather-sunny';
  if (code === 1 || code === 2) return 'weather-partly-cloudy';
  if (code === 3) return 'weather-cloudy';
  if (code === 45 || code === 48) return 'weather-fog';
  if (code >= 51 && code <= 57) return 'weather-rainy';
  if (code >= 61 && code <= 67) return 'weather-pouring';
  if (code >= 71 && code <= 77) return 'weather-snowy';
  if (code >= 80 && code <= 82) return 'weather-rainy';
  if (code >= 95 && code <= 99) return 'weather-lightning';
  return 'weather-cloudy-alert';
}

function summaryLabel(key: string, language: string, t: (k: string) => string) {
  if (language === 'fi') return t(key);
  switch (key) {
    case 'weatherClear':
      return 'Sunny';
    case 'weatherMostlyClear':
      return 'Mostly clear';
    case 'weatherOvercast':
      return 'Mostly cloudy';
    case 'weatherFog':
      return 'Foggy';
    case 'weatherDrizzle':
      return 'Light rain';
    case 'weatherRain':
      return 'Rain';
    case 'weatherShowers':
      return 'Showers';
    case 'weatherThunder':
      return 'Storms';
    case 'weatherSnow':
      return 'Snow';
    default:
      return 'Cloudy';
  }
}

export default function WeatherForecastScreen() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [sunrise, setSunrise] = useState('--:--');
  const [sunset, setSunset] = useState('--:--');
  const [hourly, setHourly] = useState<HourlyItem[]>([]);
  const currentDate = useMemo(
    () =>
      new Date().toLocaleDateString(language === 'fi' ? 'fi-FI' : 'en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    [language]
  );

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        setErrorKey(null);

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${TAMPERE_COORDS.lat}&longitude=${TAMPERE_COORDS.lon}&hourly=temperature_2m,weathercode&daily=sunrise,sunset&timezone=Europe%2FHelsinki`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('network');
        const data = await response.json();

        const sunriseTime = data?.daily?.sunrise?.[0];
        const sunsetTime = data?.daily?.sunset?.[0];
        setSunrise(sunriseTime ? formatTime(sunriseTime) : '--:--');
        setSunset(sunsetTime ? formatTime(sunsetTime) : '--:--');

        const times: string[] = data?.hourly?.time || [];
        const temps: number[] = data?.hourly?.temperature_2m || [];
        const codes: number[] = data?.hourly?.weathercode || [];

        const firstDate = times[0]?.split('T')[0];
        const targetHours = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
        const indices = targetHours
          .map((h) => times.findIndex((t) => t === `${firstDate}T${h}`))
          .filter((idx) => idx >= 0);

        const fallbackIndices = times.slice(0, 8).map((_, idx) => idx);
        const pick = indices.length === 8 ? indices : fallbackIndices;

        const hourlyItems: HourlyItem[] = pick.map((idx) => ({
          time: times[idx] ? formatTime(times[idx]) : '--:--',
          temp: typeof temps[idx] === 'number' ? `${Math.round(temps[idx])}°C` : '--',
          labelKey: weatherCodeToKey(Number(codes[idx])),
          iconName: weatherCodeToIcon(Number(codes[idx])),
        }));

        setHourly(hourlyItems);
      } catch {
        setErrorKey('weatherError');
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, []);

  const hourlyDisplay = useMemo(() => {
    if (hourly.length > 0) return hourly;
    return [
      { time: '--:--', temp: '--', labelKey: 'weatherUnknown', iconName: 'weather-cloudy-alert' },
      { time: '--:--', temp: '--', labelKey: 'weatherUnknown', iconName: 'weather-cloudy-alert' },
      { time: '--:--', temp: '--', labelKey: 'weatherUnknown', iconName: 'weather-cloudy-alert' },
      { time: '--:--', temp: '--', labelKey: 'weatherUnknown', iconName: 'weather-cloudy-alert' },
      { time: '--:--', temp: '--', labelKey: 'weatherUnknown', iconName: 'weather-cloudy-alert' },
      { time: '--:--', temp: '--', labelKey: 'weatherUnknown', iconName: 'weather-cloudy-alert' },
      { time: '--:--', temp: '--', labelKey: 'weatherUnknown', iconName: 'weather-cloudy-alert' },
      { time: '--:--', temp: '--', labelKey: 'weatherUnknown', iconName: 'weather-cloudy-alert' },
    ];
  }, [hourly]);

  const city = useMemo(() => t('weatherLocation').split(',')[0], [t]);

  const hourlyRaw = useMemo(() => {
    if (hourly.length === 0) return [];
    return hourly.map((item) => ({
      time: item.time,
      tempValue: Number(item.temp.replace('°C', '')),
      labelKey: item.labelKey,
    }));
  }, [hourly]);

  const summaryText = useMemo(() => {
    if (hourlyRaw.length === 0) return '';
    const temps = hourlyRaw.map((item) => item.tempValue).filter((value) => !Number.isNaN(value));
    const min = temps.length ? Math.round(Math.min(...temps)) : null;
    const max = temps.length ? Math.round(Math.max(...temps)) : null;
    const labelCounts = hourlyRaw.reduce<Record<string, number>>((acc, item) => {
      acc[item.labelKey] = (acc[item.labelKey] || 0) + 1;
      return acc;
    }, {});
    const dominantKey = Object.keys(labelCounts).sort((a, b) => labelCounts[b] - labelCounts[a])[0];
    const label = dominantKey
      ? summaryLabel(dominantKey, language, t)
      : summaryLabel('weatherUnknown', language, t);
    if (language === 'fi') {
      return `${label}. Ylin ${max ?? '--'}°C, alin ${min ?? '--'}°C.`;
    }
    return `${label}. Highs ${max ?? '--'}°C and lows ${min ?? '--'}°C.`;
  }, [hourlyRaw, language, t]);

  const periodText = useMemo(() => {
    if (hourlyRaw.length === 0) {
      return {
        morning: t('weatherLoading'),
        noon: t('weatherLoading'),
        evening: t('weatherLoading'),
        night: t('weatherLoading'),
      };
    }

    const getHour = (time: string) => {
      const [hourPart] = time.split(':');
      return Number(hourPart);
    };

    const pickRange = (start: number, end: number) =>
      hourlyRaw.filter((item) => {
        const hour = getHour(item.time);
        return hour >= start && hour <= end;
      });

    const buildSentence = (range: typeof hourlyRaw, periodLabel: string, includeCity: boolean) => {
      if (range.length === 0) return '';
      const temps = range.map((item) => item.tempValue).filter((value) => !Number.isNaN(value));
      const avg = temps.length ? Math.round(temps.reduce((a, b) => a + b, 0) / temps.length) : null;
      const labelCounts = range.reduce<Record<string, number>>((acc, item) => {
        acc[item.labelKey] = (acc[item.labelKey] || 0) + 1;
        return acc;
      }, {});
      const dominantKey = Object.keys(labelCounts).sort((a, b) => labelCounts[b] - labelCounts[a])[0];
      const label = dominantKey ? summaryLabel(dominantKey, language, t) : summaryLabel('weatherUnknown', language, t);
      if (language === 'fi') {
        const cityPart = includeCity ? `${city}ssa ` : '';
        return `${cityPart}${currentDate.toLowerCase()} lämpötila on ${avg ?? '--'}°C. Sää on ${label.toLowerCase()}.`;
      }
      const cityPart = includeCity ? `in ${city} ` : '';
      return `The temperature ${cityPart}on ${currentDate} is ${avg ?? '--'}°C. ${label}.`;
    };

    return {
      morning: buildSentence(pickRange(6, 11), t('weatherMorningTitle'), true),
      noon: buildSentence(pickRange(12, 17), t('weatherNoonTitle'), false),
      evening: buildSentence(pickRange(18, 22), t('weatherEveningTitle'), false),
      night: buildSentence(pickRange(0, 5), t('weatherNightTitle'), false),
    };
  }, [hourlyRaw, language, t, city]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('weatherTitle')}</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.locationText}>{t('weatherLocation')}</Text>
        <Text style={styles.dateText}>{currentDate}</Text>

        <View style={styles.sunRow}>
          <View style={styles.sunItem}>
            <Image
              source={require('@/assets/images/no_background/No Label/Sunrise.png')}
              style={styles.sunIcon}
              resizeMode="contain"
            />
            <View style={styles.sunTextBlock}>
              <Text style={styles.sunLabel}>{t('sunrise')}</Text>
              <Text style={styles.sunTime}>{sunrise}</Text>
            </View>
          </View>
          <View style={styles.sunItem}>
            <Image
              source={require('@/assets/images/no_background/No Label/Sunset.png')}
              style={styles.sunIcon}
              resizeMode="contain"
            />
            <View style={styles.sunTextBlock}>
              <Text style={styles.sunLabel}>{t('sunset')}</Text>
              <Text style={styles.sunTime}>{sunset}</Text>
            </View>
          </View>
        </View>


        <View style={styles.hourlyCard}>
          {loading && <Text style={styles.loadingText}>{t('weatherLoading')}</Text>}
          {errorKey && !loading && <Text style={styles.errorText}>{t(errorKey)}</Text>}
          {!loading && !errorKey && summaryText ? (
            <>
              <Text style={styles.summaryText}>{summaryText}</Text>
              <View style={styles.summaryDivider} />
            </>
          ) : null}
          <View style={styles.hourlyHeader}>
            {hourlyDisplay.map((item, index) => (
              <Text key={`time-${item.time}-${index}`} style={styles.hourlyTime}>
                {item.time}
              </Text>
            ))}
          </View>
          <View style={styles.hourlyRow}>
            {hourlyDisplay.map((item, index) => (
              <Text key={`temp-${item.time}-${index}`} style={styles.hourlyTemp}>
                {item.temp}
              </Text>
            ))}
          </View>
          <View style={styles.hourlyRow}>
            {hourlyDisplay.map((item, index) => (
              <View key={`icon-${item.time}-${index}`} style={styles.hourlyIconCell}>
                <MaterialCommunityIcons name={item.iconName} size={16} color="#687076" />
              </View>
            ))}
          </View>
          <View style={styles.hourlyRow}>
            {hourlyDisplay.map((item, index) => (
              <Text key={`label-${item.time}-${index}`} style={styles.hourlyLabel}>
                {t(item.labelKey)}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>{t('weatherMorningTitle')}</Text>
          <Text style={styles.sectionText}>{periodText.morning}</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>{t('weatherNoonTitle')}</Text>
          <Text style={styles.sectionText}>{periodText.noon}</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>{t('weatherEveningTitle')}</Text>
          <Text style={styles.sectionText}>{periodText.evening}</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>{t('weatherNightTitle')}</Text>
          <Text style={styles.sectionText}>{periodText.night}</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#A4332C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 12 : 12,
  },
  headerButton: {
    minWidth: 32,
    minHeight: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    color: '#FFFFFF',
    fontSize: 32,
    fontFamily: Fonts.regular,
    lineHeight: 32,
  },
  closeButton: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: Fonts.regular,
    lineHeight: 20,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: Fonts.semiBold,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  contentContainer: {
    paddingBottom: 80,
  },
  dateText: {
    fontSize: 13,
    fontFamily: Fonts.medium,
    color: '#687076',
    textAlign: 'center',
    marginBottom: 12,
  },
  sunRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 10,
  },
  sunItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sunIcon: {
    width: 36,
    height: 36,
  },
  sunTextBlock: {
    alignItems: 'flex-start',
  },
  summaryText: {
    fontSize: 13,
    fontFamily: Fonts.medium,
    color: '#11181C',
    textAlign: 'center',
    marginBottom: 12,
  },
  sunLabel: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: '#2E7D8A',
  },
  sunTime: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: '#2E7D8A',
  },
  hourlyCard: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  summaryText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: '#11181C',
    textAlign: 'center',
    marginBottom: 10,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: '#687076',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: '#B00020',
    textAlign: 'center',
    marginBottom: 8,
  },
  hourlyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  hourlyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  hourlyTime: {
    fontSize: 11,
    fontFamily: Fonts.semiBold,
    color: '#11181C',
    width: 38,
    textAlign: 'center',
  },
  hourlyTemp: {
    fontSize: 11,
    fontFamily: Fonts.medium,
    color: '#11181C',
    width: 38,
    textAlign: 'center',
  },
  hourlyLabel: {
    fontSize: 10,
    fontFamily: Fonts.regular,
    color: '#687076',
    width: 38,
    textAlign: 'center',
  },
  hourlyIconCell: {
    width: 38,
    alignItems: 'center',
  },
  sectionCard: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: '#11181C',
    marginBottom: 6,
  },
  sectionText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#11181C',
    lineHeight: 20,
  },
  locationText: {
    fontSize: 13,
    fontFamily: Fonts.medium,
    color: '#687076',
    textAlign: 'center',
    marginBottom: 6,
  },
});
