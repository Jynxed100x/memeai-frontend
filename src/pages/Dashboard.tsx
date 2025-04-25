import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Clock,
  User,
  Wallet,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  CopyCheck,
  RefreshCw,
} from "lucide-react";
import { formatDateFromTimestamp, truncateWallet } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface UserSubscription {
  plan: string;
  joined_at: number;
  telegram_id: string;
  wallet: string;
}

const Dashboard = () => {
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  const fetchSubscription = async () => {
    const telegramId = localStorage.getItem("telegram_id");
    if (!telegramId) return;
  
    setLoading(true);
    try {
      const docRef = doc(db, "users", telegramId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const fixedData = {
          ...data,
          joined_at: data.joined_at?.toMillis?.() || Date.now(),  // Convert Firestore timestamp
        };
        setSubscription(fixedData as UserSubscription);
      } else {
        setSubscription(null);
      }
    } catch (error) {
      console.error("Error fetching user subscription:", error);
      setSubscription(null);
    }
    setLoading(false);
  };
  

  useEffect(() => {
    fetchSubscription();
  }, []);

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: message,
    });
  };

  const refreshSubscription = () => {
    fetchSubscription();
    toast({
      title: "Subscription refreshed",
      description: "Your subscription details have been updated",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg font-medium">
        Loading...
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="min-h-screen flex justify-center items-center text-center text-lg font-medium">
        No active subscription found.
      </div>
    );
  }

  const isLifetime = subscription.plan === "lifetime" || subscription.plan === "Lifetime";
  const startDate = subscription.joined_at;
  const expiryDate = isLifetime
    ? null
    : startDate + 30 * 24 * 60 * 60 * 1000;
  const daysRemaining = isLifetime
    ? null
    : Math.ceil((expiryDate! - Date.now()) / (1000 * 60 * 60 * 24));
  const status = isLifetime || (expiryDate && Date.now() < expiryDate) ? "Active" : "Expired";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 py-10">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground mb-8">
            Manage your Memecoin AI God-Mode subscription
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Subscription Details</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={refreshSubscription}
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span className="ml-2">Refresh</span>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-muted-foreground text-sm mb-1">
                      Subscription Plan
                    </div>
                    <div className="font-semibold flex items-center">
                      {isLifetime ? "Lifetime Access" : "30 Days Access"}
                      {isLifetime && (
                        <ShieldCheck className="h-4 w-4 text-crypto-green ml-2" />
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="text-muted-foreground text-sm mb-1">Status</div>
                    <div
                      className={`font-semibold ${
                        status === "Active" ? "text-crypto-green" : "text-crypto-red"
                      }`}
                    >
                      {status}
                    </div>
                  </div>

                  <div>
                    <div className="text-muted-foreground text-sm mb-1">Start Date</div>
                    <div className="font-semibold">
                      {formatDateFromTimestamp(startDate)}
                    </div>
                  </div>

                  <div>
                    <div className="text-muted-foreground text-sm mb-1">
                      {isLifetime ? "Valid Until" : "Expiry Date"}
                    </div>
                    <div className="font-semibold">
                      {isLifetime
                        ? "Forever"
                        : formatDateFromTimestamp(expiryDate!)}
                    </div>
                  </div>

                  <div>
                    <div className="text-muted-foreground text-sm mb-1">
                      Payment Wallet
                    </div>
                    <div className="font-semibold flex items-center">
                      <span className="font-mono">
                        {truncateWallet(subscription.wallet)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 ml-2"
                        onClick={() =>
                          copyToClipboard(subscription.wallet, "Wallet address copied")
                        }
                      >
                        <CopyCheck className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <div className="text-muted-foreground text-sm mb-1">
                      Linked Telegram ID
                    </div>
                    <div className="font-semibold flex items-center">
                      <span>{subscription.telegram_id}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 ml-2"
                        onClick={() =>
                          copyToClipboard(
                            subscription.telegram_id,
                            "Telegram ID copied"
                          )
                        }
                      >
                        <CopyCheck className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                {daysRemaining && daysRemaining > 0 && (
                  <div className="mt-6 p-4 rounded-lg bg-crypto-purple/10 flex items-center">
                    <Clock className="h-5 w-5 text-crypto-purple mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">Time Remaining</div>
                      <div className="text-sm">
                        {daysRemaining} {daysRemaining === 1 ? "day" : "days"} left on your
                        subscription
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="glass-card rounded-xl p-6">
                <h2 className="text-xl font-bold mb-6">Bot Commands</h2>
                <div className="space-y-4">
                  {["/start", "/status", "/payment", "/help", "Paste wallet address"].map(
                    (cmd) => (
                      <div
                        key={cmd}
                        className="bg-crypto-darker p-3 rounded-md"
                      >
                        <div className="font-mono font-semibold mb-1">{cmd}</div>
                        <div className="text-sm text-muted-foreground">
                          {cmd === "/start"
                            ? "Start the bot and see welcome message"
                            : cmd === "/status"
                            ? "Check your current subscription status"
                            : cmd === "/payment"
                            ? "Get payment instructions for subscription renewal"
                            : cmd === "/help"
                            ? "Access help menu and support contact"
                            : "Check deployer wallet and get detailed analysis"}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="glass-card rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <User className="mr-2 h-4 w-4" /> Account Settings
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Wallet className="mr-2 h-4 w-4" /> Manage Payment
                  </Button>
                  {!isLifetime && (
                    <Button className="w-full justify-start bg-gradient-to-r from-crypto-purple to-crypto-blue hover:opacity-90">
                      <ShieldCheck className="mr-2 h-4 w-4" /> Upgrade to Lifetime
                    </Button>
                  )}
                </div>
              </div>

              <div className="glass-card rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4">Telegram Bot</h2>
                <p className="text-muted-foreground text-sm mb-4">
                  Access the Memecoin AI God-Mode bot directly in Telegram
                </p>
                <Button className="w-full" variant="outline">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open in Telegram
                </Button>
                <div className="mt-4 p-3 rounded-lg bg-crypto-red/10">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-crypto-red" />
                    <h3 className="font-medium">Important Note</h3>
                  </div>
                  <p className="text-xs mt-1 text-muted-foreground">
                    Never share your wallet seed phrase with anyone. The official bot will
                    never ask for your private keys.
                  </p>
                </div>
              </div>

              <div className="glass-card rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4">Need Help?</h2>
                <p className="text-muted-foreground text-sm mb-4">
                  Contact our support team for assistance with your subscription
                </p>
                <Button className="w-full">Contact Support</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
