import React, { useMemo, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Fonts } from '@/constants/theme';
import { addGardenSpecies } from '@/lib/garden-storage';

export default function ChallengePhotoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const level = (params.level as string) || '1';
  const index = (params.index as string) || '15';
  const totalPhotos = Number(params.photoCount as string) || 1;
  const [currentIndex, setCurrentIndex] = useState(0);

  const sampleSpecies = useMemo(
    () => [
      {
        name: 'Garden Snail',
        scientific: 'Cornu aspersum',
        conditions:
          'Garden snails thrive in temperate climates and are commonly found in forests, meadows, gardens, and parks.',
        reproduction:
          'Garden snails are hermaphrodites, possessing both male and female reproductive organs.',
      },
      {
        name: 'Pearl Crescent Butterfly',
        scientific: 'Phyciodes tharos',
        conditions:
          'The habitat of this species includes pastures, vacant lots, fields, road edges, and open pine woods.',
        reproduction: 'By distinct stages, from the egg, hibernation to the adult.',
      },
      {
        name: 'Western Honeybee',
        scientific: 'Apis mellifera',
        conditions:
          'These bees live in large colonies that can contain tens of thousands of individuals, each working together to sustain the hive.',
        reproduction:
          'Western honeybee reproduction revolves around the queen and her mating process.',
      },
    ],
    []
  );

  const activeSpecies = sampleSpecies[currentIndex % sampleSpecies.length];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Level {level}.{index}</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.scanArea}>
        <View style={styles.scanImagePlaceholder}>
          <Text style={styles.scanLabel}>Scanning</Text>
          <View style={styles.scanButton} />
          <View style={styles.scanHelp} />
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.speciesTitle}>{activeSpecies.name}</Text>
        <Text style={styles.infoRow}>
          <Text style={styles.infoLabel}>Scientific Name:</Text>{' '}
          <Text style={styles.infoValue}>{activeSpecies.scientific}</Text>
        </Text>
        <Text style={styles.infoRow}>
          <Text style={styles.infoLabel}>Living Conditions:</Text>{' '}
          <Text style={styles.infoValue}>{activeSpecies.conditions}</Text>
        </Text>
        <Text style={styles.infoRow}>
          <Text style={styles.infoLabel}>Reproduction:</Text>{' '}
          <Text style={styles.infoValue}>{activeSpecies.reproduction}</Text>
        </Text>

        <View style={styles.dotsRow}>
          {Array.from({ length: totalPhotos }).map((_, idx) => (
            <View key={`dot-${idx}`} style={idx === currentIndex ? styles.dotActive : styles.dot} />
          ))}
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={async () => {
            await addGardenSpecies({
              name: activeSpecies.name,
              scientificName: activeSpecies.scientific,
            });
            if (currentIndex + 1 >= totalPhotos) {
              router.push('/(tabs)/garden' as any);
              return;
            }
            setCurrentIndex((prev) => prev + 1);
          }}>
          <Text style={styles.nextText}>next</Text>
          <Text style={styles.nextArrow}>›</Text>
        </TouchableOpacity>
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
  scanArea: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  scanImagePlaceholder: {
    height: 220,
    borderRadius: 16,
    backgroundColor: '#C9D6D6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    marginBottom: 12,
  },
  scanButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginBottom: 8,
  },
  scanHelp: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  infoCard: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  speciesTitle: {
    fontSize: 20,
    fontFamily: Fonts.semiBold,
    color: '#11181C',
    marginBottom: 8,
  },
  infoRow: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#11181C',
    lineHeight: 20,
    marginBottom: 8,
  },
  infoLabel: {
    color: '#A4332C',
    fontFamily: Fonts.semiBold,
  },
  infoValue: {
    color: '#11181C',
    fontFamily: Fonts.regular,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 8,
    marginBottom: 16,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D0D0D0',
  },
  dotActive: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#11181C',
  },
  nextButton: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  nextText: {
    color: '#A4332C',
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    marginRight: 6,
  },
  nextArrow: {
    color: '#A4332C',
    fontSize: 16,
    fontFamily: Fonts.semiBold,
  },
});
