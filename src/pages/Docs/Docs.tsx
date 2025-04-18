import bookTop from "../../assets/imgs/backgrounds/book_top.png"
import bookBottom from "../../assets/imgs/backgrounds/book_bottom.png"
import { Link, useLocation } from "react-router-dom"
import { SoundEffect } from "../../classes/Audio"
import { useEffect } from "react";
import { isTestSubdomain } from "../../functions/isTestSubdomain";

/**
 * Docs component to display the privacy policy and terms of use.
 * It also handles smooth scrolling to specific sections based on the URL hash.
 * 
 * @returns The Docs component.
 */
export function Docs() {
    const location = useLocation();

    useEffect(() => {
        /**
         * Scrolls to the element specified by the URL hash if it exists.
         */
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

    return <div id="docs">
        <img src={bookTop} alt="Book top" draggable={false} />
        <div id="docsContent">
            <Link to="/" id="backToMainArrow" onClick={() => { SoundEffect.play("click") }}></Link>
            <header>
                <h1>Documents</h1>
            </header>
            <main>
                {isTestSubdomain() && <section id="testVersionNotice">
                    <h2>Test Version Notice</h2>
                    <p>You are currently accessing a test version of Craftdle. This environment is intended for testing purposes only and may not function as expected.</p>
                    <ul>
                        <li>Data integrity is <strong>not guaranteed</strong>, and all stored information may be deleted at any time without prior notice.</li>
                        <li>The test version may contain <strong>bugs, unfinished features, or unstable mechanics</strong>.</li>
                        <li>Service availability is <strong>not ensured</strong>, and disruptions or downtime may occur.</li>
                    </ul>
                    <p>Use this version at your own risk. We <b>greatly appreciate</b> any bug reports or feedback you provide. If you encounter an issue, please let us know via email at <a href="mailto:guideianangelcraftdle@gmail.com">guideianangelcraftdle@gmail.com</a>.</p>
                </section>}
                <section id="privacyPolicy">
                    <h2>Privacy Policy</h2>
                    <ol>
                        <li>
                            <h3>Introduction</h3>
                            <p>The Guideian Angel team (hereinafter referred to as "we," "us," "our") is committed to protecting users' data. This document outlines how we collect, use, and protect users' personal data while using the Craftdle game.</p>
                            <p>This Privacy Policy is governed by the laws of Hungary.</p>
                        </li>
                        <li>
                            <h3>What Data Do We Collect?</h3>
                            <p>Users may provide personal data while using the game, including:</p>
                            <ul>
                                <li>Email address</li>
                                <li>Password</li>
                                <li>Username</li>
                            </ul>
                            <p>These data are necessary to ensure the full functionality of the game.</p>
                        </li>
                        <li>
                            <h3>Why Do We Collect These Data?</h3>
                            <p>The data is used for the following purposes:</p>
                            <ul>
                                <li>Creating and managing user accounts</li>
                                <li>Providing extra features and collectible items</li>
                                <li>Ensuring game saves and continuity</li>
                                <li>Implementing security and anti-abuse measures</li>
                                <li>Statistical analysis and game development</li>
                            </ul>
                        </li>
                        <li>
                            <h3>How Do We Store and Protect the Data?</h3>
                            <p>The data is stored in a secure database and protected with appropriate technical and organizational measures to prevent unauthorized access, modification, or deletion.</p>
                            <p><b>Data is retained until the application shutdown</b>, but certain data may be deleted earlier, such as in cases of inactive accounts or rule violations.</p>
                        </li>
                        <li>
                            <h3>Third Parties and Data Sharing</h3>
                            <p>We do not share user data with third parties unless legally required. Data is used solely for statistical and development purposes.</p>
                        </li>
                        <li>
                            <h3>Cookies and Tracking</h3>
                            <p>The game does not use tracking cookies or collect personal data for third parties. Some technical cookies may be required for game functionality, but these do not identify users.</p>
                        </li>
                        <li>
                            <h3>User Rights</h3>
                            <p>Users have the right to:</p>
                            <ul>
                                <li>Change their password</li>
                                <li>View and update their personal data</li>
                                <li>Request data deletion</li>
                            </ul>
                            <p>To request data deletion, users should <b>contact the support team.</b></p>
                        </li>
                        <li>
                            <h3>Limitation of Liability</h3>
                            <p>We are not responsible for:</p>
                            <ul>
                                <li>Server downtime or data loss</li>
                                <li>Game bugs or programming issues</li>
                                <li>Manipulated frontend</li>
                                <li>Unauthorized access by third parties</li>
                            </ul>
                        </li>
                        <li>
                            <h3>Modifications and Notifications</h3>
                            <p>This Privacy Policy may be updated periodically. Users will be notified via email about any changes. Users accept the new document by acknowledging the modifications.</p>
                        </li>
                    </ol>
                </section>
                <section id="termsOfUse">
                    <h2>Terms of Use</h2>
                    <ol>
                        <li>
                            <h3>Introduction</h3>
                            <p>Before using the Craftdle game, please read and accept the following Terms of Use. By using the game, you agree to these terms.</p>
                        </li>
                        <li>
                            <h3>Use of the Service</h3>
                            <p>While using Craftdle, users are prohibited from:</p>
                            <ul>
                                <li>Manipulating or modifying any part of the game</li>
                                <li>Engaging in any illegal activities related to the game</li>
                                <li>Harassing other users or violating their rights</li>
                            </ul>
                            <p>Guideian Angel reserves the right to suspend or restrict the service at any time.</p>
                        </li>
                        <li>
                            <h3>Account Creation and Security</h3>
                            <p>Users may create an account. By doing so, they are responsible for securing their data. The following information is required for account creation:</p>
                            <ul>
                                <li>Email address</li>
                                <li>Password</li>
                                <li>Username</li>
                            </ul>
                            <p>Users are responsible for keeping their password confidential. We do not take responsibility for unauthorized access to user accounts.</p>
                            <p>Guideian Angel reserves the right to suspend or delete accounts in case of violations.</p>
                        </li>
                        <li>
                            <h3>User Rights and Obligations</h3>
                            <p>Users have the right to:</p>
                            <ul>
                                <li>Use the game, including collectible items and extra features</li>
                                <li>Manage their account, including password changes</li>
                            </ul>
                            <p>Users must not violate game rules, manipulate features, or engage in illegal activities.</p>
                        </li>
                        <li>
                            <h3>In-Game Content</h3>
                            <p>The game name, code, design, and other original elements remain the property of the Guideian Angel team. Minecraft-related content (e.g., images, sounds, recipes) belongs to Minecraft. Users may not copy, modify, or sell these elements.</p>
                            <p>Users do not own in-game content, and the game operator may modify it at any time.</p>
                        </li>
                        <li>
                            <h3>Trading and Transactions</h3>
                            <p>Users are not allowed to trade, sell, or transfer in-game content to other users. In-game items cannot be exchanged for real money.</p>
                        </li>
                        <li>
                            <h3>Limitation of Liability</h3>
                            <p>The Guideian Angel team is not responsible for any direct or indirect damage resulting from the use of the game. Users use the game at their own risk and are not entitled to compensation in cases including:</p>
                            <ul>
                                <li>Server downtime</li>
                                <li>Data loss</li>
                                <li>Game bugs</li>
                                <li>Manipulated frontend</li>
                            </ul>
                        </li>
                        <li>
                            <h3>Modifications and Updates</h3>
                            <p>Guideian Angel reserves the right to modify or update the Terms of Use at any time. Users accept the new terms by continuing to use the game.</p>
                        </li>
                        <li>
                            <h3>Legal Compliance and Disputes</h3>
                            <p>These Terms of Use are governed by the laws of Hungary. In case of disputes, Hungarian courts have jurisdiction.</p>
                        </li>
                    </ol>
                </section>
            </main>
            <footer>
                <h2>Contact</h2>
                <p>If you have any questions regarding our data protection practices, please email us at <a href="mailto:guideianangelcraftdle@gmail.com">guideianangelcraftdle@gmail.com</a>.</p>
                <p>Thank you for visiting Craftdle!</p>
            </footer>
        </div>
        <img src={bookBottom} alt="Book bottom" draggable={false} />
    </div>
}