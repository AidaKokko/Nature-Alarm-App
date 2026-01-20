import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { Fonts } from '@/constants/theme';

export default function EnvironmentalAwarenessScreen() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Image
            source={require('@/assets/images/no_background/No Label/Environmental Awareness_icon.png')}
            style={styles.headerIcon}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>{t('environmentalAwarenessTitle')}</Text>
        </View>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('envSection1Title')}</Text>
          <Text style={styles.sectionText}>{t('envSection1Body1')}</Text>
          <Text style={styles.sectionText}>{t('envSection1Body2')}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('envSection2Title')}</Text>
          <Text style={styles.sectionText}>{t('envSection2Body1')}</Text>
          <Text style={styles.sectionText}>{t('envSection2Body2')}</Text>
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/weather-forecast')}>
          <Text style={styles.nextText}>{t('envNext')}</Text>
          <Text style={styles.nextArrow}>›</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8B2C22',
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
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIcon: {
    width: 22,
    height: 22,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    marginBottom: 12,
  },
  sectionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: Fonts.regular,
    lineHeight: 21,
    marginBottom: 12,
  },
  nextButton: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  nextText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    marginRight: 8,
  },
  nextArrow: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: Fonts.regular,
  },
});