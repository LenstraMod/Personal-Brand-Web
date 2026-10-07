import { Armory } from "@/sections/Armory";
import { Chronicle } from "@/sections/Chronicle";
import { Gate } from "@/sections/Gate";
import { Marquee } from "@/components/Marquee";
import { Herald } from "@/sections/Herald";
import { Ledger } from "@/sections/Ledger";
import { Quests } from "@/sections/Quests";
import { Raven } from "@/sections/Raven";

/** Section order = the journey: Gate → Herald → Armory → Quests → Chronicle → Ledger → Raven. */
export default function Home() {
  return (
    <>
      <Gate />
      <Marquee />
      <Herald />
      <Armory />
      <Quests />
      <Chronicle />
      <Ledger />
      <Raven />
    </>
  );
}
