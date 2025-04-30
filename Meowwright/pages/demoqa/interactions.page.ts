import { Page } from '@playwright/test';
import { BasePage } from '../common/base.page';

export class InteractionsPage extends BasePage {
    // Selectors
    readonly sortableLink = 'span.text:has-text("Sortable")';
    readonly selectableLink = 'span.text:has-text("Selectable")';
    readonly resizableLink = 'span.text:has-text("Resizable")';
    readonly droppableLink = 'span.text:has-text("Droppable")';
    readonly draggableLink = 'span.text:has-text("Draggable")';
    
    constructor(public page: Page) {
        super(page);
    }

    async navigate(): Promise<void> {
        await this.navigateTo('https://demoqa.com/interaction', 'DEMOQA Interactions');
    }

    /**
     * Clicks on the Sortable link
     */
    async clickSortable(): Promise<void> {
        await this.page.click(this.sortableLink);
    }

    /**
     * Clicks on the Selectable link
     */
    async clickSelectable(): Promise<void> {
        await this.page.click(this.selectableLink);
    }

    /**
     * Clicks on the Resizable link
     */
    async clickResizable(): Promise<void> {
        await this.page.click(this.resizableLink);
    }

    /**
     * Clicks on the Droppable link
     */
    async clickDroppable(): Promise<void> {
        await this.page.click(this.droppableLink);
    }

    /**
     * Clicks on the Draggable link
     */
    async clickDraggable(): Promise<void> {
        await this.page.click(this.draggableLink);
    }

    /**
     * Navigates directly to the Sortable page
     */
    async navigateToSortable(): Promise<void> {
        await this.navigateTo('https://demoqa.com/sortable', 'DEMOQA Sortable');
    }

    /**
     * Navigates directly to the Selectable page
     */
    async navigateToSelectable(): Promise<void> {
        await this.navigateTo('https://demoqa.com/selectable', 'DEMOQA Selectable');
    }

    /**
     * Navigates directly to the Resizable page
     */
    async navigateToResizable(): Promise<void> {
        await this.navigateTo('https://demoqa.com/resizable', 'DEMOQA Resizable');
    }

    /**
     * Navigates directly to the Droppable page
     */
    async navigateToDroppable(): Promise<void> {
        await this.navigateTo('https://demoqa.com/droppable', 'DEMOQA Droppable');
    }

    /**
     * Navigates directly to the Draggable page
     */
    async navigateToDraggable(): Promise<void> {
        await this.navigateTo('https://demoqa.com/dragabble', 'DEMOQA Draggable');
    }

    /**
     * Performs a drag and drop operation
     * @param sourceSelector The selector for the source element
     * @param targetSelector The selector for the target element
     */
    async dragAndDrop(sourceSelector: string, targetSelector: string): Promise<void> {
        await this.page.dragAndDrop(sourceSelector, targetSelector);
    }
}