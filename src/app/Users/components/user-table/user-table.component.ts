import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import PocketBase from 'pocketbase'
import { ApiService } from 'src/app/Core/services/api/api.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { QueryService } from 'src/app/Core/services/query/query.service';

export interface userTableItem {
  id: number;
  username: string;
  email: string;
} 

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent{

    pb: PocketBase

    loader = this.loadingBarService.useRef();

    pagnationForm:FormGroup;
    searchForm:FormGroup;
    results : any[] = []
    loaded = false
    
    max = 10
    size = 0
    page = 1
    pages = 0
    pageSizes = [10, 25, 50, 100]

    constructor(private router: Router, private fb:FormBuilder, private apiService: ApiService, private loadingBarService: LoadingBarService, private queryService: QueryService) { 
        this.loader.start()
        this.pb = apiService.pb
        this.pagnationForm = this.fb.group({
            max: 10,
            page: 1
        });
        this.searchForm = this.fb.group({
            id: "",
            username: "",
        });
        this.getResults();
        this.pagnationForm.get("max")?.valueChanges.subscribe(f => {this.updateMax(f)})
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
        this.pb.cancelAllRequests();
        this.loader.complete()
    }

    async getResults(){
        console.log("getResults()")
        const myPromise = this.pb.collection('users').getList(this.page, this.max, {});
        await myPromise.then((value) => { 
            console.log(value)
            this.size = value.totalItems
            this.pages = value.totalPages
            this.results = value.items
            console.log(this.results.length > 0)
       });
       this.loaded = true
       this.loader.complete()
    }

    updateMax(size: number) {
        this.max = size
        this.getResults()
    }

    updatePage(page: number) {
        if(this.page != page){        
            this.pagnationForm.value.page = page
            this.page = page
            this.getResults()
        }
    }

    getPages(): number[]{
        const pages = [];
        for(let x = 1; x <= this.pages; x++){
            pages.push(x)
        }
        return pages
    }

    

    submit() {
        console.log("Form Submitted")
        console.log(this.pagnationForm.value)
    }

    searchSubmit() {
        console.log("Search Submitted")
        console.log(JSON.stringify(this.searchForm.value))
    }

    viewUser(id: number){
        console.log("viewUser() ID:" + id)
        this.router.navigate(["users/", id]);
    }

    createUser(){
        console.log("createUser()")
        this.router.navigate(["users/", "0"]);
    }
}
