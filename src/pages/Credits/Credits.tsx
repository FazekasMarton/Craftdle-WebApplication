import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import craftdleTitle from "../../assets/imgs/title/craftdle_title.png"
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { countObjectKeys } from "../../functions/countKeys";

interface Credit {
    credit?: string;
    members: Array<string | Credit>;
}

interface CreditGroup {
    title: string;
    credits: Credit[] | CreditGroup[];
}

/**
 * Simulates a click event on the credits container.
 */
function simulateClick() {
    document.getElementById("credits")?.click();
}

interface CreditProps {
    credit: Credit;
}

/**
 * Renders a single credit item.
 * 
 * @param props - The credit item to render.
 * @returns A JSX element representing the credit.
 */
function Credit(props: CreditProps) {
    return <p className={props.credit.credit ? "creditTextContainer" : "creditMessageContainer"}>
        {props.credit.credit ? <strong className="creditTitle">{props.credit.credit}</strong> : null}
        <span className="creditText">
            {typeof props.credit.members === "string"
                ? props.credit.members
                : props.credit.members.map((member, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && <>, <br /></>}
                        {typeof member === "string" ? member : (member as Credit).credit}
                    </React.Fragment>
                ))
            }
        </span>
    </p>
}

interface CreditGroupProps {
    titleLevel?: number;
    credits: CreditGroup[];
}

/**
 * Renders a group of credits with nested titles.
 * 
 * @param props - The credit group to render.
 * @returns A JSX element representing the credit group.
 */
function CreditGroup(props: CreditGroupProps) {
    const titleLevel = props.titleLevel ? props.titleLevel : 2;
    const titleName = `h${titleLevel > 6 ? 6 : titleLevel}` as keyof JSX.IntrinsicElements;
    return <>
        {props.credits.map((credit, index) => {
            return <>
                {
                    "credits" in credit ? (
                        <div key={index} className="creditGroup" style={{
                            marginTop: `${10 / (titleLevel - 1)}vmin`
                        }}>
                            {React.createElement(titleName, {className: 'title' }, credit.title)}
                            <CreditGroup titleLevel={titleLevel + 1} credits={credit.credits as CreditGroup[]} />
                        </div>
                    ) : (
                        "members" in credit && <Credit credit={credit as Credit} />
                    )
                }
            </>
        })}
    </>
}

/**
 * Credits component to display the credits for the application.
 * It fetches credits data from the server and handles scrolling animations.
 * 
 * @returns The Credits component.
 */
export function Credits() {
    const [credits, setCredits] = useState<CreditGroup[]>([]);
    const [creditsLength, setCreditsLength] = useState<number | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const socket = useSelector((state: RootState) => state.socket.socket);

    useEffect(() => {
        /**
         * Emits a "credits" event to the server and simulates a click after a timeout.
         */
        if(creditsLength){
            timeoutRef.current = setTimeout(() => {
                socket?.emit("credits");
                simulateClick();
            }, creditsLength);
        }

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [socket, creditsLength]);

    useEffect(() => {
        /**
         * Fetches credits data from the server and calculates the scroll duration.
         */
        fetch(`${import.meta.env.VITE_SERVER_URL}/credits`)
            .then(res => res.json())
            .then(data => {
                setCredits(data.data);
                setCreditsLength(countObjectKeys(data.data) * 350);
            });
    }, []);

    return <Link to="/" id="credits" onClick={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}>
        <div key={creditsLength} id="creditsContainer" style={creditsLength ? {
            animation: `scrollUp ${creditsLength}ms linear forwards`
        } : {}}>
            <header>
                <h1>
                    <img id="creditsCraftdleTitle" src={craftdleTitle} alt="Craftdle Title" draggable={false} />
                </h1>
            </header>
            <main>
                <CreditGroup credits={credits} />
            </main>
        </div>
    </Link>
}