import { Enterprise } from 'src/application/entities/enterprise';

export abstract class EnterpriseGateway {
  abstract getByCnpj(cnpj: string): Promise<Enterprise>;
}
