import { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import RecipeBox from "../components/RecipeBox";

export default function CategoryScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const category = [
    { label: "Kahvaltı", value: "kahvalti" },
    { label: "Öğle Yemeği", value: "ogleyemegi" },
    { label: "Akşam Yemeği", value: "aksamyemegi" },
    { label: "Tatlı", value: "tatli" },
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://9b7iaq2n07.execute-api.eu-north-1.amazonaws.com/prod/category?categoryId=all"
      );
      const data = await response.json();

      if (Array.isArray(data)) {
        setCategories(data);
      } else if (data && data.categories) {
        setCategories(data.categories);
      } else {
        Alert.alert("Error", "Categories not found in response");
        console.error("Categories not found in response:", data);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch categories");
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Kategoriler</Text>
      </View>

      <View style={styles.buttonWrapper}>
        {
          categories.map((category) => (
            <RecipeBox
              key={category.id}
              title={category.name}
              image={category.imageUrl}
              onPress={() =>
                navigation.navigate("RecipeScreen", { category: category })
              }
              style={styles.recipeBox}
            />
          ))
       }
      </View>
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("SaveRecipeScreen")}
        >
          <Text style={styles.navButtonText}>Tarif Ekle</Text>
        </TouchableOpacity>
      </View>
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
    padding: 5,
    marginHorizontal: 10,
  },
  recipeBox: {
    marginVertical: 6,
    marginHorizontal: 6,
  },
  topBar: {
    backgroundColor: "#FFB703",
    padding: 20,
    alignItems: "center",
    width: "100%",
    position: "absolute",
    top: 0,
  },
  topBarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  bottomNav: {
    backgroundColor: "#FFB703",
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
    elevation: 4,
  },
  navButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
});
