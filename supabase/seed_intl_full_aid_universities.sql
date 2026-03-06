-- ============================================================
-- Seed data for Generous Universities for International Students
-- This script inserts the top US universities that meet 100% 
-- of demonstrated financial need for international students.
-- ============================================================

INSERT INTO universities (
  name, location, country, ranking_us_news, ranking_qs, acceptance_rate, 
  avg_sat, avg_act, avg_gpa, financial_aid_intl, need_blind_intl,
  culture_tags, strong_majors, website_url
) VALUES 

-- ============================================================
-- CATEGORY A: Need-Blind & Meets 100% Demonstrated Need (The Elites)
-- These schools do not consider financial need during admissions
-- and guarantee to fund 100% of what the family cannot pay.
-- ============================================================

(
  'Amherst College', 'Amherst, MA', 'US', 2, null, 7.3, 
  1500, 33, 4.0, true, true,
  '{"Need-Blind for Internationals", "Liberal Arts", "Open Curriculum", "Small Classes"}', 
  '{"Economics", "Mathematics", "English", "Political Science"}',
  'https://www.amherst.edu'
),
(
  'Dartmouth College', 'Hanover, NH', 'US', 12, 237, 6.2, 
  1500, 34, 4.0, true, true,
  '{"Need-Blind for Internationals", "Ivy League", "Outdoorsy", "Greek Life"}', 
  '{"Economics", "Government", "Computer Science", "Engineering"}',
  'https://home.dartmouth.edu'
),
(
  'Bowdoin College', 'Brunswick, ME', 'US', 9, null, 7.7, 
  1480, 33, 3.9, true, true,
  '{"Need-Blind for Internationals", "Liberal Arts", "Coastal", "Food/Dining"}', 
  '{"Government", "Economics", "Biology", "Mathematics"}',
  'https://www.bowdoin.edu'
),
(
  'Brown University', 'Providence, RI', 'US', 9, 73, 5.0, 
  1520, 34, 4.0, true, true,
  '{"Need-Blind for Internationals", "Ivy League", "Open Curriculum", "Progressive"}', 
  '{"Computer Science", "Economics", "Biology", "Applied Mathematics"}',
  'https://www.brown.edu'
),

-- Note: Harvard, Yale, Princeton, and MIT were included in the previous 
-- seed script. They also belong in Category A.

-- ============================================================
-- CATEGORY B: Need-Aware but Meets 100% Demonstrated Need
-- These schools consider need during admissions, making it very 
-- highly competitive, but if accepted, they guarantee full funding.
-- ============================================================

(
  'Williams College', 'Williamstown, MA', 'US', 1, null, 8.5, 
  1510, 34, 4.0, true, false,
  '{"Meets 100% Need", "Liberal Arts", "Tutorial System", "Rural"}', 
  '{"Economics", "Mathematics", "Biology", "Art History"}',
  'https://www.williams.edu'
),
(
  'Swarthmore College', 'Swarthmore, PA', 'US', 4, null, 6.8, 
  1500, 34, 4.0, true, false,
  '{"Meets 100% Need", "Liberal Arts", "Intense Academics", "Suburban"}', 
  '{"Economics", "Computer Science", "Engineering", "Biology"}',
  'https://www.swarthmore.edu'
),
(
  'Duke University', 'Durham, NC', 'US', 7, 57, 6.3, 
  1520, 34, 4.0, true, false,
  '{"Meets 100% Need", "School Spirit", "Research", "Southern"}', 
  '{"Public Policy", "Computer Science", "Economics", "Biology"}',
  'https://www.duke.edu'
),
(
  'Northwestern University', 'Evanston, IL', 'US', 9, 47, 7.0, 
  1500, 34, 4.0, true, false,
  '{"Meets 100% Need", "Quarter System", "Pre-professional", "Big Ten"}', 
  '{"Journalism", "Economics", "Psychology", "Engineering"}',
  'https://www.northwestern.edu'
),
(
  'Johns Hopkins University', 'Baltimore, MD', 'US', 9, 28, 7.3, 
  1530, 34, 4.0, true, false,
  '{"Meets 100% Need", "Research-Heavy", "Pre-Med Focus", "Urban"}', 
  '{"Public Health", "Biomedical Engineering", "Neuroscience", "International Relations"}',
  'https://www.jhu.edu'
),
(
  'Vanderbilt University', 'Nashville, TN', 'US', 18, 261, 5.6, 
  1520, 34, 3.9, true, false,
  '{"Meets 100% Need", "Work Hard Play Hard", "Southern", "Music City"}', 
  '{"Economics", "Social Sciences", "Engineering", "Education"}',
  'https://www.vanderbilt.edu'
),
(
  'Rice University', 'Houston, TX', 'US', 17, 145, 7.7, 
  1520, 34, 4.0, true, false,
  '{"Meets 100% Need", "Residential Colleges", "STEM Focus", "Urban"}', 
  '{"Computer Science", "Engineering", "Economics", "Architecture"}',
  'https://www.rice.edu'
),
(
  'Pomona College', 'Claremont, CA', 'US', 4, null, 7.0, 
  1490, 34, 4.0, true, false,
  '{"Meets 100% Need", "Liberal Arts", "Claremont Consortium", "Sunny"}', 
  '{"Economics", "Mathematics", "Computer Science", "Media Studies"}',
  'https://www.pomona.edu'
),
(
  'Washington University in St. Louis', 'St. Louis, MO', 'US', 24, 154, 12.0, 
  1510, 33, 4.0, true, false,
  '{"Meets 100% Need", "Pre-Med", "Flexible Academics", "Suburban"}', 
  '{"Business", "Pre-Med subjects", "Psychology", "Engineering"}',
  'https://wustl.edu'
),
(
  'Colgate University', 'Hamilton, NY', 'US', 21, null, 12.0, 
  1460, 33, 3.8, true, false,
  '{"Meets 100% Need", "Liberal Arts", "Beautiful Campus", "Greek Life"}', 
  '{"Economics", "Political Science", "Biology", "Psychology"}',
  'https://www.colgate.edu'
)
ON CONFLICT DO NOTHING;
