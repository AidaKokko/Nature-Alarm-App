import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Switch, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Fonts } from '@/constants/theme';
import { getGardenSpecies, type GardenSpecies } from '@/lib/garden-storage';
import { useRouter } from 'expo-router';
import { getAvatarIndex } from '@/lib/profile-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function GardenScreen() {
  const router = useRouter();
  const [species, setSpecies] = useState<GardenSpecies[]>([]);
  const [isPublic, setIsPublic] = useState(true);
  const [avatarIndex, setAvatarIndexState] = useState(0);

  useEffect(() => {
    getGardenSpecies().then(setSpecies);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getAvatarIndex().then(setAvatarIndexState);
    }, [])
  );

  const plots = useMemo(() => {
    return species.map((item, index) => {
      const days = Math.max(
        0,
        Math.floor((Date.now() - new Date(item.addedAt).getTime()) / (1000 * 60 * 60 * 24))
      );
      let stage: 'seed' | 'sprout' | 'bloom';
      if (days < 2) stage = 'seed';
      else if (days < 7) stage = 'sprout';
      else stage = 'bloom';
      return { ...item, stage, index };
    });
  }, [species]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon}>
          <MaterialCommunityIcons name="arrow-left" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Garden</Text>
        <TouchableOpacity onPress={() => router.push('/profile' as any)} style={styles.avatarCircle}>
          <Text style={styles.avatarEmoji}>{avatarIndex === 0 ? '👩‍🌾' : avatarIndex === 1 ? '🧑‍🔬' : avatarIndex === 2 ? '🧑‍🎨' : avatarIndex === 3 ? '🧑‍💻' : avatarIndex === 4 ? '🧑‍🏫' : '🧑‍🚴'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.journalRow}
            onPress={() => router.push('/journal' as any)}>
            <MaterialCommunityIcons name="pencil" size={18} color="#11181C" />
            <Text style={styles.journalText}>My Journal</Text>
          </TouchableOpacity>
          <View style={styles.publicRow}>
            <Text style={styles.publicText}>Public</Text>
            <Switch
              value={isPublic}
              onValueChange={setIsPublic}
              trackColor={{ false: '#E0E0E0', true: '#C9D6D6' }}
              thumbColor={isPublic ? '#11181C' : '#FFFFFF'}
            />
          </View>
        </View>

          <View style={styles.profileRow}>
            <View style={styles.avatarSmall}>
              <Text style={styles.avatarEmojiSmall}>{avatarIndex === 0 ? '👩‍🌾' : avatarIndex === 1 ? '🧑‍🔬' : avatarIndex === 2 ? '🧑‍🎨' : avatarIndex === 3 ? '🧑‍💻' : avatarIndex === 4 ? '🧑‍🏫' : '🧑‍🚴'}</Text>
            </View>
            <Text style={styles.profileName}>Katja’s Garden</Text>
            <MaterialCommunityIcons name="dots-vertical" size={20} color="#11181C" />
          </View>

        <View style={styles.gardenFrame}>
          <View style={styles.gardenHeaderRow}>
            <Text style={styles.gardenTitle}>Your Garden</Text>
            <View style={styles.actionsOverlay}>
              <View style={styles.actionRow}>
                <MaterialCommunityIcons name="thumb-up-outline" size={18} color="#FFFFFF" />
                <Text style={styles.actionText}>15</Text>
              </View>
              <MaterialCommunityIcons name="share-variant-outline" size={18} color="#FFFFFF" />
            </View>
          </View>
          <View style={styles.plotGrid}>
            {plots.length === 0 ? (
              <View style={styles.emptyPlot}>
                <Text style={styles.gardenPlaceholderText}>Plant your first seed</Text>
              </View>
            ) : (
              plots.map((item) => (
                <View key={`${item.name}-${item.scientificName}-${item.index}`} style={styles.plot}>
                  <View style={styles.plotSoil} />
                  {item.stage === 'seed' && <View style={styles.stageSeed} />}
                  {item.stage === 'sprout' && (
                    <View style={styles.stageSprout}>
                      <View style={styles.stageStem} />
                      <View style={styles.stageLeaf} />
                    </View>
                  )}
                  {item.stage === 'bloom' && (
                    <View style={styles.stageBloom}>
                      <View style={styles.stageStem} />
                      <View style={styles.stageLeaf} />
                      <View style={styles.stageFlower} />
                    </View>
                  )}
                  <Text style={styles.plotLabel} numberOfLines={1}>
                    {item.name}
                  </Text>
                </View>
              ))
            )}
          </View>
        </View>

        <View style={styles.commentsRow}>
          <MaterialCommunityIcons name="comment-search-outline" size={20} color="#11181C" />
          <Text style={styles.commentsCount}>7</Text>
        </View>

        <View style={styles.commentCard}>
          <View style={styles.commentHeader}>
            <View style={styles.commentAvatarGroup}>
              <View style={styles.avatarTiny} />
              <View style={styles.avatarTiny} />
              <View style={styles.avatarTiny} />
            </View>
            <Text style={styles.commentAuthor}>beatriz</Text>
          </View>
          <View style={styles.commentBody}>
            <Text style={styles.commentEmoji}>😲</Text>
            <Text style={styles.commentText}>Wow, is this level 2 or 3?</Text>
          </View>
          <Text style={styles.commentDate}>January 20, 2026</Text>
        </View>

        {species.length === 0 && (
          <Text style={styles.emptyText}>
            No species added yet. Complete a photo challenge to grow your garden.
          </Text>
        )}
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: Fonts.semiBold,
  },
  headerIcon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 18,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  journalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  journalText: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: '#11181C',
  },
  publicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  publicText: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: '#11181C',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  avatarSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0E0E0',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmojiSmall: {
    fontSize: 16,
  },
  profileName: {
    flex: 1,
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: '#11181C',
  },
  gardenFrame: {
    borderRadius: 12,
    backgroundColor: '#4C6A6E',
    padding: 12,
    marginBottom: 12,
  },
  gardenHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  gardenTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: Fonts.semiBold,
  },
  gardenPlaceholderText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: '#FFFFFF',
  },
  actionsOverlay: {
    alignItems: 'center',
    gap: 8,
  },
  plotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  plot: {
    width: '48%',
    backgroundColor: '#E9E1D3',
    borderRadius: 10,
    padding: 10,
    minHeight: 100,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  emptyPlot: {
    width: '100%',
    backgroundColor: '#5E7F84',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  plotSoil: {
    position: 'absolute',
    bottom: 20,
    width: '80%',
    height: 12,
    borderRadius: 6,
    backgroundColor: '#7A5A3C',
  },
  plotLabel: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: '#5A3B28',
    marginTop: 6,
  },
  stageSeed: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3E7C3A',
    marginBottom: 18,
  },
  stageSprout: {
    alignItems: 'center',
    marginBottom: 12,
  },
  stageStem: {
    width: 4,
    height: 18,
    borderRadius: 2,
    backgroundColor: '#3E7C3A',
  },
  stageLeaf: {
    width: 18,
    height: 10,
    borderRadius: 6,
    backgroundColor: '#5FBF6B',
    marginTop: -12,
  },
  stageBloom: {
    alignItems: 'center',
    marginBottom: 10,
  },
  stageFlower: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#F4A261',
    marginTop: 4,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: Fonts.semiBold,
  },
  commentsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  commentsCount: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: '#11181C',
  },
  commentCard: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  commentAvatarGroup: {
    flexDirection: 'row',
    marginRight: 8,
  },
  avatarTiny: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#E0E0E0',
    marginRight: -4,
  },
  commentAuthor: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: '#11181C',
  },
  commentBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  commentEmoji: {
    fontSize: 16,
  },
  commentText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#11181C',
  },
  commentDate: {
    marginTop: 6,
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: '#687076',
  },
  emptyText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#687076',
    textAlign: 'center',
    marginTop: 24,
  },
});
