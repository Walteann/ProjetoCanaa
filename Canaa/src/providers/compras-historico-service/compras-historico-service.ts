import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, map, tap } from "rxjs/operators";

import { IHistoricoComprasModels } from "./../../modals/historico-compras.models";
import { HistoricoAddModels } from './../../modals/historico-add.models';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class ComprasHistoricoServiceProvider {

    // private historicoUrl = 'http://192.168.43.52:3000/historico-compras';  MUDA QDO FOR PRA APRESENTACAO
    private historicoUrl = 'http://192.168.0.104:3000/historico-compras';


    constructor(private _http: HttpClient) {}


    getHistorico(): Observable<IHistoricoComprasModels[]>   {

        return this._http.get<IHistoricoComprasModels[]>(this.historicoUrl);

    }

    setHistorico(historico)   {
        // console.log('historico');

        return this._http.post<HistoricoAddModels[]>(this.historicoUrl, {historico}, httpOptions);
    }

}
