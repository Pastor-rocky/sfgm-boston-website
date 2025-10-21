import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function DeanNavigation() {
  return (
    <div className="flex gap-2">
      <Link href="/dean">
        <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
          <i className="fas fa-home mr-2"></i>
          Home
        </Button>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <i className="fas fa-bars mr-2"></i>
            Navigation
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <Link href="/bible-school">
            <DropdownMenuItem className="cursor-pointer">
              <i className="fas fa-school mr-2"></i>
              Bible School
            </DropdownMenuItem>
          </Link>
          <Link href="/bible-study-tools">
            <DropdownMenuItem className="cursor-pointer">
              <i className="fas fa-bible mr-2"></i>
              Bible Study Tools
            </DropdownMenuItem>
          </Link>
          <Link href="/dean/communication">
            <DropdownMenuItem className="cursor-pointer">
              <i className="fas fa-bullhorn mr-2"></i>
              Communication Center
            </DropdownMenuItem>
          </Link>


          <Link href="/live-service">
            <DropdownMenuItem className="cursor-pointer">
              <i className="fas fa-broadcast-tower mr-2"></i>
              Live Service
            </DropdownMenuItem>
          </Link>
          <Link href="/personal-library">
            <DropdownMenuItem className="cursor-pointer">
              <i className="fas fa-book-reader mr-2"></i>
              My Library
            </DropdownMenuItem>
          </Link>

          
          <Link href="/textbook-catalog">
            <DropdownMenuItem className="cursor-pointer">
              <i className="fas fa-book mr-2"></i>
              SFGM Books
            </DropdownMenuItem>
          </Link>

          <Link href="/dean/student-management">
            <DropdownMenuItem className="cursor-pointer">
              <i className="fas fa-user-graduate mr-2"></i>
              Student Management
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <Link href="/logout">
            <DropdownMenuItem className="cursor-pointer text-red-600">
              <i className="fas fa-sign-out-alt mr-2"></i>
              Logout
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}