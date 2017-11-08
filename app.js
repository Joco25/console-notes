const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
						describe: 'Title of note',
						demand:true,
						alias: 't'
					};
const bodyOptions= {
						describe: 'Body of note',
						demand:true,
						alias: 'b'
					};

const argv = yargs
				.command('add','Add a new note',{
					title:titleOptions,
					body: bodyOptions
				})
				.command('list','Add List all notes')
				.command('read','Read a Note',{
					title:titleOptions
				})
				.command('remove','Remove a note',{
					title:titleOptions
				})
				.help()
				.argv;

var command = argv._[0];

if (command === 'add'){
	var note = notes.addNote(argv.title, argv.body);
	if(_.isObject(note)){
		console.log('Successfully added Note');
		notes.logNote(note);
	}else{
		console.log('An error occured, Note title probably exists already');
	}

}else if (command === 'list'){
	var allNotes = notes.getAll();
	console.log(`Printing ${allNotes.length} note(s)`);
	allNotes.forEach((note)=> notes.logNote(note));
}else if(command === 'read'){
	var note = notes.getNote(argv.title);
	if(note){
		notes.logNote(note);
	}else{
		console.log('Note was not found');
	}
}else if(command === 'remove'){
	var noteRemoved= notes.deleteNote(argv.title);
	var msg = noteRemoved ? "Note was removed" : "No note found";
	console.log(msg);
}	
else{
	console.log('command not recognized');
}