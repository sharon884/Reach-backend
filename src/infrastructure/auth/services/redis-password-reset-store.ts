import { createHash, randomBytes } from "node:crypto";

import type { RedisClientType } from "redis";

import type { IPasswordResetStore } from "@/application/auth/services/password/password-reset-store";


export class RedisPasswordResetStore implements IPasswordResetStore {

         constructor (
              private readonly _client : RedisClientType,
         ) {}



         private _hashToken ( token : string ) : string {
              
            return   createHash("sha256").update(token).digest("hex");
         }



         private _resetKey( token : string ) : string {
              const tokenHash =  this._hashToken( token );


               return `password - reset : ${ tokenHash }`
         };



         async create (
              userId : string ,
              expiresInSeconds : number ,
         ) : Promise<string> {
               
             const token = randomBytes(32).toString("hex");

             const key = this._resetKey(token);

             await this._client.set(
                 key ,
                 userId,

                 {
                     EX : expiresInSeconds,
                 }
             );
             
             
             return token;
         };



         async consume(token: string): Promise<string | null> {
              
               const key = this._resetKey(token);

               const userId = await this._client.get(key);

                if ( !userId ) {
                       return null;
                };


                await this._client.del(key);


                return userId;
         }
};



