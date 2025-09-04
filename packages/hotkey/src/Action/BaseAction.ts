/**
 * 基础行为类
 */
import type { ACTION_CODE } from './config'

/**
 * 对快捷键触发的行为进行描述
 * 并根据管理者提供的上下文对快捷键的执行条件进行判断
 */
export abstract class BaseAction {
  abstract readonly id: ACTION_CODE

  constructor() {}

  public disabled(_ctx: any) {
    return false
  }

  public abstract handle(_ctx: any): void
}
