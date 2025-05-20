import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SpaceMono_400Regular } from '@expo-google-fonts/space-mono';
import { useFonts } from 'expo-font';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Mock data
const student = {
  name: 'Alex Chen',
  school: 'MIT',
  program: 'Computer Science',
  year: 'Junior',
  image: require('@/assets/images/partial-react-logo.png'),
};

const investors = [
  'Naval Ravikant',
  'Cory Levi',
  'Bryan Johnson',
  'Oleg Viatkin',
  'Jack Dorsey',
];

const projects = [
  'Building an AI-powered education platform',
  'Exploring quantum computing applications in finance',
  'Researching new blockchain consensus mechanisms',
];

const thoughts = [
  'How might we make education more accessible through technology?',
  'The intersection of AI and human creativity is underexplored',
  'Web3 needs more focus on user experience to gain mainstream adoption',
];

const needs = [
  {
    id: 1,
    text: 'Need engineer with ML expertise',
    supporters: [0, 2], // Index of investors who support this need
  },
  {
    id: 2,
    text: 'Need Claude Credits for large-scale text processing',
    supporters: [1],
  },
  {
    id: 3,
    text: 'Need space for upcoming demo in San Francisco',
    supporters: [],
  },
  {
    id: 4,
    text: 'Need angel investor with experience in EdTech',
    supporters: [3, 4],
  },
];

export default function ProfileScreen() {
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono_400Regular,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen once fonts are loaded
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Don't render anything until fonts are loaded
  if (!fontsLoaded && !fontError) {
    return null;
  }

  const navigateToBountyDetail = (need: string) => {
    router.push({
      pathname: '/bounty-detail',
      params: { need },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} onLayout={onLayoutRootView}>
      <ThemedView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {/* Student Header */}
          <ThemedView style={styles.header}>
            <Image source={student.image} style={styles.profileImage} />
            <ThemedView style={styles.profileInfo}>
              <ThemedText type="title" style={styles.nameText}>
                {student.name}
              </ThemedText>
              <ThemedText style={styles.schoolText}>
                {student.program} @ {student.school} • {student.year}
              </ThemedText>
            </ThemedView>
          </ThemedView>

          {/* Investors Section */}
          <ThemedView style={[styles.section, {borderColor: '#E5E7EB'}]}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Investors
            </ThemedText>
            <ThemedView style={styles.investorsList}>
              {investors.map((investor, index) => (
                <ThemedView key={index} style={styles.investorItem}>
                  <View style={styles.investorAvatarPlaceholder} />
                  <ThemedText style={styles.investorName}>{investor}</ThemedText>
                </ThemedView>
              ))}
            </ThemedView>
          </ThemedView>

          {/* Projects & Thoughts Section */}
          <ThemedView style={[styles.section, {borderColor: '#E5E7EB'}]}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Projects & Thoughts
            </ThemedText>
            <ThemedView style={styles.listContainer}>
              {projects.map((project, index) => (
                <ThemedView key={`project-${index}`} style={styles.listItem}>
                  <View style={styles.bullet} />
                  <ThemedText style={styles.listItemText}>{project}</ThemedText>
                </ThemedView>
              ))}
              {thoughts.map((thought, index) => (
                <ThemedView key={`thought-${index}`} style={styles.listItem}>
                  <View style={[styles.bullet, styles.thoughtBullet]} />
                  <ThemedText style={[styles.listItemText, styles.thoughtText]}>
                    {thought}
                  </ThemedText>
                </ThemedView>
              ))}
            </ThemedView>
          </ThemedView>

          {/* Needs Section */}
          <ThemedView style={[styles.section, { marginBottom: 50, borderColor: '#E5E7EB' }]}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Needs & Support
            </ThemedText>
            <ThemedView style={styles.listContainer}>
              {needs.map((need, index) => (
                <Pressable 
                  key={index} 
                  style={styles.needItemContainer}
                  onPress={() => navigateToBountyDetail(need.text)}
                >
                  <ThemedView style={styles.needItem}>
                    <ThemedText style={styles.needText}>{need.text}</ThemedText>
                    
                    {need.supporters.length > 0 && (
                      <View style={styles.supportersContainer}>
                        {need.supporters.map((supporterIndex, i) => (
                          <View 
                            key={i} 
                            style={[
                              styles.supporterAvatar, 
                              { marginLeft: i > 0 ? -10 : 0 }
                            ]} 
                          />
                        ))}
                        {need.supporters.length > 0 && (
                          <ThemedText style={styles.supportersCount}>
                            {need.supporters.length}
                          </ThemedText>
                        )}
                      </View>
                    )}
                  </ThemedView>
                </Pressable>
              ))}
            </ThemedView>
          </ThemedView>
        </ScrollView>
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
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  profileInfo: {
    alignItems: 'center',
  },
  nameText: {
    fontSize: 24,
    marginBottom: 4,
  },
  schoolText: {
    fontSize: 16,
    color: '#6B7280',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
    fontFamily: "SpaceMono_400Regular" 
  },
  investorsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  investorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  investorAvatarPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    marginRight: 8,
  },
  investorName: {
    fontSize: 14,
  },
  listContainer: {
    gap: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0a7ea4',
    marginTop: 6,
    marginRight: 8,
  },
  thoughtBullet: {
    backgroundColor: '#8B5CF6',
  },
  listItemText: {
    flex: 1,
    fontSize: 16,
  },
  thoughtText: {
    fontStyle: 'italic',
    color: '#6B7280',
  },
  needItemContainer: {
    width: '100%',
  },
  needItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  needText: {
    fontSize: 16,
    flex: 1,
  },
  supportersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  supporterAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0a7ea4',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  supportersCount: {
    fontSize: 14,
    marginLeft: 4,
    color: '#6B7280',
  },
}); 