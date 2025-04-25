
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PricingCard } from "@/components/PricingCard";
import { fetchSolanaPrice } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const [solPrice, setSolPrice] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getSolPrice = async () => {
      const price = await fetchSolanaPrice();
      setSolPrice(price);
    };
    getSolPrice();
  }, []);

  const handleSelectPlan = (plan: string) => {
    navigate(`/payment?plan=${plan}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Pricing Plans</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that's right for you
              </p>
              {solPrice > 0 && (
                <div className="inline-block mt-4 px-4 py-1 rounded-full bg-crypto-purple/10 border border-crypto-purple/20">
                  <p className="text-sm font-medium text-crypto-purple">
                    Current SOL Price: ${solPrice.toFixed(2)}
                  </p>
                </div>
              )}
            </div>
            
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <PricingCard 
                title="30 Days Access"
                price={150}
                solPrice={solPrice}
                description="Perfect for traders looking to try the system"
                features={[
                  "Real-time memecoin detection",
                  "Full access to all bot commands",
                  "AI risk assessment for each coin",
                  "Deployment wallet analysis",
                  "30 days of unlimited usage"
                ]}
                onSelect={() => handleSelectPlan("30d")}
              />
              
              <PricingCard 
                title="Lifetime Access"
                price={600}
                solPrice={solPrice}
                description="Best value for serious traders"
                features={[
                  "Everything in 30 Days plan",
                  "Never pay again - lifetime access",
                  "Priority support via Telegram",
                  "Early access to new features",
                  "Access to historical data API"
                ]}
                onSelect={() => handleSelectPlan("lifetime")}
                popular
              />
            </div>
            
            <div className="mt-16 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold mb-4 text-center">Frequently Asked Questions</h3>
              
              <div className="glass-card rounded-xl p-6 mb-4">
                <h4 className="font-bold mb-2">How do I access the bot after payment?</h4>
                <p className="text-muted-foreground">
                  Once your payment is verified, you'll receive instructions to access the Telegram bot. 
                  Simply enter your Telegram ID and the system will automatically grant you access.
                </p>
              </div>
              
              <div className="glass-card rounded-xl p-6 mb-4">
                <h4 className="font-bold mb-2">What happens if SOL price changes during payment?</h4>
                <p className="text-muted-foreground">
                  The SOL amount is calculated at the time of checkout using real-time CoinGecko API data. 
                  A small buffer time window is provided to account for price fluctuations.
                </p>
              </div>
              
              <div className="glass-card rounded-xl p-6 mb-4">
                <h4 className="font-bold mb-2">Can I upgrade from 30 Days to Lifetime later?</h4>
                <p className="text-muted-foreground">
                  Yes! If you already have a 30-day subscription, you can upgrade to lifetime access 
                  by paying the difference. Contact support through the bot for assistance.
                </p>
              </div>
              
              <div className="glass-card rounded-xl p-6">
                <h4 className="font-bold mb-2">Is there a refund policy?</h4>
                <p className="text-muted-foreground">
                  Due to the digital nature of this product and immediate access granted after payment, 
                  refunds are not available. Please contact support for any issues with the service.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Pricing;
