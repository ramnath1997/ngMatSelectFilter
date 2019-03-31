import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    title = 'ngMatSelectFilter';
    formGroup1: FormGroup;
    formControl1: any = [];
    isDisable: Boolean = true;
    // declaring variables
    itemList: any = [
        {
            'id' : 2,
            'value' : 'two' 
        },
        {
            'id' : 4,
            'value' : 'four' 
        },
        {
            'id' : 8,
            'value' : '4.3' 
        },
        {
            'id' : 5,
            'value' : 'five' 
        },
        {
            'id' : 6,
            'value' : 'six' 
        },
        {
            'id' : 9,
            'value' : '6.3' 
        },
        {
            'id' : 7,
            'value' : 'seven' 
        }
    ];
    copy_itemList: any = [];
    searchBuffer: any = [];
    bufferItemList: any = [];
    searchingFlag: Boolean = false;

    constructor(private fb: FormBuilder) {
        this.formControl1=new FormControl();
        this.copy_itemList = this.itemList;
        this.bufferItemList = this.itemList;
        this.formGroup1 = this.fb.group({
            multiSelect: new FormControl(''),
            searchInput: new FormControl('')
        });      
    }
  
    //function calls while opening the field
    triggerOpen(grp: FormGroup, formGroupName: String) {
        if (grp.controls.multiSelect.value.length!=0 &&grp.controls.multiSelect.value!=[]&& !this.searchingFlag) {
            this.searchBuffer = grp.controls.multiSelect.value;
        }
    }
    
    //function calls while typing on the search field
    filter(event, grp: FormGroup, formGroupName: String) {
        this.searchingFlag = true;
        const val = event.target.value.toLowerCase();
        if(val == '') {
            this.searchingFlag = false;
        }

        let copy_list = [];
        switch (formGroupName) {
            case "formGroup1":
                copy_list = this.copy_itemList;
                break;
        }

        const temp = copy_list.filter(function (d) {
            return ((d.value != null
              && (d.value).toString().toLowerCase().indexOf(val) !== -1)
              || !val);
        });
        
        let get = [];
        switch (formGroupName) {
            case "formGroup1":
                this.bufferItemList = temp;
                get = this.bufferItemList;
                break;
        }

        let buff = [];
        this.searchBuffer.forEach(function (value) {
            get.forEach(function (item) {
                if(value == item.id) {
                    buff.push(value);
                }
            });
        });
        grp.controls.multiSelect.patchValue([...buff.map(item => item)]);
    }
    
    //function triggers while clicking select all
    selectAll(grp : FormGroup, formGroupName: String, param) {
        switch (formGroupName) {
            case "formGroup1":
                this.bufferItemList = this.copy_itemList;
                break;
            }
        this.searchingFlag = false;
        this.searchBuffer = param.map(item => item.id);
        grp.controls.searchInput.patchValue("");
        grp.controls.multiSelect.patchValue([...param.map(item => item.id)]);
    }
  
    //function triggers while clicking deselect all
    deselectAll(grp : FormGroup, formGroupName: String) {
        switch (formGroupName) {
            case "formGroup1":
                this.bufferItemList = this.copy_itemList;
                break;
        }
        this.searchingFlag = false;
        this.searchBuffer = [];
        grp.controls.searchInput.patchValue("");
        grp.controls.multiSelect.patchValue([]);
    }

    //function calls while selecting / deselecting the checkbox
    changeEve(event, grp: FormGroup, formGroupName: String) {
        let get = [];
        switch (formGroupName) {
            case "formGroup1":
                get = this.bufferItemList;
                break;
        }
        let buff = [];
        let curr = [];
        let selected = event.value;
        for(let i=0; i<get.length; i++) {
            curr.push(get[i].id);
        }
        buff = this.searchBuffer.filter(function(val) {
            return curr.indexOf(val) == -1;
        });
        for(let j=0; j<selected.length; j++) {
            buff.push(selected[j]);
        }
        this.searchBuffer = buff;
        grp.controls.multiSelect.patchValue([...buff.map(item => item)]);
    }
  
    //function calls while opening / closing the mat-select
    openedChange(event, grp: FormGroup, formGroupName: String) {
        if(!event && this.searchingFlag) {
            switch (formGroupName) {
                case "formGroup1":
                    this.bufferItemList = this.copy_itemList;
                    break;
            }
            this.searchingFlag = false;
            grp.controls.multiSelect.patchValue([...this.searchBuffer.map(item => item)]);
            this.searchBuffer = [];
            grp.controls.searchInput.patchValue("");
        }
    }
}