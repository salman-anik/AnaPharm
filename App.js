import React, { useState, useRef, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ModelScreen from './src/screens/ModelScreen';
import SystemsScreen from './src/screens/SystemsScreen';
import DiseasesScreen from './src/screens/DiseasesScreen';
import MedicineScreen from './src/screens/MedicineScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { getTheme } from './src/theme/theme';
import HealthIcon from './src/components/HealthIcon';

export default function App() {
  const { width: screenWidth } = useWindowDimensions();
  const [activeTab, setActiveTab] = useState('model');
  const [scrollLocked, setScrollLocked] = useState(false);
  const horizontalScrollRef = useRef(null);
  const isProgrammaticScroll = useRef(false);

  // Shared state across the app - default to 'dark' (Pure OLED Black)
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState('medium');
  const [bpm, setBpm] = useState(72);
  const [respRate, setRespRate] = useState(16);
  const [autoRotate, setAutoRotate] = useState(false);
  const [xrayMode, setXrayMode] = useState(false);

  const t = getTheme(theme, fontSize);

  // All bottom navbar icons from healthicons.org (inlined, zero 404s)
  const tabs = [
    { id: 'systems', iconName: 'dna' },
    { id: 'diseases', iconName: 'stethoscope' },
    {
      id: 'model',
      isCenter: true,
      iconOutline: 'bodyOutline',
      iconFilled: 'bodyFilled',
    },
    { id: 'medicine', iconName: 'medicines' },
    { id: 'settings', iconName: 'settings' },
  ];

  const swipeTabs = [
    { id: 'systems', label: 'Systems' },
    { id: 'diseases', label: 'Diseases' },
    { id: 'medicine', label: 'Medicine' },
    { id: 'settings', label: 'Settings' },
  ];

  const handleTabPress = (tabId) => {
    if (tabId === 'model') {
      setActiveTab('model');
      return;
    }

    const wasModel = activeTab === 'model';
    const swipeIdx = swipeTabs.findIndex((item) => item.id === tabId);
    if (swipeIdx !== -1) {
      setActiveTab(tabId);
      isProgrammaticScroll.current = true;
      horizontalScrollRef.current?.scrollTo({
        x: swipeIdx * screenWidth,
        animated: !wasModel,
      });
      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, wasModel ? 50 : 250);
    }
  };

  // Real-time 60fps tracking so bottom navbar updates instantaneously
  const handleScroll = (e) => {
    if (isProgrammaticScroll.current || activeTab === 'model') return;
    const { contentOffset, layoutMeasurement } = e.nativeEvent;
    const width = layoutMeasurement.width || screenWidth;
    const pageIndex = Math.round(contentOffset.x / width);
    if (swipeTabs[pageIndex] && swipeTabs[pageIndex].id !== activeTab) {
      setActiveTab(swipeTabs[pageIndex].id);
    }
  };

  const handleScrollEnd = (e) => {
    isProgrammaticScroll.current = false;
    if (activeTab === 'model') return;
    const { contentOffset, layoutMeasurement } = e.nativeEvent;
    const width = layoutMeasurement.width || screenWidth;
    const pageIndex = Math.round(contentOffset.x / width);
    if (swipeTabs[pageIndex] && swipeTabs[pageIndex].id !== activeTab) {
      setActiveTab(swipeTabs[pageIndex].id);
    }
  };

  // MEMOIZED SCREENS: Prevents re-rendering heavy screens during swipe transitions!
  // This guarantees 60fps silky-smooth swipe and instant bottom navbar updates.
  const modelScreenComponent = useMemo(
    () => (
      <ModelScreen
        bpm={bpm}
        respRate={respRate}
        autoRotate={autoRotate}
        setAutoRotate={setAutoRotate}
        xrayMode={xrayMode}
        setXrayMode={setXrayMode}
        theme={theme}
        fontSize={fontSize}
      />
    ),
    [bpm, respRate, autoRotate, setAutoRotate, xrayMode, setXrayMode, theme, fontSize]
  );

  const systemsScreenComponent = useMemo(
    () => <SystemsScreen theme={theme} fontSize={fontSize} />,
    [theme, fontSize]
  );

  const diseasesScreenComponent = useMemo(
    () => (
      <DiseasesScreen
        theme={theme}
        fontSize={fontSize}
        onSelectMedicine={() => handleTabPress('medicine')}
        onScrollLock={setScrollLocked}
      />
    ),
    [theme, fontSize]
  );

  const medicineScreenComponent = useMemo(
    () => (
      <MedicineScreen
        theme={theme}
        fontSize={fontSize}
        onNavigateToOrgan={() => handleTabPress('model')}
        onScrollLock={setScrollLocked}
      />
    ),
    [theme, fontSize]
  );

  const settingsScreenComponent = useMemo(
    () => (
      <SettingsScreen
        theme={theme}
        setTheme={setTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
        autoRotate={autoRotate}
        setAutoRotate={setAutoRotate}
        xrayMode={xrayMode}
        setXrayMode={setXrayMode}
        bpm={bpm}
        setBpm={setBpm}
        respRate={respRate}
        setRespRate={setRespRate}
      />
    ),
    [theme, setTheme, fontSize, setFontSize, autoRotate, setAutoRotate, xrayMode, setXrayMode, bpm, setBpm, respRate, setRespRate]
  );

  return (
    <SafeAreaProvider>
      <View style={[styles.appContainer, { backgroundColor: t.bg }]}>
        <StatusBar
          barStyle={t.statusBarStyle}
          backgroundColor={t.headerBg}
          translucent={false}
        />

        {/* Screen Area: Persisted 3D Model View + Swipeable Pager for List Screens */}
        <View style={[styles.screenArea, { backgroundColor: t.bg }]}>
          {/* 3D Model Screen Layer (persisted in memory for instant camera and state) */}
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                zIndex: activeTab === 'model' ? 2 : 0,
                opacity: activeTab === 'model' ? 1 : 0,
              },
            ]}
            pointerEvents={activeTab === 'model' ? 'auto' : 'none'}
          >
            {modelScreenComponent}
          </View>

          {/* Swipeable Pager Layer for Systems, Diseases, Medicine, Settings */}
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                zIndex: activeTab !== 'model' ? 2 : 0,
                opacity: activeTab !== 'model' ? 1 : 0,
              },
            ]}
            pointerEvents={activeTab !== 'model' ? 'auto' : 'none'}
          >
            <ScrollView
              ref={horizontalScrollRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              bounces={false}
              scrollEnabled={!scrollLocked}
              scrollEventThrottle={16}
              onScroll={handleScroll}
              onMomentumScrollEnd={handleScrollEnd}
              style={styles.pagerContainer}
              contentContainerStyle={styles.pagerContent}
            >
              <View style={{ width: screenWidth, flex: 1 }}>
                {systemsScreenComponent}
              </View>

              <View style={{ width: screenWidth, flex: 1 }}>
                {diseasesScreenComponent}
              </View>

              <View style={{ width: screenWidth, flex: 1 }}>
                {medicineScreenComponent}
              </View>

              <View style={{ width: screenWidth, flex: 1 }}>
                {settingsScreenComponent}
              </View>
            </ScrollView>
          </View>
        </View>

        {/* Modern Bottom Navigation Bar - Icons Only, Big Center 3D Button */}
        <SafeAreaView
          edges={['bottom']}
          style={[
            styles.bottomTabBar,
            {
              backgroundColor: t.tabBarBg,
              borderTopColor: t.glassBorder || t.tabBarBorder,
            },
          ]}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            if (tab.isCenter) {
              return (
                <TouchableOpacity
                  key={tab.id}
                  style={styles.centerTabWrapper}
                  activeOpacity={0.8}
                  onPress={() => handleTabPress(tab.id)}
                >
                  <View
                    style={[
                      styles.centerHeroButton,
                      {
                        backgroundColor: isActive
                          ? (t.isDark ? '#ffffff' : '#000000')
                          : (t.isDark ? '#141418' : '#f4f4f5'),
                        borderColor: isActive
                          ? (t.isDark ? '#ffffff' : '#000000')
                          : (t.isDark ? '#2e2e34' : '#e4e4e7'),
                        shadowColor: t.shadowColor || '#000',
                      },
                    ]}
                  >
                    <HealthIcon
                      name={isActive ? tab.iconFilled : tab.iconOutline}
                      size={26}
                      color={
                        isActive
                          ? (t.isDark ? '#000000' : '#ffffff')
                          : (t.isDark ? '#ffffff' : '#000000')
                      }
                    />
                  </View>
                </TouchableOpacity>
              );
            }

            return (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tabButton,
                  isActive && [
                    styles.tabButtonActive,
                    {
                      backgroundColor: t.accentBg,
                      borderColor: t.cardBorder,
                    },
                  ],
                ]}
                activeOpacity={0.75}
                onPress={() => handleTabPress(tab.id)}
              >
                <HealthIcon
                  name={tab.iconName}
                  size={24}
                  color={isActive ? t.text : t.textMuted}
                  style={{ opacity: isActive ? 1.0 : 0.65 }}
                />
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
  pagerContainer: {
    flex: 1,
  },
  pagerContent: {
    flexGrow: 1,
  },
  bottomTabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
    minWidth: 48,
    height: 48,
  },
  tabButtonActive: {
    borderWidth: 1,
  },
  tabIcon: {
    fontSize: 24,
  },
  centerTabWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 54,
  },
  centerHeroButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  centerHeroText3D: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});
