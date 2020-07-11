import withApollo from "@/hoc/withApollo";
import withAuth from "@/hoc/withAuth";
import PortfolioCreateForm from "../../components/forms/PortfolioCreateForm";
import { useCreatePortfolio } from "@/apollo/actions";
import { useRouter } from "next/router";
import BaseLayout from "@/layouts/BaseLayout";

function PortfolioCreate() {
  const [createPortfolio, { error }] = useCreatePortfolio();
  const router = useRouter();

  //error is an object and it has graphql error where the errors are in an array
  const errorMessage = (err) => {
    return (
      (err.graphQLErrors && err.graphQLErrors[0].message) || "smth went wrong"
    );
  };

  const handleCreatePortfolio = async (data) => {
    await createPortfolio({ variables: data });
    router.push("/portfolios");
  };

  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Create a New Portfolio</h1>
            <PortfolioCreateForm onSubmit={handleCreatePortfolio} />
            {error && (
              <div className="alert alert-danger">{errorMessage(error)}</div>
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

//this page is accessable to admins and instructors
// export default withApollo(withAuth(PortfolioCreate, ["admin", "instructor"]));
export default withApollo(PortfolioCreate, ["admin", "instructor"]);

