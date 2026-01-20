import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function ServiceDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { getService, getAllServiceIds, t } = useLanguage();
  
  const [currentServiceId, setCurrentServiceId] = useState<string>(params.serviceId as string || 'ekokumppanit');
  const service = getService(currentServiceId);
  const serviceIds = getAllServiceIds();
  const currentIndex = serviceIds.indexOf(currentServiceId);
  
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < serviceIds.length - 1;

  useEffect(() => {
    // Update when params change
    if (params.serviceId) {
      setCurrentServiceId(params.serviceId as string);
    }
  }, [params.serviceId]);

  const navigateToService = (serviceId: string) => {
    setCurrentServiceId(serviceId);
    router.setParams({ serviceId });
  };

  const goToPrevious = () => {
    if (hasPrevious) {
      const prevIndex = currentIndex - 1;
      navigateToService(serviceIds[prevIndex]);
    }
  };

  const goToNext = () => {
    if (hasNext) {
      const nextIndex = currentIndex + 1;
      navigateToService(serviceIds[nextIndex]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Red Header with Back and Close */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <IconSymbol name="chevron.right" size={24} color="#FFFFFF" style={styles.backIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentWrapper}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Banner Image */}
          <View style={styles.bannerContainer}>
            <View style={styles.bannerImagePlaceholder}>
              {/* Placeholder for banner image - replace with actual image when available */}
            </View>
            
            {/* Overlay Text Boxes */}
            <View style={styles.overlayContainer}>
              <View style={styles.overlayBoxBlue}>
                <Text style={styles.overlayTextBlue}>{service.title}</Text>
              </View>
              <View style={styles.overlayBoxGreen}>
                <Text style={styles.overlayTextGreen}>{service.subtitle}</Text>
              </View>
            </View>
          </View>

          {/* Informational Text Block */}
          <View style={styles.textContainer}>
            <Text style={styles.descriptionText}>{service.description}</Text>
            <View style={styles.detailsContainer}>
              <Text style={styles.descriptionText}>
                {service.details.split(/(Energiavirasto|Tampereen Energia|City of Tampere|Ekokumppanit Oy|Tampereen kaupunki)/).map((part, index) => {
                  const isLink = ['Energiavirasto', 'Tampereen Energia', 'City of Tampere', 'Ekokumppanit Oy', 'Tampereen kaupunki'].includes(part);
                  return (
                    <Text key={index} style={isLink ? styles.linkText : undefined}>
                      {part}
                    </Text>
                  );
                })}
              </Text>
            </View>
          </View>

          {hasNext && (
            <TouchableOpacity style={styles.nextButton} onPress={goToNext} activeOpacity={0.7}>
              <Text style={styles.nextText}>{t('envNext')}</Text>
              <Text style={styles.nextArrow}>›</Text>
            </TouchableOpacity>
          )}
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#A42417',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 14 : 14,
  },
  headerButton: {
    padding: 4,
    minWidth: 32,
    minHeight: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    transform: [{ rotate: '180deg' }],
  },
  closeButton: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: Fonts.regular,
    lineHeight: 24,
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  bannerContainer: {
    width: '100%',
    height: 220,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E0E0E0',
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    gap: 10,
  },
  overlayBoxBlue: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#1E3A8A',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  overlayTextBlue: {
    color: '#1E3A8A',
    fontSize: 20,
    fontFamily: Fonts.bold,
  },
  overlayBoxGreen: {
    backgroundColor: '#2D7A4F',
    borderWidth: 2,
    borderColor: '#1F5F3A',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  overlayTextGreen: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: Fonts.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  textContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginTop: 16,
    paddingBottom: 32,
    paddingHorizontal: 20,
  },
  nextButton: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
    marginRight: 8,
  },
  nextText: {
    color: '#A42417',
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    marginRight: 8,
  },
  nextArrow: {
    color: '#A42417',
    fontSize: 20,
    fontFamily: Fonts.regular,
  },
  detailsContainer: {
    position: 'relative',
    paddingHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: 15,
    color: '#11181C',
    fontFamily: Fonts.regular,
    lineHeight: 22,
    marginBottom: 16,
  },
  linkText: {
    textDecorationLine: 'underline',
  },
});
