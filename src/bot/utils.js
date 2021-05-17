/**
 * Utility function to get a deep property value without all the && this && that malarkey
 * 
 * @param {Object} obj the object
 * @param {String} key the deep property key
 * 
 * @return {Object} the deep property value
 */
function get(obj, key) {
  return key.split(".").reduce(function(o, x) {
    return (typeof o == "undefined" || o === null) ? o : o[x];
  }, obj);
}

/**
 * Calls a vote in a text channel.
 * 
 * @param {String} subject The subject to be voted on
 * @param {TextChannel} channel The text channel to run the vote in
 * @param {Object} options Vote options
 * @param {Array} [options.selections] The available selections. Defaults to agree/disagree
 * @param {Number} [options.time] Time to listen for reactions in ms. Defaults to 5 seconds.
 * @param {Array} [options.targetUsers] Users to limit the vote to.
 * 
 */
function vote(subject, channel, options) {
  let {
    selections = [{
      name: 'agree',
      emoji: '✅'
    }, {
      name: 'disagree',
      emoji: '❌'
    }],
    time = 5000,
    targetUsers
  } = options;

  //Alert target users via mentions
  if (targetUsers && targetUsers.length > 0) {
    let mentions = [];

    targetUsers.forEach(user => {
      mentions.push(user.toString());
    });

    subject = mentions.join(' ') + '\n\n' + subject;
  }

  return new Promise((resolve, reject) => {

    channel.send(subject).then(message => {
      let promise = new Promise(resolve => {
        resolve();
      });

      selections.forEach(selection => {
        promise = promise.then(() => {
          return message.react(selection.emoji);
        });
      });

      promise = promise.then(() => {
        //Wait the configured time for user reactions.
        // Only accept requested reactions from targeted users.
        return message.awaitReactions((reaction, user) => {
          let include = selections.findIndex((selection) => {
            return reaction.emoji.name === selection.emoji;
          }) !== -1;

          if (targetUsers && targetUsers.length > 0) {
            include = include && targetUsers.findIndex((targetUser) => {
              return targetUser.id === user.id;
            }) !== -1;
          }

          return include;
        }, {
            time: time
          });
      });

      promise.then(reactions => {
        //Tally reactions, then resolve the vote promise with the results
        let results = {};

        selections.forEach(selection => {
          let reaction = reactions.get(selection.emoji),
            result = {
              count: 0,
              users: []
            };

          if (reaction) {
            reaction.users.forEach(user => {
              result.count++;
              result.users.push(user);
            });
          }

          results[selection.name] = result;
        });

        resolve(results);
      });
    });
  });
}

module.exports = {
  get: get,
  vote: vote
};