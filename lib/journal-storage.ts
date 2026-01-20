import AsyncStorage from '@react-native-async-storage/async-storage';

export type JournalEntry = {
  id: string;
  text: string;
  createdAt: string;
};

const STORAGE_KEY = 'journal_entries';

export async function getJournalEntries(): Promise<JournalEntry[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as JournalEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function addJournalEntry(text: string): Promise<JournalEntry[]> {
  const entry: JournalEntry = {
    id: `${Date.now()}`,
    text,
    createdAt: new Date().toISOString(),
  };
  const existing = await getJournalEntries();
  const updated = [entry, ...existing];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}
