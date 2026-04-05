const ACCESS_TOKEN_KEY = "auth_access_token";

let accessToken: string | null = null;

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readStoredToken() {
  if (!canUseStorage()) {
    return null;
  }

  try {
    return window.localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
}

export const tokenStore = {
  get: () => {
    if (!accessToken) {
      accessToken = readStoredToken();
    }

    return accessToken;
  },
  set: (token: string) => {
    accessToken = token;

    if (canUseStorage()) {
      try {
        window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
      } catch {
        // ignore storage write failures and keep in-memory token
      }
    }
  },
  clear: () => {
    accessToken = null;

    if (canUseStorage()) {
      try {
        window.localStorage.removeItem(ACCESS_TOKEN_KEY);
      } catch {
        // ignore storage cleanup failures
      }
    }
  },
};
