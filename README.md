# xapi-remarks
A shorthand syntax for communicating xAPI Statements

The syntax is very strict but flexible enough to convey ideas about how to form your statements. Great for discussing interaction flows in chat or documents without concerning lengthy JSON Statements.

The parser will allow you to convert xAPI Remarks to xAPI Statements. This is helpful for rapidly generating statements that you can send to an LRS to advise you on reporting (especially if you're using xAPI Canteen).

### Valid Syntax
```
<Agent> <Verb> <Object> (result) {context} [attachments]
<Agent> <Verb> <Object> (result) {context}
<Agent> <Verb> <Object> (result)
<Agent> <Verb> <Object>
<Agent> <Verb> <Object> {context} [attachments]
<Agent> <Verb> <Object> (result) [attachments]
<Agent> <Verb> <Object> [attachments]
<Agent> <Verb> <Object> {context}
```

The first three parameter's are required by Statements and thus required by Remarks. Any following object will require the same matching brace style as its parent, e.g. `( (2, 0, 3) (1 minute) )` which represents scores (raw, min, max) and duration. 

### Examples

```
<tyler> <passed> <assessment 1> ( (2, 0, 3) (2 minutes) ) { {chapter 1} {page 5, science 101, science} }
```

This project is still a work in progress, as such, syntax may (will) change.
