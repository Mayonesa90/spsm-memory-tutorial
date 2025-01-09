import {Action, State, StateContext, StateToken} from "@ngxs/store";
import {IHelloWorldStateModel} from "../api/hello-world-state-model";
import {Injectable} from "@angular/core";
import {UpdateHelloWorldName} from "./hello-world-actions";

const stateToken: StateToken<IHelloWorldStateModel> = new StateToken<IHelloWorldStateModel>("helloWorldState");

@State({
  name: stateToken,
  defaults: {
    name: "Svampbob Fyrkant",
  },
})
@Injectable()
export class HelloWorldState {
  @Action(UpdateHelloWorldName)
  public updateHelloWorldName({patchState}: StateContext<IHelloWorldStateModel>, {name}: UpdateHelloWorldName): void {
    patchState({name});
  }
}
