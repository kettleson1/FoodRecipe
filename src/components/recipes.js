import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function Recipe({ categories, foods }) {
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => (
    <ArticleCard item={item} index={index} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <View testID="recipesDisplay">
        <FlatList
          data={foods}
          keyExtractor={(item) => item.recipeId}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const ArticleCard = ({ item, index, navigation }) => {
  return (
    <View
      style={[styles.cardContainer, { paddingLeft: 20, paddingRight: 15 }]}
      testID="articleDisplay"
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
      >
        <Image
          source={{ uri: item.recipeImage }}
          style={[styles.articleImage, { height: hp(25) }]}
          resizeMode="cover"
        />
        <Text style={styles.articleText}>
          {item.recipeName.length > 25
            ? `${item.recipeName.slice(0, 25)}...`
            : item.recipeName}
        </Text>
        <Text style={styles.articleDescription}>
          {item.recipeInstructions.slice(0, 40)}...
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4),
    marginTop: hp(2),
  },
  title: {
    fontSize: hp(3),
    fontWeight: "600",
    color: "#52525B",
    marginBottom: hp(1.5),
  },
  loading: {
    marginTop: hp(20),
  },
  cardContainer: {
    justifyContent: "center",
    marginBottom: hp(1.5),
    flex: 1,
  },
  articleImage: {
    width: "100%",
    borderRadius: 35,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  articleText: {
    fontSize: hp(1.5),
    fontWeight: "600",
    color: "#52525B",
    marginLeft: wp(2),
    marginTop: hp(0.5),
  },
  articleDescription: {
    fontSize: hp(1.2),
    color: "#6B7280",
    marginLeft: wp(2),
    marginTop: hp(0.5),
  },
  row: {
    justifyContent: "space-between",
  },
});