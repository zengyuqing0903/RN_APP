import React, { Component } from 'react'
import { Text, View, StyleSheet,Dimensions, Image, FlatList, ScrollView, TouchableOpacity,AsyncStorage } from 'react-native'
import { Icon} from '@ant-design/react-native';
import ImagePicker from 'react-native-image-picker';
import {Actions} from 'react-native-router-flux';

const {width,height} = Dimensions.get('window');
const s = width / 640;
const h = height / 1110;
const owner = [
    {
        title:'账户管理',
        icon:'setting'
    },
    {
        title:'收货地址',
        icon:'environment'
    },
    {
        title:'我的信息',
        icon:'solution'
    },
    {
        title:'我的订单',
        icon:'profile'
    },
    {
        title:'我的二维码',
        icon:'qrcode'
    },
    {
        title:'我的积分',
        icon:'sketch'
    },
    {
        title:'我的收藏',
        icon:'star'
    }
];
const act = [
    {
        title:'居家维修保养',
        icon:'tool'
    },
    {
        title:'出行接送',
        icon:'car'
    },
    {
        title:'我的受赠人',
        icon:'user'
    },
    {
        title:'我的住宿优惠',
        icon:'inbox'
    },
    {
        title:'我的活动',
        icon:'flag'
    },
    {
        title:'我的发布',
        icon:'form'
    }
]
const options = {
    title: '选择头像',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'选择相册',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
};
export default class User extends Component {
    constructor(){
        super();
        this.state = {
            imageUrl:require('../../assets/pic/avatar.png')
        }
    }
    componentDidMount(){
        this.getData();
    }
    takephoto = ()=>{
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
              return;
            } else if (response.error) {
              console.log('Error:', response.error);
            } else if (response.customButton) {
              console.log('custom:', response.customButton);
            } else {
              const source = { uri: response.uri };
              this.setState({
                imageUrl: source,
              });
              this.storeData(this.state.imageUrl);
            }
          });
    };
    storeData =(data)=>{
        AsyncStorage.setItem('photo',JSON.stringify(data),
            ()=>{console.log('store success')}
        )
    }
    getData = ()=>{
        AsyncStorage.getItem('photo')
        .then((res)=>{
            this.setState({imageUrl:(res?JSON.parse(res): require('../../assets/pic/avatar.png'))})
        })
    }
    signOut = ()=>{
        AsyncStorage.getItem("user")
        .then(res=>{
            if(res){
                AsyncStorage.removeItem("user")
                    .then((error)=>console.log(error));
                    Actions.login()
            }else{
                console.log("还没有登录哦！！")
            }
        })
    }
    
    render() {
        return (
            <View>
                <ScrollView>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={()=>{this.takephoto()}}>
                            <View style={{width:120,height:120}}>
                                <Image source={this.state.imageUrl}
                                    style={{width:120,height:120,borderRadius:120}} 
                                />
                            </View>
                        </TouchableOpacity>
                        <Text style={{fontSize:22,color:'#fff',marginTop:20}}>BINNU DHILLON</Text>
                    </View>
                    <View style={{backgroundColor:'#fff',marginBottom:10*h}}>
                        <View style={styles.cen}>
                            <Icon name='user' size='lg' style={{marginLeft:20*s}}/>
                            <Text style={[styles.word,{fontSize:20}]}>我的个人中心</Text>
                        </View>
                        <FlatList
                            data={owner}
                            numColumns={3}
                            renderItem={({item})=>(
                                <View style={styles.owner}>
                                    <Icon name={item.icon} size='lg'/>
                                    <Text style={styles.word}>{item.title}</Text>
                                </View>
                            )}
                        />
                    </View>
                    <View style={{backgroundColor:'#fff'}}>
                        <View style={styles.cen}>
                            <Icon name='tag' size='lg' style={{marginLeft:20*s}}/>
                            <Text style={[styles.word,{fontSize:20}]}>E族活动</Text>
                        </View>
                        <FlatList
                            data={act}
                            numColumns={3}
                            renderItem={({item,index})=>(
                                index==5?
                                <TouchableOpacity 
                                    onPress={()=>Actions.release()}>
                                    <View style={styles.owner}>
                                        <Icon name={item.icon} size='lg'/>
                                        <Text style={styles.word}>{item.title}</Text>
                                    </View>
                                </TouchableOpacity>:
                                <TouchableOpacity>
                                    <View style={styles.owner}>
                                        <Icon name={item.icon} size='lg'/>
                                        <Text style={styles.word}>{item.title}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <View style={{height:97*h,width:width}}>
                        <TouchableOpacity 
                            onPress={()=>{this.signOut()}}
                        >
                            <Text style={styles.bot}>BINNU DHILLON  |  退出登录</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    header:{
        width:width,
        height:260,
        backgroundColor:'#f23030',
        justifyContent:'center',
        alignItems:'center'
    },
    cen:{
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#eee',
        flexDirection:'row',
        height:78*h,
    },
    word:{
        marginLeft:20*s,
        fontSize:16,
        color:'#767676'
    },
    owner:{
        alignItems:'center',
        marginTop:35*h,
        marginBottom:34*h,
        width:212*s,
    },
    bot:{
        fontSize:18,
        color:'#767676',
        textAlign:'center',
        lineHeight:97*h
    }
})