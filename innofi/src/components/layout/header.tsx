"use client";
import { Settings } from "lucide-react";

import { useState } from "react";
import { Logo } from "@/components/logo";
import { WalletStatus } from "@/components/wallet/wallet-status";
import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit';
import Link from "next/link";
import { SettingsModal } from "@/components/settings-modal";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isVerified, setIsVerified] = useState(false); // Track verification state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSuccess = () => {
    console.log("Verification successful");
    setIsVerified(true); // Enable login button (WalletStatus) on success
  };

  const verifyProof = () => {
    console.log("Proof verified");
    setIsVerified(true); // Ensure state change after proof verification
  };

  return (
    <header className="container flex h-20 items-center justify-between">
      <Logo />

      <div className="flex items-center gap-3 duration-100 animate-in fade-in">
        <nav className="mr-2 hidden items-center gap-5 md:flex">
          <Link
            href="/"
            className="flex cursor-pointer items-center text-lg font-medium text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
          >
            Dashboard
          </Link>
          <Link
            href="/pools"
            className="flex cursor-pointer items-center text-lg font-medium text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
          >
            Pools
          </Link>
          <Link
            href="/marketplace"
            className="flex cursor-pointer items-center text-lg font-medium text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
          >
            Marketplace
          </Link>
          <Link
            href="/rating"
            className="flex cursor-pointer items-center text-lg font-medium text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
          >
            Credit Score
          </Link>
        </nav>
        <div className="flex items-center gap-5"></div>
        <br></br>
       
        <Button onClick={() => setIsModalOpen(true)} variant={"outline"} size="icon">
          <Settings className="size-5 group-disabled:opacity-30" strokeWidth={1.6} />
        </Button>
        <SettingsModal open={isModalOpen} onOpenChange={setIsModalOpen} />
        <br>
        </br>
        {/* World ID verification widget */}
        <IDKitWidget
          app_id="app_staging_dbd64d7f69e75659517228299eb17c71"
          action="test"
          verification_level={VerificationLevel.Device}
          handleVerify={verifyProof}
          onSuccess={onSuccess}
        >
          {({ open }) => (
            <button
              type="button"
              className="p-2 w-full bg-[#F56D91] text-white rounded-md hover:bg-[#d15677]"
              onClick={open}
            >
              Verify with World ID to Login
            </button>
          )}
        </IDKitWidget>

        {/* WalletStatus (acting as the login button) */}
        {isVerified && (
          <WalletStatus /> // Only show the WalletStatus component if verified
        )}
      </div>
    </header>
  );
}
