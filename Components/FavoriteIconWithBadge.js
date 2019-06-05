import React from 'react'
import IconWithBadge from '../Components/IconWithBadge'
import { connect } from 'react-redux'

class FavoriteIconWithBadge extends React.Component {
  render() {
    return (
      // You should pass down the badgeCount in some other ways like react context api, redux, mobx or event emitters.
      <IconWithBadge {...this.props} badgeCount={this.props.favoritesFilm.length} />
    )
  }
}

const mapStateToProps = state => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm
  }
}

export default connect(mapStateToProps)(FavoriteIconWithBadge)
