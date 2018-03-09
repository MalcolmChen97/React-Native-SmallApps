/**
 * Created by MalcolmChen on 2018-03-08.
 */
import React, {Component} from 'react';
import {Input, Button, Card, CardSection,Spinner} from './common';
import firebase from 'firebase';
import {Text} from 'react-native';
class LoginForm extends Component {
    state = {email: '',password:'',error:'',loading:false};

    onButtonPress(){
        const {email,password}=this.state;
        this.setState({error:'',loading:true});


        firebase.auth().signInWithEmailAndPassword(email,password)
            .then(this.onLoginSuccess.bind(this))
            .catch(()=>{
            firebase.auth().createUserWithEmailAndPassword(email,password)
                .then(this.onLoginSuccess.bind(this))
                .catch(this.onLoginFail.bind(this));

        });
    }

    onLoginFail(){
        this.setState({
            error:'Authentication fails',
            loading:false
        });
    }

    onLoginSuccess(){
        this.setState({
            email:'',
            password:'',
            loading:false,
            error:''
        });

    }



    renderButton(){
        if(this.state.loading){
            return (
                <Spinner size='small'/>
            );
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>Log in</Button>

        );

    }



    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        secureTextEntry={false}
                        label='Email'
                        placeholder='user@gmail.com'
                        value={this.state.email}
                        onChangeText={email=>this.setState({email:email})}
                    />
                </CardSection>

                <CardSection >
                    <Input
                        secureTextEntry={true}
                        label="Password"
                        placeholder="password"
                        onChangeText={password=>this.setState({password:password})}
                        value={this.state.password}

                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>


                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }

}

const styles={
    errorTextStyle:{
        fontSize:20,
        alignSelf:'center',
        color:'red'

    }
};


export default LoginForm;
