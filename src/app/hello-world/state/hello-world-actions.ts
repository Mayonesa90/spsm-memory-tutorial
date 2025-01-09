export class UpdateHelloWorldName {
  static readonly type: string = "[HelloWorld] Update Name";

  constructor(public name: string) {}
}
