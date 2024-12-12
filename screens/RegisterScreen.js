import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

const registerUrl =
  "https://9b7iaq2n07.execute-api.eu-north-1.amazonaws.com/prod/register";

const Register = ({navigation}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const submitHandler = async () => {

    if (
      username.trim() === "" ||
      email.trim() === "" ||
      name.trim() === "" ||
      password.trim() === ""
    ) {
      console.log("Validation failed: All fields are required");
      setMessage("All fields are required!!");
      return;
    }

    const requestBody = {
      username: username,
      email: email,
      name: name,
      password: password,
    };

    console.log("Request body prepared:", requestBody);

    try {
      const response = await axios.post(registerUrl, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response received:", response);
      setMessage("Registration Successful");
      navigation.navigate("LoginScreen"); // Kayıt başarılı olduktan sonra Login ekranına yönlendirme
    } catch (error) {
      console.error("Error occurred during registration:", error);

      if (error.response) {
        console.log("Error response status:", error.response.status);
        console.log("Error response data:", error.response.data);

        if (error.response.status === 403) {
          setMessage(
            "Access forbidden: You do not have permission to access this resource."
          );
        } else if (error.response.status === 401) {
          setMessage("username already exist in out database. please choose a different username");
        } else {
          setMessage(
            "Sorry... the backend server is down!! Please try again later!!"
          );
        }
      } else {
        setMessage(
          "Sorry... the backend server is down!! Please try again later!!"
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <Button title="Register" onPress={submitHandler} />

      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#FAF3E0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
  message: {
    marginTop: 12,
    color: "red",
    textAlign: "center",
  },
});

export default Register;
