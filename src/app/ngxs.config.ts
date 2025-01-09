import { NgxsModuleOptions, NoopNgxsExecutionStrategy } from "@ngxs/store";
import { environment } from "../environments/environment";

export const ngxsConfig: NgxsModuleOptions = {
  developmentMode: !environment.production,
  selectorOptions: {
    suppressErrors: false,
  },
  compatibility: {
    strictContentSecurityPolicy: true,
  },
  executionStrategy: NoopNgxsExecutionStrategy,
};