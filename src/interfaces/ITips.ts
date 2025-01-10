export type ITips = Array<{
    item: {
        id: string,
        name: string,
        src: string
    },
    table: Array<{
        item: string,
        status: "correct" | "wrong" | "semi-correct"
    } | null>
}>