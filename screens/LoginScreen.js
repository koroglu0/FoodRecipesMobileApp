import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import AuthService from "../service/AuthService";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
      return;
    }
    const username = email;
    try {
      const response = await axios.post(
        "https://9b7iaq2n07.execute-api.eu-north-1.amazonaws.com/prod/login",
        {
          username,
          password,
        }
      );
      if (response.status === 200) {
        if (response.data.token) {
          Alert.alert("Giriş Başarılı", "Başarıyla giriş yaptınız!");
          await AuthService.setUserSession(
            response.data.user,
            response.data.token
          );
          navigation.navigate("Home");
        }
      } else {
        handleErrorResponse(response);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleErrorResponse = (response) => {
    const data = response.data;
    let errorMessage = "Giriş başarısız.";

    if (data && data.message) {
      errorMessage = data.message;
    } else if (response.status === 401) {
      errorMessage = "Yetkisiz. Lütfen kimlik bilgilerinizi kontrol edin.";
    } else if (response.status === 500) {
      errorMessage = "Sunucu hatası. Lütfen daha sonra tekrar deneyin.";
    }

    Alert.alert("Hata", errorMessage);
  };

  const handleError = (error) => {
    if (error.response) {
      Alert.alert(
        "Hata",
        error.response.data.message || "Bir hata oluştu. Lütfen tekrar deneyin."
      );
    } else {
      console.error("Network Error:", error);
      Alert.alert(
        "Hata",
        "Bir ağ hatası oluştu. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin."
      );
    }
  };

  return (
    <View style={styles.container}>
     

      <Text style={styles.title}>Giriş Yap</Text>

      <TextInput
        style={styles.input}
        placeholder="Kullanıcı Adı"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#FAF3E0",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
 
});
