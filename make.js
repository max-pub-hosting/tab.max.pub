const fs = require('fs');
const TabMD = require('./TabMD');
const baseDir = '../../OpenDataCollection/Chords/';
const baseStyle = l => `<link href='${l}style.css' rel='stylesheet'/>`;
const utf = `<meta charset='utf-8'>`;

safeString = str => str.split(' ').join('').split("'").join('');


artistList = () => {
	let HTML = utf + baseStyle('') + `<main>`;
	HTML += `<h1>Artists</h1>`;
	fs.readdirSync(baseDir).forEach(item => {
		if (item.includes('.')) return;
		HTML += `<a href='${safeString(item)}'>${item}</a>`;
		songList(item);
	});
	HTML += `</main>`;
	// console.log(HTML);
	fs.writeFileSync('index.html', HTML);
}


songList = (artist) => {
	console.log('make',artist);
	try {
		fs.mkdirSync(safeString(artist));
	} catch (e) {}
	let HTML = utf + baseStyle('../') + `<main>`;
	HTML += `<h1>${artist}</h1>`;
	fs.readdirSync(baseDir + artist).forEach(item => {
		if (item.includes('.')) return;
		HTML += `<a href='${safeString(item)}'>${item}</a>`;
		song(artist, item);
	});
	HTML += `</main>`;
	fs.writeFileSync(safeString(artist) + '/index.html', HTML);
}

song = (artist, song) => {
	let HTML = utf + baseStyle('../../') + `<main>`;
	HTML += `<h1>${song}</h1>`;
	HTML += `<h2><a href='../'>${artist}</a></h2>`;
	let dir = artist + '/' + song;
	fs.readdirSync(baseDir + dir).forEach(item => {
		HTML += TabMD.TabMD(fs.readFileSync(baseDir + dir + '/' + item, 'utf-8'));
	});
	HTML += `</main>`;
	try {
		fs.mkdirSync(safeString(dir));
	} catch (e) {}
	fs.writeFileSync(safeString(dir) + '/index.html', HTML);
}


artistList();