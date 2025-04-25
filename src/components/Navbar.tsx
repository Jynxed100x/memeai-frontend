
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="w-full border-b border-border py-4">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gradient-to-br from-crypto-purple to-crypto-green rounded-md flex items-center justify-center">
            <span className="font-bold text-white">M</span>
          </div>
          <span className="font-bold text-xl">MemeAI</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Link to="/pricing">
            <Button className="bg-gradient-to-r from-crypto-purple to-crypto-blue text-white hover:opacity-90">
              Get Access
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
