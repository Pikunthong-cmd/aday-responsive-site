import axios, { AxiosInstance } from "axios";

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(
    new RegExp("(^| )" + name + "=([^;]+)")
  );
  return match ? decodeURIComponent(match[2]) : null;
};


const createAdayApiClient = (
  baseURL?: string,
  timeout = 10000
): AxiosInstance => {
  const client = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    timeout,
  });

  /* Request interceptor */
  client.interceptors.request.use(
    (config) => {
      const accessToken = getCookie("accessToken");

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  /* Response interceptor */
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error?.response?.status;
      const url = error?.config?.url;

      console.error("[aday API error]", {
        status,
        url,
        data: error?.response?.data,
      });

      if (status === 401) {
        console.warn("Unauthorized — redirect to login if needed");
        // router.push("/login") ← ใส่เพิ่มได้
      }

      return Promise.reject(error);
    }
  );

  return client;
};

/* ----------------------------- */
/* aday API clients */
/* ----------------------------- */

// aday main API
export const adayApiClient = createAdayApiClient(
  process.env.NEXT_PUBLIC_ADAY_API_URL,
  10000
);

export const adayApiClientV1 = createAdayApiClient(
  process.env.NEXT_PUBLIC_ADAY_API_URL_V1,
  10000
);

export const adayApiClientV2 = createAdayApiClient(
  process.env.NEXT_PUBLIC_ADAY_API_URL_V2,
  10000
);

// aday jsreport
export const adayJsReportClient = createAdayApiClient(
  process.env.NEXT_PUBLIC_ADAY_JSREPORT_URL,
  100000
);

// aday auth
export const adayAuthClient = createAdayApiClient(
  process.env.NEXT_PUBLIC_ADAY_AUTH_API_URL,
  10000
);
