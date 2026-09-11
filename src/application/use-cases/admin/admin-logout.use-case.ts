import type { IUserSessionRepository } from "@/domain/repositories/user-session.repository";

export class AdminLogoutUseCase {
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