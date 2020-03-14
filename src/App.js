import React from "react"
import { Switch, Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';

import {setCurrentUser} from './redux/user/user.actions'

import HomePage from './pages/homepage/HomePage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';

import {auth , createUserProfileDocument} from './firebase/firebase.utils'

class App extends React.Component {
  unsubscribeFromAuth = null
  componentDidMount() {
    const {setCurrentUser} = this.props
    // every time the auth mode changes - run this function
    // fire base is already handle the cookies and the token so if thee user is logged in before it will automatically run when the app start
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // if there is no user we will get null, so if there is a user
      if (userAuth) {
        // check if he saved in the data base, and retrieve the ref to the database
        const userRef = await createUserProfileDocument(userAuth);
        // get the data from the database and update the state
        userRef.onSnapshot(snapshot=>{
          setCurrentUser({
            id:snapshot.id,
            ...snapshot.data()
          });
        });
      }
      // if there is no user connected we will get null so set the current user to null
      setCurrentUser({currentUser:userAuth})
    });
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }
  render(){
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/signin' render={()=> this.props.currentUser ? (<Redirect to={'/'}/>) :(<SignInAndSignUpPage/>)} />
      </Switch>
    </div>
  );
  }
}

const mapStateToProps = (state)=>({
    currentUser:state.user.currentUser
})

const mapDispatchToProps = (dispatch) =>({
  setCurrentUser:user=> dispatch(setCurrentUser(user))
})
export default connect(mapStateToProps,mapDispatchToProps)(App);
