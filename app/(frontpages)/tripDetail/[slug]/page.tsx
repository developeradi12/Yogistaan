import TripDetails from "@/components/trip/TripDetails";
import { TripData } from "@/dummy_data/tripData";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const trip = TripData.trips.find((t) => t.slug === slug);

  if (!trip) notFound();

  return <TripDetails trip={trip} />;
}