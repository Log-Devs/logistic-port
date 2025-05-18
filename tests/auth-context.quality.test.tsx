// Additional quality and edge-case tests for AuthProvider
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

const DUMMY_USER = {
  name: "Test User",
  email: "test@example.com",
  verified: true,
};

describe("AuthProvider quality & edge cases", () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });
  afterAll(() => {
    // @ts-ignore
    global.fetch = undefined;
  });

  it("should not login if credentials are empty", async () => {
    let loginFn: any;
    function TestComponent() {
      const { login } = useAuth();
      loginFn = login;
      return null;
    }
    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });
    const result = await loginFn("", "", false);
    expect(result).toBe(false);
  });

  it("should reset loading and user on logout", async () => {
    let loginFn: any, logoutFn: any, userVal: any;
    function TestComponent() {
      const { login, logout, user } = useAuth();
      loginFn = login;
      logoutFn = logout;
      userVal = user;
      return null;
    }
    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });
    await act(async () => {
      await loginFn(DUMMY_USER.email, "password123", false);
    });
    expect(userVal).not.toBeNull();
    await act(async () => {
      await logoutFn();
    });
    expect(userVal).toBeNull();
  });

  it("hydrates user from /api/auth/me on mount", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: async () => ({ user: DUMMY_USER }) });
    let userVal: any;
    function TestComponent() {
      const { user } = useAuth();
      userVal = user;
      return null;
    }
    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });
    expect(userVal).not.toBeNull();
    expect(userVal.email).toBe(DUMMY_USER.email);
  });

  it("should only fallback to dummy user if flag is set", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("API down"));
    process.env.NEXT_PUBLIC_ENABLE_DUMMY_LOGIN = "false";
    let loginFn: any, userVal: any;
    function TestComponent() {
      const { login, user } = useAuth();
      loginFn = login;
      userVal = user;
      return null;
    }
    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });
    const result = await loginFn(DUMMY_USER.email, "password123", false);
    expect(result).toBe(false);
    expect(userVal).toBeNull();
  });
});
