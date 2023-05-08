export function TabMD(chords) {
	if (!chords) return;
	// console.log('chords', chords);
	var lines = chords.split("\n");
	// let links = lines.filter(x=>x.includes('spotify.com'))
	var chords = Object.keys(ChordDefinitions);
	var result = '';
	for (var i = 0; i < lines.length; i++) {
		if (lines[i].includes('spotify.com')) {
			let url = new URL(lines[i].trim())
			let id = url.pathname.replace('/track/','')
			result += `<iframe width="100%" height="52" src="https://embed.odesli.co/?url=spotify:track:${id}&theme=light" frameborder="0" allowtransparency allowfullscreen sandbox="allow-same-origin allow-scripts allow-presentation allow-popups allow-popups-to-escape-sandbox"></iframe>`
			continue
		}
		if(lines[i].trim().startsWith('[')){
			let head = lines[i].trim().replace('[','').replace(']','')
			result += `<h5>${head}</h5>\n`
			continue
		}
		var line = lines[i].split("\t").join('    ');
		var emptyLine = !line.trim();
		var halfSpaces = line.split(' ').length >= line.length * 0.5;
		if (!emptyLine && halfSpaces) {
			// console.log('line', line);
			var lineChords = line.split(' ').reverse();
			for (var j = 0; j < lineChords.length; j++)
				if (lineChords[j]) {
					if (!lines[i + 1]) continue;
					var pos = line.lastIndexOf(lineChords[j]);
					// console.log('chord-pos', lineChords[j], pos);
					line = line.substr(0, pos);
					lines[i + 1] = lines[i + 1].substr(0, pos) + '<b>' + lineChords[j] + '</b>' + lines[i + 1].substr(pos);
				} //+ lineChords[j].length - 1
			continue;
		}
		result += line + "<br/>\n";
	}
	return result;
}

// if (!line.trim()) continue;
// if (line.split(' ').length < line.length * 0.5) continue;
// if (!lines[i + 1])

// module.exports.TabMD = TabMD;


const ChordDefinitions = {
	'C': '- 3 2 0 1 0',
	'D': '- - 0 3 2 3',
	'E': '0 2 2 1 0 0',
	'F': '1 3 3 2 1 1',
	'G': '3 2 0 0 0 3',
	'A': '- 0 2 2 2 0',
	'H': '- 2 4 4 4 2',

	'C#': 'x 3 2 0 1 0',
	'D#': 'x x 0 3 2 3',
	'E#': '0 2 2 1 0 0',
	'F#': '1 3 3 2 1 1',
	'G#': '3 2 0 0 0 3',
	'A#': '6 6 7 8 8 6',
	'H#': '3 2 0 0 0 3',

	'Cb': 'x 3 2 0 1 0',
	'Db': 'x x 0 3 2 3',
	'Eb': '6 8 8 8 6 X',
	'Fb': '1 3 3 2 1 1',
	'Gb': '3 2 0 0 0 3',
	'Ab': '3 2 0 0 0 3',
	'Hb': '3 2 0 0 0 3',

	'Cm': 'x 3 2 0 1 0',
	'Dm': 'x x 0 3 2 3',
	'Em': '0 2 2 1 0 0',
	'Fm': '1 3 3 2 1 1',
	'Gm': '3 5 5 4 3 3',
	'Am': '- 0 2 2 1 0',
	'Hm': '3 2 0 0 0 3',
};

const GuitarOrder = 'E,A,D,G,H,E'.split(',');
const PianoOrder = "C,C#,D,D#,E,F,F#,G,G#,A,A#,H".split(',');