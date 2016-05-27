using System;
using System.Diagnostics;

namespace Critr.Utils
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

        if( Program.LoggedOnUser != null )
        {
          p.StartInfo.EnvironmentVariables.Add(
            "P4USER",
            Program.LoggedOnUser.Username );
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