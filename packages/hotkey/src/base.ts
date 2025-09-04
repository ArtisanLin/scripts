import { ACTION_CODE } from './Action/config'
import type { HotConfigItem } from './types'

const mockConfig: HotConfigItem[] = [
  {
    action: ACTION_CODE.TEST_COPY,
    keys: ['Shift+Tab'],
    description: '【上一个标注结果】',
  },
]

const resolveHotKeyConfig = (config: HotConfigItem[]) => {}

resolveHotKeyConfig(mockConfig)
