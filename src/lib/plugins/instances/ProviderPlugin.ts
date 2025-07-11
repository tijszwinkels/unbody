import { PluginTypes } from 'src/lib/plugins-common'
import {
  ProviderPlugin,
  ProviderPluginContext,
} from 'src/lib/plugins-common/provider'
import { PluginResources } from '../resources/PluginResources'
import { LoadedPlugin } from '../shared.types'
import {
  PluginInstance,
  PluginInstanceBaseConfig,
  PluginInstanceMethods,
} from './PluginInstance'

export type ProviderPluginInstanceConfig = PluginInstanceBaseConfig & {
  source?: ProviderPluginContext['source']
}

export class ProviderPluginInstance extends PluginInstance<ProviderPluginInstanceConfig> {
  static methods: Array<keyof ProviderPlugin> = [
    'listEntrypointOptions',
    'handleEntrypointUpdate',
    'validateEntrypoint',
    'connect',
    'verifyConnection',
    'initSource',
    'handleSourceUpdate',
    'getRecordMetadata',
    'getRecord',
    'processRecord',
    'registerObserver',
    'unregisterObserver',
  ]

  constructor(
    protected override plugin: LoadedPlugin,
    protected override config: ProviderPluginInstanceConfig,
    protected override resources: PluginResources,
  ) {
    super(config, plugin, resources, ProviderPluginInstance.methods)
  }

  protected override _runTask = <
    T extends Record<string, any> = Record<string, any>,
    R extends Record<string, any> = Record<string, any>,
  >(
    task: string,
    context: any,
    params: T,
  ) => {
    return this.plugin.runner.runTask<T, R>(
      task,
      { ...context, source: this.config.source },
      params,
    )
  }

  override get type() {
    return this.plugin.manifest.type as typeof PluginTypes.Provider
  }
}

export interface ProviderPluginInstance
  extends PluginInstanceMethods<ProviderPlugin> {}
