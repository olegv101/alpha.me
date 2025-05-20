import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingScreen() {
  const [inviteCode, setInviteCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');

  // Mock validation - in a real app, this would make an API call
  const validateInviteCode = () => {
    setIsValidating(true);
    setError('');
    
    // Simulate API call delay
    setTimeout(() => {
      // For demo, we'll accept any 6-character code
      if (inviteCode.length === 6) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        // Navigate to the main app
        router.replace('/(tabs)/market');
      } else {
        setError('Invalid invite code. Please check and try again.');
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
      setIsValidating(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ThemedView style={styles.contentContainer}>
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.logo}
          />
          
          <ThemedView style={styles.welcomeContainer}>
            <ThemedText type="title" style={styles.title}>
              Welcome to Alpha Me
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Connect with VCs who believe in your potential
            </ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.formContainer}>
            <ThemedText type="defaultSemiBold" style={styles.inputLabel}>
              Enter your invite code
            </ThemedText>
            <TextInput
              style={styles.input}
              value={inviteCode}
              onChangeText={setInviteCode}
              placeholder="6-character code"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="characters"
              autoCorrect={false}
              maxLength={6}
            />
            {error ? (
              <ThemedText style={styles.errorText}>{error}</ThemedText>
            ) : null}
            
            <TouchableOpacity
              style={[
                styles.submitButton,
                (inviteCode.length < 1 || isValidating) && styles.submitButtonDisabled,
              ]}
              onPress={validateInviteCode}
              disabled={inviteCode.length < 1 || isValidating}
            >
              <ThemedText style={styles.submitButtonText}>
                {isValidating ? 'Validating...' : 'Join Alpha Me'}
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
          
          <ThemedView style={styles.footerContainer}>
            <ThemedText style={styles.footerText}>
              Alpha Me is an invite-only platform connecting promising college founders with VCs who believe in their potential.
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F9F7', // Slightly off-white background
  },
  container: {
    flex: 1,
    backgroundColor: '#F9F9F7', // Slightly off-white background
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 40,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 40,
  },
  inputLabel: {
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 16,
    fontSize: 18,
    marginBottom: 16,
    letterSpacing: 2,
    textAlign: 'center',
  },
  errorText: {
    color: '#EF4444',
    marginBottom: 16,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#0a7ea4',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerContainer: {
    alignItems: 'center',
  },
  footerText: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
  },
}); 