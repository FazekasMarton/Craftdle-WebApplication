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
        fetch(`${import.meta.env.VITE_SERVER_URL}/patchNotes`)
            .then(res => res.json())
            .then(data => setPatchNotes(data.data));
    }, [])

    return <div id="patchNotes">
        <header id="patchNotesHeader">
            <StoneButton href="/">Back to Menu</StoneButton>
            <h1>Patch Notes</h1>
        </header>
        <main id="patchNotesContainer">
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