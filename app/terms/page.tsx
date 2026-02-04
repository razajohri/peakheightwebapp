const tocItems = [
  { id: 'agreement', title: 'Agreement to Terms' },
  { id: 'subscription', title: 'Subscription Terms' },
  { id: 'intellectual', title: 'Intellectual Property Rights' },
  { id: 'representations', title: 'User Representations' },
  { id: 'prohibited', title: 'Prohibited Activities' },
  { id: 'contributions', title: 'User-Generated Contributions' },
  { id: 'license', title: 'Contribution License' },
  { id: 'mobile', title: 'Mobile Application License' },
  { id: 'apple-app-store-terms', title: 'Apple App Store Terms' },
  { id: 'apple-role', title: "Apple's Role and Limitations" },
  { id: 'third-party-beneficiary', title: 'Third-Party Beneficiary' },
  { id: 'warranty-disclaimer', title: 'Warranty Disclaimer' },
  { id: 'limitation-liability', title: 'Limitation of Liability' },
  { id: 'third-party', title: 'Third-Party Websites & Content' },
  { id: 'advertisers', title: 'Advertisers' },
  { id: 'management', title: 'App Management' },
  { id: 'privacy', title: 'Privacy Policy' },
  { id: 'termination', title: 'Term & Termination' },
  { id: 'modifications', title: 'Modifications & Interruptions' },
  { id: 'governing', title: 'Governing Law' },
  { id: 'disputes', title: 'Dispute Resolution' },
  { id: 'corrections', title: 'Corrections' },
  { id: 'purchases', title: 'Purchases & Payment' },
  { id: 'cancellation', title: 'Cancellation Policy' },
  { id: 'reviews', title: 'Guidelines for Reviews' },
  { id: 'original-liability', title: 'Limitation of Liability & Disclaimer of Warranties' },
  { id: 'disclaimer', title: 'Disclaimer' },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#11151d_0%,_#0b0e13_60%,_#090b0f_100%)] text-white">
      <main className="mx-auto w-full max-w-5xl px-6 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-semibold sm:text-5xl">Terms of Service</h1>
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
          <section id="agreement">
            <h2 className="text-xl font-semibold text-white">Agreement to Terms</h2>
            <p className="mt-3">
              These Terms of Service ("Terms") are a legally binding agreement between you and Roman
              Co Ltd., a company incorporated under the laws of Canada and registered in Alberta,
              doing business as Peak Height ("Peak Height," "we," "us," or "our"), governing your
              access to and use of the Peak Height mobile application and any related websites,
              services, and features (collectively, the "App"). By downloading, installing,
              accessing, or using the App, you acknowledge that you have read, understand, and agree
              to be bound by these Terms. If you do not agree, do not access or use the App.
            </p>
          </section>

          <section id="subscription">
            <h2 className="text-xl font-semibold text-white">Subscription Terms</h2>
            <p className="mt-3">PeakHeight offers the following subscription options:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="text-white">PeakHeight Premium Weekly:</strong> $4.99/week (1 week
                subscription)
              </li>
              <li>
                <strong className="text-white">PeakHeight Premium Yearly:</strong> $29.99/year (1
                year subscription)
              </li>
            </ul>
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-4">
              <p className="text-white">Auto-Renewal Terms:</p>
              <ul className="mt-2 list-disc space-y-2 pl-6">
                <li>Subscriptions automatically renew unless auto-renew is turned off at least 24 hours before the end of the current period</li>
                <li>Payment will be charged to your iTunes Account at confirmation of purchase</li>
                <li>Subscriptions may be managed by the user and auto-renewal may be turned off by going to Account Settings after purchase</li>
                <li>No cancellation of the current subscription is allowed during active subscription period</li>
                <li>Any unused portion of a free trial period, if offered, will be forfeited when you purchase a subscription</li>
              </ul>
            </div>
          </section>

          <section id="intellectual">
            <h2 className="text-xl font-semibold text-white">Intellectual Property Rights</h2>
            <p className="mt-3">
              All content within the App including code, text, graphics, logos, designs, audio,
              video, and trademarks is owned by or licensed to Peak Height. Content is protected by
              copyright, trademark, and international intellectual property laws. Unauthorized use
              is prohibited.
            </p>
          </section>

          <section id="representations">
            <h2 className="text-xl font-semibold text-white">User Representations</h2>
            <p className="mt-3">By using the App, you represent that:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>You have the legal capacity to agree to these Terms.</li>
              <li>You are at least 13 years old (or have parental consent if required by your jurisdiction).</li>
              <li>You will not use the App for illegal or unauthorized purposes.</li>
              <li>You will not attempt to access the App through automated means (bots, scripts, etc.).</li>
              <li>Your use of the App complies with all applicable laws.</li>
            </ul>
          </section>

          <section id="prohibited">
            <h2 className="text-xl font-semibold text-white">Prohibited Activities</h2>
            <p className="mt-3">You agree not to misuse the App. This includes, but is not limited to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Using the App for commercial purposes without authorization.</li>
              <li>Attempting to reverse engineer, copy, or resell the App.</li>
              <li>Uploading harmful code, spam, or abusive content.</li>
              <li>Harassing other users or interfering with App operations.</li>
            </ul>
          </section>

          <section id="contributions">
            <h2 className="text-xl font-semibold text-white">User-Generated Contributions</h2>
            <p className="mt-3">
              The App may allow you to post or share content (e.g., text, images, feedback). You
              understand that such contributions may be visible to others and will be treated as
              non-confidential.
            </p>
          </section>

          <section id="license">
            <h2 className="text-xl font-semibold text-white">Contribution License</h2>
            <p className="mt-3">
              By submitting content, you grant Peak Height a worldwide, royalty-free license to use,
              reproduce, modify, and distribute your contributions for purposes including
              improvement, marketing, and community engagement.
            </p>
          </section>

          <section id="mobile">
            <h2 className="text-xl font-semibold text-white">Mobile Application License</h2>
            <p className="mt-3">
              We grant you a limited, non-transferable license to install and use the App on devices
              you own or control. You must not: reverse engineer or modify the App, use the App for
              unauthorized commercial purposes, or share the App in ways that bypass intended
              restrictions. For Apple iOS users, these Terms incorporate Apple App Store rules.
              Apple is not responsible for maintenance, support, or warranty claims.
            </p>
          </section>

          <section id="apple-app-store-terms">
            <h2 className="text-xl font-semibold text-white">Apple App Store Terms</h2>
            <p className="mt-3">
              This app is licensed, not sold, to you. Your license to use the app is subject to your
              prior acceptance of this License Agreement and the Apple App Store Terms of Service.
              Apple reserves all rights not expressly granted to you.
            </p>
          </section>

          <section id="apple-role">
            <h2 className="text-xl font-semibold text-white">Apple's Role and Limitations</h2>
            <p className="mt-3">
              Apple is not responsible for addressing any claims you or any third party may have
              relating to the app or your possession and use of the app, including but not limited
              to:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Product liability claims</li>
              <li>Any claim that the app fails to conform to any applicable legal or regulatory requirement</li>
              <li>Claims arising under consumer protection or similar legislation</li>
              <li>Maintenance and support services for the app</li>
            </ul>
          </section>

          <section id="third-party-beneficiary">
            <h2 className="text-xl font-semibold text-white">Third-Party Beneficiary</h2>
            <p className="mt-3">
              Apple and Apple's subsidiaries are third-party beneficiaries of this License
              Agreement. Upon your acceptance of the terms and conditions of this License Agreement,
              Apple will have the right (and will be deemed to have accepted the right) to enforce
              this License Agreement against you as a third-party beneficiary thereof.
            </p>
          </section>

          <section id="warranty-disclaimer">
            <h2 className="text-xl font-semibold text-white">Warranty Disclaimer</h2>
            <p className="mt-3">
              You expressly acknowledge and agree that use of the app is at your sole risk and that
              the entire risk as to satisfactory quality, performance, accuracy and effort is with
              you. To the maximum extent permitted by applicable law, the app and any services
              performed or provided by the app are provided "as is" and "as available", with all
              faults and without warranty of any kind.
            </p>
          </section>

          <section id="limitation-liability">
            <h2 className="text-xl font-semibold text-white">Limitation of Liability</h2>
            <p className="mt-3">
              To the extent not prohibited by law, in no event shall Apple be liable for personal
              injury, or any incidental, special, indirect or consequential damages whatsoever,
              including, without limitation, damages for loss of profits, loss of data, business
              interruption or any other commercial damages or losses, arising out of or related to
              your use or inability to use the app.
            </p>
          </section>

          <section id="third-party">
            <h2 className="text-xl font-semibold text-white">Third-Party Websites & Content</h2>
            <p className="mt-3">
              The App may include links or content from third parties. We do not control or endorse
              such content and are not responsible for its accuracy, safety, or reliability.
            </p>
          </section>

          <section id="advertisers">
            <h2 className="text-xl font-semibold text-white">Advertisers</h2>
            <p className="mt-3">
              Currently, Peak Height does not display third-party ads. If this changes, updates will
              be made to these Terms.
            </p>
          </section>

          <section id="management">
            <h2 className="text-xl font-semibold text-white">App Management</h2>
            <p className="mt-3">
              We reserve the right to monitor and remove inappropriate content, restrict or suspend
              access to users who violate these Terms, and manage the App to maintain proper
              functionality.
            </p>
          </section>

          <section id="privacy">
            <h2 className="text-xl font-semibold text-white">Privacy Policy</h2>
            <p className="mt-3">
              Your use of the App is also governed by our Privacy Policy, which outlines how we
              collect and handle your data. By using the App, you consent to data processing as
              described in that policy.
            </p>
          </section>

          <section id="termination">
            <h2 className="text-xl font-semibold text-white">Term & Termination</h2>
            <p className="mt-3">
              These Terms remain in effect while you use the App. We may suspend or terminate access
              at any time, without notice, if you violate these Terms or applicable laws.
            </p>
          </section>

          <section id="modifications">
            <h2 className="text-xl font-semibold text-white">Modifications & Interruptions</h2>
            <p className="mt-3">
              We may update, suspend, or discontinue the App at any time. While we aim for smooth
              operation, interruptions may occur. We are not liable for service disruptions or
              modifications.
            </p>
          </section>

          <section id="governing">
            <h2 className="text-xl font-semibold text-white">Governing Law</h2>
            <p className="mt-3">
              If unresolved, disputes shall be resolved exclusively in the courts of the Province
              of Alberta, Canada.
            </p>
          </section>

          <section id="disputes">
            <h2 className="text-xl font-semibold text-white">Dispute Resolution</h2>
            <p className="mt-3">
              If a dispute arises, you agree to first contact our project manager at{' '}
              <a href="mailto:usepeakheight@gmail.com" className="text-white underline">
                usepeakheight@gmail.com
              </a>{' '}
              for resolution. If unresolved, disputes will be handled under the jurisdiction
              outlined in the Governing Law section.
            </p>
          </section>

          <section id="corrections">
            <h2 className="text-xl font-semibold text-white">Corrections</h2>
            <p className="mt-3">
              The App may contain errors or outdated information. We reserve the right to correct or
              update content at any time.
            </p>
          </section>

          <section id="purchases">
            <h2 className="text-xl font-semibold text-white">Purchases & Payment</h2>
            <p className="mt-3">
              Payments for subscriptions or in-app purchases are processed through app store
              providers (e.g., Apple App Store). You agree to provide accurate billing details and
              authorize recurring charges if applicable. Prices may change, and taxes may apply.
            </p>
          </section>

          <section id="cancellation">
            <h2 className="text-xl font-semibold text-white">Cancellation Policy</h2>
            <p className="mt-3">
              All purchases are non-refundable. You may cancel subscriptions via your app store
              account. Cancellation takes effect at the end of your current billing cycle.
            </p>
          </section>

          <section id="reviews">
            <h2 className="text-xl font-semibold text-white">Guidelines for Reviews</h2>
            <p className="mt-3">If you leave reviews or feedback:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>be honest and respectful</li>
              <li>do not use profanity, hate speech, or discriminatory language</li>
              <li>do not post false or misleading claims</li>
            </ul>
            <p className="mt-3">We may remove or decline reviews at our discretion.</p>
          </section>

          <section id="original-liability">
            <h2 className="text-xl font-semibold text-white">
              Limitation of Liability & Disclaimer of Warranties
            </h2>
            <p className="mt-3">
              Peak Height provides general lifestyle, fitness, and health guidance. We do not
              guarantee results such as increased height. Individual outcomes vary, and the App is
              not a substitute for medical advice. Except where liability cannot be excluded by law,
              Peak Height is not responsible for indirect or consequential damages, including lost
              profits, data, or goodwill.
            </p>
          </section>

          <section id="disclaimer">
            <h2 className="text-xl font-semibold text-white">Disclaimer</h2>
            <p className="mt-3">
              The App is provided "as is" and "as available" without warranties of any kind. We do
              not guarantee uninterrupted service, accuracy, or specific outcomes. Use of the App
              is at your own risk.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
