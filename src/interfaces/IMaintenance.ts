/**
 * Interface for maintenance information.
 */
export interface IMaintenance {
    started: boolean; // Indicates if maintenance has started.
    countdown: number | null; // Countdown timer for maintenance, or null if not applicable.
}