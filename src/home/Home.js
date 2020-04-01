import React, {Component} from 'react'
import {Text,View,Dimensions,StyleSheet,TextInput,ScrollView,Image,FlatList} from 'react-native'
import { Icon } from '@ant-design/react-native';
import Swiper from 'react-native-swiper';
import Button from 'react-native-button';
const {width,height} = Dimensions.get('window');
const s = width / 640;
const h = height / 1110;
const list = [
    {
        title: '居家维修保养',
        img: require('../../assets/pic/repair.jpg')
    },
    {
        title: '住宿优惠',
        img: require('../../assets/pic/flag.jpg')
    },
    {
        title: '出行接送',
        img: require('../../assets/pic/dashboard.jpg')
    },
    {
        title: 'E族活动',
        img: require('../../assets/pic/gift.jpg')
    }
]
export default class Home extends Component {
    render() {
        return (
            <View style={{backgroundColor:'#f5f5f5',flex:1}}>
                <View style={styles.header}>
                    <View style={styles.search}>
                        <TextInput 
                            placeholder="请输入您要搜索的关键字"
                            placeholderTextColor='#fff'
                            style={styles.int}
                        />
                        <Icon 
                            name='search' 
                            color='#fff'
                            style={{position:'absolute',left:10*s}}
                        />
                        <Icon 
                            name='shopping-cart' 
                            color='#fff'
                            style={{marginLeft:25*s}}
                        />
                    </View>
                </View>
                <ScrollView>
                    <View style={styles.container}>
                        <Swiper 
                            style={styles.wrapper} 
                            autoplay 
                            autoplayTimeout={1} 
                            index={0} 
                            dot={<View style={{backgroundColor:'rgba(0,0,0,.2)',width:10,height:10,borderRadius:5,marginLeft:10}}/>}
                            activeDot={<View style={{backgroundColor:'red', width:10, height:10,borderRadius:5,marginLeft:10}}/>}
                        >
                            <Image style={{width:width,height:275*h}} source={require('../../assets/pic/carousel1.jpg')}/>
                            <Image style={{width:width,height:275*h}} source={require('../../assets/pic/carousel2.jpg')}/>
                            <Image style={{width:width,height:275*h}} source={require('../../assets/pic/carousel1.jpg')}/>
                        </Swiper>
                    </View>
                    <FlatList
                        style={{backgroundColor:'#F4F4F4'}}
                        data={list}
                        renderItem={({item})=>(
                            <View style={styles.list}>
                                <Image 
                                    source={item.img}
                                    style={{marginTop:10*h,marginLeft:25*s,width:90,height:90}}
                                />
                                <Text style={{fontSize:20,marginLeft:40*s,color:'#5d5d5d'}}>{item.title}</Text>
                                <Icon name='right' style={{position:'absolute',right:30*s}}/>
                            </View>
                        )}
                    />
                    <Button style={styles.btn}>发布需求</Button>
                    <Text style={styles.txt}>©E族之家 版权所有</Text>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    header:{
        height:70,
        backgroundColor:'#f23030',
        borderBottomColor:'#e8e8e8',
        borderBottomWidth:1/3,
        justifyContent:'center',
        alignItems:'center',
    },
    search:{
        width:544*s,
        height:55,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    int:{
        width:525*s,
        height:45,
        backgroundColor:'#fbb8b8',
        paddingLeft:75*s,
        borderRadius:50
    },
    container:{
        height:275*h,
    },
    list:{
        flexDirection:'row',
        width:width,
        backgroundColor:'#fff',
        marginTop:10*h,
        paddingBottom:10*h,
        alignItems:'center'
    },
    btn:{
        backgroundColor:'#f23030',
        borderRadius:10,
        color:'#fff',
        fontSize:20,
        height:55,
        marginLeft:48*s,
        marginTop:35*h,
        width:540*s,
        lineHeight:55
    },
    txt:{
        color:'#767676',
        fontSize:16,
        marginBottom:30*h,
        marginTop:60*h,
        textAlign:'center'
    }
})