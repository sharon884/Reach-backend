export interface RefreshTokenResult {
       accessToken : string,
       refreshToken : string,
};




export interface IRefreshTokenUseCase {
      execute( refreshToken : string ) : Promise<RefreshTokenResult>;
};


