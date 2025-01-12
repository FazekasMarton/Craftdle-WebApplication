import bookTop from "../../assets/imgs/backgrounds/book_top.png"
import bookBottom from "../../assets/imgs/backgrounds/book_bottom.png"
import { Link, useLocation } from "react-router-dom"
import { SoundEffect } from "../../classes/Audio"
import { useEffect } from "react";

export function Docs() {
    const location = useLocation();

    useEffect(() => {
      if (location.hash) {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, [location]);

    return <div id="docs">
        <img src={bookTop} alt="Book top" draggable={false}/>
        <main>
            <Link to="/" id="backToMainArrow" onClick={() => {SoundEffect.play("click")}}></Link>
            <section>
                <h1>Privacy Policy</h1>
                <ol>
                    <li>
                        <h2>Introduction</h2>
                        <p>The Guideian Angel team (hereinafter referred to as "we," "us," "our") is committed to protecting users' data. This document outlines how we collect, use, and protect users' personal data while using the Craftdle game.</p>
                        <p>This Privacy Policy is governed by the laws of Hungary.</p>
                    </li>
                    <li>
                        <h2>What Data Do We Collect?</h2>
                        <p>Users may provide personal data while using the game, including:</p>
                        <ul>
                            <li>Email address</li>
                            <li>Password</li>
                            <li>Username</li>
                        </ul>
                        <p>These data are necessary to ensure the full functionality of the game.</p>
                    </li>
                    <li>
                        <h2>Why Do We Collect These Data?</h2>
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
                        <h2>How Do We Store and Protect the Data?</h2>
                        <p>The data is stored in a secure database and protected with appropriate technical and organizational measures to prevent unauthorized access, modification, or deletion.</p>
                        <p><b>Data is retained until the application shutdown</b>, but certain data may be deleted earlier, such as in cases of inactive accounts or rule violations.</p>
                    </li>
                    <li>
                        <h2>Third Parties and Data Sharing</h2>
                        <p>We do not share user data with third parties unless legally required. Data is used solely for statistical and development purposes.</p>
                    </li>
                    <li>
                        <h2>Cookies and Tracking</h2>
                        <p>The game does not use tracking cookies or collect personal data for third parties. Some technical cookies may be required for game functionality, but these do not identify users.</p>
                    </li>
                    <li>
                        <h2>User Rights</h2>
                        <p>Users have the right to:</p>
                        <ul>
                            <li>Change their password</li>
                            <li>View and update their personal data</li>
                            <li>Request data deletion</li>
                        </ul>
                        <p>To request data deletion, users should <b>contact the support team.</b></p>
                    </li>
                    <li>
                        <h2>Limitation of Liability</h2>
                        <p>We are not responsible for:</p>
                        <ul>
                            <li>Server downtime or data loss</li>
                            <li>Game bugs or programming issues</li>
                            <li>Manipulated frontend</li>
                            <li>Unauthorized access by third parties</li>
                        </ul>
                    </li>
                    <li>
                        <h2>Modifications and Notifications</h2>
                        <p>This Privacy Policy may be updated periodically. Users will be notified via email about any changes. Users accept the new document by acknowledging the modifications.</p>
                    </li>
                </ol>
            </section>
            <section>
                <h1 id="termsOfUse">Terms of Use</h1>
                <ol>
                    <li>
                        <h2>Introduction</h2>
                        <p>Before using the Craftdle game, please read and accept the following Terms of Use. By using the game, you agree to these terms.</p>
                    </li>
                    <li>
                        <h2>Use of the Service</h2>
                        <p>While using Craftdle, users are prohibited from:</p>
                        <ul>
                            <li>Manipulating or modifying any part of the game</li>
                            <li>Engaging in any illegal activities related to the game</li>
                            <li>Harassing other users or violating their rights</li>
                        </ul>
                        <p>Guideian Angel reserves the right to suspend or restrict the service at any time.</p>
                    </li>
                    <li>
                        <h2>Account Creation and Security</h2>
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
                        <h2>User Rights and Obligations</h2>
                        <p>Users have the right to:</p>
                        <ul>
                            <li>Use the game, including collectible items and extra features</li>
                            <li>Manage their account, including password changes</li>
                        </ul>
                        <p>Users must not violate game rules, manipulate features, or engage in illegal activities.</p>
                    </li>
                    <li>
                        <h2>In-Game Content</h2>
                        <p>The game name, code, design, and other original elements remain the property of the Guideian Angel team. Minecraft-related content (e.g., images, sounds, recipes) belongs to Minecraft. Users may not copy, modify, or sell these elements.</p>
                        <p>Users do not own in-game content, and the game operator may modify it at any time.</p>
                    </li>
                    <li>
                        <h2>Trading and Transactions</h2>
                        <p>Users are not allowed to trade, sell, or transfer in-game content to other users. In-game items cannot be exchanged for real money.</p>
                    </li>
                    <li>
                        <h2>Limitation of Liability</h2>
                        <p>The Guideian Angel team is not responsible for any direct or indirect damage resulting from the use of the game. Users use the game at their own risk and are not entitled to compensation in cases including:</p>
                        <ul>
                            <li>Server downtime</li>
                            <li>Data loss</li>
                            <li>Game bugs</li>
                            <li>Manipulated frontend</li>
                        </ul>
                    </li>
                    <li>
                        <h2>Modifications and Updates</h2>
                        <p>Guideian Angel reserves the right to modify or update the Terms of Use at any time. Users accept the new terms by continuing to use the game.</p>
                    </li>
                    <li>
                        <h2>Legal Compliance and Disputes</h2>
                        <p>These Terms of Use are governed by the laws of Hungary. In case of disputes, Hungarian courts have jurisdiction.</p>
                    </li>
                </ol>
            </section>
            <section>
                <h1>Contact</h1>
                <p>If you have any questions regarding our data protection practices, please email us at guideianangelcraftdle@gmail.com</p>
                <p>Thank you for visiting Craftdle!</p>
            </section>
        </main>
        <img src={bookBottom} alt="Book bottom" draggable={false}/>
    </div>
}