import React from "react";
import client from "~/api";
import type { components } from "~/api/client";

const AuthContext = React.createContext<components["schemas"]["User"] | null>(
  null,
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<components["schemas"]["User"] | null>(
    null,
  );

  const authenticate = React.useCallback(async () => {
    const { data } = await client.GET("/users/me");
    if (!data?.ok) {
      window.location.href = "/";
      return;
    }

    setUser(data.data);

    console.log(`welcome ${data.data.nickname}!`);
  }, []);

  React.useEffect(() => {
    authenticate();
  }, [authenticate]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
