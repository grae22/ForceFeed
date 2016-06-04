using System;
using System.Collections.Generic;
using ForceFeed.DbFeeder.Utils;

namespace ForceFeed.DbFeeder.Data
{
  public class ChangelistHelpers
  {
    //-------------------------------------------------------------------------

    public static Dictionary<int, Changelist> Changelists = new Dictionary<int, Changelist>();

    //-------------------------------------------------------------------------
    
    public static void GetChangelistsFromP4(
      DateTime fromDate,
      DateTime toDate,
      ref List<Changelist> changelists )
    {
      string output =
        Perforce.RunCommand(
          "changes -s submitted -t -l @" + fromDate.ToString( "yyyy/MM/dd:HH:mm:ss" ) + ",@" +
          toDate.ToString( "yyyy/MM/dd:HH:mm:ss" ) );
        Console.WriteLine( output );
      string[] lines =
        output.Split( new string[] { Environment.NewLine }, StringSplitOptions.None );

      for( int lineIndex = 0; lineIndex < lines.Length; lineIndex++ )
      {
        string line = lines[ lineIndex ];

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

        // Exract the date & time.
        tmp = tmp.Remove( 0, ( changelistNumberStr + " on " ).Length );
        string dateStr = tmp.Substring( 0, 19 );
        DateTime date = new DateTime();
        
        if( DateTime.TryParse( dateStr, out date ) == false )
        {
          continue;
        }

        // Extract the user.
        tmp = tmp.Remove( 0, ( dateStr + " by " ).Length );
        string username = tmp.Substring( 0, tmp.IndexOf( '@' ) );

        // Extract the description.
        string description = "";

        if( lineIndex + 2 < lines.Length )
        {
          lineIndex += 2;

          while( lineIndex < lines.Length )
          {
            if( lines[ lineIndex ].IndexOf( "Change" ) == 0 )
            {
              lineIndex--;
              break;
            }

            description += lines[ lineIndex++ ];
          }
        }

        // Create the changelist object if we don't already have one.
        if( Changelists.ContainsKey( changelistNumber ) == false )
        {
          changelists.Add(
            new Changelist(
              changelistNumber,
              description,
              username,
              date ) );
        }
      }
    }

    //-------------------------------------------------------------------------

    public static void GetChangelistFilesFromP4(
      int changelistId,
      out List<string> files )
    {
      files = new List<string>();

      //-- Get changelist's files from P4.
      string output = Perforce.RunCommand( "describe -s " + changelistId );

      // Exract files from output.
      int index = output.IndexOf( "Affected files ..." );

      while( ( index = output.IndexOf( "... ", index + 1 ) ) > -1 )
      {
        // Skip the "... " prefixing the path.
        index += 4;

        // Grab the path from between the ellipses and the revision.
        int revisionIndex = output.IndexOf( '#', index );

        if( revisionIndex < 0 )
        {
          continue;
        }

        string path = output.Substring( index, revisionIndex - index );

        // Add file path to the ui list.
        files.Add( path );
      }
    }

    //-------------------------------------------------------------------------
  }
}
