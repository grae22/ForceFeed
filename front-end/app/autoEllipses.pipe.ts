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
    if( text.length < args[ 0 ] )
    {
      return text;
    }
    
    return '...' + text.substring( text.length - args[ 0 ] );
  }
  
  //---------------------------------------------------------------------------
}