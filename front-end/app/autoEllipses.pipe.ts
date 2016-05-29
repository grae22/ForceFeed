import {Pipe, PipeTransform} from 'angular2/core';

@Pipe(
{
  name: 'autoEllipses'
})
export class AutoEllipsesPipe implements PipeTransform
{
  //---------------------------------------------------------------------------
  
  transform(
    text: string,
    args: any[] )
  {
    let maxLength: number = args[ 0 ];
    let useAsPrefix: boolean = args[ 1 ];
    
    if( maxLength == -1 ||
        text.length < maxLength )
    {
      return text;
    }
    
    if( useAsPrefix )
    {
      return '...' + text.substring( text.length - maxLength );
    }
    else
    {
      return text.substring( 0, maxLength ).trim() + '...';
    }
  }
  
  //---------------------------------------------------------------------------
}