/**
 * Class to manage focus on slots and items.
 * This class tracks the currently focused slot and item in the application.
 */
class Focus {
    #focusedSlot: HTMLElement | null = null;
    #focusedItem: HTMLImageElement | null = null;

    /**
     * Save the focus on a specific slot.
     * @param target - The slot element to focus on, or `null` to clear focus.
     */
    saveFocus(target: HTMLElement | null) {
        this.#focusedSlot = target;
        this.#focusedItem = target?.childNodes[0] as HTMLImageElement || null;
    }

    /**
     * Get the currently focused slot.
     */
    get focusedSlot() {
        return this.#focusedSlot;
    }

    /**
     * Set the currently focused slot.
     * @param slot - The slot element to set as focused, or `null` to clear focus.
     */
    set focusedSlot(slot: HTMLElement | null) {
        this.#focusedSlot = slot;
    }

    /**
     * Get the currently focused item.
     */
    get focusedItem() {
        return this.#focusedItem;
    }

    /**
     * Set the currently focused item.
     * @param item - The item element to set as focused, or `null` to clear focus.
     */
    set focusedItem(item: HTMLImageElement | null) {
        this.#focusedItem = item;
    }
}

const focus = new Focus();
export { focus };