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
			DEFAULT: (key) => `${key} nu a fost încă localizată în ro-RO.`,
			DEFAULT_LANGUAGE: 'Limba implicită',
			SETTING_GATEWAY_EXPECTS_GUILD: 'Paramentrul <Guild> așteaptă un obiect de tip Guild sau un Guild.',
			SETTING_GATEWAY_VALUE_FOR_KEY_NOEXT: (data, key) => `Valorarea ${data} pentru cheia ${key} nu există.`,
			SETTING_GATEWAY_VALUE_FOR_KEY_ALREXT: (data, key) => `Valorarea ${data} pentru cheia ${key} deja există.`,
			SETTING_GATEWAY_SPECIFY_VALUE: 'Trebuie să specifici valoarea adăugată sau un filtru.',
			SETTING_GATEWAY_KEY_NOT_ARRAY: (key) => `Cheia ${key} nu este un Array.`,
			SETTING_GATEWAY_KEY_NOEXT: (key) => `Cheia ${key} nu există în schema de date curentă.`,
			SETTING_GATEWAY_INVALID_TYPE: 'Parametrul tip trebuie să fie add sau remove.',
			RESOLVER_INVALID_PIECE: (name, piece) => `${name} trebuie să fie un nume de ${piece} valid.`,
			RESOLVER_INVALID_MESSAGE: (name) => `${name} trebuie să fie un id de mesaj valid.`,
			RESOLVER_INVALID_USER: (name) => `${name} trebuie să fie un id de utilizator valid sau o mențiune.`,
			RESOLVER_INVALID_MEMBER: (name) => `${name} trebuie să fie un id de utilizator valid sau o mențiune.`,
			RESOLVER_INVALID_CHANNEL: (name) => `${name} trebuie să fie un id sau tag de canal valid.`,
			RESOLVER_INVALID_GUILD: (name) => `${name} trebuie să fie un id de guild valid.`,
			RESOLVER_INVALID_ROLE: (name) => `${name} trebuie să fie un id sau o mențiune de rol validă.`,
			RESOLVER_INVALID_LITERAL: (name) => `Opțiunea ta nu se potrivește cu singura posibilitate: ${name}`,
			RESOLVER_INVALID_BOOL: (name) => `${name} trebuie să fie true sau false.`,
			RESOLVER_INVALID_INT: (name) => `${name} trebuie să fie un integer.`,
			RESOLVER_INVALID_FLOAT: (name) => `${name} trebuie să fie un număr valid.`,
			RESOLVER_INVALID_URL: (name) => `${name} trebuie să fie un url valid.`,
			RESOLVER_STRING_SUFFIX: ' caractere',
			RESOLVER_MINMAX_EXACTLY: (name, min, suffix) => `${name} trebuie să fie exact ${min}${suffix}.`,
			RESOLVER_MINMAX_BOTH: (name, min, max, suffix) => `${name} trebuie să fie între ${min} și ${max}${suffix}.`,
			RESOLVER_MINMAX_MIN: (name, min, suffix) => `${name} trebuie să fie mai mare de ${min}${suffix}.`,
			RESOLVER_MINMAX_MAX: (name, max, suffix) => `${name} trebuie să fie mai mic de ${max}${suffix}.`,
			COMMANDMESSAGE_MISSING: 'Lipsește unul sau mai multe argumente necesare după sfârșitul inputului.',
			COMMANDMESSAGE_MISSING_REQUIRED: (name) => `${name} este un argument necesar.`,
			COMMANDMESSAGE_MISSING_OPTIONALS: (possibles) => `Lipsește o opțiune necesară: (${possibles})`,
			COMMANDMESSAGE_NOMATCH: (possibles) => `Opțiunea ta nu se potrivește cu una din posibilități: (${possibles})`,
			MONITOR_COMMAND_HANDLER_REPROMPT: (tag, error, time) => `${tag} | **${error}** | Ai **${time}** să raspunzi cu un argument valid. Scrie **"ABORT"** sa anulezi execuția.`,
			MONITOR_COMMAND_HANDLER_ABORTED: 'Anulat',
			INHIBITOR_COOLDOWN: (remaining) => `Ai folosit această comandă recent. Poți folosi comanda în ${remaining} de secunde.`,
			INHIBITOR_DISABLED: 'Această comandă este la moment oprită',
			INHIBITOR_MISSING_BOT_PERMS: (missing) => `Permisinuni insuficiente, lipsește: **${missing}**`,
			INHIBITOR_PERMISSIONS: 'Nu ai permisiunea să folosești această comandă',
			INHIBITOR_REQUIRED_SETTINGS: (settings) => `Guildul lipsește set${settings.length > 1 ? 'ările' : 'area'} **${settings.join(', ')}** și nu poate rula.`,
			INHIBITOR_RUNIN: (types) => `Această comandă este valabilă doar in canalele de tipul ${types}`,
			INHIBITOR_RUNIN_NONE: (name) => `Comanda ${name} nu este configurată să ruleze în orice canal.`,
			COMMAND_UNLOAD: (type, name) => `✅ Descărcat ${type}: ${name}`,
			COMMAND_TRANSFER_ERROR: '❌ Acest fișier a fost transferat deja sau nu este existent.',
			COMMAND_TRANSFER_SUCCESS: (type, name) => `✅ Transferat cu succes ${type}: ${name}`,
			COMMAND_TRANSFER_FAILED: (type, name) => `Transferul ${type}: ${name} la Client a eșuat. Verificați consola.`,
			COMMAND_RELOAD: (type, name) => `✅ Reîncărcat ${type}: ${name}`,
			COMMAND_RELOAD_ALL: (type) => `✅ Reîncărcat toate ${type}.`,
			COMMAND_REBOOT: 'Se restartează...',
			COMMAND_PING: 'Ping?',
			COMMAND_PINGPONG: (diff, ping) => `Pong! (Pingul dus-întors a durat: ${diff}ms. Bătaia de inimă: ${ping}ms.)`,
			COMMAND_INVITE_SELFBOT: 'De ce ți-ar trebui un link de invite pentru un selfbot...',
			COMMAND_INVITE: (client) => [
				`Pentru a adăuga ${client.user.username} în guildul tău de Discord:`,
				client.invite,
				util.codeBlock('', [
					'Linkul deasupra este generat cu permisiunile minime necesare pentru a folosit toate comenzile existente.',
					'Eu știu ca nu toate permisiunile sunt pentru orice server așa că nu vă fie frică să scoateți unele permisiuni.',
					'Dacă încerci să folosești o comandă care necesită mai multe permisiuni botul te va notifica.'
				].join(' ')),
				'Generați un raport pe <https://github.com/dirigeants/klasa> dacă găsiți orice bug.'
			],
			COMMAND_INFO: [
				"Klasa este un framework 'plug-and-play' construit deasupra librăriei Discord.js.",
				'Majoritatea codului este modularizat, ceea ce permite dezvoltatorilor să editeze Klasa după necesitățile lor.',
				'',
				'Unele din caracteristici Klasa sunt:',
				'• 🐇💨 Lansare rapidă cu ajutorul la ES2017 (`async`/`await`)',
				'• 🎚🎛 Setări pentru fiecare guild în parte care pot fi extinse în propriul tău cod',
				'• 💬 Un sistem de comenzi care poate fi customizat, cu rezolvare a argumentelor automată, și cu abilitatea de încărcare / reîncărcare a comenzilor.',
				'• 👀 "Monitoare", care pot verifica orice mesaj creat sau editat, și care pot acționa asupra lor (filtru de înjurături, protecție împotriva spam-ului, etc.).',
				'• ⛔ "Inhibitoare", care pot preveni rularea comenzilor prin parametrii setați (pentru permisiuni, lista neagră, etc.).',
				'• 🗄 "Providere", care simplifică folosirea oricărui database dorești.',
				'• ✅ "Finalizere", care rulează după ce o comandă a avut succes (pentru logare, colecționare de statistici, curățare de răspunsuri, etc.).',
				'• ➕ "Extendabile", care adaugă pasiv metode, getteri sau setteri, sau chiar proprietăți statice către clase care există deja in Discord.js sau Klasa.',
				'• 🌐 "Limbi", care permit localizarea răspunsurilor botului tău.',
				'• ⏲ "Taskuri", care pot fi programate să ruleze în viitor, opțional repetându-se.',
				'',
				'Noi aspirăm ca acest framework să fie 100% customizabil încât să poată satisface orice audiență. Noi facem updateuri des și bugfixuri când este posibil.',
				'Dacă ești interesat în noi, vizitează-ne la https://klasa.js.org'
			],
			COMMAND_HELP_DM: '📥 | Comenzile au fost trimise în DMurile tale.',
			COMMAND_HELP_NODM: '❌ | Ai DMurile dezactivate, nu am să-ți trimit comenzile în DM.',
			COMMAND_ENABLE: (type, name) => `+ Activat cu succes ${type}: ${name}`,
			COMMAND_DISABLE: (type, name) => `+ Dezactivat cu succes ${type}: ${name}`,
			COMMAND_DISABLE_WARN: 'Probabil nu ai vrea să dezactivezi aceasta, deoarece nu vei putea să rulezi orice comandă să o activezi din nou',
			COMMAND_CONF_NOKEY: 'Trebuie să introduci o cheie',
			COMMAND_CONF_NOVALUE: 'Trebuie să introduci o valoare',
			COMMAND_CONF_ADDED: (value, key) => `Am adăugat cu succes valoarea \`${value}\` la cheia: **${key}**`,
			COMMAND_CONF_UPDATED: (key, response) => `Am updatat cu succes cheia **${key}**: \`${response}\``,
			COMMAND_CONF_KEY_NOT_ARRAY: 'Această cheie nu este de tip array. Folosește acțiunea \'reset\'.',
			COMMAND_CONF_REMOVE: (value, key) => `Am șters cu succes valoarea \`${value}\` la cheia: **${key}**`,
			COMMAND_CONF_GET_NOEXT: (key) => `Cheia **${key}** nu există.`,
			COMMAND_CONF_GET: (key, value) => `Valoarea pentru cheia **${key}** este: \`${value}\``,
			COMMAND_CONF_RESET: (key, response) => `Cheia **${key}** a fost resetată la: \`${response}\``
		};
	}

};
