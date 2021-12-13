import React, {useRef} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
interface props {
  onPress: () => void;
}
const ButtonAnimated: React.FC<props> = ({onPress}) => {
  const animation = useRef(new Animated.Value(0)).current;
  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.9],
  });

  const onPressIn = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    setTimeout(() => {
      Animated.spring(animation, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }, 200);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.button, {transform: [{scale}]}]}>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={1}
          onPressIn={onPressIn}
          onPress={onPress}
          onPressOut={onPressOut}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
export default ButtonAnimated;
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: '#307df1',
    borderRadius: 100,
  },
  button: {
    borderRadius: 60,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 25,
    padding: 10,
    color: 'white',
  },
  count: {
    fontSize: 30,
  },
});
