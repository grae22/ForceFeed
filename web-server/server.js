//-----------------------------------------------------------------------------
// NOTE: Install the httpdispatcher with 'npm install httpdispatcher'.
//-----------------------------------------------------------------------------

// Requires: npm install httpdispatcher
var dispatcher = require( 'httpdispatcher' );

// Lets require/import the HTTP module
var http = require( 'http' );

// Lets define a port we want to listen to
const PORT = 3010;

// Mongo
var MongoClient = require( 'mongodb' ).MongoClient, assert = require( 'assert' );
var mongoUrl = 'mongodb://localhost:27017/ForceFeed';

//----------------------------------------------------------------------------- 

// We need a function which handles requests and send response

function handleRequest( request, response )
{
  try
  {
    //log the request on console
    console.log( request.url );

    //Disptach
    dispatcher.dispatch( request, response );
  }
  catch(err)
  {
    console.log( err );
  }
}

//-----------------------------------------------------------------------------

// Create a server
//var server = http.createServer( handleRequest ).listen( PORT, "graemepc" );
var server = http.createServer( handleRequest ).listen( PORT, "graeme" );

//-----------------------------------------------------------------------------

// For all your static (js/css/images/etc.) set the directory name (relative path).
dispatcher.setStatic( 'resources' );

//-----------------------------------------------------------------------------

// GET requests

dispatcher.onGet( "/changelists", function( req, res )
{
  console.log( 'Changelists *get* request received.' );
  
  // Extract the submitters - if blank we select from all.
  var submitters = req.params[ 'submitters' ];
  console.log( 'Submitters: ' + submitters );
  if( submitters == '\'\'' )
  {
    submitters = [ /.*/ ];
  }
  else
  {
    submitters = submitters.replace( new RegExp( '\'', 'g' ), '' ).split( ' ' );
    //submitters = submitters.replace( new RegExp( ' ', 'g' ), '' ).split( ',' );
  }
  
  // Get the changelists from the Mongo DB.
  console.log( "Finding changelists for submitter(s): " + submitters );

  var changelists;
  
  MongoClient.connect(
    mongoUrl,
    function( err, db )
    {
      assert.equal( null, err );
      console.log( 'Connected to DB.' );
      
      changelists = db.collection( 'Changelists' )
      changelists.find( { submitter: { $in: submitters } } ).sort( { 'timestamp': -1 } ).toArray(
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