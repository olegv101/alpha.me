import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'expo-image';
import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data
const breakingNews = [
  "Sarah Li launches quantum computing project",
  "Alex Chen secures $2M seed funding",
  "Maya Johnson presents at Stanford Demo Day",
  "Kevin Park releases AI research paper",
  "Zoe Smith partners with Google Research",
];

const studentStocks = [
  {
    id: '1',
    name: 'Sarah Li',
    school: 'Stanford',
    recentUpdate: 'Launched a quantum computing project',
    backers: 7,
    direction: 'up',
    percent: '12%',
    image: require('@/assets/images/partial-react-logo.png'),
  },
  {
    id: '2',
    name: 'Alex Chen',
    school: 'MIT',
    recentUpdate: 'Secured $2M seed funding for AI startup',
    backers: 12,
    direction: 'up',
    percent: '23%',
    image: require('@/assets/images/partial-react-logo.png'),
  },
  {
    id: '3',
    name: 'Maya Johnson',
    school: 'Harvard',
    recentUpdate: 'Presented at Stanford Demo Day',
    backers: 5,
    direction: 'neutral',
    percent: '0%',
    image: require('@/assets/images/partial-react-logo.png'),
  },
  {
    id: '4',
    name: 'Kevin Park',
    school: 'UC Berkeley',
    recentUpdate: 'Released a research paper on AI',
    backers: 9,
    direction: 'up',
    percent: '8%',
    image: require('@/assets/images/partial-react-logo.png'),
  },
  {
    id: '5',
    name: 'Zoe Smith',
    school: 'Princeton',
    recentUpdate: 'Partnered with Google Research',
    backers: 10,
    direction: 'down',
    percent: '3%',
    image: require('@/assets/images/partial-react-logo.png'),
  },
];

export default function MarketScreen() {
  const scrollX = useSharedValue(0);
  const scrollViewRef = useRef(null);

  // Automatically scroll the news ticker
  useEffect(() => {
    scrollX.value = withRepeat(
      withSequence(
        withTiming(-1000, { duration: 20000 }),
        withTiming(0, { duration: 0 })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: scrollX.value }],
    };
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        {/* Breaking News Ticker */}
        <ThemedView style={styles.tickerContainer}>
          <ThemedText style={styles.breakingNewsLabel}>BREAKING:</ThemedText>
          <View style={styles.tickerContent}>
            <Animated.View style={[styles.tickerTextContainer, animatedStyle]}>
              <ThemedText style={styles.tickerText}>
                {breakingNews.join(' • ')}
              </ThemedText>
            </Animated.View>
          </View>
        </ThemedView>

        <ScrollView style={styles.scrollView}>
          {/* Market Summary Header */}
          <ThemedView style={styles.marketSummaryContainer}>
            <ThemedText type="subtitle" style={styles.marketSummaryTitle}>
              Student Market Summary
            </ThemedText>
            <ThemedText style={styles.marketDate}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </ThemedText>
          </ThemedView>

          {/* Student Stock Cards */}
          {studentStocks.map((student) => (
            <ThemedView key={student.id} style={styles.studentCard}>
              <View style={styles.studentCardHeader}>
                <Image source={student.image} style={styles.studentImage} />
                <View style={styles.studentInfo}>
                  <ThemedText type="defaultSemiBold" style={styles.studentName}>
                    {student.name}
                  </ThemedText>
                  <ThemedText style={styles.studentSchool}>{student.school}</ThemedText>
                </View>
                <View style={styles.backerInfo}>
                  <ThemedText
                    style={[
                      styles.backerPercent,
                      {
                        color:
                          student.direction === 'up'
                            ? '#34D399'
                            : student.direction === 'down'
                            ? '#F87171'
                            : '#9CA3AF',
                      },
                    ]}
                  >
                    {student.direction === 'up'
                      ? '↑'
                      : student.direction === 'down'
                      ? '↓'
                      : '→'}{' '}
                    {student.percent}
                  </ThemedText>
                  <ThemedText style={styles.backerCount}>
                    {student.backers} backers
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={styles.recentUpdate}>
                {student.recentUpdate}
              </ThemedText>
            </ThemedView>
          ))}
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
  tickerContainer: {
    flexDirection: 'row',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
  },
  breakingNewsLabel: {
    fontWeight: 'bold',
    color: '#EF4444',
    paddingHorizontal: 10,
  },
  tickerContent: {
    flex: 1,
    overflow: 'hidden',
  },
  tickerTextContainer: {
    flexDirection: 'row',
    width: 3000, // Long enough to hold all the text
  },
  tickerText: {
    paddingRight: 50,
  },
  scrollView: {
    flex: 1,
  },
  marketSummaryContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  marketSummaryTitle: {
    fontSize: 18,
  },
  marketDate: {
    color: '#6B7280',
    fontSize: 14,
    marginTop: 4,
  },
  studentCard: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  studentCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  studentImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
  },
  studentSchool: {
    fontSize: 12,
    color: '#6B7280',
  },
  backerInfo: {
    alignItems: 'flex-end',
  },
  backerPercent: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  backerCount: {
    fontSize: 12,
    color: '#6B7280',
  },
  recentUpdate: {
    fontSize: 14,
    color: '#374151',
  },
}); 