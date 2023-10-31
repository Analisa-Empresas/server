import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EnterpriseService } from 'src/application/services/enterprise.service';

@Controller('/enterprises')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @Post()
  async register(@Body() body: { cnpj: string }) {
    const { cnpj } = body;
    await this.enterpriseService.register({ enterpriseCnpj: cnpj });
  }

  @Get('/:cnpj')
  async getByCnpj(@Param('cnpj') cnpj: string) {
    const { enterprise } = await this.enterpriseService.getByCnpj(cnpj);

    return { enterprise };
  }
}
