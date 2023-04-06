import { prismaClient } from "lib/server/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CancelSubscriptionButton } from "app/components/CancelSubscriptionButton";
import { SaveSubscriptionAlert } from "app/subscriptions/[id]/components/SaveSubcriptionAlert";
import { SubscriptionSummary } from "app/confirm/components/SubscriptionSummary";

export default async function SubscriptionPage({
  params,
}: {
  params: { id: string };
}) {
  const subscriptionId = params.id;

  const subscription = await prismaClient.subscription.findUnique({
    where: {
      id: subscriptionId,
    },
  });
  if (!subscription) {
    notFound();
  }

  return (
    <>
      <h2 className="font-heading font-bold text-2xl">Periodic payment</h2>
      <SubscriptionSummary
        values={{
          amount: subscription.amount.toString(),
          recipientLightningAddress: subscription.recipientLightningAddress,
          sleepDuration: subscription.sleepDuration,
          message: subscription.message || undefined,
        }}
      />
      <div className="divider my-0" />

      <SaveSubscriptionAlert />
      <CancelSubscriptionButton subscriptionId={subscription.id} />
    </>
  );
}