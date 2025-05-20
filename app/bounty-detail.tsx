import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Checkbox from 'expo-checkbox';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BountyDetailScreen() {
  const { need } = useLocalSearchParams();
  const [selectedOptions, setSelectedOptions] = useState<boolean[]>([false, false, false]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const helpOptions = [
    'Share my network - recommend introductions',
    'Offer to mentor or advise',
    'Contribute resources or funding',
  ];

  const anySelected = selectedOptions.some(option => option);

  const handleToggleOption = (index: number) => {
    const newOptions = [...selectedOptions];
    newOptions[index] = !newOptions[index];
    setSelectedOptions(newOptions);
  };

  const handleConfirm = () => {
    if (!anySelected) return;
    
    setIsSubmitting(true);
    
    // In a real app, you would save this to a database
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/threads');
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <ThemedView style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <ThemedText>← Back</ThemedText>
          </Pressable>
          <ThemedText type="title" style={styles.title}>Bounty Details</ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText type="subtitle" style={styles.needText}>{need}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>How You Can Help</ThemedText>
          
          <ThemedView style={styles.checklistContainer}>
            {helpOptions.map((option, index) => (
              <Pressable 
                key={index} 
                style={styles.checklistItem}
                onPress={() => handleToggleOption(index)}
              >
                <Checkbox
                  value={selectedOptions[index]}
                  onValueChange={() => handleToggleOption(index)}
                  style={styles.checkbox}
                  color={selectedOptions[index] ? '#0a7ea4' : undefined}
                />
                <ThemedText style={styles.checklistText}>{option}</ThemedText>
              </Pressable>
            ))}
          </ThemedView>
        </ThemedView>

        <Pressable 
          style={[
            styles.confirmButton, 
            anySelected ? styles.confirmButtonActive : styles.confirmButtonInactive
          ]}
          onPress={handleConfirm}
          disabled={!anySelected || isSubmitting}
        >
          <ThemedText style={styles.confirmButtonText}>
            {isSubmitting ? 'Adding to Threads...' : 'Confirm Support'}
          </ThemedText>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F9F7',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  title: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
    marginRight: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  needText: {
    fontSize: 18,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  checklistContainer: {
    gap: 16,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  checkbox: {
    marginRight: 12,
  },
  checklistText: {
    fontSize: 16,
  },
  confirmButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 40,
  },
  confirmButtonActive: {
    backgroundColor: '#F97316', // Orange
  },
  confirmButtonInactive: {
    backgroundColor: '#D1D5DB', // Gray
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 