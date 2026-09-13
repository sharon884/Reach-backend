export interface IPasswordResetStore {
       create(
         userId : string,
         expiresInSeconds : number ,
       ) : Promise < string >;


        consume (
             token : string ,
        ) : Promise<string | null >
};



