import React, {useContext, useEffect, useCallback, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ThemeContext} from './../../themes/ThemeProvider';
import styles from './styles';
import Feather from 'react-native-vector-icons/Feather';
import Textarea from 'react-native-textarea';
import {addTodo} from '../../localStorage/AsyncStorage';
const {width, height} = Dimensions.get('window');

const AddTodo = ({navigation, route}) => {
  const {t, i18n} = useTranslation();
  const {theme} = useContext(ThemeContext);
  const [desc, setDesc] = useState('');
  const [title, setTitle] = useState('');

  const onPress = () => {
    navigation.goBack();
  };

  const renderHeader = () => {
    return (
      <View style={[styles.row, styles.headerStyle]}>
        <TouchableOpacity
          onPress={onPress}
          style={[styles.row, styles.touchableHeaderSty]}>
          <Feather
            name="arrow-left"
            style={{...styles.iconSty, color: theme.colors.quaternaryTextColor}}
          />
        </TouchableOpacity>
        <Text
          allowFontScaling={false}
          style={{...styles.textHomeSty, color: theme.colors.primaryTextColor}}>
          {t('Add Todo')}
        </Text>
      </View>
    );
  };

  const addTodoToLocalStorage = async () => {
    if (!desc || !title) {
      Alert.alert('Sorry :(', 'Please Enter All Data');
    } else {
      addTodo(title, () => {
        navigation.navigate('HomeScreen');
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: theme.colors.primaryBackgroundColor,
      }}>
      <View>
        {renderHeader()}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}>
          <View style={styles.borderedField}>
            <TextInput
              style={{
                ...styles.textInput,
                backgroundColor: theme.colors.secondaryBackgroundColor,
                color: theme.colors.primaryTextColor,
              }}
              onChangeText={text => {
                setTitle(text);
              }}
              value={title}
              placeholderTextColor={theme.colors.tertiaryTextColor}
              placeholder="Title"
              textAlign={styles.textInputAlign.textAlign}
            />
          </View>

          <View style={styles.borderedField}>
            <Textarea
              containerStyle={{
                ...styles.textareaContainer,
                backgroundColor: theme.colors.secondaryBackgroundColor,
                color: theme.colors.primaryTextColor,
              }}
              style={styles.textarea}
              onChangeText={text => {
                setDesc(text);
              }}
              value={desc}
              maxLength={250}
              placeholder="Overview"
              placeholderTextColor={theme.colors.tertiaryTextColor}
            />
          </View>

          <TouchableOpacity
            onPress={addTodoToLocalStorage}
            style={styles.loginBtn}>
            <Text
              allowFontScaling={false}
              style={{
                ...styles.loginBtnTxt,
                color: theme.colors.quaternaryTextColor,
              }}>
              {t('Add Todo')}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddTodo;
