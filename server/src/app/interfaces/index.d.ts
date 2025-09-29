// index.d.ts (I want to stick with this)
import { JwtPayload } from "jsonwebtoken";
declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
