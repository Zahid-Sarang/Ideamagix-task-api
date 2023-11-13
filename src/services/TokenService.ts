import { JwtPayload, sign } from "jsonwebtoken";
import { Config } from "../config";

export class TokenService {
    generateAccessToken(payload: JwtPayload) {
        const accessToken = sign(payload, Config.ACCESS_TOKEN_SECRET!, {
            expiresIn: "60s",
        });

        const refreshToken = sign(payload, Config.REFRESH_TOKEN_SECRET!, {
            expiresIn: "1y",
        });

        return { accessToken, refreshToken };
    }
}
