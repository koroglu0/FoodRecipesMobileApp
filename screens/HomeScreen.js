import {
  Button,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import RecipeBox from "../components/RecipeBox";
import AuthService from "../service/AuthService";

export default function Home({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [randomRecipe, setRandomRecipe] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
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
    }, [])
  );

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          "https://9b7iaq2n07.execute-api.eu-north-1.amazonaws.com/prod/recipes?recipesId=all"
        );
        const data = await response.json();
        if (data && Array.isArray(data)) {
          setRecipes(data);
        } else {
          throw new Error("API'den beklenen formatta veri gelmedi.");
        }
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError(err.message || "Bir hata oluştu");
      }
    };

    if (recipes && recipes.length > 0) {
      // Create an interval to change the recipe every 5 seconds (5000 ms)
      const intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * recipes.length);
        setRandomRecipe(recipes[randomIndex]);
      }, 5000); // 5 seconds interval

      // Clear the interval when the component unmounts or recipes change
      return () => clearInterval(intervalId);
    }
    fetchRecipes();
  }, [recipes]);

  const handleLogout = async () => {
    await AuthService.resetUserSession();
    setIsLoggedIn(false);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Üst Bar */}
      <View style={styles.topBar}>
        <Text style={styles.Home}>Anasayfa</Text>
      </View>

      {/* Ana İçerik */}
      <ScrollView>
        {/* Büyük Görsel ve Tarif Başlığı */}
        <View style={styles.recipeContainer}>
          <View>
            {randomRecipe ? (
              <TouchableOpacity
                style={styles.bigRecipe}
                onPress={() =>
                  navigation.navigate("RecipeDetailsScreen", {
                    recipe: randomRecipe,
                  })
                }
              >
                <View>
                  <Image
                    style={styles.bigRecipeImage}
                    source={{ uri: randomRecipe.imageUrl }}
                  />
                  <Text style={styles.bigRecipeTitle}>{randomRecipe.name}</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <Text>No recipes available</Text>
            )}
          </View>

          <Text style={styles.subTitle}>Senin için önerilen tariflerimiz:</Text>

          {/* Küçük Tarif Kartları */}
          <ScrollView horizontal>
            {recipes.slice(0, 4).map((recipe) => (
              <RecipeBox
                key={recipe.id}
                title={recipe.name}
                image={recipe.imageUrl}
                onPress={() =>
                  navigation.navigate("RecipeDetailsScreen", { recipe: recipe })
                }
                style={styles.recipeBox} // Stilini buradan gönderebilirsin
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Alt Gezinme Çubuğu */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate("CategoryScreen")}>
          <Text>Kategoriler</Text>
        </TouchableOpacity>
        {isLoggedIn ? (
          <TouchableOpacity onPress={handleLogout}>
            <Text>Çıkış Yap</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text>Giriş Yap</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              <Text>Kayıt Ol</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bigRecipe: {
    height: 200,
    backgroundColor: "#FFB703",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  bigRecipeImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  bigRecipeTitle: {
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    color: "#333",
  },
  recipeBox: {
    marginVertical: 30,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#FAF3E0",
  },
  topBar: {
    backgroundColor: "#FFB703",
    padding: 20,
    alignItems: "center",
  },
  Home: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  recipeContainer: {
    marginVertical: 80,
    padding: 5,
  },

  subTitle: {
    fontSize: 16,
    color: "#333",
    marginVertical: 10,
    textAlign: "center",
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#FFB703",
  },
});
