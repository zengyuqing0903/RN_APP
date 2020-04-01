/**
 * @format
 */

import {AppRegistry} from 'react-native';
// 引入组件
import App from './App';
// 入口名称
import {name as appName} from './app.json';

// 注册根组件
AppRegistry.registerComponent(appName, () => App);
