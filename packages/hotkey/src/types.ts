import type { ACTION_CODE } from './Action/config'

export type HotConfigItem = {
  action: ACTION_CODE
  /**
   * 快捷键列表，允许多个快捷键对应同一个行为
   */
  keys: string[]
  description: string
}
