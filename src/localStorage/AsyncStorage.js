import AsyncStorage from '@react-native-async-storage/async-storage';

export const setSavedLanguage = async code => {
  await AsyncStorage.setItem('Language', code);
};

export const getSavedLanguage = async callback => {
  const language = await AsyncStorage.getItem('Language');
  if (language) {
    callback(language);
  } else {
    callback(null);
  }
};

export const setTheme = async theme => {
  await AsyncStorage.setItem('Theme', theme);
};

export const getSavedTheme = async callback => {
  const theme = await AsyncStorage.getItem('Theme');
  if (theme) {
    callback(theme);
  } else {
    callback(null);
  }
};

export const addTodo = async (title, callback) => {
  const toDosStringfied = await AsyncStorage.getItem('myTodos');
  if (toDosStringfied) {
    const todos = JSON.parse(toDosStringfied);
    todos.push({title});
    await AsyncStorage.setItem('myTodos', JSON.stringify(todos));
    callback();
  } else {
    const todos = [{title}];
    await AsyncStorage.setItem('myTodos', JSON.stringify(todos));
    callback();
  }
};

export const getSavedTodos = async callback => {
  const toDosStringfied = await AsyncStorage.getItem('myTodos');
  if (toDosStringfied) {
    callback(JSON.parse(toDosStringfied));
  } else {
    callback([]);
  }
};
