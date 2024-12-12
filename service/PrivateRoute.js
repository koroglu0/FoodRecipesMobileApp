import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import AuthService from "./AuthService"; // AuthService import et

const PrivateRoute = ({ children, navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      const user = await AuthService.getUser();
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    };

    checkUserSession();
  }, []);

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigation.navigate("LoginScreen");
    }
  }, [loading, isLoggedIn, navigation]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!isLoggedIn) {
    return null; // Kullanıcı giriş yapmamışsa, hiçbir şey render etme
  }

  return children;
};

export default PrivateRoute;
