<div style="text-align: center;"><img src="https://i.imgur.com/XsVlbn9.png"></div>

This is a Node.js package for interfacing with the [Facepunch Commits](https://commits.facepunch.com) website, allowing you to asynchronously fetch any number of commits from any of the repositories.

## Documentation

### Installing the package

To install this package into your project, firstly create a `.npmrc` file inside your project folder, then within that place `registry=https://npm.pkg.github.com/viral32111`. After this, you can install the package by running `npm install @viral32111/facepunch-commits`.

### Importing the package

To import this package into your script, simply call [`require()`](https://nodejs.org/api/modules.html#modules_require_id) with `"@viral32111/facepunch-commits"` as the name. For example:

```javascript
const facepunchCommits = require( "@viral32111/facepunch-commits" )
```

### Fetch Commit(s)

To fetch one or more commits, call the `.fetch()` function from the imported package and then use [`.then()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) to catch the success callback of the promise. Optionally, you can also use [`.catch()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) to catch the failure callback of the promise. The success callback will return an array of [commit objects](#commit-object) as the first argument. The failure callback will return a number that represents an [error code](#error-codes) as the first argument.

To change the fetching options, provide an object as the first argument with the following structure (only options that differ from the default need to be provided):

* **Key:** `repository`
	* **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).
	* **Default:** [undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Undefined).
	* **Description:** Fetch commits from this repository.

* **Key:** `max`
	* **Type:** [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number).
	* **Default:** `100`.
	* **Description:** Fetch up to this number of commits.

* **Key:** `userAgent`
	* **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).
	* **Default:** `Facepunch Commits Interface/1.1.0`.
	* **Description:** The [User-Agent HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent) to send with the requests, ideal place for name and version of your project.

* **Key:** `from`
	* **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).
	* **Default:** `github.com/viral32111/facepunch-commits`.
	* **Description:** The [From HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/From) to send with the requests, ideal place for contact information.

It is recommended that you appropriately change the `userAgent` and `from` options to match your project.

### Commit Object

The commit object has the following structure (fields that are not guaranteed are either due to redacted commit information or commits authored by non-Facepunch employees, ensure to verify if the field is equal to [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Undefined) before processing it):

* **Key:** `id`
	* **Type:** [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number).
	* **Guaranteed:** ✔️
	* **Description:** The unique identifier for this commit.

* **Key:** `url`
	* **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).
	* **Guaranteed:** ✔️
	* **Description:** The direct URL of this commit on the Facepunch Commits website.

* **Key:** `changeset`
	* **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) or [undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Undefined).
	* **Guaranteed:** ❌
	* **Description:** The changeset ID or shorthand commit SHA.

* **Key:** `repository`
	* **Type:** [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object).
	* **Guaranteed:** ✔️
	* **Description:** An object holding properties about the repository this commit is associated with.

	* **Key:** `name`
		* **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).
		* **Guaranteed:** ✔️
		* **Description:** The name of this repository.

	* **Key:** `url`
		* **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).
		* **Guaranteed:** ✔️
		* **Description:** The direct URL of this repository on the Facepunch Commits website.

	* **Key:** `total`
		* **Type:** [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number).
		* **Guaranteed:** ✔️
		* **Description:** The total number of commits pushed to this repository (not to be confused with the `max` option).

	* **Key:** `branch`
		* **Type:** [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) or [undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Undefined).
		* **Guaranteed:** ❌
		* **Description:** An object holding properties about the branch of the repository this commit is associated with.

		* **Key:** `name`
			* **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).
			* **Guaranteed:** ✔️
			* **Description:** The name of this branch.

		* **Key:** `url`
			* **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).
			* **Guaranteed:** ✔️
			* **Description:** The direct URL of this repository's branch on the Facepunch Commits website.

* **Key:** `author`
	* **Type:** [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object).
	* **Guaranteed:** ✔️
	* **Description:** An object holding properties about the author of this commit.

	* **Key:** `name`
		* **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).
		* **Guaranteed:** ✔️
		* **Description:** The name of this author.

	* **Key:** `url`
		* **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) or [undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Undefined).
		* **Guaranteed:** ❌
		* **Description:** The direct URL of this author on the Facepunch Commits website.

	* **Key:** `avatar`
		* **Type:** [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object).
		* **Guaranteed:** ❌
		* **Description:** An object holding properties about the avatar of this author.

		* **Key:** `id`
			* **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).
			* **Guaranteed:** ✔️
			* **Description:** The ID of this avatar.

		* **Key:** `url`
			* **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).
			* **Guaranteed:** ✔️
			* **Description:** The direct URL to the avatar of this author on the Facepunch Commits website.

* **Key:** `message`
	* **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).
	* **Guaranteed:** ❌
	* **Description:** The message associated with this commit.

* **Key:** `when`
	* **Type:** [date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).
	* **Guaranteed:** ✔️
	* **Description:** The date & time this commit happened.

### Error Codes

These are the error codes returned by the failure callback. I recommend using a [switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) statement to give appropriate feedback when one is encountered.

#### Option Validation

Code | Description
---- | -----------
101  | The `repository` option is not valid string.
102  | The `max` option is not valid number.
103  | *[Reserved for future use](https://github.com/viral32111/facepunch-commits/projects/1#card-39996517)*.
104  | *[Reserved for future use](https://github.com/viral32111/facepunch-commits/projects/1#card-39996549)*.
105  | The `userAgent` option is not a valid string.
106  | Attempted to fetch less than one commit.
107  | The `userAgent` option is an empty string.
108  | The `from` option is not a valid string.
109  | The `from` option is an empty sstring.

#### Website Responses

Code | Description
---- | -----------
201  | The specified `repository` does not exist.
202  | The specified `repository` returned no commits.

### Example

Here is a basic example, demonstrating how to use this package:

```javascript
// Import packages
const facepunchCommits = require( "@viral32111/facepunch-commits" )

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
```

That example, if successful, should produce an output similar to:

```
[366559 @ Wed Jun 10 2020 17:41:47 GMT+0100 (British Summer Time)] Rubat: You can try to join full servers again,Merge branch 'master' of garrysmod
```

## Legal

### License

This software is licensed and distributed under the [GNU Affero General Public License v3.0](https://www.gnu.org/licenses/agpl-3.0.html) in the hope that it will be useful to the open-source community and help to educate future programmers. This is free, open-source software meaning you are allowed to take this source code to modify it, redistribute it, use it privately or commercially so long as you publicly disclose the complete source code, state the changes you have made to it, provide a license and copyright notice however is appropriate and finally, retain the same license. *[Learn more](LICENSE.md).*

### Distribution

I kindly ask anyone who wishes to redistribute this software to please [contact me](mailto:contact@viral32111.com?subject=Facepunch%20Commits%20Distribution) beforehand so that I may review how the software is being used. Of course, I cannot stop you from distributing it, but I would love to see how you have taken this software and adapted it. This is in your best interest, as adaptations and redistributions that I see as interesting or high quality may be listed here, or given extra publicity.

If you are intending to redistribute the program with changes because this repository seems stale, dead, or otherwise abandoned, please do not. You should contribute your changes directly to this repository and keep it active. If you are redistributing this software at a cost, or over a network, please ensure you are following the conditions described in the license. Most importantly, the complete public disclosure of the license and source code of your redistribution.

### Contributing

When you contribute to this software, whether it be code enhancements, code optimisations, new features, or anything else, you will have an express grant of patent rights over your contribution. This means that you hold the copyright and ownership of what you create. If you are contributing content that is not originally authored by you, please ensure that you have the appropriate permission from the original author beforehand, or better, request the original author to contribute it on your behalf. Please note, however, your contribution still falls under the same license permissions and conditions described in the license, so others are still free to adapt, modify and redistribute it. If you do not wish for this, then please do not contribute to this software.

### Warranty

This software is provided as-is, without any warranty of any kind, without even the implied warranty of merchantability or fitness for a particular purpose. However, if you discover the software is defective (in the case of bugs with the source code) while you are using it, then you may report it [here](https://github.com/viral32111/facepunch-commits/issues) as it may turn out to be an issue with the software as a whole. Please note, this does not guarantee that it will be fixed, nor does it also imply responsibility by the author of the code, as bugs are often accidental mistakes caused by human error. In any other situation, you assume the responsibility and cost of all necessary servicing, repair, or correction.

### Liability

I and other code authors are not responsible for anything you do while using this program. Any general, special, incidental, or consequential damages, data loss, reports, penalties, or other repercussions of utilisation caused by your abuse, misuse, or inability to use this software correctly fall under your responsibility.

### Notice

The [Facepunch Commits](https://commits.facepunch.com) website and the Facepunch logo are owned by [Facepunch Studios](https://facepunch.com/). This software and I are not affiliated with Facepunch. *[Learn more](https://facepunch.com/legal).*

### Copyright

Copyright (C) 2020 - 2022 [viral32111](https://github.com/viral32111).
