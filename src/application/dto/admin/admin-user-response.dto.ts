export interface AdminUserResponseDto {
    id: string;
    fullName: string;
    email: string;
    role: string;
    status: string;
    isEmailVerified: boolean;
    createdAt: Date;
}