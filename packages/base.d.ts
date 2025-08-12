import type { FC as AppFC, PropsWithChildren } from 'react'

type AppFCC<P = object> = AppFC<PropsWithChildren<P>>

declare global {
  type FCC<T = object> = AppFCC<T>
  type FC<T = object> = AppFC<T>

  var __SERVER__: boolean
  var __DEV__: boolean
}
