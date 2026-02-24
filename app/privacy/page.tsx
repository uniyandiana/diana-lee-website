'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function Privacy() {
  const { language } = useLanguage();

  if (language === 'zh') {
    return (
      <div className="min-h-screen bg-white">
        <section className="section-padding bg-gradient-to-br from-[#F7F9F9] to-[#FFFEFA]">
          <div className="container-custom max-w-4xl">
            <h1 className="mb-6">私隱政策</h1>
            <p className="text-lg text-[#6b7280]">最後更新：{new Date().toLocaleDateString('zh-HK')}</p>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl prose prose-lg">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4">1. 簡介</h2>
            <p className="text-[#6b7280] mb-6">
              Diana Lee（「我們」、「我」）致力保護您的私隱。本私隱政策說明我們如何收集、使用及保護您的個人資料，
              符合英國數據保護法 2018（UK Data Protection Act 2018）及一般數據保護規例（UK GDPR）。
            </p>

            <h2 className="text-2xl font-bold text-[#1f2937] mb-4">2. 我們收集的資料</h2>
            <p className="text-[#6b7280] mb-4">當您使用本網站或聯絡我們時，我們可能會收集以下資料：</p>
            <ul className="list-disc pl-6 text-[#6b7280] mb-6 space-y-2">
              <li><strong>聯絡資料：</strong>姓名、電郵地址（透過聯絡表格提供）</li>
              <li><strong>技術資料：</strong>IP 地址、瀏覽器類型、裝置資訊（自動收集）</li>
              <li><strong>使用資料：</strong>您如何使用本網站的資訊</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#1f2937] mb-4">3. 我們如何使用您的資料</h2>
            <p className="text-[#6b7280] mb-4">我們僅在以下情況下使用您的個人資料：</p>
            <ul className="list-disc pl-6 text-[#6b7280] mb-6 space-y-2">
              <li>回覆您的查詢和聯絡請求</li>
              <li>提供您所要求的服務</li>
              <li>改善網站功能和用戶體驗</li>
              <li>遵守法律義務</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#1f2937] mb-4">4. Cookies</h2>
            <p className="text-[#6b7280] mb-6">
              本網站僅使用必要的 cookies 以確保網站正常運作。我們不使用任何追蹤、分析或行銷 cookies。
              必要 cookies 包括語言偏好設定和 cookie 同意選擇的儲存。
            </p>

            <h2 className="text-2xl font-bold text-[#1f2937] mb-4">5. 資料保留</h2>
            <p className="text-[#6b7280] mb-6">
              我們只會在必要的期間內保留您的個人資料。聯絡表格提交的資料將在回覆您的查詢後保留最多 2 年，
              除非您要求我們提早刪除。
            </p>

            <h2 className="text-2xl font-bold text-[#1f2937] mb-4">6. 您的權利</h2>
            <p className="text-[#6b7280] mb-4">根據 UK GDPR，您擁有以下權利：</p>
            <ul className="list-disc pl-6 text-[#6b7280] mb-6 space-y-2">
              <li><strong>存取權：</strong>要求查閱我們持有的您的個人資料</li>
              <li><strong>更正權：</strong>要求更正不準確的資料</li>
              <li><strong>刪除權：</strong>要求刪除您的個人資料</li>
              <li><strong>限制處理權：</strong>要求限制我們如何使用您的資料</li>
              <li><strong>資料可攜權：</strong>以結構化、常用的格式接收您的資料</li>
              <li><strong>反對權：</strong>反對我們處理您的資料</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#1f2937] mb-4">7. 資料安全</h2>
            <p className="text-[#6b7280] mb-6">
              我們已實施適當的技術和組織措施，以保護您的個人資料免受未經授權的存取、更改、披露或破壞。
            </p>

            <h2 className="text-2xl font-bold text-[#1f2937] mb-4">8. 第三方服務</h2>
            <p className="text-[#6b7280] mb-6">
              我們的網站由 Vercel 託管。我們不與第三方共用您的個人資料作行銷用途。
              如果使用第三方服務（如電郵服務供應商）來回覆您的查詢，我們會確保他們遵守 UK GDPR 要求。
            </p>

            <h2 className="text-2xl font-bold text-[#1f2937] mb-4">9. 國際資料傳輸</h2>
            <p className="text-[#6b7280] mb-6">
              您的資料可能會被傳輸到英國以外的地方並在該處處理。我們會確保所有資料傳輸均符合 UK GDPR 要求，
              並採取適當的保障措施。
            </p>

            <h2 className="text-2xl font-bold text-[#1f2937] mb-4">10. 兒童私隱</h2>
            <p className="text-[#6b7280] mb-6">
              本網站不針對 13 歲以下兒童。我們不會故意收集 13 歲以下兒童的個人資料。
            </p>

            <h2 className="text-2xl font-bold text-[#1f2937] mb-4">11. 政策更新</h2>
            <p className="text-[#6b7280] mb-6">
              我們可能會不時更新本私隱政策。任何更改將會在本頁面發布，重大更改會以更顯眼的方式通知您。
            </p>

            <h2 className="text-2xl font-bold text-[#1f2937] mb-4">12. 聯絡我們</h2>
            <p className="text-[#6b7280] mb-4">
              如對本私隱政策有任何疑問，或希望行使您的權利，請聯絡：
            </p>
            <p className="text-[#6b7280] mb-6">
              <strong>Diana Lee</strong><br />
              電郵：[您的電郵地址]<br />
              地點：英國牛津
            </p>

            <h2 className="text-2xl font-bold text-[#1f2937] mb-4">13. 向監管機構投訴</h2>
            <p className="text-[#6b7280] mb-6">
              如您認為我們未有妥善處理您的個人資料，您有權向英國資訊專員辦公室（ICO）投訴：<br />
              網站：<a href="https://ico.org.uk" className="text-[#5A9AB4] hover:text-[#3E7C92] underline" target="_blank" rel="noopener noreferrer">https://ico.org.uk</a><br />
              電話：0303 123 1113
            </p>
          </div>
        </section>
      </div>
    );
  }

  // English version
  return (
    <div className="min-h-screen bg-white">
      <section className="section-padding bg-gradient-to-br from-[#F7F9F9] to-[#FFFEFA]">
        <div className="container-custom max-w-4xl">
          <h1 className="mb-6">Privacy Policy</h1>
          <p className="text-lg text-[#6b7280]">Last updated: {new Date().toLocaleDateString('en-GB')}</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl prose prose-lg">
          <h2 className="text-2xl font-bold text-[#1f2937] mb-4">1. Introduction</h2>
          <p className="text-[#6b7280] mb-6">
            Diana Lee ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains how we collect,
            use, and safeguard your personal data in compliance with the UK Data Protection Act 2018 and the UK General Data
            Protection Regulation (UK GDPR).
          </p>

          <h2 className="text-2xl font-bold text-[#1f2937] mb-4">2. Information We Collect</h2>
          <p className="text-[#6b7280] mb-4">When you use our website or contact us, we may collect:</p>
          <ul className="list-disc pl-6 text-[#6b7280] mb-6 space-y-2">
            <li><strong>Contact Information:</strong> Name, email address (when you submit a contact form)</li>
            <li><strong>Technical Data:</strong> IP address, browser type, device information (collected automatically)</li>
            <li><strong>Usage Data:</strong> Information about how you use our website</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#1f2937] mb-4">3. How We Use Your Information</h2>
          <p className="text-[#6b7280] mb-4">We use your personal data only for:</p>
          <ul className="list-disc pl-6 text-[#6b7280] mb-6 space-y-2">
            <li>Responding to your inquiries and contact requests</li>
            <li>Providing services you've requested</li>
            <li>Improving our website functionality and user experience</li>
            <li>Complying with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#1f2937] mb-4">4. Cookies</h2>
          <p className="text-[#6b7280] mb-6">
            This website uses only essential cookies necessary for the site to function properly. We do not use any
            tracking, analytics, or marketing cookies. Essential cookies include storing your language preference
            and cookie consent choice.
          </p>

          <h2 className="text-2xl font-bold text-[#1f2937] mb-4">5. Data Retention</h2>
          <p className="text-[#6b7280] mb-6">
            We retain your personal data only for as long as necessary. Contact form submissions are kept for up to 2 years
            after responding to your inquiry, unless you request earlier deletion.
          </p>

          <h2 className="text-2xl font-bold text-[#1f2937] mb-4">6. Your Rights</h2>
          <p className="text-[#6b7280] mb-4">Under UK GDPR, you have the right to:</p>
          <ul className="list-disc pl-6 text-[#6b7280] mb-6 space-y-2">
            <li><strong>Access:</strong> Request copies of your personal data</li>
            <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
            <li><strong>Erasure:</strong> Request deletion of your personal data</li>
            <li><strong>Restrict Processing:</strong> Request limitation on how we use your data</li>
            <li><strong>Data Portability:</strong> Receive your data in a structured, commonly used format</li>
            <li><strong>Object:</strong> Object to our processing of your data</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#1f2937] mb-4">7. Data Security</h2>
          <p className="text-[#6b7280] mb-6">
            We have implemented appropriate technical and organisational measures to protect your personal data against
            unauthorised access, alteration, disclosure, or destruction.
          </p>

          <h2 className="text-2xl font-bold text-[#1f2937] mb-4">8. Third-Party Services</h2>
          <p className="text-[#6b7280] mb-6">
            Our website is hosted on Vercel. We do not share your personal data with third parties for marketing purposes.
            When using third-party services (such as email service providers) to respond to your inquiries, we ensure they
            comply with UK GDPR requirements.
          </p>

          <h2 className="text-2xl font-bold text-[#1f2937] mb-4">9. International Data Transfers</h2>
          <p className="text-[#6b7280] mb-6">
            Your data may be transferred to and processed in countries outside the UK. We ensure all data transfers comply
            with UK GDPR requirements and have appropriate safeguards in place.
          </p>

          <h2 className="text-2xl font-bold text-[#1f2937] mb-4">10. Children's Privacy</h2>
          <p className="text-[#6b7280] mb-6">
            Our website is not directed at children under 13. We do not knowingly collect personal data from children under 13.
          </p>

          <h2 className="text-2xl font-bold text-[#1f2937] mb-4">11. Changes to This Policy</h2>
          <p className="text-[#6b7280] mb-6">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page, and significant
            changes will be communicated more prominently.
          </p>

          <h2 className="text-2xl font-bold text-[#1f2937] mb-4">12. Contact Us</h2>
          <p className="text-[#6b7280] mb-4">
            For questions about this Privacy Policy or to exercise your rights, please contact:
          </p>
          <p className="text-[#6b7280] mb-6">
            <strong>Diana Lee</strong><br />
            Email: [Your Email Address]<br />
            Location: Oxford, United Kingdom
          </p>

          <h2 className="text-2xl font-bold text-[#1f2937] mb-4">13. Complaints to Regulator</h2>
          <p className="text-[#6b7280] mb-6">
            If you believe we have not handled your personal data properly, you have the right to lodge a complaint with
            the Information Commissioner's Office (ICO):<br />
            Website: <a href="https://ico.org.uk" className="text-[#5A9AB4] hover:text-[#3E7C92] underline" target="_blank" rel="noopener noreferrer">https://ico.org.uk</a><br />
            Telephone: 0303 123 1113
          </p>
        </div>
      </section>
    </div>
  );
}
