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

/************** Global variables **************/

// Specific URLs and options for the Facepunch Commits website
const baseURL = "https://commits.facepunch.com/r/" // Goes at the start
const formatQuery = "?format=json" // Goes on the end (kinda)

// Regular expressions for parsing and checking API results
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

/************** Export **************/

// Export globals
module.exports = {
	baseURL:  baseURL,
	formatQuery:  formatQuery,

	redacted:  redacted,
	avatarID:  avatarID,

	defaultOptions: defaultOptions
}
