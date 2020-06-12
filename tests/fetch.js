/*
Facepunch Commits - An interface for the Facepunch Commits website.
Copyright (C) 2020 viral32111 (contact@viral32111.com)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see https://www.gnu.org/licenses.
*/

/************** Setup **************/

// Import module
const facepunchCommits = require( "../source/main.js" )

/************** Callbacks **************/

// Success callback
function success( commits ) {

	// Display number of commits
	console.log( `\nWe've got ${ commits.length } commits from ${ commits[ 0 ].repository.name }!` )

	// Loop through each one and display a summary
	for ( const commit of commits ) {
		console.log( commit.id, commit.author.name, commit.message )
	}

}

// Failure callback
function failure( errorCode ) {

	// Output the error code
	console.error( `Error code: ${ errorCode }` )

}

/************** Execute tests **************/

// Fetch zero commits (should fail)
facepunchCommits.fetch( { max: 0 } ).then( success ).catch( failure )

// Fetch -20 commits on Garrys Mod (should fail)
facepunchCommits.fetch( { repository: "Garrys Mod", max: -20 } ).then( success ).catch( failure )

// Fetch the latest commit, no specific repository (should pass)
facepunchCommits.fetch( { max: 1 } ).then( success ).catch( failure )

// Fetch the latest commit on rust_reboot (should pass)
facepunchCommits.fetch( { repository: "rust_reboot", max: 1 } ).then( success ).catch( failure )

// Fetch the latest 5 commits on garrysmod (should pass)
facepunchCommits.fetch( { repository: "garrysmod", max: 1 } ).then( success ).catch( failure )

// Fetch the latest 2 commits on Web (should pass)
facepunchCommits.fetch( { repository: "Web", max: 2 } ).then( success ).catch( failure )
