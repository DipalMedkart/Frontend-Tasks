import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";

const auth = (Component) => {
    return(props) => {
        const router = useRouter();
        const token = useSelector((state) => state.auth.token)

        useEffect(() => {
            if (!token) {
                router.push("/login"); 
            }
        }, [token, router]);

        if (!token) {
            return null;
        }

        return <Component {...props} />;
    }
}

export default auth;