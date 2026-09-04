import { boolean } from "zod";
import type { User } from "../../../generated/prisma/client";
import type { SignupResponseDto } from "../../dto/auth/signup-response.dto";


export function mapSignupToResponse(user : User ) : SignupResponseDto {
        return {
             id : user.id,
             fullName : user.fullName,
             email : user.email,
             role : user.role, 
             status : user.status,
             isEmailVerified : user.isEmailVerified,
        };      
};

