/**
 * Interface for the `BeforeInstallPromptEvent`.
 * 
 * Represents the event fired before a web app install prompt is shown.
 */
export interface BeforeInstallPromptEvent extends Event {
    /**
     * Prompts the user to install the web app.
     * 
     * @returns {Promise<void>} A promise that resolves when the prompt is shown.
     */
    prompt: () => Promise<void>;

    /**
     * A promise that resolves with the user's choice.
     * 
     * @returns {Promise<{ outcome: 'accepted' | 'dismissed' }>} The user's choice.
     */
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}