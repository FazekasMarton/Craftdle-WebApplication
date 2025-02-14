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
    private items: IItem[] = [];  // Az összes item tárolása

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
        this.items = this.items.concat(items); // Az új elemek hozzáadása az existing items-hoz
    }

    /**
     * Add an item to the collection.
     * @param item - The item to add.
     */
    async addItem(item: IItem) {
        try {
            const cache = await caches.open('items');  // Nyitjuk a cache-t
            // Keresd meg a képet a cache-ben
            const cachedResponse = await cache.match(item.id);

            if (!cachedResponse) {  // Ha nincs a cache-ben, akkor töltsük le
                const response = await fetch(`http://localhost:3000/assets/items/${item.src}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.statusText}`);
                }

                // Cache-elés
                const clonedResponse = response.clone();  // Klónozd le a válaszot, hogy cache-be tedd
                cache.put(item.id, clonedResponse);  // Cache-be mentés
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
        const cachedResponse = await cache.match(itemId); // Keressük a cache-ben

        if (cachedResponse) {
            // Ha a válasz már a cache-ben van, akkor visszaadjuk
            const imageBlob = await cachedResponse.blob();  // A válasz átalakítása Blob formátumba
            const imageUrl = URL.createObjectURL(imageBlob);  // Kép URL létrehozása

            // Kép elem létrehozása
            const img = new Image();
            const item = this.items.find(i => i.id === itemId);  // Megkeressük a megfelelő item-et
            if (item) {
                img.className = item.id;
                img.alt = item.name;
            }
            img.src = imageUrl;

            return img;
        } else {
            return undefined;  // Ha nincs a cache-ben, akkor undefined-ot adunk vissza
        }
    }

    async allImagesLoaded(): Promise<boolean> {
        const images = await Promise.all(this.items.map(item => this.getItem(item.id)));

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
                    resolve(false); // Ha egy kép nem töltődik be, azonnal false
                };
            });
        });
    }
}