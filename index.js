const alfy = require('alfy');
const runApplescript = require('run-applescript');

const run = async () => {
  const input = alfy.input;
  if (typeof input !== 'string') return;

  const args = input.split(/\s+/);
  const [delay, message] = args;
  if (delay && message) {
    let seconds = delay;
    const unit = delay.substr(-1);
    if (isNaN(parseInt(unit))) {
      const value = delay.substr(0, delay.length - 1);
      switch (unit.toLowerCase()) {
      case 's':
      seconds = value;
      break;
      case 'm':
      seconds = value * 60;
      break;
      case 'h':
      seconds = value * 60 * 60;
      break;
      default:
      seconds = value;
    }
  }
    
  setTimeout(async () => {
    await runApplescript﻿(`
      set alertReply to display alert "Time's up (${delay})" message "${message}" buttons ["OK"] default button 1 giving up after 5
      if button returned of alertReply is equal to "OK" then
        # tell application "Chrome"
        #   activate
          
        # end tell
      end if
    `);
  }, seconds * 1000);
  }
}

run()
