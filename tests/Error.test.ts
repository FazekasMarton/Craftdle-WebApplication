import { configureStore } from "@reduxjs/toolkit";
import errorReducer, { setError, resetError } from "../src/features/error/errorSlice";
import { RootState } from "../src/app/store";
import { describe, it, expect, beforeEach, vi } from "vitest";

// Mockoljuk az errorSlice akcióit
vi.mock("../features/error/errorSlice", async () => {
  const importOriginal = await import("../src/features/error/errorSlice");
  const actual = importOriginal;
  return {
    ...actual,
    setError: vi.fn(),
    resetError: vi.fn(),
  };
});

describe("Error slice", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    // Initialize the Redux store with the error reducer before each test.
    store = configureStore({
      reducer: {
        error: errorReducer,
      },
    });
  });

  it("should create an error state with default values", () => {
    // Test that the initial error state has default values.
    const state = store.getState() as RootState;
    expect(state.error.status).toBe(200);
    expect(state.error.name).toBe("OK");
    expect(state.error.message).toBe("Everything is working fine.");
  });

  it("should update error state when setError is dispatched", () => {
    // Test that the error state is updated correctly for a TypeError.
    const mockError = new TypeError("Mocked error");
    store.dispatch(setError(mockError.name));
    const state = store.getState() as RootState;
    expect(state.error.status).toBe(503);
    expect(state.error.name).toBe("Service Unavailable");
    expect(state.error.message).toBe(
      "Failed to connect to the server. Please try again later."
    );
  });

  it("should update error state for SyntaxError", () => {
    // Test that the error state is updated correctly for a SyntaxError.
    const mockError = new SyntaxError("Mocked SyntaxError");
    store.dispatch(setError(mockError.name));
    const state = store.getState() as RootState;
    expect(state.error.status).toBe(400);
    expect(state.error.name).toBe("Bad Request");
    expect(state.error.message).toBe(
      "There was an issue processing the server's response. Please try again later."
    );
  });

  it("should update error state for unknown errors", () => {
    // Test that the error state is updated correctly for an unknown error.
    const mockError = new Error("Mocked UnknownError");
    store.dispatch(setError(mockError.name));
    const state = store.getState() as RootState;
    expect(state.error.status).toBe(500);
    expect(state.error.name).toBe("Internal Server Error");
    expect(state.error.message).toBe(
      "Something went wrong on our end. Please try again later."
    );
  });

  it("should clear error state when resetError is dispatched", () => {
    // Test that the error state is reset to default values when resetError is dispatched.
    store.dispatch(setError(new TypeError().name));
    store.dispatch(resetError());
    const state = store.getState() as RootState;
    expect(state.error.status).toBe(200);
    expect(state.error.name).toBe("OK");
    expect(state.error.message).toBe("Everything is working fine.");
  });
});
