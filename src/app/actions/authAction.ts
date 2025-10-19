"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function userInfo() {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;
    if (accessToken) {
      let decodedData = null;
      decodedData = await jwtDecode(accessToken);
      return {
        email: decodedData.email,
        role: decodedData.role,
        id: decodedData.id,
      };
    }
    {
      return null;
    }
  } catch (error) {
    throw error;
  }
}
