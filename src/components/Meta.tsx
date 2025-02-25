import { Helmet } from "react-helmet-async"
import { isTestSubdomain } from "../functions/isTestSubdomain"

/**
 * Props for the Meta component.
 */
interface MetaProps {
    title?: string,
    description?: string,
    keywords?: string
}

/**
 * Meta component to manage the document head for SEO purposes.
 * @param props - The properties for the Meta component.
 * @returns The Meta component.
 */
export function Meta(props: MetaProps) {
    return <Helmet>
        <title>{props.title ? `${props.title} - ` : ""}Craftdle{isTestSubdomain() ? " Test" : ""}</title>
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