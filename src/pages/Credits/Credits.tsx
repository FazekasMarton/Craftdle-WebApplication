import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import craftdleTitle from "../../assets/imgs/title/craftdle_title.png"
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

/**
 * Simulate a click event on the credits link.
 */
function simulateClick() {
    document.getElementById("credits")?.click()
}

/**
 * Props for the Credit component.
 */
interface CreditProps {
    children: Array<string | Credit> | string;
    credit?: string;
}

interface Credit {
    credit?: string;
    members: Array<string | Credit>;
}

interface CreditGroup {
    title: string;
    credits: Credit[] | CreditGroup[];
}

interface CreditGroupProps {
    credit: Credit | CreditGroup;
}

/**
 * Credit component to display individual credits.
 * @param props - The properties for the Credit component.
 * @returns The Credit component.
 */
function Credit(props: CreditProps) {
    return (
        <p className={props.credit ? "creditTextContainer" : "creditMessageContainer"}>
            {props.credit ? <strong className="creditTitle">{props.credit}</strong> : null}
            <span className="creditText">
                {typeof props.children === "string"
                    ? props.children
                    : props.children.map((child, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && <>, <br /></>}
                            {typeof child === "string" ? child : (child as Credit).credit}
                        </React.Fragment>
                    ))
                }
            </span>
        </p>
    );
}

function CreditGroup(props: CreditGroupProps) {
    return "title" in props.credit ? (
        <article>
            <h3>{props.credit.title}</h3>
            {props.credit.credits.map((CreditGroup, index) => {
                return "members" in CreditGroup && <Credit key={index} credit={CreditGroup.credit}>
                    {CreditGroup.members}
                </Credit>
            })}
        </article>
    ) : (
        <Credit credit={props.credit.credit}>
            {props.credit.members}
        </Credit>
    )
}

/**
 * Credits component to display the credits page.
 * @returns The Credits component.
 */
export function Credits() {
    const [credits, setCredits] = useState<CreditGroup[]>([]);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const socket = useSelector((state: RootState) => state.socket.socket);

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            socket?.emit("credits");
            simulateClick();
        }, 60000);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [socket]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/credits`)
            .then(res => res.json())
            .then(data => setCredits(data.data));
    }, []);

    console.log(credits);

    return <Link to="/" id="credits" onClick={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}>
        <div id="creditsContainer">
            <header>
                <h1>
                    <img id="creditsCraftdleTitle" src={craftdleTitle} alt="Craftdle Title" draggable={false} />
                </h1>
            </header>
            <main>
                {credits.map((group, index) => {
                    return group.title != "Contact" && <section key={index}>
                        <h2>{group.title}</h2>
                        {group.credits.map((credit, index) => {
                            return <CreditGroup key={index} credit={credit} />
                        })}
                    </section>
                })}
            </main>
            <footer>
                {credits.map((group, index) => {
                    return group.title == "Contact" && <section key={index}>
                        <h2>{group.title}</h2>
                        {group.credits.map((credit, index) => {
                            return <CreditGroup key={index} credit={credit} />
                        })}
                    </section>
                })}
            </footer>
        </div>
    </Link>
}