using System.Diagnostics;

namespace ForceFeed.DbFeeder.Utils
{
  public class Perforce
  {
    //-------------------------------------------------------------------------

    public static string RunCommand( string command )
    {
      string output = "";

      using( Process p = new Process() )
      {
        p.StartInfo.CreateNoWindow = true;
        p.StartInfo.UseShellExecute = false;
        p.StartInfo.RedirectStandardOutput = true;
        p.StartInfo.FileName = "p4.exe";
        p.StartInfo.Arguments = command;
        p.StartInfo.ErrorDialog = true;

        if( Program.Username != null )
        {
          //p.StartInfo.EnvironmentVariables.Add(
          //  "P4PORT",
          //  "perforce:1666" );

          p.StartInfo.EnvironmentVariables.Add(
            "P4USER",
            Program.Username );
        }

        p.Start();

        output = p.StandardOutput.ReadToEnd();
        p.WaitForExit( 1000 );
      }

      return output;
    }

    //-------------------------------------------------------------------------
  }
}