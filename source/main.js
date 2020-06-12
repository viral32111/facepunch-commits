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

// Import modules
const https = require( "https" )

/************** Globals **************/

// API URL options
const baseURL = "https://commits.facepunch.com/r/" // Goes at the start
const formatQuery = "?format=json" // Goes on the end (kinda)

// Regular expressions for API results
const redacted = new RegExp( "▍|▆|▇|▊|▌|▉|▋|█|▅|▄" ) // Characters that count as information being redacted
const avatarID = new RegExp( "s\/([a-zA-Z0-9]+)|avatar\/([0-9-]+)" ) // Extract the user's avatar ID

// The default options for the first argument of the fetch() function
const defaultOptions = {

	// The name of the repository to fetch commits from, default is all repositories
	repository: undefined, // String

	// The maximum amount of commits to return, default is 100 as the API returns that amount in a single response
	max: 100, // Number

	// Only commits from before this date, changeset or commit will be returned
	// TODO: before: undefined, // Date / Changeset String / Commit Number

	// Only commits from after this date, changeset or commit will be returned
	// TODO: after: undefined, // Date / Changeset String / Commit Number

	// The User-Agent header for making HTTP requests, this is an ideal place to put contact info
	userAgent: "Facepunch Commits (github.com/viral32111/facepunch-commits)" // String

}

/************** Private functions **************/

// Private helper function to check for a valid date (https://stackoverflow.com/a/44198641)
/* TODO: function isValidDate( date ) {
	return date && Object.prototype.toString.call( date ) === "[object Date]" && !isNaN( date )
} */

// Private helper function to convert a string commit message into a nicer array
function parseCommitMessage( message ) {
	return message
		.replace( /\r|\n/g, "\n" ) // Replace all CR & LF with just LF
		.split( "\n" ) // Split into array by line
		.filter( ( value ) => value != "" ) // Remove empty lines
}

// Private helper function to promisify https.request()
async function httpsRequest( url, options ) {
	
	// Return a new promise
	return new Promise( async ( resolve, reject ) => {

		// Create the request
		const request = https.request( url, options, resolve )

		// Catch any errors
		request.on( "error", reject )

		// Execute the request
		request.end()

	} )

}

// Private helper function to collect all chunks from a HTTP response & convert them to a JSON object
async function parseResponse( response ) {

	// Return a new promise
	return new Promise( async ( resolve, reject ) => {

		// Create empty string to hold the final body
		let body = ""

		// Append to body when a new chunk of data is received
		response.on( "data", ( chunk ) => body += chunk )

		// Runs when the response is finished
		response.on( "end", () => {
	
			// Convert body to a JSON object
			const data = JSON.parse( body )

			// Resolve the promise with the JSON object
			resolve( data )
	
		} )

	} )

}

/************** Public functions **************/

// Public function to fetch commits
async function fetch( options ) {

	// Return a new promise
	return new Promise( async ( resolve, reject ) => {

		/************** Create options **************/

		// Merge the provided options into the default options and store in a new object
		const mergedOptions = { ...defaultOptions, ...options }

		// For easier access later on
		const repository = mergedOptions.repository
		const max = mergedOptions.max
		// TODO: const before = mergedOptions.before
		// TODO: const after = mergedOptions.after
		const userAgent = mergedOptions.userAgent

		/************** Input validation **************/
	
		// Repository must be undefined or a string
		if ( repository !== undefined && typeof( repository ) !== "string" ) reject( 1 )
		
		// Max commits must be a number
		if ( typeof( max ) !== "number" ) reject( 2 )
		
		// After must be undefined, a date, string or number
		// TODO: if ( before !== undefined && ( isValidDate( before ) || typeof( before ) !== "number" || typeof( before ) !== "string" ) ) reject( 3 )

		// After must be undefined, a date, string or number
		// TODO: if ( after !== undefined && ( isValidDate( after ) || typeof( after ) !== "number" || typeof( after ) !== "string" ) ) reject( 4 )

		// User Agent must be a string
		if ( typeof( userAgent ) !== "string" ) reject( 5 )

		// Don't allow fetching less than 1 commit
		if ( max < 1 ) reject( 6 )

		// Don't allow empty an User Agent
		if ( userAgent.length < 1 ) reject( 7 )

		/************** API request **************/

		// Headers for the request
		const requestOptions = { headers: {
			"Accept": "application/json",
			"User-Agent": userAgent
		} }

		// URL encode the repository name (some of them have spaces, such as 'Garrys Mod')
		const safeRepository = encodeURIComponent( repository )

		// Construct the URL for this repository
		const repoURL = baseURL + ( repository !== undefined ? safeRepository : "" ) + formatQuery

		// Will be an array of all the commits fetched from newest (index 0) to oldest (max index)
		let fetchedCommits = []

		/************** Pages **************/

		// Get the total number of pages to iterate over
		const maxPages = Math.ceil( max / 100 )

		// Loop from 1 to maxPages
		for ( let pageNumber = 1; pageNumber <= maxPages; pageNumber++ ) {

			// Break out if we've hit the maximum commits that the user wants
			if ( fetchedCommits.length >= max ) break

			// Construct the URL for this page
			const pageURL = repoURL + "&p=" + pageNumber

			// Make the HTTP request to the API
			const response = await httpsRequest( pageURL, requestOptions )

			// Parse the response body with our helper function
			const data = await parseResponse( response )

			// The repository must have at least 1 commit (if it doesn't, it's likely an invalid repository name)
			if ( data[ "total" ] < 1 ) reject( 8 )

			// This page must have at least 1 commit result (if it doesn't, it's likely an out-of-bounds page number)
			if ( data[ "results" ].length < 1 ) reject( 9 )

			/************** Commits **************/

			// Iterate through every returned commit to construct our own commit objects
			for ( const commit of data[ "results" ] ) {

				// Break out if we've hit the maximum commits that the user wants
				if ( fetchedCommits.length >= max ) break

				// Fetch the user's avatar ID (have to use this because there seems to be some sort of legacy avatar ID system that most users don't use, also some users don't even have avatars)
				const userAvatarMatch = ( commit[ "user" ][ "avatar" ] !== "" ? avatarID.exec( commit[ "user" ][ "avatar" ] ) : undefined )

				// Create a custom object for the commit
				const customCommit = {

					// ID
					id: commit[ "id" ],

					// URL
					url: baseURL.substring( 0, baseURL.length - 2 ) + commit[ "id" ],

					// Changeset ID (can also be a commit SHA, like on 'garrysmod'), this can be a redacted value!
					changeset: ( redacted.test( commit[ "changeset" ] ) === true ? undefined : commit[ "changeset" ] ),

					// Repository
					repository: {
						name: commit[ "repo" ],
						url: baseURL + encodeURIComponent( commit[ "repo" ] ),
						total: data[ "total" ],

						// Repository branch, this can be a redacted value!
						branch: ( redacted.test( commit[ "branch" ] ) === true ? undefined : {
							name: commit[ "branch" ],
							url: baseURL + encodeURIComponent( commit[ "repo" ] ) + "/" + encodeURIComponent( commit[ "branch" ] )
						} )
					},

					// Author
					author: {
						name: commit[ "user" ][ "name" ],
						avatar: ( userAvatarMatch === undefined ? undefined : {
							id: ( userAvatarMatch[ 1 ] !== undefined ? userAvatarMatch[ 1 ] : userAvatarMatch[ 2 ] ),
							url: commit[ "user" ][ "avatar" ]
						} ),
						url: ( userAvatarMatch === undefined ? undefined : baseURL.substring( 0, baseURL.length - 2 ) + commit[ "user" ][ "name" ].replace( " ", "" ) ) // Turns out the URL isn't valid if the user doesn't have an avatar (i've seen this alot on the 'garrysmod' repo from non-Facepunch employees committing to it)
					},
					
					// Message, this can be a redacted value!
					message: ( redacted.test( commit[ "message" ] ) === true ? undefined : parseCommitMessage( commit[ "message" ] ) ),

					// Date & time
					when: new Date( commit[ "created" ] )
				}

				// Add the commit to our array
				fetchedCommits.push( customCommit )

			}

		}

		/************** Finalise **************/

		// Resolve the promise with the fetched commits
		resolve( fetchedCommits )

	} )

}

// Export function
module.exports = {
	fetch: fetch
}
