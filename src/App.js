import React, { useContext, useEffect } from 'react'
import './App.scss';
import {auth, createUserProfile} from './Firebase/Firebase'
import Homepage from './Pages/Homepage/Homepage'
import { Switch, Route, Redirect} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute'
import Login from './Pages/Login/Login';
import SignInAndSignUp from './Pages/SignInAndSignUp/SignInAndSignUp';
import Signup from './Pages/SignUp/Signup';
import {UserContext} from './Context/UserContextProvider'
import Profilepage from './Pages/Profilepage/Profilepage'
import Tweet from './Pages/Tweet/Tweet'
import PostPage from './Pages/Post&Comment/Posts&comment'
import SearchPage from './Pages/SearchPage/Searchpage'
import Bookmarkpage from './Pages/BookmarkPage/BookmarkPage';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
const App = () => {
   const {setUser, user} = useContext(UserContext)

   
   useEffect(() => {
         
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfile(userAuth);
       userRef.onSnapshot(snapShot => {
       setUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
       
    });

     return () => {
       unsubscribeFromAuth();
     }
 }, [])



  return (
    <div>
     
       <Switch>
     
         <Route 
           exact path = '/'
           render={() =>
              user ? (
                 <Redirect to='/home' />
              ) : (
                 <SignInAndSignUp />
              )
            }
         />
             <Route exact path ='/Signup' render={() =>
              user ? (
                 <Redirect to='/home' />
              ) : (
                 <Signup />
              )
            } />
             <Route exact path ='/Login'  render={() =>
              user ? (
                 <Redirect to='/home' />
              ) : (
                 <Login/>
              )
            } />
             <Route exact path ='/Resetpassword'  render={() =>
              user ? (
                 <Redirect to='/home' />
              ) : (
                 <ResetPassword />
              )
            } />
             <ProtectedRoute exact path = '/home' component={Homepage} currentUser={user}  />
             <ProtectedRoute  path = '/Profile' component={Profilepage} currentUser={user}  /> 
             <ProtectedRoute exact path = '/tweet' component={Tweet} currentUser={user}  />
             <ProtectedRoute  exact path = '/PostPage' component={PostPage} currentUser={user}  />
             <ProtectedRoute  exact path = '/Explore' component={SearchPage} currentUser={user}  />
             <ProtectedRoute  exact path = '/Bookmark' component={Bookmarkpage} currentUser={user}  />

       </Switch>
  </div>
  
  );
}

export default App;
