import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { EnterpriseGateway } from '../gateways/enterprise-gateway';
import { EnterpriseMapper } from 'src/infra/mappers/enterprise-mapper';

type RegisterEnterprise = {
  enterpriseCnpj: string;
};

@Injectable()
export class EnterpriseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly enterpriseGateway: EnterpriseGateway,
  ) {}

  async register({ enterpriseCnpj }: RegisterEnterprise) {
    const enterprise = await this.enterpriseGateway.getByCnpj(enterpriseCnpj);

    await this.prisma.enterprise.create({
      data: EnterpriseMapper.toPersist(enterprise),
    });
  }

  async getById(enterpriseId: string) {
    const enterprise = await this.prisma.enterprise.findUniqueOrThrow({
      where: {
        id: enterpriseId,
      },
    });

    return { enterprise };
  }

  async getByCnpj(cnpj: string) {
    const enterprise = await this.prisma.enterprise.findUniqueOrThrow({
      where: {
        cnpj,
      },
    });

    return { enterprise };
  }
}
