import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Fonts } from '@/constants/theme';

export default function ChallengeDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const level = (params.level as string) || '1';
  const index = (params.index as string) || '1';
  const text = (params.text as string) || 'Go to your balcony and take 3 deep breaths.';
  const isPhotoChallenge = (params.photo as string) === '1';
  const isLevel3 = level === '3';
  const level3Description =
    (params.description as string) ||
    'Bring a water bottle and wear a comfortable shoes.';
  const photoCount = (params.photoCount as string) || '1';

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

      <View style={styles.content}>
        {isLevel3 ? (
          <>
            <View style={styles.level3QuoteCard}>
              <Text style={styles.level3Quote}>“{text}”</Text>
              <Text style={styles.level3Sub}>{level3Description}</Text>
            </View>

            <View style={styles.level3TimerCard}>
              <View style={styles.level3TimerHeader}>
                <Text style={styles.level3TimerLabel}>Hours</Text>
                <Text style={styles.level3TimerLabel}>Minutes</Text>
                <Text style={styles.level3TimerLabel}>Seconds</Text>
              </View>
              <Text style={styles.level3TimerValue}>00 : 00 : 00</Text>
              <TouchableOpacity style={styles.level3StartButton}>
                <Text style={styles.level3StartText}>Start</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.completedButton}
              onPress={() =>
                router.push({
                  pathname: '/challenge-praise' as any,
                  params: { level, index },
                } as any)
              }>
              <Text style={styles.completedText}>Completed</Text>
              <View style={styles.completedIcon}>
                <MaterialCommunityIcons name="check" size={16} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.challengeQuote}>“{text}”</Text>

            <TouchableOpacity
              style={styles.startButton}
              onPress={() => {
                if (isPhotoChallenge) {
                  router.push({
                    pathname: '/challenge-photo' as any,
                    params: {
                      level,
                      index,
                      text,
                      photoCount,
                    },
                  } as any);
                  return;
                }
              }}>
              <Text style={styles.startText}>{isPhotoChallenge ? 'Continue' : 'Start'}</Text>
            </TouchableOpacity>

            <View style={styles.timerCard}>
              <View style={styles.timerCircle}>
                <Text style={styles.timerText}>00:05</Text>
              </View>
              <View style={styles.timerControls}>
                <TouchableOpacity style={styles.timerIconButton}>
                  <MaterialCommunityIcons name="close" size={18} color="#A4332C" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.timerIconButton, styles.timerIconFilled]}>
                  <MaterialCommunityIcons name="pause" size={18} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.completedButton}
              onPress={() =>
                router.push({
                  pathname: '/challenge-praise' as any,
                  params: { level, index },
                } as any)
              }>
              <Text style={styles.completedText}>Completed</Text>
              <View style={styles.completedIcon}>
                <MaterialCommunityIcons name="check" size={16} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          </>
        )}
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
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  challengeQuote: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: Fonts.medium,
    color: '#11181C',
    marginBottom: 24,
  },
  startButton: {
    backgroundColor: '#A4332C',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 80,
    marginBottom: 24,
  },
  startText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: Fonts.semiBold,
  },
  timerCard: {
    width: 260,
    height: 260,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  timerCircle: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 8,
    borderColor: '#A4332C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 28,
    fontFamily: Fonts.semiBold,
    color: '#687076',
  },
  timerControls: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 18,
  },
  timerIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#A4332C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerIconFilled: {
    backgroundColor: '#A4332C',
  },
  completedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  completedText: {
    color: '#A4332C',
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    marginRight: 12,
  },
  completedIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#A4332C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  level3QuoteCard: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  level3Quote: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: '#11181C',
    lineHeight: 22,
    marginBottom: 10,
  },
  level3Sub: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#11181C',
    lineHeight: 20,
  },
  level3TimerCard: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  level3TimerHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  level3TimerLabel: {
    width: '33%',
    textAlign: 'center',
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: '#687076',
  },
  level3TimerValue: {
    fontSize: 36,
    fontFamily: Fonts.semiBold,
    color: '#11181C',
    marginBottom: 12,
  },
  level3StartButton: {
    backgroundColor: '#A4332C',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 28,
  },
  level3StartText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: Fonts.semiBold,
  },
});
