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

    // Diff or just a file's content?
    var isDiff = false;

    if( content.indexOf( '===' ) === 0 )
    {
      isDiff = true;
    }

    content = content.replace( new RegExp( '\r', 'g' ), '' );
    content = content.replace( new RegExp( '<', 'g' ), '&lt;' );
    content = content.replace( new RegExp( '>', 'g' ), '&gt;' );
    content = content.replace( new RegExp( '\t', 'g' ), '<b><font color="#ff0000">[TAB]</font></b>' );

    var newContent = '';
    var lines = content.split( '\n' );
    var isFirstLine = true;

    for( var line of lines )
    {
      // Skip the first line - it's a header from p4 we don't want to see.
      if( isDiff && isFirstLine )
      {
        isFirstLine = false;
        continue;
      }

      // Skip lines that begin with @, p4 inserted stuff.
      if( line[ 0 ] == '@' )
      {
        continue;
      }

      // Process the line.
      let linePostfix: string = '';

      if( line[ 0 ] == '-' )
      {
        newContent += '<font color="#ff0000">';
        linePostfix += '</font>';
      }
      else if( line[ 0 ] == '+' )
      {
        newContent += '<font color="#00a020">';
        linePostfix += '</font>';
      }

      // Add this line to the new content.
      if( isDiff )
      {
        newContent += line.substr( 1, line.length - 1 ) + linePostfix + '\n';
      }
      else
      {
        newContent += line + linePostfix + '\n';
      }
    } 
    
    return '<pre>' + newContent + '</pre>';
  }
  
  //---------------------------------------------------------------------------
}