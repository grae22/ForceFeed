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

    // Replace some non html safe chars. 
    content = content.replace( new RegExp( '\r', 'g' ), '' );
    content = content.replace( new RegExp( '<', 'g' ), '&lt;' );
    content = content.replace( new RegExp( '>', 'g' ), '&gt;' );
    content = content.replace( new RegExp( '\t', 'g' ), '<b><font color="#00ffff" style="background-color: #ff0000;">~tab~</font></b>' );

    // Split up the content into lines.
    var lines = content.split( '\n' );

    // Exclude the last line - it's always blank.
    if( lines.length > 1 )
    {
      lines = lines.slice( 0, lines.length - 1 );
    }

    // Iterate through lines and format.
    var newContent = '';
    var isFirstLine = true;
    var isPrevLineBlank = false;

    for( var line of lines )
    {
      // Skip the first line - it's a header from p4 we don't want to see.
      if( isDiff && isFirstLine )
      {
        isFirstLine = false;
        continue;
      }

      // Skip lines that begin with @, p4 inserted stuff.
      if( line[ 0 ] == '@' ||
          line[ 0 ] == '\\' )
      {
        continue;
      }

      // Process the line.
      let linePostfix: string = '';

      if( line[ 0 ] == '-' )    // Subtractions.
      {
        newContent += '<span style="background-color: #ffc0c0;">';
        linePostfix += '</span>';
      }
      else if( line[ 0 ] == '+' )   // Additions.
      {
        newContent += '<span style="background-color: #a0f0a0;">';
        linePostfix += '</span>';
      }

      // Trailing whitespace.
      var trailingWhitespaceStartIndex = -1;
      var trailingWhitespaceCount = 0;

      for( var i = line.length - 1; i > -1; i-- )
      {
        if( line[ i ] == ' ' )
        {
          trailingWhitespaceStartIndex = i;
          trailingWhitespaceCount++;
        }
        else
        {
          break;
        }
      }

      if( trailingWhitespaceCount < line.length - 1 &&    // Ignore white-space on empty lines.
          trailingWhitespaceCount > 0 )
      {
        line = line.substr( 0, trailingWhitespaceStartIndex );
        line += '<font color="#00ffff" style="background-color: #ff0000;"><b>';

        for( var i = 0; i < trailingWhitespaceCount; i++ )
        {
          line += '~';
        }

        line += '</b></font>';
      }

      // Consecutive blank lines.
      var isLineBlank = ( line.trim().length == 0 );

      if( isLineBlank &&
          isPrevLineBlank )
      {
        line += '<font color="#00ffff" style="background-color: #ff0000;">~consecutive blank line~</font>';
      }

      isPrevLineBlank = isLineBlank;

      // Add this line to the new content.
      newContent += line + linePostfix + '\n';
    } 
    
    return '<pre>' + newContent + '</pre>';
  }
  
  //---------------------------------------------------------------------------
}