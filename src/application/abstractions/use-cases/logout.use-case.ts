export interface ILogoutUseCase {
    execute(sessionId: string): Promise<void>;
}