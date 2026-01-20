import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Fonts } from '@/constants/theme';
import { getAvatarIndex, setAvatarIndex } from '@/lib/profile-storage';

const avatars = [
  { emoji: '👩‍🌾', label: 'Gardener', color: '#F2D7C5' },
  { emoji: '🧑‍🔬', label: 'Scientist', color: '#D6E8F5' },
  { emoji: '🧑‍🎨', label: 'Artist', color: '#EAD6F5' },
  { emoji: '🧑‍💻', label: 'Coder', color: '#D6F5E4' },
  { emoji: '🧑‍🏫', label: 'Teacher', color: '#F5E5D6' },
  { emoji: '🧑‍🚴', label: 'Cyclist', color: '#E2F0C9' },
];

export default function ProfileScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    getAvatarIndex().then(setSelected);
  }, []);

  const onSelect = async (index: number) => {
    setSelected(index);
    await setAvatarIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Image
            source={require('@/assets/images/white icons no bg/no label/SetAlarm_icon_Active.png')}
            style={styles.headerIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Choose your avatar</Text>
        <View style={styles.avatarGrid}>
          {avatars.map((avatar, index) => (
            <TouchableOpacity
              key={avatar.label}
              style={[styles.avatarCard, selected === index && styles.avatarCardActive]}
              onPress={() => onSelect(index)}>
              <View style={[styles.avatarCircle, { backgroundColor: avatar.color }]}>
                <Text style={styles.avatarEmoji}>{avatar.emoji}</Text>
              </View>
              <Text style={styles.avatarLabel}>{avatar.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
  headerIcon: {
    width: 26,
    height: 26,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: Fonts.semiBold,
  },
  headerSpacer: {
    width: 32,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: '#11181C',
    marginBottom: 12,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  avatarCard: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  avatarCardActive: {
    borderColor: '#A4332C',
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarEmoji: {
    fontSize: 28,
  },
  avatarLabel: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: '#11181C',
  },
});
