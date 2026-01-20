import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'profile_avatar_index';

export async function getAvatarIndex(): Promise<number> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  const parsed = raw ? Number(raw) : 0;
  return Number.isFinite(parsed) ? parsed : 0;
}

export async function setAvatarIndex(index: number) {
  await AsyncStorage.setItem(STORAGE_KEY, String(index));
}
