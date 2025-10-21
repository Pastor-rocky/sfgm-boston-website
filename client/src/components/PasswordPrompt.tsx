import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface PasswordPromptProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title: string;
  description: string;
  accessType?: 'admin' | 'dean' | 'instructor';
}

export default function PasswordPrompt({ 
  isOpen, 
  onClose, 
  onSuccess, 
  title, 
  description,
  accessType = 'admin'
}: PasswordPromptProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/elevated-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify({ 
          password, 
          accessType 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess();
        setPassword('');
        onClose();
      } else {
        if (response.status === 429) {
          setError(`Too many attempts. Please wait ${Math.ceil(data.retryAfter / 1000 / 60)} minutes before trying again.`);
        } else {
          setError(data.message || 'Incorrect access code. Please try again.');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError('Authentication failed. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-gray-800">
            {title}
          </DialogTitle>
        </DialogHeader>
        
        <Card className="border-0 shadow-none">
          <CardContent className="pt-6">
            <p className="text-gray-600 text-center mb-6">{description}</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Access Code</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter access code"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="text-center"
                  autoFocus
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isLoading}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading || !password}
                  className="flex-1"
                >
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Verifying...
                    </>
                  ) : (
                    'Access'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

// Utility function to check if user has elevated access
export const hasAdminAccess = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/auth/elevated-status', {
      credentials: 'include',
    });
    
    if (!response.ok) return false;
    
    const data = await response.json();
    return data.hasAccess || false;
  } catch (error) {
    console.error('Error checking admin access:', error);
    return false;
  }
};

// Clear elevated access
export const clearAdminAccess = async (): Promise<void> => {
  try {
    await fetch('/api/auth/revoke-elevated', {
      method: 'POST',
      credentials: 'include',
    });
  } catch (error) {
    console.error('Error clearing admin access:', error);
  }
};