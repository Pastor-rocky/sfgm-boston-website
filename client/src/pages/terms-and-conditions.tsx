import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="text-3xl font-bold">Terms and Conditions</CardTitle>
              <CardDescription className="text-purple-100">
                SFGM Boston - Soldiers for God Ministry
              </CardDescription>
              <p className="text-sm text-purple-100 mt-2">
                Effective Date: January 1, 2025
              </p>
            </CardHeader>
            
            <CardContent className="p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  1. Acceptance of Terms
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    By accessing and using the SFGM Boston Bible School platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  2. Description of Service
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    SFGM Boston provides an online Bible School platform that includes:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Biblical education courses and curriculum</li>
                    <li>Interactive quizzes and assessments</li>
                    <li>AI-powered Bible study tools</li>
                    <li>Discussion forums and community features</li>
                    <li>Certificate programs and spiritual development resources</li>
                    <li>Ministry events and community activities</li>
                  </ul>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  3. User Responsibilities
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    As a user of our platform, you agree to:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Provide accurate and complete registration information</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Use the platform in accordance with Christian values and principles</li>
                    <li>Respect other users and maintain appropriate conduct</li>
                    <li>Not share copyrighted course materials without permission</li>
                    <li>Report any technical issues or inappropriate content</li>
                  </ul>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  4. Content Guidelines
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    Users are expected to maintain appropriate conduct. The following content is prohibited:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Profanity, inappropriate language, or offensive content</li>
                    <li>Content that contradicts biblical teachings or Christian values</li>
                    <li>Harassment, discrimination, or harmful behavior toward others</li>
                    <li>Spam, promotional content, or commercial solicitation</li>
                    <li>False or misleading information</li>
                    <li>Content that violates intellectual property rights</li>
                  </ul>
                  <p>
                    <strong>Moderation Policy:</strong> We reserve the right to moderate content and may issue warnings or suspend accounts for violations. Three warnings may result in account suspension.
                  </p>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  5. Intellectual Property Rights
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    All course materials, content, and resources provided by SFGM Boston are protected by copyright and intellectual property laws. You may:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Access and use materials for personal spiritual development</li>
                    <li>Print materials for personal study purposes</li>
                    <li>Share biblical insights gained through study with others</li>
                  </ul>
                  <p>
                    You may not:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Reproduce, distribute, or sell course materials</li>
                    <li>Use materials for commercial purposes without permission</li>
                    <li>Claim authorship of SFGM Boston content</li>
                  </ul>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  6. Account Security
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    You are responsible for maintaining the confidentiality of your account credentials. Please:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Keep your username and password secure</li>
                    <li>Do not share your account with others</li>
                    <li>Notify us immediately of any unauthorized access</li>
                    <li>Update your password regularly</li>
                  </ul>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  7. Course Completion and Certificates
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    Certificate programs require:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Completion of all course modules</li>
                    <li>Passing grades on quizzes and assignments</li>
                    <li>Participation in discussion forums</li>
                    <li>Adherence to Christian conduct standards</li>
                  </ul>
                  <p>
                    Certificates are issued for spiritual development and ministry preparation. They are not accredited academic credentials but represent completion of biblical education through SFGM Boston.
                  </p>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  8. Limitation of Liability
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    SFGM Boston provides educational content for spiritual development. We are not liable for:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Technical issues or platform downtime</li>
                    <li>Loss of data or course progress</li>
                    <li>Indirect or consequential damages</li>
                    <li>Third-party content or external links</li>
                  </ul>
                  <p>
                    Our liability is limited to the extent permitted by law. We provide the platform "as is" and make no warranties about its availability or performance.
                  </p>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  9. Ministry and Spiritual Context
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    SFGM Boston is a Christian ministry organization. Our platform is designed to:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Promote biblical literacy and spiritual growth</li>
                    <li>Provide education based on Christian doctrine</li>
                    <li>Foster community among believers</li>
                    <li>Prepare individuals for ministry service</li>
                  </ul>
                  <p>
                    All content and activities are conducted within the framework of Christian faith and biblical principles.
                  </p>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  10. Termination
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    We reserve the right to terminate or suspend accounts for:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Violation of these terms and conditions</li>
                    <li>Inappropriate conduct or content</li>
                    <li>Failure to complete profile requirements</li>
                    <li>Excessive moderation warnings</li>
                  </ul>
                  <p>
                    You may terminate your account at any time by contacting us. Upon termination, your access to courses and materials will be discontinued.
                  </p>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  11. Changes to Terms
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    We may update these terms and conditions from time to time. Changes will be posted on this page with an updated effective date. Continued use of the platform constitutes acceptance of revised terms.
                  </p>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  12. Contact Information
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    For questions about these terms and conditions, please contact us:
                  </p>
                  <div className="bg-purple-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p><strong>SFGM Boston - Soldiers for God Ministry</strong></p>
                    <p>Pastor Rocky - Lead Pastor</p>
                    <p>Email: <a href="mailto:pastor_rocky@sfgmboston.com" className="text-purple-600 hover:text-purple-800">pastor_rocky@sfgmboston.com</a></p>
                    <p>Phone: <a href="tel:617-512-7451" className="text-purple-600 hover:text-purple-800">617-512-7451</a></p>
                    <p>Website: <a href="https://sfgmboston.com" className="text-purple-600 hover:text-purple-800">https://sfgmboston.com</a></p>
                  </div>
                </div>
              </section>

              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
                  "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight." - Proverbs 3:5-6
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}