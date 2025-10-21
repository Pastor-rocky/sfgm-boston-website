import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown,
): Promise<any> {
  const authToken = localStorage.getItem('auth_token');
  
  const headers: Record<string, string> = {};
  if (data) headers["Content-Type"] = "application/json";
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
  
  console.log('API Request:', { method, url, hasToken: !!authToken, data });
  
  const res = await fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  // API response logged

  await throwIfResNotOk(res);
  return await res.json();
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const authToken = localStorage.getItem('auth_token');
    
    const res = await fetch(queryKey[0] as string, {
      headers: {
        'Content-Type': 'application/json',
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
      },
      credentials: "include",
    });

    // Query response logged

    if (unauthorizedBehavior === "returnNull" && (res.status === 401 || res.status === 500)) {
      // Returning null for error status
      return null;
    }

    await throwIfResNotOk(res);
    const data = await res.json();
    // Query data received
    return data;
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 0, // Allow cache invalidation
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
