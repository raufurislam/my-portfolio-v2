// setCookie.ts
import { Response } from "express";
// import { envVars } from "./../config/env";
// import ms from "ms";

export interface AuthTokens {
  accessToken?: string;
  refreshToken?: string;
}

// const accessMaxAge = ms(envVars.JWT_ACCESS_EXPIRES as ms.StringValue);
// const refreshMaxAge = ms(envVars.JWT_REFRESH_EXPIRES as ms.StringValue);

export const setAuthCookie = (res: Response, tokenInfo: AuthTokens) => {
  if (tokenInfo.accessToken) {
    res.cookie("accessToken", tokenInfo.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
  }

  if (tokenInfo.refreshToken) {
    res.cookie("refreshToken", tokenInfo.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
  }
};
