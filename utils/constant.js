/** 埋点常量（只增不减） */
export const BURIED_KEY = {
  GAME: 0,  // 游戏节点
  EVENT: 1, // 关键事件
  ERROR: 2, // 错误发生
};

export const GAME_SUB = {
  SWITCH_LEVEL: 0, // 切换难度
  START_GAME: 1, // 开始游戏
  GAME_BREAK: 2, // 游戏没有正常结束就终止了
  GAME_OVER: 3,
};

export const EVENT_SUB = {
  OPEN_APP: 0,
  CLOSE_APP: 1,
  OPEN_RANK: 2,
  SHARE: 3, // 分享
};

export const ERROR_SUB = {
  GLOBAL: 0,
};
