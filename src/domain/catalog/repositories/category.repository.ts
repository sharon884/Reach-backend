import { BaseRepository } from "@/domain/shared/repositories/base.repository";
import { CategoryProperty } from "../entities/category-property.entity.js";
import { required } from "zod/mini";



export interface ICategoryPropertyRepository extends BaseRepository<CategoryProperty> {

      findByCategoryId( categoryId : string ) : Promise <CategoryProperty[]>;


      findByCategoryAndProperty(
         categoryId : string,
         propertyId : string,
      ) : Promise<CategoryProperty | null > ;


      updateConfiguration ( id : string, configuration : {
         required? : boolean;
         filterable ? : boolean ;
         sortable ? : boolean ;
         displayOrder ? : number;
      },) : Promise <CategoryProperty[]>;


      delete( id : string ) : Promise<void>;
}



