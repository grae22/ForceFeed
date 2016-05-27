using System;
using System.Collections.Generic;
using System.Xml;
using System.ComponentModel;
using System.IO;

namespace ForceFeed.DbFeeder.Utils
{
  class Settings
  {
    //-------------------------------------------------------------------------

    private Dictionary< string, object > _settingsGlobal = new Dictionary< string, object >();
    private Dictionary< string, object > _settingsLocal = new Dictionary< string, object >();
    private bool _loadedSuccessfully = false;
    private bool _haveSettingsChanged = false;

    //-------------------------------------------------------------------------

    public Settings()
    {
    
    }

    //-------------------------------------------------------------------------

    // Throws exception on error.
		
    public void Initialise()
    {
      try
      {
        string path =
          Path.GetDirectoryName( System.Reflection.Assembly.GetExecutingAssembly().Location );

        LoadFromXml( path + @"\GlobalSettings.xml", _settingsGlobal );
        LoadFromXml( path + @"\LocalSettings.xml", _settingsLocal );

        _loadedSuccessfully = true;
      }
      catch( Exception ex )
      {
        throw new Exception(
          "Failed to load settings..." +
          Environment.NewLine +
          Environment.NewLine +
          "Source: " + ex.Source +
          Environment.NewLine +
          Environment.NewLine +
          ex.Message );
      }
    }

    //-------------------------------------------------------------------------

    // Throws exception on error.

    public void SaveToFile()
    {
      try
      {
        string path =
          Path.GetDirectoryName( System.Reflection.Assembly.GetExecutingAssembly().Location );

        WriteToXml( path + @"\GlobalSettings.xml", _settingsGlobal );
        WriteToXml( path + @"\LocalSettings.xml", _settingsLocal );
      }
      catch( Exception ex )
      {
        throw new Exception(
          "Failed to save settings..." +
          Environment.NewLine +
          Environment.NewLine +
          "Source: " + ex.Source +
          Environment.NewLine +
          Environment.NewLine +
          ex.Message );
      }
    }

    //-------------------------------------------------------------------------

    private void LoadFromXml( string filename,
                              Dictionary< string, object > settings )
    {
      if( File.Exists( filename ) )
      {
        XmlDocument doc = new XmlDocument();
        doc.Load( filename );
        XmlElement settingsElement = doc.SelectSingleNode( "/Settings" ) as XmlElement;

        string id = "";
        ParseXml( ref id, settingsElement, settings );

        doc = null;
      }
    }

    //-------------------------------------------------------------------------

    private void ParseXml( ref string id,
                           XmlElement element,
                           Dictionary< string, object > settings )
    {
      if( element == null )
      {
        return;
      }

      foreach( XmlNode node in element.ChildNodes )
      {
        if( node is XmlElement == false )
        {
          continue;
        }

        XmlElement child = node as XmlElement;

        if( id.Length == 0 )
        {
          id += child.Name;
        }
        else
        {
          id += "." + child.Name;          
        }

        ParseXml( ref id, child, settings );
      }

      if( element.HasAttribute( "type" ) )
      {
        TypeConverter converter = TypeDescriptor.GetConverter( Type.GetType( element.Attributes[ "type" ].Value ) );
        object value = converter.ConvertFromString( element.InnerText );
        settings.Add( id, value );
      }

      if( id.Contains( "." ) )
      {
        id = id.Substring( 0, id.LastIndexOf( '.' ) );
      }
			else
			{
				id = "";
			}
    }

    //-------------------------------------------------------------------------

    // Throws exception on error.

    private void WriteToXml( string filename,
                             Dictionary< string, object > settings )
    {
      try
      {
        // Do nothing if nothing has changed.
        if( _haveSettingsChanged == false )
        {
          return;
        }

        // Make the file writeable.
        if( File.Exists( filename ) )
        {
          FileInfo info = new FileInfo( filename );
          info.IsReadOnly = false;
        }
        
        // Generate the xml and write to file.
        XmlDocument doc = new XmlDocument();
        XmlElement rootElement = doc.CreateElement( "Settings" );
        doc.AppendChild( rootElement );

        foreach( KeyValuePair< string, object > pair in settings )
        {
          GenerateXml( rootElement, pair );
        }

        doc.Save( filename );
        doc = null;
      }
      catch( Exception ex )
      {
        throw new Exception(
          "Failed to load settings..." +
          Environment.NewLine +
          Environment.NewLine +
          "Source: " + ex.Source +
          Environment.NewLine +
          Environment.NewLine +
          ex.Message );
      }
    }

    //-------------------------------------------------------------------------

    private void GenerateXml( XmlElement parentElement,
                              KeyValuePair< string, object > pair )
    {
      string[] sections = pair.Key.Split( '.' );

      if( sections.Length == 0 )
      {
        return;
      }

      // Iterate through all the sections preceeding the actual setting name.
      // For each section - create the xml element if it doesn't already exist.
      for( int i = 0; i < sections.Length - 1; i++ )
      {
        XmlElement tmpElement =
          parentElement.SelectSingleNode( sections[ i ] ) as XmlElement;

        if( tmpElement == null )
        {
          tmpElement = parentElement.OwnerDocument.CreateElement( sections[ i ] );
          parentElement.AppendChild( tmpElement );
          parentElement = tmpElement;
        }

        parentElement = tmpElement;
      }

      // Create the actual setting element.
      XmlElement settingElement =
        parentElement.OwnerDocument.CreateElement(
          sections[ sections.Length - 1 ] );

      XmlAttribute typeAttrib = parentElement.OwnerDocument.CreateAttribute( "type" );
      typeAttrib.Value = pair.Value.GetType().FullName;
      settingElement.Attributes.Append( typeAttrib );
      
      settingElement.InnerText = pair.Value.ToString();

      parentElement.AppendChild( settingElement );
    }

    //-------------------------------------------------------------------------

    public T GetSetting< T >( string id,
                              T defaultValue,
                              bool addToGlobalIfNotFound )
    {
      bool found;
      T value;

      // Try the global settings.
      value = GetSetting< T >( id,
                               defaultValue,
                               _settingsGlobal,
                               addToGlobalIfNotFound,
                               out found );

      // Try the global settings.
      if( found == false )
      {
        value = GetSetting< T >( id,
                                 defaultValue,
                                 _settingsLocal,
                                 !addToGlobalIfNotFound,
                                 out found );
      }

      return value;
    }

    //-------------------------------------------------------------------------

    private T GetSetting< T >( string id,
                               T defaultValue,
                               Dictionary< string, object > settings,
                               bool addIfNotFound,
                               out bool found )
    {
      found = false;

      // Not found?
      if( settings.ContainsKey( id ) == false )
      {
        if( addIfNotFound )
        {
          _haveSettingsChanged = true;
          found = true;
          settings.Add( id, defaultValue );
        }

        return defaultValue;
      }

      // Get the value.
      object value = settings[ id ];

      // Check the type.
      if( typeof( T ) != value.GetType() )
      {
        throw new Exception(
          "Type-mismatch: " +
          "Setting '" + id + "' type is '" + value.GetType().Name + "', " +
          "trying to get as '" + typeof( T ).Name + "'." );
      }

      found = true;
      return (T)value;
    }

		//---------------------------------------------------------------------------

    public void SetSetting< T >( string id,
					    			             T value,
											           bool useGlobal )
    {
			if( useGlobal )
			{
				// Not found?
				if( _settingsGlobal.ContainsKey( id ) == false )
				{
					_haveSettingsChanged = true;
					_settingsGlobal.Add( id, value );
				}
				else
				{
					// Check the type.
					if( typeof( T ) != value.GetType() )
					{
						throw new Exception(
							"Type-mismatch: " +
							"Setting '" + id + "' type is '" + value.GetType().Name + "', " +
							"trying to set as '" + typeof( T ).Name + "'." );
					}

					// Update the value.
					_settingsGlobal[ id ] = value;
				}
			}
			else
			{
				// Not found?
				if( _settingsLocal.ContainsKey( id ) == false )
				{
					_settingsLocal.Add( id, value );
					_haveSettingsChanged = true;
				}
				else
				{
					// Check the type.
					if( typeof( T ) != value.GetType() )
					{
						throw new Exception(
							"Type-mismatch: " +
							"Setting '" + id + "' type is '" + value.GetType().Name + "', " +
							"trying to set as '" + typeof( T ).Name + "'." );
					}

					// Update the value.
					_settingsLocal[ id ] = value;
					_haveSettingsChanged = true;
				}
			}
    }

    //-------------------------------------------------------------------------

    public bool LoadedSuccessfully
    {
      get
      {
        return _loadedSuccessfully;
      }
    }

    //-------------------------------------------------------------------------
  }
}
