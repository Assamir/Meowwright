import { Page } from '@playwright/test';
import { BasePage } from '../common/base.page';

export class BookStorePage extends BasePage {
    // Selectors
    readonly loginLink = 'span.text:has-text("Login")';
    readonly bookStoreLink = 'span.text:has-text("Book Store")';
    readonly profileLink = 'span.text:has-text("Profile")';
    readonly bookStoreApiLink = 'span.text:has-text("Book Store API")';
    readonly searchBox = '#searchBox';
    readonly booksTable = '.rt-table';
    readonly bookRows = '.rt-tr-group';
    readonly loginButton = '#login';
    readonly usernameInput = '#userName';
    readonly passwordInput = '#password';
    
    constructor(public page: Page) {
        super(page);
    }

    async navigate(): Promise<void> {
        await this.navigateTo('https://demoqa.com/books', 'DEMOQA Book Store');
    }

    /**
     * Clicks on the Login link
     */
    async clickLogin(): Promise<void> {
        await this.page.click(this.loginLink);
    }

    /**
     * Clicks on the Book Store link
     */
    async clickBookStore(): Promise<void> {
        await this.page.click(this.bookStoreLink);
    }

    /**
     * Clicks on the Profile link
     */
    async clickProfile(): Promise<void> {
        await this.page.click(this.profileLink);
    }

    /**
     * Clicks on the Book Store API link
     */
    async clickBookStoreApi(): Promise<void> {
        await this.page.click(this.bookStoreApiLink);
    }

    /**
     * Navigates directly to the Login page
     */
    async navigateToLogin(): Promise<void> {
        await this.navigateTo('https://demoqa.com/login', 'DEMOQA Login');
    }

    /**
     * Navigates directly to the Book Store page
     */
    async navigateToBookStore(): Promise<void> {
        await this.navigateTo('https://demoqa.com/books', 'DEMOQA Book Store');
    }

    /**
     * Navigates directly to the Profile page
     */
    async navigateToProfile(): Promise<void> {
        await this.navigateTo('https://demoqa.com/profile', 'DEMOQA Profile');
    }

    /**
     * Searches for a book
     * @param searchText The text to search for
     */
    async searchBook(searchText: string): Promise<void> {
        await this.page.fill(this.searchBox, searchText);
    }

    /**
     * Clicks on a book by title
     * @param bookTitle The title of the book to click
     */
    async clickBookByTitle(bookTitle: string): Promise<void> {
        await this.page.click(`a:has-text("${bookTitle}")`);
    }

    /**
     * Logs in with the provided credentials
     * @param username The username
     * @param password The password
     */
    async login(username: string, password: string): Promise<void> {
        await this.navigateToLogin();
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }

    /**
     * Gets the number of books displayed in the table
     * @returns The number of books
     */
    async getBookCount(): Promise<number> {
        const rows = await this.page.$$(this.bookRows);
        return rows.length;
    }

    /**
     * Checks if a book with the given title exists
     * @param bookTitle The title of the book to check
     * @returns True if the book exists, false otherwise
     */
    async bookExists(bookTitle: string): Promise<boolean> {
        const bookLink = await this.page.$(`a:has-text("${bookTitle}")`);
        return bookLink !== null;
    }
}