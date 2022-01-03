import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

import Home from "../screens/Home";
import EditScreen from "../screens/EditScreen";

const MainStack = createStackNavigator();
const Main = () => {
    return (
        <MainStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <MainStack.Screen
                name="Home"
                component={Home}
            />
            <MainStack.Screen
                name="EditScreen"
                component={EditScreen}
            />
        </MainStack.Navigator>
    );
};

export default () => {
    return (
        <NavigationContainer>
            <Main/>
        </NavigationContainer>
    );
};
