import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import { createDrawerNavigator } from '@react-navigation/drawer';
import { NativeBaseProvider } from 'native-base';
import Home from './screens/Home/Home';
import Task from './screens/Task/Task';
import Settings from './screens/Settings/Settings';
const Stack = createStackNavigator();
//const Drawer = createDrawerNavigator();


// function MyDrawer() {
//     return (
//       <Drawer.Navigator>
//         <Drawer.Screen name="Home" component={Home} />
//         <Drawer.Screen name="Settings" component={Settings} />
//       </Drawer.Navigator>
//     );
//   }
{/*//rgb(6, 182, 212)*/}
const App = () => {
    return (
      <NavigationContainer>
        <NativeBaseProvider>
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#0e7490' } }}> 
            <Stack.Screen name="Home" component={Home} options={{ title: 'Görev Listesi', headerTintColor: '#FFFF', headerTitleAlign: 'center'  }} />
            <Stack.Screen name="Task" component={Task} options={{ title: 'Yeni Görev', headerTintColor: '#FFFF', headerTitleAlign: 'center'  }} />
        </Stack.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    );
  }
  
  export default App;