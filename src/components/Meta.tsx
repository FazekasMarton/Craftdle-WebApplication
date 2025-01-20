import { Helmet } from "react-helmet-async"

interface MetaProps {
    title?: string,
    description?: string,
    keywords?: string
}

export function Meta(props: MetaProps) {
    return <Helmet>
        <title>{props.title ? `${props.title} - ` : ""}Craftdle</title>
        <meta
            name="description"
            content={props.description || "Craftdle is a Minecraft-inspired word puzzle game. Guess the word by crafting items and using hints. Play now on PC or mobile."}
        />
        <meta
            name="keywords"
            content={props.keywords || "Minecraft, Wordle, Craftdle, Word Puzzle, Crafting Game, Guideian Angel, Minecraft Wordle"}
        />
    </Helmet>
}