/**
 * Type definition for tips.
 * 
 * Each tip contains an item and a crafting table status.
 */
export type ITips = Array<{
    /**
     * The item associated with the tip.
     */
    item: {
        id: string, // Unique identifier for the item.
        name: string, // Display name of the item.
        src: string // Source URL for the item's image.
    },
    /**
     * The crafting table status for the tip.
     */
    table: Array<{
        item: string, // Name of the item in the table.
        status: "correct" | "wrong" | "semi-correct" // Status of the item in the crafting table.
    } | null>
}>