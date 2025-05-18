// Unit tests for AuthProvider login logic with dummy fallback
// Clean code, OOP, and best-practice test patterns

import React from "react";
import { render, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "@/components/auth-context";

// Mock next/navigation's useRouter for all tests
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
    basePath: '',
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
  }),
}));

// Mock fetch for API calls
const originalFetch = global.fetch;

const DUMMY_USER = {
  name: "Test User",
  email: "test@example.com",
  verified: true,
};

describe("AuthProvider login logic", () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch = jest.fn();
    process.env.NEXT_PUBLIC_ENABLE_DUMMY_LOGIN = "true";
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  it("should login with real API response", async () => {
    // Mock API login and /me endpoints
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => ({}) }) // login
      .mockResolvedValueOnce({ ok: true, json: async () => ({ user: DUMMY_USER }) }); // /me

    let loginFn: any;
    function TestComponent() {
      const { login, user } = useAuth();
      loginFn = login;
      return <div>{user?.email}</div>;
    }

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    let result;
    await act(async () => {
      result = await loginFn(DUMMY_USER.email, "password123", false);
    });
    expect(result).toBe(true);
  });

  it("should fallback to dummy user only if flag is set and credentials match", async () => {
    // Simulate API failure
    (global.fetch as jest.Mock).mockRejectedValue(new Error("API down"));
    process.env.NEXT_PUBLIC_ENABLE_DUMMY_LOGIN = "true";

    let loginFn: any;
    function TestComponent() {
      const { login, user } = useAuth();
      loginFn = login;
      return <div>{user?.email}</div>;
    }

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    let result;
    await act(async () => {
      result = await loginFn(DUMMY_USER.email, "password123", false);
    });
    expect(result).toBe(true);
  });

  it("should not fallback to dummy user if flag is not set", async () => {
    // Simulate API failure
    (global.fetch as jest.Mock).mockRejectedValue(new Error("API down"));
    process.env.NEXT_PUBLIC_ENABLE_DUMMY_LOGIN = "false";

    let loginFn: any;
    function TestComponent() {
      const { login, user } = useAuth();
      loginFn = login;
      return <div>{user?.email}</div>;
    }

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    let result;
    await act(async () => {
      result = await loginFn(DUMMY_USER.email, "password123", false);
    });
    expect(result).toBe(false);
  });

  it("should not fallback to dummy user for wrong credentials", async () => {
    // Simulate API failure
    (global.fetch as jest.Mock).mockRejectedValue(new Error("API down"));
    process.env.NEXT_PUBLIC_ENABLE_DUMMY_LOGIN = "true";

    let loginFn: any;
    function TestComponent() {
      const { login, user } = useAuth();
      loginFn = login;
      return <div>{user?.email}</div>;
    }

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    let result;
    await act(async () => {
      result = await loginFn("wrong@example.com", "wrongpass", false);
    });
    expect(result).toBe(false);
  });
});
