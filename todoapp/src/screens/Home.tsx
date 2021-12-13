import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {DeleteDATA, GetDATA, PostDATA, PutDATA} from '../store/reducers/Action';
import {RootState} from '../store/Store';
import ModalInput from '../component/ModalInput';
import moment from 'moment';
import ButtonAnimated from '../component/ButtonAnimated';

const headerHeight = 100;
let scrollValue = 0;
let headerVisible = true;
let focused = false;
export default function Home() {
  const [isvible, setIsvible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [loading, setLoad] = useState<boolean>(false);
  const [id, setid] = useState<string>('');
  const [type, setType] = useState<string>('');
  const data = useSelector((state: RootState) => state.TODO.data);
  const add = () => {
    setType('add');
    setContent('');
    setIsvible(true);
    setTitle('');
  };

  const submit = () => {
    dispatch(PostDATA(moment(new Date()).format('MM/DD/YYYY'), title, content));
    setIsvible(false);
    setLoad(!loading);
  };
  const putData = () => {
    dispatch(
      PutDATA(moment(new Date()).format('MM/DD/YYYY'), title, content, id),
    );
    setIsvible(false);
    setLoad(!loading);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetDATA());
  }, [loading]);
  const animation = useRef(new Animated.Value(1)).current;
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, headerHeight / 2 - 2],
  });
  const inputTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [headerHeight / 4, 0],
  });
  const opacity = animation;
  const onScroll = (e: any) => {
    if (focused) {
      return;
    }
    const y = e.nativeEvent.contentOffset.y;
    if (y > scrollValue && headerVisible && y > headerHeight / 2) {
      Animated.spring(animation, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
      }).start();
      headerVisible = false;
    }
    if (y < scrollValue && !headerVisible) {
      Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 0,
      }).start();
      headerVisible = true;
    }
    scrollValue = y;
  };
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: headerHeight}}
        onScroll={onScroll}>
        {data.map((x: any) => (
          <View style={styles.item} key={x.id}>
            <View style={styles.headerItem}>
              <View>
                <Text style={styles.title}>{x?.title}</Text>
                <Text style={styles.createdAt}>{x?.createdAt}</Text>
              </View>
              <View style={styles.boxbtn}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    setType('update');
                    setContent(x?.content);

                    setTitle(x?.title);
                    setIsvible(true);
                    setid(x?.id);
                    console.log(x);
                  }}>
                  <Image source={require('../acssets/Vector.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    Alert.alert('Thông báo ', 'Bạn có  muốn  xoá  không', [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {
                        text: 'OK',
                        onPress: () => {
                          dispatch(DeleteDATA(x.id));
                          setLoad(!loading);
                        },
                      },
                    ]);
                  }}>
                  <Image source={require('../acssets/xoa.png')} />
                </TouchableOpacity>
              </View>
            </View>

            <Text numberOfLines={5} style={styles.content}>
              {x?.content}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={[styles.header]}>
        <Animated.View
          style={[styles.searchContainer, {transform: [{translateY}]}]}>
          <Animated.View
            style={[
              styles.inputContainer,
              {opacity, transform: [{translateY: inputTranslateY}]},
            ]}>
            <Text style={styles.input}>CRUD MOCK API</Text>
          </Animated.View>
        </Animated.View>
        <Animated.View style={[styles.firstContainer]}>
          <Text style={styles.name}>Todo App by HA ANH TUAN</Text>
        </Animated.View>
      </View>
      <ModalInput
        isVisible={isvible}
        title={title}
        setTitle={(e: any) => setTitle(e)}
        setContent={(e: any) => setContent(e)}
        content={content}
        submit={type === 'add' ? submit : putData}
        onBackdropPress={() => setIsvible(false)}
      />
      <ButtonAnimated onPress={add} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerItem: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  createdAt: {
    fontSize: 14,
    color: '#307df1',
  },
  title: {
    fontSize: 22,
    color: '#222222',
  },
  boxbtn: {flexDirection: 'row', justifyContent: 'flex-end', padding: 5},
  btn: {padding: 5},
  content: {
    fontSize: 16,
    color: '#FFFFFF',
    paddingHorizontal: 12,
  },

  container: {
    flex: 1,
    marginTop: Platform.OS == 'ios' ? 60 : 0,
  },
  item: {
    minHeight: 150,
    marginTop: 5,
    marginHorizontal: 10,
    backgroundColor: '#95A5A6',
    marginBottom: 5,
    borderRadius: 10,
  },
  header: {
    height: headerHeight / 2,
    width: '100%',
    position: 'absolute',
  },
  firstContainer: {
    height: headerHeight / 2,
    backgroundColor: '#fff',
    elevation: 2,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  searchContainer: {
    height: headerHeight / 2,
    backgroundColor: '#fff',
    width: '100%',
    position: 'absolute',
    elevation: 2,
    padding: 10,
    paddingHorizontal: 15,
    overflow: 'hidden',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    flex: 1,
    // backgroundColor: '#eee',
    borderRadius: 3,
    justifyContent: 'center',
  },
  input: {
    flex: 1,

    paddingHorizontal: 15,
    fontSize: 15,

    padding: 0,
  },
});
