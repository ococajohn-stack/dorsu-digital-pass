import React, { useState } from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  Text, 
  View, 
  Pressable,
  Image
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface StudentProfile {
  name: string;
  idNumber: string;
  program: string;
  yearLevel: string;
  avatarUrl: string;
  campus: string;
}

export default function App() {
  const [scanCount, setScanCount] = useState<number>(3);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [showPeer, setShowPeer] = useState<boolean>(false);

  const mainStudent: StudentProfile = {
    name: 'JOHN KENNETH OCOCA',
    idNumber: '2023-2130',
    program: 'BS in Information Technology (BSIT)',
    yearLevel: '3rd Year — Section F',
    avatarUrl: 'https://via.placeholder.com/150',
    campus: 'Main Campus (Guang-guang, Mati City)',
  };

  const peerStudent: StudentProfile = {
    name: 'MARIA CLARA S. SANTOS',
    idNumber: '2024-009183-MT',
    program: 'BS in Information Technology (BSIT)',
    yearLevel: '2nd Year — Section B',
    avatarUrl: 'https://via.placeholder.com/150',
    campus: 'Main Campus (Guang-guang, Mati City)',
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>DAVAO ORIENTAL STATE UNIVERSITY</Text>
            <Text style={styles.headerSub}>FACULTY OF COMPUTING, ENGINEERING, AND TECHNOLOGY</Text>
            <Text style={styles.headerPass}>OFFICIAL STUDENT DIGITAL PASS • AY 2026–2027</Text>
          </View>

          {/* Main Student Card Component */}
          <View style={styles.card}>
            <View style={styles.topRow}>
              <Image source={{ uri: mainStudent.avatarUrl }} style={styles.avatar} />
              <View style={styles.details}>
                <Text style={styles.name}>{mainStudent.name}</Text>
                <Text style={styles.idNumber}>ID: {mainStudent.idNumber}</Text>
                <Text style={styles.program}>{mainStudent.program}</Text>
                <Text style={styles.yearLevel}>{mainStudent.yearLevel}</Text>
              </View>
            </View>
            <View style={[styles.badge, isActive ? styles.activeBadge : styles.suspendedBadge]}>
              <Text style={styles.badgeText}>
                {isActive ? 'STATUS: VERIFIED ACTIVE PASS' : 'STATUS: PASS SUSPENDED'}
              </Text>
            </View>
            <Text style={styles.campus}>Campus: {mainStudent.campus}</Text>
          </View>

          {/* Scan Counter Component */}
          <View style={styles.scanBox}>
            <Text style={styles.scanTitle}>Campus Gate Verification Log</Text>
            <View style={styles.counterDisplay}>
              <Text style={styles.label}>Today's Gate Entries:</Text>
              <Text style={styles.value}>{scanCount}</Text>
            </View>
            <View style={styles.btnRow}>
              <Pressable 
                style={styles.btnPrimary} 
                onPress={() => setScanCount((prev: number) => prev + 1)}
              >
                <Text style={styles.btnText}>+1 Scan at Gate</Text>
              </Pressable>
              <Pressable 
                style={styles.btnSecondary} 
                onPress={() => setScanCount(0)}
              >
                <Text style={styles.btnSecText}>Reset Scans</Text>
              </Pressable>
            </View>
          </View>

          {/* Interactive Controls */}
          <Pressable 
            style={styles.toggleBtn} 
            onPress={() => setIsActive((prev: boolean) => !prev)}
          >
            <Text style={styles.toggleText}>
              ⚠️ {isActive ? 'Simulate Pass Suspension' : 'Reactivate Pass'}
            </Text>
          </Pressable>

          <Pressable 
            style={styles.peerBtn} 
            onPress={() => setShowPeer((prev: boolean) => !prev)}
          >
            <Text style={styles.peerBtnText}>
              {showPeer ? 'Hide Peer Component' : 'Show Peer Component Demo'}
            </Text>
          </Pressable>

          {/* Peer Component Demo Conditional Rendering */}
          {showPeer && (
            <View style={styles.peerContainer}>
              <Text style={styles.peerSectionTitle}>PEER PROPS DEMO:</Text>
              <View style={styles.card}>
                <View style={styles.topRow}>
                  <Image source={{ uri: peerStudent.avatarUrl }} style={styles.avatar} />
                  <View style={styles.details}>
                    <Text style={styles.name}>{peerStudent.name}</Text>
                    <Text style={styles.idNumber}>ID: {peerStudent.idNumber}</Text>
                    <Text style={styles.program}>{peerStudent.program}</Text>
                    <Text style={styles.yearLevel}>{peerStudent.yearLevel}</Text>
                  </View>
                </View>
                <View style={[styles.badge, styles.activeBadge]}>
                  <Text style={styles.badgeText}>STATUS: VERIFIED ACTIVE PASS</Text>
                </View>
                <Text style={styles.campus}>Campus: {peerStudent.campus}</Text>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f9fafb' },
  container: { padding: 16 },
  header: { alignItems: 'center', marginBottom: 16, borderBottomWidth: 1, borderBottomColor: '#e5e7eb', paddingBottom: 12 },
  headerTitle: { fontSize: 13, fontWeight: 'bold', color: '#065f46' },
  headerSub: { fontSize: 9, color: '#4b5563', textAlign: 'center' },
  headerPass: { fontSize: 11, fontWeight: '600', color: '#1f2937', marginTop: 4 },
  card: { backgroundColor: '#ffffff', padding: 16, borderRadius: 12, marginBottom: 16, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3 },
  topRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#e5e7eb' },
  details: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#1f2937' },
  idNumber: { fontSize: 13, color: '#4b5563' },
  program: { fontSize: 12, color: '#6b7280' },
  yearLevel: { fontSize: 12, color: '#6b7280' },
  campus: { fontSize: 11, fontStyle: 'italic', color: '#374151', marginTop: 4 },
  badge: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6, marginVertical: 8, alignSelf: 'flex-start' },
  activeBadge: { backgroundColor: '#d1fae5' },
  suspendedBadge: { backgroundColor: '#fee2e2' },
  badgeText: { fontSize: 11, fontWeight: 'bold', color: '#065f46' },
  scanBox: { backgroundColor: '#f3f4f6', padding: 16, borderRadius: 12, marginBottom: 16 },
  scanTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 8, color: '#111827' },
  counterDisplay: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  label: { fontSize: 13, color: '#374151' },
  value: { fontSize: 20, fontWeight: 'bold', color: '#1d4ed8' },
  btnRow: { flexDirection: 'row', gap: 8 },
  btnPrimary: { flex: 1, backgroundColor: '#2563eb', paddingVertical: 10, borderRadius: 6, alignItems: 'center' },
  btnText: { color: '#ffffff', fontWeight: 'bold', fontSize: 13 },
  btnSecondary: { flex: 1, backgroundColor: '#e5e7eb', paddingVertical: 10, borderRadius: 6, alignItems: 'center' },
  btnSecText: { color: '#374151', fontWeight: 'bold', fontSize: 13 },
  toggleBtn: { backgroundColor: '#fef3c7', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  toggleText: { color: '#92400e', fontWeight: 'bold', fontSize: 13 },
  peerBtn: { backgroundColor: '#e0e7ff', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 16 },
  peerBtnText: { color: '#3730a3', fontWeight: 'bold', fontSize: 13 },
  peerContainer: { marginTop: 4 },
  peerSectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#4b5563', marginBottom: 8 },
});