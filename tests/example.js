// Import packages
const facepunchCommits = require( "../source/main.js" ) // Should be facepunch-commits

// Fetch the latest commit with no specific repository
facepunchCommits.fetch( { repository: "garrysmod", max: 1 } ).then( ( commits ) => {

	// Fetch the first commit from the array
	const commit = commits[ 0 ]

	// Display a summary of the commit
	console.log( `[${ commit.id } @ ${ commit.when }] ${ commit.author.name }: ${ commit.message }` )

} ).catch( ( errorCode ) => {

	// Display the error code
	console.error( `Error ${ errorCode }!` )

} )