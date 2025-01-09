import {ChangeDetectionStrategy, Component} from "@angular/core";
import {Observable} from "rxjs";
import {Store} from "@ngxs/store";
import {HelloWorldStateQueries} from "./state/hello-world-queries";
import {AsyncPipe} from "@angular/common";
import {UpdateHelloWorldName} from "./state/hello-world-actions";
import { RouterModule } from '@angular/router';

@Component({
  selector: "app-hello-world",
  standalone: true,
  imports: [AsyncPipe, RouterModule],
  templateUrl: "./hello-world.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelloWorldComponent {
  public name$: Observable<string>;

  constructor(private readonly store: Store) {
    this.name$ = this.store.select(HelloWorldStateQueries.name$);
  }

  public handleNameChange(): void {
    this.store.dispatch(new UpdateHelloWorldName("Patrick Stjärna"));
  }
}
