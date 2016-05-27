using System;
using System.Reflection;
using System.IO;
using ForceFeed.DbFeeder.Utils;

namespace ForceFeed.DbFeeder
{
  static class Program
  {
    //-------------------------------------------------------------------------

    public static Settings Settings { get; private set; }
    public static Log Log { get; private set; }
    public static string Username { get; set; }

    //-------------------------------------------------------------------------

    [STAThread]
    static void Main( string[] args )
    {
      // Initialise the log.
      Log =
        new Log(
          Path.GetDirectoryName( Assembly.GetExecutingAssembly().FullName ) + "db-feeder.log",
          1000 );

      // Settings.
      try
      {
        Settings = new Settings();
        Settings.Initialise();
      }
      catch( Exception ex )
      {
        Log.AddEntry( ex );
      }

      // P4.
      string envVarPath = ( Environment.GetEnvironmentVariable( "path" ) ?? "" ).ToLower();
      string[] envVarPathEntries = envVarPath.Split( ';' );
      string p4Path = null;

      foreach( string entry in envVarPathEntries )
      {
        if( File.Exists( entry + @"\p4.exe" ) )
        {
          p4Path = entry;
          break;
        }
      }

      if( p4Path == null )
      {
        Log.AddError(
          "Could not find p4.exe in any path in the PATH environment-variable, please add " +
          "the path where p4.exe is located to the PATH environment-variable." );

        return;
      }

      Log.AddEntry(
        Log.EntryType.INFO,
        "P4 path: " + p4Path );

      // Shutdown.
      Settings.SaveToFile();
      Log.AddInfo( "Shutdown." );
    }

    //-------------------------------------------------------------------------
  }
}
