import { trips } from "@/dummy_data/data";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Clock,
  CalendarDays,
  Compass,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default async function TripDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = await params.then((p) => p.id);
  const trip = trips.find((t) => t.id === Number(id));

  if (!trip) return notFound();

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
       <Link
        href={"/"}
        className="absolute top-4 left-4 z-10"
      >
        <Button variant="outline" size="sm">
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back to Home
        </Button>
      </Link>

      {/* ── Hero ── */}
      <div className="relative h-[55vh] min-h-[400px] max-h-[640px] overflow-hidden rounded-b-3xl">
        <Image
          src={`https://picsum.photos/seed/${trip.id}/1400/700`}
          alt={trip.title}
          fill
          className="object-cover transition-transform duration-[8000ms] hover:scale-105"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {/* Hero text */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
          <p
            className="text-amber-400 text-xs font-semibold tracking-[0.18em] uppercase mb-2 animate-in fade-in slide-in-from-bottom-3 duration-700"
            style={{ animationDelay: "100ms", animationFillMode: "both" }}
          >
            ✦ Featured Destination
          </p>
          <h1
            className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight max-w-2xl mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{ animationDelay: "200ms", animationFillMode: "both" }}
          >
            {trip.title}
          </h1>
          <div
            className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{ animationDelay: "300ms", animationFillMode: "both" }}
          >
            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full">
              <MapPin className="w-3 h-3" />
              {trip.location}
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full">
              <Clock className="w-3 h-3" />
              {trip.duration}
            </span>
          </div>
        </div>
      </div>

      {/* ── Page body ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">

        {/* ── LEFT: Main content ── */}
        <div className="flex flex-col gap-6">

          {/* Places Covered */}
          <Card
            className="rounded-2xl border-stone-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{ animationDelay: "350ms", animationFillMode: "both" }}
          >
            <CardContent className="p-6">
              <h2 className="font-serif text-xl font-semibold text-stone-800 mb-4">
                Places Covered
              </h2>
              <div className="flex flex-wrap gap-2">
                {trip.places?.map((place: string, i: number) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-600 hover:text-white hover:-translate-y-0.5 transition-all duration-200 cursor-default rounded-full px-3 py-1 text-xs font-medium"
                  >
                    {place}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Itinerary Timeline */}
          <Card
            className="rounded-2xl border-stone-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{ animationDelay: "450ms", animationFillMode: "both" }}
          >
            <CardContent className="p-6">
              <h2 className="font-serif text-xl font-semibold text-stone-800 mb-6">
                Day-wise Itinerary
              </h2>

              <div className="relative pl-7">
                {/* Vertical line */}
                <div className="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-amber-400 via-amber-200 to-stone-100" />

                {trip.itinerary?.map((day: any, i: number) => (
                  <div key={i} className="relative mb-7 last:mb-0 group">
                    {/* Dot */}
                    <div className="absolute -left-7 top-1 w-[18px] h-[18px] rounded-full bg-white border-2 border-amber-400 group-hover:bg-amber-400 group-hover:scale-110 transition-all duration-200 z-10" />

                    {/* Content */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                        Day {day.day}
                      </span>
                      <span className="font-serif font-semibold text-stone-800 text-sm">
                        {day.title}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-stone-500 pl-0.5">
                      {day.detail}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* About */}
          <Card
            className="rounded-2xl border-stone-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{ animationDelay: "550ms", animationFillMode: "both" }}
          >
            <CardContent className="p-6">
              <h2 className="font-serif text-xl font-semibold text-stone-800 mb-4">
                About This Trip
              </h2>
              {/* Pull quote — first sentence */}
              <p className="border-l-2 border-amber-400 pl-4 font-serif italic text-stone-700 text-base leading-relaxed mb-4">
                {trip.description?.split(".")[0]}.
              </p>
              <p className="text-sm leading-[1.85] text-stone-500">
                {trip.description}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ── RIGHT: Sticky Price Card ── */}
        <aside
          className="lg:sticky lg:top-6 animate-in fade-in slide-in-from-right-6 duration-700"
          style={{ animationDelay: "300ms", animationFillMode: "both" }}
        >
          <Card className="rounded-2xl border-stone-100 shadow-lg overflow-hidden">
            <CardContent className="p-6 flex flex-col gap-5">

              {/* Price */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-1">
                  Starting from
                </p>
                <div className="font-serif text-4xl font-bold text-stone-900 leading-none">
                  ₹{trip.price?.toLocaleString("en-IN")}
                </div>
                <p className="text-xs text-stone-400 mt-1">
                  per person · taxes included
                </p>
              </div>

              {/* CTA */}
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl py-5 text-sm tracking-wide shadow-md shadow-amber-200 hover:shadow-amber-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                Reserve Your Spot
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>

              <Separator className="bg-stone-100" />

              {/* Stats */}
              <div className="flex flex-col gap-3">
                {[
                  { icon: MapPin, label: trip.location },
                  { icon: Clock, label: trip.duration },
                  {
                    icon: Compass,
                    label: `${trip.places?.length ?? 0} places covered`,
                  },
                  {
                    icon: CalendarDays,
                    label: `${trip.itinerary?.length ?? 0}-day itinerary`,
                  },
                ].map(({ icon: Icon, label }, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 text-sm text-stone-600"
                  >
                    <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-stone-100">
                      <Icon className="w-3.5 h-3.5 text-stone-500" />
                    </span>
                    {label}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>

      </div>
    </div>
  );
}