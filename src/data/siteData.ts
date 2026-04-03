export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  cover: string;
  synopsis: string;
  price: number;
  isbn: string;
  pages: number;
  featured?: boolean;
}

export interface Author {
  id: number;
  name: string;
  photo: string;
  bio: string;
  books: string[];
  genres: string[];
  social: { twitter?: string; instagram?: string; website?: string };
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export const books: Book[] = [
  {
    id: 1,
    title: "The Ember Chronology",
    author: "Marguerite Ashford",
    genre: "Literary Fiction",
    year: 2026,
    cover: "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193714615_625dbe49.png",
    synopsis: "A sweeping generational saga that traces the lives of three women across continents and centuries, bound by a mysterious heirloom and the secrets it holds.",
    price: 27.99,
    isbn: "978-1-234567-01-2",
    pages: 384,
    featured: true,
  },
  {
    id: 2,
    title: "Meridian Lines",
    author: "James Whitfield",
    genre: "Literary Fiction",
    year: 2025,
    cover: "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193721110_52f4b6ac.png",
    synopsis: "In a coastal town where memory and myth converge, a cartographer discovers that the maps he draws are reshaping reality itself.",
    price: 24.99,
    isbn: "978-1-234567-02-9",
    pages: 312,
  },
  {
    id: 3,
    title: "Letters from the Understory",
    author: "Elena Vasquez",
    genre: "Literary Fiction",
    year: 2025,
    cover: "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193705833_ef79ef8b.jpg",
    synopsis: "An epistolary novel woven from letters between a botanist and her estranged daughter, exploring the language of plants and the roots of forgiveness.",
    price: 22.99,
    isbn: "978-1-234567-03-6",
    pages: 276,
  },
  {
    id: 4,
    title: "The Architect's Daughter",
    author: "Marguerite Ashford",
    genre: "Contemporary",
    year: 2026,
    cover: "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193752577_024aec76.png",
    synopsis: "When a young architect inherits her father's unfinished masterpiece, she must confront the blueprints of a family built on beautiful lies.",
    price: 26.99,
    isbn: "978-1-234567-04-3",
    pages: 348,
    featured: true,
  },
  {
    id: 5,
    title: "Copper and Sage",
    author: "Thomas Hale",
    genre: "Contemporary",
    year: 2025,
    cover: "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193740303_8ce4a7db.jpg",
    synopsis: "A chef returns to his grandmother's restaurant in the Appalachian mountains, discovering that the recipes she left behind contain more than ingredients.",
    price: 23.99,
    isbn: "978-1-234567-05-0",
    pages: 298,
  },
  {
    id: 6,
    title: "The Borrowed Season",
    author: "Nadia Okafor",
    genre: "Contemporary",
    year: 2026,
    cover: "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193761574_a02e3279.png",
    synopsis: "Two strangers share a summer house on the coast of Portugal, each running from a past they cannot outpace, finding solace in the spaces between words.",
    price: 25.99,
    isbn: "978-1-234567-06-7",
    pages: 324,
  },
  {
    id: 7,
    title: "Nocturne in Glass",
    author: "Liam Ashworth",
    genre: "Contemporary",
    year: 2025,
    cover: "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193763893_54880ae9.png",
    synopsis: "A glass artist in Venice discovers that her creations hold fragments of other people's memories, pulling her into a web of stolen moments.",
    price: 24.99,
    isbn: "978-1-234567-07-4",
    pages: 288,
  },
  {
    id: 8,
    title: "The Vanishing Tide",
    author: "James Whitfield",
    genre: "Mystery & Thriller",
    year: 2026,
    cover: "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193787224_ff0133c9.jpg",
    synopsis: "When a lighthouse keeper vanishes during the worst storm in a century, a detective discovers that the island's residents all have reasons to want him gone.",
    price: 26.99,
    isbn: "978-1-234567-08-1",
    pages: 356,
    featured: true,
  },
  {
    id: 9,
    title: "Beneath the Floorboards",
    author: "Cassandra Reeves",
    genre: "Mystery & Thriller",
    year: 2025,
    cover: "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193830887_0a6a1172.png",
    synopsis: "A renovation of a Victorian mansion uncovers a hidden room, a coded journal, and a century-old murder that mirrors a present-day disappearance.",
    price: 25.99,
    isbn: "978-1-234567-09-8",
    pages: 340,
  },
  {
    id: 10,
    title: "The Cipher Garden",
    author: "Thomas Hale",
    genre: "Mystery & Thriller",
    year: 2025,
    cover: "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193790015_00bab4c6.jpg",
    synopsis: "A cryptographer is drawn into a deadly game when she discovers that the botanical garden she visits daily is a living code, planted decades ago.",
    price: 24.99,
    isbn: "978-1-234567-10-4",
    pages: 308,
  },
  {
    id: 11,
    title: "Smoke and Mirrors",
    author: "Liam Ashworth",
    genre: "Mystery & Thriller",
    year: 2026,
    cover: "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193789330_f2180664.jpg",
    synopsis: "In the golden age of stage magic, an illusionist's greatest trick goes fatally wrong — or was it the perfect murder disguised as an accident?",
    price: 27.99,
    isbn: "978-1-234567-11-1",
    pages: 372,
  },
  {
    id: 12,
    title: "Tidal Psalms",
    author: "Elena Vasquez",
    genre: "Poetry",
    year: 2026,
    cover: "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193885607_dd2d267e.png",
    synopsis: "A luminous collection of poems that charts the emotional geography of grief, renewal, and the persistent pull of the sea.",
    price: 18.99,
    isbn: "978-1-234567-12-8",
    pages: 128,
    featured: true,
  },
  {
    id: 13,
    title: "Wildflower Requiem",
    author: "Nadia Okafor",
    genre: "Poetry",
    year: 2025,
    cover: "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193848875_c47b333a.jpg",
    synopsis: "Poems that bloom at the intersection of identity, diaspora, and the wild gardens of belonging, written with fierce tenderness.",
    price: 17.99,
    isbn: "978-1-234567-13-5",
    pages: 112,
  },
  {
    id: 14,
    title: "Amber & Bone",
    author: "Cassandra Reeves",
    genre: "Poetry",
    year: 2025,
    cover: "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193850174_006eb72c.jpg",
    synopsis: "A raw, unflinching exploration of the body as archive — each poem a fossil record of love, loss, and the archaeology of desire.",
    price: 16.99,
    isbn: "978-1-234567-14-2",
    pages: 96,
  },
  {
    id: 15,
    title: "The Moth Diaries",
    author: "Marguerite Ashford",
    genre: "Poetry",
    year: 2026,
    cover: "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193852702_ab84c8cb.jpg",
    synopsis: "Nocturnal meditations on light and darkness, these poems flutter between waking and dreaming, drawn irresistibly toward illumination.",
    price: 19.99,
    isbn: "978-1-234567-15-9",
    pages: 144,
  },
];

export const authors: Author[] = [
  {
    id: 1,
    name: "Marguerite Ashford",
    photo: "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193968645_dcd7048b.jpg",
    bio: "Award-winning author of literary fiction and poetry, Marguerite Ashford has been praised by The New York Times as 'a voice that reshapes the landscape of contemporary literature.' Her work explores the intersection of memory, identity, and place.",
    books: ["The Ember Chronology", "The Architect's Daughter", "The Moth Diaries"],
    genres: ["Literary Fiction", "Contemporary", "Poetry"],
    social: { twitter: "@mashford_writes", instagram: "@marguerite.ashford", website: "margueriteashford.com" },
  },
  {
    id: 2,
    name: "James Whitfield",
    photo: "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193908142_3145075a.jpg",
    bio: "James Whitfield is a former marine biologist turned novelist whose work blends scientific precision with lyrical prose. His debut novel won the National Book Award, establishing him as a major voice in literary fiction.",
    books: ["Meridian Lines", "The Vanishing Tide"],
    genres: ["Literary Fiction", "Mystery & Thriller"],
    social: { twitter: "@jwhitfield", website: "jameswhitfield.com" },
  },
  {
    id: 3,
    name: "Elena Vasquez",
    photo: "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193972601_e2492000.jpg",
    bio: "Poet and novelist Elena Vasquez draws from her bilingual heritage to create works that bridge cultures and languages. Her poetry has appeared in The New Yorker, Poetry Magazine, and The Paris Review.",
    books: ["Letters from the Understory", "Tidal Psalms"],
    genres: ["Literary Fiction", "Poetry"],
    social: { twitter: "@elenavasquez", instagram: "@elena.vasquez.writes" },
  },
  {
    id: 4,
    name: "Thomas Hale",
    photo: "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193908945_da09e93a.jpg",
    bio: "Thomas Hale writes at the crossroads of food, place, and mystery. A former chef and investigative journalist, his novels are rich with sensory detail and intricate plotting that keeps readers guessing until the final page.",
    books: ["Copper and Sage", "The Cipher Garden"],
    genres: ["Contemporary", "Mystery & Thriller"],
    social: { twitter: "@thomashale", instagram: "@thomas.hale.author" },
  },
  {
    id: 5,
    name: "Nadia Okafor",
    photo: "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193971988_c129739c.jpg",
    bio: "Nadia Okafor is a Nigerian-British author whose work explores themes of diaspora, belonging, and the landscapes we carry within us. She was named one of Granta's Best Young Novelists.",
    books: ["The Borrowed Season", "Wildflower Requiem"],
    genres: ["Contemporary", "Poetry"],
    social: { twitter: "@nadiaokafor", instagram: "@nadia.okafor", website: "nadiaokafor.com" },
  },
  {
    id: 6,
    name: "Liam Ashworth",
    photo: "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193946590_a233ee73.png",
    bio: "Liam Ashworth brings a background in art history and theater to his fiction, crafting novels that shimmer with visual beauty and dramatic tension. His work has been translated into twenty-three languages.",
    books: ["Nocturne in Glass", "Smoke and Mirrors"],
    genres: ["Contemporary", "Mystery & Thriller"],
    social: { twitter: "@liamashworth", website: "liamashworth.com" },
  },
  {
    id: 7,
    name: "Cassandra Reeves",
    photo: "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193972864_3f80f32e.jpg",
    bio: "Cassandra Reeves is a poet and thriller writer who finds the uncanny in the everyday. Her dual career in forensic anthropology and creative writing gives her work an unforgettable edge.",
    books: ["Beneath the Floorboards", "Amber & Bone"],
    genres: ["Mystery & Thriller", "Poetry"],
    social: { twitter: "@cassreeves", instagram: "@cassandra.reeves" },
  },
  {
    id: 8,
    name: "David Chen",
    photo: "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193951264_33872e5a.png",
    bio: "David Chen is Twin Flame Ink's editor-in-chief and an acclaimed author in his own right. With over two decades in publishing, he has shaped the careers of numerous bestselling writers while championing diverse voices.",
    books: [],
    genres: ["Editorial"],
    social: { twitter: "@davidchen_tfi", website: "twinflameink.com/team/david" },
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Ember Chronology Wins the Booker Prize Longlist",
    excerpt: "Marguerite Ashford's sweeping generational saga has been longlisted for the prestigious Booker Prize, marking Twin Flame Ink's first nomination in the award's history.",
    date: "March 28, 2026",
    category: "Awards",
    readTime: "3 min read",
    image: "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193714615_625dbe49.png",
  },
  {
    id: 2,
    title: "In Conversation: Elena Vasquez on Writing Between Languages",
    excerpt: "Our bilingual poet and novelist discusses the creative tension of writing across cultures, and how her latest collection Tidal Psalms emerged from the space between Spanish and English.",
    date: "March 15, 2026",
    category: "Author Interview",
    readTime: "8 min read",
    image: "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193972601_e2492000.jpg",
  },
  {
    id: 3,
    title: "Spring 2026 Catalog: Five New Titles to Watch",
    excerpt: "From literary fiction to spine-tingling thrillers, our spring lineup promises to captivate readers across every genre. Here's your first look at what's coming.",
    date: "March 1, 2026",
    category: "New Releases",
    readTime: "5 min read",
    image: "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775194042634_a38f87fd.png",
  },
  {
    id: 4,
    title: "The Art of the Book Cover: Behind the Design of Smoke and Mirrors",
    excerpt: "Our design team reveals the creative process behind Liam Ashworth's stunning cover, from initial concept sketches to the final foil-stamped hardcover.",
    date: "February 20, 2026",
    category: "Behind the Scenes",
    readTime: "6 min read",
    image: "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193789330_f2180664.jpg",
  },
  {
    id: 5,
    title: "Manuscript Submission Guidelines: Updated for 2026",
    excerpt: "We've refreshed our submission process to be more accessible and transparent. Learn about our new open submission windows and what we're looking for this year.",
    date: "February 10, 2026",
    category: "Submissions",
    readTime: "4 min read",
    image: "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193998618_d77a20df.jpg",
  },
  {
    id: 6,
    title: "Poetry Month Preview: Three Collections That Will Move You",
    excerpt: "April is National Poetry Month, and Twin Flame Ink is celebrating with three extraordinary collections that push the boundaries of the form.",
    date: "January 28, 2026",
    category: "Poetry",
    readTime: "5 min read",
    image: "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193885607_dd2d267e.png",
  },
];

export const services: Service[] = [
  {
    id: 1,
    title: "Manuscript Development",
    description: "Our editorial team works closely with authors to shape raw manuscripts into polished, publishable works through developmental editing, structural feedback, and creative guidance.",
    features: ["Developmental editing", "Structural analysis", "Character & plot consultation", "Multiple revision rounds"],
    icon: "pen",
  },
  {
    id: 2,
    title: "Design & Production",
    description: "From cover design to interior layout, our award-winning design team creates books that are as beautiful to hold as they are to read.",
    features: ["Custom cover design", "Interior typesetting", "Print & digital formatting", "Special edition packaging"],
    icon: "palette",
  },
  {
    id: 3,
    title: "Marketing & Publicity",
    description: "We amplify every title with strategic marketing campaigns, media outreach, and digital presence that connects books with their ideal readers.",
    features: ["Press & media outreach", "Social media campaigns", "Book tour coordination", "Review copy distribution"],
    icon: "megaphone",
  },
  {
    id: 4,
    title: "Distribution & Sales",
    description: "Our distribution network ensures your book reaches readers worldwide through major retailers, independent bookstores, and digital platforms.",
    features: ["Global distribution", "Retail partnerships", "E-book & audiobook", "International rights"],
    icon: "globe",
  },
];

export const genres = ["All", "Literary Fiction", "Contemporary", "Mystery & Thriller", "Poetry"];

export const HERO_IMAGE = "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193684823_60b76d5e.png";
export const ABOUT_IMAGE = "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775193998618_d77a20df.jpg";
export const READING_IMAGE = "https://d64gsuwffb70l.cloudfront.net/69cf4de7a3bb65ab78fc50b0_1775194042634_a38f87fd.png";
