import { AuthProvider, useAuth } from "../contexts/auth";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

const Routes = () => {
    const { signed } = useAuth();
    if (signed)
        return <PrivateRoutes />
    else
        return <PublicRoutes />
}

export default Routes;