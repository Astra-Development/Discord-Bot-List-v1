/*
MIT License

Copyright (c) 2017-2018 dirigeants

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

const { Language, util } = require('klasa');

module.exports = class extends Language {

	constructor(...args) {
		super(...args);
		this.language = {
			DEFAULT: (key) => `${key} n'a pas encore été traduit en 'fr-FR'.`,
			DEFAULT_LANGUAGE: 'Langue par défaut',
			SETTING_GATEWAY_EXPECTS_GUILD: 'Le paramètre <Guild> attend soit un identifiant soit une instance de serveur.',
			SETTING_GATEWAY_VALUE_FOR_KEY_NOEXT: (data, key) => `La valeur '${data}' pour la clef '${key}' n'existe pas.`,
			SETTING_GATEWAY_VALUE_FOR_KEY_ALREXT: (data, key) => `La valeur '${data}' pour la clef '${key}' existe déjà.`,
			SETTING_GATEWAY_SPECIFY_VALUE: 'Vous devez spécifier une clef pour ajouter ou filtrer.',
			SETTING_GATEWAY_KEY_NOT_ARRAY: (key) => `La clef '${key}' n'est pas une matrice.`,
			SETTING_GATEWAY_KEY_NOEXT: (key) => `La clef '${key}' n'existe pas dans le schema de données actuel.`,
			SETTING_GATEWAY_INVALID_TYPE: 'Le paramètre \'type\' doit être soit \'add\' ou \'remove\'.',
			RESOLVER_INVALID_PIECE: (name, piece) => `${name} doit être un nom de ${piece} valide.`,
			RESOLVER_INVALID_MESSAGE: (name) => `${name} doit être un identifiant de message valide.`,
			RESOLVER_INVALID_USER: (name) => `${name} doit être une mention ou un identifiant d'utilisateur valide.`,
			RESOLVER_INVALID_MEMBER: (name) => `${name} doit être une mention ou un identifiant d'utilisateur valide.`,
			RESOLVER_INVALID_CHANNEL: (name) => `${name} doit être un tag ou un identifiant de salon valide.`,
			RESOLVER_INVALID_EMOJI: (name) => `${name} doit être un tag d'émoji personnalisé ou un identifiant d'émoji valide.`,
			RESOLVER_INVALID_GUILD: (name) => `${name} doit être un identifiant de serveur valide.`,
			RESOLVER_INVALID_ROLE: (name) => `${name} doit être une mention ou un identifiant de rôle.`,
			RESOLVER_INVALID_LITERAL: (name) => `Votre option ne correspond pas à la seule possibilité : ${name}`,
			RESOLVER_INVALID_BOOL: (name) => `${name} doit être vrai ou faux.`,
			RESOLVER_INVALID_INT: (name) => `${name} doit être un entier.`,
			RESOLVER_INVALID_FLOAT: (name) => `${name} doit être un nombre valide.`,
			RESOLVER_INVALID_REGEX_MATCH: (name, pattern) => `${name} doit respecter ce motif regex \`${pattern}\`.`,
			RESOLVER_INVALID_URL: (name) => `${name} doit être une url valide.`,
			RESOLVER_INVALID_DATE: (name) => `${name} doit être une date valide.`,
			RESOLVER_INVALID_DURATION: (name) => `${name} doit être une chaîne de caractères de durée valide.`,
			RESOLVER_INVALID_TIME: (name) => `${name} doit être une chaîne de caractères de durée ou de date valide.`,
			RESOLVER_STRING_SUFFIX: ' caractères',
			RESOLVER_MINMAX_EXACTLY: (name, min, suffix) => `${name} doit être exactement ${min}${suffix}.`,
			RESOLVER_MINMAX_BOTH: (name, min, max, suffix) => `${name} doit être entre ${min} et ${max}${suffix}.`,
			RESOLVER_MINMAX_MIN: (name, min, suffix) => `${name} doit être plus grand que ${min}${suffix}.`,
			RESOLVER_MINMAX_MAX: (name, max, suffix) => `${name} doit être plus petit que ${max}${suffix}.`,
			COMMANDMESSAGE_MISSING: 'Il manque au moins un argument à la fin de l\'entrée.',
			COMMANDMESSAGE_MISSING_REQUIRED: (name) => `${name} est un argument requis.`,
			COMMANDMESSAGE_MISSING_OPTIONALS: (possibles) => `Il manque une option requise : (${possibles})`,
			COMMANDMESSAGE_NOMATCH: (possibles) => `Votre option ne correspond à aucune des possibilités : (${possibles})`,
			// eslint-disable-next-line max-len
			MONITOR_COMMAND_HANDLER_REPROMPT: (tag, error, time) => `${tag} | **${error}** | Vous avez **${time}** secondes pour répondre à ce message avec un argument valide. Tapez **"ABORT"** pour annuler ce message.`,
			MONITOR_COMMAND_HANDLER_REPEATING_REPROMPT: (tag, name, time) => `${tag} | **${name}** est un argument répétitif | Vous avez **${time}** secondes pour répondre à ce message avec des arguments additionnels valides. Saisissez **"CANCEL"** pour annuler.`, // eslint-disable-line max-len
			MONITOR_COMMAND_HANDLER_ABORTED: 'Annulé',
			INHIBITOR_COOLDOWN: (remaining) => `Vous venez d'utiliser cette commande. Vous pourrez à nouveau utiliser cette commande dans ${remaining} secondes.`,
			INHIBITOR_DISABLED: 'Cette commande est actuellement désactivée',
			INHIBITOR_MISSING_BOT_PERMS: (missing) => `Permissions insuffisantes, il manque : **${missing}**`,
			INHIBITOR_NSFW: 'Vous ne pouvez pas utiliser de commande NSFW dans ce salon.',
			INHIBITOR_PERMISSIONS: 'Vous n\'avez pas la permission d\'utiliser cette commmande',
			// eslint-disable-next-line max-len
			INHIBITOR_REQUIRED_SETTINGS: (settings) => `Votre serveur n'a pas le${settings.length > 1 ? 's' : ''} paramètre${settings.length > 1 ? 's' : ''} **${settings.join(', ')}** et ne peux pas s'exécuter.`,
			INHIBITOR_RUNIN: (types) => `Cette commande est uniquement disponible dans les salons ${types}`,
			INHIBITOR_RUNIN_NONE: (name) => `La commande ${name} n'est pas configurée pour s'exécuter dans un salon.`,
			COMMAND_BLACKLIST_DESCRIPTION: 'Ajoute ou retire des utilisateurs et des guildes sur la liste noire du bot.',
			COMMAND_BLACKLIST_SUCCESS: (usersAdded, usersRemoved, guildsAdded, guildsRemoved) => [
				usersAdded.length ? `**Utilisateurs Ajoutés**\n${util.codeBlock('', usersAdded.join(', '))}` : '',
				usersRemoved.length ? `**Utilisateurs Retirés**\n${util.codeBlock('', usersRemoved.join(', '))}` : '',
				guildsAdded.length ? `**Guildes Ajoutées**\n${util.codeBlock('', guildsAdded.join(', '))}` : '',
				guildsRemoved.length ? `**Guildes Retirées**\n${util.codeBlock('', guildsRemoved.join(', '))}` : ''
			].filter(val => val !== '').join('\n'),
			COMMAND_EVAL_DESCRIPTION: 'Evalue du Javascript arbitraire. Reservé aux propriétaires du bot.',
			COMMAND_EVAL_EXTENDEDHELP: [
				'La commande eval évalue du code tel quel, toute erreur en résultant sera géré.',
				'Elle utilise également les flags. Écrivez --silent, --depth=number ou --async pour personnaliser le résultat.',
				'Le flag --silent la fera ne rien afficher.',
				'Le flag --depth accèpte un nombre, par exemple, --depth=2, pour personnaliser la profondeur d\'util.inspect.',
				'Le flag --async englobera le code dans une fonction async où vous pourrez profiter de l\'usage du await, à noter que si vous voulez que le code retourner quelque chose, vous aurez besoin d\'utiliser le mot-clef return', // eslint-disable-line max-len
				'Le flag --showHidden autorisera l\'option showHidden d\'util.inspect.',
				'Si le résultat est trop large, il l\'affichera dans un fichier, ou dans la console si le bot n\'a pas la permission ATTACH_FILES.'
			].join('\n'),
			COMMAND_EVAL_ERROR: (time, output, type) => `**Erreur**:${output}\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_OUTPUT: (time, output, type) => `**Résultat**:${output}\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_SENDFILE: (time, type) => `Le résultat état trop long... le résultat a été envoyé dans un fichier.\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_SENDCONSOLE: (time, type) => `Le résultat était trop long... le résultat a été affiché dans la console.\n**Type**:${type}\n${time}`,
			COMMAND_UNLOAD: (type, name) => `✅ ${util.toTitleCase(this.piece(type))} déchargé${this.isFeminine(type) ? 'e' : ''} : ${name}`,
			COMMAND_UNLOAD_DESCRIPTION: 'Décharge le composant.',
			COMMAND_TRANSFER_ERROR: '❌ Ce fichier a déjà été transféré ou n\'a jamais existé.',
			COMMAND_TRANSFER_SUCCESS: (type, name) => `✅ ${util.toTitleCase(this.piece(type))} transféré${this.isFeminine(type) ? 'e' : ''} avec succès : ${name}`,
			COMMAND_TRANSFER_FAILED: (type, name) => `Le transfert de ${this.piece(type)} : ${name} au Client a échoué. Veuillez vérifier votre Console.`,
			COMMAND_TRANSFER_DESCRIPTION: 'Transfert un composant du noyau dans son dossier respectif',
			COMMAND_RELOAD: (type, name) => `✅ ${util.toTitleCase(this.piece(type))} rechargé${this.isFeminine(type) ? 'e' : ''} : ${name}`,
			COMMAND_RELOAD_ALL: (type) => `✅ Tou${this.isFeminine(type) ? 'te' : ''}s les ${this.piece(type)} ont été rechargé${this.isFeminine(type) ? 'e' : ''}s.`,
			COMMAND_RELOAD_DESCRIPTION: 'Recharge un composant, ou tous les composants d\'un cache.',
			COMMAND_REBOOT: 'Redémarrage...',
			COMMAND_REBOOT_DESCRIPTION: 'Redémarre le bot.',
			COMMAND_LOAD: (time, type, name) => `✅ ${util.toTitleCase(this.piece(type))} chargé${this.isFeminine(type) ? 'e' : ''} avec succès : ${name}. (Temps: ${time})`,
			COMMAND_LOAD_FAIL: 'Le fichier n\'existe pas, ou une erreur s\'est produite lors du chargement. Veuillez vérifier votre console.',
			COMMAND_LOAD_ERROR: (type, name, error) => `❌ Échec lors du chargement de ${this.piece(type)}: ${name}. Raison : ${util.codeBlock('js', error)}`,
			COMMAND_LOAD_DESCRIPTION: 'Charge un composant de votre bot.',
			COMMAND_PING: 'Ping ?',
			COMMAND_PING_DESCRIPTION: 'Exécute un test de connexion à Discord.',
			COMMAND_PINGPONG: (diff, ping) => `Pong ! (L'aller-retour a pris : ${diff}ms. Pulsation : ${ping}ms.)`,
			COMMAND_INVITE_SELFBOT: 'Pourquoi auriez-vous besoin d\'un lien d\'invitation pour un selfbot...',
			COMMAND_INVITE: (client) => [
				`Pour ajouter ${client.user.username} à votre serveur discord :`,
				client.invite,
				util.codeBlock('', [
					'Le lien ci-dessus est généré de façon à demander le minimum de permissions requises pour utiliser toutes les commandes.',
					'Je sais que toutes les permissions ne sont pas désirées pour tous les serveurs, donc n\'ayez pas peur de décocher des cases.',
					'Si vous essayez d\'utiliser une commande nécéssitant plus de permissions que celles que vous avez accordées au bot, il vous le fera savoir'
				].join(' ')),
				'Veuillez soumettre un problème à <https://github.com/dirigeants/klasa> si vous trouvez un bug.'
			],
			COMMAND_INVITE_DESCRIPTION: 'Affiche le lien d\'invitation du bot.',
			COMMAND_INFO: [
				"Klasa est un framework 'plug-and-play' qui étend la librairie Discord.js.",
				'Une grande partie du code est modularisée, ce qui permet aux développeurs de modifier Klasa pour répondre à leurs besoins.',
				'',
				'Les fonctionnalités de Klasa comprennent :',
				'• 🐇💨 Temps de chargement rapide avec le support de l\'ES2017 (`async`/`await`)',
				'• 🎚🎛 Paramètres par serveur, qui peuvent être étendus avec votre propre code',
				'• 💬 Système de commandes personnalisable avec l\'analyse automatique de l\'usage ainsi qu\'un téléchargement et rechargement de modules faciles à utiliser',
				'• 👀 "Moniteurs" qui peuvent observer et agir sur les messages, comme un évenement message normal (Filtre à Injures, Spam Protection, etc)',
				'• ⛔ "Inhibiteurs" qui peuvent empêcher l\'exécution d\'une commande en fonction de paramètres (Permissions, Blacklists, etc)',
				'• 🗄 "Fournisseurs" qui vous permettent de vous connecter à une base de données externe de votre choix.',
				'• ✅ "Finaliseurs" qui s\'exécutent après une commande réussie.',
				'• ➕ "Extendables", code qui agit passivement. Ils ajoutent des propriétés et des méthodes aux classes existantes de Discord.js.',
				'• 🌐 "Langages", qui vous permettent de localiser votre bot.',
				'• ⏲ "Tâches", qui peuvent être planifiées pour s\'exécuter dans le futur, potentiellement de manière récurrente.',
				'',
				'Nous aspirons à être un framework personnalisable à 100% pour répondre à tous les publics. Nous faisons de fréquentes mises-à-jour et corrections de bugs.',
				'Si vous vous intéressez à nous, consultez notre site https://klasa.js.org'
			],
			COMMAND_INFO_DESCRIPTION: 'Fournit des informations à propos du bot.',
			COMMAND_HELP_DESCRIPTION: 'Affiche l\'aide pour une commande.',
			COMMAND_HELP_NO_EXTENDED: 'Pas d\'aide étendue disponible.',
			COMMAND_HELP_DM: '📥 | Les commandes ont été envoyées dans vos MPs.',
			COMMAND_HELP_NODM: '❌ | Vous avez désactivé vos MPs, je ne peux pas vous envoyer les commandes.',
			COMMAND_HELP_COMMAND_NOT_FOUND: '❌ | Commande inconnue, veuillez exécuter la commande help sans argument pour avoir toute la liste.',
			COMMAND_HELP_USAGE: (usage) => `utilisation :: ${usage}`,
			COMMAND_HELP_EXTENDED: 'Aide étendue ::',
			COMMAND_ENABLE: (type, name) => `+ ${util.toTitleCase(this.piece(type))} activé${this.isFeminine(type) ? 'e' : ''} : ${name}`,
			COMMAND_ENABLE_DESCRIPTION: 'Réactive ou active temporairement un(e) commande/inhibiteur/moniteur/finaliseur/événement. L\'état par défaut sera rétabli au redémarrage.',
			COMMAND_DISABLE: (type, name) => `+ ${util.toTitleCase(this.piece(type))} désactivé${this.isFeminine(type) ? 'e' : ''} : ${name}`,
			COMMAND_DISABLE_DESCRIPTION: 'Redésactive ou désactive temporairement un(e) commande/inhibiteur/moniteur/finaliseur/événement. L\'état par défaut sera rétabli au redémarrage.',
			COMMAND_DISABLE_WARN: 'Vous ne voulez probablement pas désactiver cela, car vous ne serez plus capable d\'exécuter une commande pour le réactiver',
			COMMAND_CONF_NOKEY: 'Vous devez fournir une clef',
			COMMAND_CONF_NOVALUE: 'Vous devez fournir une valeur',
			COMMAND_CONF_GUARDED: (name) => `${util.toTitleCase(name)} ne peut pas être désactivé.`,
			COMMAND_CONF_ADDED: (value, key) => `La valeur \`${value}\` a été ajoutée avec succès à la clef : **${key}**`,
			COMMAND_CONF_UPDATED: (key, response) => `La clef **${key}** a été mise à jour avec succès : \`${response}\``,
			COMMAND_CONF_KEY_NOT_ARRAY: 'Cette clef n\'est pas une matrice. Utilisez plutôt l\'action \'reset\'.',
			COMMAND_CONF_REMOVE: (value, key) => `La valeur \`${value}\` a été otée avec succès de la clef : **${key}**`,
			COMMAND_CONF_GET_NOEXT: (key) => `La clef **${key}** ne semble pas exister.`,
			COMMAND_CONF_GET: (key, value) => `La valeur pour la clef **${key}** est : \`${value}\``,
			COMMAND_CONF_RESET: (key, response) => `La clef **${key}** a été réinitialisée à : \`${response}\``,
			COMMAND_CONF_SERVER_DESCRIPTION: 'Établit une configuration par serveur.',
			COMMAND_CONF_SERVER: (key, list) => `**Configuration Serveur${key}**\n${list}`,
			COMMAND_CONF_USER_DESCRIPTION: 'Établit une configuration par utilisateur.',
			COMMAND_CONF_USER: (key, list) => `**Configuration Utilisateur${key}**\n${list}`,
			COMMAND_STATS: (memUsage, uptime, users, servers, channels, klasaVersion, discordVersion, processVersion, message) => [
				'= STATISTIQUES =',
				'',
				`• Utilisation Mem :: ${memUsage} Mo`,
				`• Disponibilité   :: ${uptime}`,
				`• Utilisateurs    :: ${users}`,
				`• Serveurs        :: ${servers}`,
				`• Salons          :: ${channels}`,
				`• Klasa           :: v${klasaVersion}`,
				`• Discord.js      :: v${discordVersion}`,
				`• Node.js         :: ${processVersion}`,
				this.client.options.shardCount ? `• Shard           :: ${((message.guild ? message.guild.shardID : message.channel.shardID) || this.client.options.shardId) + 1} / ${this.client.options.shardCount}` : ''
			],
			COMMAND_STATS_DESCRIPTION: 'Fournit des détails et statistiques à propos du bot.'
		};
	}

	isFeminine(type) {
		type = type.toString();
		return ['command', 'commands'].indexOf(type) !== -1;
	}

	piece(type) {
		type = type.toString();
		const plural = type.slice(-1) === 's';
		const tp = {
			command: 'commande',
			event: 'événement',
			extendable: 'extensible',
			finalizer: 'finaliseur',
			inhibitor: 'inhibiteur',
			language: 'langage',
			monitor: 'contrôleur',
			provider: 'fournisseur'
		}[(plural ? type.slice(0, -1) : type).toLowerCase()];
		return tp ?
			`${tp}${plural ? 's' : ''}` :
			type;
	}

};
