import withApollo from "@/hoc/withApollo";
import withAuth from "@/hoc/withAuth";
import { useRouter } from "next/router";
import BaseLayout from "@/layouts/BaseLayout";
import { Card, Button } from "react-bootstrap";
import { useGetUserPortfolios, useDeletePortfolio } from "@/apollo/actions";
import { getDataFromTree } from "@apollo/react-ssr";
import Link from "next/link";

const InstructorDashboard = withAuth(() => {
  //call the data
  const { data } = useGetUserPortfolios();
  //extract user portfolios from data -- if data exists get me the portfolios otherwise null
  const userPortfolios = (data && data.userPortfolios) || [];

  //calling use delete protfolio
  const [deletePortfolio] = useDeletePortfolio();

  const router = useRouter();

  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-12">
            <h1 className="page-title">Instructor Portfolios</h1>

            {userPortfolios.map((p) => (
              <Card key={p._id} className="mb-2">
                <Card.Header>{p.title}</Card.Header>
                <Card.Body>
                  <Card.Title>{p.jobTitle}</Card.Title>
                  <Card.Text>
                    {p.startDate} - {p.endDate}
                  </Card.Text>
                  <Link
                    href="/portfolios/[id]/edit"
                    as={`/portfolios/${p._id}/edit`}
                  >
                    <a className="btn btn-primary mr-1">Edit</a>
                  </Link>
                  <Button
                    onClick={() => deletePortfolio({ variables: { id: p._id } })}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}, ["admin", "instructor"]);

//this page is accessable to admins and instructors
export default withApollo(InstructorDashboard, { getDataFromTree });
