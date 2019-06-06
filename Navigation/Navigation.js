import React from 'react' // N'oubliez pas l'import de React ici. On en a besoin pour rendre nos components React Native Image !
import { StyleSheet, Image } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites'
import News from '../Components/News'
import GoogleMap from '../Components/GoogleMap'

import SearchIconWithBadge from '../Components/SearchIconWithBadge'
import FavoriteIconWithBadge from '../Components/FavoriteIconWithBadge'
import NewsIconWithBadge from '../Components/NewsIconWithBadge'

//import Test from '../Components/Test'

const SearchStackNavigator = createStackNavigator({
  Search: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  },
  FilmDetail: { // Encore une fois j'ai mis le même nom que celui du component mais libre à vous de choisir un nom différent
    screen: FilmDetail,
    navigationOptions: {
      title: 'Détail du film'
    }
  }
})

const FavoriteStackNavigator = createStackNavigator({
  Favorite: {
    screen: Favorites,
    navigationOptions: {
      title: 'Favoris'
    }
  },
  FilmDetail: {
    screen: FilmDetail,
    navigationOptions: {
      title: 'Détail du film'
    }
  }
})

const NewsStackNavigator = createStackNavigator({
  Favorite: {
    screen: News,
    navigationOptions: {
      title: 'Dernières sorties'
    }
  },
  FilmDetail: {
    screen: FilmDetail,
    navigationOptions: {
      title: 'Détail du film'
    }
  }
})

const MoviesTabNavigator = createBottomTabNavigator(
  { /*
    Test: {
      screen: Test
    },
    */
    Search: {
      screen: SearchStackNavigator,
      //navigationOptions: {
      //  tabBarIcon: () => { // On définit le rendu de nos icônes par les images récemment ajoutés au projet
      //    return <Image
      //      source={require('../Images/ic_search.png')}
      //      style={styles.icon}/> // On applique un style pour les redimensionner comme il faut
      //  }
      //}
    },
    Favorites: {
      screen: FavoriteStackNavigator,
      //navigationOptions: {
      //  tabBarIcon: () => {
      //    return <Image
      //      source={require('../Images/ic_favorite.png')}
      //      style={styles.icon}/>
      //  }
    //  }
    },
    News: {
      screen: NewsStackNavigator,
      //navigationOptions: {
      //  tabBarIcon: () => {
      //    return <Image
      //      source={require('../Images/ic_fiber_new.png')}
      //      style={styles.icon}/>
      //  }
      //}
    },
    GoogleMap: {
      screen: GoogleMap,
    }
  },
  {
  defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent;
        let iconName;
        if (routeName === 'Search') {
          iconName = require('../Images/ic_search.png');
          IconComponent = SearchIconWithBadge;
        } else if (routeName === 'Favorites') {
          iconName = require('../Images/ic_favorite.png');
          IconComponent = FavoriteIconWithBadge;
        }
        else if (routeName === 'News') {
          iconName = require('../Images/ic_fiber_new.png');
          IconComponent = NewsIconWithBadge;
        }
        else if (routeName === 'GoogleMap') {
          return <Image source={require('../Images/ic_map.png')} style={styles.icon}/>;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={30} />; //color={tintColor}/>;
      },
    }),
    tabBarOptions: {
      activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
      inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
      showLabel: false, // On masque les titres
      showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
    }
  }
)

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})


// ATTENTION : placer cette ligne après le const
//export default createAppContainer(SearchStackNavigator)
export default createAppContainer(MoviesTabNavigator)
