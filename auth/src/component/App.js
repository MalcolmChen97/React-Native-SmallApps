/**
 * Created by MalcolmChen on 2018-03-05.
 */
import React, {Component} from 'react';
import {View,Text} from 'react-native';
import {Header,Button,Spinner,Card,CardSection} from './common';
import firebase from 'firebase';
import LoginForm from'./LoginForm';
class App extends Component {
    state = {login:null};

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyAN-keQSlp6Ce5x1lbPtpWi9vRsygrVok8",
            authDomain: "authentication-6ba0a.firebaseapp.com",
            databaseURL: "https://authentication-6ba0a.firebaseio.com",
            projectId: "authentication-6ba0a",
            storageBucket: "authentication-6ba0a.appspot.com",
            messagingSenderId: "74146585049"
        });

        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                this.setState({login:true});
            }else{
                this.setState({login:false});
            }
        });

    }

    renderContent(){


        switch(this.state.login){
            case true:
                return (
                        <Button onPress={()=>{
                            firebase.auth().signOut()
                        }}>
                            Log Out
                        </Button>
                );
            case false:
                return <LoginForm/>;
            default:
                return (
                        <Spinner/>
                );
        }

    }


    render() {
        return (
            <View>
                <Header headerText="Authentication"/>
                {this.renderContent()}
            </View>

        );
    }
}

export default App;
