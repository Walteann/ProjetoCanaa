import { Usuario } from './usuario.model';
export class Endereco {
    key: string;
    nome: string;
    cpf: string;
    celular: string;
    cep: string;
    endereco: string;
    cidade: string;
    complemento: string;
    bairro: string;
    user: Usuario;
}