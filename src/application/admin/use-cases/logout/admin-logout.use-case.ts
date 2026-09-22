import type { IUserSessionRepository } from "@/domain/auth/repositories/user-session.repository";

import type { IAdminLogoutUseCase } from "@/application/admin/use-cases/logout/admin-logout.use-case.interface";

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