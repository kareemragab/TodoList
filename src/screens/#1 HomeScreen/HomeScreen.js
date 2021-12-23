import React, {useContext, useEffect, useCallback, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import Toggle from 'react-native-toggle-element';
import {ThemeContext} from './../../themes/ThemeProvider';
import {setTheme} from '../../localStorage/AsyncStorage';
import SkeletonLoader from '../../components/SkeletonLoader';
import styles from './styles';
import shadows from './../../assets/shadows';
import {useDispatch, useSelector} from 'react-redux';
import {HomeClearData, HomeGetData} from '../../redux/actions/HomeActions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Homescreen = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const {theme, changeTheme} = useContext(ThemeContext);
  const Type = useSelector(state => state.HomeReducer.Type);
  const CompletedTasks = useSelector(state => state.HomeReducer.CompletedTasks);
  const UnCompletedTasks = useSelector(
    state => state.HomeReducer.UnCompletedTasks,
  );
  const Processing = useSelector(state => state.HomeReducer.Processing);
  const dispatch = useDispatch();

  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const TODAY = new Date().toLocaleDateString('en-US', options);

  useEffect(() => {
    getData(Type);
    return () => {
      dispatch(HomeClearData());
    };
  }, []);

  const getData = type => {
    dispatch(HomeGetData(type));
  };

  const changeAppTheme = () => {
    /**
     * remove all data to avoid list items from rerendering when
     * there are large no of date
     */
    dispatch(HomeClearData());
    // change theme in context and local storage
    theme.name == 'day' ? setTheme('night') : setTheme('day');
    changeTheme(theme.name == 'day' ? 'night' : 'day');
    // retrive data again
    getData(Type);
  };

  const renderHeader = () => {
    const activeStyle = {
      ...shadows[4],
      backgroundColor: theme.colors.tertiaryBackgroundColor,
    };
    const disactiveStyle = {
      backgroundColor: theme.colors.secondaryBackgroundColor,
    };
    const activeTxtStyle = {color: theme.colors.quaternaryTextColor};
    const disactiveTxtStyle = {color: theme.colors.primaryTextColor};
    return (
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text
            allowFontScaling={false}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            style={{...styles.headerTxt, color: theme.colors.primaryTextColor}}>
            {TODAY}
          </Text>
          <Toggle
            value={theme.name == 'day'}
            onPress={changeAppTheme}
            thumbActiveComponent={
              <Image
                style={styles.headerImg}
                source={require('./../../assets/images/sun.png')}
              />
            }
            thumbInActiveComponent={
              <Image
                style={styles.headerImg}
                source={require('./../../assets/images/moon.png')}
              />
            }
            containerStyle={styles.toggleContainerStyle}
            thumbButton={styles.toggleThumbBtn}
            trackBar={styles.toggleTrackbarStyle}
          />
        </View>
        <View style={styles.topTabsContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              Type != 0 && getData(0);
            }}
            style={{
              ...styles.tabItem,
              ...(Type == 0 ? activeStyle : disactiveStyle),
            }}>
            <Text
              allowFontScaling={false}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              style={{
                ...styles.tabItemTxt,
                ...(Type == 0 ? activeTxtStyle : disactiveTxtStyle),
              }}>
              {UnCompletedTasks.length + ' ' + t('Incomplete')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              Type != 1 && getData(1);
            }}
            style={{
              ...styles.tabItem,
              ...(Type == 1 ? activeStyle : disactiveStyle),
            }}>
            <Text
              allowFontScaling={false}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              style={{
                ...styles.tabItemTxt,
                ...(Type == 1 ? activeTxtStyle : disactiveTxtStyle),
              }}>
              {CompletedTasks.length + ' ' + t('Completed')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderTodo = useCallback(
    ({item}) => {
      return (
        <TouchableOpacity
          style={{
            ...styles.itemView,
            backgroundColor: theme.colors.homeItemBackgroundColor,
          }}>
          <View style={styles.bodyView}>
            <Text
              allowFontScaling={false}
              numberOfLines={1}
              style={{...styles.title, color: theme.colors.secondaryTextColor}}>
              {item.title}
            </Text>
            <Text
              allowFontScaling={false}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              style={{...styles.date, color: theme.colors.tertiaryTextColor}}>
              {item.completed ? 'Completed' : 'In completed'}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [theme],
  );

  const renderFlatlistFooter = () => {
    if (!Processing) {
      return <></>;
    }
    return (
      <>
        {renderTodoSkeleton()}
        {renderTodoSkeleton()}
        {renderTodoSkeleton()}
        {renderTodoSkeleton()}
        {renderTodoSkeleton()}
      </>
    );
  };

  const renderTodoSkeleton = useCallback(() => {
    return (
      <SkeletonLoader
        renderBody={() => {
          return (
            <View style={styles.itemViewSkeleton}>
              <View
                style={{
                  ...styles.titleSkeleton,
                  backgroundColor: theme.colors.secondaryBackgroundColor,
                }}
              />
              <View
                style={{
                  ...styles.statusSkeleton,
                  backgroundColor: theme.colors.secondaryBackgroundColor,
                }}
              />
            </View>
          );
        }}
      />
    );
  }, [theme]);

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: theme.colors.primaryBackgroundColor,
      }}>
      <View style={styles.container}>
        {renderHeader()}

        <FlatList
          data={Type == 0 ? UnCompletedTasks : CompletedTasks}
          initialNumToRender={10}
          // removeClippedSubviews={true}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatlist}
          renderItem={renderTodo}
          ListFooterComponent={renderFlatlistFooter}
          onEndReachedThreshold={0.5}
          refreshing={false}
          onRefresh={() => {
            getData(Type);
          }}
        />
      </View>

      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddTodo')}
          style={styles.addBtn}>
          <FontAwesome
            name={'plus'}
            size={20}
            color={theme.colors.quaternaryTextColor}
            style={{alignSelf: 'center'}}
          />
          <Text
            allowFontScaling={false}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            style={{
              ...styles.addBtnTxt,
              color: theme.colors.quaternaryTextColor,
            }}>
            {t('Add Todo')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Homescreen;
