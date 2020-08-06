import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

/**
|--------------------------------------------------
| Create const reused for react-navigator
|--------------------------------------------------
*/
export const StackNavigator     = createStackNavigator();
export const TabNavigator       = createBottomTabNavigator();
export const DrawerNavigator    = createDrawerNavigator();
