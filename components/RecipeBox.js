import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";

const RecipeBox = ({ title, image, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <View>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
    

    

  );
};

const styles = StyleSheet.create({

  image: {
    width: 150, // Image covers full button width
    height: 120, // Fixed height
    resizeMode: "cover", // Ensures image covers the entire space without empty edges
    borderTopLeftRadius: 15, 
    borderTopRightRadius: 15, 
  },
  buttonText: {
    paddingVertical: 10,
    textAlign: "center",
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    width: 150, // Image covers full button width
    backgroundColor: "#FFB703",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    overflow: "hidden",
    marginVertical: 10,
    marginHorizontal:10,

  },
});


export default RecipeBox;
