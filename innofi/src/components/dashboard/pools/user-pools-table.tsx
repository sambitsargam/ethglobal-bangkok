"use client";

import { useState } from "react";
import { formatUnits } from "viem";
import { useAccount, useChains } from "wagmi";

import { ListModal } from "@/components/dashboard/marketplace/list-modal";
import { DepositModal } from "@/components/dashboard/pools/deposit-modal";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { usePools } from "@/lib/hooks/pools/use-pools";
import { Pool } from "@/lib/types";
import { APR_DECIMALS, LTV_DECIMALS } from "@/lib/utils";

export function UserPoolsTable() {
  const { address } = useAccount();
  const chains = useChains();
  const {
    data: pools,
    isPending,
    refetch,
  } = usePools({
    owner: address,
    enabled: !!address,
  });

  const userPools = address ? pools : [];

  // console.log("User Pools: ", data);

  const [selectedPool, setSelectedPool] = useState<Pool | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Active Deposits</CardTitle>
        <Button onClick={() => setIsModalOpen(true)}>New Deposit</Button>
        <DepositModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onSuccess={() => {
            refetch();
            setIsModalOpen(false);
          }}
        />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Chain</TableHead>
              <TableHead>Asset</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Interest Rate</TableHead>
              <TableHead>LTV</TableHead>
              <TableHead>Collateral Chain</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userPools?.length ? (
              userPools.map((pool, index) => (
                <TableRow key={index}>
                  <TableCell>{chains.find((chain) => chain.id === pool.chainId)?.name}</TableCell>
                  <TableCell>{pool.asset.symbol}</TableCell>
                  <TableCell>{formatUnits(pool.amount, pool.asset.decimals)}</TableCell>
                  <TableCell>{formatUnits(pool.apr, APR_DECIMALS)}%</TableCell>
                  <TableCell>{formatUnits(pool.ltv, LTV_DECIMALS)}%</TableCell>
                  <TableCell>
                    {chains.find((chain) => chain.id === pool.collateralChainId)?.name}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="accent"
                      onClick={() => {
                        setSelectedPool(pool);
                        setIsListModalOpen(true);
                      }}
                    >
                      List for Sale
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  {isPending ? (
                    <div className="flex justify-center py-10">
                      <Spinner />
                    </div>
                  ) : (
                    "No active deposits"
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {selectedPool && (
          <ListModal open={isListModalOpen} onOpenChange={setIsListModalOpen} pool={selectedPool} />
        )}
      </CardContent>
    </Card>
  );
}
