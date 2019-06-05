import React from 'react'
import { StyleSheet, View, Animated, Easing, Button } from 'react-native'

class Test extends React.Component {

  constructor(props) {
    super(props)
      this.state = {
        topPosition: new Animated.Value(0),
        leftPosition: new Animated.Value(0),
      }
  }

  componentDidMount() {
    this._refreshAnimation()
  }

  _refreshAnimation() {
    //this._refreshAnimationTiming()
    //this._refreshAnimationSpring()
    //this._refreshAnimationDecay()
    //this._refreshAnimationSequence()
    this._refreshAnimationParallel()
  }

  _refreshAnimationTiming() {
    this.setState({ topPosition: new Animated.Value(0) },
      () => {
        Animated.timing(
          this.state.topPosition,
          {
            toValue: 100,
            duration: 3000, // Le temps est en milliseconds ici (3000ms = 3sec)
            easing: Easing.bounce,
          }
        ).start() // N'oubliez pas de lancer votre animation avec la fonction start()
      }
    )
  }

  _refreshAnimationSpring() {
    this.setState({ topPosition: new Animated.Value(0) },
      () => {
        Animated.spring(
          this.state.topPosition,
          {
            toValue: 100,
            speed: 4,
            bounciness: 30
          }
        ).start() // N'oubliez pas de lancer votre animation avec la fonction start()
      }
    )
  }

  _refreshAnimationDecay() {
    this.setState({ topPosition: new Animated.Value(0) },
      () => {
        Animated.decay(
          this.state.topPosition,
          {
            velocity: 0.8,
            deceleration: 0.997
          }
        ).start() // N'oubliez pas de lancer votre animation avec la fonction start()
      }
    )
  }

  _refreshAnimationSequence() {
    this.setState({ topPosition: new Animated.Value(0) },
      () => {
        Animated.sequence([
          Animated.spring(
            this.state.topPosition,
            {
              toValue: 100,
              tension: 8,
              friction: 3
            }
          ),
          Animated.decay(
            this.state.topPosition,
            {
              velocity: -0.8,
              deceleration: 0.990
            }
          )
        ]).start() // N'oubliez pas de lancer votre animation avec la fonction start()
      }
    )
  }

  _refreshAnimationParallel() {
    this.setState({
      topPosition: new Animated.Value(0),
      leftPosition: new Animated.Value(0)
     },
      () => {
        Animated.parallel([
          Animated.spring(
            this.state.topPosition,
            {
              toValue: 100,
              tension: 8,
              friction: 3
            }
          ),
          Animated.timing(
            this.state.leftPosition,
            {
              toValue: 100,
              duration: 1000,
              easing: Easing.elastic(2)
            }
          )
        ]).start() // N'oubliez pas de lancer votre animation avec la fonction start()
      }
    )
  }

  render() {
    return (
      <View style={styles.main_container}>
        <View style={ { flex: 1, marginTop: 50 } }>
          <Button style={ styles.button }
            title="Refresh"
            onPress={() => this._refreshAnimation() }/>
        </View>
        <View style={{ flex: 9 }}>
          <Animated.View style={[styles.animation_view, { top: this.state.topPosition, left: this.state.leftPosition }]}>
          </Animated.View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  animation_view: {
    backgroundColor: 'red',
    width: 100,
    height: 100
  },
  button: {
    height: 50
  }
})

export default Test
