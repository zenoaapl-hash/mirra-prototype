import Link from 'next/link';

export default function TermsPage() {
  const sections = [
    {
      title: 'About this document',
      content: `These are draft terms of service created for prototype and demonstration purposes only. They are not a final legal document. Full legal review is required before MIRRA launches as a commercial product.`,
    },
    {
      title: 'What MIRRA is',
      content: `MIRRA is a social identity-commerce platform that allows users to create a digital identity, join creator-hosted culture worlds, collect digital identity items, complete quests, and unlock real-world perks. In this prototype, all purchases, worlds, and items are simulated for demonstration purposes only.`,
    },
    {
      title: 'Age requirements',
      content: `MIRRA is intended for users aged 13 and over. Users under 18 will require parental or guardian consent in the final product. Users in certain regions may have different minimum age requirements under local law. Age verification and parental consent flows are not yet implemented in this prototype and are required before commercial launch.`,
    },
    {
      title: 'Digital items and purchases',
      content: `Digital items acquired through MIRRA (charms, badges, effects, avatar layers, room objects) are licensed for use within the MIRRA platform. They are not financial instruments, cryptocurrency, NFTs, or speculative assets. Trade Credit is platform credit only and has no cash value outside of MIRRA. Purchases are one-time transactions with no subscription requirement unless explicitly stated. No loot boxes or random-outcome mechanics are used — bundle contents are always shown before purchase.`,
    },
    {
      title: 'Creator content',
      content: `Creators who host worlds and drops on MIRRA are responsible for the content they publish. MIRRA reserves the right to remove content that violates community guidelines. Creator revenue sharing terms will be set out in a separate Creator Agreement before commercial launch.`,
    },
    {
      title: 'Payments',
      content: `Payment processing is handled by PayPal. MIRRA does not store payment card details. Buy-now-pay-later and Pay Later features are subject to PayPal's eligibility requirements and are not available to minors. Spending limits and parental controls will be implemented before commercial launch.`,
    },
    {
      title: 'Prototype limitations',
      content: `This prototype is for demonstration and testing purposes. No real payments are processed. No real user accounts exist. No real digital items are owned or transferred. The prototype may be taken down or significantly changed at any time without notice.`,
    },
    {
      title: 'Safety and compliance before launch',
      content: `Before MIRRA launches commercially, the following compliance work is required: legal terms and privacy policy review by qualified lawyers; GDPR/UK GDPR/CCPA/COPPA compliance implementation; age verification and parental consent systems; spending limit controls for younger users; regional compliance for US, UK, and Japan markets; PayPal integration compliance review; and data protection officer appointment.`,
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mirra-container-narrow">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-display font-semibold mb-4"
            style={{color:'#F87171',letterSpacing:'0.1em'}}>
            ⚠ Draft — Not a final legal document
          </div>
          <h1 className="font-display font-extrabold text-3xl text-white mb-3">Terms of Service</h1>
          <p className="text-sm" style={{color:'#A1A1AA'}}>Last updated: prototype stage — final legal review required before launch</p>
        </div>

        <div className="glass-card rounded-2xl p-5 mb-6" style={{borderColor:'rgba(248,113,113,0.2)',background:'rgba(248,113,113,0.05)'}}>
          <div className="font-display font-bold text-sm mb-1" style={{color:'#F87171'}}>Prototype disclaimer</div>
          <p className="text-xs leading-relaxed" style={{color:'#A1A1AA'}}>
            These terms are a placeholder for demonstration purposes only. They are not legally binding.
            Qualified legal counsel must review and finalise all terms before commercial launch,
            with particular attention to consumer protection law, minor safeguarding,
            and digital goods regulation in the US, UK, and Japan.
          </p>
        </div>

        <div className="space-y-5">
          {sections.map(section => (
            <div key={section.title} className="glass-card rounded-2xl p-5">
              <h2 className="font-display font-bold text-base text-white mb-2">{section.title}</h2>
              <p className="text-sm leading-relaxed" style={{color:'#A1A1AA'}}>{section.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm font-display font-semibold" style={{color:'#C4B5FD'}}>
            ← Back to MIRRA
          </Link>
        </div>
      </div>
    </div>
  );
}
