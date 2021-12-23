import React, {useContext} from 'react';
import {StatusBar} from 'react-native';
import {ThemeContext} from '../themes/ThemeProvider';

const AppStatusbar = () => {
  const {theme} = useContext(ThemeContext);

  return (
    <StatusBar
      backgroundColor={theme.statusbarBackground}
      barStyle={theme.statusbarBarStyle}
    />
  );
};

export default AppStatusbar;
