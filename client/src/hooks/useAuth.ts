import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import { User } from "@/types/user";

export function useAuth() {
  const authToken = localStorage.getItem('auth_token');
  
  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ["/api/auth/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes - reasonable balance between performance and freshness
    refetchOnWindowFocus: false,
    enabled: !!authToken, // Only run query if token exists
  });

  return {
    user: user || null,
    isLoading,
    isAuthenticated: !!user && !!authToken,
  };
}
