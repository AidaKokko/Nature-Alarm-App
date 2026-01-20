import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Fonts } from '@/constants/theme';
import { addJournalEntry, getJournalEntries, type JournalEntry } from '@/lib/journal-storage';

export default function JournalScreen() {
  const router = useRouter();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    getJournalEntries().then(setEntries);
  }, []);

  const onAdd = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const updated = await addJournalEntry(trimmed);
    setEntries(updated);
    setText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Journal</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.inputCard}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Write a short reflection..."
          placeholderTextColor="#9BA1A6"
          style={styles.input}
          multiline
        />
        <TouchableOpacity style={styles.addButton} onPress={onAdd}>
          <Text style={styles.addButtonText}>Add Entry</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {entries.length === 0 ? (
          <Text style={styles.emptyText}>No entries yet. Start by adding your first note.</Text>
        ) : (
          entries.map((entry) => (
            <View key={entry.id} style={styles.entryCard}>
              <Text style={styles.entryText}>{entry.text}</Text>
              <Text style={styles.entryDate}>
                {new Date(entry.createdAt).toLocaleDateString()}
              </Text>
            </View>
          ))
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
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: Fonts.semiBold,
  },
  headerSpacer: {
    width: 32,
  },
  inputCard: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 12,
    margin: 16,
    backgroundColor: '#FFFFFF',
  },
  input: {
    minHeight: 80,
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#11181C',
    lineHeight: 20,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#A4332C',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
  list: {
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#687076',
    textAlign: 'center',
    marginTop: 24,
  },
  entryCard: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  entryText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#11181C',
    lineHeight: 20,
  },
  entryDate: {
    marginTop: 6,
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: '#A4332C',
  },
});
