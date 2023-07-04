import { useRouter, useSegments } from "expo-router";
import React from "react";

function useProtectedRoute(isLoggedIn: boolean) {
    const segments = useSegments();
    const router = useRouter();

    React.useEffect(() => {
        const inAuthGroup = segments[0] === "(auth)";
        if (!isLoggedIn && !inAuthGroup) {
            router.replace("/login");
        } else if (isLoggedIn && inAuthGroup) {
            router.replace("(tabs)/notes");
        }
    }, [isLoggedIn, segments]);
}

export default useProtectedRoute;
