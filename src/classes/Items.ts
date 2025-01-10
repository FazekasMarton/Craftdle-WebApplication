export interface IItem{
    id: string
    name: string,
    src: string
} 

export class Items{
    private items: {[key: string]: HTMLImageElement} = {}

    constructor(items?: Array<IItem>){
        if(items){
            this.addItems(items)
        }
    }

    addItems(items: Array<IItem>){
        items.forEach(item => {
            this.addItem(item)
        });
    }

    addItem(item: IItem){
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