import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Image,
} from "react-native";
import axios from "axios";
import AuthService from "../service/AuthService";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker"; // Expo ImagePicker modülü
import * as FileSystem from "expo-file-system"; // Expo FileSystem modülü

export default function SaveRecipeScreen({ navigation }) {
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null); // Resmi tutmak için state
  const [loading, setLoading] = useState(false);

  const categories = [
    { label: "Kahvaltı", value: "kahvalti" },
    { label: "Öğle Yemeği", value: "ogleyemegi" },
    { label: "Akşam Yemeği", value: "aksamyemegi" },
    { label: "Tatlı", value: "tatli" },
  ];

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSaveRecipe = async () => {
    if (!name || !instructions || !category || !image) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
      return;
    }

    setLoading(true);

    try {
      const user = await AuthService.getUser();
      // Resmi base64 formatına dönüştür
      const base64Image = await FileSystem.readAsStringAsync(image, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Extract image name and type
      const imageName = image.split("/").pop();
      const imageType = `image/${imageName.split(".").pop()}`;

      const params = {
        id: `${user.username}_${name}`,
        name: name,
        instructions: instructions,
        category: category,
        imagePath: {
          uri: `data:image/jpeg;base64,${base64Image}`,
          name: imageName,
          type: imageType,
        },
      };
      console.log("params:", params, "image:", params.imagePath.uri);

      const apiResponse = await axios.post(
        "https://9b7iaq2n07.execute-api.eu-north-1.amazonaws.com/prod/recipes",
        params,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("apiResponse:", apiResponse.data);

      if (apiResponse.status === 200) {
        Alert.alert("Başarılı", "Tarif başarıyla eklendi!");
        navigation.navigate("Home");
      } else {
        Alert.alert("Hata", "Tarif eklenirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
      Alert.alert("Hata", "Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yeni Tarif Ekle</Text>

      <TextInput
        style={styles.input}
        placeholder="Tarif Adı"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Talimatlar"
        value={instructions}
        onChangeText={setInstructions}
        multiline={true}
      />

      <Picker
        selectedValue={category}
        onValueChange={(value) => setCategory(value)}
        style={styles.picker}
      >
        <Picker.Item label="Kategori Seçin..." value="" />
        {categories.map((cat) => (
          <Picker.Item key={cat.value} label={cat.label} value={cat.value} />
        ))}
      </Picker>

      <Button title="Resim Seç" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}

      <View style={styles.saveButton}>
      <Button
        title={loading ? "Kaydediliyor..." : "Tarifi Kaydet"}
        onPress={handleSaveRecipe}
        disabled={loading}
      />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
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
  picker: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 12,
    alignSelf: "center",
    marginBottom: 60,
  },
  saveButton: {
    alignItems: "center",
    margin: 10,
  },
});
