// apiRequests/ai-agent.ts

import envConfig from "@/app/config";
import { normalizePath } from "@/lib/utils";
import { SignInResType } from "@/schemas/auth.schema";

type CustomOptions = Omit<RequestInit, "method"> & {
  baseUrl?: string | undefined;
};

const ENTITY_ERROR_STATUS = 422;
const AUTHENTICATION_ERROR_STATUS = 401;

type EntityErrorPayload = {
  detail: string;
  error_message: string;
  errors: {
    field: string;
    detail: string;
    message: string;
    error_message: string;
  }[];
};

export class HttpError extends Error {
  status: number;
  payload: {
    detail: string;
    error_message: string;
    errors?: {
      field: string;
      detail: string;
      message: string;
      error_message: string;
    }[];
    [key: string]:
      | string
      | string[]
      | {
          field: string;
          detail: string;
          message: string;
          error_message: string;
        }[]
      | undefined;
  };
  constructor({
    status,
    payload,
  }: {
    status: number;
    payload: {
      detail: string;
      error_message: string;
      [key: string]:
        | string
        | string[]
        | {
            field: string;
            detail: string;
            message: string;
            error_message: string;
          }[]
        | undefined;
    };
  }) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status: 422;
  payload: EntityErrorPayload;
  constructor({
    status,
    payload,
  }: {
    status: 422;
    payload: EntityErrorPayload;
  }) {
    super({ status, payload });
    this.status = status;
    this.payload = payload;
  }
}

class SessionToken {
  private token = "";
  private _expiresAt = new Date().toISOString();
  get value() {
    return this.token;
  }
  set value(token: string) {
    // Nếu gọi method này ở server thì sẽ bị lỗi
    if (typeof window === "undefined") {
      throw new Error("Cannot set token on server side");
    }
    this.token = token;
  }
  get expiresAt() {
    return this._expiresAt;
  }
  set expiresAt(expiresAt: string) {
    // Nếu gọi method này ở server thì sẽ bị lỗi
    if (typeof window === "undefined") {
      throw new Error("Cannot set token on server side");
    }
    this._expiresAt = expiresAt;
  }
}

export const clientSessionToken = new SessionToken();
let clientSignOutRequest: null | Promise<Response> = null;

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  options?: CustomOptions | undefined
) => {
  const body = options?.body
    ? options.body instanceof FormData
      ? options.body
      : JSON.stringify(options.body)
    : undefined;
  const baseHeaders =
    body instanceof FormData
      ? {
          Authorization: clientSessionToken.value
            ? `Bearer ${clientSessionToken.value}`
            : "",
        }
      : {
          "Content-Type": "application/json",
          Authorization: clientSessionToken.value
            ? `Bearer ${clientSessionToken.value}`
            : "",
        };
  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;

  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    } as HeadersInit,
    body,
    method,
    credentials: "include", // Thêm dòng này để gửi cookie kèm request
  });

  const payload: Response = await res.json();
  const data = {
    status: res.status,
    payload,
  };
  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(
        data as {
          status: 422;
          payload: EntityErrorPayload;
        }
      );
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      if (typeof window !== "undefined") {
        if (!clientSignOutRequest) {
          clientSignOutRequest = fetch("/api/auth/sign-out", {
            method: "POST",
            body: JSON.stringify({ force: true }),
            headers: {
              ...baseHeaders,
            } as HeadersInit,
            credentials: "include", // Thêm dòng này để gửi cookie kèm request
          });

          await clientSignOutRequest;
          clientSessionToken.value = "";
          clientSessionToken.expiresAt = new Date().toISOString();
          clientSignOutRequest = null;
          location.href = "/sign-in";
        }
      }
      // else {
      //   const sessionToken = (options?.headers as any)?.Authorization.split(
      //     "Bearer "
      //   )[1];
      //   redirect(`/sign-out?sessionToken=${sessionToken}`);
      // }
    } else {
      throw new HttpError({
        status: res.status,
        payload: data.payload as {
          detail: string;
          error_message: string;
          [key: string]:
            | string
            | string[]
            | {
                field: string;
                detail: string;
                message: string;
                error_message: string;
              }[]
            | undefined;
        },
      });
    }
  }
  if (typeof window !== "undefined") {
    if (
      ["/api/v1/auth/sign-in", "/api/v1/auth/sign-up"].some(
        (item) => item === normalizePath(url)
      )
    ) {
      clientSessionToken.value = (payload as SignInResType).access_token;
      clientSessionToken.expiresAt = (payload as SignInResType).expiresAt;
    } else if ("/api/v1/auth/sign-out" === normalizePath(url)) {
      clientSessionToken.value = "";
      clientSessionToken.expiresAt = new Date().toISOString();
    }
  }
  return data;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response, RequestBody extends BodyInit | null | undefined = BodyInit>(
    url: string,
    body: RequestBody,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response, RequestBody extends BodyInit | null | undefined = BodyInit>(
    url: string,
    body: RequestBody,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, options);
  },
  patch<Response, RequestBody extends BodyInit | null | undefined = BodyInit>(
    url: string,
    body: RequestBody,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PATCH", url, { ...options, body });
  },
};

export default http;
