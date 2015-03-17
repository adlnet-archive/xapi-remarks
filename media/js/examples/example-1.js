var remarks = [
  '<tyler@example.com> <launched> <cool book>',
  '<tyler@example.com> <read> <page 1> ( d: "PT45S" ) { p: ["chapter 1"], g: ["cool book", "cool class"] }',
  '<tyler@example.com> <read> <page 2> ( d: "PT15S" ) { p: ["chapter 1"], g: ["cool book", "cool class"] }',
  '<tyler@example.com> <read> <page 3> ( d: "PT55S" ) { p: ["chapter 1"], g: ["cool book", "cool class"] }',
  '<tyler@example.com> <read> <page 4> ( d: "PT45S" ) { p: ["chapter 1"], g: ["cool book", "cool class"] }',
  '<tyler@example.com> <watched> <video 1> ( d: "PT3M" ) { p: ["page 4"], g: ["chapter 1", "cool book", "cool class"] }',
  '<tyler@example.com> <paused> <video 1> { p: ["page 4"], g: ["chapter 1", "cool book", "cool class"] }',
  '<tyler@example.com> <resumed> <video 1> { p: ["page 4"], g: ["chapter 1", "cool book", "cool class"] }',
  '<tyler@example.com> <watch> <video 1> ( d: "PT2M" ) { p: ["page 4"], g: ["chapter 1", "cool book", "cool class"] }',
  '<tyler@example.com> <completed> <video 1> ( d: "PT5M" ) { p: ["page 4"], g: ["chapter 1", "cool book", "cool class"] }',
  '<tyler@example.com> <read> <page 5> ( d: "PT45S" ) { p: ["chapter 1"], g: ["cool book", "cool class"] }',
  '<tyler@example.com> <answered> <question 1> ( r: "answer 2" ) { p: ["page 5"], g: ["chapter 1", "cool book", "cool class"] }',
  '<tyler@example.com> <answered> <question 1> ( r: "answer 3" ) { p: ["page 5"], g: ["chapter 1", "cool book", "cool class"] }',
  '<tyler@example.com> <answered> <question 1> ( r: "answer 2" ) { p: ["page 5"], g: ["chapter 1", "cool book", "cool class"] }',
  '<tyler@example.com> <answered> <question 2> ( r: "answer 4" ) { p: ["page 5"], g: ["chapter 1", "cool book", "cool class"] }',
  '<tyler@example.com> <answered> <question 3> ( r: "answer 1" ) { p: ["page 5"], g: ["chapter 1", "cool book", "cool class"] }',
  '<tyler@example.com> <completed> <assessment 1> ( s: [2, 0, 3], d: "PT2M" ) { p: ["page 5"], g: ["chapter 1", "cool book", "cool class"] }',
  '<tyler@example.com> <passed> <assessment 1> ( s: [2, 0, 3], d: "PT2M" ) { p: ["page 5"], g: ["chapter 1", "cool book", "cool class"] }',
  '<tyler@example.com> <suspended> <cool book> { g: ["page 5", "cool class"] }',
  '<tyler@example.com> <resumed> <cool book> { g: ["page 5", "cool class"] }',
  '<tyler@example.com> <read> <page 6> ( d: "PT45S" ) { p: ["chapter 2"], g: ["cool book", "cool class"] }',
  '<tyler@example.com> <read> <page 7> ( d: "PT25S" ) { p: ["chapter 2"], g: ["cool book", "cool class"] }',
  '<tyler@example.com> <read> <page 8> ( d: "PT1M15S" ) { p: ["chapter 2"], g: ["cool book", "cool class"] }'
];

var s = [];
remarks.forEach(function(remark) {
  // will log 2 undefineds ad the end because they return false
  var array = ADL.XAPIRemarks.remarkToArray(remark);
  var stmt = ADL.XAPIRemarks.remarkArrayToStatement(array);
  s.push(stmt);
});

console.log(s);

/* Uncomment the follow to send to an LRS
var conf = {
  "endpoint" : "https://lrs.adlnet.gov/xapi/",
  "auth" : "Basic " + toBase64('tom:1234'),
};
ADL.XAPIWrapper.changeConfig(conf);
ADL.XAPIWrapper.sendStatements(s);
*/
