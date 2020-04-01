import React, { Component } from 'react'
import {
    Text,
    View,
    Dimensions,
    StyleSheet, 
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    BackHandler
} from 'react-native'
import { Icon } from '@ant-design/react-native';
const {width} = Dimensions.get('window');
const s = width / 640;
const goods = [
    {
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: '36.00',
        img: require('../../assets/shj1.png')
    },
    {
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: '36.00',
        img: require('../../assets/shj2.png')
    },
    {
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: '36.00',
        img: require('../../assets/shj1.png')
    },
    {
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: '36.00',
        img: require('../../assets/shj2.png')
    },
    {
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: '36.00',
        img: require('../../assets/shj1.png')
    },
    {
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: '36.00',
        img: require('../../assets/shj2.png')
    },
]
export default class LocalPage extends Component {
    constructor(){
        super();
        this.state = {
            tits: []
        }
    }
    componentDidMount(){
        BackHandler.addEventListener('back',()=>{
            BackHandler.exitApp();
        })
    }
    render() {
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                {/* <StatusBar backgroundColor='red'/> */}
                <View style={styles.header}>
                    <View style={styles.search}>
                        <TextInput 
                            placeholder="请输入商品名称"
                            style={{width:490*s,height:50}}
                        />
                        <Icon name='search'/>
                    </View>
                </View>
                <View style={styles.nav}>
                    <TouchableOpacity><Text style={{color:'#f23030'}}>综合</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={{color:'#666'}}>销量</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={{color:'#666'}}>新品</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={{color:'#666'}}>价格</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={{color:'#666'}}>信用</Text></TouchableOpacity>
                </View>
                <FlatList
                    style={{backgroundColor:'#F4F4F4'}}
                    data={goods}
                    numColumns={2}
                    renderItem={({item})=>(
                        <View style={styles.good}>
                            <Image 
                                resizeMode='contain'
                                source={item.img}
                                style={{height:180*s,marginTop:60*s}}
                            />
                            <Text style={{marginTop:20,color:'#666'}}>{item.title}</Text>
                            <Text style={{width:'100%',color:'#f23030',marginTop:10}}>{item.price}</Text>
                        </View>
                    )}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    header:{
        height:70*s,
        borderBottomColor:'#e8e8e8',
        borderBottomWidth:1,
        justifyContent:'center',
        alignItems:'center'
    },
    search:{
        width:544*s,
        height:50*s,
        backgroundColor:'#EEE',
        flexDirection:'row',
        alignItems:'center'
    },
    nav:{
        height:73*s,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
    good:{
        width:290*s,
        backgroundColor:'#fff',
        marginLeft:20*s,
        marginTop:20*s,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:20,
        alignItems:'center'
    }
})