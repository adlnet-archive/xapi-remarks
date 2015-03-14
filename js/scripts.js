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

// global variables
var baseuri = "http://example.com/";
// ADL verbs
var verbs = ['answered','asked','attempted','attended','commented','completed','exited','experienced','failed','imported','initialized','interacted','launched','mastered','passed','preferred','progressed','registered','responded','resumed','scored','shared','suspended','terminated','voided'];
// uri regex pattern
var re_uri = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

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

  // Check if full URI or in ADL verb list
  if (verbs.indexOf(verb) != -1) {
    verburi = 'http://adlnet.gov/expapi/verbs/' + verb;
  } else if (verb.match(re_uri) == null) {
    verburi = baseuri + 'verbs/' + verb;
  } else {
    verburi = verb;
    verb = verburi.split(/\//).pop();
  }

  // Check if full URI or needs to be made into one
  if (object.match(re_uri) == null) {
    objecturi = baseuri + 'activities/' + encodeURI(object);
  }

  var stmt = {
    'actor': {
      'mbox': 'mailto:' + actor,
      'objectType': 'Agent'
    },
    'verb': {
      'display': {
        'en-US': verb
      },
      'id': verburi
    },
    'object': {
      'id': objecturi,
      'objectType': 'Activity'
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
          arr = JSON.parse(o.replace(/\{/g,"[").replace(/\}/g,"]").replace(/\] \[/,"],[").trim());
          var parent = arr[0][0];
          var grouping = arr[1];

          if (parent.match(re_uri) == null) {
            parenturi = baseuri + 'activities/' + encodeURI(parent);
          } else {
            parenturi = parent;
            parent = parenturi.split(/\//).pop();
          }

          if (grouping) {
            var grouping_arr = [];
            grouping.forEach(function(g) {
              
              if (g.match(re_uri) == null) {
                guri = baseuri + 'activities/' + encodeURI(g);
              } else {
                guri = g;
                g = guri.split(/\//).pop();
              }

              grouping_arr.push({
               "definition": {
                    "name": {
                        "en-US": g
                    }
                },
                'id': guri,
                'objectType': 'Activity'
              });
            });
          }
          stmt_ex = {
            'context': {
              'contextActivities': {
                'parent': [
                  {
                    "definition": {
                        "name": {
                            "en-US": parent
                        }
                    },
                    'id': parenturi,
                    'objectType': 'Activity'
                  }
                ]
              }
            }
          }
          if (grouping_arr) {
            stmt_ex.context.contextActivities['grouping'] = grouping_arr;
          }
        break;
        // attachments
        case "[":
        break;
        default:
      }
      stmt = mergeJSON(stmt, stmt_ex);
    });
  }
  return stmt;
}

var array = remarkToArray(remarks[9]);
var stmt = remarkArrayToStatement(array);
console.log(stmt);
