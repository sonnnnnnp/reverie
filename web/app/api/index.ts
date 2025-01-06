import createClient, { type Middleware } from "openapi-fetch";

import { Cookie } from "~/store/cookies";
import type { paths } from "./client";

interface responseBody {
  ok: boolean;
  code: number;
  data: never;
}

const refreshAuthorization = async (
  refreshToken: string,
): Promise<{ ok: boolean; access_token?: string; refresh_token?: string }> => {
  const { data } = await client.POST("/authorize/refresh", {
    body: {
      refresh_token: refreshToken,
    },
  });

  if (data?.ok) {
    const { access_token, refresh_token } = data.data;
    return { ok: true, access_token, refresh_token };
  }

  return { ok: false, access_token: undefined, refresh_token: undefined };
};

const destroyAuthorization = () => {
  Cookie.destroy();

  window.location.href = "/login";
};

const UNPROTECTED_ROUTES = ["/authorize"];

const requestInterceptor: Middleware = {
  async onRequest({ request, schemaPath }) {
    if (
      UNPROTECTED_ROUTES.some((pathname) => schemaPath.startsWith(pathname))
    ) {
      return undefined;
    }

    request.headers.set("Authorization", `Bearer ${Cookie.accessToken()}`);
  },

  async onResponse({ request, response }) {
    const body: responseBody = await response.clone().json();

    if (body.code === -110002) {
      const refreshToken = Cookie.refreshToken();
      if (!refreshToken) {
        destroyAuthorization();
        return undefined;
      }

      const refreshResponse = await refreshAuthorization(refreshToken);
      if (!refreshResponse.ok) {
        destroyAuthorization();
        return undefined;
      }

      if (refreshResponse.access_token && refreshResponse.refresh_token) {
        Cookie.setAccessToken(refreshResponse.access_token);
        Cookie.setRefreshToken(refreshResponse.refresh_token);

        // retry original request

        request.headers.set(
          "Authorization",
          `Bearer ${refreshResponse.access_token}`,
        );

        return fetch(request);
      }
    }
  },
};

const client = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_HOST_URL,
});

client.use(requestInterceptor);

export default client;
