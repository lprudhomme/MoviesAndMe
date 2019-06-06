import React, { Component } from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Image, Platform, PermissionsAndroid } from 'react-native'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import isEqual from 'lodash/isEqual';

const INITIAL_LOCATION = {
    latitude: 48.858474,
    longitude: 2.294461,
}

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 1000,
};

class GoogleMap extends Component {

  constructor(props) {
    super(props)
    this.canChoosePosition = true
    this.state = {
      myPosition: {
        ...INITIAL_LOCATION
      },
    }
    this.onMapPress = this._onMapPress.bind(this);
    this.getCurrentPosition = this._getCurrentPosition.bind(this)
    //this.onRegionChange = this._onRegionChange.bind(this)
  }

  componentDidMount() {
    this._getCurrentPosition()
  }

  /*
  async getCamera() {
    const camera = await this.map.getCamera();
    Alert.alert('Current camera', JSON.stringify(camera), [{ text: 'OK' }], {
      cancelable: true,
    });
  }


  async setCamera() {
    const camera = await this.map.getCamera();
    // Note that we do not have to pass a full camera object to setCamera().
    // Similar to setState(), we can pass only the properties you like to change.
    this.map.setCamera({
      heading: camera.heading + 10,
    });
  }
  */

  async animateCamera() {
    console.log('Animate camera to', this.state.myPosition);
    const camera = await this.map.getCamera();
    //camera.heading += 40;
    //camera.pitch += 10;
    //camera.altitude += 1000;
    //camera.zoom -= 1;
    camera.center = {...this.state.myPosition};
    this.map.animateCamera(camera, { duration: 2000 });
  }

  async _getCurrentPosition() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          /*{
            title: 'Location Permission',
            message: 'MoviesAndMe needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },*/
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
            console.log("current position", position);
            this.setState({
              myPosition: {...position.coords },
              },
              () => this.animateCamera()
            );
            this.canChoosePosition = false
        },
        (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
        },
        {GEOLOCATION_OPTIONS}
    );
  }

  /*
  _onRegionChange(region) {
    console.log(region)
    //this.setState({ region });
  }
  */

  _onMapPress(e) {
    if(this.canChoosePosition) {
      console.log("change position: ",e.nativeEvent.coordinate)
      this.setState({ myPosition: {...e.nativeEvent.coordinate} });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          //provider={this.props.provider}
          ref={ref => { this.map = ref; }}
          initialRegion={{
            ...INITIAL_LOCATION,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          /*region= {{
            ...this.state.myPosition,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}*/
          //onRegionChange={this.onRegionChange}
          onPress={this.onMapPress}
          //showsUserLocation={true}
          //userLocationAnnotationTitle={"Location"}
          //followsUserLocation={true}
          //showsMyLocationButton={true}
        >
        <Marker
          title={ this.state.myPosition.latitude + "," + this.state.myPosition.longitude }
          image={ require("../Images/flag-blue.png") }
          key={"currentLocation"}
          coordinate={this.state.myPosition}
        />
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={this.getCurrentPosition}
            style={styles.buttonTouch}
          >
            <Image
              source={require("../Images/ic_mylocation.png")}
              style={styles.buttonImage}/>
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
  buttonTouch: {
    backgroundColor: 'white',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  buttonImage: {
    width: 40,
    height: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

/*
CameraControl.propTypes = {
  provider: ProviderPropType,
};
*/

export default GoogleMap;
