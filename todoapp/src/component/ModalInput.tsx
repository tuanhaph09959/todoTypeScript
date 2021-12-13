import React, {FC, useRef, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Animated,
  TouchableOpacity,
  Text,
} from 'react-native';
import Modal from 'react-native-modal';
interface props {
  value: string;
  onChange: () => void;
  placeholder: string;
  multiline?: any;
}
interface propss {
  isVisible: boolean;
  title: string;
  setTitle: () => void;
  setContent: () => void;
  content: string;
  submit: () => void;
  onBackdropPress: () => void;
}
const AnimatedInput: FC<props> = ({
  value,
  onChange,
  placeholder,
  multiline,
}) => {
  const [inputHeight, setHeight] = useState<any>(null);
  const [placeholderWidth, setWidth] = useState<any>(null);
  const animation = useRef(new Animated.Value(0)).current;
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -inputHeight / 2],
  });
  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -placeholderWidth / 4],
  });
  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.5],
  });
  const onFocus = () => animate(1);
  const onBlur = () => !value && animate(0);
  const animate = (
    val: number | Animated.Value | Animated.ValueXY | {x: number; y: number},
  ) => {
    Animated.spring(animation, {
      toValue: val,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View
      style={styles.inputContainer}
      onLayout={(e: any) =>
        !inputHeight && setHeight(e.nativeEvent.layout.height)
      }>
      <View style={{height: inputHeight, ...styles.placeholderContainer}}>
        <Animated.Text
          style={[
            styles.placeholder,
            {transform: [{translateY}, {translateX}, {scale}]},
          ]}
          onTextLayout={(e: any) =>
            !placeholderWidth && setWidth(e.nativeEvent.lines[0]?.width || 0)
          }>
          {placeholder}
        </Animated.Text>
      </View>

      <TextInput
        style={[
          styles.input,
          multiline && {height: 100, textAlignVertical: 'top'},
        ]}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={onChange}
        multiline={multiline}
      />
    </View>
  );
};

const ModalInput: FC<propss> = ({
  isVisible,
  title,
  setTitle,
  setContent,
  content,
  submit,
  onBackdropPress,
}) => {
  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={600}
      animationOutTiming={600}
      isVisible={isVisible}
      style={styles.modal}
      onBackdropPress={onBackdropPress}>
      <View style={styles.viewModal}>
        <AnimatedInput value={title} onChange={setTitle} placeholder="Title" />
        <AnimatedInput
          value={content}
          onChange={setContent}
          placeholder="Content"
          multiline
        />
        <TouchableOpacity style={styles.btn} onPress={submit}>
          <Text style={styles.submit}>Submit</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalInput;

const styles = StyleSheet.create({
  viewModal: {
    backgroundColor: '#F5F5FF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 0.5,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  submit: {
    fontSize: 18,
    color: '#ffffff',
    paddingVertical: 9,

    textAlign: 'center',
    backgroundColor: '#307df1',
    width: 200,
    borderRadius: 40,
  },
  modal: {margin: 0, justifyContent: 'flex-end'},
  container: {
    padding: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#999',
    marginBottom: 25,
    marginHorizontal: 30,
    marginTop: 30,
  },
  input: {
    paddingHorizontal: 10,
    fontSize: 18,
    marginVertical: 20,
  },
  placeholderContainer: {
    position: 'absolute',
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  placeholder: {
    fontSize: 22,
    position: 'absolute',
    marginHorizontal: 5,
    paddingHorizontal: 5,
    backgroundColor: '#F5F5FF',
    color: '#999',
  },
});
