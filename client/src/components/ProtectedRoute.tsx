import { useEffect, useState } from 'react';
import { hasAdminAccess } from './PasswordPrompt';
import PasswordPrompt from './PasswordPrompt';

interface ProtectedRouteProps {
  children: React.ReactNode;
  type: 'admin' | 'dean' | 'instructor';
}

export default function ProtectedRoute({ children, type }: ProtectedRouteProps) {
  const [hasAccess, setHasAccess] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const access = await hasAdminAccess();
        if (access) {
          setHasAccess(true);
          setIsChecking(false);
        } else {
          setShowPrompt(true);
          setIsChecking(false);
        }
      } catch (error) {
        console.error('Error checking access:', error);
        setShowPrompt(true);
        setIsChecking(false);
      }
    };

    checkAccess();
  }, []);

  const handlePasswordSuccess = () => {
    setHasAccess(true);
    setShowPrompt(false);
  };

  const handlePasswordClose = () => {
    // Redirect to home if they close the password prompt
    window.location.href = '/';
  };

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Checking access...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    const titles = {
      admin: 'Admin Access Required',
      dean: 'Dean Access Required',
      instructor: 'Instructor Access Required'
    };
    
    const descriptions = {
      admin: 'You need admin access to view this page. Please enter the access code.',
      dean: 'You need dean access to view this page. Please enter the access code.',
      instructor: 'You need instructor access to view this page. Please enter the access code.'
    };

    return (
      <PasswordPrompt
        isOpen={showPrompt}
        onClose={handlePasswordClose}
        onSuccess={handlePasswordSuccess}
        title={titles[type]}
        description={descriptions[type]}
        accessType={type}
      />
    );
  }

  return <>{children}</>;
}