import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Crown, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
  feature?: string;
  requiredPlan?: "paid" | "premium";
}

export default function UpgradeModal({
  open,
  onClose,
  feature = "this feature",
  requiredPlan = "paid",
}: UpgradeModalProps) {
  const navigate = useNavigate();
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md" data-ocid="upgrade.modal">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <Crown size={24} className="text-amber-500" />
            </div>
            <div>
              <DialogTitle>Upgrade Required</DialogTitle>
              <DialogDescription className="mt-0.5">
                {requiredPlan === "premium" ? "Premium" : "Pro"} plan needed
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="flex items-start gap-3 p-3 bg-muted rounded-lg mb-4">
          <Lock size={16} className="text-muted-foreground mt-0.5" />
          <p className="text-sm text-muted-foreground">
            Unlock <strong className="text-foreground">{feature}</strong> with
            the {requiredPlan === "premium" ? "Premium" : "Pro"} plan and get
            access to all premium templates, advanced AI features, and more.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            className="flex-1"
            onClick={() => {
              navigate("/pricing");
              onClose();
            }}
            data-ocid="upgrade.confirm_button"
          >
            View Plans
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            data-ocid="upgrade.cancel_button"
          >
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
