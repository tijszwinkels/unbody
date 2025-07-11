import { PluginTypes } from 'src/lib/plugins-common'
import { GenerativePlugin } from 'src/lib/plugins-common/generative'
import { PluginResources } from '../resources/PluginResources'
import { LoadedPlugin } from '../shared.types'
import {
  PluginInstance,
  PluginInstanceBaseConfig,
  PluginInstanceMethods,
} from './PluginInstance'

export type GenerativePluginInstanceConfig = PluginInstanceBaseConfig & {}

export class GenerativePluginInstance extends PluginInstance<GenerativePluginInstanceConfig> {
  static methods: Array<keyof GenerativePlugin> = [
    'generateText',
    'getSupportedModels',
  ]

  constructor(
    protected override plugin: LoadedPlugin,
    protected override config: GenerativePluginInstanceConfig,
    protected override resources: PluginResources,
  ) {
    super(config, plugin, resources, GenerativePluginInstance.methods)
  }

  override get type() {
    return this.plugin.manifest.type as typeof PluginTypes.Generative
  }

  async getDefaultOptions() {
    return this.plugin.runner.config.pluginConfig.options || {}
  }
}

export interface GenerativePluginInstance
  extends PluginInstanceMethods<GenerativePlugin> {}
