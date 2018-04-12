// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class UsuarioServiceProvider {
	
	public cpfUser = '08169897459';
	public nomeUser = 'walteann';
	public senhaUser = '123456';

	constructor() {

	}


	autenticaLogin(usuario, senha) {
		
		if((usuario == this.nomeUser  || usuario == this.cpfUser) && senha == this.senhaUser)	{
			return true;
		}else{
			return false;
		}

	}

}
