import type { UserSessionRepository } from "@/domain/repositories/user-session.repository";

export class AdminLogoutUseCase {
     constructor(
         private readonly userSessionRepository : UserSessionRepository,
     ) {}

     async execute ( sessionId : string ) : Promise<void> {
           
         await this.userSessionRepository.revoke(
             sessionId,
             new Date(),
         )
     }
}