import { useEffect, useState } from "react";
import { StoneButton } from "../../components/StoneButton"

const updateTypes = ["server", "reactEdition"] as const;
type UpdateType = (typeof updateTypes)[number];

interface PatchNote {
    date: string;
    updates: Partial<{ [key in UpdateType]: Update }>;
}

interface Update {
    version: string,
    changes: Array<string | Array<string | Array<string>>>
}

/**
 * Formats a string with special syntax into JSX elements.
 * @param text - The text to format.
 * @returns An array of strings and JSX elements.
 */
function changeFormatter(text: string) {
    const regex = /\{\{(.*?)\|(.*?)\}\}/g;
    const result: (string | JSX.Element)[] = [];
    let lastIndex = 0;

    text.replace(regex, (match, className, content, offset) => {
        if (offset > lastIndex) {
            result.push(text.slice(lastIndex, offset));
        }

        result.push(<span key={offset} className={className}>{content}</span>);

        lastIndex = offset + match.length;
        return match;
    });

    if (lastIndex < text.length) {
        result.push(text.slice(lastIndex));
    }

    return result;
}

/**
 * Formats a title string by adding spaces and capitalizing words.
 * @param text - The title text to format.
 * @returns The formatted title string.
 */
function formatTitle(text: string): string {
    return text
        .replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase szétszedése
        .replace(/[_-]/g, ' ') // snake_case és kebab-case szétszedése
        .replace(/\b\w/g, char => char.toUpperCase()); // Minden szó nagybetűsítése
}

/**
 * PatchNotes component to display the patch notes.
 * @returns The PatchNotes component.
 */
export function PatchNotes() {
    const [patchNotes, setPatchNotes] = useState<PatchNote[]>([]);

    useEffect(() => {
        // Fetch patch notes from the server on component mount.
        fetch(`${import.meta.env.VITE_SERVER_URL}/patchNotes`)
            .then(res => res.json())
            .then(data => setPatchNotes(data.data));
    }, [])

    return <div id="patchNotes">
        <header id="patchNotesHeader">
            {/* Navigation back to the main menu */}
            <StoneButton href="/">Back to Menu</StoneButton>
            <h1>Patch Notes</h1>
        </header>
        <main id="patchNotesContainer">
            {/* Display patch notes with a styled background */}
            <div id="patchNotesBackground">
                <div id="leftChain" className="chain"></div>
                <div id="rightChain" className="chain"></div>
                {patchNotes.reverse().map((patchNote, index) => {
                    return <section key={index} className="patchNote">
                        <h2>{patchNote.date}</h2>
                        {updateTypes.map((key) => {
                            const patch = patchNote.updates[key]
                            return patch && <article key={key}>
                                <h3>{formatTitle(key)} - v{patch.version}</h3>
                                <ul>
                                    {patch.changes.map((change, index) => {
                                        return <li key={index}>
                                            {Array.isArray(change) ? (
                                                change.map((subChange, index) => {
                                                    return Array.isArray(subChange) ? (
                                                        <ul key={index}>
                                                            {subChange.map((subSubChange, index) => {
                                                                return <li key={index}>
                                                                    {changeFormatter(subSubChange)}
                                                                </li>
                                                            })}
                                                        </ul>
                                                    ) : (
                                                        changeFormatter(subChange)
                                                    )
                                                })
                                            ) : (
                                                changeFormatter(change)
                                            )}
                                        </li>
                                    })}
                                </ul>
                            </article>
                        })}
                    </section>
                })}
            </div>
        </main>
    </div>
}