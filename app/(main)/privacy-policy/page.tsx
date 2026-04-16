import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Figures.Finance. Learn how we handle data, advertising, and analytics.',
}

const LAST_UPDATED = 'April 17, 2026'

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold text-[#0F172A] mb-2">Privacy Policy</h1>
      <p className="text-slate-500 text-sm mb-10">Last updated: {LAST_UPDATED}</p>

      <div className="space-y-8 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">1. Overview</h2>
          <p>
            Figures.Finance ("we", "us", "our") operates the website at
            https://figures.finance. This Privacy Policy explains what information
            we collect, how we use it, and your rights in relation to it. By using
            our site you agree to the practices described below.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">2. Information We Collect</h2>
          <p className="mb-3">
            <strong>Calculator inputs:</strong> All calculator inputs (loan amounts,
            interest rates, etc.) are processed entirely in your browser. We do not
            transmit, store, or log any of the numbers you enter.
          </p>
          <p className="mb-3">
            <strong>Usage data:</strong> We use Google Analytics 4 to collect
            anonymised data about how visitors use our site, including pages visited,
            time on site, and general geographic region (country/city level). This
            data is aggregated and does not identify you personally.
          </p>
          <p>
            <strong>Cookies:</strong> We use cookies set by Google Analytics and
            Google AdSense. You can control cookies through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">3. Google AdSense</h2>
          <p className="mb-3">
            We display advertisements on this site through Google AdSense. Google
            uses cookies to serve ads based on your prior visits to this site or
            other sites on the internet. Google's use of advertising cookies enables
            it and its partners to serve ads based on your visit to our site and/or
            other sites on the internet.
          </p>
          <p>
            You may opt out of personalised advertising by visiting{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#10B981] hover:underline"
            >
              Google Ads Settings
            </a>
            . For more information about how Google uses data when you use our
            site, see{' '}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#10B981] hover:underline"
            >
              Google's Privacy & Terms
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">4. Google Analytics</h2>
          <p>
            We use Google Analytics 4 to understand how visitors interact with our
            website. Google Analytics collects information such as how often users
            visit the site, what pages they visit, and what other sites they visited
            prior to coming to our site. We use this data only to improve our site.
            Google Analytics collects only the IP address assigned to you on the date
            you visit, not your name or other identifying information. We do not
            combine the information collected through Google Analytics with
            personally identifiable information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">5. Third-Party Links</h2>
          <p>
            Our site may contain links to third-party websites. We have no control
            over and assume no responsibility for the content, privacy policies, or
            practices of any third-party sites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">6. Children's Privacy</h2>
          <p>
            Our site is not directed at children under the age of 13. We do not
            knowingly collect personal information from children.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">7. Your Rights</h2>
          <p>
            Depending on your location, you may have rights under GDPR (EU/UK),
            CCPA (California), PIPEDA (Canada), or the Australian Privacy Act. If
            you wish to exercise any privacy rights or have questions about your
            data, please contact us at{' '}
            <a href="mailto:hello@figures.finance" className="text-[#10B981] hover:underline">
              hello@figures.finance
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The "last updated"
            date at the top of this page will reflect any changes. Continued use of
            the site after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">9. Contact</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us
            at{' '}
            <a href="mailto:hello@figures.finance" className="text-[#10B981] hover:underline">
              hello@figures.finance
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}