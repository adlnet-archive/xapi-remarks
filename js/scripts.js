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
  '<tyler@example.com> <passed> <assessment1> ( (2, 0, 3) ("PT2M") ) { {"chapter 1"} {"page 5", "science 101", "science"} }',
  '<tyler@example.com> <passed> <assessment1> ( (2, 0, 3) ("PT2M") ) { {"chapter 1"} {"page 5", "http://coolsite.com/acitivites/science_101", "science"} }',
  '<tyler@example.com> <passed> <assessment1> ( (2, 0, 3) ("PT2M") )',
  '<tyler@example.com> <passed> < dsaasghasdfasdfas',
  '<tyler@example.com> <3@)$@ _@#_!!dsaasghasdfasdfas'
];


remarks.forEach(function(remark) {
  // will log 2 undefineds ad the end because they return false
  console.log(ADL.Remarks.remarkToArray(remark));
});

var array = ADL.Remarks.remarkToArray(remarks[9]);
var stmt = ADL.Remarks.remarkArrayToStatement(array);
console.log(stmt);


$(function() {
  $("#generate-statement").click(function(e) {
    var remark = $("#remark").val();
    var array = ADL.Remarks.remarkToArray(remark);
    var stmt = ADL.Remarks.remarkArrayToStatement(array);
    $("#statement").val(JSON.stringify(stmt, undefined, 4));
    e.preventDefault();
  });
});
