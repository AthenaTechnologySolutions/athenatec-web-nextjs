import Image from "next/image";

export type ClientLogo = {
  src: string;
  name: string;
};

export const logos: ClientLogo[] = [
  { src: "/assets/Clients/ALRA-LAVAL.webp", name: "Alfa Laval" },
  { src: "/assets/Clients/AMU1-OSRAM.webp", name: "ams OSRAM" },
  { src: "/assets/Clients/Areva.webp", name: "Areva" },
  { src: "/assets/Clients/Atmel.webp", name: "Atmel" },
  { src: "/assets/Clients/Conformis.webp", name: "Conformis" },
  {
    src: "/assets/Clients/Critical-Manufacturing.webp",
    name: "Critical Manufacturing",
  },
  { src: "/assets/Clients/Daikin.webp", name: "Daikin" },
  { src: "/assets/Clients/Dexcom.webp", name: "Dexcom" },
  { src: "/assets/Clients/Edtech.webp", name: "EdTech" },
  { src: "/assets/Clients/ELO.webp", name: "ELO" },
  { src: "/assets/Clients/Emcore.webp", name: "EMCORE" },
  { src: "/assets/Clients/Enovix.webp", name: "Enovix" },
  { src: "/assets/Clients/Entrgris.webp", name: "Entegris" },
  { src: "/assets/Clients/Finisar.webp", name: "Finisar" },
  { src: "/assets/Clients/GLO-USA.webp", name: "GLO USA" },
  { src: "/assets/Clients/Honeywell.webp", name: "Honeywell" },
  { src: "/assets/Clients/HSC.webp", name: "HSC" },
  {
    src: "/assets/Clients/InnovaFlex_Foundry.webp",
    name: "InnovaFlex Foundry",
  },
  { src: "/assets/Clients/Intel.webp", name: "Intel" },
  { src: "/assets/Clients/Lumentum.webp", name: "Lumentum" },
  { src: "/assets/Clients/Marki.webp", name: "Marki Microwave" },
  { src: "/assets/Clients/Miasole.webp", name: "MiaSole" },
  { src: "/assets/Clients/Micron.webp", name: "Micron" },
  { src: "/assets/Clients/mission-solar.webp", name: "Mission Solar" },
  { src: "/assets/Clients/Neophotonics.webp", name: "NeoPhotonics" },
  { src: "/assets/Clients/Nevro.webp", name: "Nevro" },
  { src: "/assets/Clients/Penumbra.webp", name: "Penumbra" },
  { src: "/assets/Clients/Philips.webp", name: "Philips" },
  { src: "/assets/Clients/PSi-Quantum.webp", name: "PsiQuantum" },
  { src: "/assets/images/03.webp", name: "Raxium" },
  { src: "/assets/Clients/SK-Siltron.webp", name: "SK Siltron" },
  { src: "/assets/Clients/Skywater.webp", name: "SkyWater Technology" },
  { src: "/assets/Clients/Swissbit.webp", name: "Swissbit" },
  { src: "/assets/Clients/TDK.webp", name: "TDK" },
  { src: "/assets/Clients/Teledyne.webp", name: "Teledyne" },
  {
    src: "/assets/Clients/View-Dynamic-Glass.webp",
    name: "View Dynamic Glass",
  },
  { src: "/assets/Clients/VLAVI.webp", name: "VIAVI Solutions" },
  { src: "/assets/Clients/Wolfspeed.webp", name: "Wolfspeed" },
];

export default function ClientLogos() {
  return (
    <div className="client-logos">
      {logos.map((logo) => (
        <div key={logo.src} className="logo-item">
          <Image
            src={logo.src}
            alt={logo.name}
            width={140}
            height={56}
            sizes="140px"
            className="h-auto w-auto object-contain"
            style={{ width: "auto", height: "auto" }}
            quality={80}
          />
        </div>
      ))}
    </div>
  );
}
