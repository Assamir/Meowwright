import * as https from 'https';
import * as os from 'os';
import logger from './logger';

/**
 * Utility functions for IP address detection and geolocation
 */

/**
 * Get the local IP address of the machine
 * @returns The local IP address
 */
export function getLocalIpAddress(): string {
  try {
    const networkInterfaces = os.networkInterfaces();
    // Find the first non-internal IPv4 address
    for (const interfaceName in networkInterfaces) {
      const interfaces = networkInterfaces[interfaceName];
      if (interfaces) {
        for (const iface of interfaces) {
          // Skip internal and non-IPv4 addresses
          if (!iface.internal && iface.family === 'IPv4') {
            return iface.address;
          }
        }
      }
    }
    logger.warn('No non-internal IPv4 address found, using fallback');
    return '127.0.0.1'; // Fallback to localhost
  } catch (error) {
    logger.error(`Error getting local IP address: ${error}`);
    return '127.0.0.1'; // Fallback to localhost
  }
}

/**
 * Check if the current IP address is from the UK
 * @returns Promise<boolean> True if the IP is from the UK, false otherwise
 */
export async function isUkIpAddress(): Promise<boolean> {
  try {
    // First try to get country from public IP
    const isUk = await checkIfPublicIpIsFromUk();
    if (isUk !== null) {
      return isUk;
    }
    
    // If that fails, check local IP address range
    // This is a simple heuristic and not 100% accurate
    const localIp = getLocalIpAddress();
    logger.info(`Using local IP address for country detection: ${localIp}`);
    
    // Check if IP is in UK ranges (very simplified)
    // This is just a basic example - in reality, you'd need a more comprehensive database
    const ukIpRanges = [
      '51.', // Some UK cloud providers
      '81.', // Some UK ISPs
      '82.',
      '86.',
      '87.',
      '193.',
      '194.',
      '195.',
    ];
    
    const isUkIp = ukIpRanges.some(range => localIp.startsWith(range));
    logger.info(`IP address ${localIp} is ${isUkIp ? '' : 'not '}from the UK based on local check`);
    return isUkIp;
  } catch (error) {
    logger.error(`Error checking if IP is from UK: ${error}`);
    return false; // Default to false on error
  }
}

/**
 * Check if the public IP address is from the UK using a geolocation API
 * @returns Promise<boolean|null> True if the IP is from the UK, false if not, null if check failed
 */
async function checkIfPublicIpIsFromUk(): Promise<boolean | null> {
  return new Promise((resolve) => {
    try {
      // Use ipapi.co which doesn't require an API key
      const options = {
        hostname: 'ipapi.co',
        path: '/json/',
        method: 'GET',
        timeout: 5000, // 5 second timeout
      };

      const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            if (res.statusCode === 200) {
              const response = JSON.parse(data);
              const countryCode = response.country_code;
              logger.info(`Detected country code from public IP: ${countryCode}`);
              resolve(countryCode === 'GB');
            } else {
              logger.warn(`Failed to get country from public IP: Status ${res.statusCode}`);
              resolve(null);
            }
          } catch (error) {
            logger.error(`Error parsing geolocation API response: ${error}`);
            resolve(null);
          }
        });
      });
      
      req.on('error', (error) => {
        logger.error(`Error making geolocation API request: ${error}`);
        resolve(null);
      });
      
      req.on('timeout', () => {
        logger.warn('Geolocation API request timed out');
        req.destroy();
        resolve(null);
      });
      
      req.end();
    } catch (error) {
      logger.error(`Error in checkIfPublicIpIsFromUk: ${error}`);
      resolve(null);
    }
  });
}

/**
 * Get UK geolocation settings
 * @returns Object with locale and geolocation for UK
 */
export function getUkGeolocationSettings() {
  return {
    locale: 'en-GB',
    geolocation: { longitude: -0.1278, latitude: 51.5074 }, // London, UK
  };
}

/**
 * Get default geolocation settings (non-UK)
 * @returns Object with locale and geolocation for default location
 */
export function getDefaultGeolocationSettings() {
  return {
    locale: 'en-US',
    geolocation: { longitude: -74.0060, latitude: 40.7128 }, // New York, US
  };
}