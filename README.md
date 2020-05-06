# Sample locale search using Contextual Search Services API

This sample shows the locale search capability of Acoustic Content (formerly Watson Content Hub or WCH) contextual search services. This technical sample is intended for developers who want to explore the Acoustic Content APIs and the data model.  

The sample illustrates:  
- The use of locale search provided by contextual search services to search for documents in the user's preferred locale.

### Exploring the Watson Content Hub Locale search API capabilities

The contextual search service provides the functionality to filter search results based on the user's current locale preference. For this feature WCH uses the user's **Accept-Language** header to retrieve the user's preferred language settings and uses these to return relevant locale targeted search results.  

The contextual search parameters can be invoked in conjunction with the basic basic Solr query to further enhance the search results based on the user's current conditions.  

Currently contextual search provides the following two custom filters :  
- **accept-language** - This filter in conjunction with basic search parameters can be used to search documents based on the current user's request preferred language.
The language for the user is extracted from the user's request `Accept-Language` header. This header must be provided (a web browser would provide this header by default).
The search will iterate through all of the languages in order until a language returns one or more matching content items, or the service has completed the search for all the preferred languages without finding any results.  
An example for an `accept-language` query is  
`?q=id:&filter=accept-language`  
If the `Accept-Language` header is set to `en,de;q=0.5`, the search starts for all content where the `locale` is set to `English [en]` and then searches for `German [de]` if content is found for `English`.  
The "Content-Language" header set in the response contains the language of the returned results. If the search returns no items then the "Content-Language" header will not be on the response.  
- **proximity** - This filter in conjunction with basic search parameters can be used to search documents with location information within a specific proximity from the specified center-point or the user's current position.  
An example of a `proximity` query is  
`?q=id:&filter=proximity&distance=5&position=0,0`  
This query searches all documents with location set within 5 km from 0,0 coordinates.  

This sample only covers the `accept-language` filter.

### Setting up the sample  

#### Prerequisites

- Watson Content Hub account.  

#### 1. Download the files

Download the project files into any folder on your workstation.  

#### 2. Update the WCH credentials

This sample uses a hardcoded base API URL, update this in `/public/wchClient.js` file.    

To set the variables for the base API URL for your tenant, you can obtain the variables Content hub ID and Hostname from the WCH user interface.
In the IBM Watson Content Hub user interface, open the "Hub information" dialog from the "About" flyout menu in the left navigation pane. A pop-up window displays the items Content hub ID and Hostname.  

For example, the base API URL is similar to:  
const baseTenantUrl = "https://my12.digitalexperience.ibm.com/api/12345678-9abc-def0-1234-56789abcdef0";

#### 3. Enable CORS support for your tenant

To use this sample, you need to enable CORS support for your tenant. To control the CORS enablement for Watson Content Hub, go to Hub Set up -> General settings -> Security tab. Add your domain (or "*" for any domain) and click Save.

#### 4. Starting the sample

- Open `/public/localeSearch.html` in a browser.

### Sample data for the sample

For running the sample, your tenant would need to have some sample data with locale information specified.

#### Setting content language for the content items

This can be done by following the steps outlined here:  

- Log into the Watson Content Hub.  

- Assign languages to the list of allowed content languages. This is the list of languages that a content author can use to assign to a content item. Do this as follow:  
    - Go to Hub set up -> General settings -> Languages  
    - Here you can set the list of `Available content languages` and the `Default content language` that are available for content items.  

- Now you can set the language for the content item by selecting the `Content language` from the drop down available on the right side-bar while `creating` or `editing` a content item.

### Exploring the sample
The sample enables the `accept-language` filter. All the results returned are filtered based on the user's current language preference of their browser.  

To try out the sample change your current language preference in your browser. Add one or more languages. Doing this will change your current 'Accept-Language' request header which will be used by Watson Content Hub to search for and retrieve content items whose language matches a language in the 'Accept-Language' list.  

The search will iterate through all of the languages in order until a language returns one or more matching content items, or the service has completed the search for all the preferred languages without finding any results.  

The "Content-Language" header set in the response contains the language of the returned results. If the search returns no items then the "Content-Language" header will not be on the response.

### Running the sample using the Authoring contextual search service  
The sample is coded to use the Delivery contextual search service.  
To update the sample to use the Authoring contextual search service, update the `/public/wchClient.js` file with the following changes to enable authentication  
1. Change this line  
var loggedIn = true;  
to  
var loggedIn = false;  

2. Change this line  
const contextualSearchServiceApiUrl = baseTenantApiUrl + '/delivery/v1/contextualsearch';  
to  
const contextualSearchServiceApiUrl = baseTenantApiUrl + '/authoring/v1/contextualsearch';  

3. Update `username` and `password` variables with your login details  for authentication.

## Resources

Acoustic Content developer documentation: https://developer.goacoustic.com/acoustic-content/docs

Acoustic Content API reference documentation: https://developer.goacoustic.com/acoustic-content/reference

Acoustic Content Samples Gallery: https://content-samples.goacoustic.com/

