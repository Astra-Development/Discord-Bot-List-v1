const { Command, Stopwatch, Type, util } = require('klasa');
const { inspect } = require('util');
const fetch = require('node-fetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['ev'],
			description: (language) => language.get('COMMAND_EVAL_DESCRIPTION'),
			extendedHelp: (language) => language.get('COMMAND_EVAL_EXTENDED'),
			guarded: true,
			permissionLevel: 10,
			usage: '<expression:str>'
		});

		this.timeout = 30000;
	}

	async run(message, [code]) {
		const flagTime = 'no-timeout' in message.flags ? 'wait' in message.flags ? Number(message.flags.wait) : this.timeout : Infinity;
		const language = message.flags.lang || message.flags.language || (message.flags.json ? 'json' : 'js');
		const { success, result, time, type } = await this.timedEval(message, code, flagTime);

		if (message.flags.silent) {
			if (!success && result && result.stack) this.client.emit('error', result.stack);
			return null;
		}

		const footer = util.codeBlock('ts', type);
		const sendAs = message.flags.output || message.flags['output-to'] || (message.flags.log ? 'log' : null);
		return this.handleMessage(message, { sendAs, hastebinUnavailable: false, url: null }, { success, result, time, footer, language });
	}

	async handleMessage(message, options, { success, result, time, footer, language }) {
		switch (options.sendAs) {
			case 'file': {
				if (message.channel.attachable) return message.channel.sendFile(Buffer.from(result), 'output.txt', message.language.get('COMMAND_EVAL_OUTPUT_FILE', time, footer));
				await this.getTypeOutput(message, options);
				return this.handleMessage(message, options, { success, result, time, footer, language });
			}
			case 'haste':
			case 'hastebin': {
				if (!options.url) options.url = await this.getHaste(result, language).catch(() => null);
				if (options.url) return message.sendMessage(message.language.get('COMMAND_EVAL_OUTPUT_HASTEBIN', time, options.url, footer));
				options.hastebinUnavailable = true;
				await this.getTypeOutput(message, options);
				return this.handleMessage(message, options, { success, result, time, footer, language });
			}
			case 'console':
			case 'log': {
				this.client.emit('log', result);
				return message.sendMessage(message.language.get('COMMAND_EVAL_OUTPUT_CONSOLE', time, footer));
			}
			case 'none':
				return null;
			default: {
				if (result.length > 2000) {
					await this.getTypeOutput(message, options);
					return this.handleMessage(message, options, { success, result, time, footer, language });
				}
				return message.sendMessage(message.language.get(success ? 'COMMAND_EVAL_OUTPUT' : 'COMMAND_EVAL_ERROR',
					time, util.codeBlock(language, result), footer));
			}
		}
	}

	async getTypeOutput(message, options) {
		const _options = ['log'];
		if (message.channel.attachable) _options.push('file');
		if (!options.hastebinUnavailable) _options.push('hastebin');
		let _choice;
		do {
			_choice = await message.prompt(`Choose one of the following options: ${_options.join(', ')}`).catch(() => ({ content: 'none' }));
		} while (!['file', 'haste', 'hastebin', 'console', 'log', 'default', 'none', null].includes(_choice.content));
		options.sendAs = _choice.content;
	}

	timedEval(message, code, flagTime) {
		if (flagTime === Infinity || flagTime === 0) return this.eval(message, code);
		return Promise.race([
			util.sleep(flagTime).then(() => ({
				success: false,
				result: message.language.get('COMMAND_EVAL_TIMEOUT', flagTime / 1000),
				time: '⏱ ...',
				type: 'EvalTimeoutError'
			})),
			this.eval(message, code)
		]);
	}

	// Eval the input
	async eval(message, code) {
		const stopwatch = new Stopwatch();
		let success, syncTime, asyncTime, result;
		let thenable = false;
		let type;
		try {
			if (message.flags.async) code = `(async () => {\n${code}\n})();`;
			result = eval(code);
			syncTime = stopwatch.toString();
			type = new Type(result);
			if (util.isThenable(result)) {
				thenable = true;
				stopwatch.restart();
				result = await result;
				asyncTime = stopwatch.toString();
			}
			success = true;
		} catch (error) {
			if (!syncTime) syncTime = stopwatch.toString();
			if (thenable && !asyncTime) asyncTime = stopwatch.toString();
			if (!type) type = new Type(error);
			result = error;
			success = false;
		}

		stopwatch.stop();
		if (typeof result !== 'string') {
			result = result instanceof Error ? result.stack : message.flags.json ? JSON.stringify(result, null, 4) : inspect(result, {
				depth: message.flags.depth ? parseInt(message.flags.depth) || 0 : 0,
				showHidden: Boolean(message.flags.showHidden)
			});
		}
		return { success, type, time: this.formatTime(syncTime, asyncTime), result: util.clean(result) };
	}

	formatTime(syncTime, asyncTime) {
		return asyncTime ? `⏱ ${asyncTime}<${syncTime}>` : `⏱ ${syncTime}`;
	}

	async getHaste(evalResult, language) {
		const key = await fetch('https://hastebin.com/documents', { method: 'POST', body: evalResult })
			.then(response => response.json())
			.then(body => body.key);
		return `https://hastebin.com/${key}.${language}`;
	}

};

/**
	The eval command evaluates code as-in, any error thrown from it will be handled.
	It also uses the flags feature. Write --silent, --depth=number or --async to customize the output.
	The --wait flag changes the time the eval will run. Defaults to 10 seconds. Accepts time in milliseconds.
	The --output and --output-to flag accept either 'file', 'log', 'haste' or 'hastebin'.
	The --delete flag makes the command delete the message that executed the message after evaluation.
	The --silent flag will make it output nothing.
	The --depth flag accepts a number, for example, --depth=2, to customize util.inspect's depth.
	The --async flag will wrap the code into an async function where you can enjoy the use of await, however, if you want to return something, you will need the return keyword
	The --showHidden flag will enable the showHidden option in util.inspect.
	The --lang and --language flags allow different syntax highlight for the output.
	The --json flag converts the output to json
	The --no-timeout flag disables the timeout
	If the output is too large, it'll send the output as a file, or in the console if the bot does not have the ATTACH_FILES permission.
 */

/**
	COMMAND_EVAL_TIMEOUT: (seconds) => `TIMEOUT: Took longer than ${seconds} seconds.`,
	COMMAND_EVAL_ERROR: (time, output, type) => `**Error**:${output}\n**Type**:${type}\n${time}`,
	COMMAND_EVAL_OUTPUT: (time, output, type) => `**Output**:${output}\n**Type**:${type}\n${time}`,
	COMMAND_EVAL_OUTPUT_CONSOLE: (time, type) => `Sent the result to console.\n**Type**:${type}\n${time}`,
	COMMAND_EVAL_OUTPUT_FILE: (time, type) => `Sent the result as a file.\n**Type**:${type}\n${time}`,
	COMMAND_EVAL_OUTPUT_HASTEBIN: (time, url, type) => `Sent the result to hastebin: ${url}\n**Type**:${type}\n${time}\n`
*/
