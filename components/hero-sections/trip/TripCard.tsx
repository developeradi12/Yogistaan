"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TripCard({ item }) {
  return (
    <Card className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 py-0">

      {/* Image Section */}
      <div className="relative">
        <Image
          src={`https://picsum.photos/seed/${item.id}/400/300`}
          alt={item.title}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />

        {/* Price Badge */}
        <Badge className="absolute top-3 right-3 bg-white text-black shadow">
          ₹{item.price}
        </Badge>
      </div>

      {/* Content */}
      <CardContent className="p-4 space-y-2">

        <h3 className="font-semibold text-lg">
          {item.title}
        </h3>

        <p className="text-sm text-muted-foreground">
          📍 {item.location}
        </p>

        <p className="text-sm text-muted-foreground">
          🕒 {item.duration}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 pt-1">
          {item.places?.slice(0, 2).map((h, i) => (
            <Badge key={i} variant="secondary">
              {h}
            </Badge>
          ))}
        </div>

        {/* Button */}

        <Link href={`/trip/${item.id}`}>
          <Button className="w-full mt-3">
            View Details
          </Button>
        </Link>

      </CardContent>
    </Card>
  );
}