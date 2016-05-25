export class ChangelistService
{
  //---------------------------------------------------------------------------
  
  public getChangelists()
  {
    return [
      {
        id: '12345',
        username: 'Username',
        description: 'Description...',
        timestamp: '2016/05/23 21:00',
        files: [
          'KFile_1.cpp',
          'KFile_2.cpp',
          'KFile_3.cpp',
          'KFile_4.cpp'
        ]
      },
      {
        id: '12346',
        username: 'Username 2',
        description: 'Description 2...',
        timestamp: '2016/05/23 21:01',
        files: [
          'KFile_1.h',
          'KFile_2.h',
          'KFile_3.h',
          'KFile_4.h'
        ]
      }
    ];
  }
  
  //---------------------------------------------------------------------------
}