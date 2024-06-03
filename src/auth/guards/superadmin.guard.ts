import {
    CanActivate,
    ExecutionContext,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomRequest } from './custom-request.interface';
import { JwtPayload } from './payload.type';

@Injectable()
export class superAdminGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: CustomRequest = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                throw new UnauthorizedException('Unauthorized');
            }
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            if (!token && !bearer) {
                throw new UnauthorizedException('Unauthorized');
            }

            const user: JwtPayload = await this.jwtService.verifyAsync(token, {
                secret: process.env.SECRET_KEY,
            });

            if (user.role == 4) {
                req.user = user.sub;
                return true;
            } else {
                throw new UnauthorizedException('Unauthorized');
            }
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }
}
