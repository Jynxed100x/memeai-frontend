import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { fetchSolanaPrice } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { QrCodePayment } from "@/components/QrCodePayment";

const WALLET_ADDRESS = "Cxv1mLtQQjvuXHKYpWojovRd3pbQ9nnQfjdNh9VKJhNV";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const queryParams = new URLSearchParams(location.search);
  const plan = queryParams.get("plan") || "30d";

  const [solPrice, setSolPrice] = useState<number>(0);
  const [solAmount, setSolAmount] = useState<string>("0.00");
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [senderWallet, setSenderWallet] = useState<string>("");
  const [polling, setPolling] = useState<boolean>(false);
  const [timedOut, setTimedOut] = useState<boolean>(false);

  const prices = {
    "30d": 150,
    Lifetime: 600,
  };

  const planNames = {
    "30d": "30 Days Access",
    Lifetime: "Lifetime Access",
  };

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const price = await fetchSolanaPrice();
        setSolPrice(price);
        const usdAmount = prices[plan as keyof typeof prices];
        setSolAmount((usdAmount / price).toFixed(4));
      } catch (error) {
        console.error("Failed to fetch SOL price:", error);
      }
    };

    fetchPrice();
  }, [plan]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    const checkAccess = async () => {
      if (!username) return;
      const userRef = doc(db, "users", username);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        navigate("/dashboard");
      }
    };

    if (polling) {
      interval = setInterval(checkAccess, 5000);
      timeout = setTimeout(() => {
        setPolling(false);
        setTimedOut(true);
      }, 2 * 60 * 1000);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [polling, username, navigate]);

  const handleSubmit = async () => {
    if (!username || !senderWallet) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const sanitizedUsername = username.replace("@", "").toLowerCase();

    setLoading(true);
    setTimedOut(false);

    try {
      await setDoc(doc(db, "pending_wallets", senderWallet), {
        username: sanitizedUsername,
        wallet: senderWallet,
        plan: plan,
        amount: parseFloat(solAmount), // ✅ saving exact SOL amount
        timestamp: new Date(),
      });

      localStorage.setItem("username", sanitizedUsername);
      setPolling(true);
    } catch (error) {
      console.error("Error writing to Firestore:", error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-sm mb-4 text-muted-foreground hover:underline"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Pricing
      </button>

      <h1 className="text-3xl font-bold mb-2">{planNames[plan]}</h1>
      <p className="text-muted-foreground mb-6">
        Complete your payment to get access to the Memecoin AI God-Mode bot.
      </p>

      <Tabs defaultValue="qr">
        <TabsList className="mb-6">
          <TabsTrigger value="qr">QR Code</TabsTrigger>
          <TabsTrigger value="manual">Manual Payment</TabsTrigger>
        </TabsList>

        <TabsContent value="qr">
          <QrCodePayment
            amount={solAmount}
            walletAddress={WALLET_ADDRESS}
            onVerifyPayment={() => {}}
            loading={false}
          />
        </TabsContent>

        <TabsContent value="manual">
          <div className="bg-muted rounded-md p-4 text-sm mb-4 font-mono break-all">
            {WALLET_ADDRESS}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mb-4">
        <Label>Sender Wallet Address</Label>
        <Input
          type="text"
          placeholder="Your wallet used to send SOL"
          value={senderWallet}
          onChange={(e) => setSenderWallet(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <Label>Your Telegram Username</Label>
        <Input
          type="text"
          placeholder="example: shade_crypto"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <Button onClick={handleSubmit} disabled={loading || polling || solPrice === 0}>
        {loading ? "Submitting..." : polling ? "Checking payment..." : "I've Sent the SOL"}
      </Button>

      {polling && (
        <p className="mt-4 text-sm text-muted-foreground">
          Checking payment...
        </p>
      )}

      {timedOut && (
        <p className="mt-2 text-sm text-red-500">
          Still pending? Contact support.
        </p>
      )}

      <div className="mt-6 text-muted-foreground text-sm">
        <p><strong>Plan:</strong> {planNames[plan]}</p>
        <p><strong>Price (USD):</strong> ${prices[plan as keyof typeof prices]}</p>
        <p><strong>SOL Price:</strong> {solPrice ? `$${solPrice}` : "Loading..."}</p>
      </div>
    </div>
  );
};

export default Payment;
