import { StyleSheet, View, TouchableOpacity, SafeAreaView, Image, Text } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import { Header } from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function HQScreen() {
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Header title={t('hq')} showFlags={true} />
      
      <ThemedView style={styles.content}>
        {/* Central Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Image
              source={require('@/assets/images/Logo/Alarm Logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Service Cards */}
        <View style={styles.cardsContainer}>
          <TouchableOpacity 
            style={styles.card}
            onPress={() => router.push('/service-detail?serviceId=ekokumppanit')}>
            <View style={styles.cardLeft}>
              <Image
                source={require('@/assets/images/no_background/No Label/Ekokumppanit Services Button_icon.png')}
                style={styles.cardIcon}
                resizeMode="contain"
              />
              <Text style={styles.cardText}>{t('ekokumppanitServices')}</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color="#9BA1A6" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card}
            onPress={() => router.push('/environmental-awareness')}>
            <View style={styles.cardLeft}>
              <Image
                source={require('@/assets/images/no_background/No Label/Environmental Awareness Button_icon.png')}
                style={styles.cardIcon}
                resizeMode="contain"
              />
              <Text style={styles.cardText}>{t('environmentalAwareness')}</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color="#9BA1A6" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push('/weather-forecast')}>
            <View style={styles.cardLeft}>
              <Image
                source={require('@/assets/images/no_background/No Label/WeatherForecast Button_icon.png')}
                style={styles.cardIcon}
                resizeMode="contain"
              />
              <Text style={styles.cardText}>{t('weatherForecast')}</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color="#9BA1A6" />
          </TouchableOpacity>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  logoContainer: {
    marginBottom: 36,
    alignItems: 'center',
  },
  logoCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  logoImage: {
    width: 210,
    height: 210,
    borderRadius: 105,
  },
  cardsContainer: {
    width: '100%',
    gap: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 14,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    paddingLeft: 10,
  },
  cardIcon: {
    width: 56,
    height: 56,
  },
  cardText: {
    fontSize: 15,
    color: '#11181C',
    fontFamily: Fonts.medium,
    flex: 1,
  },
});
