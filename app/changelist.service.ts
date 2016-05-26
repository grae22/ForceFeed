import {Http, Headers, RequestOptions} from 'angular2/http';
import 'rxjs/Rx';

export class ChangelistService
{
  //---------------------------------------------------------------------------
  
  public getChangelists( http: Http ) : any
  {
    var responseData;
    
    let headers =
    new Headers({ 'Content-Type': 'application/json' });
    
    let options = new RequestOptions({ headers: headers });

    try
    {
      http.get(
        'http://localhost:3010/changelists',
        headers )
          .map( res => res.json() )
          .subscribe(
            data => responseData = data,
            err => console.error( err ),
            () => console.log( 'Get complete.' ) );
    }
    catch( error )
    {
      console.error( error );
    }
    console.log( responseData );
    return responseData;
/*
    return [
      {
        id: '12345',
        username: 'Username',
        description: 'Description...',
        timestamp: '2016/05/23 21:00',
        files: [
          { filename: 'KFile_1.cpp', revision: 1 },
          { filename: 'KFile_2.cpp', revision: 2 },
          { filename: 'KFile_3.cpp', revision: 3 },
          { filename: 'KFile_4.cpp', revision: 4 }
        ]
      },
      {
        id: '12346',
        username: 'Username 2',
        description: 'Description 2...',
        timestamp: '2016/05/23 21:01',
        files: [
          { filename: 'KFile_1.h', revision: 1 },
          { filename: 'KFile_2.h', revision: 2 },
          { filename: 'KFile_3.h', revision: 3 },
          { filename: 'KFile_4.h', revision: 4 }
        ]
      }
    ];*/
  }
  
  //---------------------------------------------------------------------------
}