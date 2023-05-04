import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/Screens/GameMap';
import { Text, View } from '../../components/Themed';
import GameMap from '../../components/Screens/GameMap';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>

      <GameMap path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
