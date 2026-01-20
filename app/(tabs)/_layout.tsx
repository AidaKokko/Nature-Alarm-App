import { Tabs, useSegments } from 'expo-router';
import React from 'react';
import { Image, Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const tabBarBottomPadding = Math.max(insets.bottom, Platform.OS === 'android' ? 12 : 8);
  const segments = useSegments();
  const isAccountRoute = segments.includes('account');

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#11181C',
        tabBarInactiveTintColor: '#9BA1A6',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          paddingBottom: tabBarBottomPadding,
          paddingTop: 6,
          height: 60 + tabBarBottomPadding,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('hq'),
          tabBarIcon: ({ focused }) => (
            <Image
              source={(focused || isAccountRoute)
                ? require('@/assets/images/no_background/No Label/HQ_icon_Active.png')
                : require('@/assets/images/no_background/No Label/HQ_icon_inactive.png')
              }
              style={styles.tabIcon}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="challenge"
        options={{
          title: t('challenge'),
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused 
                ? require('@/assets/images/no_background/No Label/Challenge_icon_Active.png')
                : require('@/assets/images/no_background/No Label/Challenge_icon_inactive.png')
              }
              style={styles.tabIcon}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="alarm"
        options={{
          title: t('setAlarm'),
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused 
                ? require('@/assets/images/no_background/No Label/SetAlarm_icon_Active.png')
                : require('@/assets/images/no_background/No Label/SetAlarm_icon_Inactive.png')
              }
              style={styles.tabIcon}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="garden"
        options={{
          title: t('myGarden'),
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused 
                ? require('@/assets/images/no_background/No Label/Garden_icon_Active.png')
                : require('@/assets/images/no_background/No Label/Garden_icon_Inactive.png')
              }
              style={[styles.tabIcon, styles.tabIconGarden]}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null, // Hide from tab bar, accessible via navigation
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          href: null, // Hide from tab bar, accessible via navigation
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 44,
    height: 44,
  },
  tabIconGarden: {
    marginBottom: 3,
  },
});
