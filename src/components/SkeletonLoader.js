import React, {useState, useEffect} from 'react';
import {Animated, Easing} from 'react-native';

const SkeletonLoader = ({renderBody}) => {
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0.8));
  let intervalID = null;

  const fadeAction = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 0.9,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    });
  };

  useEffect(() => {
    fadeAction();
    intervalID = setInterval(() => {
      fadeAction();
    }, 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}>
      {renderBody()}
    </Animated.View>
  );
};

export default SkeletonLoader;
