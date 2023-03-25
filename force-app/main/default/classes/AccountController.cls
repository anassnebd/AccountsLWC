/**
 * @author NEBDAOUI Anass
 * @email nebdaoui.anass@gmail.com
 * @create date 2023-03-25 02:23:25
 * @modify date 2023-03-25 14:50:19
*/


public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name, RecordTypeId, RecordType.Name, ASAIDPRS__c, BIL_ID__c, RC__c, ICE__c FROM Account 
        WHERE RecordTypeId != null
        AND BIL_ID__c != null 
        AND RecordType.Name IN('Business_Account','Prospect_Entreprise','Client_Entreprise')];
    }
}