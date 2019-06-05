const INITIAL_STATE = { avatar: require('../../Images/ic_tag_faces.png') }

function setAvatar(state = INITIAL_STATE, action) {
  let nextState
  switch (action.type) {
    case 'SET_AVATAR':
        nextState = {
          ...state,
          avatar: action.value
        }
      return nextState || state

    default:
      return state
  }
}

export default setAvatar;
