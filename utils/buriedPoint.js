import { saveBuriedPoint } from './method.js';
import { BURIED_KEY, GAME_SUB, EVENT_SUB, ERROR_SUB } from './constant.js';

export function onGameStart(level) {
  return saveBuriedPoint(BURIED_KEY.GAME, GAME_SUB.START_GAME, { level });
}

export function onGameOver(score, steps, time, level) {
  return saveBuriedPoint(BURIED_KEY.GAME, GAME_SUB.GAME_OVER, {
    score, steps, time, level,
  });
}

export function onGameBreak(env) {
  return saveBuriedPoint(BURIED_KEY.GAME, GAME_SUB.GAME_BREAK, env);
}

export function onShare(page, shareCode, env) {
  return saveBuriedPoint(BURIED_KEY.EVENT, EVENT_SUB.SHARE, {
    page,
    shareCode,
    env,
  });
}

export function onSwitchLevel(oldLevel, newLevel) {
  return saveBuriedPoint(BURIED_KEY.GAME, GAME_SUB.SWITCH_LEVEL, {
    oldLevel,
    newLevel,
  });
}

export function onGotoRank() {
  return saveBuriedPoint(BURIED_KEY.EVENT, EVENT_SUB.OPEN_RANK, {});
}

export function onOpenApp(query) {
  return saveBuriedPoint(BURIED_KEY.EVENT, EVENT_SUB.OPEN_APP, query);
}

export function onCloseApp() {
  return saveBuriedPoint(BURIED_KEY.EVENT, EVENT_SUB.CLOSE_APP, {});
}

export function onError(e) {
  return saveBuriedPoint(BURIED_KEY.ERROR, ERROR_SUB.GLOBAL, {
    error: e,
  });
}
