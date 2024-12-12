import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import RecipeBox from "../components/RecipeBox";
import AuthService from "../service/AuthService";

const MyRecipesScreen = ({ route, navigation }) => {
  const { recipes } = route.params;

  const user = AuthService.getUser();
  console.log("MyRecipesScreen ekranındaki kullanıcı:", user.username);
  // Kullanıcının tariflerini filtrele
  const userRecipes = recipes.filter(recipe => {
    const recipeUserId = recipe.id.split('_')[0]; // '_' karakterinden önceki kısmı al
    console.log("recipeUserId:", recipeUserId);
    if (recipeUserId === user.username){
      return userRecipes
    }
  });

  console.log("MyRecipesScreen ekranımdaki kullanıcının tarifleri:", userRecipes);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Recipes</Text>
      <FlatList
        data={userRecipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RecipeBox
            key={item.id}
            title={item.name}
            image={item.imageUrl}
            onPress={() =>
              navigation.navigate("RecipeDetailsScreen", { recipe: item })
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default MyRecipesScreen;