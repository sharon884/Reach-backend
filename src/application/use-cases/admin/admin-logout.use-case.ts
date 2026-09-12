import type { IUserSessionRepository } from "@/domain/repositories/user-session.repository";

import type { IAdminLogoutUseCase } from "@/application/abstractions/use-cases/admin/admin-logout.use-case";

export class AdminLogoutUseCase implements IAdminLogoutUseCase {
     constructor(
         private readonly _userSessionRepository : IUserSessionRepository,
     ) {}

     async execute ( sessionId : string ) : Promise<void> {
           
         await this._userSessionRepository.revoke(
             sessionId,
             new Date(),
         )
     }
}