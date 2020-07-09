import {
  GET_PORTFOLIOS,
  UPDATE_PORTFOLIO,
  DELETE_PORTFOLIO,
  CREATE_PORTFOLIO,
  SIGN_IN,
  GET_USER,
  SIGN_OUT
} from "../queries";
import { useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks";

export const useGetPortfolios = () => useQuery(GET_PORTFOLIOS);

export const useUpdatePortfolio = () => useMutation(UPDATE_PORTFOLIO);

//deleting Portfolio and updating on client side in real time
export const useDeletePortfolio = () =>
  useMutation(DELETE_PORTFOLIO, {
    update(cache, { data: { deletePortfolio } }) {
      const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
      const newPortfolios = portfolios.filter((p) => p._id !== deletePortfolio);
      cache.writeQuery({
        query: GET_PORTFOLIOS,
        data: { portfolios: newPortfolios },
      });
    },
  });

//creating portfolio with useMutation hook
export const useCreatePortfolio = () =>
  useMutation(CREATE_PORTFOLIO, {
    update(cache, { data: { createPortfolio } }) {
      const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
      cache.writeQuery({
        query: GET_PORTFOLIOS,
        data: { portfolios: [...portfolios, createPortfolio] },
      });
    },
  });

//Auth actions start ----------------------

export const useSignIn = () =>
  useMutation(SIGN_IN, {
    update(cache, { data: { signIn } }) {
      cache.writeQuery({
        query: GET_USER,
        data: { user: signIn },
      });
    },
  });

export const useSignOut = () => useMutation(SIGN_OUT);

export const useLazyGetUser = () => useLazyQuery(GET_USER);


//Auth actions end ----------------------
