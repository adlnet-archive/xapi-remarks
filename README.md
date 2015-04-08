# xapi-remarks
A shorthand syntax for communicating xAPI Statements

The syntax is very strict but flexible enough to convey ideas about how to form your statements. Great for discussing interaction flows in chat or documents without concerning lengthy JSON Statements.

The parser will allow you to convert xAPI Remarks to xAPI Statements. This is helpful for rapidly generating statements that you can send to an LRS to advise you on reporting (especially if you're using xAPI Canteen).

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

*string* an email address, an email sha1sum, an openid url

#### Verb

*string* either a word or a URI. Words will automatically resolve to a URI. If they are an ADL reserved word, they will use the http://adlnet.gov/expapi/verbs/ base URI, otherwise http://example.com/verbs/ is the base URI.

#### Object

Currently only supports objectType Activity, Agent and StatementRef

*string* a URI of an Activity (Activity), an email address (Agent) or a UUID of a Statement (StatementRef)

#### Result

Currently accepts

* s: *array* score - an array of scores [raw, min, max]
* d: *string* duration - in the form of [ISO 8601 Durations](http://www.wikiwand.com/en/ISO_8601#/Durations), just like Statements.
* r: *string* response
* c: *boolean* completion
* w: *boolean* success (win)

#### Context

Currently only supports Context Activites

* p: *array* parent - an array of strings, either words or URIs
* g: *array* grouping - an array of strings, either words or URIs

#### Attachments

Currently unsupported


#### Extensions

Extensions are outside the scope of this tool


### Examples

```
<tyler@example.com> <passed> <assessment1>
<5a7a72c5ec7d3a7291b9b6101ae26101eb925099> <passed> <assessment1>
<http://tyler.openid.example.com> <passed> <assessment1>
<tyler@example.com> <passed> <assessment1> ( s: [2, 0, 3], d: "PT2M" ) { p: ["page 5"], g: ["chapter 1", "science 101", "science"] }
<tyler@example.com> <read> <assessment1> ( s: [2, 0, 3], d: "PT2M" ) { p: ["page 5"], g: ["chapter 1", "science 101", "science"] }
<tyler@example.com> <http://coolsite.com/verbs/read> <assessment1> ( s: [2, 0, 3], d: "PT2M") ) { p: ["page 5"], g: ["chapter 1", "science 101", "science"] }
<tyler@example.com> <passed> <assessment1> ( s: [2, 0, 3], d: "PT2M" ) { p: ["page 5"], g: ["chapter 1", "http://coolsite.com/acitivites/science_101", "science"] }
```

This project is still a work in progress, as such, syntax may (will) change.

[View demo front-end](http://adlnet.github.io/xapi-remarks)
