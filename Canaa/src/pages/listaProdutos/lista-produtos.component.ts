import { Component, OnInit } from '@angular/core';
import { ListagemProdutosServiceProvider } from '../../providers/listagem-produtos-service/listagem-produtos-service';

import { ProdutoModels } from '../../modals/produtos.models';


@Component({
    selector: 'lista-produtos',
    templateUrl: './lista-produtos.component.html'
})

export class ListaProdutosComponent implements OnInit{

    public merc: ProdutoModels[];

    constructor(private _mercadoriaService: ListagemProdutosServiceProvider)    {
        
        
        
    }

    ngOnInit()  {

        this.getMercadorias();
    }
    
    getMercadorias(): void{
        this._mercadoriaService.getProdutos()
        .subscribe(data => {
            this.merc = data,
            console.log(data),
            console.log(this.merc);

        });
            
        
    }
    
    
    
        
  

    


        

    

}