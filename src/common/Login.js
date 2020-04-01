import React, { Component } from 'react'
import { Text, View,TextInput,TouchableOpacity,AsyncStorage,ToastAndroid, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Icon } from '@ant-design/react-native';
import {myFetch} from '../utils/index';
export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
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
    login=()=>{
        if(this.state.username != '' && this.state.pwd != ''){
            this.setState({isloading:true})
            myFetch.post('/login',{
                username:this.state.username,
                pwd:this.state.pwd
            }).then(res=>{
                AsyncStorage.setItem('user',JSON.stringify(res.data))
                    .then(()=>{
                        this.setState({isloading:false})
                        Actions.homePage();
                    })
            })
        }else{
            ToastAndroid.show('输入不能为空！',ToastAndroid.TOP)
        }
        
    }
    render() {
        return (
            <View style={{flex:1,justifyContent:'center'}}>
                <View style={{alignItems:'center'}}>
                    <Text style={{fontSize:20,marginBottom:40}}>登录/注册</Text>
                    <View style={{
                        width:'80%',
                        marginRight:10,
                        borderBottomColor:'#ccc',
                        borderBottomWidth:1,
                        flexDirection:'row',
                        alignItems:'center',
                        paddingLeft:20
                    }}>
                        <Icon name="user" color='red'/>
                        <TextInput placeholder="用户名"
                            onChangeText={this.userhandle}
                        />
                    </View>
                    <View style={{
                        width:'80%',
                        marginRight:10,
                        borderBottomColor:'#ccc',
                        borderBottomWidth:1,
                        flexDirection:'row',
                        alignItems:'center',
                        paddingLeft:20
                    }}>
                        <Icon name="user" color='red'/>
                        <TextInput 
                            placeholder="密码"
                            onChangeText={this.pwdhandle}
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity 
                        style={{
                            width:'80%',
                            height:40,
                            backgroundColor:'#ccc',
                            marginTop:30,
                            alignItems:'center',
                            justifyContent:'center'
                        }}
                        onPress={this.login}>
                        <Text>登录</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{
                            width:'80%',
                            height:40,
                            backgroundColor:'#ccc',
                            marginTop:30,
                            alignItems:'center',
                            justifyContent:'center'
                        }}
                        onPress={()=>Actions.register()}>
                        <Text>立即注册</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.isloading
                    ? ToastAndroid.show('正在登录',ToastAndroid.SHORT)
                    :null
                }
            </View>
        )
    }
}
