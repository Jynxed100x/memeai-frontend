
import { Link } from "react-router-dom";
import { Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-crypto-purple to-crypto-green rounded-md flex items-center justify-center">
                <span className="font-bold text-white">M</span>
              </div>
              <span className="font-bold text-xl">MemeAI</span>
            </div>
            <p className="mt-2 text-muted-foreground text-sm">
              Solana-based memecoin detector that helps crypto traders catch high-potential launches in real time.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/docs" className="text-sm text-muted-foreground hover:text-foreground">Documentation</Link></li>
              <li><Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link></li>
              <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
                  <Twitter className="h-4 w-4" /> Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Memecoin AI God-Mode. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground">Terms</Link>
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
