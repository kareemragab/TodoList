import React, {useState, useEffect, createContext, useMemo} from 'react';
import lightTheme from './lightTheme';
import darkTheme from './darkTheme';

export const ThemeContext = createContext();

const ThemeProvider = ({defaultTheme, children}) => {
  const [appTheme, setAppTheme] = useState('day');

  useEffect(() => {
    setAppTheme(defaultTheme);
    return () => {};
  }, [defaultTheme]);

  const theme = useMemo(() => {
    switch (appTheme) {
      case 'day':
        return lightTheme;
      case 'night':
        return darkTheme;
      default:
        return lightTheme;
    }
  }, [appTheme]);

  const changeTheme = newTheme => {
    setAppTheme(newTheme);
  };

  return <ThemeContext.Provider value={{theme, changeTheme}}>{children}</ThemeContext.Provider>;
};

export default React.memo(ThemeProvider);
