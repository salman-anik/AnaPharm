import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ModelScreen from './src/screens/ModelScreen';
import SystemsScreen from './src/screens/SystemsScreen';
import SearchScreen from './src/screens/SearchScreen';
import QuizScreen from './src/screens/QuizScreen';
import SettingsScreen from './src/screens/SettingsScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState('model');

  // Shared state across the app
  const [theme, setTheme] = useState('dark');
  const [bpm, setBpm] = useState(72);
  const [respRate, setRespRate] = useState(16);
  const [autoRotate, setAutoRotate] = useState(false);
  const [xrayMode, setXrayMode] = useState(false);
  const [explodeVal, setExplodeVal] = useState(0);

  const tabs = [
    { id: 'model', label: '3D Model', icon: '🧍' },
    { id: 'systems', label: 'Systems', icon: '🧬' },
    { id: 'search', label: 'Search', icon: '🔍' },
    { id: 'quiz', label: 'Quiz', icon: '🎯' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'model':
        return (
          <ModelScreen
            bpm={bpm}
            respRate={respRate}
            autoRotate={autoRotate}
            setAutoRotate={setAutoRotate}
            xrayMode={xrayMode}
            setXrayMode={setXrayMode}
            explodeVal={explodeVal}
            theme={theme}
          />
        );
      case 'systems':
        return <SystemsScreen />;
      case 'search':
        return <SearchScreen />;
      case 'quiz':
        return <QuizScreen />;
      case 'settings':
        return (
          <SettingsScreen
            theme={theme}
            setTheme={setTheme}
            autoRotate={autoRotate}
            setAutoRotate={setAutoRotate}
            xrayMode={xrayMode}
            setXrayMode={setXrayMode}
            bpm={bpm}
            setBpm={setBpm}
            respRate={respRate}
            setRespRate={setRespRate}
            explodeVal={explodeVal}
            setExplodeVal={setExplodeVal}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.appContainer}>
        <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} backgroundColor="#020617" />
        
        {/* Screen View */}
        <View style={styles.screenArea}>{renderActiveScreen()}</View>

        {/* Bottom Tab Bar */}
        <SafeAreaView edges={['bottom']} style={styles.bottomTabBar}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tabButton, isActive && styles.tabButtonActive]}
                activeOpacity={0.7}
                onPress={() => setActiveTab(tab.id)}
              >
                <Text style={styles.tabIcon}>{tab.icon}</Text>
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#020617',
  },
  screenArea: {
    flex: 1,
  },
  bottomTabBar: {
    flexDirection: 'row',
    backgroundColor: '#0b132b',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: 6,
    paddingHorizontal: 8,
    justifyContent: 'space-around',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  tabButtonActive: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
  },
  tabIcon: {
    fontSize: 18,
    marginBottom: 2,
  },
  tabLabel: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '600',
  },
  tabLabelActive: {
    color: '#38bdf8',
  },
});
