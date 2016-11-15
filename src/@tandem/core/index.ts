import { Application } from "@tandem/common";
import { ApplicationServiceProvider, ApplicationConfigurationProvider } from "./providers";

import {
  BrokerBus,
  Injector,
  PublicBusProvider,
  PrivateBusProvider,
  ProtectedBusProvider,
  InjectorProvider,
  registerableProviderType,
} from "@tandem/common";

import { SequenceBus } from "@tandem/mesh";

import {
  IFileSystem,
  IFileResolver,
  LocalFileSystem,
  RemoteFileSystem,
  LocalFileResolver,
  RemoteFileResolver,
  createSandboxProviders,
} from "@tandem/sandbox";

// TODO - possibly move these to @tandem/core since this configuration is
// required by *all* packages that use the application bus
function createBusProviders() {

  // Notice the bubbling action here. Actions dispatched on the private bus will
  // make its way to the public bus. However, actions also have access levels. If an action
  // invoked against the public bus is not also public, then the action will never reach the outside world.

  // The levels here are mainly intented to expose layers of the application that are publicly accessible
  // to outside resources. The public bus is intented for public APIs, and is accessible to anyone, The protected bus is
  // available to trusted resources such as workers, databases, and other services. The private bus is reserved for internal
  // communication including things such as application loading, initialization, rendering (browser), and other actions
  // that are useless to both public, and protected actors.

  const publicBus    = new BrokerBus(SequenceBus);
  const protectedBus = new BrokerBus(SequenceBus, publicBus);
  const privateBus   = new BrokerBus(SequenceBus, protectedBus);

  return new Injector(
    new PublicBusProvider(publicBus),
    new ProtectedBusProvider(protectedBus),
    new PrivateBusProvider(privateBus),
  );
}

export function createCoreApplicationProviders(config: any, fileSystemClass?: { new(): IFileSystem }, fileResolverClass?: { new(): IFileResolver }) {
  return new Injector(
    createBusProviders(),
    new InjectorProvider(),
    new ApplicationConfigurationProvider(config),
    createSandboxProviders(fileSystemClass, fileResolverClass),
  );
}

export class ServiceApplication extends Application {
  willLoad() {
    super.willLoad();

    // create the services before loading so that they can hook themselves into the application
    // context.
    for (const serviceProvider of ApplicationServiceProvider.findAll(this.injector)) {
      serviceProvider.create();
    }
  }
}

export * from "./providers";
export * from "./services";