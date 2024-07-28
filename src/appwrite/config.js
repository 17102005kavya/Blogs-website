import conf from "../conf/conf";
import { Client, Account, ID ,Databases,Storage,Query} from "appwrite";
export class Service{
    client = new Client();
    databases;
    bucket;
constructor(){
    this.client .setEndpoint(conf.appwriteUrl) // Your API Endpoint
    .setProject(conf.appwriteProjectId);  
    this.databases=new Databases(this.client); 
     this.bucket=new Storage(this.client);
}
async createPost({title,slug,content,image,status,userid}){
try {
    console.log("Creatung Post")
    return await this.databases.createDocument(conf.appwriteDatabaseId,
        conf.appwriteCollectionId,slug,{title,content,image,status,userid})
} catch (error) {
    console.log("hahah")
    throw error;
}
}
async updatePost(slug,{title,content,image,status}){
    try {
        return await this.databases.updateDocument(conf.appwriteDatabaseId,
            conf.appwriteCollectionId,slug,{title,content,image,status})
    } catch (error) {
        throw error;
    }
    }
    async deletePost(slug){
        try {
            return await this.databases.deleteDocument(conf.appwriteDatabaseId,
                conf.appwriteCollectionId,slug)
        } catch (error) {
            throw error;
        }
    }
    async getPost(slug){
        try {
          return await  this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
        } catch (error) {
            throw error;
        }
    }
    async getPosts(queries=[Query.equal("status","active")]){
        try {
          return await  this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,queries)
        } catch (error) {
            throw error;
        }
    }
    async uploadFile(file){
        try {
            console.log("File uploading...")
            const k=  await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                 file
            )
         return k;
          
        }
         catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
           throw error; 
           return false;
        }
    }
    async deleteFile(id){
        try {
            return await this.bucket.deleteFile(conf.appwriteBucketId,id)
        } catch (error) {
           throw error; 
        }
    }
    getFilePreview(id){
        try {
            return this.bucket.getFilePreview(conf.appwriteBucketId,id)
        } catch (error) {
            throw error;
        }
    }
}
const service=new Service();
export default service;