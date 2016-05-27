using System;
using System.Data.SqlClient;
using System.Collections.Generic;
using Critr.Utils;

namespace Critr.Data
{
  public class ChangelistHelpers
  {
    //-------------------------------------------------------------------------

    public static Dictionary<int, Changelist> Changelists = new Dictionary<int, Changelist>();

    //-------------------------------------------------------------------------

    // Static method to load changelists from the Critr DB.

    public static void LoadChangelistsFromDb()
    {
      Changelists.Clear();

      // Get changelist IDs.
      List<int> changelistIDs = new List<int>();

      SqlCommand cmd = Program.DbConnection.CreateCommand();
      cmd.CommandText =
        "SELECT id " +
        "FROM Changelist";

      using( SqlDataReader reader = cmd.ExecuteReader() )
      {
        while( reader.Read() )
        {
          changelistIDs.Add( reader.GetInt32( 0 ) );
        }
      }

      // Load the changelists.
      foreach( int id in changelistIDs )
      {
        Changelists.Add( id, new Changelist( id ) );
      }
    }

    //-------------------------------------------------------------------------

    public static void GetChangelistsFromP4(
      DateTime fromDate,
      DateTime toDate,
      ref List<Changelist> changelists )
    {
      string output =
        Perforce.RunCommand(
          "changes -s submitted @" + fromDate.ToString( "yyyy/MM/dd:00:00" ) + ",@" +
          toDate.ToString( "yyyy/MM/dd:23:59" ) );

      string[] lines =
        output.Split( new string[] { Environment.NewLine }, StringSplitOptions.None );

      foreach( string line in lines )
      {
        // Extract the changelist number.
        if( line.Length < "Change ".Length )
        {
          continue;
        }

        string tmp = line.Remove( 0, "Change ".Length );

        int index = tmp.IndexOf( ' ' );
        if( index < 0 )
        {
          continue;
        }

        string changelistNumberStr = tmp.Substring( 0,  index );
        int changelistNumber;
        if( int.TryParse( changelistNumberStr, out changelistNumber ) == false )
        {
          continue;
        }

        // Exract the date.
        tmp = tmp.Remove( 0, ( changelistNumberStr + " on " ).Length );
        string dateStr = tmp.Substring( 0, 10 );
        DateTime date = new DateTime();
        
        if( DateTime.TryParse( dateStr, out date ) == false )
        {
          continue;
        }

        // Extract the user.
        tmp = tmp.Remove( 0, ( dateStr + " by " ).Length );
        string username = tmp.Substring( 0, tmp.IndexOf( '@' ) );
        User user = Program.UserCollection.GetUser( username );

        if( user == null ||
            user.IsReviewCandidate == false )
        {
          continue;
        }

        // Extract the description.
        int descriptionStartIndex = tmp.IndexOf( "'" ) + 1;
        int descriptionLength = tmp.LastIndexOf( "'" ) - descriptionStartIndex;

        string description = "";

        if( descriptionStartIndex > 0 &&
            descriptionLength > 0 )
        {
          description = tmp.Substring( descriptionStartIndex, descriptionLength );
        }

        if( description.Length == 0 )
        {
          description = "(No description)";
        }

        //if( description.Length > 30 )
        //{
        //  description = description.TrimEnd() + "...";
        //}

        // Create the changelist object if we don't already have one.
        if( Changelists.ContainsKey( changelistNumber ) == false )
        {
          changelists.Add(
            new Changelist(
              changelistNumber,
              description,
              user,
              date ) );
        }
      }
    }

    //-------------------------------------------------------------------------
  }
}
