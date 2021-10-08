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
import ForgotPassword from './screens/Auth/ForgotPassword';
import TaskDetail from './screens/Task/TaskDetail';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
          userToken: action.uid,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          eMail: action.email,
          userToken: action.uid,
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
          eMail: action.email,
          userToken: action.uid,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);
  const [email, setEmail] = useState("null")
  const authContext = useMemo(() => ({
    signIn: async (foundUser) => {
      //setUserToken('fgkj');
      //setIsLoading(false);
      const userToken = String(foundUser.uid);
      setEmail(foundUser.email);
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: email, token: userToken });
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
    // signUp: () => {
    //   // setUserToken('fgkj');
    //   // setIsLoading(false);
    // },
    toggleTheme: () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme);
    }
  }), []);

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        await AsyncStorage.setItem('emailAdress', email)
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 100);
  }, []);

  const Auth = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false, }}>
        <Stack.Screen name="SingIn" component={SignInScreen} />
        <Stack.Screen name="StackPages" component={Root} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    )
  }
  
  const Root = () => {
    return (
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#0e7490' } }}>
        <Stack.Screen name="HomeDrawer" component={HomeDrawer} options={{ headerShown: false }} />
        <Stack.Screen name="Task" component={Task} options={{ title: 'Yeni Görev', headerTintColor: '#FFFF', headerTitleAlign: 'center' }} />
        <Stack.Screen name="TaskDetail" component={TaskDetail} options={{ title: 'Görev Detayı', headerTintColor: '#FFFF', headerTitleAlign: 'center' }} />
      </Stack.Navigator>
    )
  }
  
  const HomeDrawer = () => {
    return (
      <Drawer.Navigator screenOptions={{ headerStyle: { backgroundColor: '#0e7490' } }} backBehavior="goBack" drawerContent={(props) => <CustomDrawerContent {...props} /> } >
        <Drawer.Screen name="Home" component={Home} options={{ title: 'Görev Listesi', headerTintColor: '#FFFF', drawerActiveBackgroundColor: '#0891b2', drawerActiveTintColor: '#FFFF', headerTitleAlign: 'center', }} />
        <Drawer.Screen name="Settings" component={Settings} options={{ title: 'Ayarlar',  headerTintColor: '#FFFF', drawerActiveBackgroundColor: '#0891b2', drawerActiveTintColor: '#FFFF', headerTitleAlign: 'center',}} />
        <Drawer.Screen name="SignOut" component={ SignInScreen } options={{ headerShown: false }} />
      
      </Drawer.Navigator>
    );
  }

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