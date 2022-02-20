import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import AuthLayout from "../components/auth/AuthLayout";
import {
  LoggedOutNavParamList,
  LogInNavStackNavParamList,
  LoginScreenNavigationProp,
} from "../navTypes";
import { gql, useMutation } from "@apollo/client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRef, RefObject } from "react";
import { TextInput, View } from "react-native";
import { login, loginVariables } from "../__generated__/login";
import { logUserIn } from "../apollo";
import Notification from "../components/auth/Notification";
import { AuthPlaceholder, STextInput } from "../components/auth/AuthShared";
import FormError from "../components/auth/FormError";
import AuthBtn from "../components/auth/AuthBtn";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  username: string;
  password: string;
  result?: string;
}

const Login: React.FC<LoginScreenNavigationProp> = ({
  route: { params },
  navigation,
}) => {
  const { handleSubmit, formState, watch, control, setError, clearErrors } =
    useForm<ILoginForm>({
      mode: "onChange",
      defaultValues: {
        username: params?.username,
        password: params?.password,
      },
    });

  const passwordRef = useRef(null);
  const onNext = (nextRef: RefObject<TextInput>) => {
    nextRef?.current?.focus();
  };

  const [logInMutation, { loading }] = useMutation<login, loginVariables>(
    LOGIN_MUTATION
  );

  const onCompleted = async (data: login) => {
    const {
      login: { ok, error, token },
    } = data;
    if (error) {
      return setError("result", {
        message: error,
      });
    }
    if (ok && token) {
      await logUserIn(token);
      navigation.navigate("Home");
    }
  };

  const onValid: SubmitHandler<ILoginForm> = ({ username, password }) => {
    if (loading) {
      return;
    } else {
      logInMutation({
        variables: { username, password },
        onCompleted,
      });
    }
  };

  const clearLoginError = () => {
    if (formState.errors.result) {
      clearErrors("result");
    }
  };

  return (
    <AuthLayout>
      <Notification message={params?.message} />
      <View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onBlur, onChange, value } }) => (
            <View>
              <STextInput
                blurOnSubmit={false}
                change={Boolean(watch("username"))}
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                onBlur={onBlur}
                onChange={clearLoginError}
                onChangeText={onChange}
                value={value}
                onSubmitEditing={() => onNext(passwordRef)}
                hasError={Boolean(formState?.errors?.username?.message)}
              />
              <FormError message={formState?.errors?.username?.message} />
            </View>
          )}
          name="username"
        />
        <AuthPlaceholder change={Boolean(watch("username"))}>
          사용자 이름
        </AuthPlaceholder>
      </View>
      <View>
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: {
              value: 4,
              message: "비밀번호는 4글자 이상입니다.",
            },
          }}
          render={({ field: { onBlur, onChange, value } }) => (
            <View>
              <STextInput
                blurOnSubmit={false}
                ref={passwordRef}
                change={Boolean(watch("password"))}
                returnKeyType="done"
                secureTextEntry
                onBlur={onBlur}
                onChange={clearLoginError}
                onChangeText={onChange}
                value={value}
                lastOne={true}
                onSubmitEditing={handleSubmit(onValid)}
                hasError={Boolean(formState?.errors?.password?.message)}
              />
              <FormError message={formState?.errors?.password?.message} />
            </View>
          )}
          name="password"
        />
        <AuthPlaceholder change={Boolean(watch("password"))}>
          비밀번호
        </AuthPlaceholder>
      </View>
      <AuthBtn
        loading={loading}
        text="로그인"
        disabled={!formState.isValid || loading}
        onPress={handleSubmit(onValid)}
      />
      <FormError message={formState?.errors?.result?.message} />
    </AuthLayout>
  );
};

export default Login;
