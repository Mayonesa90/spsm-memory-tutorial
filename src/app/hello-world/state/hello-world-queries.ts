import {Injectable} from "@angular/core";
import {HelloWorldState} from "./hello-world-state";
import {Selector} from "@ngxs/store";
import {IHelloWorldStateModel} from "../api/hello-world-state-model";

@Injectable()
export class HelloWorldStateQueries {
  @Selector([HelloWorldState])
  public static name$(state: IHelloWorldStateModel): string {
    return state?.name;
  }
}
