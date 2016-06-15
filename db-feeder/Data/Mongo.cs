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
    private int MaxFilesToIncludeFromChangelist { get; set; }

    //-------------------------------------------------------------------------

    public Mongo()
    {
      Database = Client.GetDatabase( "ForceFeed" );

      MaxFilesToIncludeFromChangelist =
        Program.Settings.GetSetting<int>(
          "MaxFilesToIncludeFromChangelist",
          20,
          true );
    }

    //-------------------------------------------------------------------------

    public void Refresh()
    {
      // Get the last update timestamp from the db.
      var updateHistory = Database.GetCollection<BsonDocument>( "UpdateHistory" );
      var updateHistoryFilter = new BsonDocument { { "id", 0 } };
      var updateHistoryResult = updateHistory.Find( updateHistoryFilter ).ToList();

      // No update history? Set the last update as a set number of days ago.
      if( updateHistoryResult.Count == 0 )
      {
        updateHistory.InsertOne(
          new BsonDocument
          {
            {
              "id", 0
            },
            {
              "timestamp",
              DateTime.Now.AddDays(
                -Program.Settings.GetSetting<int>(
                  "InitialPriorDaysChangelistsToImport", 1, true ) )
            }
          }
        );

        // Should now be one record.
        updateHistoryResult = updateHistory.Find( updateHistoryFilter ).ToList();
        Debug.Assert( updateHistoryResult.Count == 1 );
      }

      DateTime lastUpdateDate = updateHistoryResult[ 0 ][ 2 ].ToLocalTime();
      DateTime nowDate = DateTime.Now;

      Program.Log.AddEntry(
        Utils.Log.EntryType.INFO,
        "Checking for changelists between " +
          lastUpdateDate.ToString( "yyyy/MM/dd HH:mm:ss" ) + " and " +
          nowDate.ToString( "yyyy/MM/dd HH:mm:ss" ) + "...",
        true );

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
        Program.Log.AddEntry(
          Utils.Log.EntryType.INFO,
          "No changelists found.",
          true );
        return;
      }

      // Grab the changelists collection from the db so we can add to it.
      var changelistsDbCollection =
        Database.GetCollection<BsonDocument>( "Changelists" );

      // Add the changelists.
      int addedChangelistCount = 0;

      Program.Log.AddEntry(
        Utils.Log.EntryType.INFO,
        "Found " + changelistCollection.Count + ", adding changelists...",
        true );

      foreach( Changelist changelist in changelistCollection )
      {
        // Build a new changelist bson doc.
        BsonDocument changelistDoc = new BsonDocument();
        changelistDoc.Add( "id", changelist.Id );
        changelistDoc.Add( "timestamp", changelist.SubmittedDate.ToString( "yyyy/MM/dd HH:mm" ) );
        changelistDoc.Add( "description", changelist.Description );
        changelistDoc.Add( "submitter", changelist.Submitter.ToLower() );

        // Get the changelist's files from perforce.
        List<ChangelistFile> files;

        ChangelistHelpers.GetChangelistFilesFromP4(
          changelist.Id,
          out files );

        // Total up all the changes.
        int totAdditions = 0;
        int totDeletions = 0;
        int totChanges = 0;

        foreach( ChangelistFile file in files )
        {
          totAdditions += file.AdditionsCount;
          totDeletions += file.DeletionsCount;
          totChanges += file.ChangesCount;
        }

        changelistDoc.Add( "totalAdditions", totAdditions );
        changelistDoc.Add( "totalDeletions", totDeletions );
        changelistDoc.Add( "totalChanges", totChanges );

        // Add the files to the doc.
        BsonArray filesDoc = new BsonArray();
        changelistDoc.Add( "files", filesDoc );

        int fileCount = 0;
        foreach( ChangelistFile file in files )
        {
          BsonDocument fileDoc = new BsonDocument();
          fileDoc.Add( "filename", file.Filename );
          fileDoc.Add( "additionsCount", file.AdditionsCount );
          fileDoc.Add( "deletionsCount", file.DeletionsCount );
          fileDoc.Add( "changesCount", file.ChangesCount );

          filesDoc.Add( fileDoc ); 

          fileCount++;

          if( fileCount > MaxFilesToIncludeFromChangelist - 1 )
          {
            //fileDoc.Add( "More files...", "Changelist truncated." );
            break;
          }
        }

        // Add the new doc to the db collection.
        var result =
          changelistsDbCollection.Find(
            new BsonDocument { { "id", changelist.Id } } ).ToList();

        if( result.Count == 0 )
        {
          changelistsDbCollection.InsertOne( changelistDoc );
          addedChangelistCount++;
        }
      }

      Program.Log.AddEntry(
        Utils.Log.EntryType.INFO,
        "Added " + addedChangelistCount +" changelist(s), duplicates (if any) excluded.",
        true );

      // Update the update history.
      var update = Builders<BsonDocument>.Update.Set( "timestamp", nowDate );
      updateHistory.UpdateOne( updateHistoryFilter, update );
    }

    //-------------------------------------------------------------------------
  }
}
