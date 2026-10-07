import type { Metadata } from "next";
import { Button } from "@/components/Button";

export const metadata: Metadata = { title: "Not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="grain relative grid min-h-[100svh] place-items-center bg-ink px-6 text-center">
      <div>
        <p className="label">Error 404</p>
        <h1 className="mt-6 font-display text-display-xl font-light leading-[0.9]">
          Here be <span className="font-black font-bold text-gold">dragons.</span>
        </h1>
        <p className="mx-auto mt-8 max-w-md text-bone/85">That page isn&apos;t on the map. Head back to the gate.</p>
        <div className="mt-10">
          <Button href="/">Back to the gate</Button>
        </div>
      </div>
    </section>
  );
}
