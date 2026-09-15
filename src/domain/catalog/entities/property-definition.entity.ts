export type PropertyDataType = | "TEXT" | "LONG_TEXT" | "NUMBER" | "BOOLEAN" | "DATE" | "SELECT" | "MULTI_SELECT";


export type PropertyDefinitionStatus = "ACTIVE" | "INACTIVE";


export interface PropertyDefinition {
     
     id : string;

     name : string;

     slug : string;

     description : string | null;

     dataType : PropertyDataType;

     validationConfig : Record<string , unknown > | null;

     status : PropertyDefinitionStatus;

     createdAt : Date;

     updatedAt : Date ;
    
}


