import React from 'react';
import {connect} from 'react-redux'
import SignIn from '../../components/sign-in/sign-in.component';
import {Redirect} from 'react-router-dom'
import './sign-in-and-sign-up.styles.scss';
import SignUp from '../../components/sign-up/sign-up.component';
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {createStructuredSelector} from "reselect";

const SignInAndSignUpPage = ({currentUser}) => (
  <div className='sign-in-and-sign-up'>
    {
      currentUser && <Redirect to={'/'}/>
    }
    <SignIn />
    <SignUp/>
  </div>
);

const mapStateToProps = (state) => createStructuredSelector({
  currentUser:selectCurrentUser
});

export default connect(mapStateToProps)(SignInAndSignUpPage);
