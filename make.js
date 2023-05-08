// const fs = require('fs');
// const TabMD = require('./TabMD');
import * as FS from 'https://jsv.max.pub/@js-max-pub/fs/2022/deno/sync.js'
import { TabMD } from './TabMD.js'

const baseDir = '../../OpenDataCollection/Chords/';
const baseStyle = l => `<link href='${l}style.css' rel='stylesheet'/>`;
const utf = `<meta charset='utf-8'>\n`;

const safeString = str => str.split(' ').join('').split("'").join('');


function artistList() {
	let HTML = utf + baseStyle('') + `<main>\n`;
	HTML += `<h1>Artists</h1>\n`;
	let list = FS.folder(baseDir).list.filter(x => x.type == 'folder').map(x => x.name).map(x => decodeURI(x)).sort()
	for (let artist of list) {
		if (artist.startsWith('.')) continue;
		// let name = item.name
		let count = FS.folder(baseDir).folder(artist).list.length
		HTML += `<a href='${safeString(artist)}/index.html'>${count} | ${artist}</a>\n`;
		songList(artist);
	};
	HTML += `</main>`;
	// console.log(HTML);
	FS.file('./index.html').text = HTML
	// fs.writeFileSync('index.html', HTML);
}


function songList(artist) {
	console.log('make', artist);
	let HTML = utf + baseStyle('../') + `<main>`;
	HTML += `<h1>${artist}</h1>`;
	let list = FS.folder(baseDir).folder(artist).list.filter(x => x.type == 'folder').map(x => x.name).map(x => decodeURI(x)).sort()
	for (let song of list) {
		if (song.startsWith('.')) continue
		HTML += `<a href='${safeString(song)}/index.html'>${song}</a>\n`;
		songView(artist, song);
	};
	HTML += `</main>`;
	FS.folder(safeString(artist)).make.file('./index.html').text = HTML

	// fs.writeFileSync(safeString(artist) + '/index.html', HTML);
}

function songView(artist, song) {
	let HTML = utf + baseStyle('../../') + `<main>`;
	HTML += `<h1>${song}</h1>`;
	HTML += `<h2><a href='../'>${artist}</a></h2>`;
	let list = FS.folder(baseDir).folder(artist).folder(song).list//.filter(x => x.type == 'folder').map(x => x.name).map(x => decodeURI(x)).sort()
	for(let version of list){
		HTML += TabMD(version.text)
	}
	// let dir = artist + '/' + song;
	// fs.readdirSync(baseDir + dir).forEach(item => {
	// 	HTML += TabMD.TabMD(fs.readFileSync(baseDir + dir + '/' + item, 'utf-8'));
	// });
	HTML += `</main>`;
	FS.folder(safeString(artist)).folder(safeString(song)).make.file('./index.html').text = HTML

	// try {
	// 	fs.mkdirSync(safeString(dir));
	// } catch (e) { }
	// fs.writeFileSync(safeString(dir) + '/index.html', HTML);
}


artistList();