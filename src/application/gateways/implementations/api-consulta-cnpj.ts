import { Injectable } from '@nestjs/common';
import { EnterpriseGateway } from '../enterprise-gateway';
import axios from 'axios';
import { Enterprise } from 'src/application/entities/enterprise';

type ApiConsultaCnpjResponse = {
  CEP: string;
  TELEFONE: string;
  EMAIL: string;
  'RAZAO SOCIAL': string;
  'NOME FANTASIA': string;
  STATUS: string;
  CNPJ: string;
  LOGRADOURO: string;
  NUMERO: string;
  BAIRRO: string;
  MUNICIPIO: string;
  UF: string;
};

@Injectable()
export class ApiConsultaCnpj implements EnterpriseGateway {
  async getByCnpj(cnpj: string) {
    const { data } = await axios.get<ApiConsultaCnpjResponse>(
      `https://api-publica.speedio.com.br/buscarcnpj?cnpj=${cnpj}`,
    );

    const enterprise: Enterprise = {
      cep: data.CEP,
      email: data.EMAIL,
      name: data['RAZAO SOCIAL'],
      cnpj: data.CNPJ,
      phone: data.TELEFONE,
      isActive: data.STATUS === 'ATIVA' ? true : false,
      address: {
        county: data.MUNICIPIO,
        neighborhood: data.BAIRRO,
        number: data.NUMERO,
        street: data.LOGRADOURO,
        uf: data.UF,
      },
      fantasyName:
        data['NOME FANTASIA'].length > 0 ? data['NOME FANTASIA'] : null,
    };

    return enterprise;
  }
}
