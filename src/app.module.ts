import { Module } from '@nestjs/common';
import { PrismaService } from './infra/prisma/prisma.service';
import { EnterpriseService } from './application/services/enterprise.service';
import { EnterpriseGateway } from './application/gateways/enterprise-gateway';
import { ApiConsultaCnpj } from './application/gateways/implementations/api-consulta-cnpj';
import { EnterpriseController } from './infra/http/enterprise.controller';
import { UserController } from './infra/http/user.controller';
import { UserService } from './application/services/user.service';

@Module({
  imports: [],
  controllers: [EnterpriseController, UserController],
  providers: [
    PrismaService,
    EnterpriseService,
    UserService,
    { provide: EnterpriseGateway, useClass: ApiConsultaCnpj },
  ],
})
export class AppModule {}
