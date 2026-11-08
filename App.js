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
import DiseasesScreen from './src/screens/DiseasesScreen';
import MedicineScreen from './src/screens/MedicineScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { getTheme } from './src/theme/theme';

export default function App() {
  const [activeTab, setActiveTab] = useState('model');

  // Shared state across the app - default to 'dark' (Pure OLED Black)
  const [theme, setTheme] = useState('dark');
  const [bpm, setBpm] = useState(72);
  const [respRate, setRespRate] = useState(16);
  const [autoRotate, setAutoRotate] = useState(false);
  const [xrayMode, setXrayMode] = useState(false);
  const [explodeVal, setExplodeVal] = useState(0);

  const t = getTheme(theme);

  const tabs = [
    { id: 'model', label: '3D Model', icon: '🧍' },
    { id: 'systems', label: 'Systems', icon: '🧬' },
    { id: 'diseases', label: 'Diseases', icon: '🩺' },
    { id: 'medicine', label: 'Medicine', icon: '💊' },
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
        return <SystemsScreen theme={theme} />;
      case 'diseases':
      case 'search':
        return <DiseasesScreen theme={theme} />;
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

  return (
    <SafeAreaProvider>
      <View style={[styles.appContainer, { backgroundColor: t.bg }]}>
        <StatusBar
          barStyle={t.statusBarStyle}
          backgroundColor={t.headerBg}
        />

        {/* Screen View */}
        <View style={[styles.screenArea, { backgroundColor: t.bg }]}>
          {renderActiveScreen()}
        </View>

        {/* Bottom Tab Bar */}
        <SafeAreaView
          edges={['bottom']}
          style={[
            styles.bottomTabBar,
            {
              backgroundColor: t.tabBarBg,
              borderTopColor: t.tabBarBorder,
            },
          ]}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tabButton,
                  isActive && { backgroundColor: t.accentBg },
                ]}
                activeOpacity={0.7}
                onPress={() => setActiveTab(tab.id)}
              >
                <Text style={styles.tabIcon}>{tab.icon}</Text>
                <Text
                  style={[
                    styles.tabLabel,
                    {
                      color: isActive ? t.accent : t.textMuted,
                      fontWeight: isActive ? '700' : '600',
                    },
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
  appContainer: {
    flex: 1,
  },
  screenArea: {
    flex: 1,
  },
  bottomTabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 8,
    justifyContent: 'space-around',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  tabIcon: {
    fontSize: 18,
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 11,
  },
});
