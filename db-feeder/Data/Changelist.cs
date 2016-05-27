using System;

namespace ForceFeed.DbFeeder.Data
{
  public class Changelist
  {
    //-------------------------------------------------------------------------

    public int Id { get; private set; }
    public string Description { get; private set; }
    public string Submitter { get; private set; }
    public DateTime SubmittedDate { get; private set; }

    //-------------------------------------------------------------------------

    public Changelist( int id,
                       string description,
                       string submitter,
                       DateTime date )
    {
      Id = id;
      Description = description;
      Submitter = submitter;
      SubmittedDate = date;
    }

    //-------------------------------------------------------------------------
    
    public override string ToString()
    {
      return Description;
    }

    //-------------------------------------------------------------------------
  }
}
