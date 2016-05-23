export class ChangelistService
{
  public getChangelists()
  {
    return [
      {
        id: '12345',
        username: 'Username',
        description: 'Description...',
        timestamp: '2016/05/23 21:00'
      },
      {
        id: '12346',
        username: 'Username 2',
        description: 'Description 2...',
        timestamp: '2016/05/23 21:01'
      }
    ];
  }
}