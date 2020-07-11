import { useEffect } from "react";
import {useRouter} from "next/router";

const Redirect = (props) => {

  const {to, query} = props

  const router = useRouter()

  useEffect(() => {
    router.push({pathname: to, query})
  }, []);

  return null
}

export default Redirect;