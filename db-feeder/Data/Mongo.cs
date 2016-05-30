using System;
using System.Collections.Generic;
using System.Diagnostics;
using MongoDB.Bson;
using MongoDB.Driver;

namespace ForceFeed.DbFeeder.Data
{
  class Mongo
  {
    //-------------------------------------------------------------------------

    private IMongoClient Client { get; set; } = new MongoClient();
    private IMongoDatabase Database { get; set; }

    //-------------------------------------------------------------------------

    public Mongo()
    {
      Database = Client.GetDatabase( "ForceFeed" );
    }

    //-------------------------------------------------------------------------

    public void Refresh()
    {
      // Get the last update timestamp from the db.
      var updateHistory = Database.GetCollection<BsonDocument>( "UpdateHistory" );
      var filter = new BsonDocument();
      var updateHistoryResult = updateHistory.Find( filter ).ToList();

      // No update history? Set the last update as a set number of days ago.
      if( updateHistoryResult.Count == 0 )
      {
        updateHistory.InsertOne(
          new BsonDocument
          {
            {
              "timstamp",
              DateTime.Now.AddDays(
                -Program.Settings.GetSetting<int>(
                  "InitialPriorDaysChangelistsToImport", 1, true ) )
            }
          }
        );

        // Should now be one record.
        updateHistoryResult = updateHistory.Find( filter ).ToList();
        Debug.Assert( updateHistoryResult.Count == 1 );
      }

      DateTime lastUpdateDate = updateHistoryResult[ 0 ][ 1 ].ToLocalTime();
      DateTime nowDate = DateTime.Now;

      // Get changelists between the last update and now.
      List<Changelist> changelistCollection = new List<Changelist>();

      ChangelistHelpers.GetChangelistsFromP4(
        lastUpdateDate,
        nowDate,
        ref changelistCollection );

      // Bail if no changelists were returned, we don't update the update
      // history since there may actually be changelists for the specified
      // period but they weren't returned due to a problem with the
      // look-up (it currently fails silently).
      if( changelistCollection.Count == 0 )
      {
        //return;
      }

      // Grab the changelists collection from the db so we can add to it.
      var changelistsDbCollection =
        Database.GetCollection<BsonDocument>( "Changelists" );

      foreach( Changelist changelist in changelistCollection )
      {
        // Build a new changelist bson doc.
        BsonDocument changelistDoc = new BsonDocument();
        changelistDoc.Add( "id", changelist.Id );
        changelistDoc.Add( "timestamp", changelist.SubmittedDate.ToString( "yyyy/MM/dd HH:mm" ) );
        changelistDoc.Add( "description", changelist.Description );
        changelistDoc.Add( "submitter", changelist.Submitter );

        // Get the changelist's files from perforce.
        List<string> files;

        ChangelistHelpers.GetChangelistFilesFromP4(
          changelist.Id,
          out files );

        // Add the files to the doc.
        BsonArray filesDoc = new BsonArray();
        changelistDoc.Add( "files", filesDoc );

        foreach( string file in files )
        {
          BsonDocument fileDoc = new BsonDocument();
          fileDoc.Add( "filename", file );
          filesDoc.Add( fileDoc ); 
        } 

        // Add the new doc to the db collection.
        var result =
          changelistsDbCollection.Find(
            new BsonDocument { { "id", changelist.Id } } ).ToList();

        if( result.Count == 0 )
        {
          changelistsDbCollection.InsertOne( changelistDoc );
        }
      }

      // Update the update history.
      // TODO: Make this work.
      BsonDocument x = new BsonDocument( updateHistoryResult[ 0 ] );
      x[ 1 ] = nowDate;

      //updateHistory.UpdateOne( updateHistoryResult[ 0 ], x );
    }

    //-------------------------------------------------------------------------
  }
}
