import type { IUserSessionRepository } from "@/domain/auth/repositories/user-session.repository"
import type { ILogoutUseCase } from "@/application/auth/use-cases/logout/logout.use-case.interface";

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