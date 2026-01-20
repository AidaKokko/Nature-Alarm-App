import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Fonts } from '@/constants/theme';

export default function ChallengeScreen() {
  const [warningText, setWarningText] = useState<string | null>(null);
  const level1Completed = false;
  const level2Completed = false;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Missions</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.levelsContainer}>
          <View style={styles.levelCard}>
            <Text style={styles.levelText}>LEVEL 1</Text>
            <Image
              source={require('@/assets/images/Challenge_Locked_button.png')}
              style={styles.lockedButtonImage}
              resizeMode="contain"
            />
          </View>

          <TouchableOpacity
            style={[styles.levelCard, styles.levelCardOffsetUp]}
            activeOpacity={0.8}
            onPress={() => {
              if (!level1Completed) {
                setWarningText('You need to complete Level 1 to start either Level 2 or 3');
              }
            }}>
            <Text style={styles.levelText}>LEVEL 2</Text>
            <Image
              source={require('@/assets/images/Challenge_Locked_button.png')}
              style={styles.lockedButtonImage}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.levelCard, styles.levelCardOffsetUpLarge]}
            activeOpacity={0.8}
            onPress={() => {
              if (!level2Completed) {
                setWarningText('You need to complete Level 2 to start Level 3.');
              }
            }}>
            <Text style={styles.levelText}>LEVEL 3</Text>
            <Image
              source={require('@/assets/images/Challenge_Locked_button.png')}
              style={styles.lockedButtonImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {warningText && (
          <View style={styles.warningRow}>
            <MaterialCommunityIcons name="alert-circle" size={20} color="#E0A000" />
            <Text style={styles.warningText}>{warningText}</Text>
          </View>
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
    paddingTop: 40,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: Fonts.regular,
    marginTop: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 60,
    paddingBottom: 40,
  },
  levelsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    gap: 60,
  },
  levelCardOffsetUp: {
    marginTop: 0,
  },
  levelCardOffsetUpLarge: {
    marginTop: 0,
  },
  levelCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  levelText: {
    color: '#A4332C',
    fontSize: 16,
    fontFamily: Fonts.bold,
    marginLeft: 23,
  },
  lockedButtonImage: {
    width: 190,
    height: 56,
  },
  warningRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  warningText: {
    color: '#D62828',
    fontSize: 12,
    fontFamily: Fonts.medium,
    flex: 1,
    flexWrap: 'wrap',
    lineHeight: 16,
  },
  planButton: {
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#A4332C',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  planButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
  challengeSection: {
    marginBottom: 24,
  },
  challengeTitle: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: '#11181C',
    marginBottom: 12,
  },
  challengeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  challengeIndex: {
    width: 24,
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: '#A4332C',
  },
  challengeText: {
    flex: 1,
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#11181C',
    lineHeight: 20,
  },
});
