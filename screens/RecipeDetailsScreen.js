import { StyleSheet, View, Text, Image } from "react-native";

export default function RecipeDetailsScreen({ route }) {
  const { recipe } = route.params; // Get the passed recipe ID

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{recipe.name}</Text>
      <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
      <Text style={styles.instructions}>{recipe.instructions}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3E0",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color:"#333333",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  instructions: {
    fontSize: 16,
    textAlign: "center",
    color:"#333333",
  },
});
