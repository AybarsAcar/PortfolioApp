import PortfolioCard from "@/components/portfolios/PortfolioCard";
import Link from "next/link";
import {
  useGetPortfolios,
  useUpdatePortfolio,
  useDeletePortfolio,
  useCreatePortfolio,
} from "@/apollo/actions";
import withApollo from "../../hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";

function Portfolios() {
  const { data } = useGetPortfolios();
  const [updatePortfolio] = useUpdatePortfolio();

  //deleting Portfolio and updating on client side in real time
  const [deletePortfolio] = useDeletePortfolio();

  //creating portfolio with useMutation hook
  const [createPortfolio] = useCreatePortfolio();

  const portfolios = (data && data.portfolios) || [];

  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>
        <button onClick={createPortfolio} className="btn btn-primary">
          Create Portfolio
        </button>
      </section>
      <section className="pb-5">
        <div className="row">
          {portfolios.map((portfolio) => (
            <div key={portfolio._id} className="col-md-4">
              <Link href="/portfolios/[id]" as={`/portfolios/${portfolio._id}`}>
                <a className="card-link">
                  <PortfolioCard portfolio={portfolio} />
                </a>
              </Link>
              <button
                className="btn btn-secondary"
                onClick={() =>
                  updatePortfolio({ variables: { id: portfolio._id } })
                }
              >
                Update Portfolio
              </button>
              <button
                className="btn btn-danger"
                onClick={() =>
                  deletePortfolio({ variables: { id: portfolio._id } })
                }
              >
                Delete Portfolio
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default withApollo(Portfolios, { getDataFromTree });
