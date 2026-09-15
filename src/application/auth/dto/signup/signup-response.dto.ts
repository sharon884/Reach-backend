export interface SignupResponseDto {
    id: string;
    fullName: string;
    email: string;
    role: string;
    status: string;
    isEmailVerified: boolean;
}