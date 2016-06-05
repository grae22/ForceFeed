import {Pipe, PipeTransform} from '@angular/core';

@Pipe(
{
  name: 'fileContentToHtml'
})
export class FileContentToHtmlPipe
{
  //---------------------------------------------------------------------------
  
  transform( content: string )
  {
    if( content == null )
    {
      return '';
    }

    content = content.replace( new RegExp( '<', 'g' ), '&lt;' );
    content = content.replace( new RegExp( '>', 'g' ), '&gt;' );
    //content = content.replace( new RegExp( ' ', 'g' ), '&nbsp;' );
    content = content.replace( new RegExp( '\t', 'g' ), '[TAB]' );
    //content = content.replace( new RegExp( '\n', 'g' ), '<br />' );
    
    return '<pre>' + content + '</pre>';
  }
  
  //---------------------------------------------------------------------------
}