const { Command, util: { exec, codeBlock } } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['execute'],
			description: 'Execute commands in the terminal, use with EXTREME CAUTION.',
			guarded: true,
			permissionLevel: 10,
			usage: '<expression:string>'
		});
	}

	async run(message, [input]) {
		const result = await exec(input, { timeout: 'timeout' in message.flags ? Number(message.flags.timeout) : 60000 })
			.catch(error => ({ stdout: null, stderr: error }));
		const output = result.stdout ? `**\`OUTPUT\`**${codeBlock('prolog', result.stdout)}` : '';
		const outerr = result.stderr ? `**\`ERROR\`**${codeBlock('prolog', result.stderr)}` : '';

		return message.sendMessage([output, outerr].join('\n'));
	}

};
