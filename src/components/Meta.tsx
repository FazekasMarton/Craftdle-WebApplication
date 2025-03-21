import { Helmet } from "react-helmet-async";
import { isTestSubdomain } from "../functions/isTestSubdomain";

interface MetaProps {
    title?: string;
    description?: string;
    keywords?: string;
}

/**
 * Meta component to manage the HTML head metadata.
 * 
 * This component dynamically updates the page title, description, keywords,
 * and other metadata based on the provided props and the current environment.
 * 
 * @param props - The properties for the Meta component.
 * @param props.title - The title of the page.
 * @param props.description - The description of the page.
 * @param props.keywords - The keywords for the page.
 * @returns The Meta component.
 */
export function Meta(props: MetaProps) {
    const isTest = isTestSubdomain();
    const manifest = isTest ? "testManifest.json" : "defaultManifest.json";
    const logoPath = `/imgs/logos/${isTest ? "test" : "default"}`;

    return (
        <Helmet>
            <title>{props.title ? `${props.title} - ` : ""}Craftdle{isTest ? " Test" : ""}</title>
            <meta
                name="description"
                content={props.description || "Craftdle is a Minecraft-inspired word puzzle game. Guess the crafting recipe by crafting items and using hints. Play now on PC or mobile."}
            />
            <meta
                name="keywords"
                content={props.keywords || "Minecraft, Wordle, Craftdle, Word Puzzle, Crafting Game, Guideian Angel, Minecraft Wordle"}
            />

            <link rel="apple-touch-icon" sizes="180x180" href={`${logoPath}/apple-touch-icon.png`} />
            <link rel="icon" type="image/png" sizes="512x512" href={`${logoPath}/android-chrome-512x512.png`} />
            <link rel="icon" type="image/png" sizes="192x192" href={`${logoPath}/android-chrome-192x192.png`} />
            <link rel="icon" type="image/png" sizes="32x32" href={`${logoPath}/favicon-32x32.png`} />
            <link rel="icon" type="image/png" sizes="16x16" href={`${logoPath}/favicon-16x16.png`} />
            <link rel="icon" href={`${logoPath}/favicon.ico`} />
            <link rel="manifest" href={`/manifests/${manifest}`} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="theme-color" content="transparent" />
            <meta name="description" content="Craftdle is a Minecraft-based Wordle-like puzzle game. Solve crafting riddles in various modes on PC and mobile." />
            <meta name="keywords" content="Minecraft, Wordle, Craftdle, Riddle, Minecraft Wordle, Guideian Angel, Craft, Minecraft Riddle" />
            <meta name="robots" content="index, follow" />
            <meta name="revisit-after" content="1 Week" />
            <meta name="author" content="Guideian Angel" />
            <meta name="distribution" content="global" />
        </Helmet>
    );
}