/**
 * 快捷键管理类
 */
import type { BaseAction } from '../Action/BaseAction'
import { ACTION_CODE } from '../Action/config'

export class HotKeysManager<CTX> {
  // TODO: Map => DestroyMap ?
  private _store = new Map<ACTION_CODE, BaseAction>()

  constructor(public readonly ctx: CTX) {}

  public register(action: BaseAction) {
    const pre = this._store.get(action.id)
    if (pre)
      throw new Error('[HotKeysManager::register] action already registered')
    this._store.set(action.id, action)
  }

  public unregister(actionCode: ACTION_CODE) {
    const action = this._store.get(actionCode)
    if (!action)
      throw new Error('[HotKeysManager::unregister] action not found')
    this._store.delete(actionCode)
  }

  public disabled(ctx: CTX) {
    return false
  }

  public exec(actionCode: ACTION_CODE) {
    if (this.disabled(this.ctx))
      return console.info('[HotKeysManager] disabled')
    const action = this._store.get(actionCode)
    console.info('exec action', actionCode, ACTION_CODE[actionCode])
    if (!action) throw new Error('[HotKeysManager] action not found')
    action.handle(this.ctx)
  }
}
