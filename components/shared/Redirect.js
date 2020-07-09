import { useEffect } from "react";
import {useRouter} from "next/router";

const Redirect = (props) => {

  const router = useRouter()

  useEffect(() => {
    router.push({pathname: props.to})
  }, []);

  return null
}

export default Redirect;