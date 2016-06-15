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
      out List<ChangelistFile> files )
    {
      files = new List<ChangelistFile>();

      //-- Get changelist's files from P4.
      string output = Perforce.RunCommand( "describe -ds " + changelistId );

      // Exract files from output.
      int index = output.IndexOf( "Affected files ..." );

      if( index > -1 )
      {
        while( ( index = output.IndexOf( "... ", index + 1 ) ) > -1 )
        {
          // Skip the "... " prefixing the path.
          index += 4;

          // Grab the path.
          int revisionIndex = output.IndexOf( '#', index );

          if( revisionIndex < 0 )
          {
            Program.Log.AddEntry(
              Log.EntryType.ERROR,
              "Failed to find revision index in file path.",
              true );
            continue;
          }

          int revisionEndIndex = output.IndexOf( ' ', revisionIndex );

          if( revisionIndex < 0 )
          {
            Program.Log.AddEntry(
              Log.EntryType.ERROR,
              "Failed to find revision END index in file path.",
              true );
            continue;
          }

          string path = output.Substring( index, revisionEndIndex - index );

          // Add file path to the ui list.
          files.Add( new ChangelistFile( path ) );
        }
      }

      // Go through the differences section and extract the various counts.
      index = output.IndexOf( "Differences ..." );

      if( index > -1 )
      {
        string filename = "";
        int endIndex = -1;
        int addCount = 0;
        int deletedCount = 0;
        int changedCount = 0;

        while( ( index = output.IndexOf( "==== ", index ) ) > -1 )
        {
          // Extract the filename.
          index += "==== ".Length;
          endIndex = output.IndexOf( " ", index );

          filename = output.Substring( index, endIndex - index );

          // 'Add' count.
          index = output.IndexOf( "add ", index );

          if( index < 0 )
          {
            break;
          }

          index += "add ".Length;
          endIndex = output.IndexOf( "chunks", index );

          if( int.TryParse(
                output.Substring(
                  index,
                  endIndex - index ),
                out addCount ) == false )
          {
            continue;
          }

          // 'Deleted' count.
          index = output.IndexOf( "deleted ", index );
          index += "deleted ".Length;
          endIndex = output.IndexOf( "chunks", index );

          if( int.TryParse(
                output.Substring(
                  index,
                  endIndex - index ),
                out deletedCount ) == false )
          {
            continue;
          }

          // 'Changed' count.
          index = output.IndexOf( "changed ", index );
          index += "changed ".Length;
          endIndex = output.IndexOf( "chunks", index );

          if( int.TryParse(
                output.Substring(
                  index,
                  endIndex - index ),
                out changedCount ) == false )
          {
            continue;
          }

          // Update the file with its stats.
          foreach( ChangelistFile file in files )
          {
            if( file.Filename.Equals( filename, StringComparison.OrdinalIgnoreCase ) )
            {
              file.AdditionsCount = addCount;
              file.DeletionsCount = deletedCount;
              file.ChangesCount = changedCount;
            }
          }
        }
      }
    }

    //-------------------------------------------------------------------------
  }
}
