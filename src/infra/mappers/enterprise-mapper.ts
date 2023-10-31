import { Enterprise } from 'src/application/entities/enterprise';
import { Prisma } from '@prisma/client';

export class EnterpriseMapper {
  static toPersist(enterprise: Enterprise): Prisma.EnterpriseCreateInput {
    return {
      cep: enterprise.cep,
      cnpj: enterprise.cnpj,
      county: enterprise.address.county,
      email: enterprise.email,
      fantasyName: enterprise.fantasyName,
      name: enterprise.name,
      neighborhood: enterprise.address.neighborhood,
      number: enterprise.address.number,
      phone: enterprise.phone,
      isActive: enterprise.isActive,
      uf: enterprise.address.uf,
      street: enterprise.address.street,
    };
  }
}
