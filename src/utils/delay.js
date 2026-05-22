// Shared delay helpers for automation timing.
function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getActionDelay() {
  return getRandomDelay(CONFIG.delays.actionMin, CONFIG.delays.actionMax);
}

function getAfterConfirmDelay() {
  return getRandomDelay(CONFIG.delays.afterConfirmMin, CONFIG.delays.afterConfirmMax);
}

function getAutomationDelay(step, isBanana = false) {
  const configSource = isBanana ? CONFIG.bananaAutomation : CONFIG.automation;
  const stepConfig = configSource[step];
  if (stepConfig) {
    return getRandomDelay(stepConfig.min, stepConfig.max);
  }
  return 2000;
}
