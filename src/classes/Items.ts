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

    getItem(id: string) {
        return this.items[id];
    }

    clearItems() {
        this.items = {};
    }
}