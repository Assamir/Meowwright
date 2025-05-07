import { Page } from '@playwright/test';
import { BasePage } from '../common/base.page';

export class ShopPage extends BasePage {
    // URL components
    readonly baseUrl = 'https://qa.ecom.volvopenta.com';
    readonly shopPath = '/shop/523388';

    // Common selectors for e-commerce shop page
    readonly productListSelector = '.product-list, .products, .items';
    readonly productItemSelector = '.product-item, .product, .item';
    readonly productNameSelector = '.product-name, .name, h2, h3';
    readonly productPriceSelector = '.product-price, .price';
    readonly productImageSelector = '.product-image, .image, img';
    readonly addToCartButtonSelector = '.add-to-cart, button:has-text("Add to Cart")';
    readonly cartIconSelector = '.cart-icon, .cart, .shopping-cart';
    readonly searchInputSelector = 'input[type="search"], .search-input';
    readonly searchButtonSelector = 'button[type="submit"], .search-button';
    readonly categoryMenuSelector = '.categories, .category-menu, nav';
    readonly filterOptionsSelector = '.filters, .filter-options';
    readonly sortOptionsSelector = '.sort, .sort-options';
    readonly paginationSelector = '.pagination';
    readonly breadcrumbsSelector = '.breadcrumbs';

    // Location selectors - more specific selectors for better targeting
    readonly locationSelectorButton = '.location-selector, .region-selector, .country-selector, [data-testid="location-selector"], [data-testid="region-selector"], [data-testid="country-selector"], button:has-text("Location"), button:has-text("Region"), button:has-text("Country"), .header-location, .country-selector-button, .location-button';
    readonly ukOptionSelector = '[data-testid="country-GB"], [data-testid="country-UK"], [data-country="GB"], [data-country="UK"], a:has-text("United Kingdom"), a:has-text("UK"), button:has-text("United Kingdom"), button:has-text("UK"), .country-option:has-text("United Kingdom"), .country-option:has-text("UK"), li:has-text("United Kingdom"), li:has-text("UK")';

    constructor(public page: Page) {
        super(page);
    }

    /**
     * Navigate to the shop page
     */
    async navigate(): Promise<void> {
        await this.navigateTo(`${this.baseUrl}${this.shopPath}`, 'Volvo Penta Shop');
    }

    /**
     * Get all products on the page
     * @returns Promise<ElementHandle[]> Array of product elements
     */
    async getProducts() {
        return this.page.$$(this.productItemSelector);
    }

    /**
     * Get product count
     * @returns Promise<number> Number of products on the page
     */
    async getProductCount(): Promise<number> {
        const products = await this.getProducts();
        return products.length;
    }

    /**
     * Click on a product by index
     * @param index Index of the product to click (0-based)
     */
    async clickProduct(index: number = 0): Promise<void> {
        const products = await this.getProducts();
        if (products.length > index) {
            await products[index].click();
        } else {
            throw new Error(`Product at index ${index} not found`);
        }
    }

    /**
     * Add a product to cart by index
     * @param index Index of the product to add to cart (0-based)
     */
    async addProductToCart(index: number = 0): Promise<void> {
        const products = await this.getProducts();
        if (products.length > index) {
            const addToCartButton = await products[index].$(this.addToCartButtonSelector);
            if (addToCartButton) {
                await addToCartButton.click();
            } else {
                throw new Error(`Add to cart button not found for product at index ${index}`);
            }
        } else {
            throw new Error(`Product at index ${index} not found`);
        }
    }

    /**
     * Search for products
     * @param searchTerm Term to search for
     */
    async searchProducts(searchTerm: string): Promise<void> {
        await this.page.fill(this.searchInputSelector, searchTerm);
        await this.page.click(this.searchButtonSelector);
    }

    /**
     * Go to cart
     */
    async goToCart(): Promise<void> {
        await this.page.click(this.cartIconSelector);
    }

    /**
     * Get page title
     * @returns Promise<string> Page title
     */
    async getPageTitle(): Promise<string> {
        return this.page.title();
    }

    /**
     * Check if page is loaded
     * @returns Promise<boolean> True if page is loaded
     */
    async isPageLoaded(): Promise<boolean> {
        return this.waitForElement(this.productListSelector);
    }

    /**
     * Change location to UK using multiple strategies
     * @param retryCount Number of retries if the first attempt fails
     * @returns Promise<boolean> True if location was changed successfully
     */
    async changeLocationToUK(retryCount: number = 2): Promise<boolean> {
        console.log('Attempting to change location to UK...');

        // Try setting cookies first (this is often the most reliable method)
        const cookiesSet = await this.setUKCookies();
        console.log(`UK cookies set: ${cookiesSet}`);

        // Try URL parameter approach
        const urlParamSuccess = await this.navigateWithUKParam();
        console.log(`Navigation with UK URL parameter: ${urlParamSuccess}`);

        // Check if location is already UK after these attempts
        let isUK = await this.isLocationUK();
        console.log(`Location is UK after initial attempts: ${isUK}`);

        if (isUK) {
            return true;
        }

        // If not, try the UI approach with retries
        for (let i = 0; i <= retryCount; i++) {
            try {
                console.log(`UI approach attempt ${i + 1}/${retryCount + 1}`);

                // Click on the location selector button
                console.log('Clicking location selector button...');
                await this.page.click(this.locationSelectorButton);

                // Wait for the location options to appear
                console.log('Waiting for UK option to appear...');
                await this.page.waitForSelector(this.ukOptionSelector, { timeout: 5000 });

                // Click on the UK option
                console.log('Clicking UK option...');
                await this.page.click(this.ukOptionSelector);

                // Wait for the page to reload or update
                console.log('Waiting for page to update...');
                await this.page.waitForLoadState('networkidle');

                // Verify the location was changed
                isUK = await this.isLocationUK();
                console.log(`Location is UK after UI change attempt ${i + 1}: ${isUK}`);

                if (isUK) {
                    return true;
                }

                // If we're not at the last attempt, wait a bit before retrying
                if (i < retryCount) {
                    console.log('Location not changed to UK, waiting before retry...');
                    await this.page.waitForTimeout(1000);
                }
            } catch (error) {
                console.error(`Error in UI approach attempt ${i + 1}: ${error.message}`);

                // If we're not at the last attempt, wait a bit before retrying
                if (i < retryCount) {
                    console.log('Error occurred, waiting before retry...');
                    await this.page.waitForTimeout(1000);
                }
            }
        }

        // Final check
        isUK = await this.isLocationUK();
        console.log(`Final location check - Is UK: ${isUK}`);
        return isUK;
    }

    /**
     * Set cookies to indicate UK location
     * @returns Promise<boolean> True if cookies were set successfully
     */
    async setUKCookies(): Promise<boolean> {
        try {
            console.log('Setting UK location cookies...');

            // Common cookie names for location/country
            const cookiesToSet = [
                { name: 'country', value: 'GB', domain: '.volvopenta.com' },
                { name: 'countryCode', value: 'GB', domain: '.volvopenta.com' },
                { name: 'locale', value: 'en_GB', domain: '.volvopenta.com' },
                { name: 'location', value: 'GB', domain: '.volvopenta.com' },
                { name: 'region', value: 'GB', domain: '.volvopenta.com' }
            ];

            for (const cookie of cookiesToSet) {
                await this.page.context().addCookies([{
                    name: cookie.name,
                    value: cookie.value,
                    domain: cookie.domain,
                    path: '/',
                }]);
            }

            // Reload the page to apply cookies
            await this.page.reload();
            await this.page.waitForLoadState('networkidle');

            return true;
        } catch (error) {
            console.error(`Error setting UK cookies: ${error.message}`);
            return false;
        }
    }

    /**
     * Navigate to the shop page with UK parameter
     * @returns Promise<boolean> True if navigation was successful
     */
    async navigateWithUKParam(): Promise<boolean> {
        try {
            console.log('Navigating with UK URL parameter...');

            // Common URL parameters for country/location
            const ukParams = [
                'country=GB',
                'countryCode=GB',
                'locale=en_GB',
                'region=GB'
            ];

            // Construct URL with parameters
            const url = `${this.baseUrl}${this.shopPath}?${ukParams.join('&')}`;
            console.log(`Navigating to: ${url}`);

            // Navigate to the URL
            await this.page.goto(url);
            await this.page.waitForLoadState('networkidle');

            return true;
        } catch (error) {
            console.error(`Error navigating with UK parameter: ${error.message}`);
            return false;
        }
    }

    /**
     * Get current location from the UI
     * @returns Promise<string> The current location text or null if not found
     */
    async getCurrentLocation(): Promise<string | null> {
        try {
            console.log('Getting current location from UI...');

            // Try multiple approaches to get the location

            // 1. Try to get text from the location selector button
            const locationText = await this.page.locator(this.locationSelectorButton).textContent();
            if (locationText) {
                console.log(`Location from button text: ${locationText.trim()}`);
                return locationText.trim();
            }

            // 2. Try to get location from page URL
            const url = this.page.url();
            console.log(`Current URL: ${url}`);

            // Check for country code in URL
            const countryMatch = url.match(/[?&](country|countryCode)=([\w]{2})/i);
            if (countryMatch && countryMatch[2]) {
                console.log(`Country code from URL: ${countryMatch[2]}`);
                return countryMatch[2].toUpperCase();
            }

            // 3. Try to get location from cookies
            const cookies = await this.page.context().cookies();
            const locationCookies = cookies.filter(cookie => 
                ['country', 'countryCode', 'locale', 'location', 'region'].includes(cookie.name.toLowerCase())
            );

            if (locationCookies.length > 0) {
                console.log('Location cookies found:');
                for (const cookie of locationCookies) {
                    console.log(`${cookie.name}: ${cookie.value}`);
                    if (cookie.value.length === 2) {
                        return cookie.value.toUpperCase();
                    }
                    if (cookie.value.includes('GB') || cookie.value.includes('UK')) {
                        return 'GB';
                    }
                }
            }

            // 4. Try to get location from localStorage
            const localStorage = await this.page.evaluate(() => {
                const keys = ['country', 'countryCode', 'locale', 'location', 'region'];
                const result = {};
                for (const key of keys) {
                    const value = localStorage.getItem(key);
                    if (value) result[key] = value;
                }
                return result;
            });

            if (Object.keys(localStorage).length > 0) {
                console.log('Location from localStorage:');
                for (const [key, value] of Object.entries(localStorage)) {
                    console.log(`${key}: ${value}`);
                    if (typeof value === 'string') {
                        if (value.length === 2) {
                            return value.toUpperCase();
                        }
                        if (value.includes('GB') || value.includes('UK')) {
                            return 'GB';
                        }
                    }
                }
            }

            console.log('Could not determine location from any source');
            return null;
        } catch (error) {
            console.error(`Error getting current location: ${error.message}`);
            return null;
        }
    }

    /**
     * Check if current location is UK
     * @returns Promise<boolean> True if the current location is UK
     */
    async isLocationUK(): Promise<boolean> {
        try {
            console.log('Checking if current location is UK...');

            // 1. Try to get location from our getCurrentLocation method
            const location = await this.getCurrentLocation();
            if (location) {
                // Check if the location text contains UK or GB (case insensitive)
                const isUK = /uk|gb|united\s*kingdom/i.test(location);
                console.log(`Location from UI: ${location}, Is UK: ${isUK}`);
                if (isUK) return true;
            }

            // 2. Check page content for UK-specific elements
            const ukIndicators = [
                // Text that would indicate UK version of the site
                'p:has-text("United Kingdom")',
                'p:has-text("UK")',
                'span:has-text("United Kingdom")',
                'span:has-text("UK")',
                // Currency indicators
                'span:has-text("£")',
                'span:has-text("GBP")',
                // Phone number format
                'a[href^="tel:+44"]',
                // Address format
                'p:has-text("Post Code")'
            ];

            for (const selector of ukIndicators) {
                const isVisible = await this.page.isVisible(selector);
                if (isVisible) {
                    console.log(`UK indicator found: ${selector}`);
                    return true;
                }
            }

            // 3. Check URL for UK indicators
            const url = this.page.url();
            if (url.includes('/uk/') || url.includes('/gb/') || url.includes('country=GB') || url.includes('country=UK')) {
                console.log(`URL indicates UK: ${url}`);
                return true;
            }

            // 4. Check page title for UK indicators
            const title = await this.page.title();
            if (title.includes('UK') || title.includes('United Kingdom')) {
                console.log(`Page title indicates UK: ${title}`);
                return true;
            }

            console.log('No UK indicators found, location is not UK');
            return false;
        } catch (error) {
            console.error(`Error checking if location is UK: ${error.message}`);
            return false;
        }
    }
}
