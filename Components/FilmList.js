import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import FilmItem from './FilmItem'
import { connect } from 'react-redux'

class FilmList extends React.Component {
  constructor(props) {  // constructeur avec un param par défaut : props
    super(props)
  }

  _displayDetailForFilm = (idFilm) => {
    //console.log("Display film with id " + idFilm)
    this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
  }

  render() {  //obligatoire pour renvoyer le component custom de la classe
    return (
      <FlatList
        style={styles.list}
        data={this.props.films}                           // définit les données à afficher dans la flatlist
        extraData={this.props.favoritesFilm}              // On utilise la prop extraData pour indiquer à notre FlatList que d’autres données doivent être prises en compte si on lui demande de se re-rendre
        keyExtractor={(item) => item.id.toString()}       // défini le critère correspondant à la clé (évite le warning)
        onEndReachedThreshold={0.5}
        renderItem={({item}) =>                           // appelé à chaque item à afficher : utilisation de la props custom film
          <FilmItem                                       // affiche le component en lui passant des infos via ses props
            film={item}                                       // l'objet film
            displayDetailForFilm={this._displayDetailForFilm} // action à déclencher qd le user va cliquer sur un film pour voir le détail de ses infos
            isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}  // indicateur pour afficher ou non l'icone favori
            />
        }
        onEndReached={() => {                             // appelé lorsqu'il ne reste que xx pixels à afficher dans la flatlist
          if (!this.props.favoriteList && this.props.page < this.props.totalPages) {  // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
             this.props.loadFilms()                       // Recherche les films de la page suivante. ATTENTION au binding lors de l'appel de cette callback
          }
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})

const mapStateToProps = state => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm
  }
}

export default connect(mapStateToProps)(FilmList)
