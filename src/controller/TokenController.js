import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config";

export default class TokenController {
    async generateToken(payload) {
      try {
        return await jwt.sign(payload, TOKEN_SECRET, {
        });
      } catch (err) {
        throw err;
      }
    }
    async verifyToken(token) {
      try {
        return await jwt.verify(token, TOKEN_SECRET);
      } catch (err) {
        throw err;
      }
    }
  }