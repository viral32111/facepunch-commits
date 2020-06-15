/*
Facepunch Commits - An interface for the Facepunch Commits website.
Copyright (C) 2020 viral32111 (github.com/viral32111/facepunch-commits)

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

// Import packages
const https = require( "https" )

/************** Private functions **************/

// Helper function to check for a valid date (https://stackoverflow.com/a/44198641)
/* TODO: function isValidDate( date ) {
	return date && Object.prototype.toString.call( date ) === "[object Date]" && !isNaN( date )
} */

// Helper function to convert a string commit message into a nicer array
function parseCommitMessage( message ) {

	// Return the same message with the adjustments below
	return message
		.replace( /\r|\n/g, "\n" ) // Replace all CR & LF with just LF
		.split( "\n" ) // Split into array by line
		.filter( ( value ) => value != "" ) // Remove empty lines

}

// Helper function to promisify https.request()
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

// Helper function to collect all chunks from a HTTP response & convert them to a JSON object
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

/************** Export **************/

// Export private functions
module.exports = {
	parseCommitMessage: parseCommitMessage,
	httpsRequest: httpsRequest,
	parseResponse: parseResponse
}
