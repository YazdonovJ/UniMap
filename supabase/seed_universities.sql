-- ============================================================
-- Seed data for Universities to test College Match
-- Run this in the Supabase SQL Editor
-- ============================================================

INSERT INTO universities (
  name, location, country, ranking_us_news, ranking_qs, acceptance_rate, 
  avg_sat, avg_act, avg_gpa, financial_aid_intl, need_blind_intl,
  culture_tags, strong_majors, website_url
) VALUES 
(
  'Harvard University', 'Cambridge, MA', 'US', 3, 4, 3.2, 
  1520, 34, 4.0, true, true,
  '{"Competitive", "Historic", "Ivy League", "Research-focused"}', 
  '{"Economics", "Computer Science", "Political Science", "Biology"}',
  'https://www.harvard.edu'
),
(
  'Stanford University', 'Stanford, CA', 'US', 3, 3, 3.9, 
  1540, 35, 3.96, true, false,
  '{"Entrepreneurial", "Tech-focused", "Sunny", "Athletics"}', 
  '{"Computer Science", "Engineering", "Business", "Biology"}',
  'https://www.stanford.edu'
),
(
  'Massachusetts Institute of Technology (MIT)', 'Cambridge, MA', 'US', 2, 1, 4.0, 
  1550, 35, 4.0, true, true,
  '{"Intense", "STEM-focused", "Innovative", "Collaborative"}', 
  '{"Computer Science", "Mechanical Engineering", "Math", "Physics"}',
  'https://www.mit.edu'
),
(
  'Yale University', 'New Haven, CT', 'US', 5, 16, 4.5, 
  1510, 34, 3.95, true, true,
  '{"Arts", "Residential Colleges", "Ivy League", "Tradition"}', 
  '{"Economics", "History", "Political Science", "English"}',
  'https://www.yale.edu'
),
(
  'Princeton University', 'Princeton, NJ', 'US', 1, 17, 4.0, 
  1520, 34, 3.93, true, true,
  '{"Undergrad-focused", "Ivy League", "Suburban", "Eating Clubs"}', 
  '{"Public Policy", "Economics", "Computer Science", "Engineering"}',
  'https://www.princeton.edu'
),
(
  'University of Pennsylvania', 'Philadelphia, PA', 'US', 6, 12, 5.9, 
  1510, 34, 3.9, true, false,
  '{"Pre-professional", "Ivy League", "Urban", "Social"}', 
  '{"Business (Wharton)", "Nursing", "Economics", "Communications"}',
  'https://www.upenn.edu'
),
(
  'Columbia University', 'New York, NY', 'US', 12, 23, 3.9, 
  1520, 34, 3.91, true, false,
  '{"Core Curriculum", "Urban", "Ivy League", "Independent"}', 
  '{"Economics", "Computer Science", "Political Science", "History"}',
  'https://www.columbia.edu'
),
(
  'Cornell University', 'Ithaca, NY', 'US', 12, 13, 7.3, 
  1490, 34, 3.9, true, false,
  '{"Large", "Ivy League", "Rural", "Diverse Programs"}', 
  '{"Engineering", "Business", "Agriculture", "Architecture"}',
  'https://www.cornell.edu'
),
(
  'University of Oxford', 'Oxford', 'UK', null, 3, 17.5, 
  null, null, null, false, false,
  '{"Historic", "Collegiate", "Tutorial System", "Rigorous"}', 
  '{"PPE", "Law", "Medicine", "English"}',
  'https://www.ox.ac.uk'
),
(
  'University of Cambridge', 'Cambridge', 'UK', null, 2, 21.0, 
  null, null, null, false, false,
  '{"Historic", "Collegiate", "Supervision System", "STEM-strong"}', 
  '{"Natural Sciences", "Engineering", "Math", "Law"}',
  'https://www.cam.ac.uk'
),
(
  'University of California, Berkeley', 'Berkeley, CA', 'US', 15, 10, 11.4, 
  1430, 30, 3.89, false, false,
  '{"Public", "Activism", "Large", "Research"}', 
  '{"EECS", "Economics", "Business", "Biology"}',
  'https://www.berkeley.edu'
),
(
  'New York University (NYU)', 'New York, NY', 'US', 35, 38, 12.2, 
  1470, 33, 3.79, true, false,
  '{"Global", "Urban", "Pre-professional", "Arts"}', 
  '{"Business", "Film", "Economics", "Nursing"}',
  'https://www.nyu.edu'
)
ON CONFLICT DO NOTHING;
