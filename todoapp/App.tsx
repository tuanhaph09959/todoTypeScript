import React from 'react';
import {StyleSheet, View} from 'react-native';
interface props {
  abc: string;
}
const App: React.FC<props> = () => {
  return <View style={styles.sectionContainer} />;
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
