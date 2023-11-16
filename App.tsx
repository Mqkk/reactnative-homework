import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import CustomTitle from './CustomTitle';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

interface IProps {
  navigation: any;
}

function Root() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        initialParams={{id: 42}}
      />
    </Drawer.Navigator>
  );
}

function HomeScreen({navigation}: IProps) {
  return (
    <View style={styles.screen}>
      <Text>Home screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          navigation.navigate('Details', {
            id: 86,
            otherParam: 'anything you want here',
          });
        }}
      />
      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate('Profile');
        }}
      />
    </View>
  );
}

interface IDetailsProps {
  route: any;
  navigation: any;
}

function ProfileScreen() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{tabBarBadge: 3}}
      />
      <Tab.Screen
        name="Details"
        component={DetailsScreen}
        initialParams={{id: 42}}
      />
      <Tab.Screen name="Root" component={Root} />
    </Tab.Navigator>
  );
}

function DetailsScreen({route, navigation}: IDetailsProps) {
  const {id, otherParam} = route.params;

  return (
    <View style={styles.screen}>
      <Text>Details screen</Text>
      <Text>id: {JSON.stringify(id)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {id: Math.floor(Math.random() * 100)})
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          title: 'Home',
          headerStyle: {
            backgroundColor: 'green',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => <CustomTitle />,
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#000"
              />
            ),
          }}
        />
        <Stack.Screen
          name="Root"
          component={Root}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          initialParams={{id: 42}}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{title: 'Profile'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 5,
  },
});

export default App;
