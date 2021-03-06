const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = (n = 0) => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 休闲、挑战、自虐
const LEVEL_BASE = [50, 300, 600, 1000];
const RADIO_BASE = [0, 0.2, 0.5, 1];

function getStepRadio(steps, level) {
  let radio_base = RADIO_BASE[level];
  if (steps < 50) {
    return radio_base + 2;
  } else if (steps < 100) {
    return radio_base + 1.5;
  } else if (steps < 150) {
    return radio_base + 1;
  } else if (steps < 200) {
    return radio_base + 0.8;
  }
  return radio_base + 0.5;
}

const calcScore = (minite, second, steps, level) => {
  try {
    // 等级基数 / 每步耗时
    const cost = 60 * minite + second;
    const costPerStep = cost / steps;
    // 0.2s以内分数不再提高（能达到0.2秒一步的，应该没多少人吧）
    return Math.round(getStepRadio(steps, level) * LEVEL_BASE[level] / Math.max(costPerStep, 0.2)) || 0;
  } catch (e) {
    return 0;
  }
}

const SCORE_LEVEL_MESSAGE = [
  '原来我的记忆力那么弱鸡',
  '听说鱼的记忆只有7秒钟，我的恐怕只有1秒吧',
  '我打开了记忆的盒子，里面竟然有这么多bug',
];
const getShareMessage = (score) => {
  score = wx.getStorageSync('lastScore') || 0;
  const score_level = parseInt(score / 200, 0);
  return SCORE_LEVEL_MESSAGE[score_level] || '高处不胜寒，见过面就不遗忘';
}

module.exports = {
  formatTime: formatTime,
  formatNumber,
  calcScore,
  getShareMessage,
}
