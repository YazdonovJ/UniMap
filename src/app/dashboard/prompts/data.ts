export type EssayData = {
        id: string;
        categoryId: "personal_statement" | "supplemental" | "recommendation" | "other";
        subcategoryId?: string;
        title: string;
        author: string;
        university: string;
        theme: string;
        excerpt: string;
        content: string;
        analysis: string;
};

export const SUPPLEMENTAL_SUBCATEGORIES = [
        {
                id: "why_us",
                title: "The \"Why Us?\" Essay",
                subtitle: "Demonstrated Interest",
                emoji: "🎯",
                color: "#c52b3d",
                gradient: "linear-gradient(135deg, #c52b3d 0%, #9d1a29 100%)",
                glowColor: "rgba(197, 43, 61, 0.35)",
                description: "Colleges want to know you've done your homework. This requires hyper-specific details (professors, niche clubs, specific research centers) connecting their offerings directly to your past experiences and future goals.",
        },
        {
                id: "why_major",
                title: "The \"Why This Major?\" Essay",
                subtitle: "Academic Trajectory",
                emoji: "🔬",
                color: "#2563eb",
                gradient: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                glowColor: "rgba(37, 99, 235, 0.35)",
                description: "An origin story of your intellectual curiosity. It shouldn't just list achievements; it should trace the spark of your academic interest and how you've pursued it outside the classroom.",
        },
        {
                id: "community",
                title: "Community / Contribution",
                subtitle: "Your Role in Groups",
                emoji: "🤝",
                color: "#059669",
                gradient: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                glowColor: "rgba(5, 150, 105, 0.35)",
                description: "\"Community\" can be a cultural background, a family, a robotics team, or a Discord server. The focus is on how you show up for others and how you will bring that energy to their campus.",
        },
        {
                id: "extracurricular",
                title: "Extracurricular Elaboration",
                subtitle: "Deep Dive",
                emoji: "⚡",
                color: "#d97706",
                gradient: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
                glowColor: "rgba(217, 119, 6, 0.35)",
                description: "A deep dive into one specific activity from your resume. The goal is to show hidden impact, leadership, or a core value that the bullet point alone couldn't capture.",
        },
        {
                id: "diversity",
                title: "Diversity / Lived Experience",
                subtitle: "Your Unique Perspective",
                emoji: "🌍",
                color: "#7c3aed",
                gradient: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
                glowColor: "rgba(124, 58, 237, 0.35)",
                description: "Especially prominent recently, this asks how your background, identity, or upbringing has shaped your worldview and what unique perspective you will add to the student body.",
        },
        {
                id: "difference",
                title: "Engaging with Difference",
                subtitle: "Meaningful Conversation",
                emoji: "💬",
                color: "#0284c7",
                gradient: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
                glowColor: "rgba(2, 132, 199, 0.35)",
                description: "Colleges are looking for intellectual maturity. They want to hear about a time you engaged with someone who held an opposing view, showing your capacity to listen, adapt, and empathize.",
        },
        {
                id: "leadership",
                title: "Leadership / Impact",
                subtitle: "Creating Change",
                emoji: "🏆",
                color: "#ea580c",
                gradient: "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)",
                glowColor: "rgba(234, 88, 12, 0.35)",
                description: "Less about a title you held (e.g., \"President\"), and more about a specific moment you solved a problem, mediated a conflict, or created tangible change.",
        },
        {
                id: "quirky",
                title: "Quirky / Curiosity",
                subtitle: "Creative Prompts",
                emoji: "🎨",
                color: "#db2777",
                gradient: "linear-gradient(135deg, #db2777 0%, #be185d 100%)",
                glowColor: "rgba(219, 39, 119, 0.35)",
                description: "Think UChicago's unconventional prompts or the Stanford Roommate essay. These test your authentic voice, creativity, and whether you are genuinely fun to be around and think with.",
        }
];

export const RECOMMENDATION_SUBCATEGORIES = [
        {
                id: "teacher",
                title: "Teacher Evaluations",
                subtitle: "Classroom Performance",
                emoji: "🏫",
                color: "#7c3aed",
                gradient: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
                glowColor: "rgba(124, 58, 237, 0.35)",
                description: "Teacher letters provide deep insight into your intellectual curiosity, academic grit, and dynamic within a collaborative learning environment. They tell the story of how you think, not just what you scores.",
        },
        {
                id: "counselor",
                title: "Counselor Recommendations",
                subtitle: "Holistic Overview",
                emoji: "🎓",
                color: "#c026d3",
                gradient: "linear-gradient(135deg, #c026d3 0%, #a21caf 100%)",
                glowColor: "rgba(192, 38, 211, 0.35)",
                description: "The counselor letter provides the 'big picture' of your high school career. It contextulizes your achievements within your school's environment, details personal hardships, and highlights your overall character and impact on the community.",
        }
];

export const ESSAY_EXAMPLES: EssayData[] = [
        {
                id: "bacon",
                categoryId: "personal_statement",
                title: "Bacon",
                author: "Mariam Nassiri",
                university: "Duke University",
                theme: "Academic Passion",
                excerpt: "The alarm clock is, to many high school students, a wailing monstrosity whose purpose is to torture all who are sleep-deprived...",
                content: `The alarm clock is, to many high school students, a wailing
monstrosity whose purpose is to torture all who are sleep-deprived.
Those who believe this are misguided, and are simply viewing the situ-
ation from a twisted perspective. For when these imprudent early-risers
blearily rub their eyes each morning, and search in vain for whatever
is making that earsplitting noise, they are, without a doubt, annoyed.
Why?
It isn’t because the only thing they desire is to sleep a few extra
hours, as many would presume. no, these kids are groggy and irritable
because they are waking up to what they think will be another hor-
ribly boring day of school. If one of these foolish Sallys or Joes were,
say, sleeping comfortably on a Saturday morning, I could certainly see
something different happening. A beautiful breakfast of tantalizing vit-
tles—eggs, hash browns, and the like—would be ready and waiting for
them on their kitchen tables. But the scrumptious delight to outshine
them all would be a slab of bacon, piled proudly for the taking. It would be that wafting, wondrous bacon smell that would draw dear,
sweet Sally abruptly from her slumber—long before an alarm clock has
the chance to pierce the air.

Oh, bacon: what a marvelous, glorious thing! I live for those heart-
stoppingly good strips of succulence, so crispy and crunchy, so packed
with perfection. The thought of having a plate of bacon every day, per-
haps every school day, sends me into sheer waves of ecstasy!

To be sure, many others would also wax poetic about this lovely
breakfast food. But precious few would share this same zeal for learn-
ing. I, however, can smugly decree that I do regard both very highly. I
brightly waken every morning to the mellifluous joy that sounds from
my alarm clock, a huge smile plastered on my face, and the yearning
to learn in my heart.

When I board my school bus Monday through Friday, it is still pitch
black outside. Busmates will groan about how even the day has not
yet dragged itself out of bed; I only chuckle through their thirty-min-
ute rant fest as we chug down the freeway. Opting to be part of a far-
away Magnet school, after all, has its benefits. My peers may still not
look forward to waking up earlier, but when we are all together in
a classroom, we take on the “bacon mentality.” I have the opportu-
nity to choose from a wealth of diverse classes, and love arriving to
school each day with the prospect of having a new Spanish History
lesson—taught to me in Spanish, for a change. Teachers, driven by
the enthusiasm of their Magnet students, are inspired to create new
classes for advanced students, including those who have completed AP
Spanish Literature and are still eager to learn more, or those who want
to learn about a specific aspect of a subject—we now have a Middle
Eastern History class. not to be outdone, the post-AP exam period
of my English Language class included an intensive literature study,
where we laughed at good ol’ Yossarian in Catch-22, and developed a
strong attachment to Jay gatsby. I’d like to think that The Great Gatsby’s
pursuit of Daisy is not unlike my own pursuit of bacon. I’ve gobbled up
new knowledge rapidly, hankering after it like any elusive bacon strip,
and happily digesting any new bits of information.

But six classes a year are simply not enough to satisfy my hunger
for knowledge. Just as I eat bacon all three meals of the day (when pos-
sible), I attempt to learn all days of the week. rather than make another
trip to some lackluster movie theatre on the weekend, I dedicate my time to reading another good book, or reviewing Economics with my
friends. But high school is starting to smell like leftovers to me now; I
want fresh, new, crisp learning. I want not to read a textbook written by
a renowned professor: I want to hear him speak directly. I’m ready for
the university, and hunger for all the new opportunities waiting for me!
I’ve finished my breakfast, and now it’s time to get going to school.`,
                analysis: `Mariam’s essay “Bacon” uses lively language and plenty of humor
to tell a story that highlights her eagerness to go to school. Her writing
is casual and funny, and it conveys in a personal and genuine way her
enthusiastic attitude. “Bacon” reminds us that topics do not have to be
serious to be sincere.

The metaphor of bacon is a very memorable one in image, smell,
texture, and taste. Mariam capitalizes on these features in her beauti-
ful—and mouthwatering!—descriptors of a Saturday morning breakfast
of eggs. With a touch of humor and a hint of parody, she writes, “Oh,
bacon: what a marvelous, glorious thing! I live for those heartstopping-
ly good strips of succulence, so crispy and crunchy, so packed with
perfection. The thought of having a plate of bacon every day, perhaps
every school day, sends me into sheer waves of ecstasy!”

Just when this celebration of bacon begins to appear over-the-top,
and readers are beginning to worry that Mariam swapped a food mag-
azine piece with her college admissions essay, she links the succulent
bacon metaphor with school: “To be sure, many others would also wax
poetic about this lovely breakfast food. But precious few would share
this same zeal for learning.” Though Mariam takes a risk in waxing po-
etic over bacon, she does so with carefully calculated dramatic effect
that ultimately pays off. We are convinced that the “yearning to learn” is
deeply engrained in our bacon-lover and early-riser author.

Mariam’s narrative also shows us the sacrifices she makes for at-
tending a Magnet school far from home. Her use of the phrase “ba-
con mentality” is original and creative. Mariam’s descriptions of her
classes are specific enough to prevent them from reading like a list.
Rather, she demonstrates the depth of her commitment in her classes
by citing specific details like Yossarian in Catch-22. Mariam’s essay
demonstrates how she is able to fit impressive details of her life into a
narrative framework, a strategy that can avoid the pitfall of sounding
like bragging. Mariam follows the “show, don’t tell” mantra when she
mentions the Magnet school in the context of her long early-morning
bus ride, and in celebrating her Spanish history class, which is impres-
sively taught in Spanish.

At the end of the essay, the bacon metaphor may seem overdone
to some readers, as Mariam has “gobbled up new knowledge rapidly,
hankering after it like any elusive bacon strip” and has expressed a
desire for “fresh, new crisp” learning to satisfy her “hunger for knowl-
edge.” She might have reduced the number of mentions of bacon and
hunger. However, Mariam’s essay ultimately stands out for its origi-
nalitiy and unpredictable connections, like linking The Great Gatsby
to—what else?—bacon.`
        },
        {
                id: "beyond-math",
                categoryId: "personal_statement",
                title: "Beyond Plug-and-Chug Math",
                author: "Anonymous",
                university: "MIT",
                theme: "Academic Passion",
                excerpt: "I have always been a math-science girl. I sighed and sulked through classes on US History and French in eager anticipation...",
                content: `I have always been a math-science girl. I sighed and sulked
through classes on US History and French in eager anticipation of the
formulas and applications I would be learning later in the day. I believe
there are many factors which attribute to my success, two being my
fascination and persistence.

When I was seven I once asked what math was good for and why
I should learn it. The answer I received simply does not do math jus-
tice, “One day when you’re in line at the grocery store the cashier will
give you too little change and you’ll be glad you learned this.” now
in calculus I see the application of all these once foreign symbols, for-
mulas, and letters. I am often amazed by the calculations I am able to
do using the cumulative information acquired from nearly 12 years of
education, such as how to maximize the volume of a box given a cer-
tain surface area. Math is not just plug and chug as many view it but
it requires creativity and thinking out of the box to solve the problems
encountered in the real world. Beauty lies in its simplicity and in the
fact that proofs and observations are what brought the golden rectangle
from ancient greece, Pascal’s triangle, and the Pythagorean Theorem as
well as a host of other theorems, equations, and postulates. Math has
made the impossible possible and the once long and tedious, simple
and quick. The genius of it is amazing as well as the fact that any per-
son is capable of applying and discovering it. I draw graphs and try to
make shapes from functions for fun, count to 10 to calm down, and
save money at the store, too. For all of these reasons and many more, I
am fascinated by math. 

I wasn’t always good at math, contrary to what students in my class-
es might say. When I first showed interest in math in the 5th grade my
parents laughed; middle school was even worse. Incoming 6th graders
were given a test on the second day of school and depending on their
scores were placed into a high or low speed math class. I was put in
the slow speed math and missed a lot of class my first year, as a result
my grade drifted from a B to a C to a C-, then I got help. I knew I liked
math and I didn’t want to do bad in it so I bought books and hired
my older brother to help me. I eventually made it to a B+. Later, in the
summer after my junior year, I took a course that covered nearly a year
of Calculus. I was told that if I decided to take Calculus AB, I would be
bored, so I went for a challenge. My strongest subject began to take up
most of my time. I had to read review books, go online for help, and
stay in during nutrition and lunch for extra instruction. It was hard,
but my dedication paid off and I earned an A. This persistence and
drive also help me excel in math.`,
                analysis: `In this essay, the author begins by stating that she has “always
been a math-science girl.” The honest confession that follows, “I sighed
and sulked through classes on US History and French,” underscores
this point. She goes on to provide specific examples of her “fascina-
tion and persistence” regarding math, even causing a chuckle when
she asks why math is useful to learn and receives an answer that
doesn’t “do math justice”—being able to count change at the grocery
store. This is comical, providing an excellent contrast to algebra with
its “foreign symbols, formulas and letters.” The rendering of math as a
“foreign” language shows us the fascination the author has with math
and its applications. Her praise of math and vision for the potential of
what to others might merely be a boring academic subject is memo-
rable in its admiring tone: she notes the “creativity and thinking out of
the box” math requires, and believes its “beauty lies in its simplicity.”
The references to specific math theorems, equations, and postulates
further strengthen the author’s assertion that she is intrigued by all the
applications that math has for the real world, whether they are ordi-
nary or academic. The strength of this author’s examples lies in their
accessibility to a general audience. She summarizes this nicely when
she writes, “I draw graphs and try to make shapes from functions for
fun, count to 10 to calm down, and save money at the store, too.” The
reference to saving money at the store nicely ties back to the original
anecdote about math being undervalued in society. 

The second half of the essay addresses the author’s “persistence”
in math, following a most persuasive first section that clearly convinces
us regarding her “fascination” for this area of study. “I wasn’t always
good at math, contrary to what students in my classes might say,” she
writes. This first sentence of the second paragraph comes as a sur-
prise, since we are accustomed to associating passion for a subject
with skill in the field. This section shows that writing about a weakness
and not meeting expectations can still make an effective essay topic.
Though most people would not admit to getting a C- in class, this au-
thor does so in an honest way in order to show the amount of progress
she has been able to make. While the improvement in her grades is
impressive, this anecdotal information might have been even more in-
teresting had she spent more time explaining the ups and downs of
achieving higher grades and taking a summer calculus course. Still,
details the essay mentions—such as staying in for lunch to get extra
instruction—certainly attest to her dedication. Overall, this essay pro-
vides a full and balanced explanation of the author’s passion for math
as well as her arduous journey toward excellence.`
        },
        {
                id: "different-kind-of-love",
                categoryId: "personal_statement",
                title: "A Different Kind of Love",
                author: "Oana Emilia Butnareanu",
                university: "Stanford University",
                theme: "Academic Passion / Language",
                excerpt: "When I was four years old, I fell in love. It was not the love for a person, but the love for a language. It was the love for Spanish...",
                content: `When I was four years old, I fell in love. It was not a transient
love-one that stayed by my side during the good times and vanished
during the bad-but rather a love so deep that few would understand.
It was not the love for a person, but the love for a language. It was the
love for Spanish.

Having been born and raised behind the Iron Curtain, in a country
where Western influence was limited and the official and only language
was romanian, I was on my own. Everyone around me, especially my
family, had trouble understanding what could possibly draw me to
such a foreign and, in their opinion, unattractive language. But as they
say, love is blind, and the truth of the matter is that I wasn’t even sure
what it was exactly that made Spanish so fascinating to me. The only
thing I knew was that I absolutely adored hearing its perfectly articu-
lated phrases, and trying to make sense of its sweet and tender words:
serenades to my innocent ear.

Spanish entered through my door on June 16th, 1994, when a man
from the local cable company came to connect our living room to the rest of the world. That day, I was introduced to “Acasa,” a romanian
cable network dedicated to broadcasting Spanish language telenovelas
(soap operas) to romanian audiences. As I learned to read, I started as-
sociating the romanian subtitles with the Spanish dialogue, and little
by little, I began understanding the language. For a little girl who had
yet to discover new aspects of her own language, this was quite an ac-
complishment, but no one around me felt the same way. My father,
enraged at my apparent “obsession” with the language, scolded me in-
cessantly, declaring that:

“We are immigrating to the United States, not to Mexico! You should
spend your time learning English instead of watching that nonsense!”

Sadly, my family’s objection was only the first of many hardships
I was bound to encounter. When I was nine, my immigration to the
US forced me to say goodbye to what had become a huge and indis-
pensible part of me. I needed to hear Spanish, to listen to it daily, and
although Los Angeles could be considered a Spanish speaker’s paradise,
my largely romanian neighborhood allowed for little interaction with
the language. For six years, destiny kept us apart and the feelings that
Spanish had evoked in me soon faded away.

But high school brought about a new era in my life, an era in which
my love for Spanish was revived and greatly amplified. For an hour a
day, life was put on hold and I was able to speak and read Spanish more
actively than ever. After two years of Advanced Placement Spanish, I
not only understood the language to perfection, but spoke it flawlessly
as well.

There are no words that can describe how proud and greatly ac-
complished I feel today at my ability to speak Spanish. During a recent
trip to Mexico, I was mistaken more than once for one of the natives.
One man, after seeing my romanian last name, asked me if it was my
husband’s, for undoubtedly, he believed, I was Mexican. given to a
romanian girl, whose family members were oblivious to the language,
and who had learned it on her own despite their objections, this was
the greatest compliment of all. In the United States, Spanish is the sec-
ond most spoken language and a great asset for anyone who speaks
it. It is not “nonsense,” as my father had dubbed it, and being able to
prove this to him has made me even prouder for loving Spanish.

My love of Spanish has influenced much of who I am today. The
fight that I led against family objections and immigration to a new land has allowed me to develop an ambitious and aggressive spirit in the
face of adversity. It has made me stronger, and taught me that I must
always fight with unstoppable perseverance for all that is important to
me. I am determined to use my love and passion for Spanish to make
an impact on the world. Currently, Spanish is the primary language
of 21 nations around the globe, and one of the six official languages
of the Un. I want to be the link that connects these nations to the
United States, and to the 40 million Americans whose native language
is Spanish. I want to use my ability to speak Spanish to learn more
about the people of these nations, both on a professional and personal
level. no matter where the path of life takes me, I wish for Spanish to
always be a part of me.

Through the years, Spanish has evolved into one of my most re-
markable accomplishments. Today, I am prouder than ever of loving
Spanish-of having something that distinguishes me from the rest, some-
thing that makes me unique. It is not often the case for a romanian-
American girl living in Los Angeles to exhibit such passion and devo-
tion towards a language that is foreign to both her native and adoptive
countries. nevertheless, Spanish is a big part of whom I am today, and
an even bigger part of who I will be in the future.`,
                analysis: `Oana’s essay opens with a fresh perspective on a theme that is of-
ten overused and can easily become hackneyed—love. The first sen-
tence surprises us: “When I was four years old, I fell in love.” Her young
age piques our curiosity, and she holds our suspense until the last
sentence. Like many of the excellent essays in this book, the strength
of this essay lies in its originality. Oana describes a love for the lan-
guage of Spanish. Learning Spanish in itself may not seem particularly
exceptional, but Oana’s background as a Romanian provides an un-
usual and memorable juxtaposition to her Spanish-speaking abilities.

In her descriptions, Oana playfully and effectively uses terms relat-
ing to love. For example, she notes that “love is blind” and personifies
Spanish as it “entered through [her] door on June 16th, 1994.” The
sentence, “for six years, destiny kept us apart” continues to perpetuate
a personified sense of Spanish, the language, being a “lover” to Oana.
These examples show the power of artfully expanding on a metaphor
to provide richness and coherence to one’s essays.

Oana’s love for Spanish’s sweet serenades contrasts with her
family’s feelings towards this foreign and “unattractive” language. She uses her father’s comment to capture these negative sentiments with
powerful dramatic effect: “We are immigrating to the United States,
not to Mexico! You should spend your time learning English instead
of watching that nonsense!” His criticisms only make Oana’s accom-
plishments all the more admirable and memorable—how many other
Romanian girls teach themselves Spanish through watching telenove-
las while their family looks on disapprovingly?

Oana writes frankly of the “hardships” she encountered, first in the
form of family resistance to learning Spanish and later in the form of
lacking an environment for communicating in Spanish in her predomi-
nantly Romanian Los Angeles neighborhood. However, she demon-
strates her dedication to Spanish during the “new era” of high school,
when she studied actively for two years and astonishingly became flu-
ent in the language.

Oana relates several amusing anecdotes from her trip to Mexico to
corroborate her fluency in Spanish. We learn that she “was mistaken
more than once for one of the natives.” She might have chosen to tell
us more from this trip in order to show ways in which she was able to
“prove” to her father that Spanish was “not ‘nonsense’.”

In her penultimate paragraph, Oana relates her long process of
learning Spanish to her “ambitious and aggressive spirit in the face
of adversity” as well as to her further plans “to use [her] love and pas-
sion for Spanish to make an impact on the world. Oana could have
ended her essay with this paragraph, since her final paragraph mostly
reiterates what she has already said. While it can be tempting to use
concluding paragraphs to recap what you have already written, it is
best to end in a way that seems fresh, rather than regurgitating what
has already been said.`
        },
        {
                id: "flaubert-frisbee",
                categoryId: "personal_statement",
                title: "From Flaubert to Frisbee",
                author: "Aditya Kumar",
                university: "Brown University",
                theme: "Academic Passion / Growth",
                excerpt: "This summer, I went to the Governor’s Honors Program... It was the best thing that has ever happened to me...",
                content: `This summer, I went to the governor’s Honors Program, also
known as gHP, a six-week intensive college-like experience where the
best and brightest students in georgia gather to learn and grow as in-
dividuals. It was the best thing that has ever happened to me. That
is something of a hackneyed phrase; people cheapen the extremes of
language by constantly using superlatives for everyday occurrences,
making it harder and harder to actually describe the few subtle and
transcendent moments of life. In Madame Bovary, Flaubert claims that language is but a cracked kettle on which we play music for the bears to
dance, while we dream of making the stars weep. The experiences we
have never fit within the too-close confines of language; but I will try
anyway. The classes that I attended were nothing like the classes that I
would take normally. nowhere else would the teachers encourage six-
teen and seventeen year-olds to look for sexual imagery in Shakespeare,
and then find even more than they did, without the exercise being
sordid instead of literary. I attended classes named anything from Dirty
Words: Clean Thoughts (a class on Profanity; the only course in which
the use of profane or vulgar language was prohibited) to Teenage Female
Angst: Beyond Holden Caulfield to Buffy the Vampire Slayer. All of them
opened my mind to a brand-new way of looking at the world, and pro-
cessing information. Thanks to the varying education that I received, I
know that valuable information about life is not only in the “classics,”
but even appears in seemingly mindless and trashy zombie films.

While I learned a lot in the classrooms of gHP, I feel that most of
my growth occurred outside of the classroom. I met the sort of people
who will change the world, who will go forth into the world and, with-
out making a big name, will do the things that make the world a better
place. My best friends there were people that I would never have met;
people I would never have known existed; people that I can now not
imagine life without. One was a math major, an excellent athlete in
every sport, and an accomplished singer; the running joke was that the
only thing that he was bad at was failing. The other was a phenomenal
writer, always ready to play an endearing trick on somebody, and the
former’s girl-friend. Both of them were fairly conservative Christians,
and yet totally accepting of me for whom I was, despite any of my
clashes with their beliefs. I did not limit myself though, and made it al-
most a mission to find and talk to as many of the people there, because
I was sure that each and every one of them would have an interesting
perspective on things. Once I was walking back from playing Frisbee,
and was stopped to discuss what the ethical framework for life ought
to be; just for fun. The experience that I had there has undeniably
changed me forever.`,
                analysis: `Aditya’s description of his six weeks at GHP make use of plen-
ty of diverse and lively examples to demonstrate how this “was the
best thing that ever happened” to him. The one-paragraph format that
Aditya chooses can be difficult on the readers, since long paragraphs
can be quite daunting. Aditya might have chosen to create a new para-
graph with the sentence, “The experiences we have never fit within the
too-close confines of language; but I will try anyway.” Another logical
place to begin a new paragraph would be with the sentence, “While I
learned a lot in the classrooms of GHP, I feel that most of my growth
occurred outside of the classroom.” In general, multiple paragraphs
help organize an essay to focus the content and provide flow to overall
paper structure.

While the sentence, “It was the best thing that has ever happened
to me,” seems simplistic, Aditya quickly redeems himself from the cli-
ché with a sentence that shows his mastery of the English language.
He writes, “That is something of a hackneyed phrase; people cheapen
the extremes of language by constantly using superlatives for every-
day occurrences, making it harder and harder to actually describe
the few subtle and transcendent moments of life.” His reference to
Madame Bovary demonstrates Aditya’s ability to draw connections
between ideas and thereby support his own assertions. The examples
Aditya references are particularly strong because he relates them to
one another, instead of simply rattling off a long list. It can be challeng-
ing to present a diversity of interests while also holding a core focus.
Aditya’s center appears in the form of literary and cultural analysis of
many sources, from classics to “trashy zombie films.” The reference
to Madame Bovary also shows us that Aditya truly learned to open
his “mind to a brand-new way of looking at the world, and processing
information.”

Had Aditya ended his essay here, we would have learned about
his cognitive development but missed out on the social and emotional
aspects of his GHP experience. The descriptions of the close friend-
ships Aditya formed with a diverse group of people further strengthen
our understanding of how Aditya grew to be an open-minded person.
Aditya devotes quite a large amount of space to talking about the math
major who couldn’t fail and his writer girlfriend; he might have sum-
marized this information more concisely in order to explain his own
relationships to them. By writing that they totally accepted him, Aditya
removes his personal agency; he could have reworded the essay to
explain how he became more accepting of them.

The last sentence of the essay, “The experience that I had there
has undeniably changed me forever,” is somewhat abrupt. With limited
space, it is important to have both a strong introduction and a strong
conclusion that are not so open-ended that they could be generalized
to everyone. The most compelling part of Aditya’s essay is not that
“The experience that I had there has undeniably changed me forever”
but rather in the sophisticated literary analyses he made, the friend-
ships he formed, and the Frisbee he played. When space is limited, err
on the side of more detailed descriptions and fewer generalizations.`
        },
        {
                id: "raising-the-bar",
                categoryId: "personal_statement",
                title: "Raising the Bar",
                author: "Anonymous",
                university: "MIT",
                theme: "Academic Passion",
                excerpt: "This past summer I had the opportunity to participate in a highly rigorous academic program at MIT called MITES...",
                content: `This past summer I had the opportunity to participate in a highly
rigorous academic program at MIT called MITES, Minority Introduction
to Engineering and Science. For six and a half weeks I lived with 68
other rising seniors and college undergrads. Though we were all warned
about how hard the program would be, we were all at the top of our
classes and refused to believe it- after all, who did they think we were?
The first day we sat together in a small auditorium, unaware of each
other and of what lay ahead. We were told that our confidence would
be shattered, our minds blown away, and our lives changed forever.
Still somewhat unmoved, we were not afraid.

By the second week of MITES valedictorians, nerds, bookworms,
and techies alike were leaning on each other’s shoulders at two in the
morning crying over problem sets they had imagined only in night-
mares. It is a well known fact that hard times bring friends closer to-
gether, but I would have never expected for these strangers to become
my best friends, my support system, or even my family. The 16 hours
days I was accustomed to at home did not last long. I was getting an
average of four hours of sleep per night, finishing a book per week,
zooming through subjects once foreign to me, and constructing a semi-
autonomous robot from drill motors all at the same time.

We were each enrolled in 5 classes, my schedule consisted of
Introductory Physics, Engineering Design, Chemistry, first year
Calculus, and Humanities. In the month and a half we completed a
semester of Physics and Chemistry each, a full year of Calculus, the ma-
terial equivalent to a semester in AP literature, and introductory level
engineering. The work was so intense that when I entered school in the fall I enrolled in second year Calculus, and maintained the only A in AP
Physics, having no physics experience prior to MITES.

Since this program I have not been satisfied with the regular course-
work given at my school. I am constantly on the lookout for new pro-
grams to enroll in and other teams, clubs, and groups to join. This
academic school year marks the peak of my involvement in educa-
tional opportunities. I have somehow managed to find time for the
Speech and Debate team, ACE mentoring team, swim team, Science
Bowl team, California Honors Society and Scholarship Federation, Play
Production, Jewish Student Union, gEAr-UP Mentoring Program, and
folklorico dancing.

MITES was the most challenging experience of my life. The pro-
gram is the single most pivotal point in my academic endeavors to date.
The assistants we had had all gone through the program and agreed
that even in college at Harvard, MIT, Caltech, and Princeton, nothing
came close. The motivation and encouragement I gained from MITES
has fueled my academic pursuits and pushed me to raise the bar.`,
                analysis: `Many students choose to write about a transforming summer edu-
cation experience. In “Raising the Bar,” the author describes the gru-
eling, rigorous academic program at MIT in which she participated.
Foreshadowing the difficulties that lay ahead, the author writes, “We
were told that our confidence would be shattered, our minds blown
away, and our lives changed forever. Still somewhat unmoved, we
were not afraid.” This fearless attitude gives way to “crying over prob-
lem sets.” The essay aptly describes the intensity of the program by
explaining how busy the days were. She found herself “finishing a book
per week, zooming through subjects once foreign to [her], and con-
structing a semi-autonomous robot from drill motors all at the same
time.” While these tasks might seem like a list, they are necessary to
account for the author sleeping only four hours a night. When describ-
ing an event with a scope that is quite broad—in this case, six weeks
long—it is always helpful to hone in on a few highlights. Three is typi-
cally a good number of examples. This essay might be stronger had
the author explained more about the robot construction, since this is an
unusual activity that piques the reader’s curiosity. As a major project,
the robot may have merited more space in the essay. The author could
have spent less time listing the classes she took, especially if she
could list this elsewhere in the application. What is more compelling
than any course title is her observation that “the work was so intense that when [she] entered school in the fall [she] enrolled in second year
Calculus, and maintained the only A in AP Physics, having no physics
experience prior to MITES.” This demonstrates the extent to which her
learning was accelerated because of the MITES experience.

At the end of the third paragraph, the author gives a long list of
activities in which she is involved. It is unclear what some of the activi-
ties entail—for instance, the ACE mentoring team, or the GEAR-UP
Mentoring program. These examples might be more appropriate in
a resume or another section of the admissions essay. Choosing one
main activity or event and elaborating on it is a strategy to help keep an
essay focused. While it is tempting to list all of our accomplishments, it
is more memorable to focus on just one, or a few. Ultimately, the author
brings us back to her main point, that MITES was a pivotal point in her
academic career. Having a main thesis helps tie together an essay. In
this paper, the author summarizes by saying, “The motivation and en-
couragement I gained from MITES has fueled my academic pursuits
and pushed me to raise the bar.” When editing your own writing, ask
yourself if your various examples, sentences, and paragraphs serve
the main point. This helps create a coherent, tightly-woven essay.`
        },
        {
                id: "puzzles",
                categoryId: "personal_statement",
                title: "Puzzles",
                author: "Anonymous",
                university: "Harvard University",
                theme: "Logic / Resilience",
                excerpt: "When my grandmother came to visit five years ago, she brought me a 3,000 piece jigsaw puzzle...",
                content: `When my grandmother came to visit five years ago, she
brought me a 3,000 piece jigsaw puzzle. To most, this would not sound
very exciting—it would be almost as bad as a shirt saying “My grand-
parents went to India, and all they bought me was this stupid shirt.”
My reaction to the puzzle was different. I cut open the cardboard box
as soon as I could, and poured the pieces out onto my puzzleboard.
I worked patiently on the puzzle for hours at a time, my excitement
building as more and more of the picture was revealed. I cut down my
sleep time until the image of a picturesque forest was complete. The
puzzle overshadowed all else in my life, if only for that short period of
time.

Working on puzzles has helped me gain focus, determination, and
patience. I have learned to apply these qualities to every task I face,
dealing with the outside world in the same fashion as I would a puzzle.
My love for science stems largely from this; science requires the same
logical and levelheaded approach that a puzzle does, and as evidenced by the many puzzles decorating my house, this is an approach which
suits my skills and temperament. This intellectual stimulation, coupled
with a desire to discover more about life’s mysteries, compels me to
pursue a career in scientific research.

This summer, I worked in a cardiology laboratory at UCLA, look-
ing at proteins associated with HDL to understand how atherosclerosis
can be averted. After some experiments provided questionable results,
I was given the task of confirming that the viruses we were working
with had been packaged and identified correctly. I spent weeks running
DnA gels, looking for specific genes in each virus, but my results were
inconsistent. I was frustrated, but instead of giving up on my assign-
ment, I was even more determined to find an explanation. I considered
every aspect of the experiment, working backwards until I reached the
source—the primers I had used to amplify the DnA were nonspecific
and ineffective, and thus useless in distinguishing the three genes of
interest to us. Knowing this, I was able to alter my experiment accord-
ingly, looking at protein content instead of DnA sequences. I finally
showed that two of the three viruses were correct; the third, however,
needed to be repackaged. My work was crucial to the undergraduate
student I was working with, because he was able to redesign his experi-
ment to account for this third virus.

Working in a lab was an exhilarating experience for me. Even though
I gave up lying on the beach to instead play with viruses and chemicals,
the compulsion to understand these proteins inspired and motivated
me. I am tremendously proud of the piece I contributed to the athero-
sclerosis puzzle: a small piece, but integral nonetheless. The sense of
accomplishment I felt because of my work in the UCLA lab was much
the same as that which I felt upon completing the 3,000 piece puzzle
my grandmother gave me. This feeling is one I hope to experience
throughout my life, because the atherosclerosis puzzle is most assur-
edly not the last such puzzle I will work on.`,
                analysis: `The writer’s essay takes a tangible theme—puzzles—and uses it
in a variety of ways to demonstrate her interests, passions, and values.
Her writing is engaging because it plays with many different senses of
the word “puzzles,” so the theme doesn’t feel tired or redundant. She
begins her essay with a reference to a 3,000-piece jigsaw puzzle that
her grandmother gave her. Her subsequent use of humor (“To most,
this would not sound very exciting—it would be almost as bad as a
shirt saying ‘My grandparents went to India, and all they bought me
was this stupid shirt’”) effectively draws readers in. This statement also
sets up an expectation that most people would not be thrilled by this
gift but that the writer is not “most people.” We can see that she is de-
voted to completing the impressively large puzzle by her mention that
she even sacrificed sleep in pursuit of her goal.

In her second paragraph, the writer links this pastime to her in-
tellectual interests. She makes a clear and compelling comparison
between puzzles and scientific research, noting that both require a
“logical and levelheaded approach.” She demonstrates self-knowledge
when she notes that this “suits [her] skills and temperament.” This
analysis is very explicit and may seem to violate the “show, don’t tell”
rule; but in her case, it helps us make the connection between puzzles
and science—a connection that might not be immediately clear—and
does so with precisely the “logical and levelheaded approach” that she
describes. It is important to remember that rules like “show, don’t tell”
are meant as guidelines but can be flexibly interpreted. It is best not to
sacrifice one’s personal voice for writing “rules,” which are best thought
of as recommendations.

The beginning of the third paragraph takes us away from puzzles
but aptly illustrates her dedication to a career in scientific research.
Using an appropriate level of vocabulary, she describes her research
at a UCLA cardiology lab. This demonstrates that she can explain
complex ideas in clear and concise terms, a great strength for any re-
searcher. The laboratory provides a different context for us to see the
writer’s response to challenging problems as well as a tireless resolve
to solving any mystery.

The final paragraph nicely wraps up the essay by referencing the
3,000-piece jigsaw and her lab work to illustrate the broader theme of
solving puzzles. We can see that the writer is both proud of her work
(it is “integral”) and humble (it is “a small piece” of the atherosclerosis
puzzle), and she is eager to apply her spirit of curiosity and enthusi-
asm to her future college endeavors.`
        },
        {
                id: "addressing-injustices",
                categoryId: "personal_statement",
                title: "Addressing Injustices",
                author: "Mathew Griffin",
                university: "Brown University",
                theme: "Social Justice / Medicine",
                excerpt: "My reasons for wanting to be a doctor are very similar to why most people choose their career path...",
                content: `My reasons for wanting to be a doctor are very similar to why
most people choose their career path: I want to make things fairer.
People such as social workers are out to help make the world a little
less unjust. It’s not necessarily injustice from other people that I want to
fight as these people do, but injustice from other factors. Many people
who are close to me have been struck down from their future in ways
that it’s impossible for them to recover. My aunt was a great artist and
loving mother before she developed severe schizophrenia. She now
locks herself in her house for weeks at a time and remains isolated
from her family. My friend Eric, who was once in his school’s varsity
basketball league, cannot play his senior season because a car acci-
dent left him nearly paralyzed. Finally, my friend vince’s depression has
stripped him of his will to live, and despite attempts of over a dozen
psychiatrists and medications he still spends most of his days aimlessly
lying in bed. While I try very hard to cheer him up by talking to and
entertaining him I am deeply concerned about his future. This trend is
something that I’m seeing almost everywhere. More and more people
are becoming depressed and hopeless, and I want to be able to put life
and happiness back into them.

not only do I see these injustices in my life, when I’m volunteer-
ing at my local hospital my desire to help become even more embold-
ened by the people I meet. A new grandmother I met recently had
her spine shattered when she fell from a ladder back onto a table. As I
talked to her, I remembered how many times I’ve seen pictures of my
grandmother lifting me and my cousins and caring for us, and became
overcome with emotion. While I don’t believe her ability to care for her
grandchildren will be destroyed, I know that she won’t have the same
opportunities as other grandparents and the inequality of the situation
makes me extremely upset. I want nothing more than to give back her
ability to walk and lift her grandkids. I believe being a doctor can allow
me to bring this closer.`,
                analysis: `This essay demonstrates Mathew’s commitment to social justice.
Rather than making justice an abstract or philosophical issue, the es-
say shows us how it is directly relevant to Mathew’s life by giving this
injustice many faces: those of his aunt, his friends Eric and Vince, as
well as the people he has met through volunteerism. While a long list
of these people probably would not be interesting to read, Mathew
has fit them into his essay as characters in stories. He does this by
keeping the personal profiles distinct (his aunt has schizophrenia, Eric
was paralyzed in a car accident, Vince is depressed). Furthermore,
the organization of this short essay helps separate the people about
whom he writes into two categories: 1) those who are close to him
and 2) those who are in the wider community. In this way, Mathew
shows the influences that are closest to home before branching out to
the bigger community. As Mathew’s essay demonstrates, writing about
one’s personal experiences is an effective way to rein in a topic as all-
encompassing as justice.

The beginning of Mathew’s essay makes a generalization. He
states, “My reasons for wanting to be a doctor are very similar to why
most people choose their career path: I want to make things fairer.”
Mathew might have started with simply: “I want to make things fairer.”
Since the essay questions specifically ask why he is interested in med-
icine, referencing all professions and careers beyond medicine broad-
ens the scope of the answer rather than narrowing it. Furthermore, it is
best to avoid sweeping generalizations in order to respect the plurality
of beliefs in the world. For instance, many people may not choose their
career paths to make things fairer; some may be motivated by money
or fame. “Things” is also a bit vague, as is the phrase “other factors”—
Mathew’s might have clarified these terms so we can have a stronger
sense of what sources of injustice he is hoping to fight.

Mathew takes advantage of the essay prompt to write about his
volunteer work at a recent hospital. His story about the grandmother
he met is heart-touching because Mathew is willing to share his per-
sonal reaction: “As I talked to her, I remembered how many times I’ve
seen pictures of my grandmother lifting me and my cousins and caring
for us, and I became overcome with emotion.” This gives us a sense of
Mathew’s deep sense of caring for others.`
        },
        {
                id: "unpopular-decision",
                categoryId: "personal_statement",
                title: "My Unpopular Decision",
                author: "Shiv M. Gaglani",
                university: "Harvard University",
                theme: "Research / Initiative",
                excerpt: "Since I have always been interested in science and technology, I subscribed to many research magazines...",
                content: `Since I have always been interested in science and technolo-
gy, I subscribed to many research magazines, including Popular Science
and Scientific American. However, until 10th grade, I never had the op-
portunity to contribute to medical research—something that I had al-
ways wanted to do. Then, one day I read an article titled “Print Me a
Pancreas, Please” in Popular Science, which described novel tissue engi-
neering research involving modification of off-the-shelf inkjet printers
to print out living cells in a “bioink” solution. Having read much about
tissue engineering, I realized this “organ printing” approach could po-
tentially address problems of traditional tissue engineering methods,
such as the need to precisely place specific cell types in 3D scaffolds.
I was so excited that I came up with a few ideas of my own about ad-
vancing the printer capabilities. I was impelled to contact the research-
ers at the Medical University of South Carolina (MUSC) and Clemson
University (CU).

I corresponded with the professor at MUSC and visited his lab
multiple times, but realized that the actual printers were kept at CU.
Therefore, I contacted the researchers at CU, who did not reply to
about 50 of my e-mails. not the one to give up easily, I called the
Principal Investigator (PI) and expressed my eagerness to contribute
to the research. After seeing my resumé and computer-aided designs
(“roadmap to Organ Printing”), he invited me to meet him at his lab on
October 18th, which conflicted with my school’s Homecoming dance.
To my friends’ bewilderment I made the “unpopular” decision to miss
the dance. They could not understand why I preferred driving 26 hours
to meet a researcher and miss all the fun at the once-a-year dance. To
me, this was clearly the right choice. I was trading a great school expe-
rience to literally get my hands into cutting-edge medical research.

The PI was so impressed with my original CAD designs (“roadmap
to Organ Printing”) and my resume that he invited me to research at his
lab. Over Christmas and other school breaks, I learned many laboratory
techniques, conducted novel research, and independently succeeded
in “printing” the first functional 3D branching tube of smooth muscle
cells (a rudimentary blood vessel). This research helped me win many science competitions and honors, including 2nd Place in Medicine
and Health at the Intel International Science and Engineering Fair and
become the Top Florida Presenter at the national Junior Science and
Humanities Symposium. My computer-aided designs were published
in Biomaterials Forum and the Journal of Thoracic and Cardiovascular
Surgery.

This remarkable experience inspired me to perform many addition-
al research projects and I consider it a turning point in my life. It has
increased my passion for research and my determination to be a phy-
sician and work on devices or pharmaceuticals that improve people’s
quality of life. I have also become more confident in my research ef-
forts and am able to contact any researcher to pursue a position in
their laboratory. I have realized that there are many opportunities for
students like myself to contribute to labs and brainstorm solutions for
current problems.`,
                analysis: `Shiv demonstrates motivation and drive in this essay about his
passion for research in science and technology. Many essays about
academic interests focus on schoolwork or extra-curricular activities
such as Science Clubs or math competitions. Shiv’s story deviates
from the norm by showing how “academic” interest is also a passion
in his free time—the references to Popular Science and Scientific
American illustrate this hobby. The most unique element of Shiv’s story
is his bold initiative in contacting the researchers at MUSC and CU
after reading the “Print Me a Pancreas, Please” article. Shiv writes
about his response to this article in concise, clear terms. “Having
read much about tissue engineering, I realized this “organ printing”
approach could potentially address problems of traditional tissue en-
gineering methods, such as the need to precisely place specific cell
types in 3D scaffolds.” While somewhat complex, the ease with which
he uses terminology demonstrates Shiv’s familiarity with the topic.

The second paragraph of the essay presents many small but de-
lightfully informative details that show Shiv’s determination in pursu-
ing research. We learn that he sent 50 emails to researchers, then,
undaunted by the lack of a response, called the PI and arranged a
personal meeting. He drives an astonishing 26 hours to meet the re-
searcher, and “made the ‘unpopular’ decision to miss the dance.” Shiv’s
resolve is clear: “To me, this was clearly the right choice. I was trading
a great school experience to literally get my hands into cutting-edge
medical research.” These details distinguish Shiv from his peers. 

The third paragraph also provides details that show Shiv’s distinc-
tive accomplishments, including his original computer-aided designs
and science competition awards. However, these details read like a list
and could easily be included in a resume. It might be more compel-
ling to write about the meaning of an award rather than simply listing
its name, as Jason’s essay “Birthing a Business” (Chapter 14) shows.
Shiv briefly mentions the laboratory techniques he learned on his
way to achieving his award. Strong essays not only summarize the
end product (an award) but also describe the process, the means to
achieving the end.

Shiv’s essay does a nice job of combining specific references to his
research and larger, overarching goals. By presenting the story of the
“turning point” of the university research experiment, Shiv compellingly
illustrates his entrepreneurial instinct and passion for applied research
that is directed toward finding solutions to real-world problems.`
        },
        {
                id: "caden-b",
                categoryId: "personal_statement",
                title: "I have blond hair and pale skin",
                author: "Caden B.",
                university: "Harvard University",
                theme: "Identity / Race",
                excerpt: "I have blond hair and pale skin. On the color wheel, my father is a rich mocha, my sister is a warm copper...",
                content: `I have blond hair and pale skin. On the color wheel, my father is a rich mocha, my sister is a warm copper, and my mother is a perfectly tanned caramel; I am somewhere between cream and eggshell on the opposite end of the spectrum. Being stereotypically white can be difficult when you’re African American.

The beginning of high school was when I first began to feel that my fair complexion hid my true identity. When I entered ninth grade, I was delighted to find myself in the company of an entirely new group of friends. Upon meeting my parents for the first time, my friends smiled warmly at my mother and gaped at my father, their eyes widening as they flitted between him and myself. However, I was pleased to find that all of them were accepting of my family’s ethnic composition. As our group became closer, we often discussed our futures. During one conversation, we outlined our weddings, collapsing into fits of giggles upon hearing each other’s extravagant dreams. Once our laughter had subsided, one girl said more seriously, “One thing’s for sure, I could never marry a black guy. It would just be too difficult with the race thing.” I blinked, waiting for a reaction. None came. Why had no one jumped to my defense? Did people not see my white mother and my black father when they looked at me? It was then that I realized to my friends, I wasn’t black.

Incidents like this made me recognize that being biracial has inherently given me perspective that many people lack. When a friend told me that her parents would never allow her to date someone of a different race, I couldn’t understand why. When I revealed my biracial heritage to a black friend, she became noticeably warmer toward me and happily shared the news with her friends as we walked by them in the hall. My much darker sister does not share these experiences. We draw from the exact same gene pool, but my sister’s complexion allows her complete racial inheritance to shine while mine cloaks half of it.

My sister knows her race because her appearance reflects it. But do I? Is a girl still black if nobody sees it? Should it matter? Growing up pale, blond, and black has influenced me. I feel obligated to immediately tell people about my race because my looks do not convey it. Nevertheless, I know who I am. Though my friends joke about me skipping the “black gene,” I am just as connected to my father’s Louisiana roots as I am to my mother’s Alabaman ancestors. Racial identity is marked by more than arbitrary features like skin tone, and while we are unable to choose our exact coloring, we do choose who we are. My appearance and the responses it elicits have shaped me but do not control me. Beneath fair hair and light skin, I see a girl who is both black and white. I see me.`,
                analysis: `At first glance, Caden’s essay seems like a generic essay about “diversity”—a hot college-acceptance buzzword. Wrong. Caden takes the important topic of identity and weaves it into a beautifully composed coming-of-age tale, showing how her self-confidence and ability to overcome challenges grew. She writes in a playful tone that makes reading her essay an entertaining experience rather than a chore. By incorporating memories of conversations with friends in her freshman year in high school, she lets readers into her personal life, taking the edge off the serious undertones of her conflicts with “extravagant dreams [of weddings].” This combination of her racial identity issues and her youthful memories shows a maturity of thought and understanding of others as well as herself.

However, she does not forget to draw the attention back to the key point of her story—her firm acceptance of her character. After her first two sprightly paragraphs, her tone shifts and becomes authoritative. She employs short and straightforward sentences as the essay progresses, such as the declaration: “I know who I am” in the final paragraph. Caden writes with a powerful voice that distinctly proves she accepts her biracial identity, despite her appearance that leads others to make false assumptions. Although the final line, “I see me,” can be seen as a reach, it works for Caden. By that point in the essay, she has earned it. It caps off the confident tone of the last few paragraphs that express her comfort with her racial identity. All in all, Caden created a well-written story that displays both her writing prowess through smooth transitions between different voices and her ability to overcome the greatest challenge of being comfortable in one’s skin.`
        },
        {
                id: "christiane-zhang",
                categoryId: "personal_statement",
                title: "The Culinary Pot on the Backburner",
                author: "Christiane Zhang",
                university: "Harvard University",
                theme: "Identity / Culture / Food",
                excerpt: "American food is the pot on the backburner that I check only occasionally. Eleven years of living in the United States have attuned my taste buds...",
                content: `American food is the pot on the backburner that I check only occasionally. Eleven years of living in the United States have attuned my taste buds to the marbled texture of ground beef alongside melted American cheese, topped off with a refreshing, crunchy layer of lettuce, complemented by the sweet contrast of ketchup, all sandwiched within an unremarkable bun. Somehow I find myself enjoying this greasy, messy, yet satisfying meal; the chance (fatty) bacon strips only increase the appeal of my burger. Indeed, in my family, I am the only one who appreciates its savor and simplicity. But I know I could not survive on a diet of burgers, fries, hot dogs, chocolate chip cookies, or any food that I brand as “American,” as enticing as they sometimes are. Instead, the two thousand (or more likely four thousand) calories that I take in every day originate eight thousand miles away.

At home, Mom is the chef, and in my fair and equitable opinion, no one rivals her in traditional Chinese food. Her signature dish is qiongrenmian, literally “poor man’s pasta,” which I would voluntarily eat every day, unlike its American counterparts. More of a stew, qiongrenmian comprises of clumps of flour and water, boiled into small, soft bites floating along with tender pieces of pork, splashes of tomatoes, and dispersed clouds of eggs. The flavors meld together, and so I add some sweet chili garlic sauce, the playfully piquant surprise offsetting the cozy, home sensation. My taste buds are so responsive that I wonder if I am not perhaps a poor Chinese man, as the dish’s name suggests. Thankfully, I have yet to see a poor man in China enjoy something this luxuriously poor, this deliciously simple, so I’m reasonably certain that I am not a Chinese beggar.

As much as I love simplicity in cooking, I cannot resist the more complex wonders of la cuisine française, and I will frequently indulge in my love of French baking. Perhaps I romanticize my French birth a little. Regardless, I feel decidedly French as I watch my raspberry soufflés rise or my biscuit aux pommes turn golden. My most recent escapade involved five hours of preparation to produce fragile, miniature white macarons filled with smooth chocolate ganache. Despite the tedious work, French desserts seem incapable of disappointing, whether after an elegant meal of savory steak tartare and andouille sausage, or simply a burger or qiongrenmian.

My next project? I think I’ll catch a Canadian goose and make some foie gras.`,
                analysis: `The writer’s essay describes herself in terms of cooking—she is one of many identities with the drive to discover new ones. By introducing herself not directly as a multicultural person, she piques our interest in her varied heritage. Additionally, by mentioning her “next project,” whether in jest or seriousness, the writer hints at her willingness to go ahead and try new things, to take on new goals. The essay is a display of subtle hints at a person through the revelations of food.

However, the immediacy with which she dives into food and the total separation of her nonfoodie self leaves a very focused view of who she is. Though the overall effect of an essay that sounds like it could appear in Bon Appétit is tempered by a personal writing style, dotted with parentheticals and soft humor, the overall feel of large portions of the essay is decidedly not personal nor revealing. With a little less detail, particularly in the next-to-last, French-laden paragraph, the writer could have preserved the intimacy of revealing her tastes and culture in a subtle way.

But overall, the essay presents a likable, thoughtful person with a strong sense of who she is. Christiane succeeds at expressing herself as a bicultural individual with a taste for good cooking.`
        },
        {
                id: "whitney-gao",
                categoryId: "personal_statement",
                title: "More Than Just a Registration Number",
                author: "Whitney Gao",
                university: "Harvard University",
                theme: "Identity / Balance / Service",
                excerpt: "It is October 9, and a multitude of high school students have gathered at the test center for a morning of standardized testing...",
                content: `It is October 9, and a multitude of high school students have gathered at the test center for a morning of standardized testing. This morning, we are all faceless little numbers. This morning, I am registration number *******7. It is very nice to meet you.

Three hours later, it is time to commence a mass exodus. A sea of bodies floods the halls before bursting through the floodgates, eventually separating and becoming individual trickles. As we all return to our various corners of Little Rock, we finally lose the anonymous masks and become individuals. I am no longer just a number; I am now me.

I am a sister. I am a daughter.

I am an under-the-covers reader of fashion magazines. I am absolutely obsessed with math and science. I am the girl whose laugh you hear all the way down the hallway.

I am a figure skater whose favorite spin is a layback. The ice rink is my escape, and the Diamond Edge Figure Skating Club is a second family. I am a pianist whose favorite piece is Edvard Grieg’s Piano Concerto in A Minor, Op. 16. My thirteen-year-long love affair with music has led me to much happiness and accomplishment, and I hope it continues for all of my life. Endless hours devoted to these activities have taught me skills necessary for the future, including self-discipline and perseverance.

I am an ardent volunteer in my community, and I have the privilege of serving as the president of the largest Junior Civitan club in the world. The people I have met and the experiences I have had have left lasting impacts on me and given me memories and lessons that I will carry forever. Being a Civitan, while allowing me to participate in something that I love, has taught me the gift of appreciation. In one particular experience, I was especially struck with the amount of good fortune I possess. While working with the Salvation Army during their Christmas Angel Tree program, I met a mother whose family had become homeless very recently after a fire burned their house to the ground. The past few days had been an unimaginable struggle for hope. At the end of her story, her eyes were not the only ones filled with tears. Her unceasing thanks over just a few clothes and toys for her children brought my world into perspective for me. Since then, I have become the most avid promoter of community service because I believe that it is unquestionably essential to give back to the community in which you have thrived.

Numbers will always follow me. About two weeks later, I would be 2400. In the spring, a smattering of 5s would label me as well. But at the end of the day, the numbers and academics all fall away, and I am just me. The only number that remains is 1; there is only one me.

I am Whitney, and it is very nice to meet you.`,
                analysis: `This essay creates an image of a well-rounded girl; disciplined and dedicated, passionate about her extracurriculars, and academically excellent. She writes in smooth prose and demonstrates that she has put thought into who she is while drafting this personal statement.

But Whitney falls short in her attempt to escape anonymity and to stand out of the crowd of “faceless little numbers.” This personal statement reads like an enumeration of accomplishments with little or no analysis. Whitney writes that math and science are her obsession, but she does not sound truly passionate and academically motivated; she writes she is an accomplished pianist, but she does not explain how playing makes her so happy. While it is clear that the applicant has numerous talents, the superficiality with which these talents are treated makes this essay overall unimpressive.

Although she does not wish to be defined by numbers, Whitney hints at her perfect SAT and AP scores, which not only contradicts her stated purpose but is also inappropriate, as those numbers are already well in evidence in other parts of the college application. The one passage where simple listing turns into a more complex analysis of the applicant’s extracurricular involvement is the description of her service at the Junior Civitan club. Had the experience at the Christmas Angel Tree program taken an even more central stage, Whitney would have been more successful in leaving the sphere of anonymity. Similarly, a deeper analysis of the “self-discipline” and “perseverance” that ice-skating and music taught her would have given the reader a better insight into the applicant’s personality.

Whitney has put together all the pieces of a successful college application essay, but fell into a common trap—she tried to explain all the great things about herself, and while attempting to do that failed to stand out. If she focused on one of these many accomplishments, Whitney would have gone from a good and ultimately successful essay to a truly great one.`
        },
        {
                id: "chaffee-duckers",
                categoryId: "personal_statement",
                title: "Between Chad and Charlotte",
                author: "Chaffee Duckers",
                university: "Harvard University",
                theme: "Identity / Individuality / Work Ethic",
                excerpt: "I think the most tragic part of my childhood originated from my sheer inability to find anything engraved with my name...",
                content: `I think the most tragic part of my childhood originated from my sheer inability to find anything engraved with my name. I never had a CHAFFEE license plate on my hand-me-down red Schwinn. No one ever gave me a key chain or coffee mug with the beautiful loops of those double Fs and Es. Alas, I was destined to search through the names; longingly staring at the space between CHAD and CHARLOTTE hoping one day a miracle would occur. Fortunately, this is one of the few negative aspects of a name like “Chaffee Duckers.”

My name has always been an integral part of my identity. Sure, it sounds a bit like my parents created it from a bag of Scrabble tiles, but it comes from a long-lost ancestor, Comfort Chaffee. Now it’s all mine. In my opinion, a name can make or break a person. The ability to embody a name depends on the individual. My greatest goal in life is to be the kind of unique person deserving of a name so utterly random and absurd.

I began my journey in preschool. Nothing about me screamed normal. I was not prim, proper, and poised. I preferred sneaking away from my preschool classroom, barefoot, in the purple velvet dress I wore every single day to resting obediently during nap time.

I grew up in a family akin to a modified Brady Bunch. Stepsisters, half sisters, stepbrothers, and stepparents joined my previously miniscule household. But in a family of plain names like Chris, Bill, John, Liz, Katherine, and Mark, I was still the only Chaffee.

I was a bit of a reverse black sheep in my family. My name helped me carve an identity separate from my myriad of siblings. Instead of enriching my brain with Grand Theft Auto, I preferred begging my parents to take me to the bookstore. While my parents mandated homework time for my brothers, they never questioned my work ethic or wiretapped my assignment notebook. The thing that set me apart from the herd was that I was self-disciplined enough to take control of my own life. From the very beginning I never depended on my parents’ help or motivation to finish my schoolwork. Putting school first came naturally to me, much to the distaste and confusion of my siblings. My work ethic became known as the patented “Chaffee Method.”

As I got older, I began to embody my name more and more. I didn’t want to be that girl with the weird name in the back of the class eating her hair, so I learned how to project my ideas in both written and spoken forms. I was often picked to lead classroom discussions and my complete disregard for making a fool of myself bolstered that skill. The manner in which I operate academically is perfectly described as Chaffee-esque; including but not limited to elaborate study songs, complex pneumonic devices, study forts, and the occasional John C. Calhoun costume.

I take pride in the confusion on a person’s face when they first read my name. Seeing someone struggle over those two unfamiliar syllables fills me with glee. I feel as though I am adding a new word to their vocabulary. So on my last day as a page in the U.S. Senate, I prepared myself for the anticipated awkward stumbling as Senator Harry Reid thanked me by name in his closing address. But the stumble never came. I felt very humbled by his perfect pronunciation. Perhaps Chaffee is actually catching on!`,
                analysis: `Chaffee’s essay is strong because it follows a clear narrative, all enabled by her rather unusual name. While not everyone has a name as unique as “Chaffee,” and are therefore unable to use this approach, writing an essay about an experience or aspect of one’s life that is singular to oneself is a smart approach for any college essay. She shapes her development from preschool to high school in the lens of her name, demonstrating the importance that it has played throughout her life.

Chaffee’s initial anecdote immediately grips the reader; many people have shared the experience of looking for engraved merchandise, and the fact that she can find none bearing her name sets the stage for the rest of the essay. Chaffee quickly qualifies her discontent with her name, stating that this anecdote “is one of the few negative aspects of a name like ‘Chaffee Duckers.’” Unfortunately this qualification is a bit misplaced since she immediately returns to tell a story of her upbringing while failing to address any of the positive aspects of her name until paragraphs later. This is a bit of hedging that isn’t entirely necessary in the limited space allowed by most personal statements.

Yet, the essay works quite well. Chaffee spends a great deal of time elaborating on how she was different from both her family and others with examples of her transgressions in preschool and her penchant for schoolwork and education as opposed to procrastination or video games like Grand Theft Auto. Chaffee toots her own horn just a little bit when describing the merits of her work ethic, but it is still fairly endearing overall, and there is no shame in sharing a desire for learning. Chaffee states in the conclusion of her essay that she now takes “pride in the confusion on a person’s face,” as they try to read her name, demonstrating how she has now accepted and come to appreciate the fact that she does not share a name with the average Mary, Dick, or Jane.`
        },
        {
                id: "jonathan-palmer-smith",
                categoryId: "personal_statement",
                title: "The Culinary Smackdown: Practicality vs. Process",
                author: "Jonathan Palmer Smith",
                university: "Harvard University",
                theme: "Learning / Pragmatism",
                excerpt: "I could sense my mom’s eyes rolling when Paula Deen erupted into her signature cackle on the television...",
                content: `I could sense my mom’s eyes rolling when Paula Deen erupted into her signature cackle on the television. Throughout the summer, as I deteriorated in insoluble boredom, the Food Network had become my atrophic channel of choice. With her creamy Southern drawl and not-so-subtle use of every English teacher’s worst nightmare, “Y’all,” I reveled in her thirty minutes of butter, batter, and calories. However, Paula Deen was not the only Food Network star who I enjoyed watching. In fact, Ina Garten (aka Barefoot Contessa), a person whom I could just picture convulsing at the thought of Ms. Deen’s fried ice cream, also provided me with the entertainment I so desperately craved. Countering Paula’s folksy phrases, she preached the importance of “good kosher salt” and gushed about how coffee so elegantly elicits the richness of cocoa before prancing away to the local market.

However, the contrast between these two celebrity chefs highlights an even greater divide in society—the culinary smackdown of cooks versus chefs. The former emphasizes practicality, exudes warmth, and occasionally throws all nutritional guidelines to the wind. They idolize “short cuts,” and don’t need a tablescape to create an ambience befitting of their down-home cookin’. The chef, conversely, sneers at the desecration of carefully guarded culinary techniques. What happened to slow-roasting that chicken for eight hours? Must the rabble persist in mispronouncing “Worcestershire”? And why must everything they say taint the palate? While bemoaning these pesky tendencies, the Contessa carefully folds her chocolate mousse until it reaches the perfect consistency—coddling it like you or I would a child. Chefs allude to their gustatory odysseys in the south of France or on the islands floating in the Mediterranean much like those perfectly crisped croutons dancing upon the surface of a velvety tomato-basil soup laced with just a touch of Fino. Practicality is not of the essence, for the emphasis rests on process and design.

Yet, the chasm between these two culinary factions extends far beyond the set of The Next Food Network Star. College represents a chance to broaden one’s intellect and, more importantly, appreciate the myriad perspectives of our society. But what is learning without practical implications? To abscond to an Ivory Tower for a lifetime is to withhold knowledge that could alter the world. The chefs deserve some credit for their worship of technique, but does a perfect process necessarily yield a superior result? In all seriousness, Paula and Ina shed light on my collegiate goals. I want to learn something practical—something that might actually help to change the world. Because, maybe, just maybe, one person can make a difference—not a big difference: but a difference nonetheless. Regardless of where I eventually attend, my pragmatism will drive me to embrace the real-world implications of all that I learn. And as I sit in my dorm room, typing out the last words of a thesis, Paula Deen’s cackle in the background will remind me of how right those cooks might actually be.`,
                analysis: `Jonathan strikes a commendable balance between storytelling and the insights gleaned through introspection. His statement prominently features charismatic and familiar characters. By using a candid approach, the author establishes a sense of security and elicits an investment from the reader. Though he accomplishes much within a limited space, Jonathan places himself in a position that may undermine the purpose of a personal statement: to reveal motivations, desires, and the inner conscience of an applicant not otherwise apparent.

As he continues, Jonathan ventures further into a foreign territory. While his commentary on cooks versus chefs illustrates the author’s command of academic analyses, the piece thus far says little about him. Descriptions of culinary technique and delicious dishes leave an impression on the senses. Coddling chocolate mousse like a child and venturing on gustatory odysseys for velvety tomato-basil soup is certainly unique. Neither memorability nor entertainment value are of concern. These components are frequently most difficult to incorporate, yet Jonathan demonstrates clear mastery. However, even two-thirds through his piece, Jonathan continues telling a seemingly irrelevant story and leaves the reader at a loss in regards to his ultimate ambition.

Finally, as the third paragraph begins, the author reveals the purpose of his prose. The remainder of the story serves as a scaffold to demonstrate a commitment to broadening one’s intellect. Furthermore, he conveys a maturity that allows him to extract profound meaning from a seemingly banal sequence of events. Jonathan finds his greatest strength as he seamlessly bookends his piece. Drawing a parallel between Paula Deen and collegiate goals is indeed a difficult task. But perhaps it is this improbability of success that makes Jonathan’s essay compelling.`
        },
        {
                id: "sara-price",
                categoryId: "personal_statement",
                title: "Bands of Experience: A Headband Collection",
                author: "Sara Price",
                university: "Harvard University",
                theme: "Identity / Performance",
                excerpt: "The fabric that constitutes my life is a fusion of multitudinous hues and textures, shut away in a box under my bed...",
                content: `The fabric that constitutes my life is a fusion of multitudinous hues and textures, shut away in a box under my bed only to be retrieved in preparation for each day. My personality is best conveyed through these minute fragments of my existence, manifested in a headband collection.

I have been accumulating decorative headgear for over a decade, and have built an assortment nearly three hundred strong. The array includes massive, miniscule, plastic, and cloth, with a span of colors far exceeding the range of the rainbow. Such variation exists because each headband encapsulates my identity on a given day. Thus, the story of my life is unearthed every morning when I unfasten this uncanny box of memories.

Today, in the midst of burrowing for the perfect topper to my tresses, I encounter the glossy white headband that was once a versatile staple of my adolescent wardrobe. As I caress its smooth ivory surface, I instantaneously feel the fleeting freedom of childhood I once experienced as it cradled my cranium. The girl who wore this accessory was boundlessly charismatic and endlessly expressive, an intrinsic actress lacking the proper stage. I was but a young teenager unable to afford drama camp or acting lessons, dreaming of one day shining in the spotlight.

Amid my reminiscing I come across a soft burgundy headband perfectly matching my corresponding uniform polo, which I donned on the intended date of my inaugural high school play audition. Although in my eager anticipation I felt my act was as coordinated as my outfit, my sophomoric self was in for a shock. Laryngitis paralyzed my voice that fateful morning, and I had to hoarsely mouth an explanation to the drama director in disappointment. Generously, he gave me a small part regardless because he knew of my unremitting work ethic. Determined to grasp that chance by exceeding his expectations for excellence, I invested my entire emotional energy into a comedic improvisational exercise at my first practice. After a short bout of speechlessness, the drama club burst into an amalgamation of applause and laughter. Finally, my routine began to emerge from behind the curtain.

Soon the faint shimmering of glitter jolts my musing forward as I recall the evening I displayed a certain purple headband as a costume component. It augmented my guise as the Enchantress, the first of three roles I played in Beauty and the Beast. Over a year had passed since my ill-fated audition, and at last all eyes focused as me as I opened the show with a brief self-choreographed routine. I basked in the exhilarating joy of acting, enhanced by my renewed understanding of the immense resolve required to seize the stage. My headbands accompanied me through the entire journey, and thus they are of great personal value.

It seems peculiar that the most precious artifacts I possess sell for approximately $1 each. Yet these bands are my treasures, as they hold my past experiences while stretching to encompass the performances held in my future.`,
                analysis: `Sara adopts a unique and innovative approach to her essay; instead of speaking directly about her love of theater, she presents this passion through the framework of her headband collection. This narrative structure gives her an avenue to exhibit the multifaceted nature of her personality, which she describes to be as varied as her array of headbands.

Throughout her essay, Sara reveals herself to be capable of highly evocative imagery that successfully skirts oversentimentality. There are a few aspects of her essay that can be improved, however. First, her headbands are given a large amount of credit in the first two paragraphs—it is too much to say that “the story of [her] life is unearthed every morning” when she puts on her headgear. Additionally, much of the language in the essay is overwritten. Using more subdued language to express the significance of her headbands would convey the same message while maintaining credibility. Her word choice is excessive—her use of words like “multitudinous,” “minute,” “donned,” “unremitting,” and “amalgamation” is at best unnecessary and at worst misleading.

With all of that said the last paragraph of the essay is quite commendable: The line on the $1 monetary value of her headbands is very memorable and, the final sentence ties all parts of the essay together, providing a highly effective conclusion for what is ultimately a deeply personal and revealing essay.`
        },
        {
                id: "michelle-choi",
                categoryId: "personal_statement",
                title: "Predictably Unpredictable: Kimchi and Linguine",
                author: "Michelle Choi",
                university: "Harvard University",
                theme: "Logic / Cultural Hybridity",
                excerpt: "“You should scrub off the top layer of your skin whenever you lose a round,” my debate teammate once advised me...",
                content: `“You should scrub off the top layer of your skin whenever you lose a round,” my debate teammate once advised me. “That’s not practical,” I replied. “Neither is your refusal to wear clothes you’ve lost important debate rounds in. Your wardrobe has very little to do with your success.”

Half of me disagrees with him. I still bring three BIC Round Stic pencils with 0.7 lead to every test because my gut tells me this fastidious procedure raises my scores. I’m still convinced that labs receive better grades if written in Calibri. And I still won’t rewear clothes in which I’ve lost crucial rounds.`,
                analysis: `Despite suffering from a lack of cohesiveness, this essay is successful in breaking the typical boundaries of the college essay and giving us a sense of the individual behind the computer.The author starts off the piece using an exchange with a debate teammate about her clothes choice before a debate, which she uses as a starting point for a discussion of the “illogical nature of [her] other habits.” The opening story is engaging because it rings with authenticity—it’s a discreet way to indicate that debate means a lot to her.

The magic doesn’t work as well with the other examples of illogical habits that the author brings up in the rest of the essay, however.What is illogical about liking to alternate surfing with debate preparation, for example, or liking to mix up the familiar with the unexpected? The anecdotes seem more like a way to draw attention to some of the author’s achievements—surfing, piano—than an occasion to reflect on her “predictably unpredictable” behavior.

What saves the essay from sounding like a list of extracurriculars is the sizable dose of humor injected into the descriptions.The author’s description of “the debate team’s war room” and her “untraceable and admittedly nonexistent Italian blood” not only create vivid images in the mind of the reader, but also give off the impression she is poking fun at herself.Likewise, alternating mentions of such high and lofty topics as Kuwait’s female voting patterns with descriptions of paintball and midnight baking sessions create the image of a young woman who has passions and goals, but who also knows not to take herself too seriously.

In spite of its choppiness, this essay thereby succeeds in a very difficult quest: making the author likable to the reader.It’s a great illustration of the fact that writing a good essay should involve writing about things that mean a lot to you—whether it’s dressing for debate tournaments, discussing Middle Eastern politics, or just baking cupcakes.`
        },
        {
                id: "rachael-smith",
                categoryId: "personal_statement",
                title: "The Kerouacian Searcher",
                author: "Rachael Smith",
                university: "Harvard University",
                theme: "Identity / Faith / Searching",
                excerpt: "I am a scientist and I am an artist. I am a musician, an athlete, a philosopher, and an activist...",
                content: `I am a scientist and I am an artist.I am a musician, an athlete, a philosopher, and an activist.I am a waitress and a world traveler, both a suburbanite and a citizen of the world.I fill so many roles and I have such varied interests that sometimes I am not sure who I am.Jack Kerouac describes these feelings best in his novel On the Road with the line, “All I have to offer anybody is my own confusion.”

                The confusion of which Kerouac writes is an active confusion.He was not complacent in his uncertainty; he was a searcher.He traveled thousands of miles, seeking to understand the world and his place in it.He wrote of “offering” confusion, indicating a hope for reciprocity.Kerouac viewed his search as a collaborative process, looking for answers in the many diverse and interesting people he met along his journeys.

Like Kerouac, I am a searcher.This is a direct result of being raised in a Unitarian Universalist congregation.The Unitarian Universalist doctrine encourages uncertainty.Among other things, we affirm and promote the equality of all, persecution of none, and the free and independent search for truth.My upbringing instilled in me a sense of moral responsibility.It has taught me the meaning of service and the importance of respect.What has shaped me the most, though, is that idea of an “independent search for truth.” Unitarian Universalism teaches that personal beliefs should be developed individually through consideration of diverse input, and that differences in beliefs should be not only respected but encouraged.

In my search I turn to everything for input: literature, music, films, world religions and politics, modern art, and almost every other form of pop culture imaginable.I have traveled to eight foreign countries, each expanding my global perspective.My most meaningful learning experiences, though, have been in interactions with other people.I am a very social and outgoing person.I tend to make friends with people from many different groups.I enjoy having many different friends because I am given the opportunity to see from diverse perspectives.For this reason I love meeting and getting to know new people.

This Kerouacian search for who I am and what I believe is something I hope to continue for the rest of my life.Already, it has made me a politically and socially aware person and instilled in me a passion for action.I hope to never stop learning, never lose my youthful curiosity, and never stop sharing in my confusion, because each new experience, new place, and new person I meet is a shared opportunity to learn.Perhaps by sharing in the confusion I will begin to find answers that work for me, or perhaps not.In the end, it is not the answers I’m interested in so much as enjoying the search.`,
                analysis: `Seeking inspiration in classic literature is a time- tested method for essay - writing.Rachael’s multitudinous introductory interests would be overwhelming, but Rachael sums them up cleanly with a quote from Kerouac, explaining that the different directions she is being pulled in are confusing but also reassuring.This successful representation of her various interests and identities rarely comes through in a college application essay.

The way that Rachael connects her confused search for truth to her Unitarian Universalist faith is admirable—that part of the essay is genuine and well written.She is passionate about connecting to other people, about absorbing experiences so that she might be able to process the meaning for herself.She also uses the lessons she’s learned from her religion to relate to her On the Road metaphor, supporting the relationship between herself and her lessons from both sources.

But in her comparisons to On the Road, Rachael’s thesis loses direction.Perhaps her wandering and vague final paragraph is a result of the line that Rachael chooses to highlight from On the Road: “All I have to offer anybody is my own confusion,” which is actually a misquote from the original Kerouac line, “I had nothing to offer anybody except my own confusion.”

Rachael’s conclusion is where she drives the essay home.By presenting herself as a searcher—in pursuit of knowledge and personal advancement—she succeeds in convincing a reader that she is the ideal member of a college community.`
        },
        {
                id: "winnie-wu",
                categoryId: "personal_statement",
                title: "Soft Wooden Heart",
                author: "Winnie Wu",
                university: "Harvard University",
                theme: "Identity / Growth / Objects",
                excerpt: "The backbone of my life is my writing desk. I like to describe its surface as an organized mess...",
                content: `The backbone of my life is my writing desk.I like to describe its surface as an organized mess(despite my parents’ overdramatized description of a bomb site), a state of positive entropy and minimum energy.Math exercises overlap an organizer, set next to almost - empty tubes of paint and overdue library books.A constantly filled bottle of water sits behind a glasses’ case full of guitar picks, and carved into a mountain of paper, right in the middle, is a space reserved for my laptop—on days when I am slouching, The Complete Works of William Shakespeare needs to be slid under it.An eclectic desk shows an eclectic personality; mine has had the honor of being the training grounds prior to the Great(final) Battle(exam) of Chemistry, the peaceful meadow of relaxed reading afternoons, and all in all the pristine - turned - colorful canvas of an inquisitive mind.

I remember buying it with my mother five years ago, when my bruised knees protested against the tiny white - paint - gone - yellow one I had used since childhood.My new desk was made of native Rimu heartwood—solid, resilient, dependable—a perfect role model for me to grow into.Over the years, its material became representative of my New Zealand identity, its surface slowly coated in quirky personality, and its compartments filled with treasured memories; the heartwood desk echoed my heart.

At first, it did not fit with the decor of the rest of my room, which even now appears boxy and stark next to my grandiosely elegant writing desk, but its quiet strength is unafraid of individuality, just as I have learned to become.It has watched as I grew stronger branches, a straighter trunk, firmer roots; whereas I had once been but a shy young seedling, I sprouted leaves and with them the ability and yearning to provide shade for others.I have certainly physically grown into it, but although I would like to think that I have become completely independent, I remain human; in inevitable times of need, it is still my steadfast, sturdy desk that offers its support.

I sit here and, well, I write: joyfully, desolately, irately, wistfully—at times paralyzed by excitement, at others crippled by fear.I scrawl notes in my organizer(which is, naturally, not in the least organized), words overflow my blog, overemotional oranges and blues plague my illustrations; shallow scratch marks indent the wood from where I have pressed too passionately into paper.It may be solid, but it is elastic enough to be shaped, resilient enough to adapt: This is my soft wooden heart.

It can take it.My desk remains constant despite scars of experience—unassuming, stoic, ever watchful.Even when I dismembered dying cell phones, their frail key tones pleading for mercy, the desk stood there, nonchalant.Regardless of what fervor goes on from time to time, it knows there will eventually be a constant calm; my lively nest of rebuilt mobiles still calls this place home.Sometimes, I rest my uncertain head on its reassuring solid surface and the wood presses back into my heartbeat, communicating in Morse: “Don’t worry.Some things will never change.”

And, like a mother, it always turns out to be right.Beneath my seemingly chaotic coat of papers and objects; beneath the superfluous, temporary things that define my present life, my desk and my heart remain still—solid, stable, and evergreen, ready to be written onto and scratched into by experience.`,
                analysis: `One of this essay’s strengths is its honesty.Winnie manages to convey a lot about her life by describing what lies on her desk, from “empty tubes of paint” to guitar picks.She slips in important details about herself almost casually, letting us know that although she is studying for her chemistry exam, she also uses The Complete Works of William Shakespeare to prop up her laptop when she’s slouching in her seat.Her skillful thick description makes her very real and quirky personality shine through: Winnie quips that her organizer is “naturally, not in the least organized,” and she describes how she “dismembered dying cell phones” on her writing desk.Overall, Winnie does a successful job of conveying much about her character and personality through the description of a rather mundane and everyday object, her writing desk.

If this essay has a flaw, it is its lack of central focus or narrative structure.Winnie does attempt to tell a story over the course of her essay, using the writing desk as a motif to narrate the tale of her own development from a “shy young seedling” to a more mature young adult.Winnie’s writing desk comes into her life as a “role model,” remains in her room watching her mature and grow up, and serves as her metaphoric heart, remaining “solid, stable, and evergreen.” Yet other than her hobbies, we learn little about what kind of experiences have shaped Winnie’s “New Zealand identity,” and her essay lacks narrative structure other than simply detailing Winnie’s transition into maturity.Tracing a story line or centering the essay on a narrative with a beginning, middle, and end would help lend this piece the structure that it currently lacks.

        Overall, however, Winnie successfully accomplishes the rather difficult task of setting the vibrant narrative of her own growing maturity on top of the description of an everyday and familiar object, her writing desk.Her essay paints a picture of her life that could stand to be more structured, but nonetheless conveys an interesting and multifaceted personality.`
        },
        {
                id: "kevin-dong",
                categoryId: "personal_statement",
                title: "The Conservation of Skill",
                author: "Kevin Dong",
                university: "Harvard University",
                theme: "Exploration / Multi-potentialite",
                excerpt: "Fields, farmlands, forests speed by. I catch glimpses of glimmering bodies of water...",
                content: `Fields, farmlands, forests speed by.I catch glimpses of glimmering bodies of water.The beauty of it all stuns me and yearns for my exploration.Architecture passes by: expansive jetties, intricate bridges, quaint buildings.I wonder how these structures are built or even conceived of.Similarly, I ponder the existence of the complex machinery and myriad vehicles I spot from the train.Yet the overarching mystery that shrouds these sights is the unsung history behind each of them.

I pull myself back from the window, pleasantly overwhelmed by the spectacular view.Today I sit alone.I am journeying to my father’s apartment, several states away.Shuttling between the companies of two loving parents, ironically without company.But I could not have asked for a better opportunity to meditate.

Opening my small notebook and with pencil in hand, I begin to explain my thoughts to the pages.I introduce the scientific law of conservation from which I derive my latest conjecture.The question: “If physical quantities such as energy are conserved, then is skill conserved ?” The answer, I reason: “Yes.” Every human being begins with the same net skill; when he or she excels in a particular activity, proficiency in another is lost to maintain balance.The apparent truth of this statement intrigues me as I consider its manifestations in society.

I suddenly begin to ponder its personal implications.Have I spread myself thin, like a dab of paint suffused across a broad surface ? I like to dabble.I am so much more than just the academic on paper.I have checked on the ice, smashed a tennis ball, and raced in the waters.I play violin and sing in choir.I follow the news; I write creatively; I listen to music.I am an amateur video gamer and a budding tech geek, but also a grassroots environmentalist and a dedicated volunteer.And I devote what free time remains to my thoughts, my friends, and my family.

So much I have tried, so much I have learned, so much I have experienced.Yet I am neither an incompetent novice nor a world - renowned expert at any of these activities.I possess substantial skill in all and though I have not peaked, my interests have been piqued.I am just a high school student, sampling dishes and trying to figure out what he likes best.

I am just a high school student.My thoughts dissolve back into reality.In the vacant seat next to me, my backpack lies with my notebook tossed on top.In my hand, I contemplatively twirl my pencil.I look back out the window at the passing landscapes, now engulfed in twilight.I recall the racing thoughts from earlier today and realize that even in them, my interests were scattered.I am a curious puppy thrust into a beautiful new world.So what shall I do now ? I will apply the next coat of paint and see where it dries thickest.`,
                analysis: `Kevin’s essay is highly relatable—it is an endearing account of a person still very much undecided about the course of his life, a state that doubtless many college applicants find themselves in.Kevin has crafted a number of very beautiful sentences and images, and the flow of his writing is unique.Of particular note are Kevin’s descriptions of what he sees outside of the train—his sentence, “Fields, farmlands, forests speed by,” is elegant not only for its brevity, but for its mimetic similarity to how things are seen out of a fast - moving train.Still, at times the essay reads as though Kevin was trying too hard, with too many SAT words and too little genuine feeling behind them.Sentences like, “I introduce the scientific law of conservation from which I derive my latest conjecture,” attempt to prove that Kevin is intelligent, and the essay loses its relatability in the mire of unnatural language.Kevin’s writing is at its best when it’s clean and simple; where he strays from this, the prose can become overwrought, and distracts from Kevin’s message.

        Furthermore, some of the clarity of Kevin’s essay is lost in too many metaphors.For example in his last paragraph, Kevin describes himself as a puppy, and then two sentences later resolves to “apply the next coat of paint” as if he were an artist ? Even without the mixed metaphors, his last sentence might be difficult to understand for a harried admissions officer—his last reference to the paint metaphor appeared a number of paragraphs earlier.Kevin’s image of “paint suffused across a broad surface” is a novel and interesting one—had he pruned away his many other comparisons and instead concentrated and developed this one, his essay would have made gains in both style and clarity.Kevin’s essay thus serves as a good lesson in both its successes and its failings: In a medium as short as a personal statement, natural - feeling language and a clear, unified vision are key.`
        },
        {
                id: "carrie-tian",
                categoryId: "personal_statement",
                title: "Becoming Story Girl",
                author: "Carrie Tian",
                university: "Harvard University",
                theme: "Science / Storytelling",
                excerpt: "The best compliment I ever received was from my little brother: “My science teacher’s unbelievably good at telling stories,” he announced...",
                content: `The best compliment I ever received was from my little brother: “My science teacher’s unbelievably good at telling stories,” he announced. “Nearly as good as you.” I thought about that, how I savor a good story the way some people savor last - minute touchdowns.

I learned in biology that I’m composed of 7 × 10 ^ 27 atoms, but that number didn’t mean anything to me until I read Bill Bryson’s A Short History of Nearly Everything.One sentence stayed with me for weeks: “Every atom you possess has almost certainly passed through several stars and been part of millions of organisms on its way to becoming you.” It estimates that each human has about 2 billion atoms of Shakespeare hanging around inside—quite a comfort, as I try to write this essay.I thought about every one of my atoms, wondering where they had been and what miracles they had witnessed.

My physical body is a string of atoms, but what of my inner self, my soul, my essence ? I’ve come to the realization that my life has been a string as well, a string of stories.Every one of us is made of star stuff, forged through fires, and emerging as nicked as the surface of the moon.It frustrated me no end that I couldn’t sit down with all the people I met, interrogating them about their lives, identifying every last story that made them who they are.

I remember how magical it was the first time I read a fiction book: Harry Potter and the Sorcerer’s Stone.I was duly impressed with Quidditch and the Invisibility Cloak, of course, but I was absolutely spellbound by how much I could learn about Harry.The kippers he had for breakfast, the supplies he bought for Potions—the details everyone skimmed over were remarkable to me.Fiction was a revelation.Here, at last, was a window into another person’s string of stories!

Over the years, I’ve thought long and hard about that immortal question: What superpower would you choose ? I considered the usual suspects—invisibility, superhuman strength, flying—but threw them out immediately.My superhero alter ego would be Story Girl.She wouldn’t run marathons, but she could walk for miles and miles in other people’s shoes.She’d know that all it takes for empathy and understanding is the right story.

Imagine my astonishment when I discovered Radiolab on NPR.Here was my imaginary superpower, embodied in real life! I had been struggling with AP Biology, seeing it as a class full of complicated processes and alien vocabulary.That changed radically when I listened, enthralled, as Radiolab traced the effects of dopamine on love and gambling.This was science, sure, but it was science as I’d never heard it before.It contained conflict and emotion and a narrative; it made me anxious to learn more.It wasn’t that I was obtuse for biology; I just hadn’t found the stories in it before.

        I’m convinced that you can learn anything in the form of a story.The layperson often writes off concepts—entropy, the Maginot Line, anapestic meter—as too foreign to comprehend.But with the right framing, the world suddenly becomes an open book, enticing and ripe for exploration.I want to become a writer to find those stories, much like Jad Abumrad and Robert Krulwich from Radiolab, making intimidating subjects become familiar and inviting for everyone.I want to become Story Girl.`,
                analysis: `Carrie begins her essay with a classic paradigm that is often successful in college admissions essays.She suggests that she is different, quickly noting that her unique penchant for stories is inherently absent in others.It’s a solid essay for sure, incorporating her interest in science with a very specific anecdote about her high school biology class that brings an especially personal touch to her writing.She breaks the fourth wall as well, using the phrase “as I try to write this essay”—a risky, but effective statement, in this case. Colloquialisms are strung throughout the piece; contractions are commonplace, establishing a casual feel that adds to the conversational nature of the piece.These gambles work for Carrie, as they make her a likable and relatable narrator, which is not always the case when a student speaks directly to the reader.

        However, the transition between thoughts is one of the weaknesses of her essay, and it shows when she quickly switches between descriptions of atoms, Harry Potter, and superpowers.Granted, these ideas are connected by the overarching theme of “stories,” but nevertheless, moving between each is jarring.She gives the reader just a moment to consider flying around on a broomstick before bringing up the concept of a variety of other superpowers that she has dreamed of over the years.It is then that she describes her desired superpower as the ability to tell stories, and ties this together with her interest in science and academics.Yet, there is little preparation for any of these ideas, and while it again seems conversational and friendly to keep bringing in these new points of fascination, the structure somewhat detracts from the essay.

Another risk that she takes is pointing out a potential academic weakness late in the essay.In order to demonstrate her status as a storyteller, she chooses to share that she initially found AP Biology to be a struggle due to its content and the obscurity of some of the vocabulary involved in the course.This is not necessarily an issue here, since she qualifies her statement by explaining that viewing academics through the lens of a story allows her to understand concepts that initially would seem foreign.However, doing this incorrectly could easily lead an admissions officer to develop a negative impression of the applicant.As it is written in this case, the statement suggests that Carrie can not only creatively come up with methods to master material, but she also can be effective at communicating with others throughout her studies, summing up an essay that expresses an impressive individual’s passions and interests.

Her willingness to present her flaws alongside her strengths gives the impression that Carrie is presenting herself fully.The positives she writes about herself are more believable as a result of this.The strategy works awfully well, and gives the essay a fitting conclusion.`
        },
        {
                id: "danielle-lessard",
                categoryId: "personal_statement",
                title: "Why a Republican Read The Communist Manifesto",
                author: "Danielle Lessard",
                university: "Harvard University",
                theme: "Politics / Respect / Compromise",
                excerpt: "I am a conservative. Point-blank. I’m not talking “hardcore, no gay marriage, abortion equates to eternity in Hell...",
                content: `I am a conservative.Point - blank.I’m not talking “hardcore, no gay marriage, abortion equates to eternity in Hell, Catholicism is the only religion worthy of my acknowledgment” conservative, but I believe in limited government intervention in private business.I may seem like an unlikely candidate for such beliefs; I live in Springfield, Massachusetts, an urban environment where the majority of the population utilizes some sort of government assistance to supplement the costs of living.Well, maybe not the absolute majority, but I certainly see a lot of it.Though raised as a Catholic, I believe in nothing more than simple spirituality, and do not abide by all the stipulations of the strict Catholic community(although I do continue to attend church because I find the environment welcoming and the people overwhelmingly happy and uplifting). I attend the Drama Studio, a small, conservatory style acting community where I am considered the token Republican(artsy and conservative—is this what Harold Camping meant by the Rapture ?) Not surprisingly, my colleagues have made many attempts at conversion(“Watch MSNBC, Danielle; I promise you’ll love it!”) But I stick to my guns—no pun intended.However, I have found that sharing the majority of my time with those of conflicting opinions has enlightened me in the ways of respect and compromise.

Enter Jacob Mueller.Literally the son of a preacher man(his father is the minister at Trinity United Methodist Church), his political views on Facebook are listed as “Member of the Communist Party of America.” Oh, boy … He entered my Advanced Scene Work class in its second semester, and as is the Drama Studio custom, I welcomed him with open arms and commenced what I soon discovered to be the long and interesting process of getting to know him.Through this, I discovered a few important things; like me, he loved politics.Like me, he was well informed.And, like me, he was more than willing to argue his opinion.

Through our Odd Couple dynamic, we found an endless number of conversation topics.Every day was a new, “Did you see what the Tea Party’s newest legislation entails ?” countered by a, “How about that Scott Brown, eh ?” I was the Michele Bachmann to his Al Gore.But the remarkable thing about our debates was not their intensity or their depth, but how much I was learning by listening to him talk.

A strange thing was happening to me.For the girl who had always been staunchly opinionated and stubborn, who had never been one for agreeing with the opposition, who took pride in her ability to stand her ground even when she represented the minority view, compromise suddenly had a new meaning.Its connotation was no longer negative.And, in turn my ability to not only understand but also respect a view contradictory to my own was growing in strength.

In order to foster this newfound mind - set, I presented myself with the ultimate challenge.In a moment of excited passion, I logged on to Amazon.com and, for $4.95, ordered a copy of The Communist Manifesto.The little book, with its floppy laminated cover depicting a hammer and a sickle on a glossy black background and plain white block letters spelling out its title with inconspicuous innocence, took its place at the head of my bed, where it resided for the next month.Bit by bit, it began to fill with marks of pensive notation, speckles of yellow appearing in odd places where the highlighter had bled through, its fragile pages curving with the insistent pen marks that filled their margins.

As I devoured the words of Marx and Engels, I realized something remarkable.I’m not going to tell you I agreed with them; in a lot of instances, I didn’t.But I did understand what they were saying, and I was able to respect them both as visionaries and intellectuals.Where the old voice in my head would have said, “Wow, what idiots,” my new voice was open to more than just the fundamental ideas, but the intelligence it must have taken to form them and the thought process behind them.

When I register to vote, I will not be registering as a Democrat.You won’t see me at any PETA meetings, and you certainly won’t hear me speaking fondly about President Obama’s plans for health care.But I can proudly say that The Communist Manifesto taught this Republican what it means to compromise, and to respect.`,
                analysis: `This essay does a marvelous job of describing the way in which one’s outlook on life can change over time.She takes thoughts about her evolving conservative political beliefs and turns them into something interesting by introducing other characters and using humor throughout.

        Danielle’s asides are funny in all the right ways.They generally poke fun at her conservatism without being offensive.Her line about being both artsy and conservative is a good example of using humor to convey aspects of one’s personality that may not be immediately apparent in an essay.She’s a not - too - conservative person who’s also fairly witty ? Check.

Her humor also makes the essay exponentially more enjoyable to read.Serious diatribes about changing ideals are fine, but descriptions that are actually entertaining are far more memorable.

It should be noted that though the essay is about Danielle and her ideological refinement, her use of other people(namely, Jacob) in her narrative makes the story seem far more credible, and makes her seem more relatable.Her interactions with Jacob showcase her ability to compromise and carry on successful interpersonal relations in spite of glaring political differences.

The essay would have benefited from more development at the end.Her interaction with The Communist Manifesto would have been slightly richer had we glimpsed a little more insight into her thoughts rather than her just saying that she disagreed with most of it.Was there a part that she found redeeming ? While a relatively small critique, more elaboration would ensure that readers would not be left hanging at the conclusion in an otherwise excellent essay.`
        },
        {
                id: "alyssa-chan",
                categoryId: "personal_statement",
                title: "The Startling Beauty of the Moment Before",
                author: "Alyssa Chan",
                university: "Harvard University",
                theme: "Music / Anticipation",
                excerpt: "I sit on a low, black bench, shifting and rustling about—settling in. Eighty-eight black-and-white keys stretch before me...",
                content: `I sit on a low, black bench, shifting and rustling about—settling in.Eighty - eight black - and - white keys stretch before me, filling the whole of my gaze.I look up to see my face reflected and distorted in the shiny, over - glossed black surface of the piano.I shift my eyes to the white pages in front of me, with their thin, dark, horizontal lines.Notes sit on these lines complacently in a manner that seems incongruous with their fluttering lightness when played.I raise my hands, fingers poised, and I am startled by the profoundness of this moment, knowing that at any instant I can press my fingers down on these keys and produce something from nothing; beauty from emptiness.It is often said that to be able to create music is one of the greatest joys in life.I agree; there is little I have experienced that can compare to the swell of notes forming rolling waves of melody, the current sweeping raw emotions out into the open and transforming them, making beautiful everything along the way.But, to me, this joy is and will always be second to something greater: the glory of that moment before a single note is played, when I sit before the piano, fingers outstretched in anticipation.

There are so many of these moments in life, small and unassuming, but all - consuming at the same time; little pieces of our parents telling us anything is possible, slivers of dreams in which we can do anything.We often look past this moment before, diving right into the action; we marvel at the splendor of a concert, overlooking the startling beauty and harmony of an orchestra tuning; we are so transfixed by the sunrise that we forget about the incredible promise of the dull morning gray.But it is in these instants of anticipation, the moments before, that we unexpectedly glimpse what is possible without the interference of fear or reality.I know that the dreams of these moments do not always come true; many hopeful beginnings end with disappointment and failure.I know also that as I grow up, experience may persuade me to not believe in fairy - tale endings.But I hope that I retain some of my idealism, if only in these small fragments.I strive to carry a sense of optimism forward with me, holding onto the momentary feelings of radiant innocence that allow me to believe in endless possibilities.

My seventeen years have been spent preparing for now; the melody of the rest of my life is about to begin.I hope that one day I’ll look back on this time and reflect on the anticipation, the brilliance that had yet to emerge.As I sit here writing this, I realize that this is the moment before … and I can’t wait.`,
                analysis: `Alyssa’s essay is unique in both its content and in its delivery.Rather than focusing on an “unusual experience” (a ubiquitous topic in college essays), she instead examines a relatively ordinary one—at least for personal statements—from a creative and unexpected angle.Her exquisitely detailed description and beautiful turns of phrase transcend the everyday and add depth to what could easily have been an extremely uninteresting narrative.But it is not her eloquence alone that distinguishes this essay—it is her decision to emphasize the “moment before” rather than the moment itself.What initially seems like a nicely worded take on an overdone topic becomes an unexpected and refreshing look at how moments are experienced.

Despite its overall excellence, Alyssa’s essay could benefit from a couple of revisions.Some of its sentences, particularly toward the end of her second paragraph, border on the cliché; structuring the essay in such a way that they were more spread out might have lessened the effect.The metaphor she draws from the anticipation she describes to her life more broadly feels rushed; it may have been better to shorten the initial description in order to develop her main point more fully.As it is they feel a bit disconnected since the transition is so abrupt and the final paragraph so short, but she does manage to include some words(particularly the allusion to music) that tie the essay together nicely.

On the whole, Alyssa does an excellent job in creating an essay that illustrates her personality through both its style and its substance.The primary strengths of this essay lie in its eloquence.Although many essays become pretentious in their quest for poeticism, Alyssa combines lovely phrases with an overarching simplicity that prevents her writing from growing too flowery or otherwise overpowering.Her second paragraph, in which she explores in greater detail her always - italicized “moment before,” is not preachy or pompous.Her elegant prose always maintains readability.`,
        },
        {
                id: "justine-liu",
                categoryId: "personal_statement",
                title: "The Label Maker's Paradox",
                author: "Justine Liu",
                university: "Harvard University",
                theme: "Identity / Perspective",
                excerpt: "When I was a child, I begged my parents for my very own Brother PT-1400 P-Touch Handheld Label Maker...",
                content: `When I was a child, I begged my parents for my very own Brother PT - 1400 P - Touch Handheld Label Maker to fulfill all of my labeling needs.Other kids had Nintendos and would spend their free time with Mario and Luigi.While they pummeled their video game controllers furiously, the pads of their thumbs dancing across their joysticks, I would type out labels on my industrial - standard P - Touch with just as much zeal.I labeled everything imaginable, dividing hundreds of pens into Ziploc bags by color, then rubber - banding them by point size.The finishing touch, of course, was always a glossy, three - eighths - inch - wide tag, freshly churned out from my handheld labeler and decisively pasted upon the numerous plastic bags I had successfully compiled.

Labeling became therapeutic for me; organizing my surroundings into specific groups to be labeled provides me with a sense of stability.I may not physically need the shiny color - coded label verifying the contents of a plastic bag as BLUE HIGHLIGHTERS—FAT, to identify them as such, but seeing these classifications so plainly allows me to appreciate the reliability of my categorizations.There are no exceptions when I label the top ledge of my bookshelf as containing works from ACHEBE, CHINUA TO CONRAD, JOSEPH.Each book is either filtered into that category or placed definitively into another one.Yet, such consistency only exists in these inanimate objects.

        Thus, the break in my role as a labeler comes when I interact with people.Their lives are too complicated, their personalities too intricate for me to resolutely summarize in a few words or even with the 26.2 feet of laminated adhesive tape compatible with my label maker.I have learned that a thin line exists between labeling and just being judgmental when evaluating individuals.I can hardly superficially characterize others as simply as I do my material possessions because people refuse to be so cleanly separated and compartmentalized.My sister Joyce jokes freely and talks with me for hours about everything from the disturbing popularity of vampires in pop culture to cubic watermelons, yet those who don’t know her well usually think of her as timid and introverted.My mother is sometimes my biggest supporter, spouting words of encouragement and, at other instances, my most unrelenting critic.The overlap becomes too indistinct, the contradictions too apparent, even as I attempt to classify those people in the world whom I know best.

Neither would I want others to be predictable enough for me to label.The real joy in human interaction lies in the excitement of the unknown.Overturning expectations can be necessary to preserving the vitality of relationships.If I were never surprised by the behaviors of those around me, my biggest source of entertainment would vanish.For all my love of order when it comes to my room, I don’t want myself, or the people with whom I interact, to fit squarely into any one category.I meticulously follow directions to the millimeter in the chemistry lab but measure ingredients by pinches and dashes in the comfort of my kitchen.I’m a self - proclaimed grammar Nazi, but I’ll admit e.e.cummings’s irreverence does appeal.I’ll chart my television show schedule on Excel, but I would never dream of confronting my chores with as much organization.I even call myself a labeler, but not when it comes to people.As Walt Whitman might put it, “Do I contradict myself ? Very well, then I contradict myself, (I am large, I contain multitudes.).”

I therefore refrain from the temptation to label—despite it being an act that makes me feel so fulfilled when applied to physical objects—when real people are the subjects.The consequences of premature labeling are too great, the risk of inaccuracy too high because, most of the time, not even the hundreds of alphanumeric digits and symbols available for entry on my P - Touch can effectively describe who an individual really is.`,
                analysis: `The first thing that jumps out about this essay is the topic.While other college applicants might offer their profound thoughts on life, love, and the human condition, Justine begins with a slightly less sexy topic: labeling stuff.She readily admits that it’s a bit of an eccentric hobby; as she says in her essay, label makers are to her what video game consoles are to much of the rest of the teenage demographic.The unorthodoxy of it, though, is precisely what makes it so captivating.The essay draws the reader in with a topic that, at a very minimum, is intriguing.This immediately puts Justine, the writer, in the incredibly advantageous position of having a story that people actually want to read.

Complementing her distinctive choice of topic, Justine has an infectiously quirky style that truly shines through in her writing.Her vocabulary is sprinkled with little idiosyncrasies, making it easy to imagine her as a child as she “decisively pasted” labels onto “successfully compiled” bags, proudly basking in her triumphant success.Justine’s use of specific, geeky details is quite endearing, a kind of lightheartedness that makes a reader laugh just a little bit inside while following along.As she describes her Brother PT - 1400 P - Touch Handheld Label Maker, the 26.2 feet of label - maker tape, or her bag of “Blue Highlighters—Fat,” readers get a powerful sense of her youthful enthusiasm for labeling.

Her subsequent shift from labeling as hobby to labeling as stereotyping—while an attempt to provide some additional substance to the essay—is less memorable.While her anecdotes about her labeling hobby are original and refreshing, her discussion of labeling people feels a bit trite.She essentially observes that labeling people is wrong because people are not one - dimensional, a well - worn platitude.It was a safe choice.But was it the best ?

        Instead, Justine could have improved her essay by focusing on what makes her stand out, namely her creative, quirky personality.After all, a successful college essay needs not to draw any deep philosophical conclusions about the world—its main purpose is simply to bring the writer’s unique voice to life.Nevertheless, Justine does a terrific job expressing herself as an individual, infusing her essay and her application as a whole with a warm and distinct personality.`,
        },
        {
                id: "john-finnegan",
                categoryId: "personal_statement",
                title: "Why I Went to the Rain",
                author: "John Finnegan",
                university: "Harvard University",
                theme: "Nature / Perspective",
                excerpt: "Drops hurtled from the sky, splattering the window with futile attacks as I gazed out at the dusk...",
                content: `Drops hurtled from the sky, splattering the window with futile attacks as I gazed out at the dusk.I looked up at the clouds, trying to gauge how long and how hard the rain would fall, wondering whether the thunder and lightning would rumble on or settle in.Satisfied that they would linger, I stepped out into the evening, my feet resting upon the cold steps of my soaked stairway.As raindrops pelted my head and saturated my shirt, I watched a torn and trembling sky.It was a nice view.

Standing in the rain, I was separated from the rest of the world.Peering up at drops of water, I thought only of those drops, only of how they cooled my face and quieted my mind.The storm, in all its might and force, swept away the rest of the world.The squall left me in darkness, but not in a cold, unfeeling, dreadful night.The shadows of a storm are inherently alive, filled with energy and existence, molecules and matter.While destruction could follow behind, it had no place in the storm itself, no place in the vitality that surrounded me.In my storm, I was not thinking of downed power lines or flooded basements—those thoughts were pushed aside, overcome by the noise and rain.As thunder boomed in the heavens, I left behind thoughts of the future and concerns for my livelihood; all I knew was the beauty and joy of life.

That night, I found serenity in chaos.I lived.The storm forced me to be concerned solely with the present and revel in that concern.In the storm, I discovered freedom, but the freedom I chanced upon was that of simplicity, not irresponsibility.For once, I knew what I wanted: to stand quietly a little longer as the storm thundered on.While I neither tap - danced nor sung in the rain that night, I stood, walked, and enjoyed the water running from my forehead to nose, streaming down my face into a mouth longing for cool liquid.In a world where most of my life is spent indoors, separated from anything wild or uncontained or free, the storm presented an opening of the cage that contains my spirit.

        Yet, the tempest comes rarely, and when it comes it stays for minutes, not hours.Until the rain returns, I wait indoors and enter a world filled with demands both complicated and exhausting.There, I scurry about, trying to juggle the competing commands of my parents and friends, school and society.The requests for attention mount up, piling into hills that I chisel slowly away, turning from one to the next, struggling to keep up with the twists and turns of the maze I call life.But, locked away in the subconscious mind of John Finnegan, a desire remains.It does not fade, no matter how long the dry spell or how hot the summer.It remains, and it longs for storms.`,
                analysis: `John Finnegan’s essay is a testament to the beauty of self-reflection. He takes a common setting—the rain—and elevates it to a space of profound realization. The juxtaposition of the chaotic storm and his internal peace is masterfully handled. His honesty about his frustrations with the daily grind makes him a relatable and sympathetic character.

        John ventures to provide a glimpse into the complex psyche of the exhausted student.He takes a risk as he grapples with such a universal phenomenon, at least among the demographic of students that apply to these institutions.He risks committing the two major sins of the college essay: perpetuating a cliché and seeming disingenuous.The admissions officer can’t help but ask: How realistic is it that a high school student experiences such a perfect moment of reflection, complete with overarching symbolic parallels ?

        Already at a disadvantage, he dares to continue down a risky path.There is thunder, lightning, and a “torn and trembling sky.” There is reflection on the destruction of a tempest and personification of its parts.There is even a juxtaposition of serenity and chaos, freedom and concerns.At any moment, I expect the heroine from the latest romance movie to dramatically run into John’s embrace, as he twirls her in the pouring rain.

Interestingly enough, however, it is in these risks that the author finds his greatest strengths.He ultimately avoids both issues by consciously tackling the overdone; as he says, he neither “tap - danced nor sung in the rain that night” but rather stood.Then, he meticulously interjects with those aspects of himself that make him most vulnerable: his fears.He brings the very personal into the personal statement.We learn little about his accomplishments or qualifications, and he is wise to avoid the laundry list.Yet, we walk away with a profound understanding of who he is at his core.In doing so, John produces a work that demonstrates his command of prose while maintaining the integrity of his message.`,
        },
        {
                id: "lazarus-d",
                categoryId: "personal_statement",
                title: "The Silver Lining in 1994",
                author: "Lazarus D.",
                university: "Harvard University",
                theme: "Resilience / Hardship",
                excerpt: "I used to have a commemorative coin set for 1994, the year I was born. Silver dollar and half dollar...",
                content: `I used to have a commemorative coin set for 1994, the year I was born.Silver dollar and half dollar, quarter, dime, nickel, and penny, all sparkled inside the protection of a clear Lucite case. It must have been given to me when I was very young because I cannot recollect any of the details of receiving the gift.What I can remember is how shiny those coins were in 2001, when we cracked the case open so that we would have food to eat over a long weekend.I will never forget the tears my mother shed as she cried, “Sorry.I am so sorry,” over and over again.The $1.91 in change bought ten packs of Top Ramen and a box of frozen vegetables—food I was grateful for.

My mother should have been a doctor.But, right out of high school, she married my father, a man significantly older than her, believing he would provide her with freedom and the financial support so she could pursue medical school.In reality, she had married a man with no job and no ambition, who was a drug addict and alcoholic with a violent temper.As a little boy, I would watch him go into rages and break everything he could get his hands on.His diet consisted of Jack Daniel’s, cigarettes, M & M’S, and any pill he managed to get a hold of.My mother left him when I was five and my sister was two.I have rarely seen him since.

To say that life has been a struggle would be an understatement.My mother, sister, and I have been homeless on several occasions.With all of our belongings packed in the back of the car, we have bounced from house to house with friends and friends - of - friends, sleeping on the living room floor, in a spare bedroom, or a tent in the backyard.We have also had periods of more prosperous times where my mother could afford an apartment and gas service, but not power.A few years ago, we spent six months using battery-operated lanterns, rarely staying up after the sun went down.This left me little free time, and it made completing my homework an immediate priority.

In all of this, I have held close the mantra that my mother has repeated to me throughout my life, “The two most important things in life are your education and integrity.Once they are yours, they can never be taken away.” My sister and I have always been told that school is the top priority in our lives.Even with family and household upheaval, we have stayed in our neighborhood schools.My mother has made countless sacrifices to keep that portion of our lives steady.I realize the struggles she has faced on our behalf and in return, have strived to take full advantage of the free education provided to me.

        It’s not always easy finding the time to study.My mother often works three to five jobs at a time, so I am responsible for taking care of my sister, who has a heart condition.I have to help her maintain her diet, exercise routine, and medications, or else she is at high risk for having heart attacks.

My major educational goal has been to attend a top university as a math and physics double major.My area of interest is specifically in laser technology and how improvements can be made to help with major surgeries, such as cardiac and neurosurgeries.I want to create advances in lasers that will not only save lives, but also improve the quality of life for millions.I want be able to study the most cutting - edge science with the brightest minds in the world.And ultimately, when I reach my goals and create new laser technology, it will save my sister’s life.`,
                analysis: `In choosing to write a highly personal essay, Lazarus ensured that his statement would not mimic any other personal statement submitted to Harvard.His life struggles relate extremely important things about who he is as a person and student.The opening description of the Lucite case of coins readies the reader for a story about a hobby or a childhood toy.The story then makes a surprising shift in tone and focuses on extreme hardship as the coins become symbols of Lazarus’s loss of innocence.He quickly becomes an adult and saves childish things for his father—the man who only eats M & M’S.

        Lazarus’s willingness to open up about such a difficult time in his life is admirable and certainly creates a personal narrative that holds up the essay and informs the reader.The first two paragraphs paint a dark picture of a life and what is surely an important aspect of who Lazarus is as a person—which is, of course, the key element of a personal statement.The final paragraphs of the essay turn into a description his sister’s illness and his desire to help surgeons.Important things to be sure but perhaps too much to tag onto the end of an essay that already carries so much.

        Conversely, his quick mention of academics works extremely well.For many Harvard essays, any time spent defending the importance of academics would seem out of place or redundant.Lazarus’s quick mention of such a thing, however, could be vital.Hardships overcome do not appear on an academic transcript—this essay not only informs who Lazarus is as a person but also allows the admissions officers to see his entire application with a new understanding.`,
        },
        {
                id: "hannah-umanski-castro",
                categoryId: "personal_statement",
                title: "Ethics of an Education",
                author: "Hannah Umanski-Castro",
                university: "Harvard University",
                theme: "Advocacy / Growth",
                excerpt: "I am sitting on the end of a cafeteria table. My company is a familiar face: a new library book...",
                content: `I am sitting on the end of a cafeteria table.My company is a familiar face: a new library book.At the table behind me, my classmates are laughing.When I attempt to join them, they all fall silent, avoiding my questioning glance.Tears well up in my eyes. “Why is this happening to me ?”

This was a common scenario throughout my grade school experience, though it climaxed in fifth grade, in a small class of only seventeen kids.The fifth grade was the year everyone was obsessed with conformity.I never did fancy Follow the Leader.Maybe it was because I lived in an apartment complex, and did not own clothes from Abercrombie & Fitch.Maybe it was because I was the bespeckled girl whose nose was constantly lodged in a book.I loved school, and I loved reading; thus, I became an easy target.

        Sometimes, I wondered why they bullied me, why they purposely excluded me from their conversations and their company, when they did not even know me.Now, I understand that they acted the way they did because they did not know me.They did not comprehend how much I valued my education.They did not know that because the post office was losing business, my dad was working fewer hours, and that every penny he made he stretched to pay for our food, the bills, and my school’s tuition.They did not know that my mom could not work because she was taking care of my baby sister and my aging grandmother.Above all, they did not know what an education meant to my mom, who left her home country of Costa Rica before she graduated from college so that she could earn enough money to support her parents.

“Cariña,” my mom would say, “an education is the most important gift your father and I can give you.We make sacrifices so that you and your brother and sister can have a better life, and make a better future for yourselves.With an education, you can be whoever you want to be.You can achieve your dreams!” It was a philosophy etched in my heart.

How could I best fulfill my dream ? Despite being labeled an outcast by my classmates, I decided to take the initiative.I reached out and became an active participant in my school community.By taking advantage of the opportunities my school had to offer, I discovered my strengths and passions.In addition, I developed a keen sense of fairness, and an ability to identify and reach out to others who are feeling left out.These experiences helped me grow into a confident young woman, unafraid to stand up for what I believe in, ready to do whatever it takes to fulfill my dreams.Wherever I go in the future, I shall strive to listen and learn from all my experiences, without forgetting who I am.`,
                analysis: `The five - hundred - word limit is Hannah’s greatest foe.Her aim: to communicate a tale of bullying, to explain the extra - bullying hardships she had to face, and to weave it all together to produce an optimistic, press - on - regardless mind - set.It’s a feat to do one of those effectively in five hundred words, and this multitasking tale is strong and focused in spite of that barrier.

        The present - tense opening establishes her alienated suffering.It is hard for her to ascertain exactly what she should be conforming to other than a disdain of education, and she concludes that it is her peers’ ignorance of her home life that preempts the bullying.As a study in form, the introductory veneer of a knowledge - loving young girl behind a library book pitying her bullies for their uncompassionate ways shows that the crux of the essay is not this love of education—a seemingly perfect desire for admission into Harvard—but the even more empathic love for fellow human beings, most notably her family.And though Hannah does not have enough space to communicate years of struggle, the crafting of her sentences lends the piece some urgent candor.
The end of the essay does have a rushed, vague feel.We don’t know what passions she has developed and how she reached out and “became an active participant.” However, this seems more to be the effect of a writer who thought what she wrote before was too negative, and thus the positive recompense must be illustrated in Technicolor.For the young woman who had an uneasy high school career and internally created pressure to succeed for her family, she traces the ravine and the ascent for the reader to follow.Her empathic capacities to make others identify with her plight are on display, just as she claims she strives to do.`,
        },
        {
                id: "sarah-chapin",
                categoryId: "personal_statement",
                title: "Icy Comeback: Redefining Victory",
                author: "Sarah Chapin",
                university: "Harvard University",
                theme: "Overcoming Adversity / Science",
                excerpt: "I am standing behind my high school when a snowball pelts my side with a thud and splatters across my jacket...",
                content: `I am standing behind my high school when a snowball pelts my side with a thud and splatters across my jacket, covering me with a fine, icy dust.My bewildered eyes trace the snowball’s trajectory until they fall upon a pair of snickering hoodlums crouched behind a small mountain of snowballs.They must have been waiting all afternoon for an unsuspecting student to walk by, and perhaps for emphasis, one of the boys looks me in the eye and raises a grimy middle finger.Quickly, I mold a handful of snow into a sphere with cupped hands and cock my arm back.

I haven’t thrown anything in a while, but muscle memory guides me through the requisite motions.I played softball for eight years, and my athletic strength was always my throwing arm; in fifth grade, when my coach asked me to throw the ball from third to first, I hurled the ball with such force that the catch knocked him off - balance.Upon entering high school, it seemed natural that I would play on the school’s softball team.

                However, my body had other ideas.Throughout middle school I’d developed increasingly painful body aches, and in freshman year I awoke one morning with a brutal headache penetrating the crown of my head and the bones of my face as though a vice had been clamped to my skull overnight.After consulting more doctors than I can remember, I was diagnosed with fibromyalgia.

Fibromyalgia is characterized by chronic widespread pain and extreme sensitivity to touch.My neurologist describes fibromyalgia as “headache of the body.” Personally, I favor my father’s description; after one particularly painful and exhausting day he aptly proclaimed, “Fibromyalgia is your body’s way of giving you the finger.”

Agonizing muscle cramps mocked me constantly, preventing me from walking longer than five minutes without growing exhausted.The pressure above my eyes sneered at me whenever I attempted to read or write.Even after I found medications to temper the headaches just enough so I could return to school with sporadic attendance, sharp pains gnawed at my body with haughty derision if I even thought about returning to the softball fields and the activities I loved.

For months I tried to ignore the cruel obscenities fibromyalgia hurled my way, steadfastly believing the pain would soon subside and I would achieve everything I had planned for myself if I simply disregarded the taunting aches and worked doggedly to catch up at school.But when softball season arrived, it became apparent that while determination and intelligence could preserve my GPA in the face of fibromyalgia, there was no personal attribute or skill that could heal my body and allow me to join my teammates on the field.

It was time to confront the beast.In doing so, I kept in mind the schoolyard aphorism that there is strength in numbers.I did not face fibromyalgia alone, but with mathematics by my side.Baseball is a game of statistics, and if fibromyalgia threatened to steal the sport I loved through physical deterioration, I would outsmart this insolent illness and reclaim ownership of baseball through intellectual pursuits.I began a mathematical research project, analyzing the effectiveness of current baseball statistics, as well as deriving my own.

Fibromyalgia forced me to redefine my goals and personal standards for success.This baseball project was my first step toward reclaiming my life and laying the foundation for victory over my illness.As calculations replaced pitching drills, my passion for baseball was channeled into a burgeoning love of science and math.Hours I had previously devoted to softball became filled with scientific journals and books, and summers I used to spend at athletic camps were devoted to research at local universities.Baseball provided a link to my pre - fibromyalgia life at a time when I desperately needed one, and through baseball I realized that if I wanted to beat fibromyalgia, I could not simply hope it would disappear overnight.Whether I modified my medications or adapted my schedule, I needed to devise my own way to face fibromyalgia’s antagonizing aches head - on.

So when that taunting rascal waves his middle finger in my direction, my cheeks do not flush with angry humiliation and my legs do not run away, but my hands mold a snowball and my arm pulls back.As I follow through with my throw, pain radiating up my arm, I know instantly that I will pay for this exertion in the morning.But my icy comeback hits the sniggering boy squarely in the chest, knocking him backward into the snow as his accomplice’s mouth lies agape in shock.Well.I guess I’ve still got it.`,
                analysis: `Sarah’s story opens with a vivid anecdote of being pelted by a snowball that brings the reader to the scene of the crime with detailed sensory descriptions.She skillfully ties the story to her talent for athletics, which in turn leads to her struggle with fibromyalgia and how in the face of physical limitation she redirected her passions to science and math.The story comes full circle and ties together nicely at the end with the conclusion of the snowball scene, which leaves the reader feeling victorious and vindicated for Sarah, as well as proud of her determination.

Sarah manages to cover a lot in this essay.The personal statement is an evident combination of overcoming obstacles and discovering academic passions, and also discreetly includes résumé - worthy accomplishments, such as her own mathematical research project on baseball statistics and summer research at local universities.What is important about her personal statement is that she goes beyond the résumé and gives the admissions officers a look at her character and personal struggle.

Even though her essay is a bit long, Sarah does not waste a word and ensures that every detail she includes contributes in some way to the overall message she is trying to convey about herself.Rather than simply evoking sympathy for her situation, Sarah weaves humor and a cheeky attitude throughout her narrative.She introduces her love of mathematics with a creative twist on the common saying, “strength in numbers,” and affectionately alludes to her father’s depiction of fibromyalgia as “your body’s way of giving you the finger.” Her vivacious and tenacious personality shines through in her colorful and descriptive language, painting a clear picture of Sarah as a determined person who doesn’t let a chronic illness defeat her and instead finds another passion.`,
        },
        {
                id: "david-roberts",
                categoryId: "personal_statement",
                title: "Iron Therapy: Motivation in Motion",
                author: "David Roberts",
                university: "Harvard University",
                theme: "Overcoming Obtsacles / Growth",
                excerpt: "“Let’s face it, you’re slow,” my violin teacher said. He was, as always, complaining that running was detracting from my practice time...",
                content: `“Let’s face it, you’re slow,” my violin teacher said.He was, as always, complaining that running was detracting from my practice time.That summed up what running had always meant to me, ever since I was a seventh grader, choosing his sport for the first time.I was fine and content, however.I always had Jeffrey and Archie, classmates like me who ran slowly.We were good friends.We laughed together; we raced together; we pushed each other, and endured tough workouts together.But after middle school the people I trained with went on to do things they were better at.I remained, even though I was not good enough to be considered for varsity.

High school running was hell.I struggled with workouts, most of which I had to run alone.In the hot, dry days of autumn, I often coughed on the dust trails left by my teammates as they vanished into the distance.During the workouts, I got passed incessantly, almost getting run over on occasion.It hurt not to be important; to be dead weight for the team.I looked forward to the next year, when I could hopefully run with the incoming freshmen.

It didn’t happen that way.Even a year later, I was still the slowest on the team.How could the freshmen who had snored off the whole summer beat me, a veteran from middle school and high school with decent summer training ? I nevertheless reconsidered the effectiveness of my training, and looked forward to getting “back in shape.” It was only after my condition had been deteriorating steadily for a few weeks that I began to feel a new level of humiliation.I started to have trouble keeping up with old ladies in the park, and each day I worked frantically to prevent the discovery of that fact by my teammates, running toward the sketchy areas of the ramble, in the south, where there’s barely anybody.My mother, worried about the steady deterioration of my condition, contacted a doctor.

I was anemic.The doctor prescribed a daily iron pill, and the results were exhilarating.I joked that I was taking steroids.I sunk into endless oxygen.I got tired less.During the workouts, I felt more machine than man.Iron therapy taught me something fundamental.It reminded me why I was running; why I had stuck to this damn sport for four straight years.When I was anemic, I struggled to gather what little motivation I had for those painfully slow jogs in those parks.Putting the effort in, and seeing the dramatic results fooled my mind like a well - administered placebo.Iron therapy was the training wheels that would jump - start my dramatic improvement.

It took four months—four months of iron pills, blood tests, and training—to get back to my personal best: the 5: 46 mile that I had run the year before.Early February that year, the training wheels came off.I was running close to seven miles a day on my own.But I wasn’t counting.I could catch a light.I could walk as many stairs as I wanted without getting tired.I was even far ahead of where I was the year before.After two and a half years as a 5: 50 miler, I finally had a breakthrough race.I ran a 5: 30. I asked coach if I could eventually break 5 minutes.He told me to focus more on maintaining my fitness through spring break.

I ran the mile again, this time outdoors.Coach had me seeded at a 5: 30. I ran the first lap, holding back.I didn’t want to overextend myself.I hoped to squeeze by with a 5: 35. The euphoria was unprecedented as I realized by the second lap that I was a dozen seconds ahead and still holding back.I finished with a 5: 14. On the bus ride back from the meet, one of my long - standing dreams came true.I pretended to ignore Coach sitting next to me, but he kept on giving me glances.He was excited about my time.We talked a lot about the race.We talked about my continuous and dramatic improvement.He said it was early in the season and that I would break 5 minutes after only a few weeks of training.

Six weeks later, Mr.Song, my chemistry teacher, asked me if I had broken 5 minutes for the mile yet.I told him all about how I had run in three meets over the past month and had failed to break 5: 15 on every one of them.I told him that 5 minutes was now for me a mirage in the distance.Mr.Song, however, did not show much concern: “You’re just overtrained.Once you ease up before the big meet, you’ll drop in time once more.” Even though these consoling words were from the man who had baffled my nutritionist when he had guessed that I was anemic, I still doubted his wisdom.On Sunday, I would run the mile once.My last mile of the year.This was it.Using my tried - and - true racing strategy, I finished with a 5:02, a 12 - second drop in time.Mr.Song’s predictions had again turned out to be correct.

Before I was anemic, the correlation between hard work and success was something that only appeared in the cliché success stories of the talented few.Now, I am running more mileage than I ever have before.And my violin teacher still complains.But I smile.I know it’s going somewhere.`,
                analysis: `David’s opening sentence of “‘Let’s face it, you’re slow,’” blends welcome humility with an assumed question.This mystery propels the first half of the essay: namely, “Why is David slow ?” It’s an admirable strategy from the start, as college admissions essays usually approximate a brazen “Hardship X and / or Triumph Y Made Me an Übermensch.” Yes, this essay is of those stripes as well, yet it tempers what could be an egotistical display with an attractive dose of self - deprecation.For example, in the first sentence, the assumption is not that slowness is the hardship; rather, it is that he has to face the fact that he is trying too hard and should probably stop doing as such.But we all like someone who has so much earnestness, they must be told to quit.

The first half of the essay exhibits mastery over creating reader interest and flows from thought to thought with ease.We have a mystery, a struggle, and a familiar tone that does not smack of presumption.David’s climactic reveal of the cause of his slow - running speed is a surprise—handled with mature self - awareness that an iron deficiency isn’t the same as cancer or loss of limb.

        Ironically, once David’s physical capacity is restored in the essay, the essay becomes anemic itself.Who is Mr.Song ? If Coach’s approval was so important, why was he not mentioned pre - diagnosis ? Too many elements are thrown in as auxiliary support to David’s victory lap.This leads to an odd contrast to his plain message of hard work equaling success.For where were all of these people when he was working hard but not succeeding ? Before the diagnosis, it was his friends and his mother; why are these other authority figures coming out of the woodwork in the eleventh hour ? Moreover, the quantification of success—only obsessed with numbers and times—takes the heart and soul out of his prose.Though David starts off strong, his final lap leaves a reader wishing he had stopped halfway through, and is a fair warning to applicants to make sure to stop when they are ahead.`,
        },
        {
                id: "aran-khanna",
                categoryId: "personal_statement",
                title: "A Cut Below",
                author: "Aran Khanna",
                university: "Harvard University",
                theme: "Perseverance / Teamwork",
                excerpt: "Standing at a whopping five and a half feet high, I am not very tall. Now this might not sound like a glaring, life-changing confession, but to the rowing community this fact can make or break everything.",
                content: `Standing at a whopping five and a half feet high, I am not very tall. Now this
might not sound like a glaring, life-changing confession, but to the rowing
community this fact can make or break everything. I don’t fit the mold of a
traditional rower. In fact, at first glance there is nothing that separates me from
being a coxswain. I am short, extremely light, not particularly burly, and loud (a
must in a good coxswain). So when I meet fellow oarsmen and tell them I am a
rower it is no wonder that they usually scoff at me. So why do I do it? Why do I
decide to put myself at a disadvantage and row? The answer is that I really want
to have an oar in my hands. So I push myself and my teammates in every
workout and race. I am constantly fighting people taller and stronger than me to
be the better rower. To me rowing has nothing to do with innate skill. There is a
simple correlation between teamwork, hard work, and success, and nothing can
supersede that. Through my hard work and the support of my teammates I now
realize how much I have accomplished. I worked my way into the light eight that
went to Youth Nationals, and I, the smallest rower on the team, was elected to
represent it as captain. Looking back, I realize that rowing has taught me the
value of perseverance and teamwork, and those are things that I have readily
been applying to almost every facet of my life.

The perseverance I have learned from rowing has allowed me to tackle many
issues that I previously would have given up on, from fighting through the
frustration of trying to teach English in a Chinese village to doggedly attacking a
difficult math problem. This sense of determination has allowed me to view
failure as a step toward success rather than something to fear. Perseverance has
become an integral part of who I am and how I face problems.

As a rower I know that a well-performing team can achieve much more than
any individual, and this idea constantly affects me as I go throughout my day.
Running the school newspaper, leading Lakeside squash club, and even working
on homework, are all activities that I approach as a teammate, rather than as an
individual, because of rowing. Just as I constantly try to unify any boat I am
rowing in, I feel that I am always pushing friends and classmates to work
together. This notion of teamwork and collaborating with others is one that has
led me to become an effective leader and conquer many challenges.

The struggles I have faced while rowing have profoundly influenced me and
taught me some of the most valuable lessons of my life. The skills I have learned
from rowing have influenced the way I approach problems and will be a part of
me for as long as I live.`,
                analysis: `Aran’s essay takes the shape of an onion. It begins with an outer coating that
draws the reader in and proceeds with a series of substantial inner layers—each
of which reveals deeper insight into Aran’s character.

The physical description of Aran serves as the perfect external layer, because
it depicts him as the athlete who is at a major disadvantage because of his size;
the rower who is looked down upon by other rowers, the oarsman who is
constantly mistaken for a coxswain—as the underdog—(everyone loves a good
underdog story). Once the essay effectively engages the reader this way, it
seamlessly transitions into the narrative’s second and third layers: Aran’s
analysis of his athletic experience through the lens of his struggle as the unlikely
rower and the contextualization of other aspects of his life—such as teaching,
squash, and journalism—with respect to perseverance and teamwork, the two
values he learned to appreciate through rowing. The strength of his essay rests
with this structure; by creating a burgeoning self-portrait of Aran, the onion-like
organization style of the narrative enables Aran to impart to the reader a detailed
and comprehensive understanding of who he is by the end of the essay.

The only risk Aran takes is not taking any risks at all. After reading countless
essays that predictably expound upon students’ résumés by demonstrating their
abilities to rise above challenges and collaborate efficiently with their peers,
admissions officers likely welcome bold attempts at the new and unusual. Aran’s
essay, written in a simple, straightforward, and even somewhat conversational
tone, lacks such an audacious venture. This essay contains no fanfare, no
theatrics, no drama—but it does get the job done.`
        },
        {
                id: "scott-lazarus",
                categoryId: "personal_statement",
                title: "Future President",
                author: "Scott Lazarus",
                university: "Harvard University",
                theme: "Resilience / Ambition",
                excerpt: "I will be elected to the office of President of the United States of America. I’m more than qualified—in fact, I’ve been groomed for the position my entire life.",
                content: `I will be elected to the office of President of the United States of America.
I’m more than qualified—in fact, I’ve been groomed for the position my
entire life. I know this because God and the California court system have
provided me with a fertile training ground—time spent under the stewardship of
a half-absentee father and a psychopath of a grandmother.

In fact, it was my father’s absenteeism, which provided me with my first
lesson in presidential effectiveness. Every Sunday, he gave me the opportunity
to practice my patience (a skill undoubtedly necessary in dealing with Congress)
as I waited at the door for his arrival. I resorted to television as a means of
passing the time, watching PBS telethons as a substitute for cartoons. I often
mirrored the volunteers on the screen, calling number after number, trying
desperately to reach my father. But as voice mails and dial tones subsided to the
agonizing silence of loneliness, I succumbed to failure.

On the rare occasion that my dad remembered my existence, I would be taken
to his place of residence: my grandmother’s home. It was there that I attended
weekly tapings of The Jerry Springer Show and learned how to wage war.
Arguments began with the topic of a loan, and would often, if I was lucky, end
with a visit from the police. My father was India, my grandmother Pakistan, and
“Stupid b****!” a nuclear assault. To my family, Mutually Assured Destruction
came in the form of mutual restraining orders.

Often, I even got the opportunity to hone my diplomatic skills. Being asked to
choose a side was a special treat (though a difficult decision, as neither side
offered an oil incentive), and supporting one faction meant treason to the other.
Being disowned by my grandmother was a regular occurrence, as was someone
leaving in tears. I can still feel them on my face. However, pain was of no
consequence—I believed these lessons to be worthwhile and necessary.

But these “lessons” are not what have pushed me toward Washington. I’ve
gained a much greater gift from my family’s dysfunction.

I must assure you that the first line of this essay was not one of aspiration.
Nor was it written for the purpose of shock. Rather, it is a statement of fact. A
statement used both as a tool to find meaning in my childhood and to express the
only thing in my life that I know to be an absolute truth.

Ingrained within me is the need to transcend mediocrity. To give to humanity,
rather than take. If I’ve learned anything significant from my
Sunday/Wednesday family, it’s that I want to do more with my life than collect a
monthly welfare check. Quite selfishly, I want to reach the Oval Office to dispel
my own fears of failure. However, the true source of my motivation lies in a
deeper need to create positive change. To know that, when all is said and done, I
have left the world a better place. I won’t settle for anything less.`,
                analysis: `In his essay, Scott successfully combines a tough childhood experience with a
blunt statement of his professional ambitions. Although the personal
background–lesson formula is so popular that essays in this genre run the risk to
become repetitive and boring, Scott keeps the reader engaged by recounting sad
childhood moments using a well-crafted political lexicon. This makes the
description of painful situations like the absence of his father and the family
disputes fresh and original, while drawing an unexpected parallel between those
and the presidential office. Because the merits of praiseworthy family members
are a recurrent motif in personal statements, Scott’s focus on his family’s
“dysfunction” instead makes his entrance essay stand out.

The daring and pretentious-sounding opening statement is tempered by the
clever use of ironic expressions throughout the first part of the essay, as in the
“PBS telethons” and the “weekly tapings of The Jerry Springer Show.”
While
revealing the author’s resilient personality, the irony does not diminish the
gravity of Scott’s experience. The “agonizing” silence and the tears underscore
the pain the applicant has endured, as does the conclusion of the essay, where
Scott admits that his conviction to become president reflects the need to rise
above the “mediocrity” that his family represents. Those who scoff at the very
first line of the essay will change their mind by the concluding paragraphs,
where Scott’s genuineness and maturity shine.`
        },
        {
                id: "sf-essays",
                categoryId: "personal_statement",
                title: "Three Bundles of Affection",
                author: "SF",
                university: "Harvard University",
                theme: "Culture / Identity / Service",
                excerpt: "Humans share a universal craving for proteins wrapped in carbohydrates. Each culture creates its unique form, from samosa to sushi to ravioli, to satisfy this yen.",
                content: `Humans share a universal craving for proteins wrapped in carbohydrates. Each
culture creates its unique form, from samosa to sushi to ravioli, to satisfy this
yen. My story involves three types: dumpling, bistek kalabaw burger, and
cuajada empanada.

I cherish memories of my childhood in Beijing involving my extended family
making the ubiquitous dumpling together. Eating was secondary to the simply
magical process of dumpling manufacturing. Water, flour, and stuffing would be
minced, kneaded, flattened, and folded, morsel by morsel, into perfectly flavored
bites. Each person was roped into the assembly line. Amid the chatter of
Mandarin gossip, the grumbling of the rolling pin over dough, and the melodious
simmering of water, I, the mere six-year-old, proudly stood on my stool as the
indispensable doughball-maker, beaming at my relatives while my little hands
frantically rolled the pieces of dough into perfect spheres.

After immigrating to the United States, my small family of three struggled to
multitask all these steps, while nostalgically reminiscing about our life in China.
But the new dumpling-making unit soon absorbed friends of all races as adopted
aunts and uncles, sisters, and brothers. After a period of laughing over clumsy
mistakes and misshapen products, the assembly line works as flawlessly as the
original. I know that I will always carry with me the dumpling tradition
wherever I go as an everlasting tribute to my heritage.

Life in America has allowed me ample chance to enjoy hamburgers. Yet my
favorite burger-eating experience occurred thousands of miles away in the
Philippines. Its ingredients included an eclectic mix of pandesal bread, carabao
meat (bistek kalabaw in Tagalog), and cucumber slices, an unintentional culinary
tour de force made from the only ingredients available in the village of Dugui
Too. There, enclaved deep in the mountains of Catanduanes, people make a bare
subsistence, living with no semblance of a modern infrastructure. On the trek in,
we waded through rivers where women were immersed waist-deep washing
clothes. Throngs of noisy kids followed us, admiring our lighter skin and hair.
Our distribution of solar lights there met with a primitive fascination. In a few
hours, we were able to mingle with the timid but warmhearted locals despite the
language barrier. Seeing their faces alight in excitement for the solar lights filled
my heart with wondrous joy. The bistek kalabaw burger represents the delirious
happiness at the rare privilege to be able to touch people’s lives so palpably.

It was halftime into my six-week immersion program in Nicaragua when I
came down with a severe fever. I was temporarily forced to abandon my
humanitarian duties and rest uselessly in the isolated village, where literacy,
technology, and medical care were nonexistent. I closed my eyes to tolerate the
pangs of my headache amid a torrential downpour. On a sudden whisper, I
reopened them wearily. With surreal clarity, I saw a plate of dumpling-like
morsels, dreamlike after twenty days of monotonous tortillas and beans. My host
mom pointed with her lips in the typical Nicaraguan manner with such sweet
words: “Son empanadas, pruebelas.” I ventured a bite, relishing the unfamiliar
corn shell filled with Nicaraguan sweetened cuajada cheese. Only by thinking
back did I realize the generosity of these indigent people. My host brother had
trekked three hours on the sinuous mountain trail amid the thunderstorm, just to
bring back the ingredients, which cost more than the daily wages of the entire
family. They must have carefully planned the surprise, putting together all the
money to take care of a complete stranger. The selfless love infused into these
empanadas cemented my connection to the Nicaraguan family that adopted me
as its own.

The dumpling, the bistek kalabaw burger, and the cuajada empanada,
ordinary food as they are, matter so much to me. Each symbolizes a bundle of
care and affection from a culture I consider my home.`,
                analysis: `In SF’s essay, we’re guided through three stories, each neatly corresponding to a
carbohydrate-wrapped protein. SF’s words are beautifully evocative,
transporting us into the kitchens of Beijing, through the mountains of the
Philippines, and to the villages of Nicaragua. Each story exposes part of SF’s
personality: The dumplings show she cherishes her heritage and cultural roots.
The burgers showcase her selflessness and compassion for those less fortunate.
The empanadas reveal she recognizes and appreciates the generosity of others.

SF is a gifted writer, but her descriptions are occasionally guilty of excessive
romanticizing. Phrases like “wondrous joy,” “delirious happiness,” and “selfless
love,” even when accurate, can seem like they’re trying a bit too hard.

This is also a long essay, weighing in at 655 words. Her decision to exceed
the word count limit is understandable, considering she chose to synthesize three
detailed stories, but risky. She teeters dangerously close to a topic that is too
ambitious. Her stories feel truncated, each leaving fundamental questions
unanswered. Why is she distributing solar lights in the Philippine village of
Dugui Too? What is her immersion program in Nicaragua? The transitions are
quite abrupt because of the limited space, and her theme of carbohydrate-
wrapped proteins isn’t referenced in her conclusion. A hundred more words
could have tied up these loose ends, but would blatantly violate the word count
rule. Be careful when scoping your topic; it works in this case, but barely.

Her conclusion, though terse and rushed, recognizes the power of her stories,
and resists the common urge to draw unnecessary connections. She doesn’t need
to list off her desirable characteristics and accomplishments for her admissions
officers. SF gives her stories space to speak for themselves. We’re left with a
very real, very positive sense of who this person is.`
        },
        {
                id: "danielle-feffer",
                categoryId: "personal_statement",
                title: "Teammates",
                author: "Danielle Feffer",
                university: "Harvard University",
                theme: "Language / Cultural Immersion",
                excerpt: "I wrap my scarf more firmly around my neck, feeling the chill of the brisk January air as I trudge my way to practice.",
                content: `I wrap my scarf more firmly around my neck, feeling the chill of the brisk
January air as I trudge my way to practice. The bus stop isn’t actually that far
from the pool, but with a heavy backpack and the fancy shoes that my host sister
insisted I wear, the three-minute trek seems to last forever. Turning the corner
three blocks down, I finally make it to the parking lot and see one of my friends.
“Salut, Thomas.”
He knows that it’s me without even looking.
“Salut, Danielle.” He finishes
fiddling with his bicycle lock and stands to greet me. I lean in for my customary
kiss, and he obliges, bisous-ing me once on each cheek, before we walk toward
Piscine Bréquigny together.

Easy conversation flows between us as our well-trained feet follow the paths
to our respective changing rooms. I punch in the code on the girls’ side and open
the door. Familiar figures stand in various states of undress, and bisous go all
around while we change and speculate on the various tortures Marc will put us
through today. Then we head down to the pool deck, ready to meet our fates.

I get to our coach first, and mentally switch back into English.
“Hey, Marc,
what’s up?”
He shrugs.
“Fine.”
I laugh and give him a high five, then move on to bisous and ça va? the rest
of the boys. When I get to Islem, who is Algerian, the two of us proceed to
execute our exceedingly complex non-French secret handshake, recently
perfected at Tours during last week’s three-day meet. (We foreigners have to
stick together, after all.) We end with a perfect fist bump, and I smirk.
Islem winks back at me.
“Et ouais.” That’s how we roll.

Marc eventually yells at us to get to work, and we all start to put on our caps
and goggles. I pull out my team cap from home, reflecting on how much I’ve
changed since I left. Four months ago, I was mute, standing awkwardly to the
side, hoping that English instructions for the new and frightening social
interaction would suddenly appear out of thin air. Now, flawless French rolls off
my lips as I greet my friends, laughing freely at inside jokes, not thinking twice
about kissing swimsuit-clad swimmers on the cheek. I’m not just on the team
anymore—I’m part of it, and every single bisous reminds of that fact.

Someone pushes me into the pool and my shriek is swallowed by the water. I
surface and swear my revenge, glaring all the while at Pierre, the obvious culprit,
who is grinning unabashedly. Then he yelps and falls as he himself is pushed in
as well. The whole team eventually follows us into the water to start the day’s
warm up, and a small smile, fond and content, flits across my face before I join
them.`,
                analysis: `There is one sentence in Danielle’s essay in the past tense: a brief reflection on
her stunted French four months prior to the scene described. The breezy
dismissal of those worries in the rest of the essay has a certain je ne sais quoi,
admittedly; however it makes for a strange personal statement. Persuasive essays
as a form are often easier to grasp and consider when they are declarative (“Pick
me because of this.”) or contemplative (“Let us think about this lobster and
convince you to pick me because of my prescient observations about said
shellfish.”). This is neither. There is no reflection as to how she felt before her
experience in France; there is sparse description of her interiority in general.

But this refusal to engage with the standard mechanisms of personal
statements makes Danielle’s essay stand out. It seems alternatively attractive
because of its refusal to conform to a seemingly prescribed formula and
disappointing because of its reliance on long chunks of hapless dialogue in order
to create an interesting plot.

The essay’s strength is its tone: Danielle writes just casually enough to allow
a reader to enjoy the essay, and creates a refreshing read, maybe because of,
rather than in spite of, its lack of angle. But it is a risky move, and one that could
backfire. The safer path, for Danielle, would have been to write about something
more concrete. Her willingness to try something different worked for Danielle
and produced a high-quality essay.`
        },
        {
                id: "josh-palay",
                categoryId: "personal_statement",
                title: "The Road to JPA",
                author: "Josh Palay",
                university: "Harvard University",
                theme: "Community Service / Empathy",
                excerpt: "I look over at the digital clock at the front of the bus just as the time changes to 8:30. The engine begins to rumble, the seat begins to shake...",
                content: `I look over at the digital clock at the front of the bus just as the time changes to
8:30. The engine begins to rumble, the seat begins to shake, and the bus slowly
pulls onto Route 6 and heads toward JPA—the Jay Pritzker Academy—near
Siem Reap, Cambodia. The bus is alive with chatter. Peace Corps volunteers
trade stories about their experiences in their assigned villages; international
schoolteachers discuss their plans for the day’s lessons. I overhear one of the
Peace Corps volunteers, Deidre, say,
“I have to say, the Peace Corps offers
incredible health care. They medevaced me to Bangkok when I got dengue
fever.”

Today, I find myself unable to join the conversation. I stare blankly at the
blue cloth seat in front of me, trying to gently coax my knotted stomach out of
my throat. All I can think about is the empty seat beside me and the
uncomfortable feeling of entering uncertain territory alone.

My friend and co-teacher, Shahriyar, is in the Angkor Hospital recovering
from a serious bout of amoebic dysentery. I visited him yesterday. He was lying
in bed with his summer reading in his right hand and an IV in his left. Looking
pale and exhausted, he weakly lifted his head and greeted me.
“I don’t know if
you know this yet,” he said,
“but I’m flying home tomorrow. Are you coming
with me?” Though the news didn’t surprise me, the question caught me off
guard. As I left the hospital room, I couldn’t help but think how easily this could
have been me in his situation.

The bus drives over a speed bump faster than it should have, and I’m jolted
back to the present. I try to take my mind off Shahriyar and look out the window
at the world around me. Everything is so much different than it is in Deerfield,
yet it all somehow feels very natural to me. To my left I see an elderly woman
wearing a mask sweeping dust off the street; I smile at her, but she doesn’t
notice. As the bus gets closer and closer to JPA, the fact that I will have to teach
today’s lessons by myself begins to set in. I wonder if I’m physically capable of
teaching three hours of class by myself in the ninety-degree heat and 90 percent
humidity. In the past, Shahriyar and I had always taken turns leading the class,
giving each other a few moments to rest and rehydrate while the other taught. A
part of me is afraid to do it. I’ve never had to lead the class without the comfort
and support of having Shahriyar by my side. As I think about the challenges I
will face, I realize how easy it would be to turn back. I only have to call Sokun
—a local tuk-tuk driver—and he’d take me to the airport. Knowing my co-
teacher has become seriously ill, nobody would think less of me if I went home
today.

As I sit in my seat, planning my trip home, the bus slows nearly to a stop and
then turns onto a narrow red dirt road. I’ve suddenly plunged into a new world.
The mess of worn-down concrete buildings and mopeds gives way to miles of
flooded rice paddies stretching as far as I can see. Every few hundred yards I see
boys and young men working barefoot in the fields. The bamboo huts that dot
the landscape make me think back to my visit to the house of one of my
students, Dari. I remember looking into his room and seeing a wooden table on
his dirt floor. Close by, a bamboo shelf was filled with books. The globe he had
won for being on the Honor Roll was proudly displayed on the bookshelf among
his prized possessions. Smiling ear to ear, he told us that JPA was the best thing
in his life. I realize that it really is too late to go home. I’ve already fallen in love
with my students.

As the bus pulls into JPA’s driveway, the rest of the teachers begin gathering
their materials. I remain seated, deep in thought.
“Are you coming?” I hear a
familiar voice ask me. I look up and see Deidre looking at me.
“Of course I am.”`,
                analysis: `In essays about community service, it is easy to fall into the trap of self-
aggrandizement—emphasizing your own personal sacrifices and good deeds and
in the process making yourself look like someone more interested in self-service
than community service. Josh’s essay, on the other hand, steers well clear of this
pitfall, skillfully conveying compassion, humility, and devotion to the people
with and for whom he works—he does not stay on because he pities his students,
but because he loves them. As a result, instead of coming off like résumé
padding, Josh’s work feels motivated by a genuine desire to do good.

Structurally, Josh’s essay is solid—it traces the trajectory of his thought
process from uncertainty to renewed resolve. This seemingly straightforward
story arc is enlivened by choice details and images—the off-hand conversation
about dengue fever in the first paragraph, for example, adds a good jolt of
surprise, and the descriptions of the Cambodian countryside are vivid and well-
executed. The passage detailing Josh’s visit to his student Dari’s home is one of
the essay’s highlights, a scene that is both believable as the essay’s “inspiration
moment” and memorable for the deep empathy it contains.

While it’s true that Josh has the advantage of a rather unique experience—not
every Harvard applicant is in a position to write their personal statement about
volunteering with the Peace Corps—the main strengths of his essay are certainly
translatable beyond this context. Josh’s essay is a personal statement at its best:
it not just narrates an experience but hints at deeper elements of his personality
and expresses them in a way that does not come off as forced. Someone reading
Josh’s essay can tell that his volunteering experience was far more to him than
résumé fodder. And as the admissions office gets deluged with more and more
applications every year, this spark of sincerity goes very far indeed.`
        },
        {
                id: "lucien-chorde",
                categoryId: "personal_statement",
                title: "Bumping Heads",
                author: "Lucien Chorde",
                university: "Harvard University",
                theme: "Immigration / Community Service",
                excerpt: "I sat under the table, burying my head tightly in my folded arms, while the other children sat on the carpet, listening to the teacher’s story.",
                content: `I sat under the table, burying my head tightly in my folded arms, while the other
children sat on the carpet, listening to the teacher’s story. The language barrier
was like a tsunami, gurgling with strange and indistinguishable vocalizations.
Elementary school wasn’t as fun as I expected at all.
“Hello?”
Hearing a whisper, I raised my head up, only to notice a boy’s face merely
inches away. I bolted up in surprise, my head colliding gracefully with the
underside of the table. Yelping in pain, I noticed that the entire class was staring
at me.

That was the story of how I met my first friend in Canada.

That boy, Jack, came to visit me during my lonely recesses. It was rather
awkward at first—I could only stare at him as he rambled on in English. But it
was comforting to have some company.

From there, our friendship blossomed. Our initial conversations must have
been hilarious to the hapless bystander. Jack would speak in fluent English while
I spurted sentence after sentence of Mandarin. It was like watching tennis—
rallies of English and Mandarin back and forth. But I learned quickly, and in no
time I was fluent.

Jack also showed me the ropes of Western culture. Heaven knows how
embarrassing my birthday party would’ve been if he hadn’t told me about those
so-called “loot-bags” beforehand.

Today, I volunteer at a community service agency for new immigrants where
I work with children. I do it because I understand the confusion and frustration
of dealing with a strange and sometimes hostile environment; I remember how it
feels to be tangled up in an amalgam of unfamiliar words and sounds. And so I
teach them; I give seminars on reading, writing, and speaking skills as well as
Western culture, history, and sometimes, a bit of social studies.

But I strive to do more than just that. I try to be a friend—because I remember
how Jack helped me. I organize field trips to the science center, the museum, and
the symphony: double-whammy trips where children can have fun while
improving their literacy skills.

Through these experiences, I try to understand each of them as unique
individuals—their likes, dislikes, pet peeves, background.

Everyone needs a guiding light through the lonesome process of adaptation, a
friendly bump to lift them from the dark shroud of isolation. That’s what Jack
did for me—with a rather painful bump to the head—and it’s also what I do for
these immigrant children.

My hope is that, one day, these children will also feel compelled to do the
same, helping others adapt to an unfamiliar environment. With this, we can truly
create a caring and cohesive network of support for the children of our society.`,
                analysis: `Lucien’s essay depicts a personal connection with his community service
activity and provides the why to an extracurricular that probably shows up as
only one line on the activities portion of his college application. He starts off
with an endearing anecdote of meeting his first friend in Canada and connects
the encounter to his current passion, then delves even deeper by concluding with
self-reflection and a bigger goal for society that he hopes to achieve. His
personal statement gives the reader a glimpse at his background and assimilation
into a new culture, and how his own experience as an immigrant motivates him
to help other immigrants adapt to life in a new place.

The strengths of this essay lie in the vivid and charming recounting of his first
encounter with Jack, his first friend in a foreign new environment, and how he
uses that story to explain his passion for volunteering. He connects his
community service to a bigger goal at the end of the essay that leaves the reader
feeling inspired, and alludes to his thoughts, hopes, and dreams. There is a tone
of humility and humor as he depicts how he met his first friend by bumping his
head under the table, and makes a motif out of the head bump by referring to it
again later when he’s talking about helping other immigrant children. He
modestly credits his noble deeds at the community service agency to meeting his
first friend, and humbly reveals his hope that his own good deeds will inspire
others to pay it forward. He does a good job of exhibiting his accomplishments
in community service without sounding like he’s bragging.

Lucien could also make the essay more memorable and distinctive by
including anecdotes of his experiences at the community service agency where
he gave seminars and organized field trips. He denotes his volunteering
responsibilities in list form, which can seem a bit impersonal and résumé-like.
For example, he mentions how he tried to understand the people he helped, but
does not include how he goes about doing this, or whether learning about those
unique individuals contributed to his experience. Adding a story of how he
changed the lives of the immigrants he helped would enhance his message and
create a fitting parallel with the anecdote of how Jack helped him as he
assimilated into Western culture.

Overall, Lucien combines humor with humility and leaves the reader feeling
inspired.`
        },
        {
                id: "alex-foote",
                categoryId: "personal_statement",
                title: "Look Through Closed Doors",
                author: "Alex Foote",
                university: "Harvard University",
                theme: "Language / Identity",
                excerpt: "I entered the surprisingly cool car. Since when is Beijing Line 13 air-conditioned? I’ll take it. At four o’clock in the afternoon only about twenty people were in the subway car.",
                content: `I entered the surprisingly cool car. Since when is Beijing Line 13 air-
conditioned? I’ll take it. At four o’clock in the afternoon only about twenty
people were in the subway car.
“At least it’s not crowded,” one might have
thought. Wrong. The pressure of their eyes on me filled the car and smothered
me. (Look, look! She’s a foreigner!) An old man very loudly
whispered to a child curled up in his lap.
“Foreigner,” he called me. I hate that
word,
“foreigner.” It only explains my exterior. If only they could look inside.…

They would know that I actually speak Chinese—not just speak, but love.
They would know that this love was born from my first love of Latin—the
language that fostered my admiration of all languages. Latin lives in the words
we speak around the world today. And translating this ancient language is like
watching a play and performing in it at the same time. Each word is an
adventure, and on the journey through Virgil’s Aeneid I found that I am more
like Aeneas than any living, dead, or fictional hero I know. We share the
intrinsic value of loyalty to friends, family, and society. We stand true to our
own word, and we uphold others to theirs. Like Aeneas’s trek to find a new
settlement for his collapsed Troy, with similar perseverance I, too, wander the
seas for my own place in the world. Language has helped me do that.

If these subway passengers understood me, they would know that the very
reason I sat beside them was because of Latin. Even before Aeneas and his tale, I
met Caecilius and Grumio, characters in my first Latin textbook. In translations I
learned grammar alongside Rome’s rich history. I realized how learning another
language could expose me to other worlds and other people—something that has
always excited me. I also realized that if I wanted to know more about the world
and the people in it, I would have to learn a spoken language. Spanish, despite
the seven years of study prior to Latin, did not stick with me. And the throatiness
of French was not appealing. But Chinese, more than these other traditional
languages, intrigued me. The doors to new worlds it could open seemed endless.
Thus I chose Chinese.

If these subway passengers looked inside me, they would find that my
knowledge of both Latin and Chinese makes me feel whole. It feels like the
world of the past is flowing through me alongside the world of the future.
Thanks to Latin, Chinese sticks in my mind like the Velcro on the little boy’s
shoes in front of me. If this little boy and his family and friends could look
inside, they would understand that Latin laid the foundation for my lifelong
commitment to languages. Without words, thoughts and actions would be lost in
the space between our ears. To them, I am a foreigner, literally translated
as “out-of-country person.” I feel, however, more like an advena, the Latin word
for “foreigner,” translated as “(one who) comes to (this place).” I came to this
place, and I came to this country to stay. Unfortunately, they will not know this
until I speak. Then once I speak, the doors will open.`,
                analysis: `Alex has taken a freeze-frame of a moment on a train in China, and harnessed it
as an opportunity to talk about her love of languages. It’s a clever approach that
pays off big time. While it’s usually not a wise course of action to name-drop
Roman poets and compare yourself to their epic heroes, Alex somehow manages
to do it without appearing conceited. Perhaps she’s successful because the
comparison is followed by a rant that firmly establishes credibility as a first-class
language geek. That’s not intended as an insult: Alex effectively conveys her
passion to the reader who is left with the impression that she reads the Aeneid
the way other kids read Harry Potter. Her comparison isn’t a pompous boast so
much as a heartfelt identification with a beloved character.

Her first paragraph is the strongest. Alex not only quickly and effectively sets
the scene, but also manages to draw the reader in to her state of mind, effectively
leading into what’s to come. The essay also has great flow. While the refrain,
“If
only…” smacks of high school angst, it keeps the reader moving along and ties
together all of the thoughts presented.

It would have been nice if the introductory scene had played a larger role in
the essay. The line in the penultimate paragraph about Velcro was a nice little
connecting thread between the story she’s telling and the point she’s making.
Sprinkling similar details throughout the piece would have polished up an
already great essay.

The most effective part of this essay, though, would have to be the way Alex
infused her voice into it. Her inner monologue is charming and her enthusiasm
contagious. She is really herself in this essay.`
        },
        {
                id: "david-liu",
                categoryId: "personal_statement",
                title: "Olympic Efforts",
                author: "David Liu",
                university: "Harvard University",
                theme: "Initiative / Achievement",
                excerpt: "It was a typical midsummer evening, hot and humid. The air hung stagnant, pressing on me like a thick blanket... Bam!",
                content: `It was a typical midsummer evening, hot and humid. The air hung stagnant,
pressing on me like a thick blanket.…
Bam!
The gunshot lingered in the heavy air for an instant. Then nearly ninety
thousand people began screaming. I was one of them.

The journey that brought me to this moment had been long.
It began in elementary school. At the time, I had a youthful confidence in my
running skills, even entertaining the idea of participating at the Olympics one
day. The tough competition of high school, however, brought me back to earth.
Going to the Olympics was clearly not within my reach, and that particular
ambition was reluctantly relegated to a dusty corner of my consciousness.

Later, in a moment of inspiration, I rekindled the flame of that old dream—
could I possibly volunteer to work for the United States at the 2008 Beijing
Summer Olympics? At first, I enthusiastically attempted to sign up as a
volunteer for the track team. After being summarily rejected because of my
young age, for a brief moment I felt as if my hopes were doomed to be snuffed
out again. Unwilling to accept defeat, I regrouped and realized that my most
useful quality—Chinese fluency—would best serve the Media Services
department. While Bob Condron, head of that branch, was more open to my
request, he remained hesitant (I would only be sixteen at the time of the Games).
Undeterred, I suggested using the volunteering experience as part of my Eagle
Scout project, which rules state must be completed before my eighteenth
birthday. To my great joy, Mr. Condron soon accepted me as a member of their
team, adding,
“We’ve never hired an underage volunteer in the U.S. Olympic
Committee before.“

However, there were still daunting obstacles barring the way to Beijing. Chief
among these was cost—as a volunteer, I had to pay for everything, and since my
mother had to accompany me (an unfortunate consequence of being underage),
we were in need of quite a bit of cash. To raise the necessary funds, I sought out
work, eventually gaining experience in an eclectic group of occupations. I also
fund-raised extensively, describing myself and my project at a number of
companies and organizations. While this was difficult, it gave me practice in
speaking to a number of people from different backgrounds.

As you’ve undoubtedly realized, the opening scenario isn’t the latest script
for an exciting crime/drama TV series, but it was arguably even more thrilling.
Exactly 19.3 seconds after that gunshot, Usain Bolt broke the twelve-year-old
world record in the 200-meter sprint.

As I walked out of the stadium, I was lost in thought: lost in the history I bore
witness to, and lost in everything I had experienced to get to that point. How
fortunate I was, to have learned to forge ahead in all circumstances, finding
alternative approaches when necessary. How fortunate I was, to have the stars
align so seamlessly—my love for sports and Chinese meshed perfectly with the
Olympics that just happened to be hosted in China. How fortunate I was, to be
able to seize that opportunity. Best of all, how fortunate I am, to accomplish my
childhood dream.

The chatter of thousands of jubilant fans jolted me from my reverie. I took a
deep breath, quickened my pace, and joined them as we headed to the bus stop.`,
                analysis: `David begins his essay with an unusual and very successful hook. Unlike similar
openings that start with a dramatic scene, he uses the ambiguity of language to
his benefit. The red herring he creates when describing the gunshot both cleverly
twists a preexisting mental image and creates a mystery about the connection
between events that slowly reveal themselves throughout the essay. It is an
effective rhetorical tool that compels the admissions officer to keep reading.

The international experience is the most obvious, and often most envied,
choice for the college essay. It is seen as the easiest way to get the attention of
the admissions committee and demonstrate the unique background you would
bring to the school that is always mentioned in admissions’ presentations. What
David does very well, though, is place the experience within the context of its
personal significance. He effectively communicates how he developed a
personal goal and worked hard to achieve it, but the real strength of the essay
comes from the last two paragraphs. David captures a moment in time and then
connects all of the various themes he has developed throughout the essay, from
the opening hook to his own previous achievements. Clearly a very skilled
writer, he uses visual imagery to reflect on the circumstances around him. In the
process, he provides key insights into his individual personality and his ability to
appreciate and learn from a particular experience.

Of course, there are aspects of the essay he could improve. The paragraph in
which David details how he landed a volunteer spot with the team, in particular,
reads more like a professional cover letter than a personal recollection on
perseverance. On the whole, however, David has written a masterful essay that
can provide a model for narrative structures within a college essay.`
        },
        {
                id: "eda-kaceli",
                categoryId: "personal_statement",
                title: "The Yellow House: A Thirteen-Year Journey Home",
                author: "Eda Kaceli",
                university: "Harvard University",
                theme: "Family / Sacrifice / Home",
                excerpt: "I sat on my parents’ bed weeping with my head resting on my knees. “Why did you have to do that to me? Why did you have to show me the house and then take it away from me?”...",
                content: `I sat on my parents’ bed weeping with my head resting on my knees. “Why did you have to do that to me ? Why did you have to show me the house and then take it away from me ?” Hopelessly, I found myself praying to God realizing it was my last resort.

For years, my family and I found ourselves moving from country to country in hopes of a better future.Factors, such as war and lack of academic opportunities, led my parents to pack their bags and embark on a new journey for our family around the world.Our arduous journey first began in Kuçovë, Albania, then Athens, Greece, and then eventually, Boston, Massachusetts.Throughout those years, although my family always had a roof over our heads, I never had a place I could call “home.”

That night that I prayed to God, my mind raced back to the night I was clicking the delete button on my e - mails, but suddenly stopped when I came upon a listing of the house.It was September 22, 2007—eight years exactly to the day that my family and I had moved to the United States.Instantly, I knew that it was fate that was bringing this house to me.I remembered visiting that yellow house the next day with my parents and falling in love with it.However, I also remembered the heartbreaking phone call I received later on that week saying that the owners had chosen another family’s offer.

A week after I had prayed to God, I had given up any hopes of my family buying the house.One day after school, I unlocked the door to our one - bedroom apartment and walked over to the telephone only to see it flashing a red light.I clicked PLAY and unexpectedly heard the voice of our real estate agent. “Eda!” she said joyfully. “The deal fell through with the other family—the house is yours! Call me back immediately to get started on the papers.” For a moment, I stood agape and kept replaying the words in my head.Was this really happening to me ? Was my dream of owning a home finally coming true ?

        Over the month of November, I spent my days going to school and immediately rushing home to make phone calls.Although my parents were not fluent enough in English to communicate with the bank and real estate agent, I knew that I was not going to allow this obstacle to hinder my dream of helping to purchase a home for my family.Thus, unlike a typical thirteen - year - old girl’s conversations, my phone calls did not involve the mention of makeup, shoes, or boys.Instead, my conversations were composed of terms, such as “fixed - rate mortgages,” “preapprovals,” and “down payments.” Nevertheless, I was determined to help purchase this home after thirteen years of feeling embarrassed from living in a one - bedroom apartment.No longer was I going to experience feelings of humiliation from not being able to host sleepovers with my friends or from not being able to gossip with girls in school about who had the prettiest room color.

I had been homeless for the first thirteen years of my life.Although I will never be able to fully repay my parents for all of their sacrifices, the least I could do was to help find them a home that they could call their own—and that year, I did.To me, a home means more than the general conception of “four walls and a roof.” A home is a place filled with memories and laughter from my family.No matter where my future may lead me, I know that if at times I feel alone, I will always have a yellow home with my family inside waiting for me.`,
                analysis: `Eda’s narrative provides a poignant look at the immigrant experience and the significance of a stable home.Her story is one of resilience and precocious responsibility, as she takes on the complex task of navigating a house purchase at age thirteen to support her family.The color of the house—yellow—serves as a warm, optimistic motif that frames her journey from "homelessness"(meaning the lack of a permanent, owned space) to security.

The emotional core of the essay is her transition from despair to victory, highlighted by her active role in overcoming the language barrier for her parents.This demonstrates a level of maturity and dedication that admissions officers value.Her closing reflection on what "home" truly means—more than just "four walls and a roof"—ties the narrative together with a universal theme of family and belonging.`
        },
        {
                id: "ye-zhao",
                categoryId: "personal_statement",
                title: "Finding Duty in Success",
                author: "Ye Zhao",
                university: "Harvard University",
                theme: "Gender Equality / Physics",
                excerpt: "The issue of gender never concerned me until then... The trophy now serves as a reminder, not of an achievement but of a duty.",
                content: `The closing ceremony started. One after another, participants went up the stage to receive what were deserving of us. I had gotten a bronze medal. It was not too bad considering that it was my first time in such a competition.

“Now for the special awards,” the emcee announced. “The best female participant for the Asian Physics Olympiad 2008 is Ye Zhao from Singapore.”

The audience broke into rapturous applause, leaving me in a pleasant surprise. Quickly, I was prompted to go up the stage. I felt honored and even delighted. Getting top for something in an international competition should be quite an achievement; my parents and teachers will be very proud of me. Off the stage, other female participants came over to congratulate me, albeit with a tad of envy. My very frank fellow male Singapore participant who has gotten gold in the same competition joked:

“I have gotten gold. Yet you are given a nice trophy and a camera when you got bronze. It is all because that you are a girl.”

It was all because that I am a girl. My spirit sank. The crystal trophy suddenly became heavy. It was like a hammer pounding my heart.

The issue of gender never concerned me until then. Being brought up in a coeducational school where boys and girls did equally well in class, I never really felt that guys are in anyway superior to their female counterparts. However, this time, I felt a pinch in my heart. I felt that we are not quite on the same footing after all (for physics at least). They are guys. We are girls.

Special awards are set up for the females in Physics Olympiads because people feel that girls will not perform as well as boys in physics. Though I believe that there is no inherent difference between the genders, I witnessed the differences between the performance of males and females in the subject. In my Physics Honors class, among the participants for the Olympiads and for any physics faculty in university, there are a disproportionately small percentage of females.

In the midst of all the chattering from the participants, I was thrown into deep thought. The award was set up to encourage girls in physics and yet is a stark reminder of the perceived “intellectual” gap between males and females. What impression does it leave behind for females who aspire for the pinnacle of the field? What mark will such reminders make in the subconscious of little girls who might have wanted to fiddle around with machines alongside their brothers?

I finally accepted the award with much ambivalence and even a tinge of regret. But then, I knew there is no other sensible thing to do without creating a big fuss. The trophy now serves as a reminder, not of an achievement but of a duty. I will strive to be a role model female physicist. And I will work toward the day when all will find special awards of this sort unnecessary. Whether female or male, I believe that with our love for physics, we can excel in the field equally.`,
                analysis: `Ye writes a very compelling narrative that displays her talent for physics as well as her social awareness and determination to be a leader in her field. Her writing style is very direct and easy for the reader to understand. Despite the occasional instances of awkward syntax, Ye remains an effective narrator who lets the reader into a defining moment of her life.

Ye’s narration of the award ceremony demonstrates her personal growth and maturity to the admissions committee. Most people may write about an award ceremony as an end point to show their hard work and accomplishments, but to Ye it was a learning point and moment of profound realization. The readers are able to grasp her emotions as she effectively conveys the weight of the words, “It is all because that you are a girl.”

In this moment, Ye is able to uncover a subtle paradox: The existence of the special award for girls clearly acknowledges a gender gap. As she tells the reader about her previous observations of gender inequality, she maintains a conversational yet persuasive tone, conveying a sense of urgency. Thus the reader cannot help but see the importance of the issue and want to support girls like Ye who “might have wanted to fiddle around with machines alongside their brothers.”`
        },
        {
                id: "octav-dragoi",
                categoryId: "personal_statement",
                title: "The Cornfield Matrix",
                author: "Octav Dragoi",
                university: "Harvard University",
                theme: "Mathematics / Family",
                excerpt: "As I was passing row after row of stems, I realized the cornfield was actually a giant matrix... just like the combinatorics problem I had just solved.",
                content: `A light breeze caressing the cornfield makes it look like a gentle swaying sea of gold under the ginger sun of late summer. A child’s chime-like laughter echoes. As I rush through the cornfield, I hear the rustling of leaves and the murmur of life hidden among the stems that tower over me.

I remember the joy of the day when I solved one of my first difficult combinatorics problems at my parents’ house in the countryside. I felt so exhilarated that I ran outside and into the cornfield. As I was passing row after row of stems, I realized the cornfield was actually a giant matrix with thousands of combinations of possible pathways, just like the combinatorics problem I had just solved. I looked at the sky and I thought about the great mathematicians of the past that contributed so much to this field and about how I have added yet another dimension to my matrix. Suddenly, mathematics appeared to me as a 3D live map where staggering arrays of ideas connect each other by steady flows of sheer wisdom.

Suddenly a loud laughter from the next room wakes me up from my reverie. I am back in my room in the drab dormitory where I lived since I was fifteen. The dim sunset barely lightens up my room, while the cold November wind rushes from the broken-and-mended-with-tape window on the hallway, whistling beneath my door. My roommates haven’t returned yet, and I feel alone and isolated.

In moments such as these I always take out the ultimate weapon against gloominess: the picture of my family. I look at myself, my parents, my little sister, and my grandfather at the countryside, under a clear blue sky, hugging, sharing the joy of being together. It reminds me of the old times, when life was simpler, but it also reminds me of why I came to Bucharest to live in a dormitory. It was because mathematics fascinated me with its beautiful and intricate theories and configurations, and my parents and my family supported me 150 percent. They put in long hours at work to pay for school costs and they selflessly accepted my long absences. I decided then to honor their support, follow our common dream, and become an accomplished mathematician.

Finally today I consider I matched at least an infinitesimal part of my parents’ work. After countless Olympiad stages and fierce selection programs, I managed to win a gold medal at the International Mathematical Olympiad, along with scoring what is called “an ace”: getting gold medals in the National Olympiad, the Balkan Olympiad, and the International Olympiad.

Math, for me, is a vast map of knowledge where theories intersect each other like pathways in a cornfield, and that explains the laws of nature and the universe itself. However, no matter what mathematical sphere shall I soar in, I will always have my family with me and the joy of that day when I was running freely in the cornfield.`,
                analysis: `Octav wrote a very touching essay that does the impossible: speaks to the importance of math and family in his life at once without ever drifting into a realm of deep sentimentality. The use of such excellent and artistic prose to describe such a potentially monotonous subject allows the writing to show Octav’s depth.

But he does digress into a step-by-step description of his mathematical achievements, which are included elsewhere in his application. His love of math speaks to the passion he wants to express to a reader. The gold medals he’s won indicate others’ perceptions of him—not something particularly relevant to this personal statement. He seems to think that these facts are important parts of the description of his relationship with math. In reality, he nearly loses the reader, giving the impression that his interest in math stems from external praise.`
        },
        {
                id: "joshuah-campbell",
                categoryId: "personal_statement",
                title: "My Something",
                author: "Joshuah Campbell",
                university: "Harvard University",
                theme: "Purpose / Religion",
                excerpt: "The strangest sensation I have ever felt is knowing that I am supposed to be doing something, and not know what that something is. Now, I’ve found my something...",
                content: `Jeremiah and I have a lot in common; the one from the Bible, I mean, that comes before Lamentations and after Isaiah. God sent Jeremiah on a mission at a young age; He gave him an assignment that he could not turn down. I’m young, seventeen years old, and, like Jeremiah, I was at first unsure about my assignment. However, on August 28, I stood before my congregation and announced my intent to preach a sermon on trial. Never since had I felt the strange combination of relief and nausea that I felt at that moment. It was then that I was finally sure, sure that the inner pull that I had been feeling for the past four years was not due to stress-induced indigestion. The strangest sensation I have ever felt is knowing that I am supposed to be doing something, and not know what that something is. Now, I’ve found my something, the something God had in store for me.

Words cannot describe what it’s like to be a child who does not fit in, not because of some disability, or because of some undesirable trait, but because he has a calling on his life. Little did I know that, even in my earliest years, God was shaping me into the something He wanted my life to be. It is at the same time humbling and terrifying to think that God chose me before he “formed [me] in the womb.” To be honest, I find it hard to believe that He found me that important. My parents are not super-Christians; my father definitely isn’t a priest like Jeremiah’s father. Still, He chose me, and it’s even more frightening to realize that “Why me?” is a question I may never be able to answer. But, like Jeremiah, I didn’t have much of a choice. God wanted Jeremiah just as He wants me, and I can either choose obedience or a life lacking fulfillment.

As it happened, I couldn’t use the “too young” excuse, either. Jeremiah tried that one, and God’s response was: “Do not say, ‘I am only a youth,’ for you will go to everyone I send you to and speak whatever I tell you. Do not be afraid of anyone, for I will be with you to deliver you.” To be honest again, when I stand behind the pulpit next year, I am going to be scared, shaken to my core because of the gravity of the task I must carry out. I know that already. Jeremiah knew it, too. The good news is so does God, which is why He filled Jeremiah’s mouth with His words. I hope He’ll do the same for me.

In the end, all the people who knew I’d be a preacher one day were right. Yes, I still plan to have fun in college, and, no, I really don’t want to pastor a congregation. I just want to be like Jeremiah, to be the something God wants me to be.`,
                analysis: `Joshuah’s essay is striking in its description of his dedication to God—though, as he describes, his parents are not “super-Christians,” Joshuah feels a very strong connection to his religion. This is a foreign feeling to many readers, but Joshuah recognizes this possibility and is careful to describe not just a dedication to God that may not make sense to some, but the way that dedication makes him feel—emotions that anyone can relate to.

Joshuah also avoids the common trap of centering an essay on something other than oneself. Often, essays about important figures in one’s life—parents, grandparents, good friends—convince an admissions officer that the person described is a wonderful human being, but do little for the applicant’s case. In this instance, Joshuah describes his feelings toward God, but still keeps the story about himself.`
        },
        {
                id: "sadie-mcquilkin",
                categoryId: "personal_statement",
                title: "Run Because I Can",
                author: "Sadie McQuilkin",
                university: "Harvard University",
                theme: "Persistence / Identity",
                excerpt: "My shift in syntax reflected my intensity and devotion to training. When a simple indiscretion stole my ability to run, it took with it a major part of my identity.",
                content: `For every step I take, I could list a dozen reasons why I run. But most of all, I run because I couldn’t.

Maybe it was the sixteen-mile run at a breakneck pace the week before. Maybe it was the impromptu dip into the icy Atlantic Ocean immediately following the run. Maybe it was the residual stress from midyear exams. Maybe I was just going too fast down the ski slope that fateful day last January. Regardless of what precise combination of factors preceded it, the outcome was the same: The anterior crucial ligament in my left knee was destroyed, along with any hope I had of completing my first marathon in the spring.

In the months before my ski accident, running had consumed the majority of my thoughts, energy, and time. I had stopped saying, “I run,” and instead had begun to proudly declare, “I’m a runner.” My shift in syntax reflected my intensity and devotion to training. When a simple indiscretion stole my ability to run, it took with it a major part of my identity. Preparing for a marathon had empowered me to define myself on my own terms, to take charge of my own life. Being deprived of my goal forced me to redefine my concept of self and success. The sense of failure that began to sink in after my injury was far more painful than any physical symptom. The dull ache in my knee following surgery—and even the excruciating stab of a blood clot—paled in comparison to my emotional turmoil.

Not until I acknowledged my misery was I able to take the first step toward regaining my identity. I realized that the fatalistic pessimism into which I had allowed myself to sink did not reflect how I normally perceived myself or how others characterized me. No, I was—and always will be—the one to seek a positive perspective in any situation. By the time I returned to school eight days after my knee operation, I was determined to face my daily challenges with a smile on my face and a spring in my step—even if my gait was more of a limp than a skip. I refused to pity myself, and instead focused my energy on experiencing the present to the fullest possible extent.

My unplanned hiatus from running last winter allowed me to examine how I value and allocate my time. I realized that running was not the sole source of satisfaction in my life; even if I couldn’t improve my mile splits, I could become a better friend, sister, and daughter. Prior to tearing my ACL, the whirlwind speeds at which I had been living my life had left me little time to focus on anyone but myself. My injury forced me to slow down and appreciate all of the people in my life who offered me so much support. I learned to focus more of my energy on taking care of the people I love, and in the process, prevented myself from slipping into self-pity. Getting a friend to laugh or providing a shoulder to cry on became just as fulfilling for me as finishing a race. Though my muscles atrophied, my relationships grew in strength and depth.

Now, as I ease my way back into cross-country season, the sport feels both comfortably familiar and entirely new. The physical motions are the same, but my emotions regarding running have changed. I no longer run to fulfill expectations I have constructed for myself; I run because I want to show my teammates that I love running as much I love them. I run because it makes me stronger—physically, mentally, and emotionally. Ultimately, I run because I can.`,
                analysis: `This essay creatively uses an injury as a vehicle for a discussion of the perseverance and positivity possessed by the author. One of its greatest strengths is the work’s framing. Beginning with answering the question of “Why do I run?” the essay catches the reader’s attention and continues on to discuss possible answers. One of these answers develops into a discussion of the injury that the essay centers on. 

At first glance, Sadie’s essay is about overcoming obstacles. She was injured and needed to recover. But it falls into the Passion section because, in the end Sadie did not overcome the obstacle, she embraced it. She allowed it to shape and help her understand her passion for running. Unlike the earlier essay about running to overcome obstacles, Sadie does not conclude with a personal-best race—the prime example of outward success. She instead concludes with an internal success, and to great effect.`
        },
        {
                id: "will-shih",
                categoryId: "personal_statement",
                title: "Debate and Development",
                author: "Will Shih",
                university: "Harvard University",
                theme: "Competitive Debate / Growth",
                excerpt: "The first weekend of Spring Break is always the IHSA State Debate Tournament... Debate has changed me. It taught me how to tie a tie and which buttons to button on a suit.",
                content: `I suppose there are some trade-offs when you dedicate yourself to becoming the best debater you can be. The first weekend of Spring Break is always the IHSA State Debate Tournament. After progressing from not placing as a freshman to being a semifinalist as a sophomore, my partner Jeff and I were hungry for a state championship. It was also our last chance. Jeff was a year older and he was graduating.

The whole night, we stayed up preparing, honing the wording of our speeches, looking for new evidence to refute others, and coming up with creative arguments that would hopefully surprise our opponents. Our ace in the hole was an argument that we had written based on the Arab Spring destabilizing Bahrain and threatening our Navy’s 5th Fleet there. As we were monitoring the situation using Google News to ensure the situation didn’t change too much, our teammate John burst into the room, iPad in hand, with the news that the French had just green-lighted air strikes on Libya. After Jeff and John stopped their research to debate the merits of NATO action in Libya, I tried in vain to refocus them, urging them to help me finish our work so we could go to bed. Eventually I succumbed to my own desire to join the debate and we all huddled around John’s iPad to watch the CNN report on the Libyan bombings.

After about three hours of sleep, we put on our suits and ties and checked one final time on the situation in Bahrain. We ended up at the same round in which we had lost the previous year, the semifinal round, with the Bahrain argument still in our back pocket. It worked to perfection and we moved on to the final. Despite losing there to a nationally ranked New Trier team, we came home with a towering trophy and we noticed that despite the fact that it said RUNNER-UP, our trophy was just as big as the first-place trophy. As we sat at Panera, finally relaxing after a stretch of three days when I slept about ten hours total, I began to realize how much debate has changed me.

Debate has taught me how to tie a tie and which buttons to button on a suit. I’ve been motivated to open my eyes and find research like Professor Devah Pager’s study that says a white felon has an equal or better chance at getting a job as a black man with no criminal record. I’ve been exposed to the ideas of Malthus and Sun Tzu. I know more about the threat of a nuclear electromagnetic pulse (EMP) attack than any sane seventeen-year-old should know. I can’t even watch an advertisement without thinking about all the fallacies in their argumentation.

I thought then about what my friends and classmates had probably done that first weekend of Spring Break. I looked around at my teammates, leaned over to Jeff and said, “There’s no other place I’d rather be right now.”

And he replied, “Yeah, me neither.”`,
                analysis: `In this essay, Will writes about his experience in high school debate—specifically, he addresses the many lessons and knowledge he has gained, as well as the sacrifices he had to make. 

Although the topic of the essay is rather standard, the strength lies in the way he frames and structures the story. With a very clear beginning, middle, and end, the essay is easy to follow and shows the author’s dedication and passion for debate. A lot of applicants are discouraged from writing about common topics, such as high school debate or sports, but as long as the essay itself is able to illuminate something new and insightful, the topic of the essay matters far less than the content and the way the story is depicted.`
        },
        {
                id: "james-gillette",
                categoryId: "personal_statement",
                title: "The Impact of Journalism",
                author: "James Gillette",
                university: "Harvard University",
                theme: "Journalism / Leadership",
                excerpt: "The paper mattered to me, so I signed up for a second year and was pleasantly surprised when I was promoted to Arts & Entertainment Editor.",
                content: `There are few classes I would choose to repeat even once, let alone twice. I would hate to do so not necessarily because I hated the class, but rather because it would be the same experience and the same content over again. However this was not the case with journalism.

I applied to be a part of the newspaper staff on a whim at the end of my freshman year and was surprised to find out that I’d made it. I spent that summer questioning what being on staff would mean. Mostly I was wondering how much work would be involved. When I returned to East that fall I was hit over the head with my sophomore year workload. Instead of hating how difficult it was to get quote verification forms signed or how our copy/source editor was super intense, I found myself really enjoying the class. By the end of the year I noticed the impact journalism had already had on me—I was a much stronger writer, a more confident conversationalist, and a much more informed individual. The paper mattered to me, so I signed up for a second year and was pleasantly surprised when I was promoted to Arts & Entertainment Editor.

I found my second year in journalism to be remarkably different. With different people in charge and lots of new writers I felt the nudge to take some responsibility. Wanting to create a positive experience for younger writers, I did my best to emulate the better editors from the previous year by being approachable, knowledgeable, and helpful. I discovered I have a knack for creating “artsy” layouts, and a way with the outmoded computers we use. I became more of a general editor for any confused reporters and the tech guy (meaning I could use a scanner and knew some hotkey commands). Naturally I still felt a strong tie to this periodical and I again registered to be on staff for my senior year. I was surprised and excited to learn that I had been named Editor-in-Chief for 2011 to 2012.

In anticipation of the coming year I spent the summer updating the staff policies and contacting local printers to investigate switching from our old one (with whom we’d developed some issues). To prepare myself as a leader I attended a National Scholastic Press Association editorial workshop at the University of Minnesota. There I learned management skills, received a critique of our paper, and compared our work to that of other high schools in the Midwest. This workshop gave me some great ideas for updating and improving our paper. For example, for years we have used Microsoft Publisher, which is a difficult program to work with. That August, I purchased Adobe InDesign for the class laptop and taught myself to use the program.

So far this year has been a year of great change for The Greyhound. I’ve switched our printing partner, changed the paper type to actual newsprint, radically updated our layout, upgraded our programs and technology, added color printing, cut production costs by 40 to 50 percent, and improved our production cycle to help writers rather than pressure them.

The newspaper has helped me develop as a leader and as a student and it has given me a great sense of accomplishment. I am proud to have been a part of its staff for three years. Each year brought new people, new ideas, and new perspectives for me. What had been an almost reluctant application resulted in one of my best high school experiences.`,
                analysis: `In this essay, the author discusses his years of experience in journalism and involvement in the school newspaper to describe how he has grown as a leader. The details he discusses about his work on his newspaper are interesting and help to build the picture of a dedicated, hardworking student. 

But though James demonstrates his ability to write a decent story with clear, descriptive language, he commits one major error. Strikingly, James’s essay reads awfully like a list of accomplishments. Though the context he introduces makes his successes more personable, the essay is never about James as a person, but rather is about what he has done on the newspaper.`
        },
        {
                id: "connor-denney",
                categoryId: "personal_statement",
                title: "Geocaching for Knowledge",
                author: "Connor Denney",
                university: "Harvard University",
                theme: "Hobby / Intellectual Discovery",
                excerpt: "Geocaching had granted me the adventures I have yearned for. As I entered high school, the physical quest was replaced with a quest for knowledge.",
                content: `As a child, I was entranced with tales of questing and adventure. I enjoyed reading about journeys fraught with peril undertaken for a noble goal. Unfortunately, I would have to be content with merely reading legends of knights and maidens, treasure hunters, or ring-bearing hobbits. I knew that I could never have an adventure as inspiring as those I found in books.

It was soon after this acknowledgment that my father introduced my family to geocaching. Called the “Great American GPS Stash Hunt” for a reason, this game quickly stole my heart. Geocaching, which involves using a GPS to find containers hidden in public by other “geocachers” who post the objects’ coordinates online, was the quest for which I had been searching. It was my way to become a Sir Galahad. Not caring for the tiny McDonald’s toys found in most geocaches, I lived for the hunt; it was not the Holy Grail that enticed me, but the challenge of finding it.

This activity has served as a sightseeing tool on vacations, giving us tours of cities around the world as we troop through on our adventures. I imagine myself to be Juan Ponce de León looking for the Fountain of Youth. On coastal hunts I am Captain Kidd. In cities I am James Bond or Jason Bourne. Geocaching has allowed me to transcend the monotony of real life; it has granted me the adventures I have yearned for.

As I entered high school, my free time seemed to vanish overnight. I devoted more time to studies and athletic practices, leaving little opportunity to enjoy the hobby that I enjoyed so much. I savored the rare occasions when I could geocache with my family without scholastic stress. However, geocaching remained an integral part of my life, be it in a metaphorical sense. The physical quest for a film canister or Altoid tin was replaced with a quest for knowledge. I immersed myself in studies not only for my high school classes, but in fields above and beyond the level of my education. I found myself searching for El Dorado in mathematical essays and websites; I slew the dragon of ignorance by reading Time and hosting political debates on Facebook. Though I would rarely embark on geocaching hunts, I became a geocacher for knowledge.

This pursuit has altered my viewpoint on school. Whereas I had previously considered it a place to learn from books and to achieve high grades, I began to search for information outside of class curriculum. School became a training ground, my Camelot, a castle where I could learn the basic skills of attaining knowledge and wisdom before embarking on my journey in the real world. Whether I will be able to find time to geocache later in life or not, I will always be affected by the game that satisfied my lust for adventure and influenced my desire to learn.`,
                analysis: `Connor writes about a hobby that is truly unusual—geocaching. He enthusiastically explains the hobby thoroughly enough for the reader to understand, which makes his unusual pastime an excellent choice for a paper topic. Geocaching becomes a clever metaphor for Connor’s transformation, which gives the reader a better sense of his academic motivation. 

The reader becomes more familiar with Connor’s personality and motivations as a result of his interconnected stories. After explaining what geocaching is, Connor then moves away from the activity itself and focuses on how the key features of his hobby can apply to other areas of his life. His transition from the physical activity to his metaphorical treatment of it is clear enough as to not confuse readers, but its lack of nuance is a disservice to the essay.`
        },
        {
                id: "anumita-das",
                categoryId: "personal_statement",
                title: "I Am a Messenger",
                author: "Anumita Das",
                university: "Harvard University",
                theme: "Declamation / Communication",
                excerpt: "Declamation is a process of internalizing—of learning and understanding... When I declaim Night, something happens to me. I experience a profound metamorphosis.",
                content: `I am a messenger. 

I scan the expanse before me. Three hundred eighth graders stare at me expectantly. The headmasters of Boston Latin School wait patiently from their canvases on the walls. Rows of lightbulbs shine faithfully from the ceiling, illuminating the hall. I lower my chin, glancing momentarily at the wooden floors, and close my eyes. When I look up, I see multitudes of men prostrated across the ground in worship. I hear thousands of voices echoing the praises of God. I have become Elie Wiesel in the concentration camp of Buna, and I speak my thoughts aloud.

“Why, but why, should I bless him? In every fiber I rebelled.”

I see the heavy billows of smoke from incinerators. I watch in horror as men become ravenous beasts for a morsel of food. An irrepressible anger surges in my own fibers—anger at God, who is unmoved by the suffering of humankind. Yet on this Rosh Hashanah, men continue to chant the Kaddish in His honor. People still wish one another a “Happy New Year” in the confines of this prison camp. I realize that man has emerged the stronger. Man has triumphed.

In my lifetime of only seventeen years, I have already undergone nearly twenty transformations like this one. I have been Susan B. Anthony, Anne Frank, and Netaji Subhash Chandra Bose among others since I started Public Declamation in eighth grade. As a declaimer, five times a year, I select and memorize a piece to present to an audience of hundreds of students, but there is more to declamation than memorizing and reciting. Declamation is a process of internalizing—of learning and understanding.

I can read Night. I can read it to my mother. I could probably even memorize it and recite it to myself in front of a mirror. But when I declaim Night, something happens to me. I experience a profound metamorphosis—a gut-level identification with Elie Wiesel beyond the text. I am changed. His emotions become my own emotions, his thoughts my own. His strength becomes the source of my own strength. I am Elie Wiesel.

As I walk off the stage that day having declaimed an excerpt from Night, I remember the day that I learned from Susan B. Anthony to assert my beliefs and never let anyone deny me my rights. I remember the day I learned from Anne Frank to see the bright side of situations and to appreciate the small pleasures taken for granted in life. I remember the day I learned from Netaji Subhash Chandra Bose what it means to be devoted to one’s country. And I realize that it is my duty to share these messages, to preserve them and to remember them—I am not only a declaimer. I am a messenger.`,
                analysis: `Anumita’s essay describes how the act of declaiming transcends mere memorization and delivery and puts her in the shoes of the original speaker. In doing so Anumita in turn puts the reader into her shoes and brings her experience to life with vivid imagery and simple but elegant prose. 

Anumita transitions seamlessly from an illustration of declaiming to its effects on her and how it has informed her life philosophy. By choosing to relate the impact of a broad experience through several examples rather than focusing on a single, defining moment, Anumita more effectively illustrates the ways in which declamation has changed her and allows the reader to accompany her on the journey of her development.`
        },
        {
                id: "anthony-wilder-wohns",
                categoryId: "personal_statement",
                title: "Tsunamis, Garlic, and One Thousand Cranes",
                author: "Anthony Wilder Wohns",
                university: "Harvard University",
                theme: "Compassion / Humanitarian Spirit",
                excerpt: "Seeing the images of destruction wrought by the earthquake and tsunami to Japan, I felt as if something within myself was being shaken...",
                content: `I had never seen houses floating down a river. Minutes before there had not even been a river. An immense wall of water was destroying everything in its wake, picking up fishing boats to smash them against buildings. It was the morning of March 11, 2011. Seeing the images of destruction wrought by the earthquake and tsunami in Japan, I felt as if something within myself was also being shaken, for I had just spent two of the happiest summers of my life there.

In the summer of my freshman year, I received the Kikkoman National Scholarship, which allowed me to travel to Japan to stay with a host family in Tokyo for ten weeks. I arrived just as the swine flu panic gripped the world, so I was not allowed to attend high school with my host brother, Yamato. Instead, I took Japanese language, judo, and karate classes and explored the confusing sprawl of the largest city in the world. I spent time with the old men of my neighborhood in the onsen, or hot spring, questioning them about the Japan of their youth. They laughed and told me that if I wanted to see for myself, I should work on a farm.

The next summer I returned to Japan, deciding to heed the old men’s advice and volunteer on a farm in Japan’s northernmost island, Hokkaido. I spent two weeks working more than fourteen hours a day. I held thirty-pound bags of garlic with one hand while trying to tie them to a rope hanging from the ceiling with the other, but couldn’t hold the bags in the air long enough. Other days were spent pulling up endless rows of daikon, or Japanese radish, which left rashes on my arms that itched for weeks. Completely exhausted, I stumbled back to the farmhouse, only to be greeted by the family’s young children who were eager to play. I passed out every night in a room too small for me to straighten my legs. One day, I overslept a lunch break by two hours. I awoke mortified, and hurried to the father. After I apologized in the most polite form of Japanese, his face broke into a broad grin. He patted me on the back and said, “You are a good worker, Anthony. There is no need to apologize.” This single exchange revealed the true spirit of the Japanese farmer. 

When I had first gone to Tokyo, I had sought the soul of the nation among its skyscrapers and urban hot springs. The next summer I spurned the beaten track in an attempt to discover the true spirit of Japan. While lugging enormously heavy bags of garlic and picking daikon, I found that spirit. The farmers worked harder than anyone I have ever met, but they still made room in their hearts for me. So when the tsunami threatened the people to whom I owed so much, I had to act. Remembering the lesson of compassion I learned from the farm family, I started a fund-raiser in my community called “One Thousand Cranes for Japan.” Little more than two weeks later, we had raised over $8,000 and a flock of one thousand cranes was on its way to Japan.`,
                analysis: `The goal here is to write a personal statement—not to draft a global Bill of Rights. Anthony uses the tsunami to frame the story of his life rather than using his life as a backdrop for a discussion about the tsunami. The crowning achievement of Anthony’s essay is the subtlety with which it illustrates Anthony’s compassion and humanitarian spirit. 

By choosing to focus on why he organized the fund-raiser instead of the fund-raiser itself, Anthony is able to portray his personality to the reader in a humble, rather than self-congratulatory, tone. Anthony does this in a truly praiseworthy manner, allowing his experiences to speak for themselves. Anthony does not have to tell the admissions officer that he is culturally curious—the fact that he heeded the old men’s advice and returned to Japan to volunteer on a farm does that for him.`
        },
        {
                id: "shang-wang",
                categoryId: "personal_statement",
                title: "The Dollar Menu Epiphany",
                author: "Shang Wang",
                university: "Harvard University",
                theme: "Decision Making / Passion",
                excerpt: "Choosing a career in one field over the other would be as cruel as selecting a McDouble over a McChicken. I could not simply select one without filling myself with regret.",
                content: `The other day, I was presented with a grave predicament. It was late afternoon and I was ravenous. I had missed lunch due to band lessons, and my stomach did not enjoy being ignored for ten hours. As I finished running errands for my mom, I noticed the local McDonald’s ahead, and was drawn to it like … well, like a hungry guy is drawn to a restaurant. As I walked inside, Dollar Menu posters on the wall for the McDouble and the McChicken seized my attention. Both meals called out to me, each arguing for its superior delectability, making my mouth water in anticipation. However, I could not choose between the two courses. No, that day, I wanted both. I was so starved that I knew I could stomach both savory selections. So I strode boldly up to the counter, ordered both, and savored how the flavors of the McDouble and McChicken blended together to make one of the most satisfying meals I have ever enjoyed.

As I sat there with both orders easily devoured, I realized that this situation provided a perfect solution to a dilemma that had plagued my mind since the onset of college applications: What would my college major be? Ever since kindergarten, I had been gripped by the ideas of both medicine and law. As the years passed, my fascination in both areas grew as I began to accumulate intimate knowledge of the human body and the legal system. In high school, my appetite for medicine and law became even more ferocious. Yet, I had always thought that I would have to give up one of these passions in college. However, with this McDonald’s experience, I began to realize that perhaps I could handle both, so long as I maintained my desire.

On the drive home, my thoughts blossomed into maturity. I thought how choosing a career in one field over the other would be as cruel as selecting a McDouble over a McChicken. I could not simply select one without filling myself with regret. Therefore, I decided right there to split my time in college between biology and political science, and to lay off the impossible choice of limiting myself to one passion until later down the road. I was not shying away from a tough decision, but was rather avoiding closing any doors of opportunity before they had been thoroughly tested. Years from now, I look forward to enjoying a double meal at McDonald’s... while relishing a career that blends my two loves of medicine and law in perfect harmony.`,
                analysis: `Shang’s essay is unconventional right from the beginning. A McDonald’s Dollar Menu does not seem like the type of place for an epiphany, but Shang manages to tie his extravagant McDonald’s lunch to his personal life in a humorous but genuine way.

After reading this essay, there is little doubt that Shang knows what he wants to do with at least the first few years of college, and that assuredness is difficult to get across in an essay without sounding arrogant. The goal of the essay is to convince the reader that Shang is a driven student who has two strong interests, and the economical use of plotline and description draws attention to Shang’s fluent writing.`
        },
        {
                id: "al-i-duiswin",
                categoryId: "personal_statement",
                title: "Invisible Neighbors",
                author: "Al I. Duiswin",
                university: "Harvard University",
                theme: "Social Awareness / Empathy",
                excerpt: "I will never forget these unseen people whose reticent needs are so inadequately addressed. Poverty and ambition lie only a few miles from my home.",
                content: `My community encompasses a broad spectrum of racial, religious, and economic diversity. I became more acquainted with what this really means last summer, when I volunteered with my school UNICEF club at the Sacred Heart Organization five miles from my home, helping to distribute school supplies to low-income families. I was appalled to see the lines of people wrapping around two city blocks; I had never imagined there were so many underprivileged families in my community.

While checking eligibility documents and registering families with schoolchildren, I had the opportunity to chat with two Guatemalan mothers in their early twenties, recently arrived to the States with two children each. Their husbands worked as day laborers two hours away in Stockton. With a fragmented family stretched across northern California, these young mothers went to their limits to make ends meet. I could only imagine their anxiety as they arrived at the center the previous night, with only a thermos of hot soup to keep themselves warm. They spoke of several young delinquents who made catcalls and verbally harassed them in the early morning, yet they continued to sit on that bench, determined to wait out the fear and cold in order to obtain essential supplies for their families. 

This fleeting experience—this conversation with aspiring, ambitious immigrants—juxtaposed the extremes of privilege and need in my community. It also led me to reevaluate my perception of the American Dream as humble, modest gains rather than miracle stories. As the son of middle-class skilled immigrants, I enjoy the relative comfort of a warm, supportive family. However, I have realized that poverty and ambition lie only a few miles from my home. Thus, I feel proud to help disadvantaged community members improve their temporal circumstances through hard work, perseverance, and above all, hope.

As I consider a future career and my role in society, I will never forget these unseen people whose reticent needs are so inadequately addressed. Seeing such a predicament in my local community has further piqued my interest in the fields of pathology and immunology as I hope to one day discover cost-effective treatment methods that would be accessible to all impoverished communities.`,
                analysis: `Al’s essay takes the form of a personal mission statement, relating his hopes and goals to the reader. His essay is heartfelt, and it is clear that he is earnest in his concerns. 

There’s the seed of a terrific story in Al’s encounter with the Guatemalan mothers and it could have benefited from expansion. This was a formative experience for him, and if he were to demonstrate why he would have an even more successful essay. A tighter focus on this or a similar moment could have granted the reader insight into Al as a person that simply isn’t there in the piece as written.`
        },
        {
                id: "maliza-k",
                categoryId: "personal_statement",
                title: "Propelled by Pain",
                author: "Maliza K.",
                university: "Harvard University",
                theme: "Medical Journey / Research",
                excerpt: "But for me, being diagnosed with JRA does not act as a hindrance, but instead propels me even further in my desire to pursue a career in the biomedical field.",
                content: `Picture in your mind a rheumatoid arthritis patient. Let me guess: elderly woman, hair gray or graying, right? Eight and a half years ago, I would have had the exact same image in my own mind, but my life took a course that proves that there are rheumatoid arthritis patients who do not fall in the typical category. During third grade, I was diagnosed with juvenile rheumatoid arthritis (JRA).

I distinctly remember the day things changed. One day I was having the time of my childhood life, playing volleyball with friends at recess, and the next I was bedridden, unable to move without feeling excruciating pain. Needless to say, the sudden change was disconcerting. The first thing that came to mind was “Why?” Why did simple everyday tasks suddenly cause me pain? So, I promptly did what I am sure is every doctor’s worst nightmare: I turned to the Internet for information. As a third grader, there was only so much I could find out. 

However, as I grew into my early high school years, I found myself wanting to know more about JRA’s causes and treatments. Once again, I took to the Internet—this time with a more mature, Internet-savvy mind. Many alternative treatments had explanations regarding how they work, but my particular treatment plan did not. Instead of finding all the answers I sought, I was left wondering why taking six tiny tablets of methotrexate once a week managed to keep the pain at bay. Methotrexate’s mechanism in JRA remains unknown and it is something that still occupies my mind.

But for me, being diagnosed with JRA does not act as a hindrance, but instead propels me even further in my desire to pursue a career in the biomedical field. Every twinge of pain I feel essentially works to boost my motivation. This past summer rather than reading the research of other scientists on the Internet, I became the researcher as I worked in a lab in the National Institutes of Health Center for Cancer Research. My research experience deepened my investment in understanding the “whys” of life from the molecular level all the way up to the whole-body impact. In my particular department of pediatric oncology, it was fairly obvious that not all the patients have the same happy ending that I am living, but it is this discrepancy that pushes me to challenge myself to someday provide real-world people with their own happy endings.`,
                analysis: `In her essay, Maliza explains the origins of her passion for research, drawing a connection between her childhood struggle with a debilitating disease and her experience working in a lab. The “overcoming obstacles” genre of college essays all too often falls into the trap of self-pity, but Maliza frankly and openly tells her story in a style that avoids self-indulgence entirely and brings to life a personality that is both optimistic and engaging.

The strengths of this essay lie in its skillful combination of powerful content and frank expression. Its weighty subject matter is balanced nicely by its casual style. Maliza brings her readers into her story from the very beginning, addressing them directly and encouraging them to challenge their preconceived notions.`
        },
        {
                id: "yueming-c",
                categoryId: "personal_statement",
                title: "Red Baseball Cap",
                author: "Yueming C.",
                university: "Harvard University",
                theme: "Grandfather / Resilience",
                excerpt: "Now, whenever I encounter an obstacle that seems overwhelming, I think of Ye-Ye; I see him in his red baseball cap, smiling at me. Life is a blessing.",
                content: `My Ye-Ye always wears a red baseball cap. I think he likes the vivid color—bright and sanguine, like himself. When Ye-Ye came from China to visit us seven years ago, he brought his red cap with him and every night for six months, it sat on the stairway railing post of my house, waiting to be loyally placed back on Ye-Ye’s head the next morning. Today whenever I see a red hat, I think of my Ye-Ye and his baseball cap, and I smile.

Ye-Ye is the Mandarin word for “grandfather.” My Ye-Ye is a simple, ordinary person—not rich, not “successful”—but he is my greatest source of inspiration and I idolize him. Of all the people I know, Ye-Ye has encountered the most hardship and of all the people I know, Ye-Ye is the most joyful. 

Ye-Ye was an orphan. Both his parents died before he was six years old, leaving him and his older brother with no home and no family. When other children gathered to read around stoves at school, Ye-Ye and his brother walked in the bitter cold along railroad tracks, looking for used coal to sell. Eight years later, Ye-Ye walked alone—his brother was dead. 

Ye-Ye managed to survive, and in the meanwhile taught himself to read, write, and do arithmetic. Years later, Ye-Ye’s job sent him to the Gobi Desert, where he and his fellow workers labored for twelve hours a day. The desert wind was merciless. After eight years, Ye-Ye was transferred back to the city where his wife lay sick in bed. Life was a blessing, he told them with a smile. But life was not easy; there was barely enough money to keep the family from starving. 

I had always thought that I was sensible and self-aware. But nothing has made me stare as hard in the mirror as I did after learning about the cruel past that Ye-Ye had suffered and the cheerful attitude he had kept throughout those years. I thought back to all the times when I had gotten upset. They seemed so trivial and childish, and I felt deeply ashamed of myself.

Now, whenever I encounter an obstacle that seems overwhelming, I think of Ye-Ye; I see him in his red baseball cap, smiling at me. Like a splash of cool water, his smile rouses me from grief, and reminds me how trivial my worries are and how generous life has been. Today I keep a red baseball cap at the railing post at home where Ye-Ye used to put his every night. Life is a blessing.`,
                analysis: `Yueming quickly distinguishes herself with her refreshingly crisp writing. Avoiding a common pitfall in college application essays, Yueming uses the appropriate amount of descriptive language needed to illustrate her thoughts while keeping her prose clean and readable. 

For example, the stark simplicity of the line “Eight years later, Ye-Ye walked alone—his brother was dead” makes it especially powerful. The sentence’s abruptness hits the reader with the full force of the situation, unmitigated by secondary details. 

Fundamentally, this reflects the underlying strength of this essay: Yueming’s remarkable ability to tell a story. Like many good storytellers, Yueming weaves recurring themes into her work, giving it a sense of unity. In particular, there is a persistent spark of optimism that her grandfather retains in the face of tremendous hardship, captured in the refrain, “Life was a blessing.”`
        },
        {
                id: "tony-cheang",
                categoryId: "personal_statement",
                title: "Beauty in Complexity",
                author: "Tony Cheang",
                university: "Harvard University",
                theme: "Nature / Perspective Shift",
                excerpt: "My experiences that semester began shifting my ambition-oriented paradigm to an interest-oriented one. Understanding a system’s complex mechanics not only satisfies my curiosity, but also adds beauty to my world.",
                content: `Gazing up at the starry sky, I see Cygnus, Hercules, and Pisces, remnants of past cultures. I listen to waves crash on the beach, the forces of nature at work. Isn’t it odd how stars are flaming spheres and electrical impulses make beings sentient? The very existence of our world is a wonder; what are the odds that this particular planet developed all the necessary components... to support life?

At Balboa, juniors and seniors join one of five small learning communities. Near the end of sophomore year, I ranked my choices: Law Academy first—it seemed the most prestigious—and WALC, the Wilderness Arts and Literacy Collaborative, fourth. So when I was sorted into WALC, I felt disappointed at the inflexibility of my schedule and bitter toward my classes. However, since students are required to wait at least a semester before switching pathways, I stayed in WALC. My experiences that semester began shifting my ambition-oriented paradigm to an interest-oriented one. I didn’t switch out.

Beyond its integrated classes, WALC takes its students on trips to natural areas to explore complex natural processes and humanity’s role in them. Piecing these lessons together, I create an image of our universe. Through WALC, I have gained an intimate understanding of natural systems and an addiction to understanding the deep interconnections embedded in our cosmos.

Understanding a system’s complex mechanics not only satisfies my curiosity, but also adds beauty to my world; my understanding of tectonic and gradational forces allows me to appreciate mountains and coastlines beyond aesthetics. This creates a thirst to see more beauty in a world that’s filled with poverty and violence, and a hunger for knowledge to satisfy that thirst. I hope to be able to find my interests by taking a variety of courses in college, and further humanity’s understanding through research.`,
                analysis: `On first read, this piece feels more like an advertisement for the Wilderness Arts and Literacy Collaborative than a personal statement. Tony dedicates most of his essay to detailing the lessons he learned from WALC instead of writing a truly personal narrative.

Tony notes that although he initially hoped to attend the more “prestigious” Law Academy, he “didn’t switch out” once he recognized the profound nature of his WALC experience. However, although he alludes to a change from his “previously simplistic mind-set,” he doesn’t really explain how his mind-set has transformed. 

But Tony does do an excellent job at demonstrating his remarkable ability to craft beautiful prose. Lines like that referencing his “thirst to see more beauty in a world that’s filled with poverty and violence” are the highlight of the essay.`
        },
        {
                id: "sidartha-jena",
                categoryId: "personal_statement",
                title: "Collaboration in Science",
                author: "Sidartha Jena",
                university: "Harvard University",
                theme: "Science / Community",
                excerpt: "This Round Table of science, chivalrous in their passion for their fields of study and their noble quests for the secrets of the universe, inspire me.",
                content: `As a child weaned on the biographies of Richard Feynman, Albert Einstein, and J. Robert Oppenheimer, I have always had an overwhelming awe for those individuals to whom brilliant scientific thought seemed to come naturally. However, as I read more and more about the scientists I worshiped, there was one image that repeated in nearly every textbook and biography: that of the Fifth Solvay Conference held in 1927 in Brussels, Belgium.

The simple black-and-white photograph depicts some of the most revered names in physics and chemistry: Albert Einstein, Werner Heisenberg, Marie Curie, Niels Bohr, and many others. This Round Table of science, chivalrous in their passion for their fields of study and their noble quests for the secrets of the universe, inspire me not only for their individual accolades and discoveries, but also for their collaboration and their shared love for science. Whenever I saw the familiar black-and-white photo, I felt a renewed eagerness to pursue my own deeply founded interest in science.

Ever since those childhood days, I have grown to apply my love for science both in and out of the classroom. My extra reading on protein synthesis in my Honors Biology class in freshman year led to an independent project with a friend a few years later to determine a method for accurate protein tertiary structure prediction. My fascination with mechanics led to an independent study of quantum mechanics using a borrowed textbook. 

Two of my most formative experiences during high school have been the Intel International Science and Engineering Fair and the Research Science Institute summer program. The first time I attended the International Science and Engineering Fair (ISEF), I was blown away by the sheer magnitude of the event. I was enthralled to find myself in the presence of high schoolers like me who wished to learn more and explore the world around them. This feeling continued at the Research Science Institute (RSI), where I conducted research on gastric cancer development while meeting some of the brightest science and mathematics students from all over the world. These interactions made a lasting impression that will remain with me all my life.`,
                analysis: `Sidartha set out to write a beautifully constructed essay—a completed cycle, with a captivating introductory paragraph and a beautiful conclusion that ties the whole thing neatly together. By reflecting on the collaborative nature of science, Sidartha inspires the reader to understand why science is so important to him.

Sidartha gets back on track when he details his “formative experiences.” When he focuses on himself as a person, rather than his accomplishments, Sidartha is successful. Sidartha’s mentions of the friends he has made while competing also serve to humanize an essay that otherwise focuses on accomplishments.`
        },
        {
                id: "charles-wong",
                categoryId: "personal_statement",
                title: "Bestest Friend",
                author: "Charles Wong",
                university: "Harvard University",
                theme: "Empathy / Mentorship",
                excerpt: "From my campers, I learned that working with children is simply awesome. And from James, I learned that a little love truly goes a long way.",
                content: `James was not fitting in with everyone else. During lunch, he sat alone, playing with his own toys. During group activities, the other campers always complained when paired with him. As camp counselor, I quietly observed his behavior—nothing out of the ordinary. I just couldn’t fathom why the other campers treated him like a pariah.

After three days of ostracism, James broke down during a game of soccer. Tears streaming down his cheeks, he slumped off the field, head in his hands. Furious indignation leaped into my heart. They were the ones who “accidentally” bumped into him and called him “James the Freak.” I sharply told them to keep their thoughts to themselves. I squatted beside James and asked him what was wrong. Grunting, he turned his back to me. I had to stop his tears, had to make him feel comfortable. So for the next hour, I talked about everything a seven-year-old boy might find interesting.

“Why do the other campers exclude you?” I asked. Hesitantly, he took off his shoes and socks, and pointed at his left foot. One, two, three … four. He had four toes. I remembered my childhood, when even the smallest abnormality could cause others, including myself, to shrink away. I finally understood.

But what could I do to help? Impulsively, I hugged him—a gesture of intimacy we camp leaders were encouraged not to initiate. Then, I put my hand on his shoulder and looked him straight in the eyes. I assured him that external features didn’t matter, and that as long as he was friendly, people would eventually come around. I told him he would always be my favorite camper, regardless of whether he had two, five, or a hundred toes.

On the last day of camp, I was jubilant—James was starting to fit in. Although the teasing had not completely disappeared, James was speaking up and making friends. And when James gave me one last hug and proclaimed that I was his “bestest friend in the whole wide world,” my heart swelled up. From my campers, I learned that working with children is simply awesome. And from James, I learned that a little love truly goes a long way.`,
                analysis: `Although several high school students choose to draw from summer experiences to write their college essays, Charles writes a unique story that would definitely stand out from the crowd. Though the experience of working with a four-toed camper is a pretty unusual tale in itself, the true triumph of this essay comes from Charles’s ability to depict his personality.

Charles tells his story in a simple, casual tone. By doing so, the several sentimental moments in this essay, like the hugs or the pep talks, do not seem contrived. These actions truly seem like something Charles would do from the kindness of his heart. The most striking factor of this essay is the degree of success Charles was able to depict himself as a genuine and friendly person—someone any college would love to have.`
        },
        {
                id: "letitia-li",
                categoryId: "personal_statement",
                title: "The Essence of Fifth Grade",
                author: "Letitia Li",
                university: "Harvard University",
                theme: "Friendship / Quirky Personality",
                excerpt: "The exciting, smart, motivated person, whose friends helped her discover the courage to be different, is, amazingly enough, the person I am and still want to be.",
                content: `Blub. Piggypie. Pebbles. 

It’s nearly impossible to recognize the above words as names. And not just any names, but the names of the three most influential people of my life—my fifth-grade math team members and best friends. For just their passing presence in my life, I consider myself eternally lucky. Our mutual love of experiencing life through our silly ways forged a friendship that has sustained and nurtured my individuality for all these years.

Math competitions were exciting. We had secret identities. On competition days, Melissa transformed into Blub, Joy morphed into Piggypie, Livvie reverted to Pebbles, and I embraced my alter ego, Yolanda. We were fastidious in our traditions as a result of our combined idiosyncrasies. 

Outside of math, we were crazy. We unofficially started the nature club. One day at recess, we tasted purple flowers simply because Melissa was convinced they were edible. We didn’t try that again. We supported each other. When I was cast as Helena in our school play, Melissa, Livvie, and Joy all showed up opening night. We performed at our school’s talent show. I had written a song called “Where Is Your Papa, Yolanda?” and choreographed an interpretative dance.

Fast-forward seven years. My math trophies and ribbons are gathering dust in a closet I no longer visit. The tape recording of our interpretative dance has long disappeared. But the memories still linger. I wish I could say we are still the closest of friends, but we’re not. Distance and time are very real obstacles. 

And then there is me. The inevitable passage of time is a great reminder that with all the change in the world, the exciting, smart, motivated person, whose friends helped her discover the courage to be different, is, amazingly enough, the person I am and still want to be. Hence, I have continued embracing life and cherishing my unique personality. As for my future, I hope to carry on with my exuberance for life and learning. I aspire to meet wonderful people—to inspire and be inspired from.`,
                analysis: `Letitia does a commendable job conveying her confidence in embracing a unique and quirky personality in this essay. The use of bizarre nicknames in the introduction is catchy, and the nicknames are only the first of many well-chosen details about the oddities of her and her math teammates’ friendship. 

The transitions through such large gaps in time and activities could present a challenge for a personal essay. However, Letitia orients readers nicely with framing sentences that divide the essay’s sections. The best example of this is, “Fast-forward seven years,” which concisely informs readers that time is moving. 

Regardless, the essay illustrates a clear personality and confidence that would endear the author to any admissions officer.`
        },
        {
                id: "rory-o-reilly",
                categoryId: "personal_statement",
                title: "The Fire in My Heart",
                author: "Rory O’Reilly",
                university: "Harvard University",
                theme: "Perspective Shift / Life Intensity",
                excerpt: "I glared at the burnt clock, and realized my life had changed. It was changed because I had not lost myself.",
                content: `Each tick pierced the cold November night; time was still moving—I could hear it—but the clock was surely destroyed. Warped; slightly charred; hands stopped in perpetual stillness. I looked away.

I looked at my mother, who was crying her heart out, and attempted to fathom what had just happened; the smoke had come out of nowhere. I didn’t remember walking out of the house. I didn’t remember pulling my brother out from his bed. I didn’t remember grabbing our two cats and bringing them to the car. 

I looked back toward the clock. The hands were still stuck on 11:53. Although the hands are stopped, the plastic is melted, and the numbers are disintegrating, the clock—at least to me—represents my own life. Time may have appeared to stop, but it didn’t. It was the start of something better; it was the start of something brighter.

I realized that night that my time was just beginning. I needed to live every second to the fullest. I needed to live every minute like it was my last. A fire was truly raging that night. The one in the house was bad, but it was nothing compared to the untamed one in my heart. No firefighter could ever put out my intensity. No extinguisher could stop me.

I snapped out of my trance... I had time to look at all of the little things I had lost in my life; but better yet, I had time to look at all of the little things I had kept. I glared at the burnt clock, and realized my life had changed. 

It wasn’t changed because I lost all my clothes. 
It wasn’t changed because I lost all my school books. 
It wasn’t changed because I lost my house. 
It was changed because I had not lost myself.`,
                analysis: `In this succinct and memorable essay the author manages to communicate the passion for living life to the fullest. The structure of the essay is particularly noteworthy. The small paragraphs separated by full line breaks and the use of poetic spacing emphasizing important lines make for a more dramatic read. 

Cohesion is another strength of this author. The seamless transitions between details of the fire and greater meaning taken from the event clearly conveying the author’s ideas. The motif of the clock is a good example of this. A thread that appears throughout the essay, the clock gives a masterful sense of unity to the work. 

The author’s juxtaposition of the items lost in the fire with the sense of purpose he now feels in the last lines of the essay emphasizes to readers what “things” he thinks are truly important.`
        },
        {
                id: "leslie-ojeaburu",
                categoryId: "personal_statement",
                title: "Nerves of Steel",
                author: "Leslie Ojeaburu",
                university: "Harvard University",
                theme: "Public Speaking / Fear",
                excerpt: "What truly distinguishes one from another is how fervently we embrace these fears as catalysts and not roadblocks to our goals.",
                content: `My bladder felt as though it would burst right out of my body and yet my mouth burned with an unquenchable thirst. I was stuck in a chair, awaiting my turn on the stage and my mind, body, and sanity were being held captive by my nerves. I was in no shape to give a speech to a room full of parents but there I was, violently clutching my papers at the side of the auditorium, awaiting my name to be called in a few seconds.

I took a deep breath. It wasn’t as if this was my first time in front of a crowd. In fact, as student body president, I had gotten quite used to standing in front of hundreds of teens my age. Yet I knew this time it was very different. My audience was not filled with the young and often quick to laugh faces of teenagers but rather the hardened, mustached, and powdered ones of adults. 

“Please welcome our student speaker … Leslie Ojeaburu … to the stage!” The voice jolted me from my thoughts and almost mechanically I rose from my chair. A huge awkward grin spread across my face... I realized that I had to do what any good president would. I had to speak confidently and pray that no one notices the quaking of my hands.

Speaking has always been one of my favorite pastimes and each new speech I give … one of my greatest victories. You see my nerves, like that of many before me, are not made of steel. They buckle and scream under the assault of any strange, uncomfortable, or challenging moment in my life. Yet it was these very imperfections that forced me to work on public speaking, drove me to run for ASB offices, and taught me to throw myself headfirst into any situation that life may deal.

Indeed we all experience fears and anxieties in similar ways. Still, what truly distinguishes one from another is how fervently we embrace these fears as catalysts and not roadblocks to our goals. I may not know where my public speaking will take me in life, but I do know that wherever I go my nerves will surely follow. acting as constant reminders that there is always more I can improve on and always a new challenge waiting to be conquered.`,
                analysis: `It definitely takes guts to start a college essay by talking about your bladder. Leslie’s essay does not portray its author as perfect, and by reveling in his own flaws instead of refusing to acknowledge them, the author evinces a charmingly self-effacing sense of humor, as well as a willingness to tackle challenges. 

Leslie does not try to cast himself as fearless, but rather as able to go on despite his fear—as a result, his essay has a sense of humor and believability. Leslie succeeds in crafting a winning personal statement that projects likability, determination, and ambition to overcome challenges to succeed, all without making Leslie come off as egotistical or cocky.`
        },
        {
                id: "isaac-alter",
                categoryId: "personal_statement",
                title: "Finding Happiness in Music",
                author: "Isaac Alter",
                university: "Harvard University",
                theme: "Music / Joy",
                excerpt: "In college, I want to explore how music can be used as a tool for social change. I want to use my music to make the world a better place.",
                content: `The first time I ever played the violin, I was only four years old. I remember the weight of the instrument in my hands and the way the bow felt against the strings. It was a moment of pure magic. Since then, music has been the center of my life.

I have spent countless hours practicing and performing. I have played in orchestras, chamber groups, and as a soloist. I have traveled across the country and around the world to share my music with others. But for me, music is about more than just playing notes on a page. It is about connecting with people and sharing something beautiful.

One of my most meaningful experiences as a musician was when I performed for a group of elderly residents at a local nursing home. I could see the joy in their faces as I played, and it made me realize the power that music has to bring people together and lift their spirits. It was a moment of profound connection that I will never forget.

In college, I want to explore how music can be used as a tool for social change. I want to use my music to make the world a better place and to inspire others to find their own passions. I know that it will be a challenging journey, but I am excited to see where it takes me.`,
                analysis: `Isaac’s essay is a beautiful tribute to the power of music and its ability to connect people. His passion for his craft is evident in every word, and his desire to use his music for good is truly inspiring. 

The essay is well-structured and easy to follow, with a clear beginning, middle, and end. Isaac does a great job of conveying his emotions and experiences, making the reader feel as though they are right there with him. Overall, this is a very strong personal statement that showcases Isaac’s talent and character.`
        },
        {
                id: "taras-dreszer",
                categoryId: "personal_statement",
                title: "The Art of Problem Solving",
                author: "Taras Dreszer",
                university: "Harvard University",
                theme: "Mathematics / Creativity",
                excerpt: "To me, math is not just about numbers and formulas. It is about finding elegant solutions to complex problems and seeing the world in a new way.",
                content: `I have always been a problem solver. Whether it’s a difficult math problem or a complex puzzle, I love the challenge of finding a solution. To me, math is not just about numbers and formulas. It is about finding elegant solutions to complex problems and seeing the world in a new way.

In high school, I was part of the math team and participated in several competitions. I loved the thrill of competing and the opportunity to test my skills against some of the best students in the state. But for me, the most rewarding part of math was the creative process of finding a solution.

One of my favorite problems involved finding the shortest path between two points on a curved surface. It was a difficult problem that required a lot of outside-the-box thinking. But when I finally found the solution, it was a moment of pure joy. It made me realize that math is not just about following rules, but about using your imagination to solve problems.

In college, I want to continue exploring the creative side of math. I want to learn more about how math can be applied to real-world problems and to find new ways to use my skills to make a difference. I know that it will be a lot of hard work, but I am ready for the challenge.`,
                analysis: `Taras’s essay is a great example of how to talk about a technical subject in a way that is engaging and accessible. He does a wonderful job of conveying his passion for math and his creative approach to problem-solving. 

The essay is well-organized and flows nicely, with a clear focus on Taras’s personal experiences and motivations. Overall, this is a very effective personal statement that showcases Taras’s intellectual curiosity and dedication.`
        },
        {
                id: "lisa-wang",
                categoryId: "personal_statement",
                title: "Finding Strength in Vulnerability",
                author: "Lisa Wang",
                university: "Harvard University",
                theme: "Identity / Resilience",
                excerpt: "I have learned that vulnerability is not a weakness, but a strength. It is the key to connecting with others and finding your true self.",
                content: `For a long time, I tried to be perfect. I wanted to have the best grades, the most impressive extracurriculars, and the perfect social life. I thought that if I could just be perfect, everything would be okay. But the truth is, I was miserable.

I was so focused on being perfect that I forgot to be myself. I was constantly stressed and anxious, and I felt like I was living a life that wasn't mine. It wasn't until I started to embrace my vulnerabilities that I finally began to find true happiness.

I learned that vulnerability is not a weakness, but a strength. It is the key to connecting with others and finding your true self. When I started to open up about my struggles and anxieties, I found that I wasn't alone. I found a community of people who were also struggling, and we were able to support each other.

In college, I want to continue exploring what it means to be vulnerable. I want to learn more about how we can build more compassionate and supportive communities, and I want to use my own experiences to help others find their own strength. I know that it won't be easy, but I am excited to see where this journey takes me.`,
                analysis: `Lisa’s essay is a powerful and moving reflection on the importance of vulnerability and community. Her writing is honest and direct, and her message is one that will resonate with many readers. 

The essay is well-paced and easy to read, with a clear and compelling narrative arc. Lisa does a great job of conveying her personal growth and the lessons she has learned, making for a truly memorable personal statement. Overall, this is an excellent essay that showcases Lisa’s maturity and compassion.`
        },
        {
                id: "michigan-journalist",
                categoryId: "supplemental",
                subcategoryId: "why_us",
                title: "Why Michigan: A Journalist's Path",
                author: "Anonymous",
                university: "University of Michigan",
                theme: "Journalism & Interdisciplinary Study",
                excerpt: "Mark Twain was a steamboat pilot. Agatha Christie was a nurse. Robert Frost was a light bulb filament changer...",
                content: `Mark Twain was a steamboat pilot. Agatha Christie was a nurse. Robert Frost was a light bulb filament changer. The best writers do not only write beautifully, but also integrate their personal experiences and knowledge outside the world of literature. By combining the study of literature, media and perhaps law, I believe the University of Michigan will provide the education necessary for me to evolve as a journalist.

A journalist cannot reach the peak of his craft if his knowledge of literature and critical thinking skills are weak, which is why I’m excited to explore what the Department of English has to offer. I look forward to courses such as Academic Argumentation and Professional Writing, as I believe these will provide me with a firm basis in journalistic writing technique and improve my abilities to write analytically and develop well-supported arguments. Furthermore, the Professional Writing course will teach me how to write in a concise, straightforward style, a skill vital to a journalist.	

At The College of Literature, Science, and the Arts, I will be able to apply the skills learned in class with media studies in and beyond the classroom. The Honors Program provides an opportunity for independent research into the field of mass media, which will allow for intensive group studies and in-depth research opportunities, and the superb networking opportunity provides the chance to meet and engage with prominent figures in media-related studies, which will provide a deeper insight and knowledge into the field. Outside the classroom, I can see myself writing scripts for the student-run television station WOLV-TV, or composing headlines for The Michigan Daily.

And although journalism is the path I’m currently on, I want to remain open to other opportunities I may encounter at UM. The Pre-Law Advising Program is interesting because I want to explore the intricacies of law and policies that govern this world. I believe that the judicial role of a lawyer is closely related to the expository skills of a writer, and I look forward to exploring this new field of study that wasn’t offered in my high school education.

But all these are what UM has to offer me. I realize that, as a member of the UM community, I’ll want to give back as well. The various volunteer programs offered by Volunteers Involved Every Week appeals to me, as does the possibility of volunteering at the Boys and Girls Club of Southern Michigan, as I have previous experience with elementary school teaching. And as an international student, I know the pains of learning English as a second language. I believe I can contribute to the ESL teaching program either at UM or abroad, and see this as an opportunity to have an impact not only at UM, but in Washtenaw County and beyond.`,
                analysis: `Four Things I Love About the “Why Michigan” Essay

1. The short hook. Many students spend way too long on their opening when a short one will do. This essay’s hook is just 40 words long and works well. Does your “Why this College” essay even need a hook? Nope. If you use this first approach, get to the main argument as fast as you can.

2. The clear thesis that provides a path for the essay. This will probably take you back to AP English class essays where you’re asked to make your argument explicit at the start and then provide evidence to support it. That’s what you’re doing in a “Why this College” essay and your argument is that you and the school are a perfect match.

3. Three main reasons and 3-4 bits of supporting evidence per paragraph. I recommend identifying three main reasons because a) it keeps your essay organized, b) it’s easy to adapt for different length “Why this College” essays, and c) it provides “buckets” for your research. (“Buckets” = the themed paragraphs you need to “fill” with research.)

4. The way he sprinkles “salt” into his essay. Remember above where the author notes that he “look[s] forward to exploring [law at Michigan, as it] wasn’t offered in [his] high school education”? I call this sprinkling “salt” into your “Why us?” essay. Why? Consider this analogy: salt makes one thirsty and, by mentioning opportunities you haven’t had access to, you let the reader know that you’re thirsty for something the school has to offer. And the reader may know of opportunities for quenching that thirst that you don’t—including the “salt” may inspire them to think of those ways.`
        },
        {
                id: "upenn-mechanical",
                categoryId: "supplemental",
                subcategoryId: "why_us",
                title: "Why UPenn: Sustainable Catalyst",
                author: "Anonymous",
                university: "University of Pennsylvania",
                theme: "Sustainability & Engineering",
                excerpt: "I want to be a catalyst when I grow up, someone who sparks growth while also trying to sustain the environment through improved efficiency...",
                content: `I want to be a catalyst when I grow up, someone who sparks growth while also trying to sustain the environment through improved efficiency. At UPenn, I look forward to pursuing a major in Mechanical Engineering and exploring interdisciplinary programs, as I believe that sustainability can be a viable solution to preserve earth’s resources.

At the GRASP laboratory, I hope to work at the Haptics Lab under Professor Katherine Kuchenbecker to devise an integrated haptic-responsive camera trap. I believe that the use of teleoperation (in camera traps) in wildlife censuses and studies can be a potential gamechanger in a geologically diverse country like India. I also feel that haptics interfaces can catalyze the process of discovering and studying unexplored biodiversity hotspots like the Western Ghats and the high-rising Himalayas. Besides this, I would also really get a chance to perfect my butterfly stroke through stroke rehabilitation at the Haptics Lab!

In addition, hands-on project courses like Machine Design and Manufacturing and Product Design will help me in developing, testing and prototyping product permutations, and through ISAC Program 2018, I would love to advocate for a course called Environmentally Sustainable Product Design, as I feel that a product’s longevity in a market is directly related to its environmental sustainability.

I believe that little sparks of innovation can turn into developed businesses if given the right acceleration and, having already negotiated a deal with the software company Everlution Software Ltd. for my eco-friendly innovation ‘Water Wave’, I look forward to using the opportunities at IGEL to turn my innovations into sustainable technological ventures. After accompanying my father to joint-venture meetings across Europe, I have picked upon certain technical aspects of negotiations such as the influence of ‘EBITDA’, the use of inter-cultural body language to change mindsets and the long-drawn-out process of Due Diligence. Courses like Engineering Negotiations will advance my skills in the subtle art of negotiation and develop my thinking in high-pressure situations.

I look forward to contributing in unconventional ways: through Penn’s policy of Climate Action 2.0, I’d love to help increase the efficiency of alternative energy machinery through responsive auto-sensors and I would also contribute to the establishing of wildlife corridors at UPenn by conducting case studies at the Morris Arboretum with the help of the Penn Green Fund. I also look forward to engaging in bird photography and ornithology by being an active member of the Penn Birding Club and potentially conducting fall bird censuses to illuminate for students the birdlife that nestles in the university. I hope to photograph and document each and every one of the 104 species (Morris Arboretum Checklist) of birds at UPenn. Furthermore, courses like Documentary Strategies and Photographic Thinking will help me better integrate critical thought into my photos and construct out-of-the-box documentaries to put into perspective environmental sustainability at UPenn. Also, contributing photo essays to the Penn Sustainability Review will allow me to depict the need for a change, beyond words.

UPenn will also help me pursue a multitude of activities at its various clubs such as Penn Cricket Club, PennNaatak, where I hope to spark my flair for Marathi Drama, and men’s club basketball (I was all state for three years!).

As I move with a redefined pace towards the goal of global sustainability, I am reminded of the UPenn ideology of addressing the most challenging questions and problems of our time by integrating and combining different disciplines and perspectives. Through my stay at UPenn, I hope to do just that.`,
                analysis: `Here’s the outline for the “Why UPenn” essay (which you can adapt for your own essay): 

1. Intro/Thesis (say what you want to study and why)

2. Really specific academic offering at the school that is in your intended major/concentration (this should connect to you in a really specific way)

3. A second really specific academic offering that is also in your intended major/concentration (and that also connects back to you) 

4. Something academic that’s not in your intended major/concentration (this keeps the focus on academics, but also brings in some variety)

5. Best/most important extracurricular offering (that connects to you in a really specific way)

6. Miscellaneous extracurriculars paragraph (2-3 things to demonstrate social/non-academic fit) 

7. Closing (this can be short and, in shorter “Why this College” essays, is unnecessary)

Note that the content in this essay is roughly 50% about the school and 50% about the student, which is a nice balance. It uses specific details like the GRASP lab and IGEL to demonstrate deep research and fit.`
        },
        {
                id: "tufts-economics",
                categoryId: "supplemental",
                subcategoryId: "why_us",
                title: "Why Tufts: Economics & Global Health",
                author: "Anonymous",
                university: "Tufts University",
                theme: "Economics & International Relations",
                excerpt: "In addition to providing a strong foundation in economics, Tufts provides me the opportunity to further explore global health care policy...",
                content: `In addition to providing a strong foundation in economics, Tufts provides me the opportunity to further explore global health care policy through an International Relations Program that leverages the strengths of 18 related departments and programs. I’m also keen to continue my study of the Chinese language through Tufts’ Chinese Department, studying with Professor Mingquan Wang and perhaps study abroad at Zhejiang University in Hangzhou, China, to receive the full immersion experience. Tufts’ Experimental College intrigues me as I can take unconventional courses such as Game Strategy (EXP-0029-S) and Rising Tide: Climate Change, Vulnerability, and Adaptation (EXP-0021-F). Further, Tufts’ urban backdrop provides me the opportunity to play league cricket year round to train for my bid to become the first Jumbo on the US National Cricket Team, while studying abroad at Oxford would provide me with not only global economic perspectives, but also the opportunity to continue my pursuit of cricket in its birthplace. Visiting Tufts, my mother’s alma mater, I felt I was at home in Singapore. Its strengths in Chinese, Econ and International Relations, combined with its beautiful suburban campus, academic rigor, and global reach have confirmed that Tufts is the place for me.`,
                analysis: `I call this the “firehose” approach because it packs 14 reasons into 196 words. The author offers the reader a sense that he has clearly done his research and knows how he might make use of the school’s offerings, which is the goal of the solid, basic “Why this College” essay. 

Did you notice how easy it would be to adapt the “Why Tufts” essay for another school? Switch out “18” in “18 related departments and programs,” change the names of the Chinese professor and University, name two different interesting courses and cut the “mother’s alma mater” line and voila—suddenly this is an essay for another school.`
        },
        {
                id: "cornell-neuroscience",
                categoryId: "supplemental",
                subcategoryId: "why_us",
                title: "Why Cornell: Neuroscience & Research",
                author: "Anonymous",
                university: "Cornell University",
                theme: "Neuroscience & Research",
                excerpt: "Whenever I have time on my hands, I hook myself up to my EEG and analyze my brain waves...",
                content: `Whenever I have time on my hands, I hook myself up to my EEG and analyze my brain waves. Or if I am feeling slightly less adventurous, I am reading about the latest neuroscience trends in ScienceDirect or NCBI PubMed. I want to spend my life studying, understanding, and helping to fix the human brain.

I bought my EEG online two years ago for about $150 and have used it to compare the beneficial effects of both circadian and non-circadian sleep on the brain by analyzing the number of clear peaks in a 3-minute interval of a theta wave. But just counting the peaks is not the best way to measure the benefits. I look forward to gaining a deeper understanding of the fundamentals of neurophysiology (as well as working with better equipment) in courses like Principles of Neurophysiology. As someone who has long been passionate about neurotechnology, the fact that Cornell is unique in offering classes devoted specifically to the field is very important to me. 	

I would also like to be able to contribute my experiences with neurotechnology to support the cutting edge research in Cornell’s brand new NeuroNex Hub. I would love to work with Dr. Chris Xu in expanding the current three-photon microscope to be applied on various animal models. I also look forward to helping Dr. Chris Schaffer, whose research on deep neural activity is not being done anywhere else in the world. I freak out at the possibility of helping him develop a tool to look at multiple brain areas at the same time. 

Though I have long aspired to study at Cornell, when I visited and sat in on Neurobiology and Behavior II, it made me all the more determined. I found Professor Christiane Linster’s presentation on synaptic plasticity absolutely riveting. Her animations of neurotransmitters crossing a synapse and new synapses forming in neuron clusters kept her students engaged in a way I have not seen in any other classrooms. I want to go to Cornell because of teachers like her.  

During my visit I also enjoyed talking with Kacey about her experiences in the college scholars program. I loved that she had studied the effects of circus and gymnastic performances, like Cirque Du Soleil, on therapy for children with neurological disabilities. I am very excited by the idea of combining neuroscience with something like the effects of learning a classical language on developing brains. Many studies have shown the plethora of positive effects of being bilingual, but not much research has been done on classical languages. I have been studying Latin for over seven years, and I have experienced firsthand the positive effects. I spend hours every day breaking down complex sentences such as those in Vergil’s Aeneid, and so have extended this approach to problem-solving to other aspects of my life, like my neuroscience research. This is the program I would create for my college scholars project. 

Cornell is also the only university I am interested in that offers a speaking course in Latin: Conversational Latin. For the past six years, I have rarely had to translate more than a few sentences at a time from English to Latin, never truly experiencing the unique grammatical features of Latin, such as intricate word play by Catullus in his Odes, that drew me so much to this language. I would love to supplement my knowledge by being able to formulate my thoughts in Latin and actively immerse myself in the language. I am really excited about learning the language as it was meant to be learned, as well as the new perspective it will provide me on Latin rhetorical artifacts. 

As a kid who loves inventing, enjoys interactive learning, and wants to speak a dead language, I know Cornell is where I want to be. I wonder if my roommate will mind if I bring my EEG?`,
                analysis: `How this essay is similar to the first approach:
1. He begins with a short intro and solid thesis; both work well.
2. He weaves back and forth between what he wants and what the school offers.

What sets this essay apart: The four examples that name how the school is unique give us a really clear sense of how Cornell is a great fit for this student. Also, we know this essay was written specifically for the school because it would be much more difficult (than the “Why Tufts” essay, for example) to switch out the variables and use this for another school. Finally, while the “Why Michigan” and “Why UPenn” examples go for breadth, discussing many different reasons; the “Why Cornell” example discusses fewer reasons but with more depth.`
        },
        {
                id: "bowdoin-place",
                categoryId: "supplemental",
                subcategoryId: "why_us",
                title: "Why Bowdoin: Connection to Place",
                author: "Anonymous",
                university: "Bowdoin College",
                theme: "Environmental Science & Storytelling",
                excerpt: "On the first dawn of the summer, I found myself in a familiar place: sitting awkwardly in the back of a crowded bus...",
                content: `On the first dawn of the summer, I found myself in a familiar place: sitting awkwardly in the back of a crowded bus full of rowdy twelve year olds. But this time around, I wasn’t the shy, new kid at school, a position I knew all too well. I was the teacher, implementing a middle school aquatic ecology curriculum I’d developed the year before.

As New Jersey’s Passaic River appeared on the horizon, I tightened the red laces on my Merrell hiking boots and checked my bag: clipboards, lesson plans, and a new water testing kit.

For the entire day, I watched as twenty-five young minds tested the Passaic River’s water. Using the river as a natural learning laboratory, I taught them about pollution and industrialization, urban design and remediation strategies.

That summer, through my work in environmental education, I discovered the power of place. I realized that in a changing world, places really are the best storytellers. By tracking the Passaic’s pollution levels, we toured the tales of its waters, beginning with its use by the Lenape Native Americans, to its unjust usurpation by European hegemons, to the Vietnam War, during which tons of Agent Orange were dumped recklessly.

At Bowdoin, I’ll encounter this again. I find myself doing the very thing I was teaching: investigating the rich stories behind a place. As part of my major in Earth and Oceanographic Science, I blissfully get lost on Orr’s Island, researching everything from the historical ecology to the changing geography of the Maine coastline. And I can’t wait.`,
                analysis: `Why does this essay work?
1. This author checks a few “Why us?” boxes by focusing on specifics, showing us he’s done his research, and clearly answering the prompt.
2. The author found a deep connection between one of the school’s core values and one of his own. 

I know this flies in the face of the “provide a whole bunch of specific reasons” for your essay that I mentioned in Approach #1. Instead, the author found one really good reason: Both he and Bowdoin are deeply committed to investigating place. This focus was particularly apropos for this student, as he planned to major in Environmental Science. And, as you read this essay you sense that it couldn’t have been written for another prompt.

Because he used a value as the central theme, this essay is primarily about the author. Check out that word count: the essay is 258 words long, but he doesn’t even mention the school until word 202. This works because he stays connected to the central themes, which are nature and storytelling.`
        },
        {
                id: "swarthmore-listening",
                categoryId: "supplemental",
                subcategoryId: "why_us",
                title: "Why Swarthmore: A Life of Listening",
                author: "Anonymous",
                university: "Swarthmore College",
                theme: "Media Studies & Dialogue",
                excerpt: "The human body’s greatest asset is its ears. They come pimpled, freckled, mushed, bent, rounded, and pointed...",
                content: `The human body’s greatest asset is its ears. They come pimpled, freckled, mushed, bent, rounded, and pointed. But, despite their differences, they share a single purpose: to listen.

Swarthmore is all about ears. It not only understands the importance of empathetic and open dialogue, but also the ways in which listening can be the first step towards bridging deeply entrenched ideological divides. Whether I’m learning from guest lecturers at the Center for Innovation and Leadership, engaging in dialogue at the Global Health Forum, or exploring my sexuality through the Intercultural Center, I know I’d be at a place that values collaboration, honest discourse, ethical leadership, and creativity invested in the public good. Everything at Swarthmore is about putting those cartilage appendages on the sides of your head to good use. 

As a person drawn to audio and visual storytelling, my life has been defined by listening. At Swarthmore, I would continue to foster the quality relationships I’ve created and the love I’ve spread by inviting people to share their stories on my podcasts. Majoring in Film & Media Studies or English Literature, broadcasting at WSRN, and writing for The Review is the next chapter in my life of listening. I would creatively explore how narratives have been told in the past and can be redefined digitally for a new generation of ears. Swarthmore knows that global change starts with an honest conversation. I want to be pioneering new networks of connection. I want to be starting those conversations.`,
                analysis: `Everything at Swarthmore is about putting those cartilage appendages on the sides of your head to good use. This essay successfully uses the metaphor of "ears" and "listening" to connect the author's passion for podcasting and media to Swarthmore's specific values and offerings (WSRN, The Review, Center for Innovation and Leadership).`
        },
        {
                id: "jhu-future-ariana",
                categoryId: "supplemental",
                subcategoryId: "why_us",
                title: "Johns Hopkins: Dear Future Ariana",
                author: "Ariana",
                university: "Johns Hopkins University",
                theme: "International Relations & Humanities",
                excerpt: "Dear 2016 Ariana, It’s 2026. I have just returned from the G20 summit after delivering the annual-report on demographic transition...",
                content: `Dear 2016 Ariana,

It’s 2026. I have just returned from the G20 summit after delivering the annual-report on demographic transition and population stability.

Throughout your seventeen years of life, you have been barraged with choices: Which airline seat to choose? Is the answer B or C? Is “the dress” blue/black or white/gold? But, you will soon make a choice that will allow you to harness your knowledge and apply it to reality. The choice to go to Johns Hopkins.

By now, you have lived in India, the UK, and the USA: multicultural exposure that shaped your worldview. You are confused as to what you want exactly, but deep down you strive for a synergy of ideas and fields. That can and will be found at Hopkins.

Particularly, the JHU Humanities Center will provide you with a flexible approach toward interdisciplinary study: important, as you value the need to explore before settling on a choice. You will find this at Homewood, but also globally; through study at the Sciences Po campus, Paris, which outlines the interconnectedness between areas such as law, finance, and urban policy.

In Model United Nations, you built skills in collaboration, working with students across the country to embody pluralism and reach consensus. At Hopkins, you will enhance these skills and your knowledge of international relations in Professors Moss and Hanchards’s class, Diaspora, Nation, Race, & Politics. The discussions, which range from political sociology and human rights to the fall of late nineteenth century empires, will give you greater insight into how history determines our understanding of today’s geopolitical challenges.

And although you stuck your toe in the ocean of government and politics through your internship in Senator Glazer’s office, JHU provides an immersive dive into this field through their International Studies Program, with opportunities at the Nanjing Center, China and the Nitze School in Washington D.C.

On a local level, you will be able to extend your political service when you run for JHU Student Government Association, where you will continue to represent diverse viewpoints and provide a forum for recognition and discussion.

You will also have the opportunity to continue your work with the Red Cross, giving back to the Baltimore community by joining the JHU and the Chesapeake Regional chapters. And by joining the Public Health Student Forum, you will gain access to speakers who have worked in these fields all their life, like Former Director of the Peace Corps, Dr. Jody Olsen, and Dr. Richard Benjamin, Chief Medical Officer of the Red Cross.

All your life experiences, from building community to understanding behavior in order to enact decisions, have stemmed from One. Single. Choice. Without Johns Hopkins, you would not have become an expert on global policy change, speaking at events like the G20 emporium.

Yes, the world has changed dramatically in the past 10 years. But Hopkins recognizes this fluidity, and paired with you, Ariana, will propel the importance of integrative study.

Love,
Future Ariana

PS: The dress is white/gold.`,
                analysis: `This creative essay uses a "letter to future self" format to demonstrate a 10-year vision centered on JHU. It packs in high-density research, referencing specific classes (Professors Moss and Hanchard), study abroad locations (Nanjing), and local engagement (Baltimore Red Cross). The consistent theme of "synergy of ideas" makes the case for JHU's interdisciplinary appeal.`
        },
        {
                id: "upenn-gender",
                categoryId: "supplemental",
                subcategoryId: "why_us",
                title: "Why UPenn: Gender & Social Justice",
                author: "Anonymous",
                university: "University of Pennsylvania",
                theme: "Gender Studies & Entrepreneurship",
                excerpt: "If I could pursue only one goal for the rest of my life, it would be taking measurable action towards gender equality...",
                content: `If I could pursue only one goal for the rest of my life, it would be taking measurable action towards gender equality. Since the age of six, I have observed the difference in how I am treated because of my gender—when playing sports, during mealtimes, or at social gatherings. I have tried to counter the effects of gender bias through social entrepreneurship, and now I would like to gain insight into the societal constructs that underlie these issues.

At UPenn, I hope to study Gender, Sexuality, and Women’s Studies with a concentration in Feminist Studies and Global Gender and Sexuality Studies in the College of Arts and Sciences. Through Professor Kathleen Brown’s “Gender & Society” class, I will learn how complex social identities such as race and gender impact economic exchange and demarcate opportunities available to minorities. I hope to further explore the consequences of electoral quotas and their effect on women’s mobilization transnationally with Dawn Teele in her class, “Sex and Power.” Such classes will help me ensure that I am not working for one cause at the expense of another, and will arm me with the skills necessary to analyze social, economic and political dynamics in the real world.

Last summer, I spent a month at UPenn, living in Harnwell College House and incubating my social impact startup, Straw’d, through the LaunchX program held at the Pennovation Center. At the program, MEAM Professor Jenna Shanis spoke about her work designing soda machines with Coca Cola. Presenting us with a simple task (“design a way for humans to enjoy flowers”), she showed us that the first solution is usually never the best solution, and that innovation is most effective when it is iteratively brainstormed and cross-fertilized. Material Science and Engineering Professor Vanessa Chan, inventor of the tangle-free headphones ‘Loopit,’ inspired me to take on the challenge of creating a consumer good instead of a company in the service industry. These two professors, along with others who spoke, have given me a new perspective on integrating theory into practice, critical thinking into activism.

Given my interest in building new social enterprises, I would like to join the Penn Social Entrepreneurship Movement to learn more about empowering women economically in different countries. Through events like ‘Social Impact Talk Series’ held by PennSEM, I will learn about the multi-faceted industry of social entrepreneurship and gain exposure to issues such as food innovation and food policymaking. Additionally, planning TEDxYouth@Austin events has been an integral part of my four years of high school, and I will continue this passion through TEDxPenn by finding women speakers from underrepresented industries and helping to elevate their voices.  

I’ve been an artist longer than I have been an activist. Through classes such as “Photographic Thinking- a Benjamin Franklin Seminar” and “Art, Design, and Digital Culture”, I will learn to use design as a vehicle to fight for gender equality in the future, as digital art is currently heavily influencing the way social movements develop momentum through media.

While at UPenn, I noticed that many youth from surrounding neighborhoods grow up with difficult socioeconomic circumstances, and I hope to empower women of color from these neighborhoods as I study how race and gender impact economic opportunity. I will join the Community School Student Partnerships to lead social impact and entrepreneurship workshops at the after-school programs in high schools. I've experienced firsthand how entrepreneurship training can empower individuals, and by training girls from underrepresented communities, I hope to help them solve the problems they experience. Joining CSSP would give me the opportunity to give back to the Philadelphia and Penn communities while continuing my passion for empowering young females.

The GSWS program at UPenn is a perfect fit for me. Its interdisciplinary training and intersectional approach would provide me with the knowledge, mentorship, and resources I need to continue growing as a social justice advocate and champion of equality.`,
                analysis: `This essay effectively bridges the gap between academic theory (GSWS program) and practical activism (PennSEM, CSSP). By mentioning a previous summer experience at Penn (LaunchX) and specific professors (Kathleen Brown, Dawn Teele), the author proves they are already a part of the community and know exactly how to scale their impact on campus.`
        },
        {
                id: "northwestern-policy",
                categoryId: "supplemental",
                subcategoryId: "why_us",
                title: "Why Northwestern: Environmental Policy",
                author: "Anonymous",
                university: "Northwestern University",
                theme: "Political Science & Environment",
                excerpt: "No matter the research made by scientists on climate change, if politicians don’t accept scientific evidence...",
                content: `No matter the research made by scientists on climate change, if politicians don’t accept scientific evidence and pass environmental legislation, the world will suffer greater consequences from climate change. As a political science major at Northwestern, I’ll acquire the skills necessary to pass future legislation that puts the environment and people above the interests of corporations.

I believe that being able to incorporate multiple areas of study can greatly deepen my ability to understand environmental advocacy. With Northwestern’s interdisciplinary curriculum, I’d explore how policy, law, and political philosophy intersect with the process of passing environmental legislation. By taking the “U.S. Environmental Politics” course, for example, I’ll learn how to implement effective environmental policies, both on the international and domestic scale, while also considering the economic, legal, and ethical issues involved.

Regardless of how many hours I spend in the classroom, however, I believe that my knowledge is less meaningful if I can’t apply what I’ve learned in the classroom to lead initiatives that can advocate for the environment. Through the Chicago Field Studies program, I’d be thrilled to take on civic engagement internships and explore how climate change is intertwined with poverty. I’ll also jump at the opportunity to utilize the Ginsberg Research Grant and initiate my own research with professors like Chloe Thurston, who specializes in policy research. It would be an honor to work with faculty members and conduct research on how interest groups affect environmental management compromises.

Outside of the classroom, I’m excited to join the Associated Student Government organization, where I’d work with administrators to promote Northwestern’s environmental sustainability and strive to make the Northwestern experience even better for students.

With the knowledge and experiences I gain at Northwestern, I’ll work to pass the future environmental policies that our world needs.`,
                analysis: `Why This Essay Worked:
1. Bold opening statement showing a clear career goal.
2. Mentions specific Northwestern features like the interdisciplinary curriculum and "US Environmental Politics" course.
3. References resources outside the classroom (Chicago Field Studies, Ginsberg Research Grant, Professor Chloe Thurston).
4. Connects to the larger campus community via the Associated Student Government.`
        },
        {
                id: "northwestern-biology",
                categoryId: "supplemental",
                subcategoryId: "why_us",
                title: "Why Northwestern: Collaborative Community",
                author: "Anonymous",
                university: "Northwestern University",
                theme: "Biology & Community",
                excerpt: "“What is the function of hydrophilic heads?” my AP Biology teacher asked the class...",
                content: `“What is the function of hydrophilic heads?” my AP Biology teacher asked the class.

All that could be heard was the sound of multiple classmates snoring in unison and the tapping of several students on their cell phones.

I had already answered the past 5 questions… Should I answer this one?

School is not a source of enjoyment for most of my classmates. Though the goal was to graduate, the pathway was often marred with cheating, plagiarism, and a lack of motivation to pursue something greater than the average.

At Northwestern however, no such situation would ever take place. The community of students, though from diverse backgrounds, all share the same goal to learn to their greatest potential and will do anything to share it.

In addition to the support such classmates would provide is the faculty of distinguished professors Northwestern has at its disposal. With the quarter system that allows students to take multiple classes outside their major, having such an array of top professors to choose from will guarantee that whichever path I may take will ensure a quality education. Though I plan to major in a Neuroscience-related program as a pre-medical student, I have many interests that have accumulated for years but remained untouched due to circumstances. With my professors as mentors, I would be able to conduct research in these areas, setting an invincible foundation that will increase my vitality in the medical field.  

Coming from a background such as mine to such a collaborative community would be a huge adjustment, but it is one I am excited to make. Having the opportunity to interact/work with people who are genuinely passionate about their fields is an invaluable asset that will motivate me to push harder in spite of any challenges I may face in the future.`,
                analysis: `Why This Essay Worked:
1. Strong introduction placing the reader into a story.
2. Connects high school environment to the desired collegiate environment at NU.
3. Highlights academic interests via Northwestern's faculty and the unique quarter system.
4. Shows genuine excitement about joining a collaborative, passionate community.`
        },
        {
                id: "yale-community",
                categoryId: "supplemental",
                subcategoryId: "why_us",
                title: "Why Yale: No Need to Name-Drop",
                author: "Anonymous",
                university: "Yale University",
                theme: "Community & Culture",
                excerpt: "At Yale, I would be able to immerse myself in interests I harbored but never had the opportunity to explore...",
                content: `At Yale, I would be able to immerse myself in interests I harbored but never had the opportunity to explore. With incredible resources from some of the best professors in the country, I would be able to learn directly from the best and use this advantage to further myself in my future career plans and goals. The quality of my education, though attributed to the institution, would be the most highly enriched from the students. Although from diverse backgrounds, all the students share the same thirst for knowledge and drive to make a difference. Having such classmates will push me to reach my highest potential and as a result, increase my vitality in any field of work or practice.`,
                analysis: `Why This Essay Worked:
1. Focusses on the "big picture" of the academic and campus community.
2. Demonstrates understanding of Yale's core value of diversity and student-driven learning.
3. Shows how the environment will support future professional goals without needing specific club "name-dropping."`
        },
        {
                id: "yale-science",
                categoryId: "supplemental",
                subcategoryId: "why_us",
                title: "Why Yale: Painting a Picture",
                author: "Anonymous",
                university: "Yale University",
                theme: "Science & Collaboration",
                excerpt: "No problem in this world can be solved by a single person: whole communities are what drive innovative solutions...",
                content: `No problem in this world can be solved by a single person: whole communities are what drive innovative solutions. Thus, what draws me to Yale is its research opportunities and collaborative community. Whether it’s the STARS II program, Women in Science at Yale, Yale Scientific Magazine, or peer mentoring, the prospect of extending my research experience while collaborating with my peers in Yale’s scientific community seems very fulfilling.

I find myself excited by the opportunities Yale has to join communities that can impact campus and beyond. I’m particularly intrigued by the Yale College Council, Yale Arab Students Association, Yale Refugee Project, and Women’s Leadership initiative. I’m excited by the prospect of joining the academically-driven, collaborative, and passionate community of Bulldogs at Yale.`,
                analysis: `Why This Essay Worked:
1. Uses specific offerings (STARS II, Women in Science) to show deep research.
2. Painted a full picture of the applicant's identity (woman in science, Arab background) through the list of organizations.
3. Neatly "closes the loop" by connecting the introduction's theme of collaboration to the conclusion.`
        },
        {
                id: "why-major-economics",
                categoryId: "supplemental",
                subcategoryId: "why_major",
                title: "The Logic of Choice: Why Economics",
                author: "Anonymous",
                university: "Stanford University",
                theme: "Economics & Game Theory",
                excerpt: "My fascination with economics began not with a textbook, but with a simple game of Settlers of Catan...",
                content: `My fascination with economics began not with a textbook, but with a simple game of Settlers of Catan. I watched as my friends made irrational trades, driven by emotion rather than utility. I wondered: could we predict these behaviors? Could we model the seemingly chaotic choices of individuals to improve the welfare of a society?

This spark led me to the works of Daniel Kahneman and Richard Thaler. I became obsessed with the bridge between psychology and mathematics—behavioral economics. In high school, I conducted an independent study on the 'sunk cost fallacy' among my peers, surveying hundreds of students to see how their spending habits changed when they had already invested time or money into a project. The results were startlingly consistent with theory, yet seeing it play out in my own hallways made the abstractions of the classroom feel real.

In college, I want to dive deeper into Game Theory. I am particularly interested in how strategic interaction models can be applied to international trade agreements and environmental policy. I want to understand how we can design 'nudges' that encourage sustainable choices without infringing on individual liberty. Economics, to me, is the ultimate tool for solving the world's most complex coordination problems.`,
                analysis: `This "Why Major" essay successfully traces the "spark" of intellectual curiosity from a relatable everyday experience (Settlers of Catan) to formal academic research. It demonstrates a clear progression of interest and a specific vision for how the student will use the degree in the future.`
        },
        {
                id: "why-major-bio",
                categoryId: "supplemental",
                subcategoryId: "why_major",
                title: "Molecular Architecture",
                author: "Anonymous",
                university: "Yale University",
                theme: "Molecular Biology & Research",
                excerpt: "To most people, a cell is a microscopic blob. To me, it is the most complex factory in the known universe...",
                content: `To most people, a cell is a microscopic blob. To me, it is the most complex factory in the known universe, where every protein is a specialized machine and every strand of DNA is a blueprint. My interest in Molecular Biology was born from a desire to understand the fundamental mechanics of life—to see how a string of molecules can result in the consciousness I'm using to write this sentence.

My journey started in a summer lab at the University of Washington, where I spent eight weeks pipetting clear liquids into other clear liquids. While the work was often tedious, the moment I saw the first successful fluorescent markers under the microscope, I was hooked. We were looking at the protein folding patterns associated with neurodegenerative diseases. It wasn't just science; it was detective work on a molecular scale.

I am particularly drawn to the field of synthetic biology. I want to learn how we can re-engineer biological systems to solve human problems, from carbon-scavenging bacteria to plants that can grow in nutrient-poor soil. I believe that the next century will belong to the biologists, and I want to be at the forefront of that revolution, designing the tools that will redefine what it means to be healthy and sustainable.`,
                analysis: `This essay combines a strong personal "why" with evidence of hands-on experience (the summer lab). It uses vivid imagery ("factory," "detective work") to make a technical subject feel accessible and exciting. The forward-looking conclusion shows ambition and a clear academic trajectory.`
        },
        {
                id: "why-major-engineering",
                categoryId: "supplemental",
                subcategoryId: "why_major",
                title: "The Reverse Engineer",
                author: "Anonymous",
                university: "MIT",
                theme: "Mechanical Engineering",
                excerpt: "I have always been the kid who takes things apart. My parents' old VCR, a broken toaster, even a high-end digital camera...",
                content: `I have always been the kid who takes things apart. My parents' old VCR, a broken toaster, even a high-end digital camera—nothing was safe from my screwdriver. But my goal was never destruction; it was understanding. I wanted to see the clockwork, the circuitry, the hidden logic that made the 'magic' happen.

This drive eventually led me to the FIRST Robotics competition, where I transitioned from taking things apart to putting them together. As the lead builder for Team 4096, I learned that engineering is as much about failure as it is about success. I spent three weeks debugging a pneumatic arm that refused to lift, only to realize the issue was a microscopic leak in a valve. That experience taught me the importance of precision and the 'grit' required to see a project through to completion.

I want to study Mechanical Engineering because I believe that physical objects are the most powerful medium for change. I am interested in the intersection of robotics and prosthetics—creating machines that don't just replace human labor, but enhance human ability. I want to build the next generation of assistive devices that are affordable, durable, and intuitive. For me, engineering is the art of turning 'how does this work?' into 'how can this work better?'`,
                analysis: `A classic "tinkerer" origin story that feels authentic and grounded. The author successfully bridges childhood curiosity with high-school achievement (FIRST Robotics) and future goals (prosthetics). The final sentence provides a punchy philosophy of engineering that makes the applicant's motivations clear.`
        },
        {
                id: "community-robotics",
                categoryId: "supplemental",
                subcategoryId: "community",
                title: "Beyond the Robot",
                author: "Anonymous",
                university: "Georgia Tech",
                theme: "Robotics & Mentorship",
                excerpt: "When people think of a robotics team, they think of wires, code, and greasy hands. When I think of my team, I think of family...",
                content: `When people think of a robotics team, they think of wires, code, and greasy hands. When I think of my team, I think of family. Over the last four years, Team 1285 has been my primary community—a place where my 'nerdiness' wasn't just accepted, but celebrated.

However, the most meaningful part of this community wasn't the robots we built; it was the people we reached. Last year, I spearheaded an initiative called 'Robo-Reach' to bring STEM workshops to local middle schools that lacked after-school programs. I watched as students who had never seen a programmable motor suddenly lit up with the same curiosity that drove me as a child. 

In these moments, I realized that my role in the community had shifted from student to mentor. I learned that the strength of a community isn't measured by its trophies, but by how it supports its newest members. At Georgia Tech, I hope to bring this same mentorship to the 'K-12 Outreach' programs, ensuring that the doors of innovation remain open to everyone, regardless of where they start.`,
                analysis: `This essay effectively redefines "community" from a simple group identity to an active contribution. It shows leadership and a desire to give back, which are highly valued by admissions committees. The transition from being a member to being a founder of an outreach program is a strong narrative arc.`
        },
        {
                id: "community-discord",
                categoryId: "supplemental",
                subcategoryId: "community",
                title: "The Global Server",
                author: "Anonymous",
                university: "Various",
                theme: "Online Community & Leadership",
                excerpt: "My Discord server started as a small group of friends discussing video games...",
                content: `My Discord server started as a small group of friends discussing video games. It quickly grew into a global community of over 500 members, spanning multiple time zones and interests. As the primary moderator, I learned the complexities of digital governance—balancing free speech with safety, and fostering a sense of belonging among diverse individuals.

I implemented a tiered moderation system, developed clear community guidelines, and organized weekly themed events to encourage engagement. The biggest challenge was mediating conflicts, which taught me the importance of active listening and empathetic communication. This experience showed me that community isn't limited by physical proximity; it's built on shared values and mutual respect.`,
                analysis: `This essay effectively showcases leadership and community-building skills in a modern context. It highlights problem-solving, communication, and the ability to manage a diverse group, all valuable traits for college applicants.`
        },
        {
                id: "georgia-tech-robotics",
                categoryId: "supplemental",
                subcategoryId: "why_us",
                title: "Why Georgia Tech: Mechanics & Robotics",
                author: "Anonymous",
                university: "Georgia Institute of Technology",
                theme: "Robotics & Innovation",
                excerpt: "The first thing that caught my eye about Georgia Tech was its commitment to 'Creating the Next'...",
                content: `The first thing that caught my eye about Georgia Tech was its commitment to 'Creating the Next.' As an aspiring mechanical engineer, I am drawn to the Woodruff School because of its emphasis on hands-on innovation and its world-class robotics facilities. I look forward to joining the RoboJackets and contributing to the BattleBots team, where I can apply my experience in CAD and mechanical design to build competitive, high-performance robots.

In the classroom, I am particularly interested in the 'Robotics and Autonomous Systems' concentration. I hope to take 'Introduction to Mechatronics' with Professor Jonathan Rogers and learn how to integrate sensors and actuators into complex mechanical systems. Beyond robotics, I am excited about the 'Invention Studio'—a student-run maker space that embodies the DIY spirit I’ve cultivated in my own garage workshop. Georgia Tech isn't just a place to study engineering; it's a place to build the future.`,
                analysis: `This essay effectively highlights Georgia Tech's "maker culture." By mentioning the RoboJackets, the Invention Studio, and specific faculty like Professor Jonathan Rogers, the author proves they understand the school's unique "hands-on" identity and are ready to contribute from day one.`
        },
        {
                id: "uchicago-interdisciplinary",
                categoryId: "supplemental",
                subcategoryId: "why_us",
                title: "Why UChicago: The Life of the Mind",
                author: "Anonymous",
                university: "University of Chicago",
                theme: "Intellectual Curiosity & Core Curriculum",
                excerpt: "UChicago is a place where 'where fun comes to die' is a badge of honor, and that’s exactly why I want to be there...",
                content: `UChicago is a place where 'where fun comes to die' is a badge of honor, and that’s exactly why I want to be there. I am drawn to the 'Core Curriculum' because it refuses to let students stay within the comfort zone of their major. As someone who loves both Astrophysics and Philosophy, I am excited to engage in 'Humean' debates in my 'Humanities' sequence while simultaneously researching dark matter at the Kavli Institute for Cosmological Physics.

I am particularly interested in the 'Big Problems' curriculum, which tackles complex global issues from multiple perspectives. I hope to participate in the 'Scav Hunt'—not just for the tradition, but for the sheer intellectual audacity it requires. At UChicago, I won't just be learning a trade; I'll be participating in a rigorous, centuries-old conversation about the nature of reality.`,
                analysis: `This essay captures the specific "intellectual intensity" of UChicago. It embraces the school's reputation for being "quirky" and "rigorous," mentioning the Core Curriculum and the famous Scav Hunt to show deep cultural fit.`
        },
        {
                id: "mit-innovation",
                categoryId: "supplemental",
                subcategoryId: "why_us",
                title: "Why MIT: Mens et Manus",
                author: "Anonymous",
                university: "Massachusetts Institute of Technology",
                theme: "Engineering & Social Impact",
                excerpt: "MIT’s motto, 'Mens et Manus' (Mind and Hand), perfectly describes my approach to learning...",
                content: `MIT’s motto, 'Mens et Manus' (Mind and Hand), perfectly describes my approach to learning. I have always believed that the most profound insights come when theory is tested against reality. I am drawn to Course 2 (Mechanical Engineering) because of its focus on using technology to solve 'impossible' problems. I look forward to participating in the 'uPOP' program to bridge the gap between my academic studies and real-world professional environments.

I am particularly excited about the 'D-Lab,' where I hope to work on low-cost technologies for international development. Having spent my summers volunteering in rural areas, I want to use my engineering skills to design sustainable water filtration systems. At MIT, I know I will find a community of 'nerds' who aren't just interested in how things work, but in how they can work better for everyone.`,
                analysis: `This essay connects MIT's motto to the applicant's personal history. By mentioning Course 2, uPOP, and the D-Lab, it shows a clear path of how the student will utilize MIT's specific resources to achieve their goal of social impact through engineering.`
        },
        {
                id: "usc-cinematic",
                categoryId: "supplemental",
                subcategoryId: "why_us",
                title: "Why USC: The Trojan Family",
                author: "Anonymous",
                university: "University of Southern California",
                theme: "Film & Media Production",
                excerpt: "To me, USC represents the perfect blend of a world-class film education and a vibrant, interdisciplinary university life...",
                content: `To me, USC represents the perfect blend of a world-class film education and a vibrant, interdisciplinary university life. I am drawn to the School of Cinematic Arts for its unparalleled resources and its focus on collaborative storytelling. I look forward to working in the 'Robert Zemeckis Center for Digital Arts' and learning from industry veterans who have shaped the history of cinema.

However, what truly sets USC apart for me is the 'Trojan Family.' I want to be part of a community that supports its members across every discipline—from business to the arts. I hope to participate in the 'USC Comedy Hub' and explore the intersection of digital media and traditional storytelling. At USC, I know I will have the freedom to experiment, the resources to create, and a family to support me for a lifetime.`,
                analysis: `This essay hits the key USC notes: the School of Cinematic Arts and the "Trojan Family." It demonstrates research by naming the Zemeckis Center and the Comedy Hub, showing that the student is looking for both specialized training and a broad, connected community.`
        },
        {
                id: "why-major-economics",
                categoryId: "supplemental",
                subcategoryId: "why_us",
                title: "Why Economics: The Global Language",
                author: "Anonymous",
                university: "Various",
                theme: "Economics & Data Science",
                excerpt: "Economics is more than just graphs and numbers; it's the study of human behavior under pressure...",
                content: `Economics is more than just graphs and numbers; it's the study of human behavior under pressure. I first became fascinated by the subject during the 2008 financial crisis, watching how global markets could be swayed by psychological shifts. At [University], I want to explore the intersection of behavioral economics and public policy.

I am particularly interested in the work of Professor [Name] regarding [Specific Topic]. I look forward to using the [Lab Name] to analyze real-world datasets and develop models that can predict market volatility. My goal is to use economic theory to create more equitable social polices, ensuring that growth is not just measured in GDP, but in human well-being.`,
                analysis: `A strong "Why Major" example. It identifies a "spark" (the 2008 crisis), defines the field in a personal way (human behavior), and points to a specific future goal (equitable policy). It's a template that can be easily customized for any university.`
        },
        {
                id: "extracurricular-swim",
                categoryId: "supplemental",
                subcategoryId: "why_us",
                title: "The Silent Discipline of the Pool",
                author: "Anonymous",
                university: "Various",
                theme: "Swimming & Leadership",
                excerpt: "Four o'clock in the morning is a lonely time. The world is silent, except for the rhythmic splash of my arms...",
                content: `Four o'clock in the morning is a lonely time. The world is silent, except for the rhythmic splash of my arms hitting the water and the internal tally of my laps. Swimming has been my greatest teacher, instilling in me a discipline that transcends the pool. It’s not just about the milliseconds shaved off a personal best; it’s about the thousands of hours spent in pursuit of them.

As captain, I've tried to translate this discipline for my team. I realized that my most important role wasn't swimming the fastest leg of the relay, but setting the temperature for our practice—maintaining a culture where we hold each other accountable without saying a word. This silent discipline is what I carry with me out of the water and into my academic life.`,
                analysis: `A strong "Extracurricular Elaboration" that focuses on internal qualities (discipline, grit) rather than just external achievements. It shows a high level of self-awareness and leadership through action.`
        },
        {
                id: "extracurricular-chess",
                categoryId: "supplemental",
                subcategoryId: "why_us",
                title: "The Grandmaster of Inclusion",
                author: "Anonymous",
                university: "UChicago",
                theme: "Chess & Community Building",
                excerpt: "When I took over the Chess Club, it was three guys in a basement room. My goal was to move it to the cafeteria...",
                content: `When I took over the Chess Club, it was three guys in a basement room. My goal was to move it to the cafeteria. I realized that the greatest barrier to chess wasn't its complexity, but its reputation for being 'exclusive.'

I spent my junior year rebranding the club as a social space. I introduced 'Speed Chess Fridays' with loud music and snacks, and started a mentorship program where experienced players taught beginners. By the end of the year, we had forty members, nearly half of whom were girls—a first for our school.

Through chess, I learned that leadership is about lowering the barrier to entry. It's about recognizing that every system, whether a game or a community, is stronger when it's accessible. I'm proud that I left behind a club that doesn't just play better chess, but is a more representative slice of our school.`,
                analysis: `This essay effectively demonstrates leadership and impact. The author focuses on a specific problem (exclusivity) and provides a concrete solution (rebranding and mentorship). It shows a proactive and inclusive mindset.`
        },
        {
                id: "diversity-culture",
                categoryId: "supplemental",
                subcategoryId: "diversity",
                title: "The Third Culture Child",
                author: "Anonymous",
                university: "Princeton University",
                theme: "Multicultural Identity",
                excerpt: "I am a mosaic of three languages and four cities. I have spent my life translating not just words, but worlds...",
                content: `I am a mosaic of three languages and four cities. Born in Seoul, raised in London, and now living in New York, I have spent my life translating not just words, but worlds. This 'third culture' upbringing has been my greatest challenge and my greatest gift.

In Seoul, I learned the importance of collective harmony; in London, the value of tradition; and in New York, the power of individual ambition. I often found myself in the 'in-between'—not quite Korean enough for my grandparents, but too Korean for my peers at school. 

However, this lack of a singular root allowed me to develop a unique perspective as a bridge-builder. I can navigate different cultural codes and find common ground where others see only difference. At Princeton, I hope to bring this global perspective to the 'International Relations Council,' helping to foster a campus community that doesn't just tolerate diversity, but actively weaves it into its intellectual fabric.`,
                analysis: `A poignant "Diversity" essay that treats identity as a skill (bridge-building) rather than just a background. It's well-structured and connects personal experience to a specific collegiate contribution.`
        },
        {
                id: "diversity-first-gen",
                categoryId: "supplemental",
                subcategoryId: "diversity",
                title: "The First of Many",
                author: "Anonymous",
                university: "Brown University",
                theme: "First-Generation Resilience",
                excerpt: "My parents' hands are rough from decades of manual labor. My hands are stained with ink. We are building the same bridge...",
                content: `My parents' hands are rough from decades of manual labor. My hands are stained with ink. We are building the same bridge, but we are standing on opposite sides. As a first-generation college student, I carry the hopes of an entire family in my backpack.

Growing up, I didn't have a roadmap for the college process. I spent my nights deciphering FAFSA forms while my mother worked the late shift at the hospital. These experiences taught me a resourcefulness that can't be found in a textbook. I learned to be my own advocate, to seek out mentors, and to turn 'I don't know how' into 'I will find out how.'

My background isn't a deficit; it's my source of strength. It gives me a 'groundedness' and a sense of purpose that drives my interest in Social Innovation. At Brown, I want to use my voice to empower other first-gen students, ensuring that we don't just get through the door, but we thrive once we're inside.`,
                analysis: `This essay uses a beautiful opening metaphor to discuss the first-gen experience. It avoids self-pity and instead focuses on the "resourcefulness" and "purpose" gained from the author's background. It's an inspiring example of resilience.`
        },
        {
                id: "short-answer-book",
                categoryId: "supplemental",
                subcategoryId: "short_answer",
                title: "A 150-Word Snapshot: The Alchemist",
                author: "Anonymous",
                university: "Various",
                theme: "Literature & Perspective",
                excerpt: "If my life had a soundtrack, it would be the silence between the pages of Paulo Coelho’s 'The Alchemist'...",
                content: `If my life had a soundtrack, it would be the silence between the pages of Paulo Coelho’s 'The Alchemist.' I first read it in a dusty library in my hometown, and it completely reframed my understanding of 'failure.' Santiago’s journey taught me that the treasure we seek is rarely the goal; it is the transformation that occurs during the search. 

This book gave me the courage to pursue my 'Personal Legend'—even when it meant leaving the comfort of my small town for a specialized boarding school. It serves as a constant reminder that the universe 'conspires' in favor of those who are brave enough to follow their heart. In 150 pages, it gave me a language for my own ambition.`,
                analysis: `A concise and punchy short answer. It identifies a book, explains its personal impact, and shows how that impact translated into a real-world decision. It's efficient and reveals a lot about the author's character.`
        },
        {
                id: "short-answer-gift",
                categoryId: "supplemental",
                subcategoryId: "short_answer",
                title: "The Meaningful Lens",
                author: "Anonymous",
                university: "Various",
                theme: "Photography & Connection",
                excerpt: "The most meaningful gift I've ever received was a 1970s Polaroid camera from my grandfather...",
                content: `The most meaningful gift I've ever received was a 1970s Polaroid camera from my grandfather. In an age of infinite digital storage, the Polaroid taught me the value of the 'singular.' You only get one chance to capture the moment, and you have to wait for it to develop—a lesson in patience I desperately needed. 

It changed the way I see the world. I no longer look for the 'perfect' shot; I look for the 'true' one. It has become my favorite way to connect with people, giving them a physical memory of a shared moment. That old camera isn't just a machine; it's a tool for being present.`,
                analysis: `Another excellent short answer. It uses a specific object to discuss broader personality traits like patience and being present. It reveals a creative hobby and a thoughtful approach to life.`
        },
        {
                id: "top-choice-optional",
                categoryId: "supplemental",
                subcategoryId: "top_choice",
                title: "Why [School]: The 100-Word Pitch",
                author: "Anonymous",
                university: "Georgetown University",
                theme: "International Politics",
                excerpt: "Georgetown is uniquely positioned at the intersection of theory and practice...",
                content: `Georgetown is uniquely positioned at the intersection of theory and practice. I am drawn to the 'Walsh School of Foreign Service' for its focus on ethical global leadership and its proximity to the heart of international diplomacy. I look forward to participating in the 'Pruitt International Seminar' and exploring the complexities of Eurasian security with Professor Charles Kupchan. Beyond the classroom, I hope to join the 'IRC' and contribute to the 'Model UN' team, bringing my experience from the West Coast circuit to the Hilltop. Georgetown isn't just a school; it's a global stage.`,
                analysis: `A perfect example of a "Why Us" short answer. It names a specific school within the university, a specific seminar, a specific professor, and a specific club. It's dense, researched, and highly effective.`
        },
        {
                id: "additional-info-example",
                categoryId: "supplemental",
                subcategoryId: "top_choice",
                title: "The 'Additional Info' Usage",
                author: "Anonymous",
                university: "Various",
                theme: "Context & Clarity",
                excerpt: "In my sophomore year, my grades in Calculus suffered due to a personal family emergency...",
                content: `In my sophomore year, my grades in Calculus suffered due to a personal family emergency that required me to take on a full-time caregiving role for my younger sister. While my focus remained on my education, the sudden shift in responsibilities impacted my ability to perform at my usual level. Throughout this period, I maintained communication with my teachers and eventually caught up on all missed work, but the initial dip is reflected in my transcript. I have since retaken similar advanced coursework in my junior year, earning an 'A,' which I believe better reflects my academic ability and resilience.`,
                analysis: `This is a textbook example of how to use the 'Additional Information' section. It provides context for a specific dip in grades without being defensive. It names the cause, explains the effort made to rectify it, and points to more recent success as a more accurate indicator of potential.`
        },
        {
                id: "why-major-gender-studies",
                categoryId: "supplemental",
                subcategoryId: "why_major",
                title: "The Urgency of Equality: Gender & Sexuality Studies",
                author: "Anonymous",
                university: "Various",
                theme: "Reproductive Rights & Public Policy",
                excerpt: "My interest in Gender and Sexuality Studies was sparked in my eighth grade Civics class...",
                content: `My interest in Gender and Sexuality Studies was sparked in my eighth grade Civics class when we studied topics pertaining to sexual equality. I went into the class knowing I believed women had a right to make choices for their own bodies and that view remained the same, but I discovered the complexity of abortion debates. I challenged myself by thinking about the disparity between actual and potential personhood and the moral rights of unconscious lives. If pregnancy had the same consequences for men as it does women, how might the debate be different? Would this debate even exist? 

A year later, I shadowed an OB/GYN at a nearby hospital. On my first shift, I watched an incarcerated woman receive a post-partum exam after giving birth in her cell toilet with just Advil, and the issues discussed in Civics suddenly became urgent and real.

My school projects have often focused on reproductive rights. I’ve spent numerous hours delving into summaries of Supreme Court cases on abortion and contraception, and am even known as the “Tampon Fairy” at school because I frequently restock the school bathrooms with tampons and condoms.  

I’m interested in exploring how Gender and Sexuality Studies connect to Public Health and Reproductive Biology, as well as Public Policy and Law. The interdisciplinary nature of this major will allow me to investigate many other areas of study and create a more nuanced understanding of how this particular field interacts with our world and society.`,
                analysis: `This essay effectively bridges the gap between academic theory (Civics class) and real-world urgency (OB/GYN shadowing). The "Tampon Fairy" anecdote adds a touch of personality and proactive leadership, showing that the student doesn't just study problems—they take action. The conclusion clearly outlines an interdisciplinary path, signaling a sophisticated understanding of the major.`
        },
        {
                id: "why-major-neuroscience",
                categoryId: "supplemental",
                subcategoryId: "why_major",
                title: "Mapping the Stars: Neuroscience & Pediatric Care",
                author: "Anonymous",
                university: "Various",
                theme: "Medical Resilience & Global Health",
                excerpt: "Imagine all the stars in the universe. The brain has a thousand times the number of synapses...",
                content: `Imagine all the stars in the universe. The brain has a thousand times the number of synapses, making neurological errors a near certainty. I learned this fact firsthand as a 14 year-old, when I suffered from sleepless nights because of an uncomfortable, indescribable feeling in my leg. It took months of appointments and tests to be told it was a condition called cortical dysplasia. Even after the diagnosis, there is no cure.

I am lucky. My condition does not severely affect my quality of life. However, I know this is not the case for everyone. After this experience, I took AP Biology and attended a neuroscience program, which reinforced the subject as my future calling. One of the most impactful lectures discussed the plight of healthcare in developing nations. Newborns with extreme neurological deficits are common, but finding treatments is not. Without prenatal care, this is becoming a growing epidemic, leaving millions of children helpless.

With a degree in neuroscience, I will gain a strong understanding of neural tube development and neuronal migration in infants. I will then become a neurologist, specializing in pediatric care. I hope to work for humanitarian organizations, such as Doctors Without Borders, in Africa, where HIV and polio are rampant, as are numerous other diseases. 

Imagine the stars once more. From across the world, I will look at the same stars in the future, as I help children secure the ability to not only look at the stars, but do much more.`,
                analysis: `The "Stars" metaphor provides a beautiful and consistent frame for the essay. By connecting a personal medical challenge (cortical dysplasia) to a broader global mission (pediatric care in developing nations), the author demonstrates both technical interest and profound empathy. The mention of specific developmental processes like "neural tube development" adds academic weight to the personal narrative.`
        },
        {
                id: "why-major-literary-arts",
                categoryId: "supplemental",
                subcategoryId: "why_major",
                title: "The Narrative Thread: Literary Arts & Modern Media",
                author: "Anonymous",
                university: "Brown University",
                theme: "Storytelling & Digital Innovation",
                excerpt: "My whole life, storytelling has shaped me. From London to New York, narratives have been my anchor...",
                content: `My whole life, storytelling has shaped me. When I lived in London, my parents would read me The Lion King every night until I’d memorized the whole book. In elementary school, I would curl up in my bed, warm lamplight making my room golden, listening to my dad bring to life classics like Wilderness Champion and Tom Sawyer. Later, I found audio storytelling, laughing hysterically at Wait Wait Don’t Tell Me on the car ride to school and connecting to a radio network of humanity through This American Life. It wasn’t long before I got hooked on visual narratives, mesmerized by the cinematic intensity of Whiplash and the whimsical world of Moonrise Kingdom, alternate realities I could explore as if they were my own. By high school, I was creating my own array of stories through satirical school newspaper articles, analysis of mise-en-scene in film class, podcasting, and my own locally-broadcasted radio series.

A concentration in the Literary Arts or Modern Culture and Media is the next step in my life of storytelling. The dynamic world of connection and vulnerability a well-told story can create is what continues to fascinate me. At Brown, I would explore how engaging narratives have been told in the past and can be innovated in the future through new digital platforms. Whether researching radio’s historical impact on public opinion during World War II or the Vietnam War, developing screenplays, producing my own documentary or learning from Writers-In-Residence, I hope to pioneer networks of connection.`,
                analysis: `This essay is a masterclass in tracing a "theme." It moves chronologically through the applicant's life, showing how their engagement with stories evolved from passive listening to active creation. By mentioning specific influences (Whiplash, This American Life) and specific collegiate goals (radio's historical impact), the author proves they have a clear vision for their academic future.`
        },
        {
                id: "why-major-yale-interdisciplinary",
                categoryId: "supplemental",
                subcategoryId: "why_major",
                title: "Yale: The Intersection of Systems",
                author: "Anonymous",
                university: "Yale University",
                theme: "Interdisciplinary Exploration",
                excerpt: "Having attended college Physics classes every Saturday for a year, I’ve embraced the wisdom...",
                content: `Having attended college Physics classes every Saturday for a year, I’ve embraced the wisdom from centuries-old mathematics and the vast potential of computers, a realization I can honor by pursuing Computer Science and Mathematics. Much of my interest in AI lies in its basis in the human brain, which I can pursue in a Psychology concentration. And Electrical Engineering allows me to connect the virtual world with the physical, as I currently do in robotics. Yale will fuel my interdisciplinary interests that stem from my curiosity about connections between the materials and systems in the world around me.`,
                analysis: `A remarkably dense and effective short-form "Why Major" response. In under 100 words, the applicant connects five different disciplines (Physics, Math, CS, Psych, and EE) into a cohesive intellectual identity. It shows incredible breadth while maintaining focus on the central theme of "connections" and "systems."`
        },
        {
                id: "why-major-ut-austin-meche",
                categoryId: "supplemental",
                subcategoryId: "why_major",
                title: "Mechanical Engineering: The 'When' of Physics",
                author: "Anonymous",
                university: "UT Austin",
                theme: "Mechanical Engineering & Aerospace",
                excerpt: "Some of you may wonder ‘When will I ever use derivatives in real life?’ Welcome to when...",
                content: `Some of you may wonder ‘When will I ever use derivatives in real life?’ Welcome to when.” My physics teacher, Mr. Welsh, described engineering as the “when” math and physics were applied to real problems. That is what is so attractive about engineering; it gives me the ability to apply intriguing concepts to fascinating projects. I love how engineering combines creative freedom with mathematical certainty to create projects that can impact and change the world.

During the Chain Reaction Contraption competition, a local competition, my team and I created a Rube Goldberg machine to complete a certain task. I found a love for the hands-on, creative portion of mechanical engineering and design. Other engineering activities also provided important experiences that contributed to my desire to pursue engineering. In my engineering design class, I enjoyed using computer programs like Solidworks and AutoCAD to create designs and visualizations of ideas. In FTC Robotics, I discovered that in addition to building the robot, I also loved the programming aspect behind mechanical design.

Reflecting on these experiences with engineering, particularly mechanical engineering, I am certain that engineering is the best path for me. I hope to apply my Mechanical Engineering degree to the Aerospace field. My dad is a pilot, so I have grown up hearing about and being around airplanes. As a child, I watched war plane documentaries with my dad and have had a passion for Aeronautics since then.`,
                analysis: `This essay effectively utilizes a personal story to ground the academic interest. By starting with a specific quote from a teacher and following up with concrete extracurricular examples (Rube Goldberg, Solidworks, FTC Robotics), the author makes their passion for Mechanical Engineering feel earned rather than just stated. The connection to family history (pilot father) adds a nice layer of sincerity to the future goal of Aerospace.`
        },
        {
                id: "why-major-usc-english",
                categoryId: "supplemental",
                subcategoryId: "why_major",
                title: "English: The Romanticism of Law",
                author: "Anonymous",
                university: "University of Southern California",
                theme: "English & Pre-Law",
                excerpt: "The perks of being an English major is that you have a lot of opportunities...",
                content: `The perks of being an English major is that you have a lot of opportunities, which I fully plan on partaking in during my time at USC. First and foremost, I hope to form close connections with my professors and to take advantage of the world-class education I’d be receiving. There is also a study abroad program specifically entwined with English that I hope to be able to participate in during my time at USC. I intend to participate and eventually help with the events that USC’s English department puts on as well.

As a sophomore, I hope to be a research assistant to a professor, hopefully someone who specializes in Romanticism or the niche field of ‘Law and Literature.’ I plan on starting research to write my own thesis during my junior year and hope to publish by my senior year. I plan on being a research assistant first because it would give me insight on the mechanics of research in the humanities and would help me formulate some ideas for my thesis early on. Since I am on the pre-law track, I hope to take advantage of USC’s resources by starting an internship.

While I have yet to declare a minor, I would like to capitalize on my love for languages by minoring in a language, and since Los Angeles and the campus of USC itself is a multicultural hub, I could immerse myself into the cultural aspects that come with learning a “new tongue.”`,
                analysis: `This essay works because it focuses on specific resources at USC. By mentioning the 'Law and Literature' niche and a desire to be a research assistant in Romanticism, the student shows they have a high degree of familiarity with the department. The inclusion of a year-by-year plan demonstrates serious intent and proactive planning, which admissions officers value.`
        },
        {
                id: "why-major-cornell-econ",
                categoryId: "supplemental",
                subcategoryId: "why_major",
                title: "Economics: From Sneakers to Supreme Court",
                author: "Anonymous",
                university: "Cornell University",
                theme: "Economics & Public Policy",
                excerpt: "When 6:35 AM alarm rings, I find myself considering the Law of Diminishing Marginal Utility...",
                content: `When 6:35 AM alarm rings, I find myself considering the Law of Diminishing Marginal Utility–if I hit the snooze button, will my eight minutes of fragmented slumber garner more utility than a fresh-brewed cup of coffee? The trend continues throughout the day: with the release of the newest Yeezys, I contemplate bounded rationality. Though the sneakers scarcely justify the price tag of $550, the rapidly-depleting supply almost overwhelms my rational decision-making capabilities: textbook behavioral economics. As soon as I realized that my daily decisions could be explained by economics, I was determined to learn more. 

To many, the subject conjures images of stockbrokers painstakingly laboring over Excel spreadsheets; it’s easy to forget it governs our everyday lives. Half a century ago, the creation of the unassuming mortgage-backed security set the stage for the global 2008 Recession. Simultaneously, the power of economics can be awe-inspiring: Muhammad Yunus’ work with microfinance pioneered new ways to address global poverty. Studying AP Economics, participating in countless rounds of debate both in and outside the United States, self-studying courses like Professor Chetty’s Using Big Data to Solve Economic and Social Problems, and managing the budget of our schools debate team taught me that market principles govern our world; through my education, I hope to learn how to harness them for good.

After a summer working for Congressman DeSaulnier, I realized that economics and politics are intertwined. One of my most memorable projects was preparing a brief on H.R. 4674 (the College Affordability Act)–for two weeks, I scrutinized the social, political, and economic effects of the legislation, and concluded with a half-hour presentation on my findings to the Congressman. In the process, I realized that even seemingly minor pieces of legislation affect all of society; by helping disenfranchised communities gain access to education, the bill addresses cyclical poverty at the root. When the Congressman announced he would become a co-author, it was a personal victory–it cemented my desire to intertwine my passion in economics with our political process, and learn how to craft innovative legislation designed to benefit millions.

The College of Arts and Sciences at Cornell is the ideal environment for me to pursue those passions. As an aspiring Economics major, I’m incredibly excited to learn from world-renowned economists like Professor Basu. Beyond fascinating courses like Game Theory and Strategic Economics, which synthesize economics, business, politics, and diplomacy, it would be a privilege just to attend his office hours and learn from his experience as former Chief Economist at the World Bank and President of the International Economic Association. In addition to my classes, I’d love to get involved in the Hatsfield Undergraduate Research program and further my understanding of how economics can be applied. Papers like Professor Battaglini’s “The Political Economy of Weak Treaties” are fascinating to read, and it would be a phenomenal experience to receive mentorship from veterans in the field while aiding them in their work. 

I’d love to minor in Public Policy, which seems almost tailor-made for my own career goals; the synthesis of an unparalleled education in the fundamentals of economics with courses designed to help students craft tangible policy would literally be a dream come true. Programs like Cornell in Washington promise the opportunity to get hands-on experience from Capitol Hill itself. I’d be more than happy to use my education in a Congressional Committee and get an insider perspective on the steps that go into developing, amending, and passing legislation.

The College of Arts and Sciences combines that with a robust undergraduate community, which offers unique opportunities to collaborate with a large student body and start developing a professional network–whether I’m catching a game of ice hockey or participating in Dragon Day, I know there’ll never be a dull moment. All in all, Cornell promises four truly life-changing years–I can’t wait to become a member of the Big Red community.`,
                analysis: `This is an exceptionally detailed essay that merges "Why Major" with "Why This College." The student demonstrates profound research into Cornell’s specific offerings (Professor Basu, Hatsfield program, Cornell in Washington) and connects them to a strong academic background (debate, Congressional internship). The opening hook using Yeezys and the law of diminishing utility is clever and humanizes an otherwise very academic applicant.`
        },
        {
                id: "why-major-gt-econ-shadow",
                categoryId: "supplemental",
                subcategoryId: "why_major",
                title: "Economics: The Diamond Paradox",
                author: "Anonymous",
                university: "Georgia Institute of Technology",
                theme: "Economics & Behavioral Science",
                excerpt: "March 29, 2019. 11 AM EST. GT Shadow Day. I remember it all so clearly...",
                content: `March 29, 2019. 11 AM EST. GT Shadow Day. I remember it all so clearly: Descending the red-brick steps of the Old Civil Engineering Building. My friend and I, chatting up a storm, our minds blown by our newfound perspectives. 

We had just walked out of ECON-4060: Money & Capital Markets, taught by Dr. Belton. To say that it changed my life would be no exaggeration; within an hour, Dr. Belton had upended my perception of society and defined my future aspirations. 

We had been asked to consider a popular commodity, diamonds. Hardly rare, fast-decaying, and intrinsically worthless. So why do we buy them? Dr. Belton had then illuminated the factors in our economic behavior that cause us to gift a ring in marriage rather than something with real value, say a treasury bond. These realizations were enough to rock me back on my heels, for I had never before noticed the large degree to which our everyday economic decision-making is irrational.

Craving more than that one splendid hour, I knew where and what I wanted to study for the next four years. I saw myself strolling through Bobby Dodd Way, bumping into old friends as I made my way to Midtown Atlanta. Then, I imagined myself exploring the realm of economics, probing questions ranging from price formation to income disparity. I saw myself at a place that felt familiar enough to call “home,” learning in a way that felt genuine enough to call “discovery.”

Educating myself on the mechanics of economics is just a glimpse of my great desires. Through the senior research project, I seek the one-on-one guidance of faculty in yielding a publishable journal paper. Someday, with the support of the program’s alumni network, I plan to pursue career and internship opportunities in the great company headquarters of Atlanta.`,
                analysis: `This essay uses a specific date and time to create an immediate, immersive opening. By recounting a real experience at a Georgia Tech Shadow Day and a specific lecture by Dr. Belton, the student makes an undeniable case for fit. It moves beyond "liking economics" to "liking economics at Georgia Tech specifically."`
        },
        {
                id: "why-major-pomona-gender",
                categoryId: "supplemental",
                subcategoryId: "why_major",
                title: "Gender Studies: The Lens of Activism",
                author: "Anonymous",
                university: "Pomona College",
                theme: "Gender Studies & International Advocacy",
                excerpt: "I’m a cis-gender gay man. My identity has become a primary lens through which I view the world...",
                content: `I’m a cis-gender gay man. I came out to my family during my sophomore year and to my entire school in an assembly my junior year. 

My queer identity has inspired my involvement at Tony’s Place, my research on LGBTQ+ youth experiencing homelessness, and my involvement in changing my school’s LGBTQ+ policies. Being gay has become a primary lens through which I view the world. 

The Gender & Women’s Studies Program would provide me with a critical lens to further understand my own experiences and ways I can become a better activist. 

The LGBTQ+ community is distinct from other marginalized groups because it is an umbrella of different experiences, and it takes a high level of literacy to understand these differences. The Gender & Women’s Studies Program’s emphasis on including diverse perspectives in the curriculum is crucial in my understanding of other perspectives and ways I can support others. 

For my Modern Middle East final, I wrote a forty-five page paper on LGBTQ+ movements in Middle Eastern countries. Writing this paper made me think about LGBTQ+ rights from an international perspective. Pomona’s Decolonizing Gender and Sexuality in Asian/America can advance my understanding of the cultural implications of Western colonization. In doing so, I’ll discover ways the United States can assist an LGBTQ+ social movement in other nations without imposing an imperialist definition of pride.

While researching alongside a University of Houston professor, I had to consider the relationship between disabilities and LGBTQ+ homeless youth’s mental health outcomes. Taking The Disability Studies: Foundations, Intersections, & Future class will help me better empathize with the different communities represented in my future research endeavors. 

By linking queer theory to disciplines such as economics, media studies, and politics, The Gender & Women’s Studies Program will prepare me for a lifetime of activism.`,
                analysis: `This essay connects personal identity directly to academic pursuits. By referencing specific Pomona courses like 'Decolonizing Gender and Sexuality' and 'Disability Studies,' the student proves they have a sophisticated plan for their studies. The transition from local activism to international perspective (the Middle East research paper) shows great intellectual growth.`
        },
        {
                id: "why-major-upenn-nursing",
                categoryId: "supplemental",
                subcategoryId: "why_major",
                title: "Nursing: The 5 C's of Caring",
                author: "Anonymous",
                university: "University of Pennsylvania",
                theme: "Nursing & Healthcare Ethics",
                excerpt: "Sister Simone Roach said, ‘caring is the human mode of being.’ I am inspired by her Five C’s...",
                content: `Sister Simone Roach, a theorist of nursing ethics, said, “caring is the human mode of being.” I have long been inspired by Sister Roach’s Five C’s of Caring: commitment, conscience, competence, compassion, and confidence. Penn both embraces and fosters these values through a rigorous, interdisciplinary curriculum and unmatched access to service and volunteer opportunities.
 
COMMITMENT. Reading through the activities that Penn Quakers devote their time to (in addition to academics!) felt like drinking from a firehose in the best possible way. As a prospective nursing student with interests outside of my major, I value this level of flexibility. I plan to leverage Penn’s liberal arts curriculum to gain an in-depth understanding of the challenges LGBT people face, especially regarding healthcare access. Through courses like “Interactional Processes with LGBT Individuals” and volunteering at the Mazzoni Center for outreach, I hope to learn how to better support the Penn LGBT community as well as my family and friends, including my cousin, who came out as trans last year.
 
CONSCIENCE. As one of the first people in my family to attend a four-year university, I wanted a school that promoted a sense of moral responsibility among its students. At Penn, professors challenge their students to question and recreate their own set of morals by sparking thought- provoking, open-minded discussions. I can imagine myself advocating for universal healthcare in courses such as “Health Care Reform & Future of American Health System” and debating its merits with my peers. Studying in an environment where students confidently voice their opinions – conservative or liberal – will push me to question and strengthen my value system.
 
COMPETENCE. Two aspects that drew my attention to Penn’s BSN program were its high-quality research opportunities and hands-on nursing projects. Through its Office of Nursing Research, Penn connects students to faculty members who share similar research interests. As I volunteered at a nursing home in high school, I hope to work with Dr. Carthon to improve the quality of care for senior citizens. Seniors, especially minorities, face serious barriers to healthcare that I want to resolve. Additionally, Penn’s unique use of simulations to bridge the gap between classroom learning and real-world application impressed me. Using computerized manikins that mimic human responses, classes in Penn’s nursing program allow students to apply their emergency medical skills in a mass casualty simulation and monitor their actions afterward through a video system. Participating in this activity will help me identify my strengths and areas for improvement regarding crisis management and medical care in a controlled yet realistic setting. Research opportunities and simulations will develop my skills even before I interact with patients.
 
COMPASSION. I value giving back through community service, and I have a particular interest in Penn’s Community Champions and Nursing Students For Sexual & Reproductive Health (NSRH). As a four-year volunteer health educator, I hope to continue this work as a Community Champions member. I am excited to collaborate with medical students to teach fourth and fifth graders in the city about cardiology or lead a chair dance class for the elders at the LIFE Center. Furthermore, as a feminist who firmly believes in women’s abortion rights, I’d like to join NSRH in order to advocate for women’s health on campus. At Penn, I can work with like-minded people to make a meaningful difference.
 
CONFIDENCE. All of the Quakers that I have met possess one defining trait: confidence. Each student summarized their experiences at Penn as challenging but fulfilling. Although I expect my coursework to push me, from my conversations with current Quakers I know it will help me to be far more effective in my career.
  
The Five C’s of Caring are important heuristics for nursing, but they also provide insight into how I want to approach my time in college. I am eager to engage with these principles both as a nurse and as a Penn Quaker, and I can’t wait to start.`,
                analysis: `This essay has a genius structure, utilizing a professional framework (Sister Roach's 5 C's) to organize the specific resources at Penn. By bolding each 'C' and mapping it to a specific course or club (Mazzoni Center, Dr. Carthon, NSRH), the author demonstrates a high level of professional maturity and research. It's a textbook example of how to make a long supplemental essay feel focused and readable.`
        },
        {
                id: "why-major-upenn-neuro",
                categoryId: "supplemental",
                subcategoryId: "why_major",
                title: "Neuroscience: Of Worms & Crime",
                author: "Anonymous",
                university: "University of Pennsylvania",
                theme: "Neuroscience & Forensic Psychology",
                excerpt: "I always loved watching the worms when it rained. In my imagination, the brain looked like a pile of squiggly worms...",
                content: `I always loved watching the worms when it rained. I used to put my little raincoat on, sit on the doorsteps, and watch them move toward the puddles. My younger brother, forever intent on destroying the world around him, would try to stomp on the worms, and I would run after him screaming. In my imagination, the brain looked like a pile of squiggly worms. However, my neuroscience curiosity has since grown beyond a worm’s habits.
 
For example, my mother thought that I was insane when I wanted to watch American Murder: The Family Next Door. To her immense relief, I was interested in the psychology of the criminal rather than the crime itself. Although neuroscience is my primary interest, I also hope to learn more about the intersection between law and medicine at the UPenn College of Arts and Sciences. I’ve been able to explore this topic through various projects at school such as presentations on juvenile crime and the death penalty.
 
At the University of Pennsylvania, I look forward to taking classes like Forensic Neuroscience (BIBB 050) as well as Neuroscience and Society (PSYC 247) both of which directly combine my two interests. Hopefully, the Take Your Professor to Dinner program resumes as I would make sure to talk to Dr. Daniel Langleben about his research on forensic functional brain imaging over a meal of Philly cheesesteaks.
 
I also hope to participate in the Race, Science, and Society Program where I can discover how race biases and neuroscience go hand-in-hand and contribute to the fight against racism. The Beyond Arrests: Re-Thinking Systematic-Oppression Group immediately caught my attention while looking at Penn’s opportunities to engage in relevant dialogue. My fascination with the criminal system began with reading Fyodor Dostoevsky’s Crime and Punishment, and Penn will both fuel that curiosity as well as introduce new questions about the world of justice reform.
 
As an eight-year Latin scholar and a five-time reader of the Percy Jackson franchise, I would like to take classes in the Penn Classical Studies department where I can learn more about the impact of ancient cultures on society today. Classes such as Greek and Roman Medicine (CLST 271) would intersect my interests in medicine and classical civilizations.
 
Although I do harbor a deep love for Philly cheesesteaks and enjoyment of running in strange places like the Woodlands Cemetery, the range of programs to support my diverse interests and unmatched opportunities to put learning into action make me confident that the University of Pennsylvania is the best university for me to succeed.`,
                analysis: `The strength of this essay lies in its high density of specific Penn details (BIBB 050, PSYC 247, Dr. Langleben) balanced with quirky, humanizing anecdotes (the 'worm' story and Philly cheesesteaks). By mentioning literary influences like Dostoevsky alongside technical interests in forensic imaging, the author presents themselves as a well-rounded and deeply curious intellectual fit for the College of Arts and Sciences.`
        },
        {
                id: "why-major-uw-madison-cs",
                categoryId: "supplemental",
                subcategoryId: "why_major",
                title: "Computer Science: The Badger Vision Board",
                author: "Anonymous",
                university: "University of Wisconsin-Madison",
                theme: "Computer Science & Human-Computer Interaction",
                excerpt: "7:30 am… As I open my eyes, I look at the pinboard in front of my bed. Written in red block letters is my goal...",
                content: `7:30 am… As I open my eyes, I look at the pinboard in front of my bed. Written in red block letters are two of the many goals of my life: “Make life better and more independent for the Visually impaired; Inspire kids to explore the field of STEM, making them the future problem solvers.“
 
Keeping these goals afresh in mind, I freshen up and prepare for the first class of the day, ECE 533 Image Processing. As the professor explains the Applications of Image Processing in Computer Vision, a light bulb sparks in my mind. I can modify the head contraption of PERIPHIS to identify objects in peripheral vision and alert the wearer via an earpiece using Text to Speech (TTS). 
 
After the class, I see Professor Mohit Gupta at the WISION Lab, where he shares his insights from the Block World Cameras system, which helps to geometrize 3D Man-made environments. We brainstorm ways we can implement this system on PERIPHIS.
 
Deep in the discussion and intrigued by my curiosity, he asked me where my interest in this niche field sparked during high school, and then I recount the incident from 9th grade: 
“In Hindi – Agar aaj mere paas paise hote to ye din na dekhna padta” (If I had money, I would not have had to see this day.) 
 
These were the words of Aadiya, a glaucoma patient, who couldn’t help but cry in despair as she injured herself in an accident just because she couldn’t sense the incoming traffic. During my visit to “Baroda Association for Blind (BAB)” for a survey, I saw and experienced firsthand how hard and inaccessible it is for an underprivileged visually impaired to locomote without anyone’s assistance. 
 
What happened next was my first adventure into the world of Computer Science and Engineering. I dedicated the next four years to find an affordable solution to a pressing problem. It was called PERIPHIS, a smart wearable that helps alert the visually impaired wearer of impending danger while locomoting.
 
When I finally presented this device to Aadiya, the smile on her face made me realize how big an impact technology can make in one’s life.
 
11:00 am… As I head to the Engineering Hall to complete my assignments of COMP SCI 570
Introduction to Human-Computer Interaction, I crossways with my roommate from the Chadbourne Residential College, who is also interested in researching applications of Computer Vision in real life. We fix a time to chat later. 
 
1:20pm… After a quick bite, I head to Human-Computer Interaction Laboratory. I expand my knowledge on different applications of Computer Science to make human life better than I found. I get fascinated when I see a few students building a child-friendly humanoid robot to teach kids the principles of Coding and AI. I hop in and share insights from my experience of being the President at AiGoLearning and kindling interest in STEM for young children. I explain how crucial the UI is when it comes to technology for the young.
 
5:00pm… To blow off some steam and socialize, I meet up with my fellow countrymen and artists at the Indian Graduate Students’ Association. We discuss and plan the upcoming Diwali Night Music at Shannon Hall. I feel proud to share my national identity while bringing out my musical self by contributing as a Tabla player at the student organization. 
 
As I close my day, I reflect and think of the most unique resource at UW. It is not the labs, research facilities, classes, but the people, including the professors and students, all aligned to a single goal: “Solving problems to make society a better place.”
 
10:00pm… I find my way back to my dorm room and write with red block letters on my pinboard: “Meet with at least 1 Badger every day and gain new insight from them.”`,
                analysis: `This essay is a flawless execution of the 'Day in the Life' format. It seamlessly weaves together technical aspirations (ECE 533, WISION Lab), a compelling backstory (Aadiya and PERIPHIS), and social fit (Indian Graduate Students’ Association). The reuse of the vision board motif at the start and end creates a satisfying narrative loop, showcasing the student’s goal-oriented nature and deep cultural pride.`
        },
        {
                id: "why-major-nw-env-eng",
                categoryId: "supplemental",
                subcategoryId: "why_major",
                title: "Environmental Engineering: The Farmer's Legacy",
                author: "Anonymous",
                university: "Northwestern University",
                theme: "Environmental Engineering & Sustainable Agriculture",
                excerpt: "For as long as I can remember, I have seen my parents, both farmers, struggling to produce food...",
                content: `For as long as I can remember, I have seen my parents, both farmers, struggling to produce food because of the challenges presented by the environment. Joining Northwestern’s community, and majoring in Environmental Engineering, will allow me to understand what are the reasons behind climate change and learn how to stop them and/or prevent them from happening. 
 
Having witnessed how plant diseases affect crops, I would like to collaborate in the PLANT-Dx project and in its widespread application. I strongly believe that it will be able to help farmers to improve the quality and quantity of their production, and reduce famine around the world. At some point in my education, I want to take advantage of the study-abroad programs Northwestern has to offer and learn about farming practices in a different part of the world. In addition, I want to conduct research on sustainable alternative farming methods that adapt to the new environmental conditions and that can be practiced in countries with fewer resources.
 
Apart from having access to outstanding professors, rigorous academics, and cutting-edge research resources, I will be able to be part of a close-knit community genuinely curious about others’ activities, truly passionate about what they do, and not afraid to step out of their comfort zone to make of this world a better place. Being part of Engineers for a Sustainable World at Northwestern will allow me to get to know people that share one of my passions in addition to learning and teaching how to apply sustainable practices in daily life.  
 
I am already looking forward to marching through the Weber Arch.`,
                analysis: `This essay is grounded in a powerful personal motivation: witnessing the struggles of farming parents. By linking this agricultural background to specific Northwestern resources like the PLANT-Dx project and 'Engineers for a Sustainable World,' the author makes a strong case for why Northwestern is the right environment for their specific mission. The focus on famine and adaptation shows a high level of global consciousness.`
        },
        {
                id: "why-major-nyu-nutrition",
                categoryId: "supplemental",
                subcategoryId: "why_major",
                title: "Nutrition & Food Studies: Forward-Thinking Flavor",
                author: "Anonymous",
                university: "New York University",
                theme: "Nutrition & Plant-Based Advocacy",
                excerpt: "“A futuristic way of looking at academics,” the student panelist said. I reflected on a conversation with my grandma...",
                content: `“A futuristic way of looking at academics,” the student panelist said during a New York University virtual information session. I reflected on a conversation I had with my grandma; she couldn’t understand how her vegetarian granddaughter could build a career in the food industry. However much I tried convincing her that vegetarianism was the future, as it offers substantial benefits to the environment and can offer health benefits to a growing population with the same environmental resources, she insisted that tofu would never provide the same satiation as meat. She was raised in a community where meat consumption was embedded in the culture, and its production is a large part of the country’s economy. In contrast, I had the privilege of living a few steps from San Francisco, with many restaurants and grocery stores dedicated to plant-based meat alternatives. Trying innovative recipes and products eventually allowed me to develop my own recipes. Upon my move to Nicaragua, where my grandmother is from, I found my food options to be limited, expensive and hard to find. So I developed my own small-scale solutions that did not break the bank and satiated grandma.
 
An institution that implements forward-thinking is what I need to reach my goals of changing the future of plant-based diets and people’s views on vegetarianism. NYU’s Nutrition and Food Studies program offers multiple disciplines of food studies that I will apply to my aspirations as a vegetarian. I plan to study under Adjunct Faculty Kayleen St. John, whose success in the plant-based industry and her teaching of the ‘Foundations of Plant-Based Nutrition’ in The Vegetarian Times excites me. The variety of classes like Introduction to Food History, Food Photography, and Food Systems: Food & Agriculture will give me an overview of what is available in the food industry to be prepared for all fields. Not to be cliche, but NYU’s proximity to the city is essential for the rapidly changing vegetarian industry. The multiculturalism available in NYC and NYU will allow me to understand the food system and diets of various cultures, religions, and areas. I can explore the extremes of the food industry, from fancy restaurants to public school cafeterias. These juxtapositions, much like the one I experienced after my move to Nicaragua, will allow me to broaden my reach and demonstrate that the vegetarian diet is not something reserved for select groups but a diet attainable to all.`,
                analysis: `This essay excels by using its first half to provide deep context on the applicant's passion. The juxtaposition between San Francisco's food scene and Nicaragua's limitations creates a problem that NYU's Nutrition and Food Studies program is uniquely positioned to help the author solve. Mentioning specific faculty like Kayleen St. John proves the author's seriousness about the field.`
        },
        {
                id: "why-major-nyu-luxury",
                categoryId: "supplemental",
                subcategoryId: "why_major",
                title: "Business & Luxury: Timeless Excellence",
                author: "Anonymous",
                university: "New York University",
                theme: "Luxury Marketing & Brand Management",
                excerpt: "My mother never takes off her Cartier necklace. On my 15th birthday, I was gifted a ring...",
                content: `My mother never takes off her Cartier necklace that my father gave her 10 years ago on their anniversary. As a child, I didn’t fully understand this attachment. However, on my 15th birthday, my aunt gifted me a ring, which was uniquely designed and made up of three rings linked together. Wearing it every day and making sure I would never lose it, I didn’t treat it like my easily replaceable childhood necklaces; it was my piece of luxury. This sparked my deep curiosity for the luxury world. The niche strives to provide the finest and most memorable experiences, as equally as my Japanese attention to detail and my French appreciation towards aesthetic beauty. In a constantly shifting environment, I learned that luxury chases timeless excellence.
 
NYU Stern’s BS in business and a co-concentration in management and marketing will fully immerse me in the business side of luxury fashion that I aim to pursue a future career in. The luxury marketing track, offered only by NYU, will enable me to assemble the most suited classes to reflect my interests. Specifically, NYU Stern’s exciting electives such as The Dynamics of the Fashion Industry seminar and Brand Strategy & Planning will encourage me to develop the skills that I was introduced to and grew keen on when running a virtual sustainable fashion auction.
 
As someone who has moved around from Paris to Tokyo, to Chicago and now Athens, I thrive in meeting and collaborating with others from diverse backgrounds. The school’s strong global outlook, demonstrated through Stern’s International Business Exchange Program, further sets NYU apart for me, as it is crucial to building essential soft skills. This opportunity allows me to experience new cultural approaches to luxury business which I can bring back with me to New York, and therefore push me to become a well-rounded business student. Similarly, I am excited to take part in the array of student clubs offered, such as the Luxury and Retail Association (LARA), which I learned about after connecting with and talking to current students. Seeing past talks from employers of companies like Conde Nast, I am eager to learn outside of the classroom from future speakers. 
 
Finding myself in new situations constantly, I always seek new challenges and explorations – to me, it is clear that NYU Stern will push me to create the finest and most unique learning experiences of timeless excellence.`,
                analysis: `An excellent, focused introduction that uses jewelry as a metaphor for lasting value. The author picks three specific NYU opportunities—the Luxury Marketing track, the International Business Exchange, and the LARA club—and elaborates on how each fits their global background. It demonstrates both research into Stern’s unique curriculum and a clear professional goal.`
        },
        {
                id: "why-major-bu-neuro-humanities",
                categoryId: "supplemental",
                subcategoryId: "why_major",
                title: "Neuroscience: The Research Balance",
                author: "Anonymous",
                university: "Boston University",
                theme: "Neuroscience & Humanities Research",
                excerpt: "I am fascinated by research, though completely uninterested in the disciplines traditionally associated with it...",
                content: `I am fascinated by research, though completely uninterested in the disciplines traditionally associated with it, such as STEM fields. I need to find a school that will balance my desire to conduct research with my interest in political science. 
 
While many schools boast in-depth student research programs for those looking to cure diseases or develop solutions to global warming, few tout their support for humanities research. Additionally, many universities that do allocate funding to social science research typically reserve these monies for graduate students or upperclassmen. BU, with the help of its Undergraduate Research Opportunities Program, will allow me to conduct research on the topics that most intrigue me, such as gender disparity in politics, or the relationship between dominant parties in power and the country’s economy and involvement in foreign affairs. Furthermore, I can begin these studies as early as my first year. Not only can I take classes with professors like Sandra McEvoy or Dino Christenson to develop my interests in a classroom setting, but I could also work with one of them to develop new knowledge in the topics that we both enjoy learning about. With this knowledge base and experience conducting studies with top professors in a respected research institution, I will be well-prepared for my future law career. I want to learn in an environment that encourages independent study no matter one’s field of interest or experience, and BU’s support of intellectual curiosity for all of its students makes it a perfect fit for me.`,
                analysis: `This essay is notable for its blunt honesty. By stating clearly that they are uninterested in STEM-based research, the author carves out a specific niche within BU’s Undergraduate Research Opportunities Program. Mentioning specific faculty like Sandra McEvoy and Dino Christenson show the student has researched who is doing the 'humanities research' they crave.`
        },
        {
                id: "community-princeton-highland-park",
                categoryId: "supplemental",
                subcategoryId: "community",
                title: "The Highland Parker Identity",
                author: "Anonymous",
                university: "Princeton University",
                theme: "Community Cohesion & Unifying Force",
                excerpt: "I have spent most of my life living in a 41% minority town of 1.8 square miles called Highland Park, NJ. This typically overlooked town...",
                content: `I have spent most of my life living in a 41% minority town of 1.8 square miles called Highland Park, NJ. This typically overlooked town has introduced me to a diverse array of people, and it has been the main influence on my life experiences and core values.
 
In the face of distinct cultures and customs, we forge a single identity as Highland Parkers and come together to organize large community events. The most prevalent example is our highly touted annual Memorial Day parade, where we join together with neighboring New Brunswick to invite military service members, family members of our fallen war heroes, our legislative and congressional representatives, and our townspeople. Moreover, as our high school band’s vice president, I help organize and lead our ensemble into these performances with a positive and uplifting spirit. We communicate with the town government and arrange the performances every year to perform at the parade. The parade is an example of many of our large community events that serve as a unifying force for our diverse community, reminding us that we are fundamentally connected as one cohesive group, despite our differences. 
 
As someone deeply interested in historical and political matters, I am well aware of the consequences that arise from dictatorial protocols that limit the freedom of speech and diversity of voices. From my experiences debating in Model UN conferences, I have grown accustomed to being able to present viewpoints from both sides of the argument, and I have learned to incorporate and respect the viewpoints of all sides of an issue before making up my own mind. For example, in a Model Congress debate, I found myself advocating for the interests of a state heavily reliant on traditional fossil fuels. While researching and articulating that perspective, I gained insights into the economic challenges faced by the states that are reliant on these resources. This experience not only broadened my understanding of the complexities surrounding environmental policies but also highlighted the necessity of considering diverse viewpoints for comprehensive decision-making. 
 
My background and experiences have fostered in me a profound appreciation for the value of diversity, inclusivity, and the pursuit of knowledge. At Princeton University, I will seek to contribute as an active participant in the community, actively provide unique perspectives and insights, and respect and learn from others’ perspectives even if there are disagreements. I wish to partake in student government, which has like-minded peers who want to make a substantive impact, and also participate in service programs like the Civic Leadership Council. Also, I hope to increase my impact from the leadership positions I currently hold on the Red Cross club and teen mayoral advisory council using the platforms in Princeton. I look forward to making a positive impact on both the campus and the broader community.`,
                analysis: `In this example, the student successfully responds to all parts of the Princeton prompt. They begin by describing their community and sharing some details about its makeup. The student illustrates how they specifically contribute to their community each year by leading the high school band in the Memorial Day parade. They also highlight how their experience in Model UN shaped their appreciation for diverse perspectives. In sharing these two examples, the student demonstrates their leadership and open-minded thinking. Finally, the student ends by highlighting how they would use these values to contribute to Princeton’s community by partaking in student government and Civic Leadership Council.`
        },
        {
                id: "community-princeton-red-cross",
                categoryId: "supplemental",
                subcategoryId: "community",
                title: "Red Cross Service: Resilience & Impact",
                author: "Anonymous",
                university: "Princeton University",
                theme: "Civic Engagement & Volunteerism",
                excerpt: "My first experience with the Red Cross was when my older sister was desperately trying to recruit people...",
                content: `My first experience with the Red Cross was when my older sister was desperately trying to recruit people to join the club during the harsh COVID year. Things were so bad for the club that I, as a freshman, ran for the position of treasurer unopposed. My first blood drive experience was marked by masks, social distancing, and low turnout among blood donors. Even many donors who showed up ended up being turned away due to health-related issues. Needless to say, it was not the greatest first high school service experience, and I admittedly started to doubt if the time I spent on this front was worth it. 
 
However, as we returned in person, things quickly turned around. As the vice president of the club, I helped recruit more than twice the club membership compared to the previous year, and our blood drives started to regain momentum; our blood targets have been exceeded every time since. Organizing and participating in blood drives has become a passion. It’s fulfilling, especially when I personally donate, to know that I’m actively serving the community and saving lives. I have realized that, despite my relatively young age, I am capable of making an impact through public service. I plan to continue my commitment to the Red Cross’s adult program and participate in service programs like Community Action at Princeton to serve the Princeton community and abroad.`,
                analysis: `This essay works for several reasons. First, it provides a specific example of the student’s civic engagement and demonstrates their impact by becoming vice president and increasing membership. Secondly, the essay provides an honest take on the struggles of this service experience, which lends credibility and authenticity to the story. The student also demonstrates an important lesson learned, aligning with Princeton’s values that students can have a positive impact on society.`
        },
        {
                id: "community-columbia-highland-park",
                categoryId: "supplemental",
                subcategoryId: "community",
                title: "United by Voices: Highland Park",
                author: "Anonymous",
                university: "Columbia University",
                theme: "Diversity & Inclusion (Short Form)",
                excerpt: "I have spent most of my life living in a 41% minority town called Highland Park, NJ. This typically overlooked town...",
                content: `I have spent most of my life living in a 41% minority town called Highland Park, NJ. This typically overlooked town has introduced me to a diverse array of people, and it has been the main influence on my life experiences and core values. 
 
HP has convinced me that we can build institutions that are strong and united while embracing a wide variety of voices and perspectives. It has shaped my core values of diversity and inclusion. An English teacher used to encourage me to talk in front of the class by saying even if I believed my thoughts were “dumb,” I could only enrich the conversation.
 
At Columbia University, I will seek to continue my contributions as an active participant in the community and look to actively provide unique perspectives and insights. Actively engaging in student groups such as ColumbiaVotes will be a big part of my experience.`,
                analysis: `The Columbia essay prompt only allows for a 150-word response. What makes this essay work is how succinctly it completely answers the prompt. The response begins by hooking the reader with a relevant detail of the student’s community. Then, the student shares how this community shaped them by influencing their values of diversity and inclusion. Finally, the student shares how they would engage with a Columbia organization that also supports diverse viewpoints.`
        },
        {
                id: "community-soup-kitchen-leadership",
                categoryId: "supplemental",
                subcategoryId: "community",
                title: "Personalizing Service: The Soup Kitchen",
                author: "Anonymous",
                university: "General / Independent",
                theme: "Leadership & Compassionate Interaction",
                excerpt: "“I don’t believe that’s the best way to do this.” The moment I thought this the first time I volunteered at my local soup kitchen...",
                content: `“I don’t believe that’s the best way to do this.” 
 
The moment I thought this the first time I volunteered at my local soup kitchen was one that resulted in a drastic change. When I was informed of the way the food was being served to the public, the initial excitement that I had felt diminished. We were told that the plates would be served before anyone arrived and would remain in an area where people could pick it up and seat themselves. I felt that this method was impersonal and inconsiderate, and disappointment washed over me. 
 
I turned to the people that were around me and discovered that they shared the same disapproval I felt. When we agreed that a change must be made, we exchanged ideas on how to present this to the woman in charge of the program. I suggested that we should serve each person one-by-one, and only give them the food if they wanted to/could eat it. They suggested multiple ideas, including that we should offer to seat them, hold their plates for them, continue to check in on them, and dispose of their plates once they finish their meal. We believed that this way would genuinely make them feel better and would allow us to get to know some of them personally. A simple smile and conversation could be enough to improve their day. 
 
From this day on, the way in which the local soup kitchen serves our community has changed dramatically. This experience taught me the importance of speaking up for what you believe in. In a group setting, it is likely that there will be others who share the same end goal and are willing to contribute different ideas to achieve the goal. These different perspectives can allow you to see situations in ways that you previously hadn’t, and can result in better outcomes. It also showed me the importance of leadership.
 
If I had never spoken up about the way the food was being served, a change might have never happened. When you work in the group, the end goal may not be for the benefit of anyone in the group, but for others who are in need. This experience also showed me the beauty in doing good for others and making others happy, even through small things such as serving them food to their liking.`,
                analysis: `In this community service essay, the student shares their experience volunteering at a soup kitchen. The student highlights several aspects of the experience that make it meaningful. They share their experience challenging the way that food was served, suggesting that food be served directly to attendees in order to better connect with community members. Through this experience, the student learns about leadership and working with others to achieve a common goal. This specific example demonstrates the student’s collaborative values and compassionate way of thinking.`
        },
        {
                id: "community-park-revitalization",
                categoryId: "supplemental",
                subcategoryId: "community",
                title: "The Mural of Resilience",
                author: "Anonymous",
                university: "General / Independent",
                theme: "Collaboration & Resourcefulness",
                excerpt: "During my junior year, I joined a volunteer group to help revitalize a local park...",
                content: `During my junior year, I joined a volunteer group to help revitalize a local park. Our group consisted of diverse members, ranging from middle school students to retired professionals. Initially, I was hesitant to engage with the others, fearing the generational gaps. However, as I worked alongside them, I realized that everyone shared the common goal of restoring the park, and together, we overcame the limitations that our age differences posed.
 
One Saturday, rain unexpectedly poured down, jeopardizing the progress we had made in painting a mural. As the rain soaked the artwork, I witnessed my team's morale plummet. Recognizing the need for action, I took the initiative to gather the group. Together, we brainstormed creative solutions to protect our art from the weather, such as using tarps and rain-reflective paint. I also made sure to allocate tasks to people based on their strengths and preferences.
 
In the end, the mural not only survived the storm but became a symbol of hope and resilience for our community. This experience taught me how valuable collaboration and resourcefulness are when facing challenges, and it strengthened my confidence in my ability to lead.
 
From revitalizing the park, I learned that my ability to communicate and connect with people from different backgrounds plays a vital role in fostering a supportive and collaborative environment. This shift in my perspective has transformed my approach to problem-solving and has inspired me to pursue a career in community development. I am eager to continue my journey of growth and leadership in my future studies.`,
                analysis: `This essay effectively demonstrates leadership through crisis management. By taking initiative when morale plummeted during a storm, the student shows they are action-oriented. The focus on 'allocating tasks based on strengths' shows organizational maturity. The conclusion successfully connects this specific project to a broader career goal in community development, proving the experience was transformative.`
        },
        {
                id: "community-c3-club",
                categoryId: "supplemental",
                subcategoryId: "community",
                title: "Bursting the La Cañada Bubble",
                author: "Anonymous",
                university: "General / Independent",
                theme: "Creative Community & Entrepreneurship",
                excerpt: "I live in the suburb of Los Angeles, California, known to its residents as the bubble...",
                content: `I live in the suburb of Los Angeles, California, known to its residents as the bubble. It has the perfect weather, location, and schools. As amazing as it sounds, however, growing up in La Cañada Flintridge has its drawbacks: the community pressures adolescents to achieve success through mainly academic means. While this approach isn’t necessarily wrong, it can be difficult, particularly in my high school, to thrive in a creative and imaginative way.

Sophomore year, my friends and I began to wonder, What if the teenagers of La Cañada had greater opportunities to express themselves. To pursue their creativity. To follow their dreams.

That’s when we decided to start the Catalyzing Creativity Club. 

Founded two years ago, the Catalyzing Creativity Club (C3, for short), provides students in our community the opportunity to pursue their passion and aspirations outside the classroom. 

Some of our opportunities include: a yearly music festival for our community’s young aspiring musicians that showcases local talent to the masses and scouts; a technology expo, which allows students to be rewarded with funding and demonstrate their coding abilities to prospective companies; recording sessions for aspiring musicians, photo-publishing competitions, and a variety of guest speakers ranging from nineteen-year-old college seniors to millionaire entrepreneurs. In addition, we have a blog for aspiring writers to publish their work and are holding a shoe drive for underprivileged athletes. 

As vice president of finances for C3, I work to ensure we can fund these activities. I handle our bank account, fundraising, and organize the event planning. Moreover, I make sure that C3’s activities and finances are approved by and follow the guidelines of my high school. This role is crucial, as we work to achieve non-profit status. 

Even though C3 is only a few years old, I believe it is already making an impact in the community. As we grow and the opportunities we provide become more popular, our hope is to inspire our peers to follow their dreams and burst the La Cañada Flintridge bubble.`,
                analysis: `This essay works because it establishes a clear problem (the 'academic bubble') and offers a tangible solution (C3). The third paragraph is a masterclass in specificity, listing concrete events like a 'technology expo' and 'shoe drive'. By detailing their role as VP of Finance, the author proves they aren't just a participant but a core engine behind the club’s success.`
        },
        {
                id: "community-reno-earthquakes",
                categoryId: "supplemental",
                subcategoryId: "community",
                title: "Preparedness in the Swarm",
                author: "Anonymous",
                university: "General / Independent",
                theme: "Disaster Preparedness & Civic Leadership",
                excerpt: "Last year, nearly 600 earthquakes hit my hometown of Reno in a ‘swarm’...",
                content: `Last year, nearly 600 earthquakes hit my hometown of Reno in a ‘swarm’. Although the magnitudes of these quakes ranged from 2.5 to 3.7, the constant fear and anxiety of impending doom rose in the community. A disaster is unprecedented and unpredictable and, in our community, we always acknowledged their occurrence elsewhere but never fully admitted that a large-scale catastrophe may happen at our doorsteps.

Recognizing this unspoken apathy, I decided to take a step beyond my school club and get involved in the community chapter of the Reno Red Cross Disaster Cycle Services team. As I was learning the basics of preparedness i.e., general earthquake and fire safety drills, I realized that if disaster were to strike, the majority of people in my community could not confidently say that they are prepared. As part of the DCS committee, it is my goal to increase the confidence of as many youth and families as possible.

During my training, I accompanied volunteers during the Home Fire Preparedness Campaign, where we installed and updated smoke alarms and detectors in over thirty low income households in the Reno area, free of charge. I began teaching the “Pillowcase Project” in local elementary schools, leading workshops in and instilling the importance of disaster preparedness for the youngest of children.

Representing DCS on the Youth Executive Board for our local chapter, I also led a Youth in Disaster Services Seminar, where we trained young adults in CPR Certification as well as basic Shelter Fundamentals.

Through my work with the Red Cross, and in my interactions with survivors and rescuers who assisted during Hurricane Katrina, I’ve come to discover how teaching even just small preparedness procedures to individuals can help save entire communities.

The impact of disaster services reverberates throughout our communities, both at home and internationally. It is a selfless, necessary job in which youth, as the future generation of an ever-changing disaster prone world, must take urgent action.`,
                analysis: `This essay stands out by focusing on a less common community need: disaster preparedness. The author successfully shifts the focus from themselves to the 'urgency of the work,' which paradoxically makes them more attractive as a leader. It shows a student who isn't just looking for accolades, but is genuinely dedicated to public safety.`
        },
        {
                id: "ps-santur-music",
                categoryId: "personal_statement",
                title: "The Santur & Three Generations",
                author: "Anonymous",
                university: "General / Independent",
                theme: "Cultural Heritage & Family Legacy",
                excerpt: "Do re fa mi, re do fa mi, re do sol fa mi re mi re. Have I completely lost it? No. Music...",
                content: `Do re fa mi, re do fa mi, re do sol fa mi re mi re. Have I completely lost it? Should I be locked up in a mental hospital chained to a chair? No. Then what are these utterances coming from my mouth? Music.

I have devoted thousands of hours of my life to playing the santur, a classical Persian instrument that originated in the Middle Middle East. Some people think I'm strange: a Persian redheaded Jewish teenager obsessed with an ancient musical instrument. But they don’t see what I see. My santur is King David’s lyre: it can soothe, enrapture, mesmerize.

The santur also allows me to connect to my culture and Persian heritage, and to visit Iran of the past, a culture rich in artistic tradition. Sometimes I imagine performing for the king in the Hanging Gardens of Babylon, the santur sounds echoing through the Seven Hills of Jerusalem.

Today, some Americans view Iran as a land of terrorists, but when I play the innocent of Iran, the educated, the artists, the innovators, come to life. Iran is not a country of savages; it’s Kubla Khan’s fountain, an abundant source of knowledge and creativity.

Finally, the santur represents one of my remaining links to my grandfather. In the last few years of his life, Baba Joon did not know me as his grandson. Alzheimer’s slowly took over his brain, and eventually he could not recognize me. Baba Joon grew up with the music of the santur and my father plays it in his car every day, so when I play, the music connects all three generations.

In December I’ll be releasing my first album, a collection of classical Persian pieces. Proceeds from the album will go toward Alzheimer's research, as I hope to play some small part in finding a cure for the disease. My teacher is one of only a handful of santur teachers from Iran, and I sometimes wonder if the santur will soon become extinct, like the seven thousand endangered languages which may soon be gone.

Not if I have anything to say about it.`,
                analysis: `This is a powerful cultural essay that uses music as a bridge across history and family tragedy. By connecting the 'santur' to both a broader cultural advocacy (challenging stereotypes about Iran) and a personal family struggle (Baba Joon's Alzheimer's), the author presents a multifaceted identity that is both intellectual and deeply empathetic.`
        },
        {
                id: "extracurricular-debate-leadership",
                categoryId: "supplemental",
                subcategoryId: "extracurricular",
                title: "Policy Debate & Intellectual Growth",
                author: "Anonymous",
                university: "General / Independent",
                theme: "Leadership & Intellectual Persuasion",
                excerpt: "Through switch-side policy debate I not only discuss a multitude of competing ideas, but also argue from both sides...",
                content: `Through switch-side policy debate I not only discuss a multitude of competing ideas, but also argue from both sides of widely disputed issues. By equipping me with Protagoras’ antilogic and Dissoi Logoi, switch-side policy debate has provided me with a forum to cultivate a diversity of intellectual perspectives that has informed my own intellectual growth.

I strive to give others the same opportunity for intellectual stimulation. Over the past two years, I have helped expand my debate team from a struggling club of 15 to a force of over 100 debaters, leading my team to place first in our debate league. As team President, I teach new debaters fundamentals in communication theory while facilitating formal and informal debates. Playing a dual role as instructor and competitor has allowed me to establish debate as a lasting forum for discussing ideas at my school.

The lessons I learned as both a leader and debater have helped me to succeed beyond my debate circles. Inside the classroom, I possess the openness to consider the views of others and the courage to voice my own opinions. Having been elected to student office four times, I have used these skills to sell my ideas to the student body and earn its vote. More importantly, debate has taught me how to transform these ideas into concrete actions. As the current ASB Vice President, I have used the managerial and communication skills I developed as a debater to spearhead a school wide sustainability campaign that spanned issues concerning water scarcity, ecology, and campus beautification.

Similarly, the lessons I learned in debate will be instrumental in my future work as an entrepreneur and engineer, both of which require the capacity to approach problems critically and clearly articulate complex ideas. Continuing to develop these skills will be crucial if I am to become a competitive member in the future marketplace of ideas.`,
                analysis: `This essay uses a 'firehose' approach of accomplishments, but saves it from sounding like a list by constantly rooting it in 'lessons learned.' The author demonstrates immense growth—from a club of 15 to 100+—and shows how debate skills translate to Real World impact like a sustainability campaign. It's an excellent example of using one activity to explain a whole worldview.`
        },
        {
                id: "extracurricular-journalism-log",
                categoryId: "supplemental",
                subcategoryId: "extracurricular",
                title: "The Messenger: Journalism",
                author: "Anonymous",
                university: "General / Independent",
                theme: "Writing & Community Responsibility",
                excerpt: "VIOLENCE IN EGYPT ESCALATES. My quest to become a journalist began by writing for the international column...",
                content: `VIOLENCE IN EGYPT ESCALATES. FINANCIAL CRISIS LEAVES EUROPE IN TURMOIL. My quest to become a journalist began by writing for the international column of my school newspaper, The Log. My specialty is international affairs; I’m the messenger who delivers news from different continents to the doorsteps of my community. Late-night editing, researching and re-writing is customary, but seeing my articles in print makes it all worthwhile. I’m the editor for this section, responsible for brainstorming ideas and catching mistakes. Each spell-check I make, each sentence I type out, and each article I polish will remain within the pages of The Log. Leading a heated after-school brainstorming session, watching my abstract thoughts materialize onscreen, holding the freshly printed articles in my hand—I write for this joyous process of creation. One day I’ll look back, knowing this is where I began developing the scrutiny, precision and rigor necessary to become a writer.`,
                analysis: `Short and punchy, this essay captures the 'joy of creation.' It highlights the invisible labor—late-night editing and spell-checking—that shows a student’s dedication to quality. The emphasis on 'precision and rigor' tells colleges this student has the discipline to succeed in an academic setting.`
        },
        {
                id: "extracurricular-photography-darkroom",
                categoryId: "supplemental",
                subcategoryId: "extracurricular",
                title: "Developing Perspective: Photography",
                author: "Anonymous",
                university: "General / Independent",
                theme: "Artistic Discipline & Social Justice",
                excerpt: "Developer, one minute; stop bath, 30 seconds; fixer, two minutes. Under the red beam of safelights...",
                content: `Developer, one minute; stop bath, 30 seconds; fixer, two minutes. Under the red beam of safelights a new photo comes to life, a carefully crafted compilation of dark shadows, light skies, and all the greys in between. 

I’ve spent many hours exploring photography using film cameras, pinhole cameras, plastic cameras, Polaroids, digital cameras, and disposables. I scour antique stores for old cameras to experiment with and learn from. As a result of my passion for photography, I have become one of my school’s photographers, responsible for documenting school events and teaching younger students darkroom techniques. Making decisions in the darkroom about contrast filters and apertures has made me more confident in my ability to make choices quickly. I also use my photography to advance social justice causes by drawing attention to issues such as unattainable standards for women’s bodies.`,
                analysis: `This essay moves from technical expertise to social impact. By demonstrating mastery of darkroom techniques and antique equipment, the author shows intellectual curiosity. The final pivot—using photography for social justice—adds a layer of purpose that elevates the essay from a hobby to a mission.`
        },
        {
                id: "extracurricular-activism-stereotype",
                categoryId: "supplemental",
                subcategoryId: "extracurricular",
                title: "#StereotypeProject: Viral Impact",
                author: "Anonymous",
                university: "General / Independent",
                theme: "Social Justice & Digital Activism",
                excerpt: "In eighth grade, I created an art piece addressing a stereotype I had faced and posted it online...",
                content: `In eighth grade, I created an art piece addressing a stereotype I had faced and posted it online, encouraging my friends to do the same and hashtag it #StereotypeProject. The drawing snowballed into a viral movement, gathering the attention of over 1,000 youth artists worldwide, each contributing their own stories and drawings. The Stereotype Project has since grown, extending into local schools and calling on the next generation to stand strong against the biases they face due to race, gender, sexual orientation, mental illness, and more.  In a time of increasing youth activism and reminders of the potential we have as young revolutionaries, the Stereotype Project is a channel for creative expression, unity, and a means of imparting a positive impact on the world. Our website continues to be live and accept submissions: stereotypeproject.org.`,
                analysis: `A classic example of 'scale.' Starting a local project that reaches 1,000+ artists worldwide demonstrates a student's ability to mobilize others through digital platforms. It shows they understand the power of creative expression as a tool for unity.`
        },
        {
                id: "extracurricular-hospital-internship",
                categoryId: "supplemental",
                subcategoryId: "extracurricular",
                title: "Persistence in Medicine",
                author: "Anonymous",
                university: "General / Independent",
                theme: "Resilience & Clinical Experience",
                excerpt: "Upon applying to Irvine Regional Hospital, I was told there were no spaces. I reapplied and was finally accepted...",
                content: `Upon applying to Irvine Regional Hospital, I was told there were no spaces for Junior Volunteers. After securing additional recommendations, however, I reapplied and was finally accepted and assigned Front Desk duties, where I delivered flowers, transported biopsy samples to labs, directed visitors, and answered nurse requests. Unfortunately, the hospital was shut down due to lack of funds, and hundreds of workers became unemployed, including me. It was distressing to experience the effects of a declining economy. When Kaiser Permanente opened, my applications were also initially rejected. But by requesting an interview, I proved my qualifications from past experiences and was specially assigned to Medical Surgery instead of the Gift Shop. I answered patients’ requests, administered patient surveys, organized wound documentations, filed records, delivered blood and urine samples, assisted nurses with check-ups, stocked supply carts, updated dietary needs with doctors, and discharged patients safely.`,
                analysis: `This essay isn't just about medicine—it's about grit. By detailing how they had to 'reapply' and 'request an interview' after multiple rejections, the author proves they have the tenacity required for a high-stress medical career. The list of duties at the end provides concrete evidence of their hands-on clinical experience.`
        },
        {
                id: "extracurricular-summer-job-dogs",
                categoryId: "supplemental",
                subcategoryId: "extracurricular",
                title: "Jimmy’s Hot Dogs: Life in the Front Lines",
                author: "Anonymous",
                university: "General / Independent",
                theme: "Work Ethic & Interpersonal Value",
                excerpt: "Regular Dog: $1.49. Jimmy’s Famous: $1.89. Bologna’s out. Milkshake machine’s broken...",
                content: `Regular Dog: $1.49. Jimmy’s Famous: $1.89. Twenty-five cents for cheese. Bologna’s out. Milkshake machine’s broken. Refill sweet tea.

As cashier at Jimmy’s Hot Dogs, I was everything but the cook. After day one, my hair stood straight and old southern ladies sympathetically asked oh honey, is it your first shift? I wanted to cry.

But, an hour before closing, Nondas, the cook, checked the register. He smiled and said “Luci Lou, you the best.” Stress forgotten, we danced around the kitchen in celebration, talking about his brothers in Greece, World Cup soccer, and grilled fish.

After that, I didn’t feel alone. I had Nondas. I had the regulars. And I had the southern ladies to back me up. Jimmy’s taught me to value the people that make a job worthwhile. To focus on the positive when there’s soccer to be watched and perfectly grilled fish to be eaten.`,
                analysis: `Often, students overlook summer jobs, but this essay shows why they shouldn't. Using sensory details—the broken milkshake machine, the 'Luci Lou' nickname—the author demonstrates a high degree of social intelligence and humility. It shows a student who finds value in hard work and builds community in any environment.`
        },
        {
                id: "extracurricular-sports-positivity",
                categoryId: "supplemental",
                subcategoryId: "extracurricular",
                title: "The Coach’s Award: Bench Leadership",
                author: "Anonymous",
                university: "General / Independent",
                theme: "Positivity & Team Spirit",
                excerpt: "Two years ago I won the Coach’s Award without ever stepping on the volleyball court. How? Positivity...",
                content: `Two years ago I won the Coach’s Award without ever stepping on the volleyball court. How? Sophomore year, a stress fracture prevented me from practicing, but I came to every practice and game to encourage and laugh with my teammates. At the end of the year, I won the award based on my positivity.

The subsequent year, I transferred schools and tried out for volleyball. Due to MHSAA rules, I couldn’t play because of the transfer, but I could practice. I never missed one, worked hard, and acted as team manager. So guess what happened? I won the Coach’s Award again, this time from a different coach. Again, without ever having set foot on the court.

While I’m not sure I’ll play D1 or D2 sports, I know for sure that one of my favorite activities ever is being positive and I plan to continue it at Michigan.`,
                analysis: `This is a unique sports essay. Instead of a 'winning the big game' story, it's about being a cultural pillar. Winning the Coach's Award twice without playing a single minute is a massive testament to character. It tells colleges that this student is a team-player who brings light to a community even when they aren't in the spotlight.`
        },
        {
                id: "extracurricular-piano-moonlight",
                categoryId: "supplemental",
                subcategoryId: "extracurricular",
                title: "Moonlight Sonata: The 17-Page Challenge",
                author: "Anonymous",
                university: "General / Independent",
                theme: "Determination & Artistic Mastery",
                excerpt: "My fingers raced across the keys, rapidly striking one after another. My body swayed with the music...",
                content: `My fingers raced across the keys, rapidly striking one after another. My body swayed with the music as my hands raced across the piano. Crashing onto the final chord, it was over as quickly as it had begun. My shoulders relaxed and I couldn’t help but break into a satisfied grin. I had just played the Moonlight Sonata’s third movement, a longtime dream of mine.
 
Four short months ago, though, I had considered it impossible. The piece’s tempo was impossibly fast, its notes stretching between each end of the piano, forcing me to reach farther than I had ever dared. It was 17 pages of the most fragile and intricate melodies I had ever encountered.
 
But that summer, I found myself ready to take on the challenge. With the end of the school year, I was released from my commitment to practicing for band and solo performances. I was now free to determine my own musical path: either succeed in learning the piece, or let it defeat me for the third summer in a row.
 
Over those few months, I spent countless hours practicing the same notes until they burned a permanent place in my memory, creating a soundtrack for even my dreams. Some would say I’ve mastered the piece, but as a musician I know better. Now that I can play it, I am eager to take the next step and add in layers of musicality and expression to make the once-impossible piece even more beautiful.`,
                analysis: `This essay shines with its descriptive hook, transforming piano playing into a full-body experience that captivates the reader. The author moves beyond 'telling' us it was hard to 'showing' the physical and mental toll of 17 pages of intricate melody. While powerful, the essay could be even stronger by detailing the 'tedious process' of specific scales to further ground the success in hard work.`
        },
        {
                id: "extracurricular-newspaper-personified",
                categoryId: "supplemental",
                subcategoryId: "extracurricular",
                title: "My Love-Hate Relationship with News",
                author: "Anonymous",
                university: "General / Independent",
                theme: "Maturity & Humorous Reflection",
                excerpt: "My school’s newspaper and I have a typical love-hate relationship; some days I want nothing more...",
                content: `My school’s newspaper and I have a typical love-hate relationship; some days I want nothing more than to pass two hours writing and formatting articles, while on others the mere thought of student journalism makes me shiver. Still, as we’re entering our fourth year together, you could consider us relatively stable. We’ve learned to accept each other’s differences; at this point I’ve become comfortable spending an entire Friday night preparing for an upcoming issue, and I hardly even notice the snail-like speed of our computers. I’ve even benefitted from the polygamous nature of our relationship—with twelve other editors, there’s a lot of cooperation involved. Perverse as it may be, from that teamwork I’ve both gained some of my closest friends and improved my organizational and time-management skills. And though leaving it in the hands of new editors next year will be difficult, I know our time together has only better prepared me for future relationships.`,
                analysis: `By personifying the newspaper as a 'long-term partner,' the author demonstrates a high degree of wit and maturity. This creative framing allows them to advertise soft skills like teamwork and time management in an endearing, non-cliché way. To elevate it, the author might have delved more into the 'hate' side of the relationship to fully deliver on the hook's promise.`
        },
        {
                id: "extracurricular-politics-lobbying",
                categoryId: "supplemental",
                subcategoryId: "extracurricular",
                title: "Rayburn House: A Participant in Democracy",
                author: "Anonymous",
                university: "General / Independent",
                theme: "Civic Engagement & Cultural Identity",
                excerpt: "The cool, white halls of the Rayburn House office building contrasted with the bustling energy of interns...",
                content: `The cool, white halls of the Rayburn House office building contrasted with the bustling energy of interns entertaining tourists, staffers rushing to cover committee meetings, and my fellow conference attendees separating to meet with our respective congresspeople. Through civics and US history classes, I had learned about our government, but simply hearing the legislative process outlined didn’t prepare me to navigate it. It was my first political conference, and, after learning about congressional mechanics during breakout sessions, I was lobbying my representative about an upcoming vote crucial to the US-Middle East relationship. As the daughter of Iranian immigrants, my whole life had led me to the moment when I could speak on behalf of the family members who had not emigrated with my parents.
 
As I sat down with my congresswoman’s chief of staff, I truly felt like a participant in democracy; I was exercising my right to be heard as a young American. Through this educational conference, I developed a plan of action to raise my voice. When I returned home, I signed up to volunteer with the state chapter of the Democratic Party. I sponsored letter-writing campaigns, canvassed for local elections, and even pursued an internship with a state senate campaign. I know that I don’t need to be old enough to vote to effect change. Most importantly, I also know that I want to study government—I want to make a difference for my communities in the United States and the Middle East throughout my career.`,
                analysis: `This essay masterfully bridges the gap between activity, academic interest (government), and personal history (Iranian heritage). The author's emotional connection to speaking for family members who couldn't emigrate adds a layer of 'why' that resonates deeply. A deeper dive into the specific 'liberating' feelings of that first lobbying session could add even more impact.`
        },
        {
                id: "extracurricular-tutoring-math",
                categoryId: "supplemental",
                subcategoryId: "extracurricular",
                title: "Third Grade Math: A Lesson in Patience",
                author: "Anonymous",
                university: "Stanford",
                theme: "Thoughtfulness & Creative Problem-Solving",
                excerpt: "In February of 2016 my neighbor texted me and asked me to tutor her third grader in math...",
                content: `In February of 2016 my neighbor texted me and asked me to tutor her third grader in math. My first thought was “Third grade math?! This will be easy.” I was wrong. The girl I tutored is dyslexic and had ADHD, so working with her challenged me in a new way. I had to devise ways of teaching where she could understand it but also remain focused for long enough to accomplish it. I had to practice my patience in a way I never have before, and I have become a better person because of it. By the end of our work together, she was excited to play the math games I made up and she was so proud every time she understood a question or a concept. I am so thankful for that opportunity.`,
                analysis: `This Stanford example demonstrates intellectual humility—admitting that 'third grade math' was actually a challenge. By adapting to a student with dyslexia and ADHD, the author showcases creative problem-solving and an shift in character toward greater patience and empathy.`
        },
        {
                id: "extracurricular-business-rice",
                categoryId: "supplemental",
                subcategoryId: "extracurricular",
                title: "The Drive of an Entrepreneur",
                author: "Anonymous",
                university: "Rice",
                theme: "Persistence & Professional Curiosity",
                excerpt: "With an interest in business, it is hard to pass up the chance to become a part of the business club...",
                content: `With an interest in business, it is hard to pass up the chance to become a part of the business club at my school. This competition-based club allows members to learn detailed ways to start and manage a business. Although my curiosity urged me to participate, the thought of writing 30 pages with a fast-approaching deadline seemed daunting. Prior to this program, I had very little knowledge on the basic principles of business management, however, through research and a bit of persistence, I learned countless fundamentals of business. Although I was awarded a medal and recognized as a State Finalist in the International Business Plan category, the most valuable thing I earned was the drive of an entrepreneur which taught me that even the most difficult of tasks can be accomplished if they are done with continued determination.`,
                analysis: `Operating under tight word limits, this Rice supplemental example gets straight to the point. It effectively connects academic interest with a daunting challenge (the 30-page plan) and focuses on the 'entrepreneurial drive' earned through persistence rather than just the medal won.`
        },
        {
                id: "extracurricular-research-heart",
                categoryId: "supplemental",
                subcategoryId: "extracurricular",
                title: "Mimicking the Heart: HCM Research",
                author: "Anonymous",
                university: "General / Independent",
                theme: "Scientific Precision & Personal Motivation",
                excerpt: "After watching my grandfather suffer from heart ailments, it was particularly meaningful to have the opportunity...",
                content: `After watching my grandfather suffer from heart ailments, it was particularly meaningful to have the opportunity to conduct echocardiography research with a pediatric cardiologist. During my summer internship at a Health and Science University, I designed and built heart models to mimic hypertrophic cardiomyopathy (HCM) disease and investigate strain comparisons in a 2D and 3D model. 

Continuously designing and analyzing my own experiments has not only taught me the value of diligence, patience and replication in the laboratory setting, but it has also instilled in me the critical-thinking and problem-solving skills that will enable me to tackle difficult, and sometimes unknown, problems with sound reasoning and confidence as I serve the underrepresented to eliminate health disparities.`,
                analysis: `This essay effectively links a personal 'why' (grandfather's heart ailment) to a highly technical 'what' (2D/3D heart models). It demonstrates that the student has the stamina for scientific research while grounding their ambition in a desire to eliminate health disparities—a powerful combination for medical or science tracks.`
        },
        {
                id: "extracurricular-girl-scouts",
                categoryId: "supplemental",
                subcategoryId: "extracurricular",
                title: "More Than Cookies: 10 Years a Scout",
                author: "Anonymous",
                university: "Northwestern",
                theme: "Long-term Commitment & Mentorship",
                excerpt: "After having been a Girl Scout for over 10 years, I can confirm that the most common questions I get asked...",
                content: `After having been a Girl Scout for over 10 years, I can confirm that the most common questions I get asked are, “When are you selling the cookies,” or “Can I get [insert favorite cookie here]”. However, Girl Scouts means so much more to me than simply selling cookies for a few months.

Being a part of Girl Scouts has entailed, as the Girl Scout Law indicates, “being a sister to every Girl Scout”. When I first joined the organization as a Brownie, I didn’t think I would interact with the older girls at all. However, I soon began to admire my older Girl Scout sisters and looked up to them the more time I spent with them. As an Ambassador now, I try to show the same level of leadership by mentoring and working with younger girls, building a strong relationship with them and helping them on their journey to the higher ranks (as well as through life).

As a Girl Scout, I have also learned to enthusiastically help my community. Whether it be through providing assistance at food pantsries, cleaning up litter, donating to the homeless, or singing carols in retirement homes, Girls Scouts has taught me the importance of helping others in need around me and improving the state of the world.

So, yes, being a Girl Scout does mean selling cookies. But, more importantly, Girl Scouts has meant growing into a confident young woman, being a mentor, and providing service to better the world.`,
                analysis: `This Northwestern sample leverages the concept of 'depth of involvement.' By highlighting a 10-year journey from Brownie to Ambassador, the student proves long-term reliability. The focus on 'mentoring younger sisters' shows they are ready to step into leadership roles in a college community.`
        },
        {
                id: "extracurricular-vanderbilt-precollege",
                categoryId: "supplemental",
                subcategoryId: "extracurricular",
                title: "Finding My Own Voice: Beyond Being a Twin",
                author: "Anonymous",
                university: "Vanderbilt",
                theme: "Self-Growth & Diversity of Perspective",
                excerpt: "I silently sat in the passenger seat of my mother’s car with a churning feeling in my stomach...",
                content: `I silently sat in the passenger seat of my mother’s car with a churning feeling in my stomach. My legs bounced wildly, and my body was tense. My anxiety came from the fact I would be starting my first day at a pre-college program to which I was recently accepted.

When my mother dropped me off at the building where my first class would be held, I nervously walked in, surprised to be greeted by the smiling faces of my peers. Looking around, I saw faces of all shades. This amazed me, having been surrounded by people who looked like me for most of my life. As I engaged in conversation with students already present, I increasingly became more comfortable.

Though class began with typical icebreakers, we quickly transitioned into math topics, beginning with algebra and progressing into trigonometry and summations. When the professor concluded the lecture, I was shocked to find that the class had passed by so quickly. Similar sentiments arose after completing my critical thinking class in the afternoon. When my mother picked me up after that class, I enthusiastically spilled my experiences from the day.

The following six weeks of that summer (and ensuing summers) comprised of me being introduced to new perspectives. Being surrounded by peers that were different in lifestyle and socioeconomic status made more open-minded to unfamiliar concepts and interpretations.

The brother and sisterhood I formed with my peers made me way less dependent on my twin sister and increased my confidence in my beliefs and individuality.

Additionally, being taught by university professors in rigorous subject matter instilled in me a newfound passion in exploring challenging topics. This program has assisted in developing me into a more well-rounded, cultured individual not only through exposure to a research program at the university hospital, but through enrichment activities during the school year. Three years ago, I was just a “twin” who did well in school, however today I am an individual with my own unique views, eager to learn the endless knowledge the world has to offer me.`,
                analysis: `This Vanderbilt essay excels at 'in-the-moment' storytelling. It captures the initial anxiety of a pre-college program and transforms it into a narrative of self-actualization. The author's realization of their own 'individuality'—separate from their twin—is a powerful theme that shows psychological maturity and readiness for independent college life.`
        },
        {
                id: "extracurricular-princeton-sg",
                categoryId: "supplemental",
                subcategoryId: "extracurricular",
                title: "Student Government: Catalyzing College Change",
                author: "Anonymous",
                university: "Princeton",
                theme: "Collaborative Leadership & Institutional Impact",
                excerpt: "Serving as a Student Government leader at my college has taught me the power of student voice...",
                content: `Serving as a Student Government leader at my college has taught me the power of student voice and collaborative leadership. During my Junior year, I began attending Senate Meetings and was elected as a Senator a few months later. I began proposing solutions to problems my college faces, from lack of STEM programming to low voter turnout rates to poor multicultural outreach programs. I created student committees to tackle these problems, the most recent being a committee working to bring a series of local STEM professionals for our artist-in-residence series. I was appointed as a student voice to faculty committees, such as the Diversity and Equity Committee. I use this position to bring student concerns I hear from SG directly to the college board to catalyze changes in our college, such as the introduction of STEM cohort groups or providing resources for students of color.`,
                analysis: `This Princeton example gets straight to the point, advertising a student who is both a visionary and a builder. By listing specific initiatives—like STEM professional series and cohort groups—the author proves they can navigate institutional hierarchies to deliver concrete results for their peers.`
        },
        {
                id: "diversity-jewish-identity",
                categoryId: "supplemental",
                subcategoryId: "diversity",
                title: "The Star of David: Pride Amid Adversity",
                author: "Anonymous",
                university: "Duke",
                theme: "Religious Identity & Resilience",
                excerpt: "I was thirsty. In my wallet was a lone $10 bill... 'Want your money back, Jew?' she chanted...",
                content: `I was thirsty. In my wallet was a lone $10 bill, ultimately useless at my school’s vending machine. Tasked with scrounging together the $1 cost of a water bottle, I fished out and arranged the spare change that normally hid in the bottom of my backpack in neat piles of nickels and dimes on my desk. I swept them into a spare Ziploc and began to leave when a classmate snatched the bag and held it above my head.
 
“Want your money back, Jew?” she chanted, waving the coins around. I had forgotten the Star-of-David around my neck, but quickly realized she must have seen it and connected it to the stacks of coins. I am no stranger to experiencing and confronting antisemitism, but I had never been targeted in my school before. I grabbed my bag and sternly told her to leave. Although she sauntered away, the impact remained.
 
This incident serves as an example of the adversity I have and will continue to face from those who only see me as a stereotype. Ironically, however, these experiences of discrimination have only increased my pride as a member of the Jewish Community. Continuing to wear the Star-of-David connects me to my history and my family. I find meaning and direction in my community’s values, such as pride, education, and giving—and I am eager to transfer these values to my new community: the Duke community.`,
                analysis: `Writing about discrimination is difficult, but this essay succeeds by building a JARring scene that allows the reader to feel the student's anger. It moves beyond a 'sob story' to a powerful reflection on how such experiences strengthen the author's pride and value system. To improve, the author could have 'shown' the connection to history (e.g., describing family rituals) rather than just 'telling' us it exists.`
        },
        {
                id: "diversity-bangladeshi-american",
                categoryId: "supplemental",
                subcategoryId: "diversity",
                title: "Refuge in the Bronx: Reclaiming Heritage",
                author: "Anonymous",
                university: "General / Independent",
                theme: "Immigration & Social Justice",
                excerpt: "Life before was good: verdant forests, sumptuous curries... Then, my family abandoned our comfortable life...",
                content: `Life before was good: verdant forests, sumptuous curries, and a devoted family.
 
Then, my family abandoned our comfortable life in Bangladesh for a chance at the American dream in Los Angeles. Within our first year, my father was diagnosed with thyroid cancer. He lost his battle three weeks before my sixth birthday. Facing a new country without the steady presence of my father, we were vulnerable—prisoners of hardship in the land of the free.
 
We resettled in the Bronx, in my uncle’s renovated basement. It was meant to be our refuge, but I felt more displaced than ever. Gone were the high-rise condos of West L.A.; instead, government projects towered over the neighborhood. Pedestrians no longer smiled and greeted me; the atmosphere was hostile, even toxic. Schoolkids were quick to pick on those they saw as weak or foreign, hurling harsh words I’d never heard before.
 
Meanwhile, my family began integrating into the local Bangladeshi community. I struggled to understand those who shared my heritage. Bangladeshi mothers stayed home while fathers drove cabs and sold fruit by the roadside—painful societal positions. Riding on crosstown buses or walking home from school, I began to internalize these disparities.
 
During my fleeting encounters with affluent Upper East Siders, I saw kids my age with nannies, parents who wore suits to work, and luxurious apartments with spectacular views. Most took cabs to their destinations: cabs that Bangladeshis drove. I watched the mundane moments of their lives with longing, aching to plant myself in their shoes. Shame prickled down my spine. I distanced myself from my heritage, rejecting the traditional panjabis worn on Eid and refusing the torkari we ate for dinner every day.
 
As I grappled with my relationship with the Bangladeshi community, I turned my attention to helping my Bronx community by pursuing an internship with Assemblyman Luis Sepulveda. I handled desk work and took calls, spending the bulk of my time actively listening to the hardships constituents faced—everything from a veteran stripped of his benefits to a grandmother unable to support her bedridden grandchild.
 
I’d never exposed myself to stories like these, and now I was the first to hear them. As an intern, I could only assist in what felt like the small ways—pointing out local job offerings, printing information on free ESL classes, reaching out to non-profits. But to a community facing an onslaught of intense struggles, I realized that something as small as these actions could have vast impacts.
 
Seeing the immediate consequences of my actions inspired me. Throughout that summer, I internalized my community’s daily challenges in a new light. I began to see the prevalent underemployment and cramped living quarters less as sources of shame. Instead, I saw them as realities that had to be acknowledged, but that could ultimately be remedied.
 
I also realized the benefits of the Bangladeshi culture I had been so ashamed of. My Bangla language skills were an asset to the office, and my understanding of Bangladeshi etiquette allowed for smooth communication between office staff and the office’s constituents. As I helped my neighbors navigate city services, I saw my heritage with pride—a perspective I never expected to have.
 
I can now appreciate the value of my unique culture and background, and the value of living with less. This perspective offers room for progress, community integration, and a future worth fighting for. My time with Assemblyman Sepulveda’s office taught me that I can be an agent of change who can enable this progression. Far from being ashamed of my community, I want to someday return to local politics in the Bronx to continue helping others access the American Dream. I hope to help my community appreciate the opportunity to make progress together. By embracing reality, I learned to live it. Along the way, I discovered one thing: life is good, but we can make it better.`,
                analysis: `This is an exceptionally honest essay that tracks a student's maturation from cultural shame to pride. By juxtaposing their early rejection of Eid and torkari with their eventual use of language skills at a local assemblyman's office, the author demonstrates how they became an 'agent of change.' The focus remains on emotional growth rather than just listing hardships.`
        },
        {
                id: "diversity-marvel-vs-dc",
                categoryId: "supplemental",
                subcategoryId: "diversity",
                title: "Beyond the Impasse: Marvel vs DC",
                author: "Anonymous",
                university: "General / Independent",
                theme: "Intellectual Diversity & Perspective",
                excerpt: "Superhero cinema is an oligopoly consisting of two prominent, towering brands: Marvel and DC...",
                content: `Superhero cinema is an oligopoly consisting of two prominent, towering brands: Marvel and DC. I’m a religious supporter of Marvel, but last year, I discovered that my friend, Tom, was a DC fan. After a vociferous 20-minute quarrel about which was better, we decided to allocate one day to have a professional debate, using carefully assembled and coherent arguments.
 
One week later, we both brought pages of notes and evidence cards (I also had my Iron-Man bobblehead for moral support). Our impartial moderator—a Disney fan—sat in the middle with a stopwatch, open-policy style. I began the debate by discussing how Marvel accentuated the humanity of the storyline—such as in Tony Stark’s transformation from an egotistical billionaire to a compassionate father—which drew in a broader audience, because more people resonated with certain aspects of the characters. Tom rebutted this by capitalizing on how Deadpool was a duplicate of Deathstroke, how Vision copied Red Tornado, and how DC sold more comics than Marvel.
 
40 minutes later, we reached an impasse. We were out of cards, and we both made excellent points, so our moderator was unable to declare a winner. Difficult conversations aren’t necessarily always the ones that make political headlines. Instead, a difficult discussion involves any topic with which people share an emotional connection.
 
Over the years, I became so emotionally invested in Marvel that my mind erected an impenetrable shield, blocking out all other possibilities. Even today, we haven’t decided which franchise was better, but I realized that I was undermining DC for no reason other than my own ignorance.
 
The inevitability of diversity suggests that it is our responsibility to understand the other person and what they believe in. We may not always experience a change in opinion, but we can grant ourselves the opportunity to expand our global perspective. I strive to continue this adventure to increase my awareness as a superhero aficionado, activist, and student, by engaging in conversations that require me to think beyond what I believe and to view the world from others’ perspectives.
 
And yes, Tom is still my friend.`,
                analysis: `This creative essay flips the diversity prompt by focusing on 'intellectual diversity' in a low-stakes but high-passion arena. By treating a Marvel vs. DC debate with professional rigor, the student showcases humor, wit, and a fundamental openness to different perspectives—a key trait for college. It proves that diversity isn't just about heritage, but about how we engage with dissenting ideas.`
        },
        {
                id: "diversity-colombian-first-gen",
                categoryId: "supplemental",
                subcategoryId: "diversity",
                title: "Reconciling Roots: Colombian First-Gen Leadership",
                author: "Anonymous",
                university: "Harvard",
                theme: "Identity Reconciliation & Civic Ambition",
                excerpt: "Leadership was thrust upon me at a young age. When I was six years old, my abusive father abandoned my family...",
                content: `Leadership was thrust upon me at a young age. When I was six years old, my abusive father abandoned my family, leaving me to step up as the “man” of the house. From having to watch over my little sister to cooking dinner three nights a week, I never lived an ideal suburban life. I didn’t enjoy the luxuries of joining after-school activities, getting driven to school or friends’ houses, or taking weekend trips to the movies or bowling alley. Instead, I spent my childhood navigating legal hurdles, shouldering family responsibilities, and begrudgingly attending court-mandated therapy sessions.
 
At the same time, I tried to get decent grades and maintain my Colombian roots and Spanish fluency enough to at least partially communicate with my grandparents, both of whom speak little English. Although my childhood had its bright and joyful moments, much of it was weighty and would have been exhausting for any child to bear. In short, I grew up fast. However, the responsibilities I took on at home prepared me to be a leader and to work diligently, setting me up to use these skills later in life.
 
I didn’t have much time to explore my interests until high school, where I developed my knack for government and for serving others. Being cast in a lead role in my school’s fall production as a freshman was the first thing to give me the confidence I needed to pursue other activities: namely, student government. Shortly after being cast, I was elected Freshman Vice-President, a role that put me in charge of promoting events, delegating daily office tasks, collaborating with the administration on new school initiatives, and planning trips and fundraisers.
 
While my new position demanded a significant amount of responsibility, my childhood of helping my mom manage our household prepared me to be successful in the role. When I saw the happy faces of my classmates after a big event, I felt proud to know that I had made even a small difference to them. Seeing projects through to a successful outcome was thrilling. I enjoyed my time and responsibilities so much that I served all four years of high school, going on to become Executive Vice-President.
 
As I found success in high school, my mother and grandparents began speaking more about the life they faced prior to emigrating from Colombia. To better connect with them, I took a series of Spanish language classes to regain my fluency. After a practice run through my presentation on Bendíceme, Ultima (Bless me, Ultima) by Rudolofo Anaya, with my grandmother, she squeezed my hand and told me the story of how my family was forced from their home in order to live free of religious persecution. Though my grandparents have often expressed how much better their lives and their children’s lives have been in America, I have often struggled with my identity. I felt that much of it was erased with my loss of our native language.
 
In elementary school, I learned English best because in class I was surrounded by it. Spanish was more difficult to grasp without a formal education, and my family urged me to become fluent in English so I could be of better help to them in places as disparate as government agencies and grocery stores. When I was old enough to recognize the large part of my identity still rooted in being Colombian, it was challenging to connect these two sides of who I was.
 
Over time I have been able to reconcile the two in the context of my aspirations. I found purpose and fulfillment through student council, and I knew that I could help other families like my own if I worked in local government. By working through city offices that address housing, education, and support for survivors of childhood abuse, I could give others the same liberties and opportunities my family has enjoyed in this country. Doing so would also help me honor my roots as a first-generation American.
 
I have been a leader my entire life. Both at Harvard and after graduation, I want to continue that trend. I hope to volunteer with organizations that share my goals. I want to advise policy-making politicians on ways to make children and new immigrants safer and more secure. When my family was at their worst, my community gave back. I hope to give that gift to future generations. A career in local, city-based public service is not a rashly made decision; it is a reflection of where I’ve already been in life, and where I want to be in the future.`,
                analysis: `This essay strikes a healthy balance between documenting hardship and showcasing hope. By tracing their journey from 'becoming the man of the house' to finding their voice in student government and Colombian heritage, the author displays immense resilience. While powerful, the essay does suffer from some redundancy; a tighter structure focusing on 'Growth through Responsibility' would make it even more impactful.`
        },
        {
                id: "diversity-ecuador-rainforest",
                categoryId: "supplemental",
                subcategoryId: "diversity",
                title: "Finding My Tribe in the Rainforest",
                author: "Anonymous",
                university: "General / Independent",
                theme: "Environmental Community & Value Alignment",
                excerpt: "I never understood the power of community until I left home to join seven strangers in the Ecuadorian rainforest...",
                content: `I never understood the power of community until I left home to join seven strangers in the Ecuadorian rainforest. Although we flew in from distant corners of the U.S., we shared a common purpose: immersing ourselves in our passion for protecting the natural world.
 
Back home in my predominantly conservative suburb, my neighbors had brushed off environmental concerns. My classmates debated the feasibility of Trump’s wall, not the deteriorating state of our planet. Contrastingly, these seven strangers delighted in bird-watching, brightened at the mention of medicinal tree sap, and understood why I once ran across a four-lane highway to retrieve discarded beer cans.
 
Their histories barely resembled mine, yet our values aligned intimately. We did not hesitate to joke about bullet ants, gush about the versatility of tree bark, or discuss the destructive consequences of materialism. Together, we let our inner tree-huggers run free.
 
In the short life of our little community, we did what we thought was impossible. By feeding on each other’s infectious tenacity, we cultivated an atmosphere that deepened our commitment to our values and empowered us to speak out on behalf of the environment. After a week of stimulating conversations and introspective revelations about engaging people from our hometowns in environmental advocacy, we developed a shared determination to devote our lives to this cause.
 
As we shared a goodbye hug, my new friend whispered, “The world needs saving. Someone’s gotta do it.” For the first time, I believed that that someone could be me.`,
                analysis: `This student expresses diversity through a specific ideological community. The contrast between their 'silenced' home life and the 'tree-hugger' paradise of the rainforest creates a compelling narrative arc. It clearly displays values like ecoconsciousness and compassion. A stronger, less clichéd introduction would further elevate this already solid piece.`
        },
        {
                id: "diversity-indian-texan-sounds",
                categoryId: "supplemental",
                subcategoryId: "diversity",
                title: "Sonic Identity: Between India and Texas",
                author: "Anonymous",
                university: "Rice",
                theme: "Cultural Hybridity & Sensory Perspective",
                excerpt: "India holds a permanent place in my heart and ears... Texan slang. “Couldya pass the Mango seltzer, please, hon?”",
                content: `India holds a permanent place in my heart and ears. Whenever I returned on a trip or vacation, I would show my grandmother how to play Monopoly and she would let me tie her sari. I would teach my grandfather English idioms—which he would repeat to random people and fishmongers on the streets—and he would teach me Telugu phrases.
 
It was a curious exchange of worlds that I am reminded of every time I listen to Indian music. It was these tunes that helped me reconnect with my heritage and ground my meandering identity. Indian music, unlike the stereotype I’d long been imbued with, was not just a one-and-done Bollywood dance number! Each region and language was like an island with its own unique sonic identity. I’m grateful for my discovery of Hindi, Telugu, Kannada, and Tamil tunes, for these discoveries have opened me up to the incredible smorgasbord of diversity, depth, and complexity within the subcontinent I was born in.
 
Here’s an entirely-different sonic identity for you: Texan slang. “Couldya pass the Mango seltzer, please, hon?” asked my Houstonian neighbor, Rae Ann—her syllables melding together like the sticky cake batter we were making.
 
Rae Ann and her twang were real curiosities to me. Once, she invited my family to a traditional Texan barbecue with the rest of our neighbors. As Hindus, we didn’t eat beef, so we showed up with chicken kebabs, instead. Rather than looking at us bizarrely, she gladly accepted the dish, lining it up beside grilled loins and hamburger patties.
 
Her gesture was a small but very well-accepted one and I quickly became convinced she was the human manifestation of “Southern hospitality”—something reflected in each of her viscous, honey-dripping phrases. “Watch out for the skeeters!” was an excellent example. It was always funny at first, but conveyed a simple message: We’ve got each other’s backs and together, we can overcome the blood-sucking mosquitoes of the Houstonian summer! I began to see how her words built bridges, not boundaries.
 
I believe that sounds—whether it’s music or accents—can make a difference in the ways we perceive and accept individuals from other backgrounds. But sound is about listening too. In Rice’s residential college, I would be the type of person to strike up a conversation with an international student and ask for one of their Airpods (you’d be surprised how many different genres and languages of music I’ve picked up in this way!).
 
As both an international student and Houstonian at heart, I hope to bridge the gap between Rice’s domestic and international populations. Whether it’s organizing cultural events or simply taking the time to get to know a student whose first language isn’t English, I look forward to listening to the stories that only a fellow wanderer can tell.`,
                analysis: `This essay masterfully uses sound as a sensory anchor for identity. The use of Texan slang and 'honey-dripping phrases' brings the Southern half of the student's life to vivid reality. While India is described effectively, the essay could be even stronger by bringing the same level of auditory detail (onomatopoeia or lyrics) to the Indian memories.`
        },
        {
                id: "difference-mock-trial-sexism",
                categoryId: "supplemental",
                subcategoryId: "difference",
                title: "Engaging with Difference: Mock Trial Gender Bias",
                author: "Anonymous",
                university: "General / Independent",
                theme: "Gender Equality & Mediation",
                excerpt: "I was thrilled to start the Mock Trial season... Despite being the only female member of the six person leadership team...",
                content: `I was thrilled to start the Mock Trial season at the beginning of junior year. Despite being the only female member of the six person leadership team, I didn’t initially think much about the gender disparity in the group.
We met after school to assign witness and lawyer roles for the case. I proposed to stick with last year’s successful roster: myself and my fellow leaders would play the roles of lawyers. I was shocked when the leadership team instead voted 5 to 1 to relegate me to the role of witness so that another male teammate could take on two attorney roles.
I was confused, hurt, and frustrated. The previous year, I had relished watching my rookie scores rocket to match those of the experienced members around me. Self-doubt crept in and I no longer felt like an equal. I pressed the group for an explanation,
“We just think you’re not aggressive enough, and you seem to be better at the emotional aspects of mock trial.”
As the words washed over me, I realized that they didn’t have any solid evidence to support their claims— breaking one of the most fundamental rules of Mock Trial. They were simply relying on gender stereotypes. This explanation felt so demeaning that I decided to ask our coach for a mediated discussion. My friends shared their goal—doing whatever it would take to win. While winning was important to me, I brought up other things to consider: fairness, commitment, and team members’ growth.
As we struggled to understand each other’s perspectives, the conversation flourished into an honest discussion about sexism and my experience as the only woman in the group. My friends listened, slowly coming to understand my viewpoint, and offered genuine apologies. Rather than fracturing the team, the discussion instilled empathy and generated meaningful discussion. We left the meeting discussing other ways we could further gender equality in the team.
Our team was in danger of collapsing, but we chose to find a way to save the season—and, in the process, saved our friendships as well.`,
                analysis: `This essay succeeds by taking a common activity (Mock Trial) and viewing it through a unique, high-stakes personal angle: gender bias within the leadership. By using the 'rules of evidence' as a metaphor for her peers' flawed logic, the author displays intellectual wit. The pivot from conflict to a 'mediated discussion' showcases a level of emotional maturity and commitment to systemic fairness that highly appeals to top-tier universities.`
        },
        {
                id: "difference-maryville-mascot",
                categoryId: "supplemental",
                subcategoryId: "difference",
                title: "Engaging with Difference: The Maryville Mascot Rebellion",
                author: "Anonymous",
                university: "Princeton / Yale",
                theme: "Systemic Racism & Dialogue",
                excerpt: "A racist culture pervades my small town of Maryville, Tennessee... So, the girl who embodied the Rebel spirit rebelled.",
                content: `A racist culture pervades my small town of Maryville, Tennessee. To outsiders, we seem complicit in this racism through our mascot: the Rebels. In August, my school voted me as Mrs. MHS: awarded to the student who contributes the most to the school and community through extracurriculars, academics, and community service and embodies the “Rebel spirit.” I was grateful for the award, but appalled when the latter label was bestowed upon me. So, the girl who embodied the Rebel spirit rebelled.

“Whether you like it or not, our mascot has foundations in racism. Changing the mascot is the bare minimum that we owe to the students that have been affected by the racism this mascot fuels,” began my (now infamous) social media post.

My post was reposted, sent in groups, and met with intense hatred. 

“The snowflakes won’t let us have anything these days. It’s literally a mascot,” read the most popular comment, insinuating that I was being overly sensitive. The student who wrote this, leader of a group called “Save the Rebels,” ensured that I was alienated as one of the few local supporters. 

I messaged him and transformed an argumentative discourse into a healthy, multiple-day discussion about the roots and depiction of the mascot. We researched each other’s sources and began to understand the opposing side’s perspective. Yet, as we made progress, his friends pulled him away from breaking the barriers of polarization with me. 

Incorporating the lessons I learned from this experience into future dialogues, I believe it would be increasingly impactful for the defenders of the mascot to hear the testimonials of students of color to substantiate my claim that the mascot brought about pain. I would also want to create a safe space where individuals can exchange differing perspectives and attempt to understand each other’s position without fear of social pressure.

At Princeton, I hope to contribute to an environment free of judgment, where I can use the tools that I’ve gained to pave the way for a more effective, respectful dialogue.`,
                analysis: `This is a powerful example of 'Engaging with Difference' because it shows the author's ability to analyze both sides of an argument. By researching her opponent's sources and attempting a multi-day dialogue, she demonstrates that her activism is rooted in intellectual rigor, not just emotion. The conclusion—proposing a 'safe space' for testimonials—reveals a forward-thinking student who plans to be a bridge-builder on campus.`
        },
        {
                id: "difference-spanish-class-rift",
                categoryId: "supplemental",
                subcategoryId: "difference",
                title: "Engaging with Difference: Polarization in Spanish Class",
                author: "Anonymous",
                university: "General / Independent",
                theme: "Intellectual Humility & Listening",
                excerpt: "The past few years have demonstrated a rift between perspectives... my Spanish class perfectly demonstrated this.",
                content: `The past few years have demonstrated a rift between perspectives present throughout the nation, and my Spanish class perfectly demonstrated this. Once during a group discussion, someone shared a cartoon in which a certain elected official with a certain style of hair who lives in a certain house was drawn as an infant. This led to a heated argument. 

Some of us found it relatively humorous, while others were offended, claiming the political caricature was a form of bullying. As the quarreling continued, the focus on the image waned. Insults were being thrown in broken Spanish and it soon became clear people weren’t listening so much as forcing their beliefs and expecting agreement. 

For a while, I just attributed this to differences of opinion. But once members of the group began avoiding each other, I noticed the resentment over who had or had not chuckled at the simply-drawn lines of the cartoon had led to another drawing: that of deep divisions between friends. There seemed to be a lack of ear-lending and little fact-based explanations shared as to why others were perceived as wrong. 

When we revisited this incident in our next discussion, I realized education is different from indoctrination. Explaining something to demonstrate why a certain belief is not a fact is different from forcing someone to change their beliefs by belittling them. Though I considered myself a neutral party in this particular argument, I had taken a side internally. In the future, if I were to find myself in a similar situation, the first thing I would do is limit my bias by attempting to hear the rationale behind both sides before concluding that one is worse than the other.`,
                analysis: `This essay effectively captures the 'incivility of our times' and reflects on it with maturity. The author makes a profound distinction between 'education' and 'indoctrination,' showcasing their ability to think critically about how information is delivered. By admitting their own internal bias, the author demonstrates the 'intellectual humility' that elite colleges value in their campus communities.`
        },
        {
                id: "leadership-jeeva-tutoring",
                categoryId: "supplemental",
                subcategoryId: "leadership",
                title: "Lending My Eyes: Tutoring Jeeva",
                author: "Anonymous",
                university: "UT Austin",
                theme: "Empathy & Service-Oriented Engineering",
                excerpt: "“You can do it. I will help you!” Those words cemented a special bond with Jeeva, a visually impaired young man...",
                content: `“You can do it. I will help you!” Those words cemented a special bond with Jeeva, a visually impaired young man. We accidentally collided one day in a crowded library. Overcome with guilt, I treated him to ice cream at a nearby kiosk. Jeeva was worried stiff about an upcoming diploma exam, so I offered to help. Our spontaneous encounter was the best part of my summer break! I cherish those next ten days that we spent studying.
Tutoring others is my favorite way to learn because it solidifies my knowledge while allowing me to see how others solve problems using different methods. I read aloud to him, summarized key ideas, and we discussed concepts. I realized that Jeeva listens much better than me. At times it seemed like he could anticipate and even read my thoughts just by the tone of my voice. He worked hard, and we both felt more confident about the material. Encouraged by his commitment, I recorded mp3 lessons that he could listen to and review.
I felt a sense of purpose working with Jeeva. The joy in lending my eyes through reading, the challenge in describing objects and material things I took for granted, the satisfaction of transcribing his notes led me to a volunteering organization. I have since spent over 50 hours helping other visually-challenged children and young adults like Jeeva. I also encouraged and facilitated my cousins to volunteer their time helping the visually-challenged. Jeeva is now a teaching assistant at a school.
At UT-Austin, I wish to volunteer my time with the Texas Technology Access Program to design devices for the visually challenged. I believe I can create devices that can anticipate the challenges faced by people with disabilities and that can facilitate simple yet effective steps to prevent injuries.`,
                analysis: `This essay illustrates leadership through a deeply personal story rather than a formal title. By focusing on a single, spontaneous encounter with Jeeva, the author demonstrates service-oriented leadership and empathy. The transition to the 'Texas Technology Access Program' perfectly bridges their personal volunteering history with their future academic goals at UT Austin, showing how their past impact informs their future curiosity.`
        },
        {
                id: "leadership-technical-rocketry",
                categoryId: "supplemental",
                subcategoryId: "leadership",
                title: "Visionary Engineering: Technical Leadership",
                author: "Anonymous",
                university: "UT Austin",
                theme: "Team Coordination & Visionary Engineering",
                excerpt: "I have demonstrated leadership through my technical activities. I enjoy solving technical challenges...",
                content: `I have demonstrated leadership through my technical activities. My resume and extracurricular activities are well-rounded, but I focus on engineering-oriented activities. I enjoy solving technical challenges, and we always compete in groups. I often take the lead in helping direct the overall vision of our efforts. I enjoy coordinating group members to capitalize on everyone’s strengths and minimizing our overall weaknesses. My experience as a co-captain and captain for the TARC Rocketry Challenge Club suggests that I have a track record for accomplishing our goals. I also like taking complex topics and distilling down the most important parts to explain to new members crucial concepts in simple ways.
I have also completed three internships in different engineering fields. My experiences expose me to different professionals, and I take small lessons from each environment and employ them in my life. I see that engineering in the real world also depends on groups, so I recognize the importance of being an effective team plater. I also created an after-school engineering club for like-minded students to discuss current events and the latest technological developments. I see myself continuing my efforts when I enroll at UT. I want to contribute to classroom discussions and join relevant organizations so I can continue exploring my interests and connecting with interesting people.`,
                analysis: `This essay takes a broad approach, highlighting multiple technical activities and leadership roles. It successfully combines teamwork and problem-solving abilities, signaling to the admissions officer that the student has the curiosity required for a rigorous Aerospace Engineering program. The second paragraph's mention of internships and founding a club serves as an effective 'pointer' to their expanded resume, inviting further exploration of their professional potential.`
        },
        {
                id: "leadership-hosa-overcoming-fear",
                categoryId: "supplemental",
                subcategoryId: "leadership",
                title: "From Fear to Second Place: HOSA Leadership",
                author: "Anonymous",
                university: "UT Austin",
                theme: "Overcoming Adversity & Confidence",
                excerpt: "I remember hesitating outside the health science classroom before my first HOSA meeting freshman year...",
                content: `I remember hesitating outside the health science classroom before my first HOSA meeting freshman year. I felt unsure if my time and efforts would be worth committing myself to such a large club. I took a breath and entered.
Before my freshman year, public speaking terrified me. Confronting my fears rather than avoiding them, I registered for HOSA’s “Researched Persuasive Writing and Speaking” competition. I felt foolish competing in an event that showcases my weakest skills. Months before the first round of competition, I began drafting my speech. I practiced for weeks, refining my text, recording my voice, and presenting to the bathroom mirror.
I timidly arrived at the competition, and some senior competitors exacerbated my already stretched nerves by picking on me. When my turn came, I executed my speech exactly as I had dozens of times alone. I felt comfortable with my performance; finishing without embarrassing myself was good enough for me. I listened passively to the award ceremony, and felt shocked when they announced “Second place, Ram Visha!”
I ambled up to the stage, my heart trying to escape from my chest, in a mixed state of wonder and pride in my accomplishment. Aside from my newfound interest in public speaking, I have learned that if you put yourself out there and give your best efforts, trusting in the process will help you grow.
To me, leadership means the courage to overcome your fears, learn from failure, and inspire others to do the same. Serving as an Officer for my school’s HOSA Chapter, National Honor Society Chapter, and Band, I do everything I can to ensure the success of the organization I lead and its members. I will continue these positive habits as I transition to a leader on UT’s campus.`,
                analysis: `By focusing on an 'Adversity' narrative, this essay demonstrates leadership as the courage to overcome personal weaknesses. The story moves from a freshman's fear to a second-place victory, illustrating the author's grit and dedication. Connecting this growth to formal officer roles in NHS and Band rounds out the profile, showing that their personal transformation now empowers them to lead others.`
        },
        {
                id: "leadership-leukemia-investment",
                categoryId: "supplemental",
                subcategoryId: "leadership",
                title: "Lick Leukemia & Investing: Multifaceted Leadership",
                author: "Anonymous",
                university: "UT Austin",
                theme: "Social Advocacy & Entrepreneurial Initiative",
                excerpt: "I am the oldest of three siblings, and I strive to set a positive example... I am proud of starting a local “Lick Leukemia” walk...",
                content: `I am the oldest of three siblings, and I strive to set a positive example for my younger brother and sister. Early in my mother’s battle with Leukemia, I did chores without asking, and they began emulating my behavior. We tried our best to relieve some of the stress in our family. I am proud of starting a local “Lick Leukemia” walk in support of my mother and another family friend who both have leukemia. It is a community effort, and we project to raise $10,000 this year.
At school, I founded our Investment Club. I have grown this into our school’s most popular student ran and funded the organization. I also co-founded our school’s Model U.N., which was the only first-year group at the state competition to win an award. My classmates elected me as Treasurer of our student body where I am responsible for keeping monetary records and handling funds.
On the field, I won the starting quarterback job during my sophomore year after having not played since fifth grade. I led our team to the second round of the playoffs, our first trip in five years.
I will continue serving as a leader in college. You only get one shot at college, and I want to have meaningful experiences helping others. I am excited to work alongside like-minded, driven, service-oriented Longhorns. I want to join the Texas Blazers service organization and Capital Community. I hope to start a business-specific organization. During my visit to Austin, I attended a service at First English Lutheran Church and met a UT student involved with University Campus Ministry. I look forward to reconnecting with him and learning ways to continue my ministry work.`,
                analysis: `This essay effectively balances diverse leadership roles across family, academic, and athletic spheres. It proves that leadership can happen 'at home' through the moving account of supporting a mother through Leukemia. The author's success in competitive environments like McCombs and Model UN, combined with their specific 'Why UT' references, makes them a highly compelling candidate for the McCombs School of Business.`
        },
        {
                id: "leadership-lacrosse-bench-optimism",
                categoryId: "supplemental",
                subcategoryId: "leadership",
                title: "0-12: The Art of Positive Bench Leadership",
                author: "Anonymous",
                university: "UT Austin",
                theme: "Resilience & Bench Leadership",
                excerpt: "Zero wins and twelve losses. Our coach referred to our Junior Varsity lacrosse team as “quite possibly the most unathletic group”...",
                content: `Zero wins and twelve losses. Our coach referred to our Junior Varsity lacrosse team as “quite possibly the most unathletic group he’s ever coached.” As team captain, classmates questioned, and teammates held me accountable for our historically-poor performance. We were mostly sophomores and juniors, and I agree with our coach’s bleak assessment. We didn’t have the size, strength, speed, or experience to compete. I could have answered people’s condescension with negativity, but I instead responded with the opposite. I told them about everything that went right.
We went into every game believing that we could win, and with each successive, sometimes last-second loss, our confidence collapsed, and our morale dropped. Rather than letting each loss carry over to next week’s practice, I took the initiative to challenge my teammates and encourage them to keep working hard. Surprisingly, we didn’t argue much, and I can confidently say that we walked into every game with a winning mentality. It can be easy to become negative, but I think my optimism helped our team come close in many games. In some ways, we outperformed expectations even if that didn’t show up on the scoreboard.
I pride myself on keeping my head held high no matter how tough the situation. It’s easy to be a leader on winning teams. It’s much more difficult to lead perennial losers. I lead through kindness, motivation, and conscientiousness. At UT Austin, I plan to lead a student organization that focuses on fortifying the morale of struggling students. Mental health issues are a big concern on college campuses. I want to be an advocate for struggling students to help alleviate these anxieties and pressures. I trust that my ability to lift people up from pessimistic positions will be a crucial measure of my years at UT.`,
                analysis: `This 'opposite-leadership' response is remarkably powerful. By reframing a winless lacrosse season as a masterclass in resilience and optimism, the author displays character traits that are often more valuable than tactical expertise. Their connection to UT Mental Health Services shows a deep self-awareness and a willingness to apply their lessons of 'lifting others up' to the broader campus community.`
        },
        {
                id: "leadership-football-example",
                categoryId: "supplemental",
                subcategoryId: "leadership",
                title: "Anderson Football: Leading by Example",
                author: "Anonymous",
                university: "UT Austin",
                theme: "Lead by Example & Academic Improvement",
                excerpt: "I am most proud of my athletic leadership. Unlike research and communication, sports don’t come as naturally...",
                content: `I am most proud of my athletic leadership. Unlike research, communication, and the social sciences, sports don’t come as naturally. I played on Anderson’s junior varsity football team, and I took to heart the coach’s emphasis on leading by example. Our football team wasn’t very good and, with morale low, I made it a point to take the lead on sprints and drills. I wasn’t always the most athletic, but I was one of the coach’s favorites because I tried my hardest. I had to compensate against other naturally talented and experienced players.
My fondest memory from high school was when I recovered a fumble during our spring game. The whole defense came off the sideline and started celebrating like I had won the game! Despite my fleeting moment of glory, I realized football isn’t for me. I played golf during my sophomore and junior year. I always stayed after practice to hit by myself no matter how many blisters had broken open. Soon, my teammates looked to me for advice often alongside my lighthearted teasing.
At Anderson, I competed in DECA business finance events. I was elected officer but couldn’t serve since we moved to Singapore, but as a member, I created study guides and tip sheets to help chapter members prepare for competitions. Currently, I am an officer in my international school’s Business Club. I teach members about investing while organizing guest speakers and business projects in collaboration with school faculty.
At UT Austin, I want to join the Computational Finance club and the Undergraduate Investment Team, where I can learn more about quantitative analysis and apply my financial theory knowledge to manage portfolios. I can continue my service past high school by joining UT’s Alpha Phi Omega chapter and give back to Austin.`,
                analysis: `This essay effectively showcases 'growth in unlikely places.' By focusing on JV football—a sport that didn't come naturally—the author provides a different dimension to their application that an elite resume alone might miss. This narrative of grit, combined with clear competencies in Finance through DECA and Business Club, presents a balanced leader ready for the UT Finance community.`
        },
        {
                id: "leadership-pegasus-film",
                categoryId: "supplemental",
                subcategoryId: "leadership",
                title: "Managing Artists: The Pegasus Film Festival",
                author: "Anonymous",
                university: "UT Austin",
                theme: "Project Management & Creative Collaboration",
                excerpt: "During Spring 2017, I was chosen to be the Director of the Second-Annual Pegasus Film Festival...",
                content: `During Spring 2017, I was chosen to be the Director of the Second-Annual Pegasus Film Festival. Over a hundred DFW-area high school students entered their short films in a jury-judged competition. The top twenty-two films were screened at the Studio Movie Grill in Richardson to an audience of over 300 industry professionals, friends, and family. A Q&A with the filmmakers concluded the evening.
My film teacher recognized my ability to visualize the desired outcome, plan a timeline, and complete a large project in a timely fashion. She trusted that I could complete a large task with many moving parts and execute the event smoothly. Given the complexity and magnitude of the festival, I had to engage, encourage, and communicate with my team, the student filmmakers, the community, sponsors, our venue, and industry professionals to make our vision a reality.
Booker T is a community of artists, creative revolutionaries really, but artists tend to get bogged down in the details and fail to finish projects. People who can complete projects are a precious commodity. Managing artists can be like herding cats, temperamental, scratching cats. I hosted many meetings with festival volunteers to build our vision and coordinate roles and responsibilities. I strived to communicate effectively with my peers. Everyone has their own ideas and opinions on the best way to do things. With some advice from my friends and trusted faculty, I incorporated their suggestions to create an agreeable style. Conceding changes and allowing volunteers to “make it their own” really improved morale and performance.
I learned that leadership is a fluid exercise, always changing, and accommodating others to elicit their best ideas and efforts. I intend to continue my efforts in artistic and technology organizations at UT-Austin and the annual South by SouthWest exposition.`,
                analysis: `This essay provides a highly detailed account of project management in the arts. By quantifying the festival's scale (100+ entries, 300+ guests), the author anchors their leadership in concrete results. The humorous 'herding cats' metaphor shows an acute understanding of interpersonal dynamics and an adaptable leadership style that is essential for collaborative environments.`
        },
        {
                id: "quirky-stanford-roommate-sara",
                categoryId: "supplemental",
                subcategoryId: "quirky",
                title: "One Second a Day: Sara's Roommate Note",
                author: "Anonymous",
                university: "Stanford",
                theme: "Authenticity & Every Day Joy",
                excerpt: "Hey roomie! I’m so excited to meet you... but I should probably warn you. By the end of fall quarter, I guarantee that you will be sick of hearing me ask, “Do you want to be in my one second?”",
                content: `Hey roomie!
 
I’m so excited to meet you and share our first year at Stanford, but I should probably warn you. By the end of fall quarter, I guarantee that you will be sick of hearing me ask, “Do you want to be in my one second?”
 
For the past couple of years, recording a one-second video every day has been my way of finding excitement in even the most boring days. I promise that while we’re roommates, my one-second clips will make every day an adventure.
 
Some of my personal favorites:
 
- Ice skating in Millennium Park in Chicago
- Watching Netflix with my 3 sisters (usually Jane the Virgin)
- Baking a cake in physics class
- Petting my 17-pound rabbit, or my 2-pound rabbit
- Family karaoke night featuring the High School Musical soundtrack and my terrible singing 
- Playing in Pep Band at basketball games with my best friends
- Winning Mario Kart (I am a self-proclaimed professional)
- Playing with a friend’s new puppy
- Selfies with my Target coworkers after handling an army of coupon moms
 
I’m excited to capture our first year together at Stanford, from Big Game to our first ski trip. Even on days where studying in our dorm seems like the highlight, I’ll suggest a spontaneous ice cream run so we’re not THAT lame.
 
So when I inevitably ask you to be in my one second, I promise that it’ll be worth it (and you can’t say I didn’t warn you).
 
Sincerely, 
Your soon-to-be bestie/adventure buddy/one-second-a-day-video-taking roommate
Sara`,
                analysis: `This is an exceptional roommate essay because it avoids academic posturing and reveals the applicant's raw personality. The 'list of one seconds' is a clever structural choice that allows for rapid-fire character building—we see her humor (17lb rabbit), her work ethic (Target coupon moms), and her social enthusiasm (Pep Band). The closing sign-off is the perfect final touch of 'child-like enthusiasm' that Stanford's residential community thrives on.`
        },
        {
                id: "quirky-stanford-roommate-yara",
                categoryId: "supplemental",
                subcategoryId: "quirky",
                title: "The Reverse Acrostic: Yara's Roommate Note",
                author: "Anonymous",
                university: "Stanford",
                theme: "Creative Structure & Cultural Identity",
                excerpt: "Are you looking for someone that: Sees you only at night when they are going to sleep? Thrives being taciturn? Unnerves you on the eve of your exams?",
                content: `Dear stranger (but hopefully future roomie),
 
Are you looking for someone that:
 
- Sees you only at night when they are going to sleep?
- Thrives being taciturn?
- Unnerves you on the eve of your exams?
- Doesn’t tell Moroccan fairy tales each night?
- Yowls while sleeping?
- Abhors lending you their clothes?
- Never nibbles on snacks and won’t bring you Moroccan cookies?
- Doesn’t ask you to go for a walk on campus?
- Fidgets when you need help?
- Uproots a spider they cross without asking you for help?
- Not ready to sing with you if you play Beyonce’s songs?
 
Don’t fret if you said no to all of the above. That just means we are the perfect match because I am the opposite of everything I described above! It would be my great pleasure to introduce you to the person with whom you will not just share a room, but also have unforgettable moments. Be ready to spend nights laughing–it is not my fault if I keep you up all night with my jokes. Words cannot express how excited I am to find out what makes you, you! I’ve cleverly hidden our theme within my note. In case you didn’t notice, reread the first letter of each line.
 
P.S: It may be difficult for you to say the “kh” in my name, especially if you don’t speak Arabic or Spanish. So feel free to call me Yara.`,
                analysis: `This essay stands out through its unique 'reverse psychology' structure. By listing what she is *not*, Yara creates a charming puzzle for the reader. The hidden acrostic (STUDY AND FUN) adds a layer of intellectual playfulness. Furthermore, she effectively weaves in her Moroccan heritage—fairy tales, cookies, and the phonetic nuance of her name—to ground the creativity in tangible cultural identity.`
        },
        {
                id: "quirky-stanford-roommate-kpop",
                categoryId: "supplemental",
                subcategoryId: "quirky",
                title: "Dorm Cook & K-Pop: Roommate Note",
                author: "Anonymous",
                university: "Stanford",
                theme: "Friendliness & Cross-Cultural Sharing",
                excerpt: "As an INFJ personality type, I value my relationships and genuinely want to know you better...",
                content: `Hey, future roommate!
 
As an INFJ personality type, I value my relationships and genuinely want to know you better:
 
How do you feel about music? I. Love. Music. My favorite genre is kpop, and since I am an avid kpop lover, I follow many groups (TXT and Twice being my favorites). I apologize in advance if you hear me blasting songs. Admittedly, getting lost in my own little world happens a lot. You can just ask me to tone it down. Or join in!
 
I am also a sucker for dramas. We could watch sweet heart aching love stories or historical ones together! Both are also my cup of tea.
 
Speaking of tea, what is your favorite drink to order? I tend to prefer sweet, bitter coffee and teas. I also like trying out new foods and making them. You know…you could be my taste tester. I like to consider myself an amateur cook. If we somehow miss the dining hours, no need to worry. With my portable bunsen stove, we can make hot pot in the dorm or quickly whip something up suitable to both our tastes.
 
As much as I love all food, Burmese food holds a special place in my heart. I would like to share with you my favorite foods: lahpet thoke (tea leaf salad) and ohn no khao swè (coconut noodle soup). Food is my love language, and I hope that we can share that same connection through exchanging and trying out new foods!`,
                analysis: `This essay is packed with specific, sensory details—from 'sweet, bitter coffee' to the specific names of Burmese dishes. It creates a vivid image of the student's daily life and their willingness to share their culture through 'food as a love language.' While mentioning a 'portable bunsen stove' is a minor risk due to dorm fire codes, the overall sentiment of care and community building remains the primary takeaway for the admissions officer.`
        },
        {
                id: "quirky-stanford-meaningful-1984",
                categoryId: "supplemental",
                subcategoryId: "quirky",
                title: "The Anti-Annotationist: 1984",
                author: "Anonymous",
                university: "Stanford",
                theme: "Intellectual Vitality & Linguistic Growth",
                excerpt: "I am an avid anti-annotationist; the mere idea of tainting the crisp white pages of any novel with dark imprints of my own thoughts is simply repulsive. However, I have one exception...",
                content: `I am an avid anti-annotationist; the mere idea of tainting the crisp white pages of any novel with dark imprints of my own thoughts is simply repulsive. However, I have one exception—my copy of George Orwell’s 1984, weathered and annotated in two languages. While victimized by uneven handwriting eating away at the margins, it is the only novel I still hold beloved despite its flaws. 
 
Two years before reading 1984, I was indulging in the novels of Dr. Seuss, not because of my preferences, but because my reading level was deemed an “A”—the reading level of a toddler. I was certainly anything but that; I was a fresh-off-the-plane immigrant and rising middle schooler who could barely name colors in English. 
 
After reading the likes of A Very Hungry Caterpillar like a madman, my next step was purchasing more advanced books in both English and Korean, so I could understand the nuance and missing details of novels after I initially read them in English. This crutch worked perfectly until George Orwell’s 1984—the first novel I purchased and read without the training wheels of a translated copy. It took me weeks to finish the book; it was painfully slow, like a snail inching toward an arbitrary finish line. 
 
I read the novel twenty-seven times, each reading becoming faster and revealing more information. When I look at my copy of 1984, I still cringe at its weathered and tainted pages, but I can’t help admiring that initial portal between two literary worlds.`,
                analysis: `This essay is a masterclass in using a single object to symbolize a massive personal journey. The juxtaposition of Dr. Seuss and 1984 perfectly illustrates the immigrant experience of linguistic 'training wheels.' The author establishes 'Intellectual Vitality' not just by reading a classic, but by the grit of reading it 27 times to capture every nuance. It reveals a student who deeply values the 'weathered and tainted' proof of their own growth.`
        },
        {
                id: "quirky-stanford-meaningful-ramen",
                categoryId: "supplemental",
                subcategoryId: "quirky",
                title: "A Miracle Meal: Instant Ramen",
                author: "Anonymous",
                university: "Stanford",
                theme: "Creative Storytelling & Family Tradition",
                excerpt: "While most people argue that the best invention is something mechanical or conceptual, I believe it’s the creation of instant ramen...",
                content: `While most people argue that the best invention is something mechanical or conceptual, I believe it’s the creation of instant ramen. There’s little time involvement, deliciousness, and convenience all included in one package. What more could one ask for? The nostalgia packed within instant ramen makes it a guilty pleasure I can’t live without. 
 
During a road trip to Yellowstone, this miracle meal followed my family as we took turns sharing an umbrella under the pouring rain and indulging it in its instant delicacy: we were shivering in the cold, but the heat of the spicy soup and the huge portion of springy noodles warmed our souls instantly. It was an unforgettable experience, and eating ramen has since then followed us to Disneyland, Crater Lake, and Space Needle, being incorporated in our frequent road trips. 
 
It has also come in handy during our wushu competition trips. Often, competitions ended at midnight, making it inconvenient to eat out. In these situations, the only essentials we needed were hot water and instant ramen packages, enough to satiate our spirits and hunger.
 
Instant ramen is also a way my mom and grandma express their care for me. On late nights of doing homework after wushu practice, I usually ate something—sometimes instant ramen—to have a smoother recovery. My mom and grandma usually paired instant ramen with extra toppings like homemade wontons or fish balls—their motto being “instant ramen always tastes better when someone makes it for you.`,
                analysis: `Choosing such a commonplace topic is a bold and successful move. The author transforms a 'commercial' product into a vehicle for family nostalgia and athletic discipline (wushu). The essay succeeds because it is 'information-dense,' revealing road trips, marital arts, and cultural details (fish balls/wontons) through a cohesive, humble theme.`
        },
        {
                id: "quirky-stanford-roommate-angelica",
                categoryId: "supplemental",
                subcategoryId: "quirky",
                title: "Not Exactly Quiet: Angelica's Letter",
                author: "Angelica",
                university: "Stanford",
                theme: "Self-Reflection & Intellectual Curiosity",
                excerpt: "Most people, when first meeting me, describe me as “quiet.” I’m glad I have this chance to tell you that this isn’t really the case...",
                content: `Dear Future Roommate,

Most people, when first meeting me, describe me as “quiet.” I’m glad I have this chance to tell you that this isn’t really the case. Don’t get me wrong: I know how to relax by myself with a good book and a cup of tea and—don’t worry—I always wear headphones when I study. My family and close friends will tell you, though, that once you get to know me, I have plenty to say.

As an aspiring psychology and philosophy double major, long analytical conversations are truly my jam. People fascinate me, so I love to talk with my friends about what everything from our favorite cereals to our phobias say about us (by the way, that would be Rice Krispies and spiders—any interpretations?). If you don’t feel like sharing, though, it’s cool. I make sure to journal every night before bed and write down my dreams when I wake up.

You could say I’m a sucker for human expression. If you ever want to go to a museum or take a poetry class together, I would be delighted. I’m looking to try new things in college though, so if you’d rather bond by going rock climbing or to a comedy night (or whatever you’re into), I’m game.

I look forward to learning about what makes you you.

Sincerely,

Angelica`,
                analysis: `Angelica's essay is strong because it creates a 'framework of transformation'—moving from the 'quiet' stereotype to the analytical, tea-drinking, dream-journaling reality. She bridges her personal habits with her academic interests (Psychology/Philosophy) seamlessly. The mention of 'interpretations' for Rice Krispies shows she is someone who finds intellectual stimulation in the mundane, a key trait for a Stanford peer.`
        },
        {
                id: "quirky-uchicago-bollywood-identity",
                categoryId: "supplemental",
                subcategoryId: "quirky",
                title: "Item Girls & Dowries: Cultural Contradiction",
                author: "Anonymous",
                university: "UChicago",
                theme: "Critical Analysis & Cultural Paradox",
                excerpt: "In a culture where Bollywood’s ‘item girls’ receive fame and glory... I am often filled with shame and even disgust for my own Indian heritage.",
                content: `In a culture where Bollywood’s ‘item girls’ receive fame and glory for their provocative dancing and scant clothing, I am often filled with shame and even disgust for my own Indian heritage. Films and television soaps reinforce gender stereotypes of dominating male characters, while their female counterparts are either passive homemakers or desirable ‘item girls.’ These movies are mainstream and celebrated in my culture, watched by children and grandparents alike.

How can I embrace and respect my culture if this inequality pervades? Because I notice these things, and define them as blatantly sexist, does that make me less Indian?

In a culture where dowries are still regularly exchanged between families, I cannot help but notice the objectification of women that is culturally acceptable and ubiquitous. I cannot understand how Indian women all over the world permit their future family to request money and goods equivalent to their supposed ‘worth.’ This is the feminist and Western approach to dowries However, if I look closer, there can be a degree of justification to this practice. The parents-in-law are given money and luxurious goods for the bride in order to protect her if her husband and breadwinner can no longer work.

While this reasoning does offer some justification for the persistent existence of dowries in the 21st century, it brings new objections to the presumption that the bride will not contribute to the family’s income. I see the world through two lenses as the clash between Eastern and Western culture pervades my every thought and action.

During rare family gatherings, the few times I get to see my extended family, the joy of the reunion is mellowed by what I see. The men and children lounge into the couches, sipping tea and crunching bhel (Indian snack), while chuckling and debating over current events. In the kitchen congregate the women, busy cooking and giggling with each other, but in a constant frenzy to prepare the next meal or brew more tea. Distracted by the simmering chai, this room lacks the same fervent discussion of prevalent global issues. The living room and kitchen stand divided between the men and women. As a female young-adult, I am confused as to where I belong- to which room do I go? While we are one family, the divide remains firm. I feel sick to my stomach, as I alone perceive the waves of sexism that ripple beneath our facade.

Adding to this confusion are my looks. I am a rich mocha, but with too much crème, and suddenly I no longer look Indian. My unique ringlets add fuel to my accusers’ claims. Too pale, and too many curls. I have been called nearly every ethnicity in the globe, from African-American to Latina to Russian. When I explain my Indian heritage, aghast, they cry, “But you can’t be Indian!” Hurt, I leave questioning my appearance and the personality I project.

On the other hand, Hindu culture reveres female empowerment through the worship of powerful female deities such as Kali and Lakshmi. This hypocrisy baffles me. Why I am here? Why am I Indian, when everyone questions my ethnicity, and I, myself, question certain practices?

I realize, I am here to question and ponder, because thinking about the life and environment in which you live is critical. Because the fact remains that I absolutely love my culture. The passionate, unrequited urges to dance at every occasion in a flurry of vibrancy cannot be found anywhere else. I love the intrinsic and irrevocable respect for the knowledge and experiences elders bring. Also, I appreciate the emphasis on family as ultimate supporters and best friends. I even love the sense of duty and service that being a daughter brings. Outwardly, perhaps, I don’t conform to the typical model of an Indian girl, reserved and soft-spoken, with thick, straight hair and rich mocha skin, but I have the heart and soul of one.`,
                analysis: `This UChicago essay is a complex exploration of identity through 'cultural dissection.' The author moves beyond a simple celebration of culture to analyze sexism and socioeconomic traditions (dowries). Her ability to 'look closer' for justification while maintaining critical objections demonstrates the 'willingness to accept ambiguity' that UChicago values. The final pivot—embracing the culture while questioning it—is a sophisticated landing for a high-level academic profile.`
        },
        {
                id: "quirky-uchicago-downton-abbey",
                categoryId: "supplemental",
                subcategoryId: "quirky",
                title: "Grandeur & Shabby Stairs: Downton to Austen",
                author: "Anonymous",
                university: "UChicago",
                theme: "Literary Empathy & Historical Context",
                excerpt: "Downton Abbey makes me fantasize about the elaborate fashions of the 1900s... each lady is a vision of elegance.",
                content: `Downton Abbey makes me fantasize about the elaborate fashions of the 1900s, with long taffeta gowns and hats bursting with feathers and jewels, each lady is a vision of elegance. Each episode and season leaves me fascinated by the grandeur and magnificence of the house, which stands in stark contrast with the peeling grey wood of the downstairs kitchens and servant halls. The servant’s staircase is shabby and dull, and runs parallel to the vibrant tapestry-covered marble staircase for those upstairs. I am puzzled by the smooth refinement of upstairs, juxtaposed with the panting bustle of downstairs.

I constantly marvel at the writers’ ability to craft characters to whom I can relate, despite the gap of a century. The world they lived in is so vastly different from today, yet people of all ages experience comparable emotions such as jealousy, passion, and shame. I am left breathless by the fact that each character faces similar challenges of familial disappointment, honor, and struggle to find a purpose in life; just as we do today.

Technology may change, but human nature remains the same. In addition, the rich historical background of Downtown Abbey provides intricate context to the larger historical events I learn in class. I am transported from merely learning about the implications of World War 1 and the Spanish Influenza, to learning about how these impacted the daily lives of people.

Downton Abbey is more than merely a television show to me. Calling my grandmother in England to discuss in the elaborate plot twists and new character developments has brought us together for a shared passionate experience in the same living room. We avidly discuss Mary’s slew of new suitors and Daisy’s latest heartbreak via video chat. Excitedly we giggle over birth of baby George and Ms. Pattmore’s witty retorts. In a unique twist, Downton Abbey has become something that transcends the thousands of miles that separate us.

In addition, Pride and Prejudice couples my love of fairytales with my irrevocable feminism.

Forever imprinted in my mind is the first time I attempted to read Jane Austen’s masterpiece, as a plucky third grader who brought the book to reading circle. At that young age, I was merely fascinated by the drama of five girls, each with their own tantalizing personality. But now, I realize the subtle life lessons concealed within each page. This novel makes me squash my teenage urges to judge and categorize people instantly, instead realizing that there is something to be learned from all people from all walks of life- especially the people from whom I am the most different. This subtle yet sparkling wit of Mr. Bennett reminds me to laugh more at the chaos and confusion life often brings.

The dysfunctional and hilarious family dynamic provides comedic relief and reminds me of the 19th century equivalent of a reality show. I admire Jane Austen’s subtle yet thought-thought-provoking feminism through Elizabeth, as she pokes fun at her best friend for marrying without love for money and position, something she could never do. Also, I am inspired by Elizabeth’s passionate resolve against being ‘anybody’s fool! I am drawn by my love for English literature, which provides a window to discover historical intricacies that mirror a universal human experience.`,
                analysis: `This essay uses pop culture and literature as windows into historical empathy. By contrasting the 'marble staircase' with the 'shabby servants stairs', the author shows a keen eye for social structures. The connection between Downton Abbey and her British grandmother adds a personal dimension, proving that her intellectual interests bridge familial gaps across thousands of miles.`
        },
        {
                id: "quirky-uchicago-clair-de-lune-remix",
                categoryId: "supplemental",
                subcategoryId: "quirky",
                title: "Classical to EDM: The Art of the Remix",
                author: "Anonymous",
                university: "UChicago",
                theme: "Creative Fusion & Identity Preservation",
                excerpt: "“There is no such thing as a new idea” – Mark Twain. Are any pieces of art, literature, philosophy, or technology truly original?",
                content: `As I entered the bare-walled room, I could see the sky was painted blue through the tinted windows. It was my first day in my new high school where I’d have to spend the next two years. I wanted to make new friends.
 
I started walking towards a boy, introduced myself and exchanged pleasantries. After a few minutes of conversation, the topic of music came up and I introduced him to my love for the iconic classical ambient hit ‘Clair de Lune’. He put on my headphones, the song started playing, and he was amazed by the music’s ethereal, mellow, and serene chords. Or so I thought.
 
You know that awkward feeling when you show a funny video to your friends and nobody laughs? It was equivalent to that.
 
As days passed, I started noticing everyone was only listening to the loud pounds of the bass, the buzz saw synths, the crispy hi-hats, and every other element found in Electronic Dance Music, also known as EDM. Realizing that people in my school didn’t like Clair de Lune because they were emotionally invested in only the EDM genre, I had an idea– “What if I create an EDM remix of Clair de Lune to reach out to the audience of both genres?”
 
I tried to understand what the composer was trying to express through his composition and attempted to create an impression of the classical piece. The main challenge was to add musical elements from relatively two of the most unconventional music genres– Classical and EDM. Incorporating the rich and sometimes heart-wrenching chord structure of Clair de Lune to the multiple layers of EDM saw synths, I adjusted the volume of my instruments to the intensities with which the notes needed to be played and panned the sound in different directions to set the appropriate ambiance.
 
A few weeks later, I uploaded my work to the various Discord music servers that I am a part of with shaky hands. Nervous of what people might interpret my work to be, I awaited the replies I would receive. The server was filled with users from North America, and since I was in India, I realized that most people weren’t active at midnight when I uploaded my mix. I called it a night and went to sleep. When I woke up, my inbox was flooded with a mix of appreciations and suggestions. The users from the server really liked my idea and it went on to become a weekly competition where everyone would try to incorporate multiple genres into one song. I also made my classmates listen to the mix and later made friends who were interested in music production.
 
Music has constantly been transcending and bridging different identities cross-culturally through the fusion of genres. The key lies in capturing the emotions and the structure linked to the song, but most importantly, working to understand diverse cultures.
 
This raises a critical question– are the genres we listen to now truly unique on their own or just a complex amalgam of countless genres throughout history? The answer is that it depends on how experienced an artist is at the art of impression. Honoring instead of degrading, studying instead of skimming, crediting instead of plagiarizing, and transforming instead of imitating will lead an artist to a remix instead of a rip-off. As an artist keeps repeating this process, they’ll make unique decisions– maybe they’ll add an inimitable form of reverb on the synth or include a cymbal crash in their alien music structure. Regardless, those small changes and preferences– in the long run– will amount to a magnitude of alteration in style and develop a completely new identity for an artist. This is when the art practically becomes original while bearing into itself countless unoriginal remixes and impressions of different songs, artists, and genres.`,
                analysis: `This essay perfectly answers the Mark Twain prompt by bridging a personal project with high-level theory. The author's journey from a failed 'Clair de Lune' introduction to a viral Discord remix illustrates the practical application of 'transformation vs imitation.' It highlights the student's technical curiosity (EDM production) and their ability to build community across cultures (India to North America).`
        },
        {
                id: "quirky-uchicago-gastrophysics",
                categoryId: "supplemental",
                subcategoryId: "quirky",
                title: "Bite Years & Farticles: Gastrophysics at UChicago",
                author: "Anonymous",
                university: "UChicago",
                theme: "Playful Scientific Curiosity",
                excerpt: "A major in Gastrophysics at UChicago is not for the faint hearted. You have to have a stomach for it!",
                content: `When I shared the video of me eating fried insects in Thailand, my friends were seriously offended. Some stopped talking to me, while the rest thought I had lost my mind and recommended me the names of a few psychologists. 
 
A major in Gastrophysics at UChicago is not for the faint hearted. You have to have a stomach for it! I do hope I am accepted to it as it is the only University in the U.S. with this unique major. My passion for trying unique food such as fish eye has made me want to understand the complexities of how it affects our digestive system. I understand that Gastrophysics started with a big pang of food, which quickly expanded to famish. Bite years are used to measure the amount of food ingested. I look forward to asking, “How many bite years can the stomach hold?” and “How do different enzymes react with the farticles?” 
 
Gastrophysics truly unravels the physics of food. At UChicago I will understand the intricacies of what time to eat, how to eat and how food will be digested. Do we need to take antiparticle acid if we feel acidity is becoming a matter of concern? At what angle should the mouth be, for the best possible tasting experience? When I tried crocodile meat, I found that at a 0 degree tilt, it tasted like fish and chicken at the same time. But the same tasted more like fish at a negative angle and like chicken at a positive angle. I want to unravel these mysteries in a class by Professor Daniel Holz in gravitational gastrophysics, understanding the unseen strong and weak forces at play which attract food to our stomachs. 
 
I find that Gastrophysics is also important for fastronomy. I want to learn the physics of fasting. How should we fast? Hubble bubble is a good chewing gum; an appetite suppressant in case you feel pangs of hunger. I have read how the UChicago Fastronauts are stepping up to test uncharted territories. Intermittent fasting is a new method being researched, and UChicago offers the opportunity for furthering this research. Which is better: fasting for 16 hours and eating for 8, or fasting for 24 hours twice a week? It is just one of the problems that UChicago offers a chance to solve. 
 
I can also study the new branch it offers that uses farticle physics. It is the science of tracking farticles and how they interact with each other and chemicals in the stomach space. It could give rise to supernovae explosions, turning people into gas giants. It would also teach about the best ways to expel gas and clean the system and prevent stomach space expansion. 
 
I want to take Fluid dynamics 101, another important course in Gastrophysics; teaching about the importance of water and other fluids in the body, and the most important question: what happens if you try to drink superfluids? 
 
I hope to do interdisciplinary courses with observational gastrophysicists and work with environmental science majors to track how much methane is given by the human and animal gastrointestinal tract in the atmosphere and how much it contributes to the global climate change. I believe, with the help of courses in date science, they have been able to keep a track of how much methane is entering each day, and they found that during Dec 24-Jan 3 period, a spike in the methane and ethane levels could be seen. Accordingly, algorithms are being programmed to predict the changes all year round. I would love to use my strong mathematical background to explore these algorithms. 
 
These courses are specially designed by the distinguished faculty of UChicago. Doing interdisciplinary research in collaboration with biological science students to determine what aliens may eat, with fart historians to know more about the intestinal structure of medieval Italians, Japanese, Chinese, Swedish and French people to better their lives is what I look forward to. The Paris study abroad program is an immersion course into fastronomy, where I will have the opportunity to test my self-control with all the amazing French food and desserts around! 
 
My stomach rumbles now, so I am going out to try out new food – hopefully it will be in Chicago a few months later.`,
                analysis: `This essay is the definition of 'UChicago quirky.' By leaning into the puns (farticles, bite years, fastronomy), the author showcases a massive amount of personality while still 'geeking out' on actual scientific concepts. It subtly confirms their research into UChicago faculty (Professor Daniel Holz) and global opportunities (Paris study abroad), proving that behind the humor is a serious, deeply inquisitive student.`
        },
        {
                id: "lor-jordan-english-teacher",
                categoryId: "recommendation",
                subcategoryId: "teacher",
                title: "Teacher Recommendation: Jordan",
                author: "English Teacher",
                university: "N/A",
                theme: "Resilience & Character",
                excerpt: "Jordan has a lot on her mind and more on her plate. When I met her, she was 14, a freshman in my English class, and absolutely irrepressible.",
                content: `To whom it may concern:
Jordan has a lot on her mind and more on her plate. When I met her, she didn’t: she was 14, a freshman in my English class, and absolutely irrepressible. She was game for anything: she made friends with everyone, she joined clubs, and started one when she saw a need. She aced every assignment and always turned in homework that showed careful, thoughtful work. She found a boyfriend, and then found out she was better off without him. She was a firecracker, and clearly among the strongest in her class.
It was clear, then, why she was good with chaos: she lived in a tiny little house with her parents and four sisters, and when a baby brother (finally) appeared during her freshman year, she rolled with that, too: my own son is just a year or so older, and she and I would commiserate about teething and late nights and diapers. From those conversations, I realized that Jordan has the gift and burden of being a practical, sympathetic person—sympathetic enough to be driven to help those in need, and practical enough to see what can be done. So when her mom struggled with a house full of babies and a job, it was always Jordan who put down her homework to go get dinner started or to wipe a snotty nose or to fold a load of laundry. The older girls had their sights on the big world and the younger ones were too little to help—it tended to fall on her.
It was clearly a house with a lot of love and not quite enough resources, and while she had more responsibilities than I wished, I mostly admired how well she handled it.
All that changed spring of her sophomore year when her father died. Being a teacher means watching this happen once every few years. The emotional impact is, of course, brutal, but usually it’s relatively simple: the issue is grief, and time does help. But they have six children in the house, 3 not yet in school, and that’s not a simple problem. It’s a world of responsibility and expense, and it’s not something that time can soothe. I cried when I realized she was working part time, because I know how hard she works at school, and I could imagine the grind of her life each day—from the minute she wakes up until she goes to bed, there is an endless need for a pair of hands at home, and then she goes to school to face a brutal academic schedule. Adding a shift at a fast food restaurant before heading home to juggle toddlers and preschoolers and to somehow get her homework done seemed beyond all reason—but the reason was the simple economic need to avoid being a burden on the family, and to help out with some other expenses. I hugged her when she managed to save up enough to quit during AP exams season. I felt like a weight lifted off me—even the sympathy weight was rough —what was the real one like? Of course, she went right back to work when school let out, and when she went back and asked for her job back, they promoted her to shift manager. She spent the summer running a crew of adult full-time fast food workers, and she saved enough to be able to quit for the school year.
I could not do what Jordan does. But she does it. Every damn day. I don’t know that it ever occurs to her that she could let anything go—she passed most of her sophomore AP exams a month after burying her dad, and had an even stronger performance her junior year despite having no time to even think. She never misses an assignment, and I wish they looked more rushed, because I’d feel less guilty about assigning them. Her grades have stayed good—not as good as they would have been, I think, but good—and she’s continued to take the most challenging course load we offer, including the marathon AP Physics/AP Chemistry course we call SuperLab. She’s heavily involved with YWISE, a STEM research program through the University of Texas at Dallas. More tellingly, she’s maintained a social life—she keeps up with her friends, worries about their problems, gossips about boys, and never, ever complains. She still makes it to meetings of the Girl Club she helped found, to dances and to socials. She still indulges in blue or pink hair dye when she can. She’s still a vital part of our community.
But she always looks tired to me, and a little underfed, and it breaks my heart every day.
Jordan is my favorite in that group—she was extraordinary before, and the tragedy of her sophomore year has tempered her into steel. I want, so desperately, for her to have a chance to go away, to apply all that strength and creativity and initiative to changing the world instead of to serving customers and wiping snotty noses. Jordan will be fine, regardless—she’s proved that these last two years. But we as a society need the kind of person she will grow into if placed into an environment that will point her talents towards targets worthy of them.
She carries my absolute strongest recommendation. I am sure there is some concern that she might have family obligations that will keep her from being able to accept a place in a residential program, but I’ve discussed logistics with her and her mother and I am confident that the family is prepared to live without her in the immediate household. I do expect she will have to work in the summers. If you have any other questions or concerns, please don’t hesitate to contact me.
Sincerely,`,
                analysis: "Professional Recommendation Letter Example"
        },
        {
                id: "lor-taylor-stem-teacher",
                categoryId: "recommendation",
                subcategoryId: "teacher",
                title: "Teacher Recommendation: Taylor",
                author: "Anonymous Teacher",
                university: "STEM Magnet",
                theme: "Nuance & Adaptability",
                excerpt: "Taylor managed to find the one school in America where he’d be the odd man out, and he was as good for us as we were for him.",
                content: `To whom it may concern:
Taylor managed to find the one school in America where he’d be the odd man out, and he was as good for us as we were for him. He bridges some very different worlds found in highly selective institutions, and I think he’d be a fabulous resource for any such community.
On one hand, Taylor is brilliant: I’ve been in advanced academics and working with extraordinarily talented students for 15 years, and Taylor is, without a doubt, among the strongest students I’ve ever worked with. His faculty for language, in particular, is extraor dinary: he’s one of those analytical/verbal people—he thinks like a philosopher. He can read anything, however archaic or abstract, and never misses nuance or tone. He enjoys cleverness with language—not the easy cleverness of puns but the intricate interplay of sound and meaning that make a sentence or a phase perfect. He writes flawlessly—his natural voice is straightforward and organized and efficient. His scores reveal a similar aptitude for math and science, though I really think even there he’s a word guy—his thinking, his understanding, is verbal in nature. His work ethic is beyond reproach: every assignment done flawlessly, tests studied for, cello practiced, community involvement accomplished. He makes busy look easy.
On the other hand, Taylor is defined by his Evangelical Protestant faith, and he very much belongs to a suburban, affluent Evangelical community. I’m talking church Sunday morning and Wednesday night, Young Life and Fellowship of Christian Athletes. This is a pretty common community in America, but it’s not common at this school, for a variety of reasons: our student body is poor, urban, and minority. We are a STEM magnet with a decidedly secular feel. What with one thing or another, we have more openly gay atheist boys than evangelical Christians at this school, and more kids would admit to being undocumented than being pro-life. When 14-year old Taylor got here, straight from a little parochial white-flight school in the suburbs, it must have felt like he’d arrived in Gomorrah, but with a Freshman Calculus class. But instead of running for it (which I think he seriously considered), Taylor adapted—and the way he adapted is a testimony to his character and the key to why he will be such an important asset in an academic community.
For one thing, Taylor always brings his full intelligence and analytical ability to bear on his faith. There are strains of Evangelical Protestantism that discourage active and sincere questioning, but that is not Taylor’s way. He questions everything, and he always embraces nuance and tone. So when he was suddenly immersed in an environment that challenged rather than reinforced his faith, he didn’t feel threatened—rather, he appreciated the chance to really explore his own beliefs in a new context. Furthermore, his analytical nature means he is able to compartmentalize and to appreciate people that are truly different than he is. I, myself, could not be more different than Taylor in this way—I pretty clearly lean far left, and I know I’ve used cuss words in front of him he probably never even heard before—but we’ve always had a relationship defined by mutual respect and an honest willingness to learn from each other.
Second, he’s a really nice young man who makes friends readily. I’ve watched him develop deep friendships with students so very different from him—racially and socioeconomically, of course, but also ideologically. He has really high and specific ethical standards for himself, but he doesn’t worry about other people. He’s used these last four years to learn about worlds he didn’t know existed, and it’s made him humble and thoughtful. We’ve had other, similar students in his position that didn’t react as gracefully: suddenly being the minority is jarring, and some students react with resentment. Taylor, though, understands his own situation is a shadow of what many of his classmates face in other contexts, and rather than become bitter, he’s become sympathetic and wise.
In many ways, college is traditionally the place where students like Taylor have the opportunity to learn what Taylor already knows—how to get along and work with people that are different than themselves. Taylor will be a catalyst for that process: he can move comfortably in literally any company, and he can translate between very different people—and teach them to connect to each other. If I were putting together a group of students for a long term research program and I was worried about group cohesion, Taylor is the person I’d select because he would be the model and the architect for mutual respect and cooperation. Also, he could write the paper.
Taylor thinks he’s going to be an engineer. No one here believes him. He’ll get the engineering degree, but it’s clear to us he’ll end up doing something larger than that: his skill set is too large, his interests and passions too broad, his gifts for working with people too profound. I don’t know exactly what he will do—entrepreneur, author, large-scale project manager?---but it will be remarkable. He’ll be a huge asset to your community from day one, and be a credit to the institution for decades after. He carries my very strongest recommendation. If you have any questions or concerns, please don’t hesitate to contact me.
Sincerely,`,
                analysis: "Professional Recommendation Letter Example"
        },
        {
                id: "lor-taylor-amanda-ashmead",
                categoryId: "recommendation",
                subcategoryId: "teacher",
                title: "Teacher Recommendation: Taylor (Humanities)",
                author: "Amanda Ashmead, Humanities Chair",
                university: "N/A",
                theme: "Academic Mindset",
                excerpt: "Somewhere on your campus you have a professor who will be really glad you accepted Taylor. He’s that kind of student...",
                content: `To whom it may concern:
Somewhere on your campus you have a professor who will be really glad you accepted Taylor. He’s that kind of student—the sort to be liked and respected by his classmates, but really appreciated by the professors who will see what is so clear to any adult paying attention—Taylor has the soul of an academic. Right now, he thinks he’s getting a degree in a STEM field and then a job, but that’s just because he’s the first in his family to go to college and he doesn’t even know the world he’s best suited to even exists. He’ll get the STEM degree, but he won’t stop there, and he’ll find his place in the world where complex thought justifies itself.
Taylor is brilliant. I don’t know the absolute number of National Merit Semi-Finalists that are poor, first-generation children of immigrants coming from a non-English speaking home, but I’m sure it’s appallingly low. He can read anything—not just decode, but understand nuance and tone and context. He writes organized, effective prose. Taylor has barely begun to tap his own potential—even here, I’m not sure he’s ever really had to put his head down and work. Outside projects, like Robots and Academic Decathlon, have given him the opportunity to really extend himself, but even then he’s been working off of someone else’s blueprint, and that’s not the same. This is one that is going to explode a few years into a true intellectual.
Taylor likes to talk, but not in a large class. He’s best in a small group, or during office hours: he’s the sort that thinks so fast that he needs to speak slowly—any question posed to him evokes not a response, but a mental avalanche of responses, objections, counter-responses, analogies, and implications that he needs to process before he talks, needs to almost physically keep himself in check to insure that he isn’t leaving his listener far behind. His essays were fantastic— Taylor at his best when he has time and space to really develop an idea. While Taylor certainly has a breadth of knowledge to draw upon, in his heart he is a deep thinker—he wants to take ideas and see how far he can go with them. He’s just the sort that thrives on really complex and intricate research.
It would be easy to mistake Taylor for being a little cold. He worries he is a little cold, because it is very clear to him that he has more control over his external emotional reactions than the average teenager. But he’s not—he’s cerebral, definitely, and he values rationality, but he also has a great sense of humor: Taylor was the only kid in class that caught my most sophisticated jokes, and his subtle half-grin of approval always made me feel like I’d accomplished something. He can be incredibly intense when he is intrigued by a new idea, and he knows how to listen, really listen, when he’s hearing something new. He also can be moved to anger on rare occasions—he doesn’t yell or wave his arms, but Taylor is sensitive to cruelty and thoughtless ignorance. He is well liked, and has a circle of friends, but he struggles to connect easily to his peers as a whole—he’s not given to adolescent banter. But when he feels safe—when he doesn’t worry he’s talking over someone’s head or boring the life out of them--he’s fantastic: warm, engaged, thoughtful and willing to listen. He likes this school and he likes his classmates, but he hasn’t quite found his people yet. I’m pretty sure that he will find them in the world of academia.
Taylor is really special. I am quite fond of him, and absolutely convinced he will make meaningful contributions to the stock of human knowledge. He carries my strongest recommendation.
If you have any questions or concerns, please don’t hesitate to contact me.
Sincerely,
Amanda Ashmead, Humanities Chair`,
                analysis: "Professional Recommendation Letter Example"
        },
        {
                id: "lor-jordan-ap-lit",
                categoryId: "recommendation",
                subcategoryId: "teacher",
                title: "Teacher Recommendation: Jordan (AP Literature)",
                author: "Amanda Ashmead, Humanities Chair",
                university: "N/A",
                theme: "Self-Reflection & Maturity",
                excerpt: "I have such a soft spot for Jordan. In the year he was in my AP Literature class, I really learned to respect his unusual ability to reflect on his own life...",
                content: `To whom it may concern:
I have such a soft spot for Jordan. In the year he was in my AP Literature class, I really learned to respect his unusual ability to reflect on his own life, and to use his own self-reflection to set goals and expectations that are meaningful and appropriate to who he is, not merely a response to others’ expectations.
In most any high school in America, Jordan would be an academic superstar. Here, at an exclusive STEM magnet, he’s very solid middle. This is a difficult adjustment for many students, and many of them handle it poorly. They make excuses, or they get discouraged, or they start slacking off so that they can pretend they never wanted success in the first place. Jordan did none of that. He recognized pretty early that he was going to have to work very hard just to keep up with the pack, and so he buckled down and did that. Again, I want to reiterate that “middle of the pack” is still more advanced than what any normal school offers—not just taking and passing multiple AP STEM classes, but opting into challenging humanities electives as well.—but here, that feels like a lot of work to be nothing special. Jordan wasn’t at all discouraged about that—his goal has always been self-improvement, not using others as a yardstick. In one of his college essays, he talked about how maturity is about endurance, and putting one foot in front of the other even when it seems like the ultimate goal is out of reach. Jordan figured that one out entirely on his own, and I tend to think a young man who understands that simple truth is well nigh unstoppable.
While Jordan might have been middle of the pack in his STEM courses, he was one of my better English students. His observations and insights into characters in great literature were always impressive, and grew better and better throughout the year as he learned to appreciate the medium more. I always noticed that he was unusually sensitive to character’s internal struggles and doubts, their unspoken motivations. His essays and classroom commentary often presented very clever ideas that were totally unrelated to my own interpretations or previous class discussions. I think this is an outgrowth of his tendency to intensively reflect on his own motivations and internal processes. His own personal aesthetic is a wonderful combination of STEM-nerd, gentle vaquero, and small town friendly. That’s absolutely something he constructed himself out of his own reflections and what suits him, because nowhere in the world combines all those world-views.
Jordan is also a very fluent writer. The structure of AP exams works against him here—Jordan is a think-write-think-write type, and AP exams are about disgorging facts and analysis in a rough draft, showing you can produce the ideas in a hurry and assuming you can refine them later. For Jordan, refining is part of the thinking process and he can’t do the one without the other. I think this held him back significantly, and that he will really thrive in college where the extended researched argument becomes the standard product. Jordan’s brain was made for extended researched arguments.
Finally, Jordan is a sweetheart.  He’s so nice, so intensely sympathetic to others.  He’s had some rough knocks in his life—a terrible divorce, and a mother that I think has not coped with that well. He’s been largely on his own in terms of direction—everything he’s accomplished has been the product of his own ambition and ability to figure things out. I am a worrier by nature, but I don’t worry about Jordan Moreno: he’s proven his ability to be successful. I will miss him. Jordan carries my strongest recommendation. If you have any questions or concerns, please don’t hesitate to contact me.
Sincerely,
Amanda Ashmead, Humanities Chair`,
                analysis: "Professional Recommendation Letter Example"
        },
        {
                id: "lor-jordan-perseverance-verbatim",
                categoryId: "recommendation",
                subcategoryId: "teacher",
                title: "Teacher Recommendation: Jordan (Perseverance)",
                author: "Amanda Ashmead, Humanities Chair",
                university: "N/A",
                theme: "Overcoming Adversity",
                excerpt: "You look at Jordan’s application, and the story writes itself—fantastic test scores, pathetic grades, weak extracurriculars...",
                content: `To whom it may concern:
You look at Jordan’s application, and the story writes itself—fantastic test scores, pathetic grades, weak extracurriculars--anyone would look at those and think “smart, but doesn’t apply himself—will huddle in his dorm playing video games until he flunks out. Next!” That’s the obvious, easy interpretation—it’s how a lot of us interpreted him, for years—but it couldn’t be further from the truth. Please, please, please take a deeper look at this application and consider giving him the chance he needs to demonstrate the amazing young man that he is.
First, bluntly, Jordan is a victim of sustained abuse. CPS has been called, the situation has been mitigated, we are watching him, but by the time we became aware of this, much of the damage had been done. As a freshman, he sat in my class with a flat affect and refused to answer questions or do homework. He often looked exhausted. I assumed---we all assumed—he was a student who really didn’t want to be in our specialized STEM program and he was committing academic suicide so that he could return to his home school. I did ask if there was anything wrong at home, but he very convincingly blew that off. It wasn’t until his sophomore year that the situation was revealed to us, and even then, it came in bits and pieces—he kept talking about “corporal punishment” and really didn’t seem to understand that bruises up and down your arms and knees stiff from hours of kneeling were not a “dark quirk of culture”--which was how he rationalized this to himself. The abuse came entirely at the hands of his father, and while the physical punishment has stopped, it is still not a happy or healthy household. Jordan has learned some hard lessons at his father’s hands, and they continue to affect him.
First, Jordan is a stubborn son-of a-bitch. He has a perfect poker face—I think you could cut his fingers off and he wouldn’t flinch. That stoic face is his way of deflecting others, of avoiding notice or interaction, but it’s also his way of not giving in to his father—in a situation where he had no control and no way out, he at least made sure not to give anyone the satisfaction of seeing him hurt. I admire that in him, but it worked against him here: we didn’t reach out as quickly as we should have, we didn’t push him enough, because we didn’t really think he gave a damn about anything. It’s a mistake that haunts me. But at the same time, I know that rock-solid perseverance will be an asset to him. His perspective on what counts as a “challenge” is entirely different from other students his own age, and while I’m sure he will face real challenges as a student and as an adult, he will have the unimaginable luxury of being able to respond to those challenges, to act. After what he has been through, he will always see that opportunity as a gift to be taken advantage of.
There are other lessons I wish he hadn’t learned so well: he’s been taught that he isn’t entitled to anything—not love, not support, not safety. It stops him from asking for help when he should, and it’s going to be a long path for him to learn that he’s allowed to expect things from the people that love him. He’s learned that strength is about enduring, not advancing—his hero is his mother, a war refugee who has fought her whole life to survive. His own situation is exasperated by his father’s emphasis on success: every ambition Jordan ever developed—from spelling bee to karate to academic success—turned into a justification for rage and abuse when he “failed”--and it didn’t matter how far he advanced, as long as there was anyone anywhere who achieved at a higher level, he was made a target. I have no doubt Jordan will be successful at school, in the sense that he will graduate in 4 years with reasonably good grades. I hope for more, though— that he will find a community that teaches him that it’s safe to want things, to fight for them.
He’s very slowly opening up to a few of us, and we’re discovering a wonderful young man. Even when he appeared to be a sullen 14-year old, I liked him, though I couldn’t have told you why—mostly I liked the way his face and body language reacted when we discussed literature, because it was the sort of reaction that showed me he was sensitive, sympathetic, and sophisticated in his worldview. He also genuinely loves learning: his SAT scores show you that he’s plenty capable, but the AP scores show more—that even when he couldn’t do homework, he always wanted to learn and understand. Even when he was staring off into space, he was paying attention. He’s passed seven AP exams already--and the two he didn’t pass were taught by teachers who are . . . strongly authoritarian, which did not encourage his best. He has a fantastic sense of humor; it’s hard to make him smile—but when he does, it’s in response to something truly clever.
Jordan is going to break this cycle and turn into the sort of person who speaks out against the sort of hell he faced. He has so, so much to give if only we can get him to a safe space where he can undo some of the damage done to him and start to rebuild himself. If you have any questions or concerns, please don’t hesitate to contact me. I mean that.
Sincerely,
Amanda Ashmead, Humanities Chair`,
                analysis: "Professional Recommendation Letter Example"
        },
        {
                id: "lor-taylor-anachronism",
                categoryId: "recommendation",
                subcategoryId: "teacher",
                title: "Teacher Recommendation: Taylor (Anachronism)",
                author: "Amanda Ashmead",
                university: "N/A",
                theme: "Work Ethic & Unique Upbringing",
                excerpt: "Taylor is a bit of an anachronism. He’s been raised by his grandparents using a model that was honestly a little old-fashioned...",
                content: `To whom it may concern:
Taylor is a bit of an anachronism. He’s been raised by his grandparents using a model that was honestly a little old-fashioned when they were raising their own kids: it’s all early to bed, early to rise, plenty of chores, and you aren’t going to spend all summer sitting around young man, you can be chopping wood and mowing lawns to save for college. There was also a great deal of unconditional love and mutual respect. Together, that combination has shaped a strong-minded, hard-working, ethical and rational young man who manages to be both socially awkward and oddly charming.
Taylor has an interesting brain. He soaks up information like a sponge, reading at the very highest level: he has an enormous, robust vocabulary and is comfortable with long and archaic texts. He reads the way a person reads when raised by grandparents who didn’t believe in screentime and who were happy to find him some chores if he were bored. He talks all that information and files it away in some crazy system, the cognitive equivalent of a Mad Scientist’ journals. I know this is true because he makes connections that are at times brilliant, at times spurious, and always interesting. He processes everything through quirky analogies, odd comparisons, and non-intuitive connections. When the connections are spurious, he’s very polite and very willing to listen to the counter-argument, but never blindly accepts someone else’s point of view—Taylor has to come to his own understanding. Luckily, all that information and all those connections mean that his own understanding is very complex, and while he at times gets lost in the forest of his own vast mind, he always finds his way back.
Taylor’s incredible ability to read is matched by a strong narrative voice: he’s a good writer. Here, again, there’s a tendency to organize information in a way that’s somewhat counterintuitive—the order that makes sense to him, his sense of what is important and what is detail—is sometimes a little non-typical, but there’s an undeniable brilliance there and a strong natural voice. I always genuinely looked forward to reading his essays. He’s much more interested in ideas than in people: even in literary analysis he always wanted to quickly bypass questions of character and motivation and get into the really complex abstract ideas underlying the personal.
Taylor is a hard worker with absolutely no expectations of short-term gratification. He’s very willing to set a long term goal and work toward it in stages, and supremely confident that if the plan is good and he does what he needs to do, it will work out in the end—however far away that is. He was raised in a household where hard-work and self-reliance and general competency were important virtues, and he’s adopted that worldview without hesitation.
Taylor would be a wonderful addition to any academic community. He’s absolutely academically on par with any of his peers, but his background, his frame of reference, his sense of how things connect is so unique that he can’t help but inspire true intellectual dialogue. He’s patient and polite and respectful and he truly loves to learn. I highly recommend him.
If you have any questions or concerns, please don’t hesitate to contact me.
Sincerely,
Amanda Ashmead`,
                analysis: "Professional Recommendation Letter Example"
        },
        {
                id: "lor-mark-counselor",
                categoryId: "recommendation",
                subcategoryId: "counselor",
                title: "Counselor Recommendation: Mark",
                author: "School Counselor",
                university: "Lehigh University",
                theme: "Versatility & Dedication",
                excerpt: "It is with great enthusiasm that I write this letter of recommendation for Mark, an incredibly talented and dedicated student...",
                content: `It is with great enthusiasm that I write this letter of recommendation for Mark, an incredibly talented and dedicated student with whom I have been fortunate to work closely as his school counselor for the past three years. Mark possesses an unwavering determination and passion for learning, alongside a unique ability to balance his academic pursuits with a diverse range of extracurricular activities. I am confident that his skills, personality, and work ethic will make him an invaluable asset to the Lehigh University community.
 
Mark’s commitment to his education is evident in his strong academic record, which includes a 3.75 GPA, a 31 ACT score, and a plethora of honors and AP classes. Despite his rigorous coursework, Mark never shies away from responsibility or complains about his workload. Instead, he tackles each challenge head-on and consistently displays an eagerness to learn and grow.
 
In addition to his academic prowess, Mark has made significant contributions to our school community through his involvement in numerous extracurricular activities. As both the business manager for the school newspaper and co-editor of the yearbook for two years, he transformed our town’s perception of the school newspaper from a charitable endeavor to a valuable advertising platform. Mark’s keen business sense led him to create an advertising rate schedule that increased revenue and expanded the paper’s coverage, demonstrating his aptitude for economics and leadership.
 
Mark’s artistic talents are also evident in his outstanding photography skills, which have greatly enhanced both the newspaper and yearbook. As a member of our school’s drama club and Sound of Music play, a viola player, and a varsity linebacker on the football team, he showcases his versatility and ability to excel in various pursuits.
 
His role as the Vice President of the Physics Club and three-time class treasurer further exemplify his dedication and commitment to making a positive impact on our school. Mark’s self-motivation and discipline have allowed him to prioritize his goals and say no to opportunities that might detract from his overall success.
 
I am confident that Lehigh University is the perfect environment for Mark to continue pursuing his passion for economics while also exploring his remarkable artistic abilities. The supportive community and diverse range of opportunities available at Lehigh will undoubtedly help Mark thrive and achieve his full potential.
 
In summary, Mark’s determined, creative nature, paired with his exceptional academic and extracurricular accomplishments, make him a truly deserving candidate for admission to Lehigh University. I wholeheartedly endorse his application and believe that he will be an outstanding addition to your undergraduate community. Please do not hesitate to contact me if you have any questions or require additional information.`,
                analysis: "Professional Recommendation Letter Example"
        },
        {
                id: "lor-monica-counselor",
                categoryId: "recommendation",
                subcategoryId: "counselor",
                title: "Counselor Recommendation: Monica",
                author: "School Counselor",
                university: "N/A",
                theme: "Resilience & Personal Growth",
                excerpt: "It is with immense pleasure and genuine enthusiasm that I recommend Monica for admission to your undergraduate program.",
                content: `t is with immense pleasure and genuine enthusiasm that I recommend Monica for admission to your undergraduate program. As her school counselor for the past four years, I have had the distinct honor of observing Monica’s remarkable growth and unwavering dedication to her education and personal development. She is a young woman of exceptional talent, resilience, and determination, who has consistently risen above the challenges that life has presented her with.
 
Monica’s commitment to her academics is truly commendable. Boasting an unweighted GPA of 3.80 and a class rank of 32/675, she has completed 11 Honors courses and 5 AP/IB courses, all while facing significant academic challenges. Monica struggled with math in 9th and 10th grade, but she did not let this deter her. Instead, she demonstrated the kind of resilience and growth mindset that set her apart from her peers. Monica’s potential need for additional support or tutoring in math should be seen not as a weakness, but as an opportunity for her to continue overcoming challenges and developing her strengths.
 
Monica’s passion for the arts is evident in her extracurricular activities. As the President of the Photography Club, she has displayed outstanding leadership skills, organizing events and activities for her fellow students. Her photography talents have been recognized with a District Art Show Excellence Award. In addition, Monica has been a dedicated member of the International Thespian Society and has received awards for her performances in the school’s drama program. These accomplishments speak volumes about her creativity, dedication, and ability to excel in various fields.
 
Despite experiencing anxiety throughout high school, Monica has shown tremendous resilience and has learned to work through her challenges, leading to a vast improvement in her overall well- wellbeing and academic performance. Her progress in this area is a testament to her strength of character and her commitment to personal growth.
 
Monica’s difficult home environment has required her to take on significant responsibilities, such as caring for her younger siblings while her mother works long hours. Yet, she has maintained a strong sense of responsibility and commitment to her family. Her involvement with the Interact Club and her selection for the National Honors Society further demonstrate her dedication to serving her community and her academic excellence.
 
I wholeheartedly endorse Monica’s application for admission to your undergraduate program. She is an inspiring, compassionate, intelligent, and determined young woman who possesses a clear sense of purpose and direction. I have no doubt that Monica will continue to thrive, making significant contributions to her college community and beyond. Please feel free to contact me if you require any further information.`,
                analysis: "Professional Recommendation Letter Example"
        },
        {
                id: "lor-jessie-counselor",
                categoryId: "recommendation",
                subcategoryId: "counselor",
                title: "Counselor Recommendation: Jessie",
                author: "School Counselor",
                university: "N/A",
                theme: "Academic Excellence & Community Leadership",
                excerpt: "I am writing to give my highest recommendation to Jessie for your undergraduate program.",
                content: `I am writing to give my highest recommendation to Jessie for your undergraduate program. Over the past three years, I have had the privilege of knowing Jessie as her school counselor, and have witnessed her incredible growth as a student, a community leader, and an aspiring math educator. Jessie’s great passion for mathematics is paralleled by her commitment to fostering inclusivity and giving back to her community, making her an exceptional candidate for your college.
 
Jessie’s dedication to her academic pursuits has led her to exhaust the highest level of mathematics offered at our school by her sophomore year. Undeterred by this limitation, she enrolled in multivariable calculus and linear algebra through a dual enrollment program, exemplifying her drive to constantly challenge herself. Jessie’s love for math has inspired her to pursue a career as a math teacher or professor, and I have no doubt that she will inspire the next generation of students.
 
Jessie is a star student and is high-achieving in all her endeavors. She is ranked third in the class of 500 students, has a 4.32 weighted GPA, and a 35 ACT score. Outside of the classroom, she is the student body vice president and captain of the track team, where she has earned three varsity letters and placed second in regionals in the 800m event.
 
However, what sets Jessie apart is her innate desire to help others. Realizing the need for accessible tutoring in our school, Jessie founded Math on a Mission, a free math tutoring program aimed at assisting low-income students. Her initiative has grown from a simple idea to a team of 10 dedicated tutors who offer both in-school and after-hours support. This program not only showcases Jessie’s resourcefulness and leadership skills but also her deep-rooted empathy for her fellow students.
 
As student body vice president, Jessie has been instrumental in implementing measures to make our school more inclusive and welcoming. She’s established a free pantry where students can give and take food, as well as a free closet where students can give and take gently-used clothing. These resources have made a significant impact on the lives of her fellow students, as the majority of our district is low-income and receives free or reduced lunch.
 
In all my years as a counselor, I have seldom come across a student as passionate, driven, and committed as Jessie. Her unique combination of academic excellence, leadership, and a genuine desire to make a difference in the lives of others make her an ideal candidate for your institution. I wholeheartedly endorse Jessie for your college, and I am confident that she will not only thrive in your academic environment, but also make a lasting impact on your campus community.
 
Thank you for considering my recommendation. Should you require any further information, please do not hesitate to contact me.`,
                analysis: "Professional Recommendation Letter Example"
        },
        {
                id: "lor-noah-counselor",
                categoryId: "recommendation",
                subcategoryId: "counselor",
                title: "Counselor Recommendation: Noah",
                author: "School Counselor",
                university: "N/A",
                theme: "Mental Health Advocacy & Compassion",
                excerpt: "It is my pleasure to recommend Noah for admission to your undergraduate program. Noah is truly special for his compassion and commitment to helping others.",
                content: `Dear Admissions Committee,

It is my pleasure to recommend Noah for admission to your undergraduate program. As his school counselor for the past four years, I have witnessed the exceptional contributions that Noah has made to our school community. Not only is he an excellent and hard-working student, but he has dedicated himself to enriching the lives of students and faculty around him. Noah is truly special for his compassion and commitment to helping others.

Noah has committed himself specifically to bringing mental health awareness to the school. After enduring the tragedy of losing a family member to suicide, Noah devoted himself to bringing greater education about mental health into the curriculum. He said that he wanted to break the stigma around these discussions. Noah found a branch of the Mental Health Foundation's Live Laugh Love Club at the school. Noah has helped bring in speakers to address the school as a whole, held events, and led campaigns about the devastating effects of bullying. While he started out high school on the reticent side, he has since grown to have a powerful voice in our school community, speaking up for what he believes in and proving himself to be an impassioned and inspiring leader.

Noah plans to study psychology in college and would like to work in the field of psychology, social work, or non-profits. His academic accomplishments are especially impressive in AP Psychology and the humanities. Noah's teachers describe him as an insightful, sensitive, perceptive, and diligent student. He has truly proven his resilience and strength through the challenging circumstances in his life. The hardship Noah has faced has motivated him to advocate for mental health awareness as a core aspect of our school's climate and curriculum. Noah's efforts around bullying prevention and social-emotional wellness will continue to nurture our students' well-being long after he's graduated.

Noah has my enthusiastic recommendation. He is a kind, compassionate, intelligent, and strong person who has a clear sense of direction and purpose. I am confident that he will bring the same warmth, support, insight, and hard work to his college classes and social community. Please do not hesitate to contact me for any further information.

Sincerely,`,
                analysis: "Professional Recommendation Letter Example"
        },
        {
                id: "lor-brett-counselor",
                categoryId: "recommendation",
                subcategoryId: "counselor",
                title: "Counselor Recommendation: Brett (Theater & Drama)",
                author: "School Counselor",
                university: "N/A",
                theme: "Theater, Passion & Storytelling",
                excerpt: "I am excited to provide this letter of recommendation for Brett, or should I say Hamlet, John Proctor, or Erik? Brett is an incredible actor with contagious enthusiasm.",
                content: `Dear Admissions Committee,

I am excited to provide this letter of recommendation for Brett, or should I say Hamlet, John Proctor, or Erik (of Phantom of the Opera lore)? Brett has established himself as a bit of a theater star in these parts, where he's made our fall dramas and spring musicals come to life in his moving and memorable starring roles. Outside of school, Brett is also involved in the local theater group. Brett is an incredible actor with contagious enthusiasm and a passion for storytelling. He has my highest recommendation for admission into your theater program.

For Brett, theater is as essential to his day to day life as breathing. He has been passionate about creating characters and singing his whole life and was involved in school plays throughout middle and high school. He is deeply committed to his craft, having taken acting classes and singing lessons and been involved in local theater groups for most of his life. Brett has an incredible stage presence and equally excels at comedic and dramatic roles. Not only does he give subtle, nuanced performances in which he disappears entirely into his character, he also has an incredible singing voice and is involved in the school chorus. While he is certainly a talented individual, Brett doesn't rest on his natural gifts. He has put in countless hours to improving his craft.

Brett especially excels in his English and history classes, which he says are his favorites for the stories and insights into human nature. He reads widely, which he told me helps him get a more complex sense of people's characters, feelings, and motivations. Outside of the classroom, Brett volunteers with DramaMatters Afterschool at the Boys and Girls Club, working with children to help them express themselves through the arts. He has said that performing has helped him gain a greater understanding of himself and others and build his self-confidence. He loves having the opportunity to bring that experience to the kids he works with. Brett is enthusiastic, fun, sensitive, and driven. He's been a delightful presence both in and out of the classroom.

Everyone here at Lincoln High School, myself included, is excited to see Brett continue to commit himself to the study and performance of theater. While the arts can be a competitive field to make a name in, Brett has the singular commitment, drive, and passion to develop his talents to the utmost. He has my enthusiastic recommendation, and I can't wait to see what dynamic and challenging roles lie in Brett's future.

Sincerely,`,
                analysis: "Professional Recommendation Letter Example"
        },
        {
                id: "lor-sam-ellis-counselor",
                categoryId: "recommendation",
                subcategoryId: "counselor",
                title: "Counselor Recommendation: Sam Ellis",
                author: "Guidance Counselor",
                university: "N/A",
                theme: "Business, Humanities & Community Impact",
                excerpt: "Sam has been a hardworking and impactful member of our school and has impressed me with their desire to support others.",
                content: `Dear Admissions Committee, 

My name is Alex Valda, and I’ve been Sam Ellis’ Guidance Counselor for the past two years at Middleton High School. 

Sam has been a hardworking and impactful member of our school and has impressed me with their desire to support others. When I think of Sam, the words that most often come to mind are dedicated, compassionate, and solutions-oriented. Sam has frequently used our school’s “Academic Support” period to work with both teachers and other students – getting help where needed and providing 1:1 tutoring to classmates in several courses. Sam genuinely cares about others and is able to provide this support in spite of their own heavy workload. While most students at Middleton are limited to 4 Advanced Placement courses per year, Sam successfully petitioned for an extra AP class their senior year. To do this, Sam had to write to the Vice Principal explaining why this course would be additive to their studies, detailing what they hoped to learn from it, and providing a plan for how they’d balance the extra workload over the course of the year. 

Academically, Sam is a member of our school’s Humanities Cohort. This program is offered to only 10 students every year and allows students access to an extra elective course in the humanities and a research seminar. Sam shared with me that their most memorable classroom experience was a project on the contrast in rhetoric surrounding PPP Loan forgiveness and Student-Debt Loan forgiveness. Sam worked collaboratively with peers on research for the project, and then used that research for an independent paper. Sam’s teacher told me that it was the top paper in the class.  

Sam is most interested in the topics of business and international relations. In fact, it was this interest that prompted the 5th AP course. Sam had four AP classes lined up for their senior year (Calculus, Literature, Government, and World History), but also knew that an understanding of Statistics would be crucial to pursue their interests. With an eye on their future goals, Sam was able to add that class to their courseload. While unable to add AP Microeconomics to the schedule due to class conflicts, Sam self-studied for the exam and received a solid score of “4.” 

Sam is also a change-maker in our school. As a member of our Student Council, Sam does not hold a leadership position. However, they attended every meeting, listened to others, and provided ideas and initiatives often. Sam was a key factor in creating our school’s annual “Field Day for Charity,” proposing the idea within the council and working with local businesses to support the venture. Sam also spends time as the Vice President of our school’s Diaspora Club and is a regional winner for DECA in the “Business Operations Research” category. While both of these experiences are highlights of Sam’s high school career, they are particularly proud of their work in the Diaspora Club. This organization was founded by Sam and some friends to celebrate the diverse cultures present within our student body, and Sam was instrumental in putting together the yearly cultural showcase which allowed Sam and their peers to perform music and dance that represented their diverse backgrounds. Sam will undoubtedly find ways to similarly contribute to your college community and will be an active and supportive member of your university. They have my highest recommendation.  

Sincerely,`,
                analysis: "Professional Recommendation Letter Example"
        }
];
