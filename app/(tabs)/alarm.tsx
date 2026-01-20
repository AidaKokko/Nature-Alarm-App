import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Switch,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function AlarmScreen() {
  const [alarmEnabled, setAlarmEnabled] = useState(true);
  const [selectedDays, setSelectedDays] = useState<string[]>(['Tue', 'Thu', 'Sat']);
  const [alarmTime, setAlarmTime] = useState<Date>(new Date());
  const [alarmVolume, setAlarmVolume] = useState(0.6);
  const [soundModalVisible, setSoundModalVisible] = useState(false);
  const [selectedSound, setSelectedSound] = useState('birds-forest-nature.mp3');

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const soundOptions = [
    'avala-trail-forest-nature.mp3',
    'birds-forest-nature.mp3',
    'calm-nature-ambience.mp3',
    'jungle-nature.mp3',
    'nature-ambience.mp3',
    'nature-birds-singing.mp3',
    'nature.mp3',
    'sound-of-walking-out-in-nature.mp3',
    'spring-forest-nature.mp3',
  ];

  const formatSoundLabel = (fileName: string) =>
    fileName
      .replace(/\.mp3$/i, '')
      .replace(/[-_]+/g, ' ')
      .replace(/\b\w/g, (match) => match.toUpperCase());

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const timeParts = useMemo(() => {
    const formatted = alarmTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    const [time, period] = formatted.split(' ');
    return { time, period: period || '' };
  }, [alarmTime]);

  const openTimePicker = () => {
    DateTimePickerAndroid.open({
      value: alarmTime,
      mode: 'time',
      is24Hour: false,
      onChange: (event, date) => {
        if (event.type === 'set' && date) {
          setAlarmTime(date);
        }
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ulkohälytin</Text>
        <Image
          source={require('@/assets/images/white icons no bg/no label/SetAlarm_icon_Active.png')}
          style={styles.headerIcon}
          resizeMode="contain"
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.timePickerCard} onPress={openTimePicker} activeOpacity={0.8}>
          <Text style={styles.timeActive}>{timeParts.time}</Text>
          <Text style={styles.timePeriod}>{timeParts.period}</Text>
        </TouchableOpacity>

        <View style={styles.settingsCard}>
          <Text style={styles.sectionLabel}>Repeat</Text>
          <View style={styles.repeatRow}>
            {days.map((day) => {
              const active = selectedDays.includes(day);
              return (
                <TouchableOpacity
                  key={day}
                  style={[styles.dayChip, active && styles.dayChipActive]}
                  onPress={() => toggleDay(day)}>
                  <Text style={[styles.dayChipText, active && styles.dayChipTextActive]}>{day}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Mission</Text>
              <Text style={styles.settingValue}>Connect with nature</Text>
            </View>
            <View style={styles.chevronBox}>
              <IconSymbol name="chevron.right" size={16} color="#EAF6FF" />
            </View>
          </View>

          <TouchableOpacity style={styles.settingRow} onPress={() => setSoundModalVisible(true)}>
            <View>
              <Text style={styles.settingLabel}>Alarm Sound</Text>
              <Text style={styles.settingValueBold}>{formatSoundLabel(selectedSound)}</Text>
            </View>
            <View style={styles.chevronBox}>
              <IconSymbol name="chevron.right" size={16} color="#EAF6FF" />
            </View>
          </TouchableOpacity>

          <Text style={styles.sectionLabel}>Alarm Volume</Text>
          <Slider
            style={styles.volumeSlider}
            value={alarmVolume}
            onValueChange={setAlarmVolume}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#0086BB"
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor="#A42417"
          />

        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <Modal
        transparent
        animationType="fade"
        visible={soundModalVisible}
        onRequestClose={() => setSoundModalVisible(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setSoundModalVisible(false)}>
          <Pressable style={styles.modalCard} onPress={(event) => event.stopPropagation()}>
            <Text style={styles.modalTitle}>Choose alarm sound</Text>
            {soundOptions.map((fileName) => (
              <TouchableOpacity
                key={fileName}
                style={styles.modalRow}
                onPress={() => {
                  setSelectedSound(fileName);
                  setSoundModalVisible(false);
                }}>
                <Text style={styles.modalRowText}>{formatSoundLabel(fileName)}</Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
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
    paddingVertical: 12,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 12 : 12,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: Fonts.semiBold,
  },
  headerIcon: {
    width: 26,
    height: 26,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  timePickerCard: {
    width: '100%',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    gap: 12,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  timeActive: {
    fontSize: 40,
    fontFamily: Fonts.semiBold,
    color: '#11181C',
  },
  timePeriod: {
    fontSize: 18,
    fontFamily: Fonts.medium,
    color: '#8C8C8C',
    marginTop: 6,
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: '#A42417',
    marginBottom: 8,
    marginTop: 8,
  },
  repeatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dayChip: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  dayChipActive: {
    backgroundColor: '#A42417',
    borderColor: '#A42417',
  },
  dayChipText: {
    fontSize: 11,
    fontFamily: Fonts.medium,
    color: '#11181C',
  },
  dayChipTextActive: {
    color: '#FFFFFF',
    fontFamily: Fonts.semiBold,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingLabel: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#8C8C8C',
    marginBottom: 4,
  },
  settingValue: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: '#11181C',
  },
  settingValueBold: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: '#11181C',
  },
  chevronBox: {
    width: 26,
    height: 26,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#11181C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  volumeSlider: {
    width: '100%',
    height: 30,
    marginBottom: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 24,
  },
  cancelButton: {
    flex: 1,
    marginRight: 12,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#EAEAEA',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: '#11181C',
  },
  saveButton: {
    flex: 1,
    marginLeft: 12,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#A42417',
    alignItems: 'center',
  },
  saveText: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: '#11181C',
    marginBottom: 12,
  },
  modalRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalRowText: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    color: '#11181C',
  },
});
