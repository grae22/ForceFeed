import {Pipe, PipeTransform} from '@angular/core';

@Pipe(
{
  name: 'autoEllipses'
})
export class AutoEllipsesPipe implements PipeTransform
{
  //---------------------------------------------------------------------------
  
  transform(
    text: string,
    maxLength: number,
    useAsPrefix: boolean )
  {
    // If there is no max-length (-1) or the the text is short enough, don't trim.
    if( maxLength == -1 ||
        text.length < maxLength )
    {
      return text;
    }
    
    // Trim and place ellipses either before or after text.
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