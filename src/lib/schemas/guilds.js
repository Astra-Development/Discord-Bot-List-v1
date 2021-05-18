const { Client } = require('klasa');

Client.defaultGuildSchema
  .add('autoAssignRole', 'role')
  .add('customCommands', 'any', { array: true, configurable: false })
  .add('roles', folder => folder.add('muted', 'role'));
