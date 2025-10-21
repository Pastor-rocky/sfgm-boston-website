import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import sfgmLogo from "@/assets/sfgm-logo-new-blue.png";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Navigation() {
  const [location] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);

  const publicLinks = [
    { href: "/daily-sharpening", label: "Daily Sharpening ☀️", icon: "fas fa-calendar-day" },
    { href: "/cross-carriers-blog", label: "Cross Carriers Blog ✝️", icon: "fas fa-blog" },
    { href: "/events", label: "View All Events 📅", icon: "fas fa-calendar-check" },
    { href: "/past-services", label: "Sunday Service 🎥", icon: "fas fa-video" },
    { href: "/genesis-to-revelation", label: "Midweek Service 🎥", icon: "fas fa-video" },
    { href: "/music", label: "Music 🎵", icon: "fas fa-music" },
    { href: "/contact", label: "Contact ✉️", icon: "fas fa-envelope" },
  ];

  const enrollmentLinks = [
    { href: "/bible-university", label: "SFGM Boston University 🎓", description: "Full degree programs" },
    { href: "/course-catalog", label: "Course Catalog 📚", description: "Browse all courses" },
    { href: "/sfgm-orlando", label: "SFGM Orlando Bible School 📖", description: "Bible study programs" },
  ];

  const privateExtraLinks = [
    { href: "/discussion-forum", label: "Study Circle 💬", icon: "fas fa-comments" },
  ];

  const navLinks = isAuthenticated ? [...publicLinks, ...privateExtraLinks] : publicLinks;

  // Direct access to dashboards with access codes
  const handleDashboardAccess = (type: 'admin' | 'dean' | 'instructor') => {
    const routes = {
      admin: '/admin',
      dean: '/dean',
      instructor: '/instructor'
    };
    
    window.location.href = routes[type];
  };

  return (
    <nav className="bg-white shadow-lg border-b-2 border-primary/20 sticky top-0 z-50 backdrop-blur-sm">
      <div className="mobile-container">
        <div className="mobile-nav min-h-[64px] md:h-16">
          {/* Logo Section */}
          <Link href="/" className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img 
                src={sfgmLogo} 
                alt="SFGM Boston Logo" 
                className="w-10 h-10 md:w-12 md:h-12 object-contain mr-2 md:mr-3"
              />
              <div>
                <h1 className="mobile-heading text-slate-900">SFGM Boston</h1>
                <p className="text-xs md:text-sm text-slate-600 hidden sm:block">Soldiers for God Ministry</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - Empty now, all links moved to dropdown */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {/* All links moved to dropdown menu */}
            </div>
          </div>

          {/* User Actions - Simplified */}
          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage 
                      src={user?.profileImageUrl} 
                      alt={`${user?.firstName || user?.username || 'Member'}'s profile`}
                    />
                    <AvatarFallback className="bg-blue-600 text-white text-sm font-semibold">
                      {(user?.firstName || user?.username || 'M').charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-primary font-medium">
                    Welcome, {user?.firstName || user?.username || 'Member'}!
                  </span>
                </div>
                <Link href="/dashboard">
                  <button className="text-primary font-medium hover:text-primary/80 transition-colors flex items-center">
                    <i className="fas fa-user-graduate mr-2"></i>Dashboard
                  </button>
                </Link>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <button className="text-primary font-medium hover:text-primary/80 transition-colors flex items-center">
                    <i className="fas fa-sign-in-alt mr-2"></i>Login
                  </button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <i className="fas fa-user-plus mr-2"></i>Register
                  </Button>
                </Link>
              </>
            )}

            {/* Quick Links Dropdown at the end */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-100 shadow-sm bg-white p-3 rounded-lg"
                >
                  <div className="flex flex-col space-y-1">
                    <div className="w-5 h-0.5 bg-slate-900 rounded-full"></div>
                    <div className="w-5 h-0.5 bg-slate-900 rounded-full"></div>
                    <div className="w-5 h-0.5 bg-slate-900 rounded-full"></div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-80 md:w-56 max-h-[75vh] overflow-y-auto z-[9999] bg-white border border-slate-200 shadow-xl rounded-lg mobile-dropdown-menu"
                side="bottom"
                sideOffset={4}
                avoidCollisions={true}
                collisionPadding={4}
              >
                {/* Main Navigation Links */}
                {navLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href} className="cursor-pointer">
                      <i className={`${link.icon} mr-2`}></i>
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}

                {/* Enrollment Dropdown */}
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="cursor-pointer">
                    <i className="fas fa-graduation-cap mr-2 text-green-600"></i>
                    Enroll in Courses
                    <i className="fas fa-chevron-right ml-auto"></i>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {enrollmentLinks.map((link) => (
                      <DropdownMenuItem key={link.href} asChild>
                        <Link href={link.href} className="cursor-pointer">
                          <div>
                            <div className="font-medium">{link.label}</div>
                            <div className="text-xs text-gray-500">{link.description}</div>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                {isAuthenticated && (
                  <>
                    <DropdownMenuSeparator />
                    {/* Student Dashboard */}
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer text-blue-700 font-medium">
                        <i className="fas fa-user-graduate mr-2 text-blue-700"></i>
                        Student Dashboard 🎓
                      </Link>
                    </DropdownMenuItem>

                    {/* Personal Library */}
                    <DropdownMenuItem asChild>
                      <Link href="/my-personal-library" className="cursor-pointer text-blue-700 font-medium">
                        <i className="fas fa-book-reader mr-2 text-blue-700"></i>
                        My Library 📚
                      </Link>
                    </DropdownMenuItem>

                    {/* Protected Portals */}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/logout" className="cursor-pointer">
                        <i className="fas fa-sign-out-alt mr-2 text-red-600"></i>
                        Logout
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-100 shadow-sm bg-white p-3 rounded-lg"
                >
                  <div className="flex flex-col space-y-1">
                    <div className="w-5 h-0.5 bg-slate-900 rounded-full"></div>
                    <div className="w-5 h-0.5 bg-slate-900 rounded-full"></div>
                    <div className="w-5 h-0.5 bg-slate-900 rounded-full"></div>
                  </div>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-2 mt-8">
                  {/* Mobile Navigation Links */}
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center p-2 rounded-lg transition-colors ${
                        location === link.href
                          ? "bg-primary text-white"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <i className={`${link.icon} mr-3`}></i>
                      {link.label}
                    </Link>
                  ))}

                  {/* Mobile Enrollment Section */}
                  <div className="border-t pt-4">
                    <div className="px-3 py-2 text-sm font-medium text-gray-700 mb-2">
                      <i className="fas fa-graduation-cap mr-2 text-green-600"></i>
                      Enroll in Courses
                    </div>
                    <div className="space-y-1">
                      {enrollmentLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="flex flex-col p-2 rounded-lg text-slate-600 hover:bg-slate-100"
                        >
                          <div className="font-medium text-sm">{link.label}</div>
                          <div className="text-xs text-gray-500">{link.description}</div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    {/* User Info and Dashboard or Login/Register */}
                    {isAuthenticated ? (
                      <>
                        <div className="px-3 py-2 text-sm text-gray-600 border-b flex items-center space-x-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage 
                              src={user?.profileImageUrl} 
                              alt={`${user?.firstName || user?.username || 'Member'}'s profile`}
                            />
                            <AvatarFallback className="bg-blue-600 text-white text-xs font-semibold">
                              {(user?.firstName || user?.username || 'M').charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span>Welcome, {user?.firstName || user?.username || 'Member'}!</span>
                        </div>
                        <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start text-blue-700 font-medium">
                            <i className="fas fa-user-graduate mr-2 text-blue-700"></i>Student Dashboard 🎓
                          </Button>
                        </Link>
                        <Link href="/my-personal-library" onClick={() => setIsOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start text-blue-700 font-medium">
                            <i className="fas fa-book-reader mr-2 text-blue-700"></i>My Library 📚
                          </Button>
                        </Link>
                        <Link href="/logout" onClick={() => setIsOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start text-red-600">
                            <i className="fas fa-sign-out-alt mr-2"></i>Logout
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start">
                            <i className="fas fa-sign-in-alt mr-2"></i>Login
                          </Button>
                        </Link>
                        <Link href="/register" onClick={() => setIsOpen(false)}>
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                            <i className="fas fa-user-plus mr-2"></i>Register
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

    </nav>
  );
}