/**
 * Centralized API client for Dubai Estate Platform.
 * Supports server-side and client-side fetching with timeout,
 * strict response typing, error handling, and query serialization.
 */

import type { ApiResponse } from "@/types";

const DEFAULT_TIMEOUT_MS = 8000;

export function getApiBaseUrl(): string {
  if (typeof window === "undefined") {
    // Server-side
    return (
      process.env.API_BASE_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:5001/api/v1"
    );
  }
  // Client-side
  return (
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5001/api/v1"
  );
}

export interface FetchOptions extends RequestInit {
  timeoutMs?: number;
  params?: Record<string, string | number | boolean | (string | number)[] | undefined>;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

/**
 * Builds URLSearchParams safely handling array and primitive parameters.
 */
export function buildQueryString(
  params?: Record<string, string | number | boolean | (string | number)[] | undefined>
): string {
  if (!params) return "";
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;

    if (Array.isArray(value)) {
      for (const item of value) {
        if (item !== undefined && item !== null && item !== "") {
          searchParams.append(key, String(item));
        }
      }
    } else {
      searchParams.append(key, String(value));
    }
  }

  const qs = searchParams.toString();
  return qs ? `?${qs}` : "";
}

/**
 * Centralized request helper returning a typed ApiResponse<T>.
 */
export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, params, ...fetchInit } = options;
  const baseUrl = getApiBaseUrl();
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${normalizedEndpoint}${buildQueryString(params)}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...fetchInit,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...fetchInit.headers,
      },
    });

    clearTimeout(timeoutId);

    interface JsonPayload {
      success?: boolean;
      data?: unknown;
      error?: {
        code?: string;
        message?: string;
        fields?: Record<string, string>;
      };
      [key: string]: unknown;
    }

    const contentType = res.headers.get("content-type");
    let json: JsonPayload | null = null;
    if (contentType && contentType.includes("application/json")) {
      json = (await res.json()) as JsonPayload;
    }

    if (!res.ok) {
      const code = json?.error?.code ?? (res.status === 404 ? "NOT_FOUND" : "SERVER_ERROR");
      const message =
        json?.error?.message ??
        `Request failed with status ${res.status}: ${res.statusText}`;
      const fields = json?.error?.fields;

      return {
        success: false,
        error: {
          code,
          message,
          ...(fields ? { fields } : {}),
        },
      };
    }

    // Success response
    if (json && typeof json.success === "boolean") {
      return json as ApiResponse<T>;
    }

    return {
      success: true,
      data: json as T,
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);

    if (err instanceof Error) {
      if (err.name === "AbortError") {
        return {
          success: false,
          error: {
            code: "TIMEOUT",
            message: `Request timed out after ${timeoutMs}ms`,
          },
        };
      }
      return {
        success: false,
        error: {
          code: "NETWORK_ERROR",
          message: err.message || "Failed to connect to API server",
        },
      };
    }

    return {
      success: false,
      error: {
        code: "UNKNOWN_ERROR",
        message: "An unknown error occurred during API request",
      },
    };
  }
}
