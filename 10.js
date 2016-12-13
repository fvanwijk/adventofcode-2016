require('./helpers').getFile(10, input => {
  function get(list, id) {
    return list.filter(n => n.id == id)[0];
  }
  function getValues(bot) {
    return get(bot.type == 'bot' ? bots : outputs, bot.id).values;
  }
  function outputVal(i) {
    return get(outputs, i).values[0];
  }

  // Init
  function init(t) {
    return n => ({
      id: n.slice(t),
      values: []
    });
  }
  const bots = input.match(/bot \d+/g).map(init(4));
  const outputs = input.match(/output \d+/g).map(init(7));
  let botWith61And17;

  input.split('\n').map(line => {
    // Save all instructions
    if (line[0] == 'v') {
      [match, value, botId] = line.match(/value (\d+) goes to bot (\d+)/);
      get(bots, botId).values.push(+value);
    } else {
      [match, botId, lowSubject, lowId, highSubject, highId] = line.match(/bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)/);
      get(bots, botId).low = { id: lowId, type: lowSubject };
      get(bots, botId).high = { id: highId, type: highSubject };
    }
  });

  function process() {
    isStable = true;

    bots.forEach(bot => {
      if (bot.values.length > 1) {
        getValues(bot.low).push(Math.min.apply(this, bot.values));
        getValues(bot.high).push(Math.max.apply(this, bot.values));

        if (bot.values.some(x => x == 61) && bot.values.some(x => x == 17)) {
          botWith61And17 = bot;
        }

        bot.values = [];
        isStable = false;
      }
    });
  }

  let isStable = false;
  while (!isStable) {
    process();
  }

  console.log('Bot that passes 61 and 17: ', botWith61And17.id);
  // 113

  console.log('First three outputs multiplied: ', outputVal(0) * outputVal(1) * outputVal(2));
  // 12803
});
