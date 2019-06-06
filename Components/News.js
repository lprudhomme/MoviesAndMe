import React from 'react'
import {StyleSheet, View, ActivityIndicator } from 'react-native'
//import films from '../Helpers/filmsData'
import FilmList from "./FilmList"
import { getNewsFromApi } from '../API/TMDBApi' // import { } from ... car c'est un export nommé dans TMDBApi.js

class News extends React.Component {

  constructor(props) {  // constructeur avec un param par défaut : props
    super(props)
    this._page = 0         // Compteur pour connaître la page courante
    this._totalPages = 0   // Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API TMDB
    this.state = {        //init le state
      films: [],          //liste des films renvoyés par l'API TMDB
      isLoading: false    //flag pour afficher le wait pendant l'appel de l'API TMDB : par défaut pas de chargement
    }
     this._loadFilms = this._loadFilms.bind(this)
  }

  componentDidMount() {
   this._loadFilms()
  }

  _loadFilms() {
    // appel l'API TMDB et charge les films
    // convention : _ signifie private même si rien n'empêche de l'appeler partout
    this.setState({ isLoading: true }) // Lancement du chargement
    getNewsFromApi(this._page + 1).then(data =>
    {
      // ATTENTION : mettre l'init des pages AVANT le setState car ce cernier va déclencher un refresh du component et donc de FilmList qui a besoin de ces 2 valeurs
      this._page = data.page                // stocke la page courante
      this._totalPages = data.total_pages   // stocke le nombre de pages

      this.setState({
        films: [ ...this.state.films, ...data.results ],         // permet de maj le state (liste des films en les ajoutant graca à ...) et de faire un update sur le.s component.s qui utilise.nt ce state
        isLoading: false
      })
    })
  }

  _displayLoading() {
    //affiche l'ActivityIndicator
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
          { /* //Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */ }
        </View>
      )
    }
  }

  render() {  //obligatoire pour renvoyer le component custom de la classe
    //console.log(this.props)
    return (
      <View style={ styles.main_container }>
        <FilmList
          films={this.state.films}              // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
          navigation={this.props.navigation}    // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
          //loadFilms={this._loadFilms}         // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
          loadFilms={() => {this._loadFilms()}} // comme loadFilm est une callback, l'appel via => permet de binder le this avec le component Search et non pas avec celui de FilmList lors de l'appel
          page={this._page}
          totalPages={this._totalPages}         // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
          favoriteList={false}                  // booléen à false pour indiquer qu'on n'est pas dans le cas de l'affichage de la liste des films favoris. Et ainsi pouvoir déclencher le chargement de plus de films lorsque l'utilisateur scrolle.
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({  //StyleSheet permet de gérer les styles de manière plus performante (création d'un objet et utilisation de son ID)
  main_container: {
    flex: 1,
    justifyContent: 'space-evenly'
    // marginTop: 25, plus utile avec le navigator
  }
})

export default News
