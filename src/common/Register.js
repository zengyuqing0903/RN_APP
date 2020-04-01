import React, { Component } from 'react'
import { Text, View,ToastAndroid,TextInput,TouchableOpacity,StyleSheet,AsyncStorage, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Icon } from '@ant-design/react-native';
import {myFetch} from '../utils/index'
export default class Register extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            email:'',
            pwd:'',
            isloading:false
        }
    }
    userhandle=(text)=>{
        this.setState({username:text})
    }
    pwdhandle=(text)=>{
        this.setState({pwd:text})
    }
    emailhandle=(text)=>{
        this.setState({email:text})
    }
    register=()=>{
        if(this.state.username != '' && this.state.pwd != '' && this.state.email != ''){
            this.setState({isloading:true})
            myFetch.post('/register',{
                username:this.state.username,
                email:this.state.email,
                pwd:this.state.pwd
            }).then(res=>{
                if(res.data.status == '0000'){
                    ToastAndroid.show('账户已存在', ToastAndroid.SHORT)
                }else{
                    AsyncStorage.setItem('user',JSON.stringify(res.data))
                        .then(()=>{
                            this.setState({isloading:false})
                            Alert.alert('注册成功');
                            Actions.login();
                        })
                }
            })
        }else{
            ToastAndroid.show('输入不能为空！',ToastAndroid.SHORT)
        }
    }
    render() {
        return (
            <View style={{flex:1,justifyContent:'center'}}>
                
                <View style={{alignItems:'center'}}>
                    <Text style={{fontSize:20,marginBottom:40}}>登录/注册</Text>
                    <View style={styles.com}>
                        <Icon name="user" color='red'/>
                        <TextInput placeholder="用户名"
                            onChangeText={this.userhandle}
                        />
                    </View>
                    <View style={styles.com}>
                        <Icon name="mail" color='red'/>
                        <TextInput placeholder="email地址"
                            onChangeText={this.emailhandle}
                        />
                    </View>
                    <View style={styles.com}>
                        <Icon name="user" color='red'/>
                        <TextInput 
                            placeholder="密码"
                            onChangeText={this.pwdhandle}
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity 
                        style={styles.btn}
                        onPress={this.register}>
                        <Text>注册</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.btn}
                        onPress={()=>Actions.login()}>
                        <Text>返回登录</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    com:{
        width:'80%',
        marginRight:10,
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:20
    },
    btn:{
        width:'80%',
        height:40,
        backgroundColor:'#ccc',
        marginTop:30,
        alignItems:'center',
        justifyContent:'center'
    }
})