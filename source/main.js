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

/************** Setup **************/

// Import files
const globals = require( "./globals.js" ) // Global variables
const functions = require( "./functions.js" ) // Private functions

/************** Main **************/

// Public function to fetch commits
async function fetch( options ) {

	// Return a new promise
	return new Promise( async ( resolve, reject ) => {

		/************** Create options **************/

		// Merge the provided options into the default options and store in a new object
		const mergedOptions = { ...globals.defaultOptions, ...options }

		// For easier access later on
		const repository = mergedOptions.repository
		const max = mergedOptions.max
		// TODO: const before = mergedOptions.before
		// TODO: const after = mergedOptions.after
		const userAgent = mergedOptions.userAgent
		const from = mergedOptions.from

		/************** Input validation **************/
	
		// Repository must be undefined or a string
		if ( repository !== undefined && typeof( repository ) !== "string" ) reject( 101 )
		
		// Max commits must be a number
		if ( typeof( max ) !== "number" ) reject( 102 )
		
		// After must be undefined, a date, string or number
		// TODO: if ( before !== undefined && ( isValidDate( before ) || typeof( before ) !== "number" || typeof( before ) !== "string" ) ) reject( 103 )

		// After must be undefined, a date, string or number
		// TODO: if ( after !== undefined && ( isValidDate( after ) || typeof( after ) !== "number" || typeof( after ) !== "string" ) ) reject( 104 )

		// User-Agent header must be a string
		if ( typeof( userAgent ) !== "string" ) reject( 105 )

		// Don't allow fetching less than 1 commit
		if ( max < 1 ) reject( 106 )

		// Don't allow an empty User-Agent header
		if ( userAgent.length < 1 ) reject( 107 )

		// From header must be a string
		if ( typeof( from ) !== "string" ) reject( 108 )

		// Don't allow an empty From header
		if ( from.length < 1 ) reject( 109 )

		/************** API request **************/

		// Headers for the request
		const requestOptions = { headers: {
			"Accept": "application/json",
			"User-Agent": userAgent,
			"From": from
		} }

		// URL encode the repository name (some of them have spaces, such as 'Garrys Mod')
		const safeRepository = encodeURIComponent( repository )

		// Construct the URL for this repository
		const repoURL = globals.baseURL + ( repository !== undefined ? safeRepository : "" ) + globals.formatQuery

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
			const response = await functions.httpsRequest( pageURL, requestOptions )

			// Parse the response body with our helper function
			const data = await functions.parseResponse( response )

			// The repository must have at least 1 commit (if it doesn't, it's likely an invalid repository name)
			if ( data[ "total" ] < 1 ) reject( 201 )

			// This page must have at least 1 commit result (if it doesn't, it's likely an out-of-bounds page number)
			if ( data[ "results" ].length < 1 ) reject( 202 )

			/************** Commits **************/

			// Iterate through every returned commit to construct our own commit objects
			for ( const commit of data[ "results" ] ) {

				// Break out if we've hit the maximum commits that the user wants
				if ( fetchedCommits.length >= max ) break

				// Fetch the user's avatar ID (have to use this because there seems to be some sort of legacy avatar ID system that most users don't use, also some users don't even have avatars)
				const userAvatarMatch = ( commit[ "user" ][ "avatar" ] !== "" ? globals.avatarID.exec( commit[ "user" ][ "avatar" ] ) : undefined )

				// Create a custom object for the commit
				const customCommit = {

					// ID
					id: commit[ "id" ],

					// URL
					url: globals.baseURL.substring( 0, globals.baseURL.length - 2 ) + commit[ "id" ],

					// Changeset ID (can also be a commit SHA, like on 'garrysmod'), this can be a redacted value!
					changeset: ( globals.redacted.test( commit[ "changeset" ] ) === true ? undefined : commit[ "changeset" ] ),

					// Repository
					repository: {
						name: commit[ "repo" ],
						url: globals.baseURL + encodeURIComponent( commit[ "repo" ] ),
						total: data[ "total" ],

						// Repository branch, this can be a redacted value!
						branch: ( globals.redacted.test( commit[ "branch" ] ) === true ? undefined : {
							name: commit[ "branch" ],
							url: globals.baseURL + encodeURIComponent( commit[ "repo" ] ) + "/" + encodeURIComponent( commit[ "branch" ] )
						} )
					},

					// Author
					author: {
						name: commit[ "user" ][ "name" ],
						avatar: ( userAvatarMatch === undefined ? undefined : {
							id: ( userAvatarMatch[ 1 ] !== undefined ? userAvatarMatch[ 1 ] : userAvatarMatch[ 2 ] ),
							url: commit[ "user" ][ "avatar" ]
						} ),
						url: ( userAvatarMatch === undefined ? undefined : globals.baseURL.substring( 0, globals.baseURL.length - 2 ) + commit[ "user" ][ "name" ].replace( " ", "" ) ) // Turns out the URL isn't valid if the user doesn't have an avatar (i've seen this alot on the 'garrysmod' repo from non-Facepunch employees committing to it)
					},
					
					// Message, this can be a redacted value!
					message: ( globals.redacted.test( commit[ "message" ] ) === true ? undefined : functions.parseCommitMessage( commit[ "message" ] ) ),

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

/************** Export **************/

// Export main fetch function
module.exports = {
	fetch: fetch
}
