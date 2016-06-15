namespace ForceFeed.DbFeeder.Data
{
  public class ChangelistFile
  {
    //-------------------------------------------------------------------------

    public string Filename { get; set; } = "";
    public int AdditionsCount { get; set; } = 0;
    public int DeletionsCount { get; set; } = 0;
    public int ChangesCount { get; set; } = 0;

    //-------------------------------------------------------------------------

    public ChangelistFile(
      string filename,
      int additionsCount = 0,
      int deletionsCount = 0,
      int changesCount = 0 )
    {
      Filename = filename;
    }

    //-------------------------------------------------------------------------
  }
}
