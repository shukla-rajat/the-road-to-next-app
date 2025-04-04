
import { useState, useEffect} from "react";
import { getAuth } from "@/features/auth/queries/get-auth";
import { usePathname } from "next/navigation";
import { User as AuthUser } from "lucia";

const useAuth = () => {
    const [ user, setUser ] = useState<AuthUser | null>(null);
    const [isFetched, setIsFetched] = useState(false);

    const pathname = usePathname();
    
    useEffect(() => {
        const fetchUser = async () => {
            const { user } = await getAuth();
            setUser(user);
            setIsFetched(true);
        }

        fetchUser();
    }, [pathname]);

    return { user, isFetched };
}

export { useAuth };