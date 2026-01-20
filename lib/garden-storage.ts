import AsyncStorage from '@react-native-async-storage/async-storage';

export type GardenSpecies = {
  name: string;
  scientificName: string;
  addedAt: string;
};

const STORAGE_KEY = 'garden_species';

export async function getGardenSpecies(): Promise<GardenSpecies[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as GardenSpecies[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function addGardenSpecies(species: Omit<GardenSpecies, 'addedAt'>) {
  const existing = await getGardenSpecies();
  const already = existing.some(
    (item) => item.name === species.name && item.scientificName === species.scientificName
  );
  if (already) return existing;
  const updated = [
    { ...species, addedAt: new Date().toISOString() },
    ...existing,
  ];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}
