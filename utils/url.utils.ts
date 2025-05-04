/**
 * URL utility functions for common URL operations
 */
export class UrlUtils {
  /**
   * Parses a URL into its components
   * @param url The URL to parse
   * @returns An object containing the URL components
   */
  public static parse(url: string): URL {
    try {
      return new URL(url);
    } catch (error) {
      // If the URL is relative, prepend a base URL
      try {
        return new URL(url, 'http://example.com');
      } catch (error) {
        throw new Error(`Invalid URL: ${url}`);
      }
    }
  }

  /**
   * Gets the query parameters from a URL as an object
   * @param url The URL to get the query parameters from
   * @returns An object containing the query parameters
   */
  public static getQueryParams(url: string): Record<string, string> {
    const parsedUrl = this.parse(url);
    const params: Record<string, string> = {};
    
    parsedUrl.searchParams.forEach((value, key) => {
      params[key] = value;
    });
    
    return params;
  }

  /**
   * Gets a specific query parameter from a URL
   * @param url The URL to get the query parameter from
   * @param param The name of the query parameter
   * @returns The value of the query parameter or null if not found
   */
  public static getQueryParam(url: string, param: string): string | null {
    const parsedUrl = this.parse(url);
    return parsedUrl.searchParams.get(param);
  }

  /**
   * Adds query parameters to a URL
   * @param url The URL to add the query parameters to
   * @param params The query parameters to add
   * @returns The URL with the added query parameters
   */
  public static addQueryParams(url: string, params: Record<string, string>): string {
    const parsedUrl = this.parse(url);
    
    for (const [key, value] of Object.entries(params)) {
      parsedUrl.searchParams.append(key, value);
    }
    
    return parsedUrl.toString();
  }

  /**
   * Removes query parameters from a URL
   * @param url The URL to remove the query parameters from
   * @param params The names of the query parameters to remove
   * @returns The URL with the removed query parameters
   */
  public static removeQueryParams(url: string, params: string[]): string {
    const parsedUrl = this.parse(url);
    
    for (const param of params) {
      parsedUrl.searchParams.delete(param);
    }
    
    return parsedUrl.toString();
  }

  /**
   * Gets the path segments from a URL
   * @param url The URL to get the path segments from
   * @returns An array of path segments
   */
  public static getPathSegments(url: string): string[] {
    const parsedUrl = this.parse(url);
    return parsedUrl.pathname.split('/').filter(segment => segment);
  }

  /**
   * Joins URL segments into a single URL
   * @param segments The URL segments to join
   * @returns The joined URL
   */
  public static join(...segments: string[]): string {
    return segments
      .map(segment => segment.replace(/^\/+|\/+$/g, ''))
      .filter(segment => segment)
      .join('/');
  }

  /**
   * Normalizes a URL by resolving relative paths
   * @param url The URL to normalize
   * @returns The normalized URL
   */
  public static normalize(url: string): string {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.toString();
    } catch (error) {
      // Handle relative URLs
      const segments = url.split('/');
      const result = [];
      
      for (const segment of segments) {
        if (segment === '.' || segment === '') continue;
        if (segment === '..') {
          result.pop();
        } else {
          result.push(segment);
        }
      }
      
      return result.join('/');
    }
  }

  /**
   * Gets the base URL (protocol + hostname + port) from a URL
   * @param url The URL to get the base URL from
   * @returns The base URL
   */
  public static getBaseUrl(url: string): string {
    const parsedUrl = this.parse(url);
    return `${parsedUrl.protocol}//${parsedUrl.host}`;
  }

  /**
   * Gets the domain from a URL
   * @param url The URL to get the domain from
   * @returns The domain
   */
  public static getDomain(url: string): string {
    const parsedUrl = this.parse(url);
    return parsedUrl.hostname;
  }

  /**
   * Checks if a URL is absolute
   * @param url The URL to check
   * @returns True if the URL is absolute
   */
  public static isAbsolute(url: string): boolean {
    return /^(?:[a-z]+:)?\/\//i.test(url);
  }

  /**
   * Checks if a URL is relative
   * @param url The URL to check
   * @returns True if the URL is relative
   */
  public static isRelative(url: string): boolean {
    return !this.isAbsolute(url);
  }

  /**
   * Converts a relative URL to an absolute URL
   * @param relativeUrl The relative URL to convert
   * @param baseUrl The base URL to use
   * @returns The absolute URL
   */
  public static toAbsolute(relativeUrl: string, baseUrl: string): string {
    if (this.isAbsolute(relativeUrl)) return relativeUrl;
    return new URL(relativeUrl, baseUrl).toString();
  }

  /**
   * Encodes a URL component
   * @param component The URL component to encode
   * @returns The encoded URL component
   */
  public static encodeComponent(component: string): string {
    return encodeURIComponent(component);
  }

  /**
   * Decodes a URL component
   * @param component The URL component to decode
   * @returns The decoded URL component
   */
  public static decodeComponent(component: string): string {
    return decodeURIComponent(component);
  }

  /**
   * Builds a URL from its components
   * @param components The URL components
   * @returns The built URL
   */
  public static build(components: {
    protocol?: string;
    username?: string;
    password?: string;
    hostname: string;
    port?: string | number;
    pathname?: string;
    search?: string | Record<string, string>;
    hash?: string;
  }): string {
    const url = new URL('http://example.com');
    
    if (components.protocol) url.protocol = components.protocol;
    if (components.username) url.username = components.username;
    if (components.password) url.password = components.password;
    if (components.hostname) url.hostname = components.hostname;
    if (components.port) url.port = String(components.port);
    if (components.pathname) url.pathname = components.pathname;
    if (components.hash) url.hash = components.hash.startsWith('#') ? components.hash : `#${components.hash}`;
    
    // Handle search params
    if (components.search) {
      if (typeof components.search === 'string') {
        url.search = components.search.startsWith('?') ? components.search : `?${components.search}`;
      } else {
        for (const [key, value] of Object.entries(components.search)) {
          url.searchParams.append(key, value);
        }
      }
    }
    
    return url.toString();
  }
}