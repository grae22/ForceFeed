using System;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Critr.Data
{
  public class Changelist
  {
    //-------------------------------------------------------------------------

    public int Id { get; private set; }
    public string Description { get; private set; }
    public User Submitter { get; private set; }
    public DateTime SubmittedDate { get; private set; }

    //-------------------------------------------------------------------------

    public Changelist( int id )
    {
      Id = id;
      Description = "Unknown";
      Submitter = null;
      SubmittedDate = new DateTime( 2016, 1, 1 );

      LoadDataFromDb();
    }

    //-------------------------------------------------------------------------

    public Changelist( int id,
                       string description,
                       User submitter,
                       DateTime date )
    {
      Id = id;
      Description = description;
      Submitter = submitter;
      SubmittedDate = date;
    }

    //-------------------------------------------------------------------------

    private void LoadDataFromDb()
    {
      SqlCommand cmd = Program.DbConnection.CreateCommand();
      cmd.CommandText =
        "SELECT " +
          /* 0 */"description, " +
          /* 1 */"userId, " +
          /* 2 */"submittedDate " +
        "FROM Changelist " +
        "WHERE id=" + Id;
      
      using( SqlDataReader reader = cmd.ExecuteReader() )
      {
        if( reader.Read() == false )
        {
          throw new Exception(
            "No changelist found with id " + Id + '.' );
        }

        Description = reader.GetString( 0 );
        int userId = reader.GetInt32( 1 );
        SubmittedDate = reader.GetDateTime( 2 );

        // Find the user.
        foreach( User user in Program.UserCollection.Users )
        {
          if( user.Id == userId )
          {
            Submitter = user;
            break;
          }
        }

        if( Submitter == null )
        {
          throw new Exception( "Failed to find user with id '" + userId + "'." );
        }
      }
    }

    //-------------------------------------------------------------------------

    public override string ToString()
    {
      return Description;
    }

    //-------------------------------------------------------------------------
  }
}
