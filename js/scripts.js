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
  '<tyler@example.com> <passed> <assessment1> ( (2, 0, 3) (2 minutes) ) { {chapter 1} {page 5, science 101, science} }',
  '<tyler@example.com> <passed> <assessment1> ( (2, 0, 3) ("PT2M") )',
  '<tyler@example.com> <passed> < dsaasghasdfasdfas',
  '<tyler@example.com> <3@)$@ _@#_!!dsaasghasdfasdfas'
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
    return arr;
  }
}

remarks.forEach(function(remark) {
  remarkToArray(remark);
});

// Merge two JSON object
function mergeJSON(obj1, obj2, result) {
  result = {};
  for(var key in obj1) result[key]=obj1[key];
  for(var key in obj2) result[key]=obj2[key];
  return result;
}

function remarkArrayToStatement(array) {
  //console.log(array);
  if (array.length > 3) {
    var avo = array.slice(0,3);
    var ex  = array.slice(3);
  } else {
    var avo = array;
  }
  var actor = avo[0].slice(1).slice(0,-1);
  var verb = avo[1].slice(1).slice(0,-1);
  var object = avo[2].slice(1).slice(0,-1);
  var stmt = {
    'actor': {
      'mbox': 'mailto:' + actor,
      'objectType': 'Agent'
    },
    'verb': {
      'display': {
        'en-US': verb
      },
      'id': 'http://adlnet.gov/expapi/verbs/' + verb
    },
    'object': {
      'id': 'http://example.com/' + object,
      'objectType': 'Object'
    }
  };
  // If more than an Actor, Verb and Object exist
  if (ex) {
    var stmt_ex = {};
    ex.forEach(function(o) {
      var type = o.substring(0,1);
      switch (type) {
        // result
        case "(":
          // turn it into an array of arrays
          arr = JSON.parse(o.replace(/\(/g,"[").replace(/\)/g,"]").replace(/\] \[/,"],[").trim());
          var scores = arr[0];
          var duration = arr[1];
          stmt_ex = {
            'result': {
              'score': {
                'raw': scores[0],
                'min': scores[1],
                'max': scores[2]
              },
              'duration': duration[0]
            }
          };
        break;
        // context
        case "{":
        break;
        // attachments
        case "[":
        break;
        default:
      }
      stmt = mergeJSON(stmt, stmt_ex);
    });
    return stmt;
  }
  return stmt;
}

var array = remarkToArray(remarks[9]);
var stmt = remarkArrayToStatement(array);
console.log(stmt);
