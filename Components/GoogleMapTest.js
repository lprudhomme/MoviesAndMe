import React, { Component } from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Platform, PermissionsAndroid } from 'react-native'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import flagPinkImg from '../Images/flag-pink.png';
import flagBlueImg from '../Images/flag-blue.png';
import Geolocation from 'react-native-geolocation-service';
import isEqual from 'lodash/isEqual';


let id = 0

const INITIAL_LOCATION = {
    latitude: 48.858474,
    longitude: 2.294461,
}

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 1000,
};

class GoogleMapTest extends Component {

  constructor(props) {
    super(props)
    this.state = {
      myPosition: {
        ...INITIAL_LOCATION
      },
      markers: []
    }
    this._onRegionChange = this._onRegionChange.bind(this)
    this._onMapPress = this._onMapPress.bind(this);
    this._getCurrentPosition = this._getCurrentPosition.bind(this)
  }

  componentDidMount() {
    this._getCurrentPosition()
  }

  async _getCurrentPosition() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'MoviesAndMe needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the current location');
            this._watchLocation()
        }
        else {
          console.log('You cannot use the current location');
        }
      } catch (err) {
        console.warn(err);
      }
    }
    else {
      this._watchLocation()
    }

  }

  _watchLocation() {
    Geolocation.getCurrentPosition(
        (position) => {
            console.log("current position")
            console.log(position);
            const myLastPosition = this.state.myPosition;
            const myPosition = position.coords;
            if (!isEqual(myPosition, myLastPosition)) {
              this.setState({
                myPosition: {...myPosition},
                region: {...myPosition} });
            }
        },
        (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
        },
        {GEOLOCATION_OPTIONS}
    );
  }

  _onRegionChange(region) {
    console.log(region)
    //this.setState({ region });
  }

  _onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: `foo${++id}`,
          title: 'Marker ' + id,
          description: 'Description ' + id
        },
      ],
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            ...INITIAL_LOCATION,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region= {{
            ...this.state.myPosition,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChange={this._onRegionChange}
          onPress={this._onMapPress}
        >
        {this.state.markers.map(marker => (
            <Marker
              title={marker.key}
              image={flagPinkImg}
              key={marker.key}
              coordinate={marker.coordinate}
            />
        ))}
        <Marker
          title={"Ma position"}
          image={flagBlueImg}
          key={"currentLocation"}
          coordinate={this.state.myPosition}
        />
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.setState({ markers: [] })}
            style={styles.bubble}
          >
            <Text>Tap to create a marker of random color</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default GoogleMapTest;
