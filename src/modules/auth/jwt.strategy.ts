import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { JWTConfigService } from '../config/jwt-config.service';
import { TokenPayloadModel } from './models/token-payload.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly jwtConfigService: JWTConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfigService.extractPublicKey(),
      algorithms: ['RS256'],
    });
  }

  public async validate(payload: TokenPayloadModel): Promise<any> {
    return {
      userId: payload.sub,
      role: payload.role,
    };
  }
}
