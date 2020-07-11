import LoginForm from "../components/forms/LoginForm";
import withApollo from "@/hoc/withApollo";
import { useSignIn } from "@/apollo/actions";
import Redirect from "../components/shared/Redirect";
import BaseLayout from "@/layouts/BaseLayout";

function Login() {
  const [signIn, { data, loading, error }] = useSignIn();

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
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export default withApollo(Login);
