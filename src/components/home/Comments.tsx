import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import Avatar from "../Avatar";
import DefaultAvatar from "../DefaultAvatar";
import { seeCoffeeShop_seeCoffeeShop_comments } from "../../__generated__/seeCoffeeShop";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { CoffeShopScreenNavigationProp } from "../../navTypes";

const Container = styled.View`
  background-color: ${(props) => props.theme.mainBgColor};
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const AvatarContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const Username = styled.Text`
  color: ${(props) => props.theme.fontColor};
`;

const Rating = styled.View``;

const RatingContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const RatingText = styled.Text`
  color: ${(props) => props.theme.accent};
  margin-top: 6px;
`;

const CommentText = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 14px;
`;

interface ICommentProps {
  comment: seeCoffeeShop_seeCoffeeShop_comments;
}

const Comment: React.FC<ICommentProps> = ({ comment }) => {
  const navigation = useNavigation<CoffeShopScreenNavigationProp>();
  const theme = useTheme();

  const showRating = (value: number) => {
    switch (value) {
      case 5: {
        return (
          <RatingContainer>
            <FontAwesome5 name="laugh-wink" size={32} color={theme.accent} />
            <RatingText>맛있어요!</RatingText>
          </RatingContainer>
        );
      }
      case 4: {
        return (
          <RatingContainer>
            <FontAwesome5 name="smile" size={32} color={theme.accent} />
            <RatingText>맛있어요!</RatingText>
          </RatingContainer>
        );
      }
      case 3: {
        return (
          <RatingContainer>
            <FontAwesome5 name="meh" size={32} color={theme.accent} />
            <RatingText>맛있어요!</RatingText>
          </RatingContainer>
        );
      }
    }
  };

  const goToProfile = () => {
    navigation.navigate("Profile", {
      username: comment.user.username,
      id: comment.user.id,
    });
  };

  return (
    <Container>
      <Header>
        <AvatarContainer onPress={goToProfile}>
          {comment.user.avatarURL ? (
            <Avatar avatar={comment.user.avatarURL} size={40} />
          ) : (
            <DefaultAvatar size={40} />
          )}
          <Username>{comment.user.username}</Username>
        </AvatarContainer>
        <Rating>{showRating(comment.rating)}</Rating>
      </Header>
      <CommentText>{comment.payload}</CommentText>
    </Container>
  );
};

export default Comment;
