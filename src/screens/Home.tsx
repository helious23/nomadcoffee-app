import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.fontColor};
`;

const Home = () => {
  return (
    <Container>
      <Title>Home</Title>
    </Container>
  );
};

export default Home;
