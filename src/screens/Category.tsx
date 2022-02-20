import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import { ShareStackNavParamList } from "../navTypes";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.fontColor};
`;

const Category: React.FC<
  NativeStackScreenProps<ShareStackNavParamList, "Category">
> = ({ route: { params } }) => {
  console.log(params);
  return (
    <Container>
      <Title>Category</Title>
    </Container>
  );
};

export default Category;
