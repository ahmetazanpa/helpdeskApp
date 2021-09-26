import React, { useMemo, useReducer, useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NativeBaseProvider } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from './components/context';
import Home from './screens/Home/Home';
import Task from './screens/Task/Task';
import Settings from './screens/Settings/Settings';
import SignInScreen from './screens/Auth/SignInScreen';
import CustomDrawerContent from './components/Custom/DrawerContent/CustomDrawerContent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Auth = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }}>
      <Stack.Screen name="SingIn" component={SignInScreen} />
      <Stack.Screen name="Root" component={Root} />
      {/* {loginState.userToken == null ?
        (
          <Stack.Screen name="Auth" component={Auth} />
        )
        :
        (
          <Stack.Screen name="Home" component={HomePage} options={{ title: 'Görev Listesi', headerTintColor: '#FFFF', headerTitleAlign: 'center', headerLeft }}/>
        )
      } */}
    </Stack.Navigator>
  )
}



const Root = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerStyle: { backgroundColor: '#0e7490' } }} backBehavior="goBack" drawerContent={(props) => <CustomDrawerContent {...props} /> } >
      <Drawer.Screen name="HomePage" component={Home} options={{ title: 'Görev Listesi', headerTintColor: '#FFFF', drawerActiveBackgroundColor: '#0891b2', drawerActiveTintColor: '#FFFF', headerTitleAlign: 'center', }} />
      <Drawer.Screen name="Settings" component={Settings} options={{ title: 'Ayarlar',  headerTintColor: '#FFFF', drawerActiveBackgroundColor: '#0891b2', drawerActiveTintColor: '#FFFF', headerTitleAlign: 'center',}} />
      <Drawer.Screen name="Task " component={TaskPage} />
   
    </Drawer.Navigator>
  );
}
{/*//rgb(6, 182, 212)*/ }

const TaskPage = () => {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#0e7490' } }}>
      <Stack.Screen name="Task" component={Task} options={{ title: 'Yeni Görev', headerTintColor: '#FFFF', headerTitleAlign: 'center' }} />
    </Stack.Navigator>
  )
}

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          eMail: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          eMail: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          eMail: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    signIn: async (foundUser) => {
      console.log(foundUser);
      // setUserToken('fgkj');
      // setIsLoading(false);
      const userToken = String(foundUser[0].userToken);
      const eMail = foundUser[0].email;
      console.log(eMail)
      try {
        await AsyncStorage.setItem('userToken', userToken);
        console.log(userToken, "userToken singIn")
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: eMail, token: userToken });
    },
    signOut: async () => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme);
    }
  }), []);

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        console.log(userToken, "userToken")
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          <NativeBaseProvider>
            <Auth />
          </NativeBaseProvider>
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
}

export default App;