import React,{useState,useEffect} from 'react';
import {StyleSheet,View,Text,BackHandler,ToastAndroid,AsyncStorage} from 'react-native';
import {Router,Overlay,Scene,Tabs,Drawer,Lightbox,Modal,Actions} from 'react-native-router-flux';
import {Icon} from '@ant-design/react-native';
import SplashScreen from 'react-native-splash-screen';
import Home from './src/home/Home';
import Goods from './src/goods/Goods';
import User from './src/userinfor/User';
import Release from './src/userinfor/Release';
import Login from './src/common/Login'
import SwiperPage from './src/common/SwiperPage';
import Register from './src/common/Register';

console.disableYellowBox = true;

const rootUrl = 'https://www.fastmock.site/mock/d62556e52d1f5c0d4c71881c01c91850/api';
// 集中定义组件样式
const styles = StyleSheet.create({ 

});
const App = () => {
    let [isLogin,setLogin] = useState(false);
    let [isInstall,setInstall] = useState(true);

    // 实现Tabs 
    let now = 0;
    let init=()=>{
        AsyncStorage.getItem('isInstall')
            .then(res=>{
                console.log('isinstall',res)
                if(res){
                    setInstall(false);
                }
            })
        // AsyncStorage.clear()
        AsyncStorage.getItem('user')
            .then(res=>{
                let user = JSON.parse(res)
                console.log(user)
                if(!user){
                    SplashScreen.hide();
               }
                if(user&&user.token){
                    setLogin(true);
                    SplashScreen.hide();
                };
            })
       
    }
    useEffect(()=>{
        init()
    },[])
    let afterInstall = ()=>{
        console.log('after install');
        setInstall(false)
    }
    if(isInstall){
        return <View style={{flex:1}}>
            <SwiperPage afterInstall = {afterInstall}/>
        </View>
    }

	return (
		<Router
            backAndroidHandler={()=>{
                if(Actions.currentScene != 'home' && Actions.currentScene != 'login'){
                    Actions.pop();
                    return true;
                }
                else {
                    if(new Date().getTime()-now<2000){
                        BackHandler.exitApp();
                    }else{
                        ToastAndroid.show('确定要退出吗',100);
                        now = new Date().getTime();
                        return true;
                    }
                }
            }}
        >
            <Overlay>
            <Modal key="modal" hideNavBar>
                <Lightbox key="lightbox">
                        <Scene key="root">
                            <Tabs 
                                key='tabbar'
                                hideNavBar
                                activeTintColor='red'
                                inactiveTintColor='#979797'
                                tabBarStyle={{backgroundColor:'#fff'}}
                            >
                                {/* 首页 */}
                                <Scene 
                                    key='homePage'
                                    title='首页'
                                    hideNavBar={true}
                                    icon={({focused})=>
                                        <Icon 
                                            color={focused?'red':'#979797'} 
                                            name="home"
                                        />}
                                >
                                    <Scene key='home' component={Home}/>
                                </Scene>
                                {/* 商品分类 */}
                                <Scene key='goodPage'
                                    title="商品分类"
                                    hideNavBar={true}
                                    icon={({focused})=><Icon color={focused?'red':'#979797'} name="appstore"/>}
                                >
                                    <Scene key="goods" component={Goods}/>
                                </Scene>
                                {/* 用户中心 */}
                                <Scene 
                                    key='UserPage'
                                    hideDrawerButton
                                    icon={({focused})=>
                                        <Icon 
                                            color={focused?'red':'#979797'} 
                                            name="user"
                                        />}
                                        title='个人中心'
                                        hideNavBar={true}
                                        
                                >
                                    <Scene key="user" component={User} />
                                    <Scene 
                                        key="release" 
                                        title='我的发布'
                                        hideTabBar
                                        hideNavBar={false}
                                        component={Release}
                                        titleStyle={{flex:1,textAlign:'center',color:'#fff'}}
                                        navigationBarStyle={{backgroundColor:'red'}}
                                        navBarButtonColor='#fff'
                                        renderRightButton={()=><Icon color='#fff' name="ellipsis" style={{marginRight:20}}/>}
                                    />
                                </Scene>
                            </Tabs>
                        </Scene>
                </Lightbox>
                <Scene key="login" initial={!isLogin} component={Login}/>
                <Scene key="register" component={Register}/>
            </Modal>
            </Overlay>
        </Router>
	);
};
export default App;
