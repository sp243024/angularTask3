export class user {
    public email: string;
    public id: string;
    public _token: string;
    public _tokenExpDate: Date;
    
    constructor(email: string, id: string, _token: string, _tokenExpDate: Date) {
        this.email=email;
        this.id=id;
        this._token=_token;
        this._tokenExpDate=_tokenExpDate;    
    }

    getToken()
    {
        if(!this._tokenExpDate || new Date() > this._tokenExpDate)
        {
            return null;
        }
        return this._token;
    }
}