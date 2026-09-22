export interface CategoryProperty { 

      id : string;

      categoryId : string;

      propertyId : string;

      required : boolean;

      filterable : boolean;

      sortable : boolean;

      displayOrder : number;

      createdAt : Date;

      updatedAt : Date;
}