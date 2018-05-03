// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class UsuarioServiceProvider {
	
	public cpfUser = '11346605459';
	public nomeUser = 'Julianna';
	public admin = 'admin';
	public senhaAdmin = 'admin';
	public senhaUser = '123456';

	constructor() {

	}


	autenticaLogin(usuario, senha) {
		
		if((usuario == this.nomeUser  || usuario == this.cpfUser) && senha == this.senhaUser)	{
			return true;
		}else if (usuario == this.admin && senha == this.senhaAdmin) {
			return true;
		} else {
			return false;
		}

	}

}
