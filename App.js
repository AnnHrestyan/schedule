import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import {ThemeProvider} from "react-native-rapi-ui";
import store from './src/store/store';
import { Provider } from 'react-redux'

export default function App() {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <AppNavigator/>
            </ThemeProvider>
        </Provider>
    );
}
