import { useState, useEffect } from "react";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
//for client-side routing
import Link from "next/link";

//
import withApollo from "@/hoc/withApollo";
import { useLazyGetUser } from "@/apollo/actions";

const AppLink = (props) => {
  return (
    <Link href={props.href}>
      <a className={props.className}>{props.children}</a>
    </Link>
  );
};

function AppNavbar() {
  const [user, setUser] = useState(null);
  //if we have a response from the user
  const [hasResponse, setHasResponse] = useState(false);

  const [getUser, { data, error }] = useLazyGetUser();

  useEffect(() => {
    getUser();
  }, []);

  if (data) {
    if (data.user && !user) {
      setUser(data.user);
    }
    if (!data.user && user) {
      setUser(null);
    }
    if (!hasResponse) {
      setHasResponse(true);
    }
  }

  return (
    <div className="navbar-wrapper">
      <Navbar expand="lg" className="navbar-dark fj-mw9">
        <AppLink className="mr-3 font-weight-bold navbar-brand" href="/">
          AybarsAcar
        </AppLink>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <AppLink href="/portfolios" className="nav-link mr-3">
              Portfolios
            </AppLink>
            <AppLink href="/forum/categories" className="nav-link mr-3">
              Forum
            </AppLink>
            <AppLink href="/cv" className="nav-link mr-3">
              CV
            </AppLink>
          </Nav>
          {hasResponse && (
            <Nav>
              {user && (
                <>
                  <span className="nav-link mr-4">Welcome {user.username}</span>
                  <AppLink href="/logout" className="btn btn-danger nav-link">
                    Sign out
                  </AppLink>
                </>
              )}
              {(error || !user) && (
                <>
                  <AppLink href="/login" className="nav-link mr-3">
                    Sign in
                  </AppLink>
                  <AppLink
                    href="/register"
                    className="mr-3 btn btn-success bg-green-2 bright"
                  >
                    Sign up
                  </AppLink>
                </>
              )}
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default withApollo(AppNavbar);
