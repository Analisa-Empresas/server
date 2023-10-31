export type Enterprise = {
  name: string;
  isActive: boolean;
  fantasyName: string | null;
  phone: string;
  cep: string;
  cnpj: string;
  email: string;
  address: {
    street: string;
    number: string;
    county: string;
    neighborhood: string;
    uf: string;
  };
};
