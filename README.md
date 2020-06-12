# Facepunch Commits

This is a Node.js package for interfacing with the [Facepunch Commits](https://commits.facepunch.com) website, allowing you to asynchronously fetch any number of commits from any of the repositories.

## Documentation

### Importing the package

To import this package into your script or project, simply call [`require()`](https://nodejs.org/api/modules.html#modules_require_id) with `"facepunch-commits"` as the name. For example:

```javascript
const facepunchCommits = require( "facepunch-commits" )
```

### Fetch Commit(s)

To fetch one or more commits, call the `.fetch()` function from the imported package and then use [`.then()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) to catch the success callback of the promise. Optionally, you can also use [`.catch()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) to catch the failure callback of the promise. The success callback will return an array of [commit objects](#commit-object) as the first argument. The failure callback will return a number that represents an [error code](#error-codes) as the first argument.

To change the fetching options, provide an object as the first argument with the following structure (only options that differ from the default need to be provided):

* **Key:** `repository`
    * **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    * **Default:** [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Undefined).
    * **Description:** Fetch commits from this repository.

* **Key:** `max`
    * **Type:** [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    * **Default:** `100`.
    * **Description:** Fetch up to this number of commits.

* **Key:** `userAgent`
    * **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    * **Default:** `Facepunch Commits (github.com/viral32111/facepunch-commits)`.
    * **Description:** The [User-Agent HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent) to send with the requests.

### Commit Object

The commit object has the following structure (fields that aren't guaranteed are either due to redacted commit information or commits authored by non-Facepunch employees, ensure to verify if the field is equal to [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Undefined) before processing it):

* **Key:** `id`
    * **Type:** [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    * **Guaranteed:** Yes.
    * **Description:** The unique identifier for this commit.

* **Key:** `url`
    * **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    * **Guaranteed:** Yes.
    * **Description:** The direct URL of this commit on the Facepunch Commits website.

* **Key:** `changeset`
    * **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) or [undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Undefined)
    * **Guaranteed:** No.
    * **Description:** The changeset ID or shorthand commit SHA.

* **Key:** `repository`
    * **Type:** [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    * **Guaranteed:** Yes.
    * **Description:** An object holding properties about the repository this commit is associated with.

    * **Key:** `name`
        * **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
        * **Guaranteed:** Yes.
        * **Description:** The name of this repository.

    * **Key:** `url`
        * **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
        * **Guaranteed:** Yes.
        * **Description:** The direct URL of this repository on the Facepunch Commits website.

    * **Key:** `total`
        * **Type:** [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
        * **Guaranteed:** Yes.
        * **Description:** The total number of commits pushed to this repository (not to be confused with the `max` option).

    * **Key:** `branch`
        * **Type:** [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) or [undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Undefined)
        * **Guaranteed:** No.
        * **Description:** An object holding properties about the branch of the repository this commit is associated with.

        * **Key:** `name`
            * **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
            * **Guaranteed:** Yes.
            * **Description:** The name of this branch.

        * **Key:** `url`
            * **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
            * **Guaranteed:** Yes.
            * **Description:** The direct URL of this repository's branch on the Facepunch Commits website.

* **Key:** `author`
    * **Type:** [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    * **Guaranteed:** Yes.
    * **Description:** An object holding properties about the author of this commit.

    * **Key:** `name`
        * **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
        * **Guaranteed:** Yes.
        * **Description:** The name of this author.

    * **Key:** `url`
        * **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) or [undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Undefined)
        * **Guaranteed:** No.
        * **Description:** The direct URL of this author on the Facepunch Commits website.

    * **Key:** `avatar`
        * **Type:** [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
        * **Guaranteed:** No.
        * **Description:** An object holding properties about the avatar of this author.

        * **Key:** `id`
            * **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
            * **Guaranteed:** Yes.
            * **Description:** The ID of this avatar.

        * **Key:** `url`
            * **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
            * **Guaranteed:** Yes.
            * **Description:** The direct URL to the avatar of this author on the Facepunch Commits website.

* **Key:** `message`
    * **Type:** [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    * **Guaranteed:** No.
    * **Description:** The message associated with this commit.

* **Key:** `when`
    * **Type:** [date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
    * **Guaranteed:** Yes.
    * **Description:** The date & time this commit happened.

### Error Codes

These are the error codes returned by the failure callback. I recommend using a [switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) statement to give appropriate feedback when one is encountered.

#### Option Validation

Code | Description
---- | -----------
101  | The `repository` option isn't valid string.
102  | The `max` option isn't valid number.
103  | *Reserved for future use*.
104  | *Reserved for future use*.
105  | The `userAgent` option isn't a valid string.
106  | Attempted to fetch less than one commit.
107  | The `userAgent` option is an empty string.

#### Website Responses

Code | Description
---- | -----------
201  | The specified `repository` doesn't exist.
202  | The specified `repository` returned no commits.

### Example

```javascript
// Import packages
const facepunchCommits = require( "facepunch-commits" )

// Fetch the latest commit with no specific repository
facepunchCommits.fetch( { max: 1 } ).then( ( commits ) => {

    // Display a summary of the commit
    console.log( `[${ commit.id } @ ${ commit.date }] ${ commit.author.name }: ${ commit.message }` )

} ).catch( ( errorCode ) => {

    // Display the error code
    console.error( `Error ${ errorCode }!` )

} )
```

## Legal

### License

This project is licensed and distributed under the [GNU Affero General Public License v3.0](https://www.gnu.org/licenses/agpl-3.0.html) in the hope that it will be useful to the open-source community and help to educate future programmers. This is free, open-source software meaning everyone is allowed to take this source code to modify it, redistribute it, use it privately or commercially so long as they publicly disclose the complete source code, state the changes they've made to it, provide a license and copyright notice however is appropriate and finally, retain the same license. *[Learn more](LICENSE.md).*

### Distribution

I kindly ask anyone who wishes to redistribute this software to please [contact me](mailto:contact@viral32111.com?subject=Facepunch%20Commits%20Distribution) beforehand so that I may review how the software is being used. Of course, I can't stop people from distributing it, but I would love to see how other users have taken this project and adapted it.

### Contributing

Users who contribute to the source code of this project have an express grant of patent rights. This means they hold the copyright for the code that they create. However, their code still falls under the same license permissions and conditions.

### Warranty

This software is distributed without any warranty, without even the implied warranty of merchantability or fitness for a particular purpose. *[Learn more](https://www.gnu.org/licenses/).*

### Copyright

Copyright (C) 2020 [viral32111](https://github.com/viral32111).
