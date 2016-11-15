import {
  Provider,
  Injector,
  ClassFactoryProvider,
} from "@tandem/common";
import { IDispatcher } from "@tandem/mesh";

export class ApplicationServiceProvider<T extends  IDispatcher<any, any>> extends ClassFactoryProvider {

  static readonly NS = "services";

  constructor(name: string, value: { new(): T }) {
    super(ApplicationServiceProvider.getId(name), value);
  }

  static getId(name: string) {
    return [this.NS, name].join("/");
  }

  create(): T {
    return super.create();
  }

  static findAll(injector: Injector) {
    return injector.queryAll<ApplicationServiceProvider<any>>(this.getId("**"));
  }
}

/**
 * The application configuration dependency
 */

export class ApplicationConfigurationProvider<T> extends Provider<T> {
  static ID: string = "config";
  constructor(value: T) {
    super(ApplicationConfigurationProvider.ID, value);
  }
}
