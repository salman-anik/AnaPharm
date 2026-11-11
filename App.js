import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  useWindowDimensions,
  Keyboard,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ModelScreen from './src/screens/ModelScreen';
import SystemsScreen from './src/screens/SystemsScreen';
import DiseasesScreen from './src/screens/DiseasesScreen';
import MedicineScreen from './src/screens/MedicineScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { getTheme } from './src/theme/theme';
import HealthIcon from './src/components/HealthIcon';


const STORAGE_KEY_THEME = '@anapharm_theme';
const STORAGE_KEY_FONT_SIZE = '@anapharm_fontSize';
const STORAGE_KEY_KEEP_3D_LOADED = '@anapharm_keep3DLoaded';

export default function App() {
  const { width: screenWidth } = useWindowDimensions();
  // Load modern Bangla typography (Hind Siliguri)
  const [fontsLoaded] = useFonts({
    'HindSiliguri-Light': require('./assets/fonts/HindSiliguri-Light.ttf'),
    'HindSiliguri-Regular': require('./assets/fonts/HindSiliguri-Regular.ttf'),
    'HindSiliguri-Medium': require('./assets/fonts/HindSiliguri-Medium.ttf'),
    'HindSiliguri-SemiBold': require('./assets/fonts/HindSiliguri-SemiBold.ttf'),
    'HindSiliguri-Bold': require('./assets/fonts/HindSiliguri-Bold.ttf'),
  });
  const [activeTab, setActiveTab] = useState('medicine');
  const [hasOpenedModel, setHasOpenedModel] = useState(false);
  const [scrollLocked, setScrollLocked] = useState(false);
  const horizontalScrollRef = useRef(null);
  const isProgrammaticScroll = useRef(false);

  // Shared state across the app - default to 'light'
  const [theme, setThemeState] = useState('light');
  const [fontSize, setFontSizeState] = useState('small');
  const [keep3DLoaded, setKeep3DLoadedState] = useState(false);

  // Load persisted settings on startup
  useEffect(() => {
    (async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(STORAGE_KEY_THEME);
        if (savedTheme) {
          setThemeState(savedTheme);
        }
        const savedFontSize = await AsyncStorage.getItem(STORAGE_KEY_FONT_SIZE);
        if (savedFontSize) {
          setFontSizeState(savedFontSize);
        }
        const savedKeep3DLoaded = await AsyncStorage.getItem(STORAGE_KEY_KEEP_3D_LOADED);
        if (savedKeep3DLoaded !== null) {
          setKeep3DLoadedState(savedKeep3DLoaded === 'true');
        }
      } catch (err) {
        console.warn('Failed to load settings:', err);
      }
    })();
  }, []);

  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
    AsyncStorage.setItem(STORAGE_KEY_THEME, newTheme).catch((err) =>
      console.warn('Failed to save theme:', err)
    );
  }, []);

  const setFontSize = useCallback((newFontSize) => {
    setFontSizeState(newFontSize);
    AsyncStorage.setItem(STORAGE_KEY_FONT_SIZE, newFontSize).catch((err) =>
      console.warn('Failed to save fontSize:', err)
    );
  }, []);
  const setKeep3DLoaded = useCallback((enabled) => {
    setKeep3DLoadedState(enabled);
    AsyncStorage.setItem(STORAGE_KEY_KEEP_3D_LOADED, String(enabled)).catch((err) =>
      console.warn('Failed to save 3D memory setting:', err)
    );
  }, []);
  const [language, setLanguage] = useState('bn');
  const [bpm, setBpm] = useState(72);
  const [respRate, setRespRate] = useState(16);
  const [autoRotate, setAutoRotate] = useState(false);
  const [xrayMode, setXrayMode] = useState(false);

  const t = useMemo(() => getTheme(theme, fontSize), [theme, fontSize]);

  // Lock horizontal page swapping while keyboard is open or user is typing/searching
  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => {
      setScrollLocked(true);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setScrollLocked(false);
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // All bottom navbar icons from healthicons.org (inlined, zero 404s)
  const tabs = [
    { id: 'medicine', iconName: 'medicines' },
    { id: 'diseases', iconName: 'stethoscope' },
    {
      id: 'model',
      isCenter: true,
      modelIcon: 'bodyFilled',
    },
    { id: 'systems', iconName: 'dna' },
    { id: 'settings', iconName: 'settings' },
  ];

  const swipeTabs = [
    { id: 'medicine', label: 'Medicine' },
    { id: 'diseases', label: 'Diseases' },
    { id: 'systems', label: 'Systems' },
    { id: 'settings', label: 'Settings' },
  ];

  const handleTabPress = (tabId) => {
    if (tabId !== 'medicine') Keyboard.dismiss();
    if (tabId === 'model') {
      setHasOpenedModel(true);
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
        // Tab taps should switch immediately; swipe gestures still animate naturally.
        animated: false,
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
    // Follow the pager from its first movement so the selected navbar icon
    // changes in sync with the swipe instead of waiting for a progress threshold.
    const pageIndex = Math.max(0, Math.min(swipeTabs.length - 1, Math.floor(contentOffset.x / width)));
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
    () => hasOpenedModel ? (
      <ModelScreen
        isActive={activeTab === 'model'}
        keep3DLoaded={keep3DLoaded}
        autoRotate={autoRotate}
        setAutoRotate={setAutoRotate}
        xrayMode={xrayMode}
        setXrayMode={setXrayMode}
        theme={theme}
        fontSize={fontSize}
        language={language}
      />
    ) : null,
    [hasOpenedModel, activeTab, keep3DLoaded, autoRotate, setAutoRotate, xrayMode, setXrayMode, theme, fontSize, language]
  );

  const systemsScreenComponent = useMemo(
    () => <SystemsScreen theme={theme} fontSize={fontSize} language={language} />,
    [theme, fontSize, language]
  );

  const diseasesScreenComponent = useMemo(
    () => (
      <DiseasesScreen
        theme={theme}
        fontSize={fontSize}
        language={language}
        onSelectMedicine={() => handleTabPress('medicine')}
        onScrollLock={setScrollLocked}
      />
    ),
    [theme, fontSize, language]
  );

  const medicineScreenComponent = useMemo(
    () => (
      <MedicineScreen
        isActive={activeTab === 'medicine'}
        theme={theme}
        fontSize={fontSize}
        language={language}
        onNavigateToOrgan={() => handleTabPress('model')}
        onScrollLock={setScrollLocked}
      />
    ),
    [activeTab, theme, fontSize, language]
  );

  const settingsScreenComponent = useMemo(
    () => (
      <SettingsScreen
        theme={theme}
        setTheme={setTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
        language={language}
        setLanguage={setLanguage}
        autoRotate={autoRotate}
        setAutoRotate={setAutoRotate}
        xrayMode={xrayMode}
        setXrayMode={setXrayMode}
        keep3DLoaded={keep3DLoaded}
        setKeep3DLoaded={setKeep3DLoaded}
        bpm={bpm}
        setBpm={setBpm}
        respRate={respRate}
        setRespRate={setRespRate}
      />
    ),
    [theme, setTheme, fontSize, setFontSize, language, setLanguage, autoRotate, setAutoRotate, xrayMode, setXrayMode, keep3DLoaded, setKeep3DLoaded, bpm, setBpm, respRate, setRespRate]
  );

  return (
    <SafeAreaProvider>
      <View style={[styles.appContainer, { backgroundColor: t.bg }]}>
        <StatusBar
          barStyle={t.statusBarStyle}
          backgroundColor="transparent"
          translucent={true}
        />

        {/* Screen Area: Persisted 3D Model View + Swipeable Pager for List Screens */}
        <View style={[styles.screenArea, { backgroundColor: t.bg }]}>
          {/* 3D Model Screen Layer; the WebGL view releases its native memory when inactive */}
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
                {medicineScreenComponent}
              </View>

              <View style={{ width: screenWidth, flex: 1 }}>
                {diseasesScreenComponent}
              </View>

              <View style={{ width: screenWidth, flex: 1 }}>
                {systemsScreenComponent}
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
                          ? '#DDEEDD'
                          : (t.isDark ? '#141418' : '#f4f4f5'),
                        borderColor: isActive
                          ? '#DDEEDD'
                          : (t.isDark ? '#2e2e34' : '#e4e4e7'),
                        shadowColor: t.shadowColor || '#000',
                      },
                    ]}
                  >
                    <HealthIcon
                      name={tab.modelIcon || (isActive ? tab.iconFilled : tab.iconOutline)}
                      size={26}
                      color={
                        isActive
                          ? '#234A2D'
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
                      backgroundColor: '#DDEEDD',
                      borderColor: '#DDEEDD',
                    },
                  ],
                ]}
                activeOpacity={0.75}
                onPress={() => handleTabPress(tab.id)}
              >
                <HealthIcon
                  name={tab.iconName}
                  size={24}
                  color={isActive ? '#234A2D' : t.textMuted}
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
