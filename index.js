/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
// 运行网页端需要调用 runApplication 方法
AppRegistry.runApplication(appName, { rootTag: document.getElementById('root') });
