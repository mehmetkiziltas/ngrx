export class User {
  constructor(
    public localId: string,
    public email: string,
    public token: string,
    public expirationDate: Date
  ) {}
}
