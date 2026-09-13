import type { IUserSessionRepository } from "@/domain/repositories/user-session.repository"
import type { ILogoutUseCase } from "@/application/abstractions/use-cases/logout.use-case";

export class LogoutUseCase implements ILogoutUseCase {

    constructor(
        private readonly _userSessionRepository: IUserSessionRepository,
    ) {}

    async execute(sessionId: string): Promise<void> {
        await this._userSessionRepository.revoke(
            sessionId,
            new Date(),
        );
    }
}