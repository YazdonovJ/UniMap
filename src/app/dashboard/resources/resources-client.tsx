/* eslint-disable react/no-unescaped-entities */
"use client";

import { useMemo, useState } from "react";
import { Search, ExternalLink, BookOpen } from "lucide-react";
import "./resources.css";

/* ── Types ── */
type Category = "all" | "usa" | "europe" | "asia";

interface Resource {
    id: string;
    title: string;
    description: string;
    category: Exclude<Category, "all">;
    emoji: string;
    accentColor: string;
    url?: string;
    videos?: { title: string; url: string }[];
    content?: React.ReactNode;
}

/* ── Curated Resources ── */
const RESOURCES: Resource[] = [
    {
        id: "1", title: "Common App Essay Strategies",
        description: "Step-by-step guide to crafting a compelling personal statement for US admissions.",
        category: "usa", emoji: "🇺🇸", accentColor: "#4f46e5",
        videos: [
            { title: "Watch it before writing your essay", url: "https://www.youtube.com/embed/2meKwMIWGlw" },
            { title: "3 tips for writing a memorable Common App essay", url: "https://www.youtube.com/embed/ZoF6Cq4Itms" },
            { title: "How to hook your reader", url: "https://www.youtube.com/embed/8_-C9B4GxR0" },
            { title: "How to brainstorm an essay topic", url: "https://www.youtube.com/embed/Dz9aqJWIlOE" },
            { title: "The worst kind of college essays", url: "https://www.youtube.com/embed/ktuNKGnqjr4" },
            { title: "How to write an awesome college essay on a common topic", url: "https://www.youtube.com/embed/2-Sf20y72P0" }
        ],
    },

    {
        id: "asia-china", title: "Study in China",
        description: "Complete guide to Chinese Government Scholarships (Type A & B) and elite university awards.",
        category: "asia", emoji: "🇨🇳", accentColor: "#de2910",
        content: (
            <div className="res-article-content">
                <h3>1. Chinese Government Scholarship (CSC) - Type A (Bilateral Program)</h3>
                <p><strong>How it works:</strong> The Type A scholarship is a state-to-state agreement. For you, this means the quota is allocated specifically to the Republic of Uzbekistan. You do not apply for the scholarship directly to the university; instead, you apply through the dispatching authority in your home country, which is typically the Ministry of Higher Education, Science and Innovation of the Republic of Uzbekistan or the Embassy of China in Uzbekistan (the specific CSC Agency Number for the Chinese Embassy in Uzbekistan is 8601).</p>
                <p><strong>Application Strategy for Uzbek Students:</strong> While you apply for the funding via the Embassy, you must still secure admission to a university. You must independently contact Chinese universities that offer your desired English-taught program and obtain a Pre-Admission Letter. Submitting this letter to the Embassy alongside your CSC Type A application virtually guarantees you will be placed at that specific university.</p>
                <p><strong>Eligible Degree Levels:</strong> Bachelor's, Master's, and Doctoral programs.</p>
                <p><strong>Universities accepting CSC Type A (English-Taught):</strong> Because Type A is centrally administered, you can use this scholarship at any of the 289 CSC-designated universities, provided they offer your major in English and give you a Pre-Admission Letter. Top choices offering English tracks include:</p>
                <ul>
                    <li><strong>Tsinghua University</strong> (Requires applying early for pre-admission to secure the Type A nomination)</li>
                    <li><strong>Peking University</strong> (Offers several Master's programs entirely in English without Chinese requirements)</li>
                    <li><strong>Zhejiang University</strong> (Offers English-taught postgraduate programs under Type A)</li>
                    <li><strong>Wuhan University of Technology</strong> (Offers specific majors in English under the Bilateral Program)</li>
                    <li><strong>Beijing Normal University</strong> (Offers English-taught programs for Type A)</li>
                </ul>

                <h3>2. Chinese Government Scholarship (CSC) - Type B (Chinese University Program &amp; Silk Road Program)</h3>
                <p><strong>How it works:</strong> Type B scholarships are decentralized. You apply directly to the target Chinese university, bypassing the Embassy in Uzbekistan entirely. The university evaluates your academic profile, conducts interviews, and directly nominates you to the China Scholarship Council for the final award.</p>
                <p><strong>The "Silk Road" Program Advantage:</strong> As a citizen of Uzbekistan, you are highly sought after for a sub-category of Type B called the Silk Road Program. This initiative is explicitly designed to recruit top talent from Belt and Road countries (which includes Uzbekistan) for critical fields like engineering, business, artificial intelligence, and project management.</p>
                <p><strong>Eligible Degree Levels:</strong> Historically, standard Type B programs are restricted to Master's and Doctoral students. However, certain universities offering the Silk Road Program do have quotas for Bachelor's degree students as well.</p>
                <p><strong>Universities offering CSC Type B &amp; Silk Road (English-Taught):</strong> When applying, you must use the specific university's CSC Agency Number.</p>
                <ul>
                    <li><strong>University of Electronic Science and Technology of China (UESTC):</strong> Highly recommended for English-taught STEM graduate programs. (Agency No: 10614)</li>
                    <li><strong>Central South University:</strong> Offers Silk Road scholarships for Master's and PhDs in English (e.g., Mining, Mechanical, Electrical Engineering). Requires IELTS 6.0 or TOEFL 85. (Agency No: 10533)</li>
                    <li><strong>Shanghai University of Finance and Economics (SUFE):</strong> Offers English-taught Master's and PhDs. Requires TOEFL 80 or IELTS 6.5.</li>
                    <li><strong>Sun Yat-sen University:</strong> Offers the Silk Road program for English-taught degrees focusing on green development, digital economy, and tech.</li>
                    <li><strong>China University of Mining and Technology (CUMT):</strong> Specifically targets Uzbek students for English-taught Master's/PhDs in Mining, Safety Science, and Mechanical Engineering.</li>
                    <li><strong>University of International Business and Economics (UIBE):</strong> Offers a 2-year English-taught Master's in International Business and Customs Management under the Silk Road program. (Agency No: 10036)</li>
                    <li><strong>Yunnan University of Finance and Economics:</strong> Offers an English-taught Master's in Project Management specifically for the Silk Road program.</li>
                </ul>

                <h3>3. University-Specific and Local Government Scholarships</h3>
                <p><strong>How it works:</strong> If you do not secure a national CSC scholarship, China's wealthy municipal governments and elite universities offer massive independent endowments. These are often identical in value to the CSC (covering 100% of tuition, accommodation, insurance, and providing a monthly stipend of 2,500 to 3,500 RMB). You apply for these directly through the university's own application portal.</p>

                <h4>Major Frameworks &amp; Universities:</h4>
                <p><strong>Shanghai Government Scholarship (SGS) - Class A (Full Scholarship):</strong> Covers full tuition, accommodation, comprehensive insurance, and a monthly living allowance. It heavily targets English-speaking international students.</p>
                <ul>
                    <li><strong>East China Normal University (ECNU):</strong> Offers English-taught programs requiring IELTS 6.0 or TOEFL 80.</li>
                    <li><strong>Shanghai Normal University (SHNU):</strong> Offers English-taught Bachelor's, Master's, and PhDs.</li>
                    <li><strong>Fudan University &amp; Shanghai Jiao Tong University:</strong> Both accept the SGS for their extensive portfolios of English-taught graduate programs.</li>
                </ul>
                <p><strong>Beijing Government Scholarship (BGS):</strong> Usually covers full tuition (Type A/B) and sometimes accommodation/stipends.</p>
                <ul>
                    <li><strong>Beijing Institute of Technology (BIT):</strong> Offers the BGS for their English-taught programs. You apply directly to BIT; native English speakers or those with IELTS/TOEFL can bypass Chinese requirements.</li>
                    <li><strong>Beijing Normal University:</strong> Awards the BGS to outstanding new international students.</li>
                </ul>

                <h4>Elite Institutional Scholarships (100% University Funded):</h4>
                <ul>
                    <li><strong>Southern University of Science and Technology (SUSTech):</strong> Located in Shenzhen, this is a premier STEM university. Their Bachelor's programs are fully taught in English (no Chinese required). They offer the "President Scholarship," which provides 68,400 RMB per year (covering tuition, dorm, insurance, and living expenses). They accept SAT, ACT, A-Levels, or IB scores alongside an IELTS/TOEFL.</li>
                    <li><strong>Westlake University:</strong> A highly elite, research-focused university in Hangzhou where all classes are taught in English. They offer the "Westlake Undergraduate Tuition Scholarship" (a full ride) for exceptional international students based on merit and need. Requires TOEFL 95 or IELTS 6.5.</li>
                </ul>
            </div>
        )
    },
    {
        id: "asia-skorea", title: "Study in South Korea",
        description: "Comprehensive guide to GKS, KAIST, SNU, Yonsei, and other top Korean university scholarships.",
        category: "asia", emoji: "🇰🇷", accentColor: "#cd2e3a",
        content: (
            <div className="res-article-content">
                <h3>1. The Global Korea Scholarship (GKS) - Type A &amp; Type B</h3>
                <p><strong>How it works:</strong> This is the flagship fully funded scholarship from the Korean government covering 100% of tuition, round-trip airfare, medical insurance, and a monthly stipend of 1,000,000+ KRW.</p>
                <p><strong>The Language Catch:</strong> Even if you apply for an English-taught major, the GKS requires you to spend your first year in Korea studying the Korean language full-time. You must achieve a TOPIK (Test of Proficiency in Korean) Level 3 before you are allowed to begin your university degree.</p>
                <ul>
                    <li><strong>Type A (Embassy Track):</strong> You apply through the Korean Embassy in Tashkent. You can pick up to 3 universities, but at least one must be a regional (Type B) university.</li>
                    <li><strong>Type B (University Track):</strong> You apply directly to a single Korean university. This is highly recommended for English speakers as you can directly target universities known for strong English tracks.</li>
                </ul>
                <p><strong>Participating Universities:</strong> Over 80 institutions, including Seoul National University (SNU), Korea University, Yonsei University, Ajou University, KAIST, and POSTECH.</p>

                <h3>2. SNU President Fellowship (Seoul National University)</h3>
                <p><strong>How it works:</strong> This is a highly specific, prestigious Ph.D. scholarship. It is explicitly designed for faculty members of universities in developing countries (which includes Uzbekistan) who do not currently hold a Ph.D.</p>
                <p><strong>Benefits:</strong> It provides a full tuition fee waiver for six semesters, a monthly stipend of 1,500,000 to 2,000,000 KRW for 3-4 years, round-trip airfare, and health insurance.</p>
                <p><strong>For Uzbeks:</strong> If you are currently a university lecturer or teaching assistant in Uzbekistan looking to do your Ph.D. in English at SNU, this is the perfect route.</p>

                <h3>3. KU International Scholarships (Korea University)</h3>
                <p><strong>How it works:</strong> Korea University offers internal merit-based scholarships for international students.</p>
                <p><strong>Benefits &amp; Requirements:</strong> They offer 100% tuition waivers for top-tier international applicants. Because Korea University has a massive portfolio of English-taught business, international studies, and humanities programs, you are evaluated based on your high school/bachelor's GPA and your English proficiency scores (TOEFL/IELTS).</p>

                <h3>4. UIC Admissions Scholarship (Yonsei University)</h3>
                <p><strong>How it works:</strong> The Underwood International College (UIC) at Yonsei University is Korea’s first 100% English-language liberal arts college. You do not need to know a single word of Korean to study here.</p>
                <p><strong>Application &amp; Benefits:</strong> You do not need to submit a separate scholarship application. Every international applicant is automatically considered. They award 100%, 50%, or 33% tuition waivers for the full 4 years based entirely on academic merit.</p>
                <p><strong>Requirements:</strong> You must submit a TOEFL iBT or IELTS score. For a 100% scholarship, submitting top-tier standardized test scores (like a high SAT, ACT, or IB Diploma) is practically required to beat the competition.</p>

                <h3>5. KAIST International Student Scholarship</h3>
                <p><strong>How it works:</strong> KAIST is Korea's equivalent to MIT and teaches its STEM degrees entirely in English. You do not need Korean for admission.</p>
                <p><strong>Benefits:</strong> Full tuition waiver, a monthly living allowance, and national health insurance.</p>
                <p><strong>Requirements:</strong> You must submit proof of English proficiency (TOEFL iBT 83 or IELTS 6.5). While they say standardized tests are "optional," to win this full ride, submitting an elite SAT, AP, IB, or ACT score is heavily recommended. Note: You will need to take basic Korean classes during your degree to graduate.</p>

                <h3>6. POSTECH Full Tuition Waiver</h3>
                <p><strong>How it works:</strong> Another globally elite STEM institution where classes can be taken in English.</p>
                <p><strong>Benefits:</strong> All admitted international undergraduate students receive a 100% tuition waiver for their first semester, which is renewable for 8 semesters as long as you maintain a 3.0/4.3 GPA.</p>
                <p><strong>Extra Funding:</strong> POSTECH also provides a guaranteed 500,000 KRW monthly living allowance for international students (with no GPA requirement for the allowance) and an arrival scholarship of up to 2,500,000 KRW to cover your flight from Uzbekistan.</p>

                <h3>7. SKKU Merit Awards (Sungkyunkwan University)</h3>
                <p><strong>How it works:</strong> SKKU is heavily backed by the Samsung Corporation and offers massive financial aid.</p>
                <p><strong>Benefits:</strong> Freshmen can receive a 10% to 100% tuition waiver for their first semester based on their admission evaluation. From the second semester onward, you can receive a 30% to 70% waiver based strictly on your university GPA.</p>
                <p><strong>English Track:</strong> SKKU has dedicated "English Tracks" (like Global Economics or Global Business). You must apply with a minimum TOEFL iBT 90 or IELTS 6.5.</p>

                <h3>8. Hanyang International Excellence</h3>
                <p><strong>How it works:</strong> Hanyang University offers the Hanyang International Scholarship Program (HISP) for new students, providing 50%, 70%, or 100% tuition waivers based on your application documents.</p>
                <p><strong>The Catch for English Speakers:</strong> To receive continuing scholarships during your studies (the HIEA award), Hanyang actually requires international students to possess a valid TOPIK (Korean language) certificate and a 3.0 GPA. So, while you can enter an English program, you will be highly incentivized to learn Korean to keep your funding.</p>

                <h3>9. Ewha Global Partnership Program (EGPP)</h3>
                <p><strong>How it works:</strong> Ewha is the world's largest female-only university. The EGPP is explicitly designed for female students from developing countries (Uzbek citizens are highly encouraged to apply) who show strong leadership potential.</p>
                <p><strong>Benefits:</strong> It covers 100% of your tuition, your on-campus dormitory fees, and provides a living stipend. You can use this for their English-taught undergraduate and graduate programs.</p>

                <h3>10, 11, &amp; 12. The Elite Science Institutes (UNIST, DGIST, GIST)</h3>
                <p><strong>How it works:</strong> Like KAIST and POSTECH, these three national institutes operate entirely in English.</p>
                <ul>
                    <li><strong>UNIST:</strong> Offers full tuition and stipends for STEM students.</li>
                    <li><strong>DGIST Presidential Award:</strong> Offers a single, department-free undergraduate college where everything is delivered in English. Admitted students receive full tuition exemption and a monthly living allowance.</li>
                    <li><strong>GIST Scholarship:</strong> Offers generous full tuition and stipends for both undergraduate and graduate research in engineering and sciences.</li>
                </ul>

                <h3>13. Ajou International Scholarship</h3>
                <p><strong>How it works:</strong> Ajou University is famous for engineering and business and operates an excellent English track.</p>
                <p><strong>Benefits:</strong> The "Ajou Academic Excellence 1" scholarship offers a 100% full tuition waiver. They also offer a "Cheer Up Scholarship" which provides 1,000,000 KRW for living expenses.</p>
                <p><strong>English Track:</strong> They recently launched a 100% English-taught Undergraduate Program in International Business. To qualify for the top scholarships without Korean, you must submit an IELTS 6.5 or TOEFL iBT 80.</p>
            </div>
        )
    },
    {
        id: "asia-japan", title: "Study in Japan",
        description: "MEXT Scholarship Guide, UTokyo Fellowship, and English-taught programs in Japan.",
        category: "asia", emoji: "🇯🇵", accentColor: "#bc002d",
        content: (
            <div className="res-article-content">
                <h3>1. Japanese Government (MEXT) Scholarship</h3>
                <p><strong>How it works for English Speakers:</strong> MEXT is the flagship full-ride scholarship covering 100% of tuition, round-trip airfare, and a monthly stipend (approx. 117,000 JPY for undergraduates and 144,000+ JPY for graduates). However, the standard MEXT route requires a 1-year intensive Japanese language preparatory course.</p>
                <ul>
                    <li><strong>The Embassy Track "Direct Placement" Loophole:</strong> If you apply through the Japanese Embassy in Uzbekistan, you can specifically request "Direct Placement." This allows you to skip the 1-year Japanese language course and immediately enter a university that offers your major entirely in English.</li>
                    <li><strong>The University Track (Highly Recommended):</strong> You apply directly to a Japanese university for an English-taught program. If the university accepts you, they recommend you to the Japanese government for the MEXT scholarship. This is the safest route for English-only students.</li>
                </ul>
                <p><strong>Universities:</strong> Almost all top national universities (University of Tokyo, Kyoto University, Tohoku University, Kyushu University, etc.) accept MEXT scholars for their English-taught graduate programs.</p>

                <h3>2. UTokyo Fellowship (The University of Tokyo)</h3>
                <p><strong>How it works:</strong> The University of Tokyo (UTokyo) is Japan's #1 ranked university. They offer an elite English-taught undergraduate framework called PEAK (Programs in English at Komaba), which includes degrees in "Japan in East Asia" and "Environmental Sciences". You do not need to speak Japanese to apply.</p>
                <p><strong>The Scholarship:</strong> The University of Tokyo Scholarship for PEAK students is a 4-year award offered to exceptional candidates. It covers the university admission fee, 100% of tuition fees, and provides a monthly living stipend of 126,000 JPY.</p>
                <p><strong>Requirements for Uzbeks:</strong> You will need a stellar high school transcript, an excellent SAT/ACT/IB score, and a high TOEFL/IELTS score. You are evaluated automatically for this fellowship when you apply to the PEAK program; no separate application is needed.</p>

                <h3>3. Global 30 (G30) Undergraduate Scholarship (Nagoya University)</h3>
                <p><strong>How it works:</strong> Nagoya University operates the G30 International Programs, which offer bachelor's, master's, and doctoral degrees 100% in English (fields include Automotive Engineering, Physics, Chemistry, Biological Sciences, and Social Sciences).</p>
                <p><strong>The Scholarship:</strong> Nagoya University offers a specific G30 Undergraduate Scholarship that provides a 100% tuition waiver and an annual stipend of 500,000 JPY for living expenses.</p>
                <p><strong>Requirements for Uzbeks:</strong> When you apply online to the G30 program, you submit a scholarship application form alongside it. You must submit an IELTS (minimum 6.0), TOEFL iBT (minimum 80), or Duolingo (minimum 110). For undergraduate admission, submitting an SAT, ACT, or IB score is required to prove your academic competence.</p>

                <h3>4. FGL / IGPAS Special Programs (Tohoku University)</h3>
                <p><strong>How it works:</strong> Tohoku University is a premier science and engineering hub. They have designated English programs that have "priority placement" for the MEXT University Recommendation Scholarship.</p>
                <ul>
                    <li><strong>For Undergraduates (FGL):</strong> The Future Global Leadership (FGL) program offers Bachelor's degrees in Science, Engineering, and Agriculture.</li>
                    <li><strong>For Graduates (IGPAS):</strong> The International Graduate Program for Advanced Science (IGPAS) offers Master's and PhD degrees.</li>
                </ul>
                <p><strong>Benefits:</strong> If accepted into these programs, outstanding students are directly nominated for the full MEXT scholarship (100% tuition, airfare, and monthly stipend).</p>

                <h3>5. APU Tuition Reduction Scholarship (Ritsumeikan Asia Pacific University)</h3>
                <p><strong>How it works:</strong> Located in Oita, APU is arguably the most international campus in Japan. You can complete your degree (like Asia Pacific Studies or International Management) entirely in English.</p>
                <p><strong>The Scholarship:</strong> During your online application, you are automatically evaluated for the APU Tuition Reduction Scholarship, which awards 30%, 50%, 65%, 80%, or 100% tuition coverage for the standard four years until graduation.</p>
                <p><strong>Why it's great for Uzbeks:</strong> APU is slightly more flexible than UTokyo or Nagoya. While SATs are helpful, they focus heavily on your high school grades, English proficiency, and an online interview to determine your scholarship tier. Note: This scholarship strictly covers tuition. You will need to cover your own living expenses, though some housing grants for the on-campus AP House dorms exist.</p>

                <h3>6. Internal Merit Awards (Elite Private Universities: Keio, Waseda, Sophia)</h3>
                <p>Japan’s top private universities in Tokyo offer incredible English-medium programs and possess massive private endowments to fund international students.</p>

                <h4>Keio University (PEARL &amp; GIGA Programs):</h4>
                <p>Keio offers the PEARL program (Economics) and the GIGA program (Environment and Information Studies) 100% in English.</p>
                <p><strong>Scholarships:</strong> The GIGA program offers full-ride scholarships (covering tuition and stipends) exclusively for international students, evaluated before enrollment. They also offer the Yamaoka Kenichi Memorial Scholarship for Asian nationals, which awards up to 900,000 JPY per year.</p>
                <p><strong>Requirements:</strong> Keio requires top-tier SAT scores (e.g., 1300–1450+ depending on the college) and a high TOEFL score.</p>

                <h4>Waseda University:</h4>
                <p>Waseda offers English-based undergraduate degrees in Political Science/Economics (EDESSA), Social Sciences (TAISI), Liberal Studies (SILS), and Engineering.</p>
                <p><strong>Scholarships:</strong> They offer 50% tuition-waiver scholarships and the Azusa Ono Memorial Scholarship (360,000 JPY) for incoming international students. Waseda relies heavily on SAT/ACT/IB scores for admission.</p>

                <h4>Sophia University:</h4>
                <p>Offers English-taught programs in Liberal Arts, Sustainable Futures (SPSF), and Green Science/Engineering.</p>
                <p><strong>Scholarships:</strong> They offer the "Sophia University New Student Scholarship" (covers 1/3, 1/2, or 100% of tuition) and the "Adachi Scholarship" (covers 100% tuition plus the education enhancement fee).</p>
                <p><strong>Requirements:</strong> Must prove financial hardship, possess excellent academic grades, and submit TOEFL/IELTS alongside standardized tests.</p>
            </div>
        )
    },
    {
        id: "asia-singapore", title: "Study in Singapore",
        description: "Guide to NUS, NTU, SMU, and A*STAR scholarships including the MOE Tuition Grant.",
        category: "asia", emoji: "🇸🇬", accentColor: "#ed2939",
        content: (
            <div className="res-article-content">
                <h3>1. Ministry of Education (MOE) Tuition Grant Scheme</h3>
                <p><strong>How it works:</strong> This is the foundation of almost all undergraduate financial aid in Singapore. It is a massive government subsidy that reduces the base cost of your university tuition.</p>
                <p><strong>Is it a 100% Scholarship?</strong> No. On its own, it only pays for a portion of your tuition. However, to receive the 100% university-specific scholarships (like the NUS International or Nanyang Scholarship), you are legally required to accept the MOE Tuition Grant first.</p>
                <p><strong>The Catch (The Bond):</strong> By accepting this grant (and by extension, the full scholarships attached to it), international students are legally bound by a contract to work for a Singapore-registered company for exactly three years immediately after graduating. If you break this bond, you must pay liquidated damages (repaying the grant with interest).</p>
                <p><strong>Participating Universities:</strong> NUS, NTU, SMU, SUTD, SIT, and SUSS.</p>

                <h3>2. NUS International Undergraduate Scholarship</h3>
                <p><strong>How it works:</strong> This is the flagship undergraduate "full ride" at the National University of Singapore (NUS) for international students.</p>
                <p><strong>Benefits:</strong> It covers 100% of your subsidized tuition fees, provides an annual living allowance of S$5,800, an annual accommodation allowance of S$5,000, and a one-time computer grant of S$1,750.</p>
                <p><strong>For Uzbek Students:</strong> You are highly eligible. You do not need to submit a separate application; when you apply for undergraduate admission to NUS, you are automatically considered based on your academic merit.</p>
                <p><strong>Requirements:</strong> You must possess outstanding high school grades and a stellar co-curricular activities record. For an Uzbek student taking local high school exams, submitting elite SAT/ACT and IELTS/TOEFL scores is virtually mandatory to prove your academic standing against global competition. You must serve the 3-year MOE work bond.</p>

                <h3>3. NUS Science &amp; Technology Undergraduate Scholarship</h3>
                <p><strong>For Uzbek Students:</strong> Because you are from Uzbekistan (an Asian country), you are eligible for the S&amp;T Scholarship. It covers 100% tuition, a S$6,000 annual living allowance, S$2,000 for a computer, and subsidized housing.</p>
                <p><strong>The catch:</strong> It is only for Computing, Engineering, or Science degrees, and it requires a 6-year work bond in Singapore after graduation.</p>

                <h3>4. Singapore International Graduate Award (SINGA)</h3>
                <p><strong>How it works:</strong> If you decide to pursue a Ph.D. or an Engineering Doctorate (EngD), this is one of the best scholarships in the world. It is funded by the Singapore government (A*STAR).</p>
                <p><strong>Benefits:</strong> It covers 100% of your tuition fees for 4 years, provides a monthly living stipend of S$2,200 (which increases to S$2,700 after you pass your qualifying exams), a S$1,500 airfare grant, and a S$1,000 settling-in allowance.</p>
                <p><strong>For Uzbek Students:</strong> You are highly eligible. This is specifically designed for international graduates studying in Singapore for the first time.</p>
                <p><strong>Requirements:</strong> You must have a Bachelor's or Master's degree with excellent grades, a strong passion for research (proven via a research proposal), two excellent academic reference letters, and high English proficiency (IELTS/TOEFL). Notably, there is no post-graduation work bond for SINGA.</p>
                <p><strong>Participating Universities:</strong> You can do your PhD at NUS, NTU, SMU, SUTD, or A*STAR Research Institutes.</p>

                <h3>5. Nanyang Scholarship (NTU)</h3>
                <p><strong>How it works:</strong> Nanyang Technological University (NTU) offers this as their premier undergraduate award.</p>
                <p><strong>Benefits:</strong> 100% tuition coverage, S$6,500 annual living allowance, S$2,000 annual accommodation allowance, a S$2,000 computer allowance, and an impressive travel grant of up to S$8,000 for an overseas study program.</p>
                <p><strong>For Uzbek Students:</strong> You are eligible. Unlike NUS, NTU requires you to submit a separate scholarship application (including a 250-word personal essay) immediately after applying for admission.</p>
                <p><strong>Requirements:</strong> You must maintain a 3.5/5.0 CGPA during your studies and take on an ambassadorial role for the university. You will be subject to the 3-year MOE work bond.</p>

                <h3>6. NTU President Award &amp; NPGS</h3>
                <ul>
                    <li><strong>Undergraduate (NTU President Award):</strong> An elite undergraduate award focusing heavily on exceptional leadership qualities. However, it heavily favors students taking the Singapore A-Levels or the IB Diploma.</li>
                    <li><strong>Graduate (Nanyang President's Graduate Scholarship - NPGS):</strong> If you are applying for a Ph.D., this is a highly prestigious award with no service bond. It provides a massive monthly stipend of S$4,300 for international students, plus allowances for overseas conferences, books, and thesis writing. You must hold a Bachelor's degree with Highest Distinction (or equivalent) to compete.</li>
                </ul>

                <h3>7. Lee Kong Chian Scholars' Programme (SMU)</h3>
                <p><strong>How it works:</strong> Singapore Management University (SMU) is an elite business and social sciences university. This is their top undergraduate award.</p>
                <p><strong>Benefits:</strong> 4 years of full tuition waiver, an S$1,800 notebook grant, S$5,000 annual living allowance, and a massive S$16,000 Global Opportunities grant to fund overseas exchanges or study missions.</p>
                <p><strong>For Uzbek Students:</strong> You are eligible.</p>
                <p><strong>Requirements:</strong> SMU relies heavily on standardized testing. You must submit a minimum SAT score of 1350 (with strict sub-scores) or an ACT of 29, alongside high IELTS/TOEFL scores. If selected, you are required to enroll in a double degree program, or a single degree with a mandatory second major.</p>
            </div>
        )
    },
    {
        id: "asia-malaysia", title: "Study in Malaysia",
        description: "Malaysia International Scholarship (MIS) and top university awards for international students.",
        category: "asia", emoji: "🇲🇾", accentColor: "#012a60",
        content: (
            <div className="res-article-content">
                <h3>1. Malaysia International Scholarship (MIS)</h3>
                <p><strong>How it works:</strong> This is the Malaysian Government's flagship fully funded scholarship. It is specifically designed to attract top-tier global talent to Malaysian universities.</p>
                <p><strong>Eligible Degree Levels:</strong> This is strictly for Master's and Doctoral (Ph.D.) degrees. It is not available for Bachelor's degrees.</p>
                <p><strong>Benefits:</strong> It is a true full ride. The government pays 100% of your tuition fees directly to the university. It also provides a monthly living allowance of RM 1,500, an annual book allowance of RM 500, and full medical insurance coverage.</p>
                <p><strong>Requirements for Uzbeks:</strong></p>
                <ul>
                    <li><strong>Age:</strong> You must be under 40 years old for a Master's or under 45 years old for a Ph.D.</li>
                    <li><strong>Academic:</strong> You need an excellent undergraduate CGPA (minimum of 3.0 out of 4.0 for Master's, and 3.5 out of 4.0 for Ph.D. applicants).</li>
                    <li><strong>English:</strong> You must submit an IELTS or TOEFL score, or an official letter from your previous university stating your degree was taught 100% in English.</li>
                    <li><strong>Documents:</strong> You must submit two recommendation letters, a CV, and a written research proposal (minimum 1,000 words).</li>
                </ul>
                <p><strong>Participating Universities:</strong> You can use this scholarship at top public and private institutions, including Universiti Malaya (UM), Universiti Putra Malaysia (UPM), Universiti Teknologi Malaysia (UTM), and Universiti Sains Malaysia (USM).</p>

                <h3>2. UPM Scholarships (Universiti Putra Malaysia)</h3>
                <p><strong>How it works:</strong> UPM is a top-ranked public research university. They do not generally offer 100% full-ride undergraduate scholarships to international students, but they offer several financial aid packages for postgraduate researchers.</p>
                <ul>
                    <li><strong>International Graduate Student Scholarship (IGSS):</strong> This is for Master's students with a minimum CGPA of 3.50. It is not a full scholarship; it provides a 30% to 50% tuition fee waiver for up to 3 years. To win it, you must have published at least one article in an academic journal and have strong recommendations.</li>
                    <li><strong>Graduate Research Assistantship (GRA):</strong> If you are doing a research degree, you can apply to work as a teaching or research assistant. This provides a monthly allowance ranging from RM 1,125 to RM 1,500 (depending on how many hours you teach) and waives a portion of your tuition fees (RM 700 to RM 1,600 per semester depending on your major).</li>
                </ul>

                <h3>3. Monash International Merit Scholarship (Monash University Malaysia)</h3>
                <p><strong>How it works:</strong> Monash University Malaysia is an international branch campus of the prestigious Australian university. It operates 100% in English.</p>
                <p><strong>The Reality of the Scholarship:</strong> This is not a full ride. It awards an RM 10,000 tuition fee waiver per year (distributed as RM 5,000 per semester). You will be responsible for the remainder of the tuition and all of your living expenses in Kuala Lumpur.</p>
                <p><strong>Requirements for Uzbeks:</strong> It is open to all international undergraduate students (excluding Medicine and Pharmacy). You do not need to submit a separate application; you are evaluated automatically based on your admission application. You must submit exceptional high school standardized test scores (like a high SAT, A-Levels, or IB Diploma) to qualify.</p>

                <h3>4. High Achievers Scholarship (University of Nottingham Malaysia)</h3>
                <p><strong>How it works:</strong> Similar to Monash, this is a UK university branch campus operating entirely in English.</p>
                <p><strong>The Reality of the Scholarship:</strong> The High Achievers' Scholarship (HAS) is an automatic entrance award for new undergraduate students. It strictly provides a reduction in your tuition fees and does not provide any living allowance or stipend.</p>
                <p><strong>Requirements for Uzbeks:</strong> It is awarded automatically based on outstanding academic performance during your high school studies. You will need top grades in A-Levels, IB, or exceptional SAT scores to secure the fee reduction.</p>

                <h3>5. Alfa University College</h3>
                <p>Alfa University is currently actively recruiting students from Uzbekistan and offers a 100% fully funded scholarship.</p>
                <p><strong>Benefits:</strong> It covers 100% of your tuition fees, provides free student accommodation, and gives you three free meals a day. Furthermore, they assist international students with legal work opportunities so you can earn $300–$400 a month part-time during your studies.</p>
                <p><strong>Requirements:</strong> You can study in-demand fields like Information Technology, Business Management, Graphic Design, or Hospitality entirely in English. The barrier to entry is much lower than Nottingham or Monash; you only need an IELTS score of 5.0 to apply.</p>
            </div>
        )
    },
    {
        id: "asia-hongkong", title: "Study in Hong Kong",
        description: "HKU, HKUST, CUHK Entrance Scholarships and the Hong Kong PhD Fellowship Scheme.",
        category: "asia", emoji: "🇭🇰", accentColor: "#e00020",
        content: (
            <div className="res-article-content">
                <h3>1. HKU Entrance Scholarships (The University of Hong Kong)</h3>
                <p><strong>How it works:</strong> HKU is the most prestigious university in Hong Kong. All international applicants are automatically considered for the HKU Entrance Scholarship upon application submission.</p>
                <p><strong>Benefits:</strong> The highest tier is a true "full ride" that covers 100% of your tuition fees, guaranteed university accommodation, and a general living allowance for all four years of your bachelor's degree.</p>
                <p><strong>Requirements for Uzbeks:</strong> It is purely merit-based. You must submit top-tier SAT, ACT, IB, or A-Level scores. You will also need to submit a strong personal statement and pass an online admission interview conducted in English.</p>

                <h3>2. University Admissions Scholarship (HKUST)</h3>
                <p><strong>How it works:</strong> The Hong Kong University of Science and Technology (HKUST) is an elite STEM and business university. Similar to HKU, no separate application is required; you are automatically assessed.</p>
                <p><strong>Benefits:</strong> Ramps up based on your test scores. It can range from a one-off partial tuition waiver to a Full Tuition Waiver plus a living allowance of up to HK$60,000 per year (which covers your dorm and daily food).</p>
                <p><strong>Requirements for Uzbeks:</strong> HKUST is notoriously rigorous regarding math and science. If you apply with the SAT, you must also submit SAT Subject Tests or AP exams in Calculus and Physics/Chemistry to be competitive for the top-tier scholarships.</p>

                <h3>3. Admission Scholarships (CUHK &amp; HKBU)</h3>
                <h4>Chinese University of Hong Kong (CUHK):</h4>
                <p><strong>Benefits:</strong> CUHK offers Admission Scholarships ranging from a basic HK$5,000 grant all the way up to a full HK$166,000 per year. It is renewable for the entire 4-year study period if you maintain good grades.</p>
                <p><strong>Requirements:</strong> You are evaluated automatically based on your SAT, A-Levels, or IB scores. You do not need to apply separately.</p>
                <h4>Hong Kong Baptist University (HKBU):</h4>
                <p><strong>Benefits:</strong> Excellent for Humanities, Arts, and Communications. They offer full-tuition admission scholarships automatically to top-tier applicants.</p>
                <p><strong>Requirements:</strong> Minimum SAT required just to apply is 1190, but to win the scholarship, your score must be significantly higher.</p>

                <h3>4. Top Scholarship (CityU - City University of Hong Kong)</h3>
                <p><strong>How it works:</strong> CityU explicitly categorizes its international entrance scholarships into three tiers, and you are automatically considered for the highest one you qualify for.</p>
                <p><strong>Benefits:</strong> The highest tier is the "Top Scholarship". It provides a renewable 100% full-tuition waiver plus an annual living allowance of HK$60,000 (approx. USD 7,700) to cover your university-managed accommodation and daily living expenses.</p>
                <p><strong>Requirements for Uzbeks:</strong> Requires exceptional academic performance (high SAT/A-Levels) and maintaining a high Cumulative Grade Point Average (CGPA) during your university studies to keep the funding every year.</p>

                <h3>5. Entry Scholarships (PolyU - Hong Kong Polytechnic University)</h3>
                <p><strong>How it works:</strong> PolyU focuses heavily on applied sciences, engineering, and design. They automatically evaluate international applicants with foreign qualifications (like the SAT, A-Levels, or IB).</p>
                <p><strong>Benefits:</strong> Their top international scholarship offers a 100% renewable full-tuition waiver, an annual living allowance ranging from HK$60,000 to HK$70,000, AND a one-off overseas exchange scholarship of HK$30,000 so you can spend a semester studying in another country.</p>

                <h3>6. Entrance Scholarships (EdUHK &amp; HSUHK)</h3>
                <ul>
                    <li><strong>The Education University of Hong Kong (EdUHK):</strong> The premier institution for education and pedagogy. They offer a Full Scholarship covering up to HK$106,000 per year (which covers tuition and partial living costs).</li>
                    <li><strong>The Hang Seng University of Hong Kong (HSUHK):</strong> A rising private university strong in Business, Supply Chain Management, and Humanities. They offer specific Entrance Scholarships for "Non-ASEAN" students (which includes Uzbekistan). It covers 100% of your tuition fee and 100% of your on-campus accommodation fee for 4 consecutive academic years.</li>
                </ul>

                <h3>7. Non-local Student Scholarship (Lingnan University)</h3>
                <p><strong>How it works:</strong> Lingnan is Hong Kong's dedicated liberal arts university (similar to small, elite liberal arts colleges in the US).</p>
                <p><strong>Benefits:</strong> They offer scholarships to outstanding international students that cover full tuition.</p>
                <p><strong>Requirements for Uzbeks:</strong> Because it is a liberal arts college, they look beyond just SAT scores. You must have an excellent academic record, a strong track record in community service, and strong leadership and communication skills demonstrated in your application and interview.</p>

                <h3>8. Hong Kong PhD Fellowship Scheme (HKPFS)</h3>
                <p><strong>How it works:</strong> If you are applying for a Doctoral (PhD) degree, this is arguably the most lucrative and prestigious government-funded PhD scholarship in the world. It is open to all nationalities.</p>
                <p><strong>Benefits:</strong> It provides an annual stipend of HK$337,200 (approx. USD 43,230) and a conference/research travel allowance of HK$14,000 (approx. USD 1,790) per year for three years.</p>
                <p><strong>Requirements for Uzbeks:</strong> It is intensely competitive. You must have a Master's degree (or an exceptional Bachelor's degree), a highly compelling research proposal, publications, and you must proactively contact a professor at a Hong Kong university to agree to supervise you before you apply.</p>

                <h3>9. HKSAR Government Belt and Road Scholarship</h3>
                <p><strong>How it works:</strong> If you are accepted into any publicly funded university in Hong Kong (like HKU, CUHK, PolyU, CityU, etc.), you can be nominated for this government scholarship.</p>
                <p><strong>Benefits:</strong> It covers 100% of your tuition fees for the normal duration of your undergraduate program.</p>
                <p><strong>Advantage:</strong> While university entrance scholarships require you to be in the top 1% globally, the Belt and Road scholarship is a targeted quota specifically for students from countries like Uzbekistan, making your geographical origin a major advantage.</p>
            </div>
        )
    },

    {
        id: "6", title: "Ivy League & Elite US Colleges",
        description: "Advanced strategies and full video guides for building an academic profile for highly selective US institutions. Learn exactly what each top school looks for.",
        category: "usa", emoji: "🎓", accentColor: "#4f46e5",
        videos: [
            { title: "How to get into Cornell", url: "https://www.youtube.com/embed/tG8fmEfHdRA" },
            { title: "How to get into Dartmouth", url: "https://www.youtube.com/embed/fqqY7F2l4Tc" },
            { title: "How to get into Brown", url: "https://www.youtube.com/embed/x_k3aQFT9l0" },
            { title: "How to get into Harvard", url: "https://www.youtube.com/embed/r7KQJwd3bi4" },
            { title: "How to get into Yale", url: "https://www.youtube.com/embed/Qi5hHGKJwPM" },
            { title: "How to get into MIT", url: "https://www.youtube.com/embed/Af_-shtZ-XY" },
            { title: "How to get into Columbia", url: "https://www.youtube.com/embed/3oy_KjiMt0c" },
            { title: "How to get into Duke", url: "https://www.youtube.com/embed/0Qp7bCYJKTU" },
            { title: "How to get into Stanford", url: "https://www.youtube.com/embed/SNIRiPOB7ug" },
            { title: "How to get into UChicago", url: "https://www.youtube.com/embed/G69BckBLHC4" },
            { title: "How to get into UPenn", url: "https://www.youtube.com/embed/aXkQWDa42QI" },
            { title: "How to get into Princeton", url: "https://www.youtube.com/embed/PI1KucH4834" },
            { title: "How to get into NYU", url: "https://www.youtube.com/embed/wUjrnWFW06w" },
            { title: "How to get into Northwestern", url: "https://www.youtube.com/embed/UGN9HYC9JWM" },
            { title: "How to get into Georgetown", url: "https://www.youtube.com/embed/JBtg__jaUTk" },
            { title: "How to get into Carnegie Mellon", url: "https://www.youtube.com/embed/FZu616a_foo" },
            { title: "How to get into Johns Hopkins", url: "https://www.youtube.com/embed/hcs0tl_DaO0" }
        ]
    },
    {
        id: "asia-turkiye", title: "Study in Türkiye",
        description: "Fully funded Turkiye Burslari Scholarship and comprehensive guides for top Turkish academic institutions.",
        category: "asia", emoji: "🇹🇷", accentColor: "#e30a17",
        videos: [
            { title: "How to Apply For Turkiye Burslari Fully funded Scholarship | Study in Turkey For Free", url: "https://www.youtube.com/embed/_h9OIR9XkXU" },
            { title: "Turkiye Burslari 2025 Step By Step Application Tutorial | Part 1", url: "https://www.youtube.com/embed/41yYnxbR4tg" },
            { title: "Documents Required To Apply for Türkiye Bursları", url: "https://www.youtube.com/embed/6wKMr6raC9w" },
            { title: "How to write a good Letter of Intent for Turkiye Burslari", url: "https://www.youtube.com/embed/QuOFx1tWiGk" },
            { title: "Turkiye Burslari Application Mistakes you MUST Avoid", url: "https://www.youtube.com/embed/CDNeIA6Xtqk" },
            { title: "How I answered my Turkiye Burslari Interview Questions", url: "https://www.youtube.com/embed/JXyFEQ09Ncs" },
            { title: "Turkiye Burslari Interview tips and advice", url: "https://www.youtube.com/embed/C7UtvYxF27g" },
            { title: "Is the Turkiye Bursları stipend enough?", url: "https://www.youtube.com/embed/aeHB7M0V61o" },
            { title: "Explaining the Visa Process for Turkiye Burslari Winners", url: "https://www.youtube.com/embed/fmhj8zEqIik" },
            { title: "WELCOME TO TURKEY - How to apply for Residence Permit", url: "https://www.youtube.com/embed/In5FcwQymSk" }
        ],
        content: (
            <div className="res-article-content">
                <h3>1. Turkiye Burslari Scholarship</h3>
                <p>Turkiye Burslari is the fully funded government scholarship of Turkiye, providing university placement, tuition, a monthly stipend, accommodation, health insurance, and a one-year Turkish language course.</p>

                <h3>2. Comprehensive Full-Ride Scholarships (Bilkent University)</h3>
                <p><strong>How it works:</strong> Bilkent University in Ankara is an elite, private, English-medium foundation university. It is heavily favored by international students because it does not require you to learn Turkish.</p>
                <p><strong>Benefits:</strong> Their top-tier award is the "Comprehensive Scholarship." It covers 100% of your tuition fees and provides a free accommodation scholarship (dormitory) for up to 10 semesters (4 years of study plus 1 year of English prep if needed).</p>
                <p><strong>Requirements for Uzbeks:</strong> You are evaluated purely on academic merit based on your high school grades and international exams. To secure the 100% Comprehensive Scholarship, you need an exceptional SAT score (minimum requirement is 1000, but realistically 1400+ is needed to win the full ride) or an elite IB/A-Level diploma.</p>
                <p><strong>Language:</strong> You must submit an IELTS of 6.5 (minimum 5.5 per section) or a TOEFL iBT of 87.</p>
                <p><strong>Maintenance:</strong> To keep the free housing, you must maintain an Annual GPA of 2.50/4.00.</p>

                <h3>3. Need-Blind Merit Awards (Sabancı University)</h3>
                <p><strong>How it works:</strong> Sabancı University in Istanbul is another elite private institution operating entirely in English. They utilize a "need-blind" admissions model, meaning your financial background does not affect your admission.</p>
                <p><strong>Benefits:</strong> They offer 25%, 50%, 75%, and 100% tuition fee waivers. The scholarship covers your standard education period (4 years).</p>
                <p><strong>Requirements for Uzbeks:</strong> Every international applicant is automatically evaluated for a scholarship upon submitting their admission application; no separate form is needed. You need a minimum SAT score of 1100, an IB of 28, or an ACT of 23 just to apply, but to win the 100% waiver, your scores must be much higher.</p>
                <p><strong>The IELTS Trap:</strong> Sabancı University does not accept the IELTS exam for graduate admissions, and strongly prefers TOEFL iBT (minimum 78) or PTE (minimum 48).</p>

                <h3>4. Internal Merit Awards (Koç University)</h3>
                <p><strong>How it works:</strong> Koç University in Istanbul is widely regarded as the most prestigious and competitive private university in Türkiye.</p>
                <p><strong>Benefits:</strong> They award 25%, 50%, 75%, or 100% merit-based tuition scholarships. Note that these awards only cover tuition; they do not include housing or living expenses.</p>
                <p><strong>Requirements for Uzbeks:</strong> There is no separate scholarship application. You are evaluated automatically. Koç does not accept TOEFL or IELTS for undergraduate admissions; your English and academic prowess is judged strictly by your SAT, ACT, or IB scores.</p>
                <p><strong>Specific SAT Cutoffs:</strong> The minimum SAT scores required just to apply are incredibly high: 1200 for Administrative Sciences, 1260 for Science, 1300 for Engineering, 1420 for Law, and 1450 for Medicine. To get the 100% scholarship, you must score at the absolute top of these ranges. For graduate programs, a minimum TOEFL iBT of 80 is required.</p>

                <h3>Additional Turkish Universities Offering 100% Scholarships</h3>
                <ul>
                    <li><strong>5. Kadir Has University (Istanbul):</strong> Offers up to 100% tuition waivers based on merit. All core programs are taught in English (TOEFL iBT 72 or PTE 59).</li>
                    <li><strong>6. TED University (Ankara):</strong> Offers 25% to 100% tuition fee exemptions. Education is entirely in English. They offer their own English Proficiency Exam free of charge if you don't have TOEFL.</li>
                    <li><strong>7. Middle East Technical University / METU (Ankara):</strong> Offers tuition fee discounts and 100% exemptions based entirely on your academic success (strong SAT and TOEFL required).</li>
                    <li><strong>8. Bahçeşehir University / BAU (Istanbul):</strong> Offers departmental merit scholarships and partial/full waivers. High SAT/IB/A-Level scores drastically increase chances.</li>
                    <li><strong>9. Istanbul Medipol University:</strong> Highly recommended for engineering or health sciences (like Nursing or Biomedical Engineering) 100% in English. Offers extensive 100% tuition waivers.</li>
                    <li><strong>10. MEF University (Istanbul):</strong> Operates entirely in English and offers merit-based scholarships up to 100%. Requires TOEFL iBT of 80 or PTE 67.</li>
                </ul>
            </div>
        )
    },
    {
        id: "asia-saudi", title: "Study in Saudi Arabia",
        description: "Full guide to fully funded scholarships at KFUPM, KAU, KSU, and elite private universities.",
        category: "asia", emoji: "🇸🇦", accentColor: "#006c35",
        content: (
            <div className="res-article-content">
                <h3>1. King Fahd University of Petroleum &amp; Minerals (KFUPM)</h3>
                <p>This is the premier technical university in the region. Instruction is 100% in English for all STEM and business programs.</p>
                <ul>
                    <li><strong>SAT Track (Guaranteed Consideration):</strong> Minimum SAT 1350+. Shortlisted applicants must pass an internal KFUPM Mathematics test. English requirement: STEP 65, IELTS 4.5, TOEFL iBT 45.</li>
                    <li><strong>Olympiad Track (Unconditional Guarantee):</strong> Winners of International Science Olympiads (Math, Physics, Chemistry, Informatics) or ISEF awards get guaranteed admission and a full ride.</li>
                    <li><strong>Benefits:</strong> 100% tuition waiver, monthly stipend, free furnished housing, textbooks, and annual airfare.</li>
                </ul>

                <h3>2. King Abdulaziz University (KAU)</h3>
                <p>KAU offers many programs in English, particularly in the Scientific and Health tracks.</p>
                <ul>
                    <li><strong>Scholarship Triggers:</strong> High School GPA: Minimum 90%. Weighted Score: 40% HS GPA + 30% Aptitude + 30% Achievement scores. English Score: Minimum IELTS 5.0 or TOEFL iBT 61.</li>
                    <li><strong>Benefits:</strong> Full tuition, accommodation, health insurance, and monthly stipends.</li>
                </ul>

                <h3>3. King Saud University (KSU)</h3>
                <p>Instruction at KSU is in English for Medicine and Engineering; however, most humanities subjects are taught in Arabic.</p>
                <ul>
                    <li><strong>Scholarship Triggers:</strong> High School GPA: Minimum 90%. SAT Score: 1200+ recommended. English Score: Minimum IELTS 6.0 or TOEFL iBT 61–79 depending on the major.</li>
                    <li><strong>Benefits:</strong> 100% tuition, on-campus housing, and annual living allowance.</li>
                </ul>

                <h3>4. Elite Private Universities (English-First)</h3>
                <ul>
                    <li><strong>Prince Sultan University (PSU):</strong> 100% English medium. Trigger: Cumulative HS GPA ≥90%. SAT scores used for shortlisting.</li>
                    <li><strong>Alfaisal University (Riyadh):</strong> 100% English medium. Requires outstanding academic records and high ACT/SAT/IB. Covers 20% to 100% tuition waiver.</li>
                    <li><strong>Effat University (Women Only):</strong> 100% English medium. "Excellence Scholarship" covers up to 100% of tuition for high academic achievers.</li>
                </ul>

                <h3>5. Public Universities via "Study in Saudi" Portal</h3>
                <p>Uzbek students can apply to 27 public universities through the centralized portal (studyinsaudi.moe.gov.sa). Science and Engineering programs at these universities are often taught in English.</p>
                <p><strong>General Criteria:</strong> Age 17–25 years old. GPA ≥90% for competitive slots. Certificates must be attested by the Saudi Embassy in Tashkent and translated into English.</p>
            </div>
        )
    },
    {
        id: "asia-qatar", title: "Study in Qatar",
        description: "Guide to Qatar University, Education City (US Branch Campuses), and Lusail University scholarships.",
        category: "asia", emoji: "🇶🇦", accentColor: "#8a1538",
        content: (
            <div className="res-article-content">
                <h3>1. Qatar University (QU)</h3>
                <p>QU is the national university. Many of its colleges teach exclusively in English. The International Students Scholarship provides 100% coverage (tuition, textbooks, 500 QR stipend, housing, airfare).</p>
                <p><strong>Triggers:</strong> High School GPA: Minimum 95%. For English Tracks: IELTS ≥ 5.5 and SAT Math ≥ 530. Must maintain a 3.0 GPA to keep it.</p>

                <h3>2. Education City Universities (Qatar Foundation)</h3>
                <p>This campus hosts branches of top US universities (Carnegie Mellon, Georgetown, Northwestern, Texas A&amp;M). All instruction is 100% English. Need-Blind Admission provided through Qatar Foundation.</p>
                <p><strong>Benefits:</strong> 100% coverage through Merit Scholarships and Interest-Free Loans (forgiven if you work in Qatar after graduation).</p>
                <p><strong>Academic Triggers:</strong> Competitive SAT (1420+) and GPA (3.8+). After two semesters with GPA ≥ 3.6, you can apply for the QF Merit Scholarship (no repayment required).</p>

                <h3>3. Lusail University</h3>
                <p>Private university offering the "Qatar Scholarship Program" for students from developing countries (including Uzbekistan).</p>
                <p><strong>Benefits:</strong> 100% coverage for Tuition, housing, monthly stipend, medical insurance, and flight tickets.</p>
                <p><strong>Triggers:</strong> Cumulative GPA 90%+. IELTS ≥ 5.5. Age 18-22. Must choose the 'Qatar Scholarship' option during admission.</p>

                <h3>4. University of Doha for Science &amp; Technology (UDST)</h3>
                <p>Focuses on applied STEM. The Amiri Scholarship provides 100% coverage (tuition, stipend, housing).</p>
                <p><strong>Triggers:</strong> High School GPA 90%+ overall AND 90% in Math/Science. SAT: 550 Math, 550 EBRW. IELTS 7.0 or TOEFL iBT 95.</p>

                <h3>5. Hamad Bin Khalifa University (HBKU)</h3>
                <p>Offers a specific undergraduate English major (B.S. in Computer Engineering) with full funding under the HBKU Fully Funded Scholarship.</p>
                <p><strong>Triggers:</strong> Strong high school record (GPA ≥ 3.5), evidence of advanced math/science. IELTS ≥ 6.5 or TOEFL ≥ 79.</p>
            </div>
        )
    },
    {
        id: "asia-uae", title: "Study in the UAE",
        description: "Detailed guide on NYU Abu Dhabi, Khalifa University, UAEU, and other elite UAE scholarships.",
        category: "asia", emoji: "🇦🇪", accentColor: "#00732f",
        content: (
            <div className="res-article-content">
                <h3>1. Khalifa University (Abu Dhabi)</h3>
                <p>Khalifa University is the top-ranked institution in the UAE for STEM and is 100% English-medium.</p>
                <p><strong>Undergraduate Tier I Scholarship:</strong> Covers 100% of tuition, textbooks, and university accommodation. Eligible students may also receive a monthly stipend and free weekly transportation. Guaranteed automatically based on academic merit (SAT/GPA). Requires maintaining 3.3 CGPA.</p>

                <h3>2. UAE University (UAEU) (Al Ain)</h3>
                <p>UAEU is the national university. The Full Tuition Scholarship provides a 100% waiver of tuition fees.</p>
                <p><strong>Guaranteed Trigger:</strong> High school score ≥98%, SAT Math ≥ 730, and IELTS ≥ 7.5. Must maintain a 3.8 CGPA.</p>

                <h3>3. NYU Abu Dhabi (NYUAD)</h3>
                <p>NYUAD follows the American liberal arts model and is 100% in English.</p>
                <p><strong>NYUAD Grant:</strong> Need-blind admission. If admitted, the university provides grants covering up to 100% of the full cost of attendance depending on financial need.</p>
                <p><strong>Application:</strong> Must submit the CSS Profile alongside the Common App application.</p>

                <h3>4. MBZUAI (Abu Dhabi)</h3>
                <p>The Mohamed Bin Zayed University of Artificial Intelligence is a graduate-only research university offering 100% tuition, monthly stipend, free housing, and visa sponsorship for all admitted students.</p>

                <h3>5. Abu Dhabi University (ADU)</h3>
                <p>H.H. Sheikh Hamdan &amp; Chairman’s Scholarships provide a 100% waiver on tuition and fees for students with a 98%+ high school average.</p>

                <h3>6. American University in Dubai (AUD)</h3>
                <p>The Sheikh Mohammed Bin Rashid Al Maktoum Scholarship offers partial to 100% tuition waivers for undergraduate students with min. 90% high school average.</p>

                <h3>7. American University of Sharjah (AUS)</h3>
                <p>The President’s Scholarship covers 100% of tuition, lab fees, housing, stipend, and annual airfare.</p>
                <p><strong>Guaranteed Trigger:</strong> Cumulative high school GPA of 98% AND an SAT score of 1400. IELTS 7.0 or TOEFL iBT 94.</p>

                <h3>8. Zayed University (ZU)</h3>
                <p>The President’s Award is a competitive 100% tuition waiver for top-tier undergraduate applicants. Must maintain a 3.6 CGPA.</p>

                <h3>9. Emirates Aviation University (EAU)</h3>
                <p>Chancellor's Scholarship covers 100% of tuition fees for high school average of 95%+ and IELTS 6.0.</p>

                <h3>10. American University of Ras Al Khaimah (AURAK)</h3>
                <p>Provost Scholarship offers a 40% tuition waiver for high-achieving students (97%+).</p>
            </div>
        )
    },
    {
        id: "eu-italy", title: "Study for Free in Italy",
        description: "Comprehensive guides to securing the DSU and University of Padua scholarships.",
        category: "europe", emoji: "🇮🇹", accentColor: "#009246",
        videos: [
            { title: "How to Apply for the DSU Scholarship in Italy 2024-2025: Complete Guide for International Students", url: "https://www.youtube.com/embed/lvEW-2awbeY" },
            { title: "UNIVERSITY OF PADUA ITALY INTERNATIONAL EXCELLENCE SCHOLARSHIP 2025/2026 | APPLICATION PROCESS", url: "https://www.youtube.com/embed/w-y-EkkJ7Jo" }
        ],
        content: (
            <div className="res-article-content">
                <h3>DSU Scholarship</h3>
                <p>The DSU (Diritto allo Studio Universitario) Scholarship is a regional scholarship in Italy that provides free accommodation, free meals, and a stipend to international students based on financial need.</p>
                <h3>University of Padua Scholarship</h3>
                <p>The Padua International Excellence Scholarship is awarded to highly talented prospective students wishing to pursue a Bachelor's or Master's degree completely held in English at Padua.</p>
            </div>
        )
    },
    {
        id: "eu-hungary", title: "Study in Hungary (Stipendium Hungaricum)",
        description: "A complete 28-part guide to applying for the Stipendium Hungaricum Scholarship.",
        category: "europe", emoji: "🇭🇺", accentColor: "#ce2939",
        videos: [
            { title: "Stipendium Hungaricum Scholarship, Explained in 5 Minutes!", url: "https://www.youtube.com/embed/_nZpV82w4Fc" },
            { title: "Further help - Stipendium Hungaricum application guide", url: "https://www.youtube.com/embed/sS_K6p-k-bk" },
            { title: "Submitting - Stipendium Hungaricum application guide", url: "https://www.youtube.com/embed/2oJD6LHHK20" },
            { title: "Checklist (Part 6) - Stipendium Hungaricum application guide", url: "https://www.youtube.com/embed/UC-kOh49Djs" },
            { title: "Checklist (Part 5) - Stipendium Hungaricum application guide", url: "https://www.youtube.com/embed/-rw9ZyfTT6I" },
            { title: "Checklist (Part 4) - Stipendium Hungaricum application guide", url: "https://www.youtube.com/embed/lVIZJUWiryc" },
            { title: "Checklist (Part 3) - Stipendium Hungaricum application guide", url: "https://www.youtube.com/embed/UhfDthcVBWM" },
            { title: "Checklist (Part 2) - Stipendium Hungaricum application guide", url: "https://www.youtube.com/embed/foGs2sS7bww" },
            { title: "Checklist (Part 1) - Stipendium Hungaricum application guide", url: "https://www.youtube.com/embed/qMXyP0RAbps" },
            { title: "Other - Stipendium Hungaricum application guide", url: "https://www.youtube.com/embed/rDJJvXycz2Y" },
            { title: "Documents - Stipendium Hungaricum application guide", url: "https://www.youtube.com/embed/qBKOyCVWW2g" },
            { title: "Motivation - Stipendium Hungaricum application guide", url: "https://www.youtube.com/embed/Ki4U8J_dcUU" },
            { title: "References -  Stipendium Hungaricum application guide", url: "https://www.youtube.com/embed/bnTLCirWg3k" },
            { title: "Residences - Stipendium Hungaricum application guide", url: "https://www.youtube.com/embed/tII1y4Vljns" },
            { title: "Activities - Stipendium Hungaricum application guide", url: "https://www.youtube.com/embed/qR6bdBKFxK8" },
            { title: "Employment - Stipendium Hungaricum application guide", url: "https://www.youtube.com/embed/_URvIw5wVJU" },
            { title: "Languages - Stipendium Hungaricum application guide", url: "https://www.youtube.com/embed/tlgxZ2IpqvI" },
            { title: "Education (Part 3) - Stipendium Hungaricum application guide", url: "https://www.youtube.com/embed/SW9vxcuTUYM" },
            { title: "Education (Part 2) - Stipendium Hungaricum application guide", url: "https://www.youtube.com/embed/FQ596DE3D-4" },
            { title: "Education (Part 1) - Stipendium Hungaricum application guide", url: "https://www.youtube.com/embed/JpuCCzzvmI0" },
            { title: "Contacts - Stipendium Hungaricum application guide", url: "https://www.youtube.com/embed/jxJwFHl0GYA" },
            { title: "Profile - Stipendium Hungaricum application guide", url: "https://www.youtube.com/embed/opaF2VwwqdE" },
            { title: "Priorities - Stipendium Hnugarium application guide", url: "https://www.youtube.com/embed/u8CeGkUxujw" },
            { title: "Account settings - Stipendium Hungaricum application guide", url: "https://www.youtube.com/embed/FcYd4qQ2zos" },
            { title: "Registration (Part 2) -Stipendium Hungaricum application guide", url: "https://www.youtube.com/embed/HJdO1Nnf930" },
            { title: "Registration (Part 1) - Stipendium Hungaricum application guide", url: "https://www.youtube.com/embed/GK8WzxEPgq0" },
            { title: "Application basics  - Stipendium Hungaricum application guide", url: "https://www.youtube.com/embed/OxS-AU45LoE" },
            { title: "All About The ENTRANCE EXAM for the Stipendium Hungaricum Scholarship || Guide & Tips", url: "https://www.youtube.com/embed/y78ZiYIuebA" }
        ]
    },
    {
        id: "eu-poland", title: "Study in Poland",
        description: "NAWA Banach Scholarship and top university offerings (Kozminski, Vistula, SWPS).",
        category: "europe", emoji: "🇵🇱", accentColor: "#dc143c",
        videos: [
            { title: "Study in Europe for Free! NAWA Banach Scholarship 2025/2026", url: "https://www.youtube.com/embed/Tqg7XqsonAo" }
        ],
        content: (
            <div className="res-article-content">
                <h3>NAWA Banach Scholarship</h3>
                <p>The Banach Scholarship Programme is a joint initiative of the Ministry of Foreign Affairs and the Polish National Agency for Academic Exchange (NAWA). It aims to support the socio-economic growth of developing countries by raising the level of education of their citizens.</p>

                <h3>1. Kozminski University (Warsaw)</h3>
                <p><strong>The Scholarship:</strong> Kozminski University offers a scholarship for "The best students," which covers 100% of the tuition fees for undergraduate (Bachelor's) programs taught in English. They also offer 100% tuition coverage for verified Olympiad winners.</p>
                <p><strong>How it works:</strong> You must apply and be admitted to the university first, after which eligible students receive a link to apply for the scholarship.</p>

                <h3>2. Vistula University (Warsaw)</h3>
                <p><strong>The Scholarship:</strong> The "Vistula Merit Scholarship" provides a 100% tuition fee discount for the first year of studies for any Bachelor's program conducted in English.</p>
                <p><strong>How it works:</strong> This 100% waiver can cover your full period of study, provided you maintain high academic and extracurricular performance. To be eligible, you need a minimum high school GPA of 90%, strong English proficiency (usually IELTS 6.0 or 7.0), and a record of extracurricular involvement.</p>

                <h3>3. SWPS University (Multiple Campuses)</h3>
                <p><strong>The Scholarship:</strong> SWPS offers the "Scholarship for International Candidates" for students applying to full-time undergraduate programs in English (such as Psychology, Management, or English Studies).</p>
                <p><strong>How it works:</strong> It covers the first-year tuition fee. In following years, the scholarship can be extended if you achieve a GPA that is at least 0.1 higher than the average GPA of your study group. The application requires writing an essay and demonstrating academic or community achievements.</p>
            </div>
        )
    },
    {
        id: "eu-czech", title: "Study in the Czech Republic",
        description: "Government and University scholarships available for international students in Czechia.",
        category: "europe", emoji: "🇨🇿", accentColor: "#11457e",
        content: (
            <div className="res-article-content">
                <h3>MEYS Government Scholarships</h3>
                <p>State scholarships from the Ministry of Education, Youth and Sports for students from specific developing countries covering the standard length of study and preparatory years.</p>

                <h3>South Moravian Centre for International Mobility Scholarship</h3>
                <p>Scholarships for non-EU students studying at universities in the Brno region.</p>

                <h3>Václav Havel Bursary</h3>
                <p>Offered at Charles University for international students whose studies are hindered by repressive totalitarian or authoritarian regimes.</p>

                <h3>Miroslav Vlček Extraordinary Scholarship</h3>
                <p>Intended for foreign students studying in English-taught degree programs at public universities in Prague.</p>
            </div>
        )
    },
    {
        id: "eu-romania", title: "Study for Free in Romania",
        description: "Step-by-step guides to the Romanian Government (MFA) Scholarship.",
        category: "europe", emoji: "🇷🇴", accentColor: "#002b7f",
        videos: [
            { title: "Romanian Government Scholarship 2026 (Fully Funded) | Step-by-Step Application Guide", url: "https://www.youtube.com/embed/kn8n0oAI3E0" },
            { title: "Romanian Government Scholarship (MFA) 2025: What to Do Next!", url: "https://www.youtube.com/embed/nz0w6Qhv_Q8" }
        ]
    },
    {
        id: "eu-finland", title: "Study for Free in Finland",
        description: "Comprehensive guide to 100% tuition scholarships at top Finnish universities like Aalto, UEF, and Centria UAS.",
        category: "europe", emoji: "🇫🇮", accentColor: "#002f6c",
        content: (
            <div className="res-article-content">
                <h3>1. Aalto University</h3>
                <p><strong>The Scholarship:</strong> Aalto University offers the "Aalto University Excellence Scholarship," which provides a 100% tuition fee waiver for the standard three-year duration of the Bachelor's degree.</p>
                <p><strong>How it works:</strong> These scholarships are highly competitive and are awarded strictly based on academic merit to the top applicants during the admission process.</p>
                <p><strong>SAT Requirement:</strong> Aalto heavily utilizes the SAT for admissions into its English-taught Bachelor's programs (such as Science, Technology, and Business). Achieving a high SAT score (typically a minimum of 1350+ depending on the specific track) is your most direct pathway to securing both admission and this 100% waiver.</p>

                <h3>2. University of Eastern Finland (UEF)</h3>
                <p><strong>The Scholarship:</strong> UEF offers the "UEF Scholarship," which grants a 100% tuition fee waiver for the entire three-year Bachelor's program.</p>
                <p><strong>How it works:</strong> This is an extremely competitive award, as the 100% waiver is granted only to the single highest-ranked tuition fee-liable student in each degree program based on the admission results.</p>

                <h3>3. Centria University of Applied Sciences (Centria UAS)</h3>
                <p><strong>The Scholarship:</strong> Centria UAS offers an "Academic Performance" scholarship that covers 100% of the tuition fee.</p>
                <p><strong>How it works:</strong> Unlike Aalto and UEF, this 100% waiver is not awarded at the time of admission. You must pay the tuition fee for your first year. However, the university awards a 100% tuition fee refund/waiver for subsequent years to the top-performing student(s).</p>
            </div>
        )
    },
    {
        id: "eu-slovakia", title: "Study in Slovakia",
        description: "Slovak Government National Scholarship for Fully Funded Masters and PhD.",
        category: "europe", emoji: "🇸🇰", accentColor: "#0b4ea2",
        videos: [
            { title: "Slovak Government National Scholarship 2026-27 | Fully Funded Masters & PhD in Slovakia | Apply Now", url: "https://www.youtube.com/embed/2DBKwYt3uV0" }
        ]
    },
    {
        id: "eu-sweden", title: "Study in Sweden",
        description: "Apply for the Lund University Global Scholarship without IELTS.",
        category: "europe", emoji: "🇸🇪", accentColor: "#006aa7",
        videos: [
            { title: "How to Apply for Lund University Global Scholarship 2026 | Study in Sweden (No IELTS Required)", url: "https://www.youtube.com/embed/7My1TLsim6M" }
        ]
    },
    {
        id: "eu-germany", title: "Study for Free in Germany",
        description: "The complete guide to public university routes, full-ride scholarships, and private university financial aid in Germany.",
        category: "europe", emoji: "🇩🇪", accentColor: "#dd0000",
        content: (
            <div className="res-article-content">
                <h3>1. The Public University Route (Tuition-Free)</h3>
                <p>In Germany, public universities do not charge tuition fees for Bachelor's degrees, even for international students (with the exception of Baden-Württemberg). You automatically receive a "100% tuition scholarship" just by being admitted.</p>
                <p><strong>The Catch for Uzbekistan Students:</strong> Uzbekistan has an 11-year high school system. Germany requires 12 years of education for direct entry. You will likely need to complete a 1-year preparatory course called a <em>Studienkolleg</em>, or complete 1-2 years of university in Uzbekistan first.</p>
                <p><strong>Living Expenses:</strong> Even with free tuition, the German government requires you to put approximately €11,904 per year into a "Blocked Account" to prove you can cover your living expenses.</p>
                <p><strong>Fully Funded Living Scholarships:</strong> Organizations like the Friedrich Ebert Foundation, Konrad Adenauer Foundation, and Heinrich Böll Foundation offer full-ride scholarships (approx. €992/month for living expenses). However, they require B2 or C1 level German language skills.</p>

                <hr className="res-divider" />

                <h3>Frankfurt School of Finance & Management</h3>
                <p><strong>Programs:</strong> Offers an English-taught Bachelor of Science in Business Administration.</p>
                <p><strong>Scholarships:</strong> They offer Premium and General Scholarships that provide a 15%, 25%, 50%, 75%, or 100% reduction in tuition fees based on excellent grades and interview performance.</p>
                <p><strong>Admission:</strong> They accept the SAT or ACT, which can help you bypass the 12-year schooling requirement.</p>

                <h3>Constructor University (Bremen)</h3>
                <p><strong>Programs:</strong> Offers a wide variety of English-taught BSc and BA degrees.</p>
                <p><strong>Scholarships:</strong> They offer Academic Achievement Scholarships and a Talent Scholarship (up to €10,000 per academic year). If you do not meet the direct entry requirements with your Uzbekistan diploma, they allow you to gain direct admission using a high SAT or ACT score.</p>

                <h3>Bard College Berlin</h3>
                <p><strong>Programs:</strong> Offers English-taught Bachelor of Arts programs.</p>
                <p><strong>Scholarships:</strong> They offer comprehensive financial aid and scholarships based on both merit (academic excellence) and financial need, which can cover up to full tuition (SAT is test-optional).</p>
            </div>
        )
    },
    {
        id: "9", title: "College Life & Success Advice",
        description: "A curated collection of life advice and strategies for thriving academically, socially, and personally in college.",
        category: "usa", emoji: "💡", accentColor: "#d97706",
        videos: [
            { title: "How to become a top 1% student", url: "https://www.youtube.com/embed/CVD0ppk0g9E" },
            { title: "How to stop caring what others think of you", url: "https://www.youtube.com/embed/_ksGrcOkwNo" },
            { title: "How to study even when you're EXHAUSTED", url: "https://www.youtube.com/embed/W65PKHuiZHY" },
            { title: "College majors that DO and DON'T make money", url: "https://www.youtube.com/embed/ddt9WT0iXH4" },
            { title: "How to overcome your fear of public speaking", url: "https://www.youtube.com/embed/XpaX7GRSPDc" },
            { title: "The 8 unwritten rules of college", url: "https://www.youtube.com/embed/yV2Rb9PT21M" },
            { title: "7 mistakes every student should avoid", url: "https://www.youtube.com/embed/a1L5sAgYe7M" },
            { title: "Stress = Motivation", url: "https://www.youtube.com/embed/kNJGGFf2HEE" },
            { title: "CHARISMA MATTERS. How to become a magnet for everyone?", url: "https://www.youtube.com/embed/9_8gjE7Oyr0" },
            { title: "Why have we FORGOTTEN HOW TO THINK?", url: "https://www.youtube.com/embed/IBndA7442Ls" },
            { title: "The Science of Making & Breaking Habits | Huberman Lab", url: "https://www.youtube.com/embed/HXuj7wAt7u8" },
            { title: "Tools for Managing Stress & Anxiety | Huberman Lab", url: "https://www.youtube.com/embed/qUz93CyNIz0" }
        ]
    },
];

const CATEGORY_META: Array<{ key: Category; label: string; icon: typeof BookOpen }> = [
    { key: "all", label: "All", icon: BookOpen },
    { key: "usa", label: "USA", icon: BookOpen },
    { key: "europe", label: "Europe", icon: BookOpen },
    { key: "asia", label: "Asia", icon: BookOpen },
];

/* ══════════════════════════════════════
   Main Component
   ══════════════════════════════════════ */
export default function ResourcesClient() {
    const [category, setCategory] = useState<Category>("all");
    const [searchTerm, setSearchTerm] = useState("");

    // Modal state for resources with embedded videos
    const [activeResource, setActiveResource] = useState<Resource | null>(null);

    const categoryCounts = useMemo(() => {
        const counts: Record<Category, number> = { all: RESOURCES.length, usa: 0, europe: 0, asia: 0 };
        RESOURCES.forEach(r => { counts[r.category]++; });
        return counts;
    }, []);

    const displayed = useMemo(() => {
        let list = [...RESOURCES];
        if (category !== "all") list = list.filter(r => r.category === category);
        const q = searchTerm.trim().toLowerCase();
        if (q) list = list.filter(r => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q));
        return list;
    }, [category, searchTerm]);

    return (
        <div className="res-page">
            {/* ── Hero ── */}
            <section className="res-hero res-reveal">
                <div>
                    <h1 className="res-hero-title">Resources</h1>
                    <p className="res-hero-sub">Curated guides, templates, and tools for your college journey</p>
                </div>
            </section>

            {/* ── Controls ── */}
            <div className="res-controls res-reveal" data-delay-idx="1">
                <div className="res-tabs">
                    {CATEGORY_META.map(c => (
                        <button
                            key={c.key}
                            type="button"
                            className={`res-tab ${category === c.key ? "is-active" : ""}`}
                            onClick={() => setCategory(c.key)}
                        >
                            {c.label}
                            <span className="res-tab-count">{categoryCounts[c.key]}</span>
                        </button>
                    ))}
                </div>
                <label className="res-search">
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="Search resources..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </label>
            </div>

            {/* ── Grid ── */}
            {displayed.length === 0 ? (
                <div className="res-empty res-reveal" data-delay-idx="3">
                    <div className="res-empty-icon"><Search size={24} /></div>
                    <h3 className="res-empty-title">No resources found</h3>
                    <p className="res-empty-desc">Try adjusting your search or filter criteria</p>
                </div>
            ) : (
                <div className="res-grid res-reveal" data-delay-idx="2">
                    {displayed.map(resource => {
                        const isModalItem = !!resource.videos?.length || !!resource.content;
                        const isLink = !isModalItem && resource.url && resource.url !== "#";

                        return (
                            <div
                                key={resource.id}
                                className="res-card"
                                data-res-id={resource.id}
                                onClick={() => {
                                    if (isModalItem) setActiveResource(resource);
                                    else if (isLink) window.open(resource.url, "_blank", "noopener noreferrer");
                                }}
                            >
                                <div className="res-card-accent" />
                                <div className="res-card-body">
                                    <div className="res-card-header">
                                        <div className="res-card-icon">
                                            {resource.emoji}
                                        </div>
                                        <div>
                                            <h3 className="res-card-title">{resource.title}</h3>
                                        </div>
                                    </div>
                                    <p className="res-card-desc">{resource.description}</p>
                                </div>
                                <div className="res-card-footer">
                                    <span className={`res-card-category is-${resource.category}`}>{resource.category}</span>
                                    <span className="res-card-action">
                                        {resource.videos ? <>Watch {resource.videos.length} Videos <BookOpen size={12} /></>
                                            : resource.content ? <>View Details <BookOpen size={12} /></>
                                                : isLink ? <>Open <ExternalLink size={12} /></>
                                                    : "Coming soon"}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ── Resource Modal ── */}
            {activeResource && (activeResource.videos || activeResource.content) && (
                <div className="res-modal-overlay" onClick={() => setActiveResource(null)}>
                    <div className="res-modal-content" onClick={e => e.stopPropagation()}>
                        <div className="res-modal-header">
                            <h2>{activeResource.title}</h2>
                            <button className="res-modal-close" onClick={() => setActiveResource(null)}>✕</button>
                        </div>
                        <div className="res-modal-body">
                            {!!activeResource.content && (
                                <div className="res-modal-article">
                                    {activeResource.content}
                                </div>
                            )}
                            {activeResource.videos && activeResource.videos.map((vid, idx) => (
                                <div key={idx} className="res-video-card">
                                    <h4>{vid.title}</h4>
                                    <iframe
                                        className="res-video-frame"
                                        src={vid.url}
                                        title={vid.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
