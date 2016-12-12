require('./helpers').getFile(10, input => {
  const agents = {};

//   input = `value 5 goes to bot 2
// bot 2 gives low to bot 1 and high to bot 0
// value 3 goes to bot 1
// bot 1 gives low to output 1 and high to bot 0
// bot 0 gives low to output 2 and high to output 0
// value 2 goes to bot 2`;

  function init(id, type) {
    const i = `${id}-${type}`;
    if (!agents[i]) { agents[i] = { id, type, rules: [], values: [], matches: [] }; }
  }

  input.split('\n').map(line => {
    // Get instruction info
    if (line[0] == 'v') {
      [match, value, botId] = line.match(/value (\d+) goes to bot (\d+)/);
      init(botId, 'bot');
      agents[`${botId}-bot`].values.push(+value);
    } else {
      [match, botId, lowSubject, lowId, highSubject, highId] = line.match(/bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)/);
      init(botId, 'bot');
      init(lowId, lowSubject);
      init(highId, highSubject);
      if (!agents[`${botId}-bot`]) {
        console.log(`Bot ${botId} never got a value. Unable to give low to ${lowSubject} ${lowId} or high to ${highSubject} ${highId}`);
      } else {
        agents[`${botId}-bot`].rules.push({ low: `${lowId}-${lowSubject}`, high: `${highId}-${highSubject}`})
      }
    }
  });

  function process() {
    let actionCount = 0;
    for (agentId in agents) {

      const agent = agents[agentId];
      if (agent.values.length > 1 && agent.type == 'bot') {
        const lowAgent = agents[agent.rules[0].low];
        //console.log(`Passing ${Math.min.apply(this, agent.values)} from ${agent.type} ${agent.id} to ${lowAgent.type} ${lowAgent.id}`);
        lowAgent.values.push(Math.min.apply(this, agent.values));

        const highAgent = agents[agent.rules[0].high];
        //console.log(`Passing ${Math.max.apply(this, agent.values)} from ${agent.type} ${agent.id} to ${highAgent.type} ${highAgent.id}`);
        highAgent.values.push(Math.max.apply(this, agent.values));

        agent.matches.push(agent.values);
        agent.values = [];
        actionCount++;
      }
    }

    if (actionCount) {
      process();
    }
  }

  process();

  function containsMatch(agent, first, second) {
    return agent.matches.filter(match => {
      return (match[0] == first && match[1] == second) || (match[1] == first && match[0] == second);
    }).length > 0;
  }

  let found = false;
  for (id in agents) {
    found = containsMatch(agents[id], 61, 17);
    if (found) {
      console.log('Bot that passes 61 and 17: ', agents[id].id);
      // 113
      break;
    }
  }

  function outputVal(i) {
    return agents[`${i}-output`].values[0];
  }
  console.log('First three outputs multiplied: ', outputVal(0) * outputVal(1) * outputVal(2));
  // 12803
});
