import * as React from 'react';
import {Animated, StyleSheet, Text} from 'react-native';
import {useRef, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
const Splash = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    fadeIn();
    const time = setTimeout(() => {
      navigation.navigate('Home');
    }, 5000);
    return () => {
      clearTimeout(time);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <Text style={styles.lable}>TYPE SCRIPT</Text>
      <Text>HA ANH TUAN</Text>
    </Animated.View>
  );
};

export default Splash;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  lable: {
    fontSize: 24,
    color: '#171717',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
