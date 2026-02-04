const tocItems = [
  { id: 'summary', title: 'Summary of Key Points' },
  { id: 'information', title: 'What Information Do We Collect?' },
  { id: 'processing', title: 'How Do We Process Your Information?' },
  { id: 'legal-bases', title: 'Legal Bases for Processing' },
  { id: 'sharing', title: 'When and With Whom Do We Share Data?' },
  { id: 'third-party', title: 'Third-Party Websites' },
  { id: 'apple-app-store', title: 'Apple App Store and In-App Purchases' },
  { id: 'apple-health', title: 'Apple Health Data' },
  { id: 'international', title: 'International Transfers' },
  { id: 'retention', title: 'Data Retention' },
  { id: 'security', title: 'Data Security' },
  { id: 'children', title: "Children's Data" },
  { id: 'rights', title: 'Your Privacy Rights' },
  { id: 'do-not-track', title: 'Do-Not-Track Signals' },
  { id: 'regional', title: 'Regional Rights' },
  { id: 'updates', title: 'Updates to This Policy' },
  { id: 'contact', title: 'Contact Us' },
  { id: 'manage', title: 'Manage Your Data' },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#11151d_0%,_#0b0e13_60%,_#090b0f_100%)] text-white">
      <main className="mx-auto w-full max-w-5xl px-6 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-semibold sm:text-5xl">Privacy Policy</h1>
          <p className="mt-3 text-sm text-white/60">Last updated: September 17, 2025</p>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
            Table of contents
          </p>
          <div className="mt-4 grid gap-2 text-sm text-white/70 sm:grid-cols-2">
            {tocItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="hover:text-white">
                {item.title}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 space-y-10 text-sm text-white/70">
          <section id="summary">
            <h2 className="text-xl font-semibold text-white">Summary of Key Points</h2>
            <p className="mt-3">
              This Privacy Policy for Roman Co Ltd., a company incorporated under the laws of
              Canada and registered in Alberta, doing business as Peak Height ("Peak Height," "we,"
              "us," or "our") explains how and why we collect, store, use, and share ("process") your
              information when you use our services ("Services"), such as when you:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Download and use our mobile application (Peak Height), or any other application of ours that links to this Privacy Policy</li>
              <li>Engage with us in other related ways, including any sales, marketing, or events</li>
            </ul>
            <p className="mt-3">
              Questions or concerns? Reading this Privacy Policy will help you understand your
              privacy rights and choices. If you do not agree with our policies and practices, please
              do not use our Services. For further questions, please contact us at{' '}
              <a href="mailto:usepeakheight@gmail.com" className="text-white underline">
                usepeakheight@gmail.com
              </a>
              .
            </p>
          </section>

          <section id="information">
            <h2 className="text-xl font-semibold text-white">What Information Do We Collect?</h2>
            <p className="mt-3">
              We collect personal information you provide, such as size and weight, gender, age,
              ethnicity, parent height, shoe size, training routines, sleep habits, and email
              address. We do not collect biometric data such as facial recognition. Payment data is
              processed by Apple or Google; we do not store card details. If enabled, we may send
              push notifications. Automatically collected information includes device type, operating
              system, IP address, crash logs, usage data, and session times.
            </p>
          </section>

          <section id="processing">
            <h2 className="text-xl font-semibold text-white">How Do We Process Your Information?</h2>
            <p className="mt-3">
              We process data to predict growth patterns, enhance app features, personalize your
              experience, and provide AI-powered chatbot interactions through OpenAI's API. Chatbot
              conversations are processed in real time and not stored on our servers. Users should
              avoid sharing sensitive information with the chatbot.
            </p>
          </section>

          <section id="legal-bases">
            <h2 className="text-xl font-semibold text-white">Legal Bases for Processing</h2>
            <p className="mt-3">
              We only process data when we have a valid legal basis, such as consent, legal
              obligations, or legitimate interests like service improvement and fraud prevention. For
              users in Canada, the EU, UK, or other regulated regions, additional protections apply.
            </p>
          </section>

          <section id="sharing">
            <h2 className="text-xl font-semibold text-white">
              When and With Whom Do We Share Data?
            </h2>
            <p className="mt-3">
              We may share information with service providers such as analytics and cloud storage
              providers, bound by data-protection agreements. We may also share data during business
              transfers such as mergers or acquisitions. We do not sell personal information.
            </p>
          </section>

          <section id="third-party">
            <h2 className="text-xl font-semibold text-white">Third-Party Websites</h2>
            <p className="mt-3">
              The App may link to third-party websites or services. We are not responsible for their
              privacy practices, and users should review their policies.
            </p>
          </section>

          <section id="apple-app-store">
            <h2 className="text-xl font-semibold text-white">
              Apple App Store and In-App Purchases
            </h2>
            <p className="mt-3">
              When you download our app through the Apple App Store or make in-app purchases, Apple
              may collect certain information about you and your transactions. This information is
              subject to Apple's Privacy Policy, which is separate from our Privacy Policy. We
              encourage you to review Apple's Privacy Policy to understand how Apple handles your
              information.
            </p>
            <p className="mt-3">
              We do not store or have access to your payment information, as all in-app purchases
              are processed by Apple through your Apple ID account. Apple handles all payment
              processing and billing in accordance with their terms and privacy policy.
            </p>
          </section>

          <section id="apple-health">
            <h2 className="text-xl font-semibold text-white">Apple Health Data</h2>
            <p className="mt-3">
              If you choose to integrate with Apple Health, we may access health data you explicitly
              authorize. This data is used solely for app functionality and is not shared with third
              parties. You can revoke this access at any time through your device settings.
            </p>
          </section>

          <section id="international">
            <h2 className="text-xl font-semibold text-white">International Transfers</h2>
            <p className="mt-3">
              Your information may be transferred outside your home country. For EEA and UK users, we
              use Standard Contractual Clauses or equivalent safeguards to ensure protection.
            </p>
          </section>

          <section id="retention">
            <h2 className="text-xl font-semibold text-white">Data Retention</h2>
            <p className="mt-3">
              We keep personal information as long as necessary. Account data is deleted within 30
              days of account deletion unless required by law. Payment data is retained only for
              transactions and audits. Analytics data may be kept for up to 12 months.
            </p>
          </section>

          <section id="security">
            <h2 className="text-xl font-semibold text-white">Data Security</h2>
            <p className="mt-3">
              We use encryption, access controls, firewalls, and monitoring to protect data.
              However, no method is fully secure. Users should use strong passwords and protect
              their devices.
            </p>
          </section>

          <section id="children">
            <h2 className="text-xl font-semibold text-white">Children's Data</h2>
            <p className="mt-3">
              We do not knowingly collect information from children under 13 or under the age of
              consent in your jurisdiction. If we learn such data has been collected, we will delete
              it. Parents may contact us at{' '}
              <a href="mailto:usepeakheight@gmail.com" className="text-white underline">
                usepeakheight@gmail.com
              </a>{' '}
              for removal requests.
            </p>
          </section>

          <section id="rights">
            <h2 className="text-xl font-semibold text-white">Your Privacy Rights</h2>
            <p className="mt-3">
              Depending on your location, you may have rights to access, correct, delete, restrict,
              or object to processing of your data, and to withdraw consent. To exercise rights,
              contact us at{' '}
              <a href="mailto:usepeakheight@gmail.com" className="text-white underline">
                usepeakheight@gmail.com
              </a>
              .
            </p>
          </section>

          <section id="do-not-track">
            <h2 className="text-xl font-semibold text-white">Do-Not-Track Signals</h2>
            <p className="mt-3">
              We do not currently respond to browser Do-Not-Track signals. If standards change, this
              policy will be updated.
            </p>
          </section>

          <section id="regional">
            <h2 className="text-xl font-semibold text-white">Regional Rights</h2>
            <p className="mt-3">
              We comply with Canadian law (PIPEDA), EU and UK GDPR, and applicable US state laws such
              as CCPA. In other regions, we align with local privacy requirements.
            </p>
          </section>

          <section id="updates">
            <h2 className="text-xl font-semibold text-white">Updates to This Policy</h2>
            <p className="mt-3">
              We may update this Privacy Policy periodically. The revised date will indicate when
              updates take effect. If changes are material, we may notify you through the app or by
              email.
            </p>
          </section>

          <section id="contact">
            <h2 className="text-xl font-semibold text-white">Contact Us</h2>
            <p className="mt-3">If you have questions, contact us at:</p>
            <div className="mt-3 rounded-2xl border border-white/10 bg-black/40 p-4">
              <p className="text-white">Roman Co Ltd. (Peak Height)</p>
              <p>
                Email:{' '}
                <a href="mailto:usepeakheight@gmail.com" className="text-white underline">
                  usepeakheight@gmail.com
                </a>
              </p>
              <p>Address: 12153 Fort Rd NW, Edmonton, AB T5B 4H2</p>
            </div>
          </section>

          <section id="manage">
            <h2 className="text-xl font-semibold text-white">Manage Your Data</h2>
            <p className="mt-3">
              You can review or delete your data through account settings in the App. Data is
              permanently deleted within 30 days of account deletion, unless required by law.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
