export class UpdateNumOfCards {
  static readonly type: string = "[Home] Update NumOfCards";

  constructor(public numOfCards: number) {}
}
