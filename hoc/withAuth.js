import { useGetUser } from "@/apollo/actions";
import Redirect from "@/components/shared/Redirect";
import Loader from "@/components/shared/Loader";

export default (WrappedComponent, role, options = { ssr: false }) => {
  function withAuth(props) {
    //get the user
    const { data: { user } = {}, loading, error } = useGetUser({
      fetchPolicy: "network-only",
    });

    if (!loading && (!user || error) && typeof window !== "undefined") {
      return <Redirect to="/login" query={{ message: "NOT_AUTHENTICATED" }} />;
    }

    //Check for user role as well -- i.e admin etc
    if (user) {
      if (role && !role.includes(user.role)) {
        return <Redirect to="/login" query={{ message: "NOT_AUTHORISED" }} />;
      }
      return <WrappedComponent {...props} />;
    }

    return (
      <div className="spinner-container">
        <p>loading...</p>
      </div>
    );
  }

  //called both on the client and server
  if (options.ssr) {
    withAuth.getInitialProps = async (context) => {
      const { req, res } = context;

      if (req) {
        const { user } = req;

        if (!user) {
          res.redirect("/login?message=NOT_AUTHENTICATED");
          res.end();
          return {};
        }
        if (role && !role.includes(user.role)) {
          res.redirect("/login?message=NOT_AUTHORISED");
          res.end();
          return {};
        }
      }
      const pageProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(context));
      return { ...pageProps };
    };
  }

  return withAuth;
};
