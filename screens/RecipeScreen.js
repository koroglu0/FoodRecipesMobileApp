import { StyleSheet, View, Text ,ScrollView} from "react-native";
import RecipeBox from "../components/RecipeBox";

export default function RecipeScreen({ navigation, route }) {
  const { category } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Tarifler</Text>
      </View>

      <ScrollView >
        <View style={styles.buttonWrapper}>
          {category.recipes.length > 0 ? (
            category.recipes.map((recipe) => (
              <RecipeBox
                key={recipe.id}
                title={recipe.name}
                image={recipe.imageUrl}
                onPress={() =>
                  navigation.navigate("RecipeDetailsScreen", { recipe: recipe })
                }
                styles={styles.recipeBox}
              />
            ))
          ) : (
            <Text>No recipes available</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3E0",
    justifyContent: "center",
  },
  buttonWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    
  },
  recipeBox: {
    marginVertical: 10,
    marginHorizontal:10,
  },
  topBar: {
    backgroundColor: "#FFB703",
    padding: 20,
    alignItems: "center",
  },
  topBarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
