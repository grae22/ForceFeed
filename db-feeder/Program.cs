using System;
using System.Reflection;
using System.IO;
using System.Threading;
using ForceFeed.DbFeeder.Utils;
using ForceFeed.DbFeeder.Data;

namespace ForceFeed.DbFeeder
{
  static class Program
  {
    //-------------------------------------------------------------------------

    public static Settings Settings { get; private set; }
    public static Log Log { get; private set; }
    public static string Username { get; set; } = "graemeb";
    public static Mongo Database { get; set; } = new Mongo();

    //-------------------------------------------------------------------------

    [STAThread]
    static void Main( string[] args )
    {
      int updateRateSecs = 60;
      bool isRunning = true;

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

      // Main loop.
      updateRateSecs = Settings.GetSetting< int >( "UpdateRateSecs", 60, true );

      Console.WriteLine(
        "Running... Updating every " + updateRateSecs.ToString() + " second(s)" +
        Environment.NewLine + Environment.NewLine +
        "Hit 'escape' to stop." + Environment.NewLine );

      while( isRunning )
      {
        try
        {
          // Refresh the db.
          Database.Refresh();

          // Sleep & close when 'esc' is pressed.
          for( int i = 0; i < updateRateSecs; i++ )
          {
            if( Console.KeyAvailable &&
                Console.ReadKey().Key == ConsoleKey.Escape )
            {
              isRunning = false;
              Console.WriteLine( Environment.NewLine + "Key 'escape' detected, closing..." );
              break;
            }

            Thread.Sleep( 1000 );
          }
        }
        catch( Exception ex )
        {
          Log.AddError( ex.Message );

          try
          {
            Thread.Sleep( updateRateSecs * 1000 );
          }
          catch
          {
            // Ignore.
          }
        }
      }

      // Shutdown.
      Settings.SaveToFile();
      Log.AddInfo( "Shutdown." );
    }

    //-------------------------------------------------------------------------
  }
}
