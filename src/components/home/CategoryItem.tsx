import styled from "styled-components/native";
import { seeCoffeeShop_seeCoffeeShop_categories } from "../../__generated__/seeCoffeeShop";
import { useNavigation } from "@react-navigation/native";
import { CoffeShopScreenNavigationProp } from "../../navTypes";

const CategoryContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
`;

const CategoryWrapper = styled.TouchableOpacity``;

const Category = styled.Text`
  padding: 4px 8px;
  border: 1px solid ${(props) => props.theme.accent};
  border-radius: 5px;
  color: ${(props) => props.theme.accent};
  margin-right: 8px;
`;

interface ICategoryItemProps {
  categories: seeCoffeeShop_seeCoffeeShop_categories[];
}

const CagtegoryItem: React.FC<ICategoryItemProps> = ({ categories }) => {
  const navigation = useNavigation<CoffeShopScreenNavigationProp>();
  const goToCategory = (categorySlug: string) => {
    navigation.navigate("Category", { categorySlug });
  };
  return (
    <CategoryContainer>
      {categories.map((category) => (
        <CategoryWrapper
          key={category.slug}
          onPress={() => goToCategory(category.slug)}
        >
          <Category># {category.name}</Category>
        </CategoryWrapper>
      ))}
    </CategoryContainer>
  );
};

export default CagtegoryItem;
