export type JwtPayload = {
    phone: string;
    role: 1 | 2 | 3 | 4 | 5;
    sub: number;
    iat: number;
    exp: number;
};
