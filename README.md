# xapi-remarks
A shorthand syntax for communicating xAPI Statements

The syntax is very strict but flexible enough to convey ideas about how to form your statements. Great for discussing interaction flows in chat or documents without concerning lengthy JSON Statements.

The parser will allow you to convert xAPI Remarks to xAPI Statements. This is helpful for rapidly generating statements that you can send to an LRS to advise you on reporting (especially if you're using xAPI Canteen).

### About this Repository

- `src/*` includes the source files for xapi-remarks
- `dist/xapi-remarks.min.js` is this distributed remarks file for use in your project
- `examples/*` show additional examples for usage
- `lib/*` includes libraries used by examples
- `media/*` includes media used by examples

#### Building

To build, you must have grunt installed `npm install -g grunt`. Use `npm install` to install all dependencies for building. Run the default grunt task with `grunt` to build the dist js.

### Valid Syntax
```
<Actor> <Verb> <Object> (result) {context} [attachments]
<Actor> <Verb> <Object> (result) {context}
<Actor> <Verb> <Object> (result)
<Actor> <Verb> <Object>
<Actor> <Verb> <Object> {context} [attachments]
<Actor> <Verb> <Object> (result) [attachments]
<Actor> <Verb> <Object> [attachments]
<Actor> <Verb> <Object> {context}
```

The first three parameter's are required by Statements and thus required by Remarks. Any following object will have keys to represent their respective Statement JSON keys. Below is a short list of what values are currently supported for each part of a Remark.

#### Actor

Currently only supports Agent:

***string*** an email address, an email sha1sum, an openid url. The "name" property of the actor can be defined with a " | " delimiter, e.g. `<tyler@example.com | Tyler Mulligan>`. The spaces are required.

#### Verb

***string*** either a word or a URI. Words will automatically resolve to a URI. If they are an ADL reserved word, they will use the http://adlnet.gov/expapi/verbs/ base URI, otherwise http://example.com/verbs/ is the base URI. The "display" property of the verb can be defined with a " | " delimiter, e.g. `<passed | has passed>`. The spaces are required.

#### Object

Currently only supports objectType Activity, Agent and StatementRef

***string*** a URI of an Activity (Activity), an email address (Agent) or a UUID of a Statement (StatementRef)

#### Result

Currently accepts

* score: ***array*** score - an array of scores [raw, min, max]
* duration: ***string*** duration - in the form of [ISO 8601 Durations](http://www.wikiwand.com/en/ISO_8601#/Durations), just like Statements.
* response: ***string*** response
* completion: ***boolean*** completion
* success: ***boolean*** success

#### Context

Currently only supports Context Activites

* parent: ***array*** parent - an array of strings, either words or URIs
* grouping: ***array*** grouping - an array of strings, either words or URIs
* category: ***array*** category - an array of strings, either words or URIs
* other: ***array*** other - an array of strings, either words or URIs

#### Attachments

Currently unsupported


#### Extensions

Extensions are outside the scope of this tool


### Examples

```
<tyler@example.com> <passed> <assessment1>
<tyler@example.com | Tyler Mulligan> <passed> <assessment1>
<tyler@example.com> <passed | has passed> <assessment1>
<5a7a72c5ec7d3a7291b9b6101ae26101eb925099> <passed> <assessment1>
<http://tyler.openid.example.com> <passed> <assessment1>
<tyler@example.com> <progressed> <http://adlnet.github.io>
<tyler@example.com> <added> <http://adlnet.github.io>
<tyler@example.com> <passed> <assessment1> ( score: [2, 0, 3], duration: "PT2M" ) { parent: ["page 5"], grouping: ["chapter 1", "science 101", "science"] }
<tyler@example.com> <passed> <assessment1> ( score: [2, 0, 3], duration: "PT2M", response: "hello", completion: true, success: false ) { parent: ["page 5"], grouping: ["chapter 1", "science 101", "science"] }
<tyler@example.com> <passed> <assessment1> ( score: [2, 0, 3], duration: "PT2M", response: "hello", completion: true, success: false ) { parent: ["page 5"], grouping: ["chapter 1", "science 101", "science"], category: ["http://example.com/profiles/ebook"], other: ["test"] }
<tyler@example.com> <voided> <137ca18f-97f6-4477-981a-696fb41c6b63>
```

This project is still a work in progress, as such, syntax may (will) change.

[View demo front-end](http://adlnet.github.io/xapi-remarks)
