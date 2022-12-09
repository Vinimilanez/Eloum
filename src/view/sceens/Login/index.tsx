import React from "react";
import { useState } from "react";
import { Alert } from "react-native";
import { Image, StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-navigation";
import Session from "../../../infra/session/Session";
import PersonRepository from "../../../repository/people/PersonRepository";
import { DefaultTheme } from "../../themes/DefaultTheme";

export default function Login({ navigation }){

    const login = async ():Promise<void> =>  {
        try{
            let repo = new PersonRepository();
            let person = await repo.getFirstOrDefault({ where: {
                active: true,
                email: email,
                password: senha
            }});

            if(!person || person.id == null){
                setSenha('');
                Alert.alert('Usuário ou senha incorreta!');
                return;
            }
            Session.Person = person;
            navigation.navigate('Home');

        }catch(err: Error | any){
            Alert.alert(err.message);
        }
        
        
        
    }

    const[email, setEmail] = useState<string>('');
    const[senha, setSenha] = useState<string>('');

    return(
        <SafeAreaView  style={styles.container}>
            <View style={{flex:1,  flexDirection:'column'}}>
                <View style={{flex:1, alignItems:'center'}}> 
                    <Image style={styles.logo} source={require('../../assets/images/Logo.png')}/>
                </View>
                <View style={styles.form}>
                    <TextInput mode='outlined' theme={DefaultTheme} label="E-Mail" value={email} onChangeText={x => setEmail(x)}/>
                    <TextInput mode='outlined' theme={DefaultTheme} label="Senha" value={senha} onChangeText={x => setSenha(x)} secureTextEntry/>
                    <Button onPress={login} style={styles.button} mode="contained">Login</Button>
                    <Button style={styles.button} mode="text">Criar conta</Button>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      padding: 16,
      flexDirection: 'row',
      alignItems:'center',
    },
    form: {
        flex: 1,
        backgroundColor: 'black',
        padding: 16,
        flexDirection: 'column',
    },
    logo: {
        flex:1,
        padding: 16,
        width:100, 
        height: 100,
        alignContent: 'center'
    },
    button: {
        marginTop: 10
    }
  });