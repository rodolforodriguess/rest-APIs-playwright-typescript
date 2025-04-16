import apiPath from './apiPaths';
import baseAPIUrl from './environmentBaseUrls'
import endpoints from './apiEndpoints'

function bindUrl(endpoint: string, env: string, userId?: string, isbn?: string) {
    console.log(endpoint + ' endpoint parameter passed to bidUrl function');
    const parts = endpoint.replace(/\/.+$/, '').split('.');
    console.log(parts + ' parts constant after endpoint url has its slashes taken out')

    const endpointParts = parts.map((part) => {
        switch (part) {
            case 'api':
                return baseAPIUrl[env].api;
                default:
                    return apiPath[part] ?? '/';
        } 
    });

    if (endpoint === endpoints.account.get) {
        endpointParts.push(userId);
    }
    if (endpoint === endpoints.books.put) {
        endpointParts.push(isbn);
    }
    const finalEndPoint = endpointParts.join('/');
    console.log(finalEndPoint + ' result returned by BindUrl function');
    return finalEndPoint;
}

function searchParamsForUrl(page: string, userId?: string) {
    let queryParams;
  
    switch (page) {
      case endpoints.books.delete:
        queryParams = { UserId: userId };;
        break;
      default:
        queryParams = {};
    }
    const nW = new URLSearchParams(queryParams).toString();
    console.log(nW + ' result returned by searchParamsForUrl function');
    return nW;
  }   
    
  
  export function buildUrl(endpoint: string, userId?: string, isbn?: string) {
    const env = process.env.ENV!;
    const url = [
      bindUrl(endpoint, env, userId, isbn),
      searchParamsForUrl(endpoint, userId),
    ]
    .filter(Boolean)
    .join('?');
    console.log(url + ' result returned by url const from buildUrl function');
    return url;
  }


