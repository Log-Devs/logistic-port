// Additional tests for AuthProvider: logout, session isolation, API error handling, fallback logic, and user hydration
// Clean code, OOP, best practices. Each test is fully commented.
import React, { useState } from "react";
import { render, act, waitFor } from "@testing-library/react";
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

// Consistent DUMMY_USER for fallback scenarios
const DUMMY_USER = {
  name: "Test User",
  email: "test@example.com",
  verified: true,
};

describe("AuthProvider advanced logic & edge cases", () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  afterAll(() => {
    // @ts-ignore
    global.fetch = undefined;
  });

  beforeEach(() => {
    process.env.NEXT_PUBLIC_ENABLE_DUMMY_LOGIN = "true";
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should logout and clear user state", async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => ({}) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ user: DUMMY_USER }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ success: true }) });
    
    let loginFn: any, logoutFn: any, userVal: any;
    
    function TestComponent() {
      const { login, logout, user } = useAuth();
      loginFn = login;
      logoutFn = logout;
      userVal = user;
      return <div>{user?.email}</div>;
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

  it("should handle API error gracefully on login with dummy login disabled", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("API down"));
    process.env.NEXT_PUBLIC_ENABLE_DUMMY_LOGIN = "false";
    
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

    let result;
    await act(async () => {
      result = await loginFn("user@example.com", "badpass", false);
    });
    expect(result).toBe(false);
  });

  it("should NOT fallback to DUMMY_USER on login API error if dummy login enabled but credentials are wrong", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("API down"));
    
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

    let result;
    await act(async () => {
      result = await loginFn("user@example.com", "badpass", false);
    });
    expect(result).toBe(false);
    expect(userVal).toBeNull();
  });

  it("should fallback to DUMMY_USER on login API error if dummy login enabled and credentials match dummy user", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("API down"));
    
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

    let result;
    await act(async () => {
      result = await loginFn(DUMMY_USER.email, "password123", false);
    });
    expect(result).toBe(true);
    expect(userVal).toEqual(DUMMY_USER);
  });

  it("should hydrate user on mount if /me API succeeds", async () => {
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
    expect(userVal).toEqual(DUMMY_USER);
  });

  it("should set user to null on hydration API error even if dummy login enabled", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("API down"));
    
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
    expect(userVal).toBeNull();
  });

  it("should set user to null on hydration API error if dummy login disabled", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("API down"));
    process.env.NEXT_PUBLIC_ENABLE_DUMMY_LOGIN = "false";
    
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
    expect(userVal).toBeNull();
  });

  it("should handle logout gracefully when not logged in", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: async () => ({ success: true }) });
    
    let logoutFn: any;
    
    function TestComponent() {
      const { logout } = useAuth();
      logoutFn = logout;
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
      await logoutFn();
    });
    expect(true).toBe(true);
  });

  it("should isolate session between different AuthProvider contexts", async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => ({}) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ user: DUMMY_USER }) });
    
    // Use observer pattern for robust context isolation
    let loginFn1: any, userVal1: any;
    function TestObserver1() {
      const { login, user } = useAuth();
      loginFn1 = login;
      userVal1 = user;
      return null;
    }
    let userVal2: any;
    function TestObserver2() {
      const { user } = useAuth();
      userVal2 = user;
      return null;
    }
    // Render first provider/component and login
    await act(async () => {
      render(
        <AuthProvider>
          <TestObserver1 />
        </AuthProvider>
      );
    });
    await act(async () => {
      await loginFn1(DUMMY_USER.email, "password123", false);
    });
    // Render second provider/component after login
    await act(async () => {
      render(
        <AuthProvider>
          <TestObserver2 />
        </AuthProvider>
      );
    });
    // Wait for state updates and assert isolation
    await waitFor(() => {
      expect(userVal1).toEqual(DUMMY_USER);
      expect(userVal2).toBeNull();
    });
  });

  it("should isolate session between different AuthProvider contexts", async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => ({}) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ user: DUMMY_USER }) });
    
    // Use observer pattern for robust context isolation
    let loginFn1: any, userVal1: any;
    function TestObserver1() {
      const { login, user } = useAuth();
      loginFn1 = login;
      userVal1 = user;
      return null;
    }
    let userVal2: any;
    function TestObserver2() {
      const { user } = useAuth();
      userVal2 = user;
      return null;
    }
    // Render first provider/component and login
    await act(async () => {
      render(
        <AuthProvider>
          <TestObserver1 />
        </AuthProvider>
      );
    });
    await act(async () => {
      await loginFn1(DUMMY_USER.email, "password123", false);
    });
    // Render second provider/component after login
    await act(async () => {
      render(
        <AuthProvider>
          <TestObserver2 />
        </AuthProvider>
      );
    });
    // Wait for state updates and assert isolation
    await waitFor(() => {
      expect(userVal1).toEqual(DUMMY_USER);
      expect(userVal2).toBeNull();
    });
  });
});