import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import PocketBase from 'pocketbase'

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
export class UserTableComponent implements OnInit{

    pb = new PocketBase('http://127.0.0.1:8090')

    pagnationForm:FormGroup;
    results : any[] = []
    loaded = false
    
    min = 0
    max = 10
    size = 0
    page = 0;
    pages = 0
    pageSizes = [10, 25, 50, 100]

    constructor(private fb:FormBuilder){
        this.pagnationForm = this.fb.group({
            max: 10,
            page: 1
        });
        this.getResults();
        this.pagnationForm.get("max")?.valueChanges.subscribe(f => {this.updateMax(f)})

    }

    ngOnInit(): void {
    }

    getResults(){
        console.log("getResults()")
        console.log(this.min)
        console.log(this.max)
        console.log(this.page)
        const myPromise = this.pb.collection('users').getList(this.min, this.max, {});
        myPromise.then((value) => { 
            console.log(value)
            this.size = value.totalItems
            this.pages = value.totalPages
            this.results = value.items
            this.loaded = true
       }); 
    }    

    updateMax(size: number) {
        this.max = size
        this.getResults()
    }

    updatePage(page: number) {
        this.pagnationForm.value.page = page
        this.page = page
        if(page != 1){
            this.min = this.max * this.page
        }
        else {
            this.min = 0
        }
        this.getResults()
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

    viewUser(id: number){
        console.log("viewUser() ID:" + id)
    }
}
