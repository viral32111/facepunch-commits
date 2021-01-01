/***********************************************************************
Facepunch Commits - An interface for the Facepunch Commits website.
Copyright (C) 2020 - 2021 viral32111 (https://viral32111.com).

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
***********************************************************************/

// Import packages
const facepunchCommits = require( "../source/main.js" ) // Should be @viral32111/facepunch-commits

// Fetch the latest commit with no specific repository
facepunchCommits.fetch( { max: 1 } ).then( ( commits ) => {

	// Fetch the first commit from the array
	const commit = commits[ 0 ]

	// Display a summary of the commit
	console.log( `[${ commit.id } @ ${ commit.when }] ${ commit.author.name }: ${ commit.message }` )

} ).catch( ( errorCode ) => {

	// Display the error code
	console.error( `Error ${ errorCode }!` )

} )
