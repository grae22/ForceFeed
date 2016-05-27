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

    public async void Refresh()
    {
      var doc = new BsonDocument
      {
        { "timstamp", System.DateTime.Now }
      };


      var history = Database.GetCollection<BsonDocument>( "UpdateHistory" );
      await history.InsertOneAsync( doc );
      var filter = Builders<BsonDocument>.Filter.Exists( "timestamp" );
      var result = await history.Find( filter ).ToListAsync();

      if( result.Count == 0 )
      {

      }
    }

    //-------------------------------------------------------------------------
  }
}
