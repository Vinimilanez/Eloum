import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Alert, SafeAreaView, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Avatar, Button, Card, FAB, Modal, Paragraph, Portal, RadioButton, Text, TextInput, Title } from "react-native-paper";
import { In } from "typeorm";
import Post, { Feeling, FeelingDescription } from "../../../domain/entities/posts/Post";
import Session from "../../../infra/session/Session";
import PostRepository from "../../../repository/posts/PostRepository";
import ShareRepository from "../../../repository/share/ShareRepository";
import { DefaultTheme } from "../../themes/DefaultTheme";

export default function Home({navigation}){
    
    const [posts, setPosts] = useState<Post[]>([]);
    
    const getPosts = async (): Promise<Post[]> => {
        if (Session.Person.professional){
            let posts = await new ShareRepository().get({where:{ idPerson: Session.Person.id}})

            return await new PostRepository().get({ where: {
                id: In(posts.map(x => x.idPost))
            }, order: {
                date: "DESC"
            }});
        }

        return await new PostRepository().get({ where: {
            idPerson: Session.Person.id
        }, order: {
            date: "DESC"
        }});
    }

    const SharePost = async (item: Post): Promise<void> =>{
        try{
           await new ShareRepository().save({idPost: item.id, idPerson: 1});
        }catch(err: Error | any){
            Alert.alert(err.message);
        }
    }

    const [visible, setVisible] = React.useState(false);

    const [title, setTitle] = React.useState<string>('');
    const [description, setDescripion] = React.useState<string>('');
    const [checked, setChecked] = React.useState<Feeling>(null);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    useEffect(() => {
        getPosts().then((res) => {
            setPosts(res);
        })
        .catch((err) => { Alert.alert(err.message) })
    }, []);
    
    useEffect(() => {}, [posts]);

    const save = async() => {
        try{

            let p = new Post();

            p.date = new Date();
            p.description = description;
            p.feeling = checked;
            p.idPerson = Session.Person.id;
            p.title = title;
            p.personName = Session.Person.name;

            await new PostRepository().save(p);
            
            setPosts(o => [p, ...o]);

            hideModal();
            setTitle('');
            setDescripion('');
            setChecked(null)

        }catch(err: Error | any){
            Alert.alert(err.message);
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: 'row', padding: 16}}>
                <View style={{flex: 1,flexDirection: 'row'}}>
                    <Text style={{fontSize: 20}}>{!Session.Person.professional ? Session.Person.name : `Dr. ${Session.Person.name}`}</Text>
                </View>
                <View style={{flex: 1,flexDirection: 'row-reverse'}}>
                    <Button
                        onPress={() => {
                            Session.Person = null;
                            navigation.navigate("Login");
                        }}
                    >Sair</Button>
                </View>
            </View>
            <FlatList style={{ flex:1, alignSelf: 'center', width: '100%'}}
                    data={posts}
                    renderItem={({item}) => {
                        return(
                            <Card style={{marginTop: 10}}>
                               <Card.Title title={item.title} subtitle={FeelingDescription.get(item.feeling)} left={LeftContent} />
                                   <Card.Content>
                                       {Session.Person.professional ? <Title>{item.personName}</Title> : null}
                                       <Paragraph>{item.description}</Paragraph>
                                   </Card.Content>                                    
                                   <Card.Actions>
                                       <Button icon='share' onPress={() => {
                                            SharePost(item);
                                       }}>Compartilhar</Button>
                                   </Card.Actions>
                            </Card>
                        )
                    }}
                />
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                        <View style={styles.form}>
                            <TextInput mode='outlined' theme={DefaultTheme} label="Titulo (Opcional)" value={title} onChangeText={x => setTitle(x)}/>
                            <TextInput style={{height: 200}} multiline mode='outlined' theme={DefaultTheme} label="Descrição do ocorrido" value={description} onChangeText={x => setDescripion(x)} secureTextEntry/>
                            <View>
                                <Text>Qual o seu sentimento?</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <RadioButton
                                      theme={DefaultTheme}
                                      value={FeelingDescription.get(Feeling.angry).toString()?? 'Teste'}
                                      status={ checked === Feeling.angry ? 'checked' : 'unchecked' }
                                      onPress={() => setChecked(Feeling.angry)}
                                    />
                                    <Text theme={DefaultTheme} style={{alignSelf: 'center'}}>{FeelingDescription.get(Feeling.angry).toString()}</Text>
                                </View>
                                
                                <View style={{flexDirection: 'row'}}>
                                    <RadioButton
                                      theme={DefaultTheme}
                                      value={FeelingDescription.get(Feeling.confused).toString()}
                                      status={ checked === Feeling.confused ? 'checked' : 'unchecked' }
                                      onPress={() => setChecked(Feeling.confused)}
                                    />
                                    <Text theme={DefaultTheme} style={{alignSelf: 'center'}}>{FeelingDescription.get(Feeling.confused).toString()}</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <RadioButton
                                      theme={DefaultTheme}
                                      value={FeelingDescription.get(Feeling.happy).toString()}
                                      status={ checked === Feeling.happy ? 'checked' : 'unchecked' }
                                      onPress={() => setChecked(Feeling.happy)}
                                    />
                                    <Text theme={DefaultTheme} style={{alignSelf: 'center'}}>{FeelingDescription.get(Feeling.happy).toString()}</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <RadioButton
                                      theme={DefaultTheme}
                                      value={FeelingDescription.get(Feeling.indifference).toString()}
                                      status={ checked === Feeling.indifference ? 'checked' : 'unchecked' }
                                      onPress={() => setChecked(Feeling.indifference)}
                                    />
                                    <Text theme={DefaultTheme} style={{alignSelf: 'center'}}>{FeelingDescription.get(Feeling.indifference).toString()}</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <RadioButton
                                      theme={DefaultTheme}
                                      value={FeelingDescription.get(Feeling.sad).toString()}
                                      status={ checked === Feeling.sad ? 'checked' : 'unchecked' }
                                      onPress={() => setChecked(Feeling.sad)}
                                    />
                                    <Text theme={DefaultTheme} style={{alignSelf: 'center'}}>{FeelingDescription.get(Feeling.sad).toString()}</Text>
                                </View>
                            </View>
                        </View>
                        <Button onPress={save} style={styles.button} mode="contained">Salvar</Button>
                    </Modal>
                </Portal>
                {!Session.Person.professional ? <><FAB icon='add' style={styles.fab} onPress={showModal}/></>: null}
        </SafeAreaView>
    );
}

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: DefaultTheme.colors.background,
      padding: 16,
      paddingTop: 25
    },
    form: {
        flex: 1,
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
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
      modal: {
        flex: 1,
        backgroundColor: DefaultTheme.colors.background, padding: 20
      }
  });