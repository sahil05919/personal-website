"use client";

export default function InkChemistry() {
  return (
    <svg aria-hidden="true" className="pointer-events-none fixed h-0 w-0">
      <defs>
        {/* Microscopic ink feathering into paper grain */}
        <filter id="ink-feather-subtle" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves={2}
            result="microNoise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="microNoise"
            scale="0.6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Deep archival oxidation bleed */}
        <filter id="ink-feather-aged" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.45"
            numOctaves={3}
            result="agedNoise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="agedNoise"
            scale="1.1"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}