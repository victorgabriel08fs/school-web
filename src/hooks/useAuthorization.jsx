import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth";
import { useNavigate } from "react-router-dom";

const useAuthorization = (allowedAccess) => {
    const [isAuthorized, setIsAuthorized] = useState(false);

    const navigate = useNavigate();


    const { user, signed } = useAuth();

    useEffect(() => {
        setIsAuthorized(allowedAccess.some(item => user.access_types.includes(item)));
    }, [isAuthorized]);


    return isAuthorized;
}

export default useAuthorization;