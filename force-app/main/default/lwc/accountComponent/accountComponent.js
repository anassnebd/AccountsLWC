/**
 * @author [NEBDAOUI ANASS]
 * @email [nebdaoui.anass@gmail.com]
 * @create date 2023-03-25 14:54:24
 * @modify date 2023-03-25 O1:23:12
 * @desc [description]
 */


import { LightningElement,api,wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class AccountComponent extends LightningElement {

    @api records;
    @api errors;
    filter = '';
    filterAsa = '';
    filterBil = '';
    filterRc = '';
    filterIce = '';
    filterRecordType = '';

    handleInputChangeName(event){
        this.filter = event.target.value;
    }

    handleInputChangeAsa(event){
        this.filterAsa = event.target.value;
    }

    handleInputChangeBil(event){
        this.filterBil = event.target.value;
    }

    handleInputChangeRc(event){
        this.filterRc = event.target.value;
    }

    handleInputChangeIce(event){
        this.filterIce = event.target.value;
    }

    handleInputChangeRt(event){
        this.filterRecordType = event.target.value;
    }

    @wire(getAccounts)
    wiredCases({ data, error }){
        if(data){
            this.records = data;
            this.errors = undefined;
            console.log("NAME : " +data[0].RecordType.Name)
        }
        if(error){
            this.errors = error;
            this.records = undefined;
        }
    }

    get filteredAccounts(){
        return this.records && this.records.filter(account => {
            return account.Name.toLowerCase().includes(this.filter.toLowerCase()) &&
                account.ASAIDPRS__c.toLowerCase().includes(this.filterAsa.toLowerCase()) &&
                account.BIL_ID__c.toLowerCase().includes(this.filterBil.toLowerCase()) &&
                account.RC__c.toLowerCase().includes(this.filterRc.toLowerCase()) &&
                account.ICE__c.toLowerCase().includes(this.filterIce.toLowerCase()) &&
                account.RecordType.Name.toLowerCase().includes(this.filterRecordType.toLowerCase());
        });
    }

    value = 'inProgress';

    get options() {
        return [
            { label: 'Business Account', value: 'Business_Account' },
            { label: 'Client Entreprise', value: 'Client_Entreprise' },
            { label: 'ProspectEntreprise', value: 'Prospect_Entreprise' },
        ];
    }

}