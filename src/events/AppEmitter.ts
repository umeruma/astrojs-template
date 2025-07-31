/**
 * 型チェックできるイベントエミッタ
 * https://github.com/andywer/typed-emitter
 */

import { EventEmitter } from 'events'
import type TypedEmitter from 'typed-emitter'

// イベント名とリスナーの型を定義する
// Key: Event name; Value: Listener function signature
type AppEvents = {
  /**
   *
   */
  load_anim_end: () => void
}

export const AppEmitter = new EventEmitter() as TypedEmitter<AppEvents>

AppEmitter.setMaxListeners(50)
