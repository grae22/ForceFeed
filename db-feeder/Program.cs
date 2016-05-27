using System;
using System.Windows.Forms;
using System.Reflection;
using System.IO;
using Critr.Utils;
using Critr.Db;
using Critr.UI;
using Critr.Data;

namespace Critr
{
  static class Program
  {
    //-------------------------------------------------------------------------

    public static Settings Settings { get; private set; }
    public static DbConnection DbConnection { get; private set; }
    public static Log Log { get; private set; }
    public static UserCollection UserCollection { get; private set; }
    public static User LoggedOnUser { get; set; }

    //-------------------------------------------------------------------------

    [STAThread]
    static void Main( string[] args )
    {
      // Initialise the log.
      Log =
        new Log(
          Path.GetDirectoryName( Assembly.GetExecutingAssembly().FullName ) + "Critr.log",
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
        MessageBox.Show( ex.Message,
                         "Settings Error",
                         MessageBoxButtons.OK,
                         MessageBoxIcon.Error );
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
        MessageBox.Show(
          "Could not find p4.exe in any path in the PATH environment-variable, please add " +
            "the path where p4.exe is located to the PATH environment-variable.",
          "Perforce Error",
          MessageBoxButtons.OK,
          MessageBoxIcon.Error );

        return;
      }

      Log.AddEntry(
        Log.EntryType.INFO,
        "P4 path: " + p4Path );

      // Db.
      try
      {
        // Try connect to the databases.
        try
        {
          DbConnection = DbConnection.Instance;
        }
        catch( Exception ex )
        {
          Log.AddEntry( ex );
          
          MessageBox.Show(
            ex.Message,
            "Database Error",
            MessageBoxButtons.OK,
            MessageBoxIcon.Error );

          return;
        }

        // Connected to the DB?
        if( DbConnection.Critr.State != System.Data.ConnectionState.Open )
        {
          Log.AddEntry(
            Log.EntryType.ERROR,
            "Failed to connect to the database." );

          MessageBox.Show(
            "Failed to connect to the database.",
            "Database Error",
            MessageBoxButtons.OK,
            MessageBoxIcon.Error );
        }
      }
      catch( Exception ex )
      {
        Log.AddEntry( ex );

        MessageBox.Show(
          ex.Message,
          "Database Error",
          MessageBoxButtons.OK,
          MessageBoxIcon.Error );
      }

      // Init some things.
      UserCollection = new UserCollection();
      ChangelistHelpers.LoadChangelistsFromDb();

      // Start the app.
      Application.EnableVisualStyles();
      Application.SetCompatibleTextRenderingDefault( false );
      Application.Run( new MainForm() );

      // Shutdown.
      Settings.SaveToFile();
      Log.AddInfo( "Shutdown." );
    }

    //-------------------------------------------------------------------------
  }
}
