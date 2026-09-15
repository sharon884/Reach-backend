export type CategoryStatus = "ACTIVE" | "INACTIVE";


export interface Category {
     
     id : string;

     name : string;

     slug : string;

     description : string;

     parentId : string | null;

     status : CategoryStatus;

     displayOrder : number ;

     createdAt : Date;

     updatedAt : Date;
}