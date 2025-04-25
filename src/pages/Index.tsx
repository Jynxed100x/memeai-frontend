
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Zap, Shield, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { fetchSolanaPrice } from "@/lib/utils";

const Index = () => {
  const [solPrice, setSolPrice] = useState<number>(0);

  useEffect(() => {
    const getSolPrice = async () => {
      const price = await fetchSolanaPrice();
      setSolPrice(price);
    };
    getSolPrice();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-crypto-darker bg-grid"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
          
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block mb-4 px-4 py-1 rounded-full bg-crypto-purple/10 border border-crypto-purple/20">
                <p className="text-sm font-medium text-crypto-purple">
                  Powered by Solana Blockchain | SOL: ${solPrice.toFixed(2)}
                </p>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 glow-text">
                Memecoin <span className="gradient-text">AI God-Mode</span> Bot
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                The ultimate Solana memecoin detector that helps traders catch high-potential
                launches in real time using advanced AI filters and on-chain analysis.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/pricing">
                  <Button className="text-lg px-8 py-6 bg-gradient-to-r from-crypto-purple to-crypto-blue hover:opacity-90">
                    Get Access Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="#features">
                  <Button variant="outline" className="text-lg px-8 py-6">
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
          </div>
          
          {/* Floating coins animation */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
            <div className="relative h-48">
              <div className="absolute left-10 bottom-10 h-12 w-12 rounded-full bg-crypto-purple opacity-60 animate-float" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute left-1/4 bottom-16 h-10 w-10 rounded-full bg-crypto-green opacity-60 animate-float" style={{ animationDelay: '1.7s' }}></div>
              <div className="absolute left-1/3 bottom-4 h-14 w-14 rounded-full bg-crypto-blue opacity-60 animate-float" style={{ animationDelay: '0.2s' }}></div>
              <div className="absolute left-1/2 bottom-20 h-8 w-8 rounded-full bg-crypto-orange opacity-60 animate-float" style={{ animationDelay: '1.1s' }}></div>
              <div className="absolute left-2/3 bottom-8 h-16 w-16 rounded-full bg-crypto-red opacity-60 animate-float" style={{ animationDelay: '0.8s' }}></div>
              <div className="absolute left-3/4 bottom-14 h-10 w-10 rounded-full bg-crypto-purple opacity-60 animate-float" style={{ animationDelay: '1.4s' }}></div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our Telegram bot combines AI and blockchain analysis to find early-stage memecoin gems.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-6 rounded-xl">
                <div className="h-12 w-12 rounded-full bg-crypto-purple/20 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-crypto-purple" />
                </div>
                <h3 className="text-xl font-bold mb-2">Real-Time Detection</h3>
                <p className="text-muted-foreground">
                  Instant alerts for new memecoin launches on Solana, often within seconds of deployment.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <div className="h-12 w-12 rounded-full bg-crypto-green/20 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-crypto-green" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI Analysis</h3>
                <p className="text-muted-foreground">
                  Advanced algorithms analyze tokenomics, liquidity, and deployer wallet history.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <div className="h-12 w-12 rounded-full bg-crypto-blue/20 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-crypto-blue" />
                </div>
                <h3 className="text-xl font-bold mb-2">Risk Assessment</h3>
                <p className="text-muted-foreground">
                  Detailed risk scores and potential red flags to help you make informed decisions.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How to Use Section */}
        <section className="py-20 bg-crypto-darker">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Getting Started</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Access the bot in three simple steps
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Step connector line */}
                <div className="absolute left-7 top-8 w-0.5 h-[calc(100%-32px)] bg-gradient-to-b from-crypto-purple to-crypto-blue"></div>
                
                {/* Steps */}
                <div className="space-y-12">
                  <div className="flex">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-r from-crypto-purple to-crypto-blue flex-shrink-0 flex items-center justify-center z-10">
                      <span className="font-bold text-white">1</span>
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-bold mb-2">Choose Your Plan</h3>
                      <p className="text-muted-foreground">
                        Select either our 30-day access plan ($150 in SOL) or lifetime access ($600 in SOL).
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-r from-crypto-purple to-crypto-blue flex-shrink-0 flex items-center justify-center z-10">
                      <span className="font-bold text-white">2</span>
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-bold mb-2">Send SOL Payment</h3>
                      <p className="text-muted-foreground">
                        Send the exact SOL amount to our dedicated wallet address (automatically converted at current rates).
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-r from-crypto-purple to-crypto-blue flex-shrink-0 flex items-center justify-center z-10">
                      <span className="font-bold text-white">3</span>
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-bold mb-2">Access the Bot</h3>
                      <p className="text-muted-foreground">
                        Once your payment is verified, you'll receive instant access to the Telegram bot with all features unlocked.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-16 text-center">
                <Link to="/pricing">
                  <Button className="text-lg px-8 py-6 bg-gradient-to-r from-crypto-purple to-crypto-blue hover:opacity-90">
                    Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Live Stats Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Stats</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Real-time performance metrics of our memecoin detection system
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="glass-card p-6 rounded-xl text-center">
                <h3 className="text-muted-foreground text-sm mb-1">Active Users</h3>
                <p className="text-3xl font-bold gradient-text">2,458</p>
              </div>
              
              <div className="glass-card p-6 rounded-xl text-center">
                <h3 className="text-muted-foreground text-sm mb-1">Coins Detected</h3>
                <p className="text-3xl font-bold gradient-text">12,749</p>
              </div>
              
              <div className="glass-card p-6 rounded-xl text-center">
                <h3 className="text-muted-foreground text-sm mb-1">Avg. Detection Time</h3>
                <p className="text-3xl font-bold gradient-text">1.8s</p>
              </div>
              
              <div className="glass-card p-6 rounded-xl text-center">
                <h3 className="text-muted-foreground text-sm mb-1">Accuracy Rate</h3>
                <p className="text-3xl font-bold gradient-text">94.7%</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-crypto-purple to-crypto-blue opacity-10"></div>
          
          <div className="container relative z-10">
            <div className="glass-card rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to discover the next big memecoin?</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of traders using our AI-powered detection system to find early-stage opportunities.
              </p>
              
              <Link to="/pricing">
                <Button className="text-lg px-8 py-6 bg-gradient-to-r from-crypto-purple to-crypto-blue hover:opacity-90">
                  Get Access Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
