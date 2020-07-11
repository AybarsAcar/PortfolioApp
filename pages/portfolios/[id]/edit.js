import BaseLayout from "@/layouts/BaseLayout";
import PortfolioCreateForm from "@/components/forms/PortfolioCreateForm";
import withApollo from "@/hoc/withApollo";
import withAuth from "@/hoc/withAuth";
import { useRouter } from "next/router";
import { useGetPortfolio, useUpdatePortfolio } from "@/apollo/actions";
import { toast } from "react-toastify";

const PortfolioEdit = () => {
  const router = useRouter();

  const [updatePortfolio, { error }] = useUpdatePortfolio();

  const { id } = router.query;

  //fetching the portfolio and its variables
  const { data } = useGetPortfolio({
    variables: { id },
  });

  //error is an object and it has graphql error where the errors are in an array
  const errorMessage = (error) => {
    return (
      (error.graphQLErrors && error.graphQLErrors[0].message) ||
      "smth went wrong"
    );
  };

  const handlePortfolioUpdate = async (data) => {
    await updatePortfolio({ variables: { id, ...data } });
    toast.success("Portfolio has been updated!", { autoClose: 2000 });
  };

  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Edit Portfolio</h1>
            {data && (
              <PortfolioCreateForm
                initialData={data.portfolio}
                onSubmit={handlePortfolioUpdate}
              />
            )}
            {error && (
              <div className="alert alert-danger">{errorMessage(error)}</div>
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(withAuth(PortfolioEdit, ["admin", "instructor"]));
