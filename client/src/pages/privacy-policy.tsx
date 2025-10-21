import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
              <CardDescription className="text-blue-100">
                SFGM Boston - Soldiers for God Ministry
              </CardDescription>
              <p className="text-sm text-blue-100 mt-2">
                Effective Date: January 1, 2025
              </p>
            </CardHeader>
            
            <CardContent className="p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  1. Information We Collect
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    <strong>Personal Information:</strong> When you register for our Bible School platform, we collect:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>First and last name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Username and password</li>
                    <li>Profile information (optional)</li>
                  </ul>
                  <p>
                    <strong>Usage Information:</strong> We collect information about how you use our platform, including course progress, quiz results, and learning activities.
                  </p>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  2. How We Use Your Information
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>We use your information to:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Provide access to our Bible School courses and materials</li>
                    <li>Track your learning progress and issue certificates</li>
                    <li>Send welcome messages and course notifications</li>
                    <li>Communicate about ministry events and updates</li>
                    <li>Provide customer support and technical assistance</li>
                    <li>Improve our platform and educational content</li>
                  </ul>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  3. Information Sharing
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    We do not sell, trade, or otherwise transfer your personal information to outside parties except:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>To trusted third parties who assist us in operating our website and conducting our ministry</li>
                    <li>When required by law or to protect our rights and safety</li>
                    <li>With your explicit consent</li>
                  </ul>
                  <p>
                    <strong>Ministry Communications:</strong> Your information may be shared with SFGM Boston pastors and ministry leaders for pastoral care and spiritual guidance.
                  </p>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  4. Data Security
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    We implement appropriate security measures to protect your personal information:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Secure encrypted connections (HTTPS)</li>
                    <li>Password protection for all accounts</li>
                    <li>Regular security updates and monitoring</li>
                    <li>Limited access to personal information</li>
                  </ul>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  5. Your Rights
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>You have the right to:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Access and update your personal information</li>
                    <li>Request deletion of your account and data</li>
                    <li>Opt out of non-essential communications</li>
                    <li>Request a copy of your data</li>
                  </ul>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  6. Cookies and Tracking
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    We use cookies and similar technologies to:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Keep you logged in to your account</li>
                    <li>Remember your preferences</li>
                    <li>Analyze website usage and improve our services</li>
                  </ul>
                  <p>
                    You can disable cookies in your browser settings, but some features may not work properly.
                  </p>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  7. Third-Party Services
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    Our platform may use third-party services for:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Email notifications (Mailgun)</li>
                    <li>SMS notifications (TextBelt)</li>
                    <li>AI-powered Bible study tools (DeepSeek)</li>
                    <li>Authentication services (SFGM Boston OAuth)</li>
                  </ul>
                  <p>
                    These services have their own privacy policies and terms of service.
                  </p>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  8. Children's Privacy
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                  </p>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  9. Changes to This Policy
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top.
                  </p>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  10. Contact Information
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    If you have any questions about this Privacy Policy, please contact us:
                  </p>
                  <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p><strong>SFGM Boston - Soldiers for God Ministry</strong></p>
                    <p>Email: <a href="mailto:pastor_rocky@sfgmboston.com" className="text-blue-600 hover:text-blue-800">pastor_rocky@sfgmboston.com</a></p>
                    <p>Phone: <a href="tel:617-512-7451" className="text-blue-600 hover:text-blue-800">617-512-7451</a></p>
                    <p>Website: <a href="https://sfgmboston.com" className="text-blue-600 hover:text-blue-800">https://sfgmboston.com</a></p>
                  </div>
                </div>
              </section>

              <div className="mt-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-sm text-purple-800 dark:text-purple-200 text-center">
                  "For the Lord is good; his mercy is everlasting; and his truth endures to all generations." - Psalm 100:5
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}