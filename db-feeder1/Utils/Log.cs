using System;
using System.IO;

namespace Critr.Utils
{
  class Log
  {
    //-------------------------------------------------------------------------

    public enum EntryType
    {
      INFO,
      WARNING,
      ERROR
    };

    private StreamWriter _writer;

    //-------------------------------------------------------------------------

    public Log( string fullFilename,
                int maxLines )
    {
      // Create if file doesn't exist.
      if( File.Exists( fullFilename ) == false )
      {
        FileStream fs = File.Create( fullFilename );
        fs.Close();
      }

      // Trim file if it's getting too big.
      string[] lines = File.ReadAllLines( fullFilename );
      int linesToRemove = ( lines.Length - maxLines );

      if( linesToRemove > 0 )
      {
        string[] newLines = new string[ maxLines ];

        for( int i = 0; i < maxLines; i++ )
        {
          newLines[ i ] = lines[ linesToRemove + i ];
        }

        File.WriteAllLines( fullFilename, newLines );
      }

      // Create the writer.
      _writer = new StreamWriter( fullFilename, true );
      _writer.WriteLine();
      AddEntry( EntryType.INFO, "Log started." );
    }

    //-------------------------------------------------------------------------

    ~Log()
    {
      try
      {
        if( _writer != null )
        {
          _writer.Close();
        }
      }
      catch( Exception )
      {
        // Ignore.
      }
    }

    //-------------------------------------------------------------------------

    public void AddEntry( EntryType type, string entry )
    {
      try
      {
        string line =
          DateTime.Now.ToString( "yy-MM-dd hh:mm:ss" ) +
          " | " + GetEntryTypeString( type ) +
          " | " + entry;

        System.Diagnostics.Debug.WriteLine( line );
        _writer.WriteLine( line );
        _writer.Flush();
      }
      catch( Exception )
      {
        // We'll just ignore any errors.
      }
    }

    //-------------------------------------------------------------------------

    public void AddEntry( Exception ex )
    {
      AddEntry(
        EntryType.ERROR,
        '(' + ex.Source + ") " + ex.Message + Environment.NewLine + ex.StackTrace );
    }

    //-------------------------------------------------------------------------

    public void AddInfo( string entry )
    {
      AddEntry( EntryType.INFO, entry );
    }

    //-------------------------------------------------------------------------

    public void AddWarning( string entry )
    {
      AddEntry( EntryType.WARNING, entry );
    }

    //-------------------------------------------------------------------------

    public void AddError( string entry )
    {
      AddEntry( EntryType.ERROR, entry );
    }

    //-------------------------------------------------------------------------

    private string GetEntryTypeString( EntryType type )
    {
      switch( type )
      {
        case EntryType.INFO:
          return "INFO";

        case EntryType.WARNING:
          return "WARNING";

        case EntryType.ERROR:
          return "ERROR";

        default:
          return "UNKNOWN";
      }
    }

    //-------------------------------------------------------------------------
  }
}
