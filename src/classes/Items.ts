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
 * This class manages a collection of items, allowing adding, retrieving, and clearing items.
 */
export class Items {
    private items: { [id: string]: HTMLImageElement } = {};

    /**
     * Add an item to the collection.
     * Fetches the item's image from the server and stores it in the collection.
     * @param item - The item to add.
     * @returns A promise that resolves to `true` if the item was added successfully, or `false` otherwise.
     */
    async addItem(item: IItem) {
        if(!this.items[item.id]) {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/assets/items/${item.src}`);
    
            if (!response.ok) {
                return false;
            }
    
            const imageBlob = await response.clone().blob();
    
            const imageUrl = URL.createObjectURL(imageBlob);
    
            const img = new Image();
            img.className = item.id;
            img.alt = item.name;
            img.src = imageUrl;
            img.loading = "lazy";
            this.items[item.id] = img;
        }
        
        return true
    }

    /**
     * Retrieve an item by its ID.
     * @param id - The ID of the item to retrieve.
     * @returns The HTMLImageElement of the item, or `undefined` if not found.
     */
    getItem(id: string) {
        return this.items[id];
    }

    /**
     * Clear all items from the collection.
     */
    clearItems() {
        this.items = {};
    }
}