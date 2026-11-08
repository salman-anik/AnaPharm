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
import MedicineScreen from './src/screens/MedicineScreen';
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
    { id: 'medicine', label: 'Medicine', icon: '💊' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const isLight = theme === 'light';

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
        return <SystemsScreen theme={theme} />;
      case 'search':
        return <SearchScreen theme={theme} />;
      case 'medicine':
        return <MedicineScreen theme={theme} />;
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

  const headerBg = isLight ? '#ffffff' : '#0b132b';

  return (
    <SafeAreaProvider>
      <View style={[styles.appContainer, isLight && styles.appContainerLight]}>
        <StatusBar
          barStyle={isLight ? 'dark-content' : 'light-content'}
          backgroundColor={headerBg}
        />
        
        {/* Screen View */}
        <View style={[styles.screenArea, isLight && styles.screenAreaLight]}>
          {renderActiveScreen()}
        </View>

        {/* Bottom Tab Bar */}
        <SafeAreaView
          edges={['bottom']}
          style={[styles.bottomTabBar, isLight && styles.bottomTabBarLight]}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tabButton,
                  isActive && (isLight ? styles.tabButtonActiveLight : styles.tabButtonActive),
                ]}
                activeOpacity={0.7}
                onPress={() => setActiveTab(tab.id)}
              >
                <Text style={styles.tabIcon}>{tab.icon}</Text>
                <Text
                  style={[
                    styles.tabLabel,
                    isLight && styles.tabLabelLight,
                    isActive && (isLight ? styles.tabLabelActiveLight : styles.tabLabelActive),
                  ]}
                >
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
  safeAreaContainer: {
    flex: 1,
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#020617',
  },
  appContainerLight: {
    backgroundColor: '#f8fafc',
  },
  screenArea: {
    flex: 1,
    backgroundColor: '#020617',
  },
  screenAreaLight: {
    backgroundColor: '#f8fafc',
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
  bottomTabBarLight: {
    backgroundColor: '#ffffff',
    borderTopColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 8,
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
  tabButtonActiveLight: {
    backgroundColor: 'rgba(2, 132, 199, 0.12)',
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
  tabLabelLight: {
    color: '#64748b',
  },
  tabLabelActive: {
    color: '#38bdf8',
  },
  tabLabelActiveLight: {
    color: '#0284c7',
    fontWeight: '700',
  },
});
