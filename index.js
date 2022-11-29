/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/view/App';
import {name as appName} from './app.json';
import { Provider as PaperProvider} from 'react-native-paper';
import { DefaultTheme } from './src/view/themes/DefaultTheme';

export default function Main(){
    return (
        <PaperProvider theme={DefaultTheme}>
            <App/>
        </PaperProvider>
    )
}

AppRegistry.registerComponent(appName, () => Main);
