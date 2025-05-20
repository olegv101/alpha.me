import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Alert, Share, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Generate a random alphanumeric code
const generateRandomCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export default function InviteScreen() {
  // Initial state: 3 available codes
  const [inviteCodes, setInviteCodes] = useState([
    { id: 1, code: generateRandomCode(), used: false },
    { id: 2, code: generateRandomCode(), used: false },
    { id: 3, code: generateRandomCode(), used: false },
  ]);

  // Function to generate a new code (simulating when someone uses your code)
  const generateNewCode = () => {
    // In a real app, this would be triggered when someone else uses your code
    // For demo purposes, we'll add a button to simulate this
    const newCode = {
      id: inviteCodes.length + 1,
      code: generateRandomCode(),
      used: false,
    };
    setInviteCodes([...inviteCodes, newCode]);
    
    // Trigger haptic feedback
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    // Show notification
    Alert.alert(
      'New Code Generated!',
      'Someone used your invite code. You received a new code to share!',
      [{ text: 'OK' }]
    );
  };

  // Function to mark a code as used (for demo purposes)
  const markCodeAsUsed = (id) => {
    setInviteCodes(
      inviteCodes.map((code) =>
        code.id === id ? { ...code, used: true } : code
      )
    );
  };

  // Function to share an invite code
  const shareInviteCode = async (code) => {
    try {
      const result = await Share.share({
        message: `Join me on Alpha Me! Use my invite code: ${code}`,
        url: 'https://alphame.app/invite', // This would be your actual app URL
      });
      
      if (result.action === Share.sharedAction) {
        // For demo purposes, we'll mark the code as used when shared
        // In a real app, this would happen when the invitee actually uses the code
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong sharing the invite code');
    }
  };

  const availableCodes = inviteCodes.filter((code) => !code.used);
  const usedCodes = inviteCodes.filter((code) => code.used);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.headerContainer}>
          <ThemedText type="title" style={styles.headerTitle}>
            Invite Friends
          </ThemedText>
          <ThemedText style={styles.headerSubtitle}>
            Share your unique invite codes with friends to give them access to Alpha Me
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.sectionContainer}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Available Codes ({availableCodes.length})
          </ThemedText>
          {availableCodes.length > 0 ? (
            availableCodes.map((codeItem) => (
              <ThemedView key={codeItem.id} style={styles.codeCard}>
                <ThemedView style={styles.codeContainer}>
                  <ThemedText type="defaultSemiBold" style={styles.codeText}>
                    {codeItem.code}
                  </ThemedText>
                </ThemedView>
                <TouchableOpacity
                  style={styles.shareButton}
                  onPress={() => shareInviteCode(codeItem.code)}
                >
                  <ThemedText style={styles.shareButtonText}>Share</ThemedText>
                </TouchableOpacity>
              </ThemedView>
            ))
          ) : (
            <ThemedView style={styles.emptyStateContainer}>
              <ThemedText style={styles.emptyStateText}>
                You have no available invite codes
              </ThemedText>
            </ThemedView>
          )}
        </ThemedView>

        <ThemedView style={styles.sectionContainer}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Used Codes ({usedCodes.length})
          </ThemedText>
          {usedCodes.length > 0 ? (
            usedCodes.map((codeItem) => (
              <ThemedView key={codeItem.id} style={[styles.codeCard, styles.usedCodeCard]}>
                <ThemedView style={styles.codeContainer}>
                  <ThemedText style={[styles.codeText, styles.usedCodeText]}>
                    {codeItem.code}
                  </ThemedText>
                  <ThemedText style={styles.usedBadge}>Used</ThemedText>
                </ThemedView>
              </ThemedView>
            ))
          ) : (
            <ThemedView style={styles.emptyStateContainer}>
              <ThemedText style={styles.emptyStateText}>
                You haven't used any invite codes yet
              </ThemedText>
            </ThemedView>
          )}
        </ThemedView>

        {/* Demo button to simulate someone using your code */}
        <ThemedView style={styles.demoContainer}>
          <ThemedText style={styles.demoText}>
            Demo: Press the button below to simulate someone using your invite code
          </ThemedText>
          <TouchableOpacity
            style={styles.demoButton}
            onPress={generateNewCode}
          >
            <ThemedText style={styles.demoButtonText}>
              Simulate Code Usage
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
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
    padding: 16,
  },
  headerContainer: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  codeCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  usedCodeCard: {
    backgroundColor: '#F3F4F6',
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeText: {
    fontSize: 20,
    letterSpacing: 1,
  },
  usedCodeText: {
    color: '#9CA3AF',
  },
  usedBadge: {
    marginLeft: 8,
    fontSize: 12,
    color: '#9CA3AF',
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  shareButton: {
    backgroundColor: '#0a7ea4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  emptyStateContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  emptyStateText: {
    color: '#6B7280',
    fontSize: 16,
  },
  demoContainer: {
    marginTop: 40,
    padding: 16,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  demoText: {
    fontSize: 14,
    color: '#1E40AF',
    marginBottom: 16,
  },
  demoButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
  },
  demoButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
}); 