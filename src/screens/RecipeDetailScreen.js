import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favoritesSlice";

export default function RecipeDetailScreen(props) {
  const recipe = props.route.params.recipe; // FIXED: Destructure properly

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const favoriterecipes = useSelector((state) => state.favorites.favoriterecipes);
  const isFavourite = favoriterecipes?.some((favrecipe) => favrecipe.idFood === recipe.idFood);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(recipe));
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Image */}
      <View style={styles.imageContainer} testID="imageContainer">
        <Image source={{ uri: recipe.recipeImage }} style={styles.recipeImage} />
      </View>

      {/* Buttons */}
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
          <Text style={styles.favoriteButtonText}>{isFavourite ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        {/* Title + Category */}
        <View style={styles.recipeDetailsContainer} testID="recipeDetailsContainer">
          <Text style={styles.recipeTitle} testID="recipeTitle">{recipe.recipeName}</Text>
          <Text style={styles.recipeCategory} testID="recipeCategory">{recipe.recipeCategory}</Text>
        </View>

        {/* Misc Info */}
        <View style={styles.miscContainer} testID="miscContainer">
          <View style={styles.miscItem}><Text style={styles.miscIcon}>⏱</Text><Text style={styles.miscText}>30 min</Text></View>
          <View style={styles.miscItem}><Text style={styles.miscIcon}>🍽</Text><Text style={styles.miscText}>2 servings</Text></View>
          <View style={styles.miscItem}><Text style={styles.miscIcon}>🔥</Text><Text style={styles.miscText}>400 kcal</Text></View>
          <View style={styles.miscItem}><Text style={styles.miscIcon}>💪</Text><Text style={styles.miscText}>Easy</Text></View>
        </View>

        {/* Ingredients */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View style={styles.ingredientsList} testID="ingredientsList">
            {recipe.ingredients?.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={styles.ingredientBullet} />
                <Text style={styles.ingredientText}>
                  {item.ingredientName} - {item.measure}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.sectionContainer} testID="sectionContainer">
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.instructionsText}>{recipe.recipeInstructions}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  recipeImage: {
    width: wp(98),
    height: hp(45),
    borderRadius: 20,
    marginTop: 4,
  },
  topButtonsContainer: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: hp(4),
  },
  backButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginLeft: wp(5),
  },
  backButtonText: {
    fontSize: hp(2),
    color: "#333",
    fontWeight: "bold",
  },
  favoriteButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    marginRight: wp(5),
  },
  favoriteButtonText: {
    fontSize: hp(2),
    color: "red",
  },
  contentContainer: {
    paddingHorizontal: wp(4),
    paddingTop: hp(4),
  },
  recipeDetailsContainer: {
    marginBottom: hp(2),
  },
  recipeTitle: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#4B5563",
  },
  recipeCategory: {
    fontSize: hp(2),
    fontWeight: "500",
    color: "#9CA3AF",
  },
  miscContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    paddingHorizontal: wp(4),
  },
  miscItem: {
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 3,
  },
  miscIcon: {
    fontSize: hp(3.5),
    marginBottom: 5,
  },
  miscText: {
    fontSize: hp(2),
    fontWeight: "600",
  },
  sectionContainer: {
    marginHorizontal: wp(5),
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: hp(2.8),
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  ingredientsList: {
    marginLeft: wp(4),
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(1),
    padding: 10,
    backgroundColor: "#FFF9E1",
    borderRadius: 8,
    elevation: 2,
  },
  ingredientBullet: {
    backgroundColor: "#FFD700",
    borderRadius: 50,
    height: hp(1.5),
    width: hp(1.5),
    marginRight: wp(2),
  },
  ingredientText: {
    fontSize: hp(1.9),
    color: "#333",
  },
  instructionsText: {
    fontSize: hp(2),
    color: "#444",
    lineHeight: hp(3),
    textAlign: "justify",
  },
});
