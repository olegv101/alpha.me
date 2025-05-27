import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PRIMARY_COLOR = '#1A3177';
const BG_COLOR = '#F1F1F1';
const WHITE = '#FFFFFF';
const DARK = '#0E0E0E';
const BORDER = '#D3D3D3';

export default function MainScreen() {
  const [step, setStep] = useState(1);
  const [inviteCode, setInviteCode] = useState('');
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  // Step 1: Welcome/invite screen
  if (step === 1) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: BG_COLOR }]}>  
        <View style={styles.container}>
          {/* Large background image (optional, placeholder) */}
          <View style={styles.bgImageWrap}>
            <Image source={require('@/assets/images/partial-react-logo.png')} style={styles.bgImage} resizeMode="contain" />
          </View>
          <Text style={styles.alphaLogo}>ALPHA</Text>
          {/* Main picture in the center */}
          <Image source={require('@/assets/images/partial-react-logo.png')} style={styles.mainPicture} resizeMode="contain" />
          <View style={styles.inviteTextWrap}>
            <Text style={styles.invitedText}>you've been invited to αlpha</Text>
            <Text style={styles.statText}>you're of statistical significance (~0.05)</Text>
          </View>
          <TouchableOpacity style={styles.continueBtn} onPress={() => setStep(2)}>
            <Text style={styles.continueBtnText}>continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Step 2: Enter invite code
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: BG_COLOR }]}>  
      <View style={styles.container}>
        <Text style={styles.alphaLogo2}>ALPHA</Text>
        <View style={styles.pValueRow}>
          <Text style={styles.pValueText}>enter p-value</Text>
          <Text style={styles.pValueSubText}>(invite code)</Text>
        </View>
        <View style={styles.codeBoxesRow}>
          {[0,1,2,3,4,5].map((i) => (
            <View key={i} style={[styles.codeBox, { borderColor: BORDER, backgroundColor: WHITE }]}>  
              <Text style={styles.codeBoxText}>{inviteCode[i] || ''}</Text>
            </View>
          ))}
        </View>
        <TextInput
          style={styles.hiddenInput}
          value={inviteCode}
          onChangeText={text => {
            setInviteCode(text.replace(/[^a-zA-Z0-9]/g, '').slice(0, 6));
            setError('');
          }}
          autoFocus
          maxLength={6}
          keyboardType="default"
          textContentType="oneTimeCode"
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity
          style={[styles.continueBtn, inviteCode.length !== 6 && { opacity: 0.5 }]}
          onPress={() => {
            if (inviteCode.length === 6) {
              setIsValidating(true);
              setTimeout(() => {
                setIsValidating(false);
                router.replace('/(tabs)/market');
              }, 1000);
            } else {
              setError('Please enter a valid 6-character code.');
            }
          }}
          disabled={inviteCode.length !== 6 || isValidating}
        >
          <Text style={styles.continueBtnText}>{isValidating ? 'Validating...' : 'continue'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  bgImageWrap: {
    position: 'absolute',
    top: 120,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: -1,
  },
  bgImage: {
    width: 300,
    height: 300,
    opacity: 0.15,
  },
  mainPicture: {
    width: 180,
    height: 180,
    marginBottom: 32,
    marginTop: -10,
    alignSelf: 'center',
  },
  alphaLogo: {
    fontSize: 29,
    color: PRIMARY_COLOR,
    fontWeight: '400',
    marginBottom: 40,
    marginTop: 80,
    letterSpacing: 2,
  },
  inviteTextWrap: {
    alignItems: 'center',
    marginBottom: 40,
  },
  invitedText: {
    fontSize: 16,
    color: PRIMARY_COLOR,
    marginBottom: 8,
  },
  statText: {
    fontSize: 16,
    color: PRIMARY_COLOR,
  },
  continueBtn: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 38,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 40,
  },
  continueBtnText: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  // Step 2 styles
  alphaLogo2: {
    fontSize: 29,
    color: PRIMARY_COLOR,
    fontWeight: '400',
    marginBottom: 40,
    marginTop: 40,
    letterSpacing: 2,
  },
  pValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 12,
  },
  pValueText: {
    fontSize: 16,
    color: PRIMARY_COLOR,
    fontWeight: '400',
  },
  pValueSubText: {
    fontSize: 16,
    color: PRIMARY_COLOR,
    fontWeight: '400',
    opacity: 0.7,
  },
  codeBoxesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 24,
  },
  codeBox: {
    width: 44,
    height: 56,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  codeBoxText: {
    fontSize: 28,
    color: PRIMARY_COLOR,
    fontWeight: '400',
    letterSpacing: 2,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
  errorText: {
    color: '#EF4444',
    marginBottom: 8,
    textAlign: 'center',
  },
}); 