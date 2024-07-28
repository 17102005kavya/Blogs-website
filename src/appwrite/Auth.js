import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";
export class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client .setEndpoint(conf.appwriteUrl) // Your API Endpoint
        .setProject(conf.appwriteProjectId);  
        this.account=new Account(this.client);    
    }
    async createAccount({email,password,name}){
        try {
           const userAcc= await this.account.create(ID.unique(),email,password,name)//first parameter is a userid
            if(userAcc){
               this.login(email,password)
            }
            else{
                return userAcc;
            }
        } catch (error) {
            throw error;
        }
    }
    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            console.log("cant login")
            throw error;
        }
    }
    async getCurrentUser(){
        try {
          return await this.account.get();  
        } catch (error) {
            console.log("eroor",error);
        }return null;
       
    }
    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("no user here")
           throw error; 

        }
    }
}
const authService=new AuthService();
export default authService