import type { SignupDto } from "../../dto/auth/signup.dto";

export interface CreateUserData {
      fullName : string , 
      email : string , 
      passwordHash : string ;
}


export function mapSignupToUserData(
     data : SignupDto, 
     passwordHash : string ,
    
) : CreateUserData {
        return {
               fullName : data.fullName, 
               email : data.email, 
               passwordHash,
        };
};


