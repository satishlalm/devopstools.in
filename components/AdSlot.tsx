/**
 * AdSense-ready placement. Replace the placeholder with an <ins class="adsbygoogle">
 * unit once the site is approved. Slots: header | sidebar | in-content | footer.
 */
export default function AdSlot({ slot, className = "" }: { slot: string; className?: string }) {
  return (
    <div
      className={`card flex min-h-[90px] items-center justify-center text-xs muted ${className}`}
      data-ad-slot={slot}
      aria-hidden="true"
    >
      ad slot: {slot}
    </div>
  );
}
