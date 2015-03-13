// All except the last two will parse
var remarks = [
  '<Agent> <Verb> <Object> (result) {context} [attachments]',
  '<Agent> <Verb> <Object> (result) {context}',
  '<Agent> <Verb> <Object> (result)',
  '<Agent> <Verb> <Object>',
  '<Agent> <Verb> <Object> {context} [attachments]',
  '<Agent> <Verb> <Object> (result) [attachments]',
  '<Agent> <Verb> <Object> [attachments]',
  '<Agent> <Verb> <Object> {context}',
  '<tyler> <passed> <assessment 1> ( (2, 0, 3) (2 minutes) ) { {chapter 1} {page 5, science 101, science} }',
  '<tyler> <passed> < dsaasghasdfasdfas',
  '<tyler> <3@)$@ _@#_!!dsaasghasdfasdfas'
];

/* Covert a Remark String into an array
 * TODO:
 * - match reserved verbs
 * - throw out invalid matches
 */
function remarkToArray(remark) {
  var re = /(<.+>) (<.+>) (<.+>)(\s?(\(.+\)))?(\s?(\{.+\}))?(\s?(\[.+\]))?/;
  var raw = remark.match(re);
  if (raw) {
    var arr = [];
    var i=0;
    //console.log(raw);
    raw.forEach(function(val) {
      // throw out "duplicates" created by the regex groupings
      if (i != 0 && i != 4 && i != 6 && i != 8) {
        // throw out empty groups
        if (val != undefined)
          arr.push(val);
      }
      i++;
    });
    console.log(arr);
  }
}

remarks.forEach(function(remark) {
  remarkToArray(remark);
});
