//-----------------------------------------------------------------------------
// NOTE: Install the httpdispatcher with 'npm install httpdispatcher'.
//-----------------------------------------------------------------------------

// Requires: npm install httpdispatcher.
var dispatcher = require( 'httpdispatcher' );

// Lets require/import the HTTP module.
var http = require( 'http' );

// This server's name.
var serverName = 'graemepc';
//var serverName = 'graeme';

// Lets define a port we want to listen to.
const port = 3010;

// Mongo.
var mongoClient = require( 'mongodb' ).MongoClient, assert = require( 'assert' );
var mongoUrl = 'mongodb://localhost:27017/ForceFeed';

// For exectuing files.
var execFile = require( 'child_process' ).execFile;

//----------------------------------------------------------------------------- 

// We need a function which handles requests and send response.

function handleRequest( request, response )
{
  try
  {
    //log the request on console
    console.log( request.url );

    //Disptach
    dispatcher.dispatch( request, response );
  }
  catch( err )
  {
    console.log( err );
  }
}

//-----------------------------------------------------------------------------

// Create a server
var server = http.createServer( handleRequest ).listen( port, serverName );

//-----------------------------------------------------------------------------

// For all your static (js/css/images/etc.) set the directory name (relative path).
dispatcher.setStatic( 'resources' );

//-----------------------------------------------------------------------------

// Changelist GET requests.

dispatcher.onGet( "/changelists", function( req, res )
{
  console.log( 'Changelists *get* request received.' );

  var query = '';
  query = req.params[ 'submitters' ];

  // Get the pagination start index and max count.
  var paginationStartIndex = -1;
  var paginationMaxCount = -1;

  var submittersEndIndex = query.indexOf( '?startIndex=' ); 
  var startIndex = submittersEndIndex + '?startIndex='.length;
  var maxCountIndex = query.indexOf( '?maxCount=' ) + '?maxCount='.length;

  paginationStartIndex =
    parseInt(
      query
        .substr(
          startIndex,
          maxCountIndex - startIndex ) );

  paginationMaxCount =
    parseInt(
      query
        .substr(
          maxCountIndex,
          query.length - maxCountIndex ) );

  // Extract the submitters - if blank we select from all.
  var submitters = query.substr( 0, submittersEndIndex ).toLowerCase();

  if( submitters == '\'\'' )
  {
    submitters = [ /.*/ ];
  }
  else
  {
    submitters = submitters.replace( new RegExp( '\'', 'g' ), '' ).split( ' ' );
  }
  
  // Get the changelists from the Mongo DB.
  console.log( "Finding changelists for submitter(s): " + submitters );

  var changelists;
  
  mongoClient.connect(
    mongoUrl,
    function( err, db )
    {
      assert.equal( null, err );
      console.log( 'Connected to DB.' );
      
      changelists = db.collection( 'Changelists' );
      changelists.find( { submitter: { $in: submitters } } )
        .sort( { 'timestamp': -1 } )
        .skip( paginationStartIndex )
        .limit( paginationMaxCount ).toArray(
          function( err, docs )
          {
            if( err != null )
            {
              console.log( 'ERR: ' + err );
            }
            else
            {
              console.log( 'Found ' + docs.length + ' changelist(s).' );
            }

            res.writeHead(
              200,
              {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*'
              });
              
            res.end( JSON.stringify( docs ) );
            
            db.close();
          }
        );
    }
  );
});

//-----------------------------------------------------------------------------

// File GET requests.

dispatcher.onGet( "/file", function( req, res )
{
  var params = req.params[ 'file' ].split( ',' );
  var filename = params[ 0 ];
  var rev1 = params[ 1 ];
  var rev2 = params[ 2 ];
  
  console.log( 'File *get* request received: ' + filename );
  //console.log( 'File rev 1: ' + rev1 );
  //console.log( 'File rev 2: ' + rev2 );

  var args;

  if( rev1 === rev2 )  // Just get the file.
  {
    args =
      [
        'print',
        '-q',
        filename + '#' + rev1
      ];
  }
  else  // Do a diff.
  {
    args =
      [
        'diff2',
        '-du[15]',
        filename + '#' + rev1,
        filename + '#' + rev2
      ];
  }

  execFile(
    'p4.exe',
    args,
    { env: { 'P4USER': 'graemeb' } },
    (error, stdout, stderr) =>
      {
        console.error( 'File GET error: ' + error );
        console.error( 'File GET stderr: ' + stderr );
        //console.log( 'DATA: ' + stdout );

        res.writeHead(
          200,
          {
            'Content-Type': 'text/plain; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
          });
        
        if( error != null )
        {
          res.end( 'Content is unavailable.' );
        }
        else
        {
          res.end( stdout );
        }
      });
});
  
//-----------------------------------------------------------------------------

// Submitter-list GET requests.

dispatcher.onGet( "/get-submitters", function( req, res )
{
  // Get the submitters from the Mongo DB.
  console.log( "Finding submitters..." );

  mongoClient.connect(
    mongoUrl,
    function( err, db )
    {
      assert.equal( null, err );
      console.log( 'Connected to DB.' );
      
      var changelists = db.collection( 'Changelists' );
      changelists.distinct( 'submitter',
          function( err, docs )
          {
            if( err != null )
            {
              console.log( 'ERR: ' + err );
            }
            else
            {
              console.log( 'Found ' + docs.length + ' submitter(s).' );
            }

            res.writeHead(
              200,
              {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*'
              });

            res.end( JSON.stringify( docs ) );
            db.close();
          }
        );
    }
  );
});

//-----------------------------------------------------------------------------

// POST requests
/*
dispatcher.onPost( "/doc-generator", function( req, res )
{
  //console.log('post received');
  //console.log( req.body );
  
  res.writeHead(
    200,
    {
      'Content-Type': 'application/json',
	  'Access-Control-Allow-Origin': '*'
      //'Access-Control-Allow-Origin': 'http://localhost:5555'
	  //'Access-Control-Allow-Origin': 'http://beast:9877'
    } );
  
  // Dump the data to file.
  var fs = require( 'fs' );
  fs.writeFile(
    "data.json",
    req.body,
      function( err )
      {
        if( err )
        {
          console.log( err );
        }
        else
        {
          console.log( "Data written to file." );
        }
      });
  
  // Run the generator app.
  var timestamp = Math.floor( Date.now() / 1000 );
  var outputName = "Output_" + timestamp;
  
  var exec = require( 'child_process' ).execFile;
  exec(
    appPath + "Generator.exe",
    [
      "-inputFile",
      appPath + "data.json",
      "-outputName",
      "./output/" + outputName
    ],
    function( err )
    {
      console.log( err );
    });
    
    res.end( `
      {
        "docLink": "file://beast/ScoringCheckWebAppOutput/` + outputName + `.docx",
        "xmlLink": "file://beast/ScoringCheckWebAppOutput/` + outputName + `.xml"
      }` ); 
});
*/
//-----------------------------------------------------------------------------