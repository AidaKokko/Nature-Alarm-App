import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Fonts } from '@/constants/theme';

export default function ChallengePraiseScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Level 1.1</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons name="sprout" size={40} color="#2DBF8F" />
        </View>
        <Text style={styles.praiseTitle}>Welldone!</Text>

        <View style={styles.quoteCard}>
          <Text style={styles.quoteText}>
            “You chose to break the cycle - stepping outside today was you training your brain to
            focus and recharge.”
          </Text>
        </View>

        <Text style={styles.plantedText}>3 new species have been added to your garden!</Text>

        <TouchableOpacity
          style={styles.completedButton}
          onPress={() => router.push('/(tabs)/garden')}>
          <Text style={styles.completedText}>Completed</Text>
          <View style={styles.completedIcon}>
            <MaterialCommunityIcons name="check" size={16} color="#FFFFFF" />
          </View>
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
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E9F7F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  praiseTitle: {
    marginTop: 4,
    fontSize: 22,
    fontFamily: Fonts.semiBold,
    color: '#2E7D8A',
  },
  quoteCard: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quoteText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: '#11181C',
    lineHeight: 22,
  },
  plantedText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: '#A4332C',
    textAlign: 'center',
  },
  completedButton: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
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
});
