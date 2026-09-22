export type CoreFieldKey = |"TITLE" | "DESCRIPTION" | "IMAGES" | "LOCATION" | "QUANTITY" | "EXPIRY";


export interface CategoryField {
     
     id : string;

     categoryId : string;

     fieldKey : CoreFieldKey;
     
     required : boolean;

     isEnabled : boolean;

     displayOrder: number;

     createdAt : Date;

     updatedAt : Date;

}