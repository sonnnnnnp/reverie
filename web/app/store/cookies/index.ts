import Cookies from "js-cookie";

export const Cookie = {
  accessToken(): string | null {
    return Cookies.get("access-token") ?? null;
  },

  setAccessToken(token: string) {
    Cookies.set("access-token", token, {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });
  },

  refreshToken(): string | null {
    return Cookies.get("refresh-token") ?? null;
  },

  setRefreshToken(token: string) {
    Cookies.set("refresh-token", token, {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });
  },

  destroy(): void {
    for (const cookie in Cookies.get()) {
      Cookies.remove(cookie);
    }
  },
};
