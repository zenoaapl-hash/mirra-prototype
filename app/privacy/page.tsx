import Link from 'next/link';
import { C } from '@/components/ui';

export default function PrivacyPage() {
  const sections = [
    {
      title: 'About this document',
      content: `This is a draft privacy policy created for prototype and demonstration purposes only. It is not a final legal document. Full legal review, localisation, and compliance work is required before MIRRA launches as a commercial product.`,
    },
    {
      title: 'Data we collect in this prototype',
      content: `In the current prototype, the following data may be collected: email addresses submitted via the waitlist form, quiz answers stored locally in your browser session, and creator application form submissions. This data is used only for early-access communications and product development purposes.`,
    },
    {
      title: 'How we use your data',
      content: `Data collected in this prototype is used to: notify you when early access opens, understand what types of users are interested in MIRRA, and improve the product before launch. We do not sell your data. We do not share it with advertisers.`,
    },
    {
      title: 'Younger users — special safeguards required',
      content: `MIRRA is designed for users aged 13–29. The final product will require special compliance measures for users under 18, including: parental or guardian consent flows (required under GDPR, UK COPPA equivalent, and similar regulations), age-appropriate content and spending controls, restricted or removed buy-now-pay-later features for minors, and regional compliance with COPPA (US), UK GDPR, and Japanese privacy laws. These safeguards are not yet implemented in this prototype and must be completed before any commercial launch.`,
    },
    {
      title: 'Payments and financial data',
      content: `Checkout in this prototype is a demonstration only. No real payments are processed. When real payments are enabled (via PayPal), financial data will be handled entirely by PayPal and will not be stored by MIRRA. Full payment compliance review, including age verification and spending limits for younger users, is required before launch.`,
    },
    {
      title: 'Cookies and local storage',
      content: `This prototype uses browser sessionStorage to remember your quiz answers during your visit. No persistent tracking cookies are set in this version.`,
    },
    {
      title: 'Your rights',
      content: `You have the right to request deletion of any data you submitted via the waitlist or creator application form. Contact us at the email address in our footer. In the final product, full GDPR/UK GDPR/CCPA data rights will be implemented.`,
    },
    {
      title: 'Contact',
      content: `For questions about this prototype or your data, contact the MIRRA team through the waitlist form. A formal data contact and DPO (Data Protection Officer) process will be established before commercial launch.`,
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
          <h1 className="font-display font-extrabold text-3xl text-white mb-3">Privacy Policy</h1>
          <p className="text-sm" style={{color:'#A1A1AA'}}>Last updated: prototype stage — final legal review required before launch</p>
        </div>

        <div className="glass-card rounded-2xl p-5 mb-6" style={{borderColor:'rgba(248,113,113,0.2)',background:'rgba(248,113,113,0.05)'}}>
          <div className="font-display font-bold text-sm mb-1" style={{color:'#F87171'}}>Prototype disclaimer</div>
          <p className="text-xs leading-relaxed" style={{color:'#A1A1AA'}}>
            This privacy policy is a placeholder for demonstration purposes. It is not legally binding
            and does not constitute a final privacy notice. Special compliance for younger users
            (ages 13–17), payment data, regional laws, and parental consent must be completed
            by qualified legal counsel before MIRRA launches commercially.
          </p>
        </div>

        <div className="space-y-6">
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
