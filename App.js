import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import ThemeProvider from './src/themes/ThemeProvider';
import AppStatusBar from './src/components/AppStatusBar';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';
import {useTranslation} from 'react-i18next';
import languages from './src/i18n/languages';
import './src/i18n';
import {getSavedLanguage, getSavedTheme} from './src/localStorage/AsyncStorage';

import {Provider} from 'react-redux';
import store from './src/redux/store/store';

export default App = () => {
  const {t, i18n} = useTranslation();
  const [languageLoaded, setLanguageLoaded] = useState(false);
  const [theme, setTheme] = useState('day');

  useEffect(() => {
    getSavedTheme(savedTheme => {
      if (savedTheme) {
        setTheme(savedTheme);
      }
    });

    getSavedLanguage(savedCacheLanguage => {
      // maybe null as its restored from async storage
      const defaultAppLanguage = languages[1]; // app default lang "en"

      let savedLanguage = languages.find(o => o.code === savedCacheLanguage);
      savedLanguage = savedLanguage ? savedLanguage : defaultAppLanguage;

      i18n.changeLanguage(savedLanguage.code).then(() => {
        if (savedLanguage.isRTL && !I18nManager.isRTL) {
          // saved lang is rtl ?
          I18nManager.allowRTL(true); // force allow rtl
          I18nManager.forceRTL(true); // force rtl
          RNRestart.Restart(); // restart
        } else if (!savedLanguage.isRTL && I18nManager.isRTL) {
          // saved lang is not rtl ?
          I18nManager.forceRTL(false); // force disallow rtl
          I18nManager.allowRTL(false); // force disable rtl
          RNRestart.Restart(); // restart
        } else {
          setLanguageLoaded(true);
        }
      });
    });
    return () => {};
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <ThemeProvider defaultTheme={theme}>
          <AppStatusBar />
          {languageLoaded && <AppNavigator />}
        </ThemeProvider>
      </NavigationContainer>
    </Provider>
  );
};
