import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import SaveRecipeScreen from "./screens/SaveRecipeScreen";
import LoginScreen from "./screens/LoginScreen";
import CategoryScreen from "./screens/CategoryScreen";
import RecipeScreen from "./screens/RecipeScreen";
import RecipeDetailsScreen from "./screens/RecipeDetailsScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PrivateRoute from "./service/PrivateRoute";
import MyRecipesScreen from "./screens/MyRecipesScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="CategoryScreen" options={{ headerShown: false }}>
          {(props) => (
            <PrivateRoute {...props}>
              <CategoryScreen {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="MyRecipesScreen"
          options={{
            headerShown: false,
          }}
        >
          {(props) => (
            <PrivateRoute {...props}>
              <MyRecipesScreen {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="RecipeScreen"
          options={{
            headerShown: false,
          }}
        >
          {(props) => (
            <PrivateRoute {...props}>
              <RecipeScreen {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="RecipeDetailsScreen"
          options={{
            headerShown: false,
          }}
        >
          {(props) => <RecipeDetailsScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="SaveRecipeScreen"
          options={{
            headerShown: false,
          }}
        >
          {(props) => (
            <PrivateRoute {...props}>
              <SaveRecipeScreen {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
