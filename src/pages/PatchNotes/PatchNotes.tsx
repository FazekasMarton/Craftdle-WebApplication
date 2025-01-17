import { StoneButton } from "../../components/StoneButton"

export function PatchNotes() {
    return <div id="patchNotes">
        <header id="patchNotesHeader">
            <StoneButton href="/">Back to Menu</StoneButton>
            <h1>Patch Notes</h1>
        </header>
        <main id="patchNotesContainer">
            <div id="patchNotesBackground">
                <div id="leftChain" className="chain"></div>
                <div id="rightChain" className="chain"></div>
                <article className="patchNote">
                    <h2>v1.2.0 - MMM DD, YYYY</h2>
                    <ul>
                        <li>
                            <span className="new">New</span> gamemodes added
                            <ul>
                                <li>Tutorial</li>
                                <li>Daily</li>
                                <li>Hardcore</li>
                            </ul>
                        </li>
                        <li>Account creation <span className="new">added</span></li>
                        <li>Statistic page <span className="new">added</span></li>
                        <li>
                            Collection <span className="new">added</span>
                            <ul>
                                <li>Achievements</li>
                                <li>Inventory</li>
                                <li>Profile Borders</li>
                                <li>Profile Pictures</li>
                            </ul>
                        </li>
                        <li>Settings <span className="new">added</span></li>
                        <li>Control/game mechanics <span className="change">reworked</span></li>
                        <li>Continue feature <span className="new">added</span> for unfinished game</li>
                        <li>Loading Screen <span className="remove">removed</span></li>
                    </ul>
                </article>
                <article className="patchNote">
                    <h2>v1.1.2 - Sep 7, 2024</h2>
                    <ul>
                        <li>
                            Small bug <span className="change">fixes</span>
                        </li>
                        <li>
                            Gamemodes <span className="change">sorted</span> by difficulty
                        </li>
                    </ul>
                </article>
                <article className="patchNote">
                    <h2>v1.1.1 - Sep 6, 2024</h2>
                    <ul>
                        <li>
                            Bug <span className="change">fixes</span>
                            <ul>
                                <li>Shapeless itemes check</li>
                                <li>Loading Screen visual</li>
                            </ul>
                        </li>
                    </ul>
                </article>
                <article className="patchNote">
                    <h2>v1.1 - Sep 5, 2024</h2>
                    <ul>
                        <li>
                            <span className="new">New</span> gamemode added
                            <ul>
                                <li>Resource</li>
                            </ul>
                        </li>
                        <li>
                            <span className="new">New</span> control/game mechanics added
                            <ul>
                                <li>Instant Place</li>
                                <li>Knowledge Book</li>
                            </ul>
                        </li>
                        <li>
                            Bug <span className="change">fixes</span>
                            <ul>
                                <li>Database</li>
                                <li>Maintenance Notice</li>
                                <li>Loading Screen</li>
                            </ul>
                        </li>
                        <li>
                            Visual <span className="change">updates</span>
                            <ul>
                                <li>Item's icons' size</li>
                            </ul>
                        </li>
                    </ul>
                </article>
                <article className="patchNote">
                    <h2>v1.0 - Aug 21, 2024</h2>
                    <ul>
                        <li>
                            <span className="new">New</span> gamemode added
                            <ul>
                                <li>Pocket</li>
                            </ul>
                        </li>
                        <li>
                            Hints <span className="change">changed</span>
                        </li>
                        <li>
                            4th hint <span className="new">added</span>
                        </li>
                        <li>
                            <span className="new">New</span> pages added
                            <ul>
                                <li>Credits</li>
                                <li>Patch Notes</li>
                            </ul>
                        </li>
                        <li>
                            Crafitng recipes <span className="change">updated</span> for Minecraft 1.21.1
                        </li>
                    </ul>
                </article>
                <article className="patchNote">
                    <h2>vBeta - Jun 4, 2024</h2>
                    <ul>
                        <li>
                            <span className="new">New</span> gamemodes added
                            <ul>
                                <li>Classic</li>
                                <li>All in One</li>
                            </ul>
                        </li>
                        <li>
                            Hints <span className="change">changed</span>
                        </li>
                        <li>
                            <span className="new">New</span> pages added
                            <ul>
                                <li>Main Menu</li>
                                <li>How to Play</li>
                            </ul>
                        </li>
                    </ul>
                </article>
                <article className="patchNote">
                    <h2>vAlpha - Apr 27, 2024</h2>
                    <ul>
                        <li>
                            Main game <span className="new">finished</span>
                        </li>
                        <li>
                            Mobile version <span className="new">added</span>
                        </li>
                        <li>
                            Hints <span className="new">added</span>
                        </li>
                    </ul>
                </article>
            </div>
        </main>
    </div>
}