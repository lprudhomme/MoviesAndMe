import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export default class IconWithBadge extends React.Component {
  render() {
    const { name, badgeCount, color, size } = this.props;
    return (
      <View style={styles.main_container}>
        <Image
          source={name}
          style={{width: size, height: size, backgroundColor: color}}/>
        { badgeCount > 0 && (
          <View style={styles.badge_container}>
            <Text style={styles.badge_text}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  },
  main_container: {
    width: 24,
    height: 24,
    margin: 5
  },
  badge_container: {
    // If you're using react-native < 0.57 overflow outside of the parent
    // will not work on Android, see https://git.io/fhLJ8
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 6,
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  badge_text: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold'
  }
})
