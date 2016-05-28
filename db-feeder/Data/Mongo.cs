using System;
using System.Collections.Generic;
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
      var doc = new BsonDocument
      {
        { "timstamp", DateTime.Now }
      };


      var history = Database.GetCollection<BsonDocument>( "UpdateHistory" );
      var filter = new BsonDocument();
      var result = history.Find( filter ).ToList();

      if( result.Count == 0 )
      {
        history.InsertOne( doc );
      }
      else
      {

      }

      List<Changelist> changelists = new List<Changelist>();
      ChangelistHelpers.GetChangelistsFromP4(
        DateTime.Now.AddDays( -2 ),
        DateTime.Now,
        ref changelists );

      var changelistsDbCollection =
        Database.GetCollection<BsonDocument>( "Changelists" );

      foreach( Changelist cl in changelists )
      {
        BsonDocument clDoc = new BsonDocument();
        clDoc.Add( "id", cl.Id );
        clDoc.Add( "submittedDate", cl.SubmittedDate );
        clDoc.Add( "description", cl.Description );
        clDoc.Add( "submitter", cl.Submitter );

        changelistsDbCollection.InsertOne( clDoc );
      }
    }

    //-------------------------------------------------------------------------
  }
}
