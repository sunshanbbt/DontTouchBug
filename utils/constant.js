/** 埋点常量（只增不减） */
export const BURIED_KEY = {
  GAME: 0,
  EVENT: 1,
  ERROR: 2,
};

export const BURIED_SUB = {
  SWITCH_LEVEL: 0, // 切换难度
  START_GAME: 1, // 开始游戏
  GAME_BREAK: 2, // 游戏没有正常结束就终止了
  GAME_OVER: 3,
  SHARE: 4, // 分享
};
