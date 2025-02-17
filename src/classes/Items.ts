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
    private items: { [id: string]: IItem } = {};

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
            this.items[item.id] = item;
            this.addItem(item);
        });
    }

    /**
     * Add an item to the collection.
     * @param item - The item to add.
     */
    async addItem(item: IItem) {
        try {
            const cache = await caches.open('items');
            const cachedResponse = await cache.match(item.id);

            if (!cachedResponse) {
                const response = await fetch(`http://localhost:3000/assets/items/${item.src}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.statusText}`);
                }

                const clonedResponse = response.clone();
                cache.put(item.id, clonedResponse);
            }
        } catch (error) {
            console.error('Error fetching item:', error);
        }
    }

    /**
     * Get an item by its ID.
     * @param itemId - The ID of the item.
     * @returns The item or undefined if not found.
     */
    async getItem(itemId: string) {
        const cache = await caches.open('items');
        const cachedResponse = await cache.match(itemId);

        if (cachedResponse) {
            const imageBlob = await cachedResponse.blob();
            const imageUrl = URL.createObjectURL(imageBlob);

            const img = new Image();
            const item = this.items[itemId];
            if (item) {
                img.className = item.id;
                img.alt = item.name;
            }
            img.src = imageUrl;

            return img;
        } else {
            return undefined;
        }
    }

    async allImagesLoaded(): Promise<boolean> {
        const images = await Promise.all(Object.keys(this.items).map(item => this.getItem(this.items[item].id)));

        return new Promise(resolve => {
            let loadedCount = 0;
            const totalImages = images.length - 1;

            if (totalImages === 0) {
                resolve(true);
                return;
            }

            images.forEach(img => {
                if (!img) return;

                img.onload = () => {
                    loadedCount++;
                    if (loadedCount === totalImages) {
                        resolve(true);
                    }
                };

                img.onerror = () => {
                    resolve(false);
                };
            });
        });
    }
}