import type { User } from "../../../../domain/auth/entities/user.entity.js";
import type { SignupResponseDto } from "../../dto/signup/signup-response.dto.js";


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

