// lib/withApollo.js
import withApollo from "next-with-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { calcDays } from "../helpers/functions";

export default withApollo(
  ({ initialState, headers }) => {
    return new ApolloClient({
      request: (operation) => {
        operation.setContext({
          fetchOptions: {
            credentials: "include",
          },
          headers,
        });
      },
      uri: "http://localhost:3000/graphql",
      cache: new InMemoryCache().restore(initialState || {}),
      resolvers: {
        Portfolio: {
          daysOfExperience(data, args, { cache }) {
            const { startDate, endDate } = data;
            return calcDays(startDate, endDate);
          },
        },
      },
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);
