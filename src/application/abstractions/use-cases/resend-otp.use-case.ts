export interface IResendOtpUseCase {
    execute(userId: string): Promise<void>;
}