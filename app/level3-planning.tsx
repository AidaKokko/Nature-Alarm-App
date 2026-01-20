import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Fonts } from '@/constants/theme';

const calendarDays = [
  ['', '', '', '1', '2', '3', '4', '5'],
  ['6', '7', '8', '9', '10', '11', '12'],
  ['13', '14', '15', '16', '17', '18', '19'],
  ['20', '21', '22', '23', '24', '25', '26'],
  ['27', '28', '29', '30', '31', '', ''],
];

export default function Level3PlanningScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Level 3</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>Let’s Plan your next Adventure</Text>
        <Text style={styles.highlight}>Pick a Date & Time</Text>

        <View style={styles.monthRow}>
          <Text style={styles.monthArrow}>‹</Text>
          <Text style={styles.monthText}>July 2026</Text>
          <View style={styles.monthNextCircle}>
            <Text style={styles.monthArrowNext}>›</Text>
          </View>
        </View>

        <View style={styles.calendarCard}>
          <View style={styles.weekRow}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <Text key={day} style={styles.weekDay}>
                {day}
              </Text>
            ))}
          </View>
          {calendarDays.map((row, idx) => (
            <View key={`row-${idx}`} style={styles.weekRow}>
              {row.map((day, dIdx) => (
                <Text key={`day-${idx}-${dIdx}`} style={styles.dayCell}>
                  {day}
                </Text>
              ))}
            </View>
          ))}
        </View>

        <Text style={styles.timeLabel}>Time</Text>
        <View style={styles.timePickerCard}>
          <View style={styles.timeColumn}>
            <Text style={styles.timeMuted}>07</Text>
            <Text style={styles.timeActive}>08</Text>
            <Text style={styles.timeMuted}>09</Text>
          </View>
          <View style={styles.timeColumn}>
            <Text style={styles.timeMuted}>59</Text>
            <Text style={styles.timeActive}>00</Text>
            <Text style={styles.timeMuted}>01</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>Save</Text>
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
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: '#11181C',
  },
  highlight: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: '#A4332C',
    marginTop: 6,
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    marginBottom: 8,
  },
  monthArrow: {
    fontSize: 24,
    color: '#687076',
  },
  monthText: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: '#11181C',
  },
  monthNextCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#E9F0F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthArrowNext: {
    fontSize: 18,
    color: '#2E7D8A',
  },
  calendarCard: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weekDay: {
    width: '14%',
    textAlign: 'center',
    fontSize: 12,
    fontFamily: Fonts.semiBold,
    color: '#11181C',
  },
  dayCell: {
    width: '14%',
    textAlign: 'center',
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: '#11181C',
    paddingVertical: 6,
  },
  timeLabel: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: '#11181C',
    marginTop: 4,
    marginBottom: 8,
  },
  timePickerCard: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 24,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  timeColumn: {
    alignItems: 'center',
    gap: 8,
  },
  timeMuted: {
    fontSize: 20,
    fontFamily: Fonts.medium,
    color: '#B0B0B0',
  },
  timeActive: {
    fontSize: 32,
    fontFamily: Fonts.semiBold,
    color: '#11181C',
  },
  saveButton: {
    backgroundColor: '#A4332C',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 28,
  },
  saveText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: Fonts.semiBold,
  },
});
