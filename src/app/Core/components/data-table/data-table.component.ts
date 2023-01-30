import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import PocketBase from 'pocketbase'
import { ApiService } from 'src/app/Core/services/api/api.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Column } from './data-table-result'

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})

export class DataTableComponent{
    @Input()
    tableColumns: Array<Column> = [];
    @Input()
    tableData: Array<T> = [];
  
    displayedColumns: Array<string> = [];
  


    pb: PocketBase
    loader = this.loadingBarService.useRef();
    results : any[] = []
    loaded = false
    max = 10
    size = 0
    page = 1
    pages = 0
    pageSizes = [10, 25, 50, 100]

    constructor(private router: Router, private apiService: ApiService, private loadingBarService: LoadingBarService) { 
        this.pb = apiService.pb
    }


    ngOnInit() {
        this.displayedColumns = this.tableColumns.map((c) => c.columnDef);
      }


















    async getResults(){
        console.log("getResults()")
        const myPromise = this.pb.collection('users').getList(this.page, this.max, {});
        await myPromise.then((value) => { 
            console.log(value)
            this.size = value.totalItems
            this.pages = value.totalPages
            this.results = value.items
       });
       this.loaded = true
       this.loader.complete()
    }

}
