/**
 * Interface representing an item.
 */
export interface IItem {
    id: string;
    name: string;
    src: string;
}

/**
 * Class to handle items.
 */
export class Items {
    private items: { [key: string]: HTMLImageElement } = {};

    /**
     * Create an instance of Items.
     * @param items - The initial items.
     */
    constructor(items?: Array<IItem>) {
        if (items) {
            this.addItems(items);
        }
    }

    /**
     * Add items to the collection.
     * @param items - The items to add.
     */
    addItems(items: Array<IItem>) {
        items.forEach(item => {
            this.addItem(item);
        });
    }

    /**
     * Add an item to the collection.
     * @param item - The item to add.
     */
    addItem(item: IItem) {
        let image = new Image();
        image.className = item.id;
        image.alt = item.name;
        image.src = `http://localhost:3000/assets/items/${item.src}`;
        this.items[item.id] = image;
    }

    /**
     * Get an item by its ID.
     * @param itemId - The ID of the item.
     * @returns The item or undefined if not found.
     */
    getItem(itemId: string) {
        return this.items[itemId];
    }
}