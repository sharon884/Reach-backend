export type CoreFieldKey = |"TEXT" | "DESCRIPTION" | "IMAGES" | "LOCATION" | "QUANTITY" | "EXPIRY";


export interface CategoryField {
     
     id : string;

     categoryId : string;

     fieldKey : CoreFieldKey;
     
     required : boolean;

     isEnabled : boolean;

     displayOrder : boolean;

     createdAt : Date;

     updatedAt : Date;

}