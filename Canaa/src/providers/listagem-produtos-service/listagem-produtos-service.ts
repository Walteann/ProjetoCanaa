import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { ProdutoModels } from '../../modals/produtos.models';


@Injectable()
export class ListagemProdutosServiceProvider {

	// private mercadoriasUrl = 'http://192.168.43.52:3000/mercadorias'; MUDA QDO FOR APRESENTAR
	private mercadoriasUrl = 'http://192.168.0.104:3000/mercadorias';

	constructor(private _http: HttpClient)	{}

	getProdutos (): Observable<ProdutoModels[]>	{

		return this._http.get<ProdutoModels[]>(this.mercadoriasUrl)
				// .pipe(
				// 	tap(mercadoria => this.log(` mercadorias Buscadas`)),
				// 	catchError(this.handleError('getProdutos', []))
				// );


	}

	private handleError<T> (operation = 'operation', result? : T)	{
		return (error: any): Observable<T> =>	{

			console.error(error);

			this.log(`${operation} failed: ${error.message}`);

			return of(result as T);

		}
	}

	private log(messagem: string)	{
		console.log(messagem);
	}

}
