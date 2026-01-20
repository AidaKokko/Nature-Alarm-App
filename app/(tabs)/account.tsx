import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, StatusBar, Image } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function AccountScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Red Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ulkohälytin</Text>
        <Image
          source={require('@/assets/images/white icons no bg/no label/SetAlarm_icon_Active.png')}
          style={styles.headerIcon}
          resizeMode="contain"
        />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.screenTitle}>My Account</Text>
        {/* App Logo - Large and Centered */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Image
              source={require('@/assets/images/Logo/Alarm Logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Sign-in Message */}
        <Text style={styles.signInMessage}>Hello dear, you are not signed in.</Text>

        {/* Sign-up Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.signInButton}>
            <IconSymbol name="apple.logo" size={32} color="#000000" />
            <Text style={styles.buttonText}>Sign in with Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.googleLogo}>G</Text>
            <Text style={styles.buttonText}>Sign in with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signInButton}>
            <IconSymbol name="envelope.fill" size={28} color="#000000" />
            <Text style={styles.buttonText}>Sign in with email</Text>
          </TouchableOpacity>
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
    backgroundColor: '#A42417',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 16 : 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: Fonts.semiBold,
  },
  headerIcon: {
    width: 30,
    height: 30,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 28,
    paddingBottom: 20,
  },
  screenTitle: {
    fontSize: 24,
    color: '#11181C',
    fontFamily: Fonts.medium,
    marginBottom: 16,
    textAlign: 'center',
  },
  logoContainer: {
    marginBottom: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  logoImage: {
    width: 210,
    height: 210,
    borderRadius: 105,
  },
  signInMessage: {
    fontSize: 16,
    color: '#11181C',
    fontFamily: Fonts.regular,
    marginBottom: 32,
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    gap: 10,
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    gap: 12,
    paddingLeft: 68,
  },
  buttonText: {
    fontSize: 16,
    color: '#11181C',
    fontFamily: Fonts.medium,
  },
  googleLogo: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: '#000000',
    width: 28,
    textAlign: 'center',
  },
});
