import LoginForm from "../components/forms/LoginForm";
import withApollo from "@/hoc/withApollo";
import { useSignIn } from "@/apollo/actions";
import { useRouter } from "next/router";
import Redirect from "../components/shared/Redirect";
import BaseLayout from "@/layouts/BaseLayout";
import messages from "@/variables/messages";
import { useEffect, useRef } from "react";

function Login() {
  //this ref will be the same even tho you are rerendering
  const disposeId = useRef(null);

  const [signIn, { data, loading, error }] = useSignIn();

  const router = useRouter();
  const { message } = router.query;

  const disposeMessage = () => {
    router.replace("/login", "/login", { shallow: true });
  };

  useEffect(() => {
    if (message) {
      disposeId.current = setTimeout(() => {
        disposeMessage();
      }, 3000);
    }

    //clearTimeout if we go some other page so we dont unnecessarily call it
    return () => {
      clearTimeout(disposeId.current);
    };
  }, [message]);

  //error is an object and it has graphql error where the errors are in an array
  const errorMessage = (err) => {
    return (
      (err.graphQLErrors && err.graphQLErrors[0].message) || "smth went wrong"
    );
  };

  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Login</h1>

            <LoginForm
              loading={loading}
              onSubmit={(signInData) => signIn({ variables: signInData })}
            />
            {data && data.signIn && <Redirect to="/" />}
            {error && (
              <div className="alert alert-danger">{errorMessage(error)}</div>
            )}
            {message && (
              <div className={`alert alert-${messages[message].status}`}>
                {messages[message].text}
              </div>
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export default withApollo(Login);
