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
    private items: { [id: string]: HTMLImageElement } = {};

    /**
     * Add an item to the collection.
     * @param item - The item to add.
     */
    async addItem(item: IItem) {
        if(!this.items[item.id]) {    
            const img = new Image();
            img.className = item.id;
            img.alt = item.name;
            img.src = `http://localhost:3000/assets/items/${item.src}`;
            this.items[item.id] = img;
            return true
        }
    }

    getItem(id: string) {
        return this.items[id];
    }

    clearItems() {
        this.items = {};
    }
}