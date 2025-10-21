import { useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";

export default function Logout() {
  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Clear local storage
        localStorage.clear();
        
        // Call logout API
        await fetch('/api/auth/logout', {
          method: 'POST',
          credentials: 'include'
        });
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        // Always redirect to home page after logout attempt
        window.location.href = '/';
      }
    };

    handleLogout();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-blue-900 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-2xl">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <i className="fas fa-sign-out-alt text-4xl text-blue-600 mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Logging Out</h2>
            <p className="text-gray-600">Please wait while we sign you out...</p>
          </div>
          
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}