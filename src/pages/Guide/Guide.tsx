import { StoneButton } from "../../components/StoneButton";
import pickUpControl from "/videos/pickUpControl.mp4"
import dropControl from "/videos/dropControl.mp4"
import replaceControl from "/videos/replaceControl.mp4"
import copyControl from "/videos/copyControl.mp4"
import removeControl from "/videos/removeControl.mp4"
import placeControl from "/videos/placeControl.mp4"
import tapControl from "/videos/tapControl.mp4"

export function Guide() {
    return <div id="guide">
        <nav id="guideContentTable">
            <StoneButton href="/">Exit</StoneButton>
            <ul>
                <li>
                    <a href="#controlGuide">Control</a>
                </li>
                <ul>
                    <li>
                        <a href="#controlPickUp">Pick Up</a>
                    </li>
                    <li>
                        <a href="#controlDrop">Drop</a>
                    </li>
                    <li>
                        <a href="#controlReplace">Replace</a>
                    </li>
                    <li>
                        <a href="#controlCopy">Copy</a>
                    </li>
                    <li>
                        <a href="#controlRemove">Remove</a>
                    </li>
                    <li>
                        <a href="#controlPlace">Place</a>
                    </li>
                    <li>
                        <a href="#controlTap">Tap</a>
                    </li>
                </ul>
                <li>
                    <a href="#gameplayGuide">Gameplay and Rules</a>
                </li>
                <ul>
                    <li>
                        <a href="#gameplayGuessing">Guessing Rules</a>
                    </li>
                    <li>
                        <a href="#outcome">Outcome</a>
                    </li>
                </ul>
                <li>
                    <a href="#gamemodesGuide">Gamemodes</a>
                </li>
                <ul>
                    <li>
                        <a href="#classicMode">Classic</a>
                    </li>
                    <li>
                        <a href="#tutorialMode">Tutorial</a>
                    </li>
                    <li>
                        <a href="#dailyMode">Daily</a>
                    </li>
                    <li>
                        <a href="#allInOneMode">All in One</a>
                    </li>
                    <li>
                        <a href="#pocketMode">Pocket</a>
                    </li>
                    <li>
                        <a href="#resourceMode">Resource</a>
                    </li>
                    <li>
                        <a href="#hardcoreMode">Hardcore</a>
                    </li>
                </ul>
            </ul>
        </nav>
        <main id="guideContent">
            <StoneButton href="/">Exit</StoneButton>
            <header>
                <h1>How to Play</h1>
            </header>
            <section id="controlGuide">
                <h2>Control</h2>
                <p>The controls can be changed in the settings. (This guide uses the default controls.)</p>
                <div id="controlContent">
                    <article id="controlPickUp">
                        <h4>Pick Up</h4>
                        <video src={pickUpControl} autoPlay loop muted />
                        <p>
                            You can pick up items from a slot by pressing the <b>left mouse button</b>.
                        </p>
                    </article>
                    <article id="controlDrop">
                        <h4>Drop</h4>
                        <video src={dropControl} autoPlay loop muted />
                        <p>
                            You can drop an item from your hand by pressing the <b>left mouse button</b>. You can land it in the slots of the Crafting Table or in the void.
                        </p>
                    </article>
                    <article id="controlReplace">
                        <h4>Replace</h4>
                        <video src={replaceControl} autoPlay loop muted />
                        <p>
                            You can replace a held item with an other by pressing the <b>left mouse button</b>.
                        </p>
                    </article>
                    <article id="controlCopy">
                        <h4>Copy</h4>
                        <video src={copyControl} autoPlay loop muted />
                        <p>
                            You can copy a held item by holding the <b>left mouse button</b>.
                        </p>
                    </article>
                    <article id="controlRemove">
                        <h4>Remove</h4>
                        <video src={removeControl} autoPlay loop muted />
                        <p>
                            You can remove an item from the Crafting Table with by pressing the <b>right mouse button</b>.
                        </p>
                    </article>
                    <article id="controlPlace">
                        <h4>Place</h4>
                        <video src={placeControl} autoPlay loop muted />
                        <p>
                            You can place an item directly from the inventory to the Crafting Table by pressing a <b>key</b> from <b>1-9</b>.
                        </p>
                    </article>
                    <article id="controlTap">
                        <h4>Tap</h4>
                        <video src={tapControl} autoPlay loop muted />
                        <p>
                            You can select an item from the inventory, remove items from the Crafting Table or place the selected item to the Crafting Table by <b>touching</b> the items and the slots.
                        </p>
                    </article>
                </div>
                <p>
                    In default, Tap Mode is disabled in PC, but on Mobile it's the only one that enable. (You can enable Tap Mode on PC in the settings.)
                </p>
            </section>
            <section id="gameplayGuide">
                <h2>Gameplay and Rules</h2>
                <p>
                    You have to solve a crafting riddle by guessing crafting recipes.
                    You will get some hints during the game.
                </p>
                <p>
                    <b>Important: Some similar recipes are treated as a single recipe.</b>
                </p>
                <p>For example:</p>
                <ul>
                    <li>
                        Colored Items:
                        <ul>
                            <li>Red Wool, Blue Wool, Black Wool, etc</li>
                            <li>Purple Dye, Gray Dye, White Dye, etc</li>
                        </ul>
                    </li>
                    <li>
                        Similar Materials:
                        <ul>
                            <li>Oak Planks, Bamboo Planks, Crimson Planks, etc</li>
                            <li>
                                Waxed Block of Copper, Waxed Cut Copper, Waxed Weathered
                                Chiseled Copper, etc
                            </li>
                        </ul>
                    </li>
                </ul>
                <p>
                    <b>See in the Knowledge Book.</b>
                </p>
                <div id="gameplayContent">
                    <article id="gameplayGuessing">
                        <h3>Guessing Rules</h3>
                        <ul>
                            <li>You can only guess an existing item's recipe</li>
                            <li>
                                You can only guess a recipe once (but some items have more
                                than one recipe)
                            </li>
                        </ul>
                    </article>
                    <article id="outcome">
                        <h3>Outcome</h3>
                        <p>
                            After you guess, you'll find out how many materials were correct
                            in the recipe, with three types of indications:
                        </p>
                        <ul>
                            <li>
                                <b className="indicator" id="redIndicator">Red</b>: The materials marked in red are not in the recipe.
                            </li>
                            <li>
                                <b className="indicator" id="yellowIndicator">Yellow</b>: The materials marked in yellow are in the recipe but in the wrong place.
                            </li>
                            <li>
                                <b className="indicator" id="greenIndicator">Green</b>: The materials marked in green are in the recipe and in the correct place.
                            </li>
                            (Empty slots are not marked!)
                        </ul>
                        <p>
                            <b>Important:</b> For best results, feedback is enhanced to make
                            the game easier, so you may experience "<b>recipe sliding</b>"
                            during the game.
                        </p>
                        <p>
                            <b>Recipe sliding</b>: When the size of an item's crafting
                            recipe is smaller than 3x3, it can be placed in several
                            positions on the crafting table. For example: Stone Button, Iron
                            Sword, Crafting Table, etc.
                        </p>
                    </article>
                </div>
            </section>
            <section id="gamemodesGuide">
                <h2>Gamemodes</h2>
                <article id="classicMode">
                    <h3>Classic</h3>
                    <div>Rules: </div>
                    <ul>
                        <li>Crafting Table size: 3x3</li>
                        <li>Recipes: All except those made of 1 piece of material or one type of material</li>
                        <li>Inventory: Every</li>
                        <li>Hints: 4 (1 for every 5th guess)</li>
                        <li>Knowledge Book: Allowed</li>
                        <li>Play Limit: Unlimited</li>
                    </ul>
                </article>
                <article id="tutorialMode">
                    <h3>Tutorial</h3>
                    <div>Based on: Classic Mode</div>
                    <div>Rule changes: </div>
                    <ul>
                        <li>Recipes: Scripted</li>
                        <li>Inventory: Scripted</li>
                    </ul>
                </article>
                <article id="dailyMode">
                    <h3>Daily</h3>
                    <div>Based on: Classic Mode</div>
                    <div>Rule changes: </div>
                    <ul>
                        <li>Play Limit: 1 per day</li>
                    </ul>
                </article>
                <article id="allInOneMode">
                    <h3>All in One</h3>
                    <div>Based on: Classic Mode</div>
                    <div>Rule changes: </div>
                    <ul>
                        <li>Recipes: All</li>
                    </ul>
                </article>
                <article id="pocketMode">
                    <h3>Pocket</h3>
                    <div>Based on: All in One Mode</div>
                    <div>Rule changes: </div>
                    <ul>
                        <li>Crafting Table size: 2x2</li>
                        <li>Recipes: Which fit into a 2x2 grid</li>
                    </ul>
                </article>
                <article id="resourceMode">
                    <h3>Resource</h3>
                    <div>Based on: Classic</div>
                    <div>Rule changes: </div>
                    <ul>
                        <li>Inventory: Random (20-28 Pcs)</li>
                    </ul>
                </article>
                <article id="hardcoreMode">
                    <h3>Hardcore</h3>
                    <div>Based on: Classic</div>
                    <div>Rule changes: </div>
                    <ul>
                        <li>Hints: 0</li>
                        <li>Knowledge Book: Not Allowed</li>
                        <li>HP: 20</li>
                    </ul>
                </article>
            </section>
        </main>
    </div>
}