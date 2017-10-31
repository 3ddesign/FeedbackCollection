console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');

const notes = require('./notes.js');

var command = process.argv[2];
console.log('Command: ', command);
console.log(process.argv);


if (command === 'add') {
    console.log('Adding new note')
} else if (command === 'list'){
    console.log('Listing all notes')
} else if (command === 'read'){
    console.log('Reading note')
} else if (command === 'remove'){
    console.log('Removing note')
} else {
    console.log('not recognized')
}


// console.log(_.isString('string'));
// var filtredArray = _.uniq(['test', 1, 'test', 1,2,3,4]);
// var res = notes.addNote();
// console.log(notes.add(2,3));
// var user = os.userInfo();
// fs.appendFile('greetings.txt', `Hello ${user.username}! You are ${notes.age}.`);
