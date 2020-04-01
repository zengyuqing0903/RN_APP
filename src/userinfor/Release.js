import React, { Component } from 'react'
import { Text, View,Dimensions, StyleSheet,TouchableOpacity,ToastAndroid, ScrollView} from 'react-native'

const arr = ['已回复','待回复'];
const {width,height} = Dimensions.get('window');
const s = width / 640;
const h = height /1110;
export default class Release extends Component {
    constructor(){
        super();
        this.state = {
            titles:[],
            page:1,
            disabled:false,
            brr:[],
            isloading:false
        }
    }
    getBeforePage=()=>{
        this.setState({
            page:((this.state.page==1)?(this.state.page=1):(this.state.page-1)),
            disabled:(this.state.page==1)?(this.state.disabled=true)&&ToastAndroid.show('已经是第一页了!', ToastAndroid.SHORT):(this.state.disabled=false)
        })
        this.getRandom();
    }
    getBackPage=()=>{
        this.setState({
            page:this.state.page+1
        })
        this.getRandom();
    }
    getRandom=()=>{
        let crr = [];
        for(var i=0;i<13;i++){
            let reply = arr[Math.floor((Math.random()*arr.length))];
            crr.push({"huifu":reply})
        }
        this.setState({
            brr:crr
        })
    }
    componentDidMount(){
        this.setState({isloading:true})
        fetch("https://cnodejs.org/api/v1/topics?limit=13&page="+this.state.page)
            .then((res)=>res.json())
            .then((res)=>{
                this.setState({
                    titles:res.data,
                    isloading:false
                })
            })
        this.getRandom();
    }
    componentDidUpdate(){
        fetch("https://cnodejs.org/api/v1/topics?limit=13&page="+this.state.page)
            .then((res)=>res.json())
            .then((res)=>{
                this.setState({titles:res.data})
            })
    }
    render() {
        return (
            <View style={{backgroundColor:'#fff',flex:1}}>
                <View >
                    <ScrollView>
                    {
                        this.state.titles.map(
                            (item,idx)=><View style={styles.container}>
                                <Text style={styles.tit}>{item.title ? (item.title.length > 15 ? item.title.substr(0, 15) + "..." : item.title) : ""}</Text>
                                <Text style={styles.time}>{(item.create_at).substring(0,10)}</Text>
                                <Text style={styles.reply}>
                                    {this.state.brr[idx].huifu=='待回复'
                                    ?<Text style={{color:'#666'}}>{this.state.brr[idx].huifu}</Text>
                                    :<Text style={{color:'red'}}>{this.state.brr[idx].huifu}</Text>
                                    }</Text>
                            </View>
                        )
                    }
                    {
                        this.state.isloading
                        ? ToastAndroid.show("加载中...",ToastAndroid.SHORT)
                        :null
                    }
                    </ScrollView>
                </View>
                <View style={styles.bot}>
                    <TouchableOpacity 
                        style={[styles.btn,styles.btn1]}
                        onPress={() => this.getBeforePage()}
                        disabled={this.state.disabled}
                        ><Text style={{color:'#fff',lineHeight:35}}>上一页</Text></TouchableOpacity>
                    <Text style={styles.page}>第{this.state.page}页</Text>
                    <TouchableOpacity 
                        style={[styles.btn,styles.btn2]}
                        onPress={() => this.getBackPage()}
                    >
                        <Text style={{color:'#fff',lineHeight:35}}>下一页</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        borderBottomWidth:1/3,
        paddingTop:15*h,
        paddingBottom:15*h,
        borderBottomColor:'#979797'
    },
    tit:{
        // fontSize:16,
        color:'#666',
        marginLeft:10*s
    },
    time:{
        // fontSize:16,
        position:'absolute',
        right:110*s,
        top:15*h,
        color:'#666',
    },
    reply:{
        // fontSize:16,
        position:'absolute',
        right:10*s,
        top:15*h,
    },
    bot:{
        flexDirection:'row',
        marginTop:50,
    },
    btn:{
        backgroundColor:'red',
        color:'#fff',
        height:35,
        width:120*s,
        borderRadius:20*s,
        alignItems:'center'
    },
    btn1:{
        position:'absolute',
        left:s*50
    },
    btn2:{
        position:'absolute',
        left:s*480
    },
    page:{
        position:'absolute',
        left:s*295
    }
})