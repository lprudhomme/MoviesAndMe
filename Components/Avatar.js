import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { connect } from 'react-redux'

/*
                            iOS  Android
title 	                     OK 	OK 	Specify null or empty string to remove the title
cancelButtonTitle 	         OK 	OK 	Specify null or empty string to remove this button
takePhotoButtonTitle 	       OK 	OK 	Specify null or empty string to remove this button
chooseFromLibraryButtonTitle OK 	OK 	Specify null or empty string to remove this button
customButtons 	             OK 	OK 	An array containing objects with the name and title of buttons
cameraType 	                 OK 	- 	'front' or 'back'
mediaType 	                 OK 	OK 	'photo', 'video', or 'mixed' on iOS, 'photo' or 'video' on Android
maxWidth 	                   OK 	OK 	Photos only
maxHeight 	                 OK 	OK 	Photos only
quality 	                   OK 	OK 	0 to 1, photos only
videoQuality 	               OK 	OK 	'low', 'medium', or 'high' on iOS, 'low' or 'high' on Android
durationLimit 	             OK 	OK 	Max video recording time, in seconds
rotation 	                    -   OK 	Photos only, 0 to 360 degrees of rotation
allowsEditing 	             OK 	- 	bool - enables built-in iOS functionality to resize the image after selection
noData 	                     OK 	OK 	If true, disables the base64 data field from being generated (greatly improves performance on large photos)
storageOptions 	             OK 	OK 	If this key is provided, the image will be saved in your app's Documents directory on iOS, or your app's Pictures directory on Android (rather than a temporary directory)
storageOptions.skipBackup 	 OK 	- 	If true, the photo will NOT be backed up to iCloud
storageOptions.path 	       OK 	OK 	If set, will save the image at Documents/[path]/ rather than the root Documents for iOS, and Pictures/[path]/ on Android.
storageOptions.cameraRoll 	 OK 	OK 	If true, the cropped photo will be saved to the iOS Camera Roll or Android DCIM folder.
storageOptions.waitUntilSaved OK 	- 	If true, will delay the response callback until after the photo/video was saved to the Camera Roll. If the photo or video was just taken, then the file name and timestamp fields are only provided in the response object when this AND cameraRoll are both true.
permissionDenied.title 	      - 	OK 	Title of explaining permissions dialog. By default Permission denied.
permissionDenied.text 	      - 	OK 	Message of explaining permissions dialog. By default To be able to take pictures with your camera and choose images from your library..
permissionDenied.reTryTitle 	- 	OK 	Title of re-try button. By default re-try
permissionDenied.okTitle 	    - 	OK 	Title of ok button. By default I'm sure
*/
const options = {
  title: 'Choisir mon Avatar',
  cancelButtonTitle: "Annuler",
  takePhotoButtonTitle: "Prendre une Photo",
  chooseFromLibraryButtonTitle: "Choisir ma photo dans la galerie",
  cameraType: 'front',
  mediaType: 'photo',
  allowsEditing: true,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class Avatar extends React.Component {

  constructor(props) {
    super(props)
    // this.setState est appelé dans un callback dans showImagePicker, pensez donc bien à binder la fonction _avatarClicked
    this._avatarClicked = this._avatarClicked.bind(this)
}

  _avatarClicked() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log("avatar", response)
      if (response.didCancel) {
        console.log('L\'utilisateur a annulé')
      }
      else if (response.error) {
        console.log('Erreur : ', response.error)
      }
      else {
        console.log('Photo : ', response.uri )
        let requireSource = { uri: response.uri }
        // On crée une action avec l'image prise et on l'envoie au store Redux
        const action = { type: "SET_AVATAR", value: requireSource }
        this.props.dispatch(action)
      }
    })
  }

  render() {
    return(
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={this._avatarClicked}>
          <Image style={styles.avatar} source={this.props.avatar} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  touchableOpacity: {
    margin: 5,
    width: 100, // Pensez bien à définir une largeur ici, sinon toute la largeur de l'écran sera cliquable
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#9B9B9B',
    borderWidth: 2
  }
})

const mapStateToProps = state => {
  return {
    avatar: state.setAvatar.avatar
  }
}

export default connect(mapStateToProps)(Avatar)
