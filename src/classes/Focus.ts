class Focus{
    #focusedSlot: HTMLElement | null = null;
    #focusedItem: HTMLImageElement | null = null;

    saveFocus(target: HTMLElement | null) {
        this.#focusedSlot = target;
        this.#focusedItem = target?.childNodes[0] as HTMLImageElement || null;
    }

    get focusedSlot(){
        return this.#focusedSlot;
    }

    set focusedSlot(slot: HTMLElement | null){
        this.#focusedSlot = slot;
    }

    get focusedItem(){
        return this.#focusedItem;
    }

    set focusedItem(item: HTMLImageElement | null){
        this.#focusedItem = item;
    }
}

const focus = new Focus();
export { focus };