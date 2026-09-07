import type { User } from "../../../domain/entities/user.entity.js";
import type { SignupResponseDto } from "../../dto/auth/signup-response.dto.js";


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

