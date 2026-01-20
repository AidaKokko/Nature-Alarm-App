import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Image } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'expo-router';
import { Fonts } from '@/constants/theme';

interface HeaderProps {
  title: string;
  showFlags?: boolean;
}

export function Header({ title, showFlags = false }: HeaderProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <View style={styles.header}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.headerRight}>
        {showFlags && (
          <>
            <TouchableOpacity
              onPress={() => setLanguage('fi')}
              style={[styles.flagButton, language === 'fi' && styles.flagButtonActive]}>
              <Image
                source={require('@/assets/images/FI_Finnish flag.png')}
                style={styles.flag}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setLanguage('en')}
              style={[styles.flagButton, language === 'en' && styles.flagButtonActive]}>
              <Image
                source={require('@/assets/images/GB_Eng_flag.png')}
                style={styles.flag}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </>
        )}
        <Link href="/(tabs)/account" asChild>
          <TouchableOpacity>
            <IconSymbol name="person.circle" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#A42417',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 14 : 14,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: Fonts.semiBold,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  flagButton: {
    padding: 3,
    borderRadius: 4,
    opacity: 0.7,
  },
  flagButtonActive: {
    opacity: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  flag: {
    width: 26,
    height: 18,
  },
});
