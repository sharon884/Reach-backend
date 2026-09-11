export interface IAdminLogoutUseCase {
    execute(sessionId: string): Promise<void>;
}