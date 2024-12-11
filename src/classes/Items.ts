export interface Item{
    id: string
    name: string,
    src: string
} 

export class Items{
    private items: {[key: string]: HTMLImageElement} = {}

    constructor(items?: Array<Item>){
        if(items){
            this.addItems(items)
        }
    }

    addItems(items: Array<Item>){
        items.forEach(item => {
            this.addItem(item)
        });
    }

    addItem(item: Item){
        let image = new Image()
        image.className = item.id
        image.alt = item.name
        image.src = `http://localhost:3000/items/${item.src}`
        this.items[item.id] = image
    }

    getItem(itemId: string){
        return this.items[itemId]
    }
}