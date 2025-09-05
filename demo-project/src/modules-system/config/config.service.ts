import { Injectable } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {}

  get(key: string): string {
    return this.configService.get<string>(key);
  }

  getDatabaseUrl(): string {
    return this.get("DATABASE_URL");
  }
}