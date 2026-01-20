import React, { useMemo, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Fonts } from '@/constants/theme';
import { getRandomTrivia, type TriviaCategory } from '@/lib/trivia';

export default function AlarmRingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [showAnswer, setShowAnswer] = useState(false);

  const trivia = useMemo(() => {
    const category = params.category as TriviaCategory | undefined;
    const fallback = getRandomTrivia(category);
    return {
      timeLabel: (params.time as string) || fallback.timeLabel,
      question: (params.question as string) || fallback.question,
      prompt: (params.prompt as string) || fallback.prompt,
      answer: (params.answer as string) || fallback.answer,
    };
  }, [params.category, params.time, params.question, params.prompt, params.answer]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.overlayCard}>
        <View style={styles.topRow}>
          <View style={styles.appIcon} />
          <View style={styles.appInfo}>
          <Text style={styles.appName}>Ulkohälytin</Text>
            <Text style={styles.timeText}>{trivia.timeLabel}</Text>
          </View>
        </View>

        <Text style={styles.triviaQuestion}>
          {trivia.question}
        </Text>

        {!showAnswer ? (
          <>
            <TouchableOpacity style={styles.answerButton} onPress={() => setShowAnswer(true)}>
            <Text style={styles.answerButtonText}>
              {trivia.prompt === 'why' ? 'Why?' : trivia.prompt === 'how' ? 'How?' : 'What?'}
            </Text>
            </TouchableOpacity>
            <View style={styles.bottomRow}>
              <TouchableOpacity style={styles.bottomButton}>
                <Text style={styles.bottomButtonText}>Dismiss</Text>
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.bottomButton}>
                <Text style={styles.bottomButtonText}>Snooze</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.answerCard}>
            <Text style={styles.answerText}>{trivia.answer}</Text>
            <TouchableOpacity
              style={styles.challengeButton}
              onPress={() =>
                router.push({
                  pathname: '/challenge-detail' as any,
                  params: { level: '1', index: '1', text: 'Go outside for 10 minutes.' },
                } as any)
              }>
              <Text style={styles.challengeButtonText}>Would you like to give it a go?</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#37474F',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  overlayCard: {
    borderRadius: 22,
    backgroundColor: '#374C59',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  appIcon: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#6E8E9A',
    marginRight: 12,
  },
  appInfo: {
    flex: 1,
  },
  appName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: Fonts.semiBold,
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: Fonts.medium,
    marginTop: 2,
  },
  triviaQuestion: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    textAlign: 'center',
    marginVertical: 16,
  },
  answerButton: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  answerButtonText: {
    color: '#8B2C22',
    fontSize: 16,
    fontFamily: Fonts.semiBold,
  },
  answerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  answerText: {
    color: '#11181C',
    fontSize: 16,
    fontFamily: Fonts.regular,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 16,
  },
  challengeButton: {
    alignSelf: 'center',
    backgroundColor: '#8B2C22',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  challengeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  bottomButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  bottomButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: Fonts.semiBold,
  },
  divider: {
    width: 1,
    height: 22,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
});
