import { Form } from "../../styles";
import { ClickButton, FormInput, LinkedButton, ErrorButton } from "..";
import { handleGithubLogin } from "../../utils";
import { useLogin } from "../../hooks";

export function LoginForm() {
    const { emailRef, passwordRef, handleLogin } = useLogin();
    return (
        <Form onSubmit={handleLogin}>
            <FormInput
                inputType={"email"}
                inputName={"email"}
                reference={emailRef}
                labelChildren={"Email"}
            />
            <FormInput
                inputType={"password"}
                inputName={"password"}
                reference={passwordRef}
                labelChildren={"Password"}
            />
            <ClickButton buttonChildren="Log In" type="submit" />
            <ClickButton
                buttonChildren="Login with Github"
                onClick={handleGithubLogin}
            />
            <LinkedButton navigateTo="/register" buttonChildren="Sign Up" />
            <ErrorButton buttonChildren="Forgot Password?" onClick={() => {}} />
        </Form>
    );
}
