export interface BibleBook {
  id: string; // 3-letter standard code
  nameEn: string;
  nameId: string;
  abbreviationEn: string;
  abbreviationId: string;
  chapters: number;
  testament: 'OT' | 'NT';
  order: number; // 1 to 66
}

export const BIBLE_BOOKS: BibleBook[] = [
  // Old Testament (39 books, 929 chapters)
  { id: 'GEN', nameEn: 'Genesis', nameId: 'Kejadian', abbreviationEn: 'Gen', abbreviationId: 'Kej', chapters: 50, testament: 'OT', order: 1 },
  { id: 'EXO', nameEn: 'Exodus', nameId: 'Keluaran', abbreviationEn: 'Exo', abbreviationId: 'Kel', chapters: 40, testament: 'OT', order: 2 },
  { id: 'LEV', nameEn: 'Leviticus', nameId: 'Imamat', abbreviationEn: 'Lev', abbreviationId: 'Im', chapters: 27, testament: 'OT', order: 3 },
  { id: 'NUM', nameEn: 'Numbers', nameId: 'Bilangan', abbreviationEn: 'Num', abbreviationId: 'Bil', chapters: 36, testament: 'OT', order: 4 },
  { id: 'DEU', nameEn: 'Deuteronomy', nameId: 'Ulangan', abbreviationEn: 'Deut', abbreviationId: 'Ul', chapters: 34, testament: 'OT', order: 5 },
  { id: 'JOS', nameEn: 'Joshua', nameId: 'Yosua', abbreviationEn: 'Josh', abbreviationId: 'Yos', chapters: 24, testament: 'OT', order: 6 },
  { id: 'JDG', nameEn: 'Judges', nameId: 'Hakim-hakim', abbreviationEn: 'Judg', abbreviationId: 'Hak', chapters: 21, testament: 'OT', order: 7 },
  { id: 'RUT', nameEn: 'Ruth', nameId: 'Rut', abbreviationEn: 'Ruth', abbreviationId: 'Rut', chapters: 4, testament: 'OT', order: 8 },
  { id: '1SA', nameEn: '1 Samuel', nameId: '1 Samuel', abbreviationEn: '1 Sam', abbreviationId: '1Sam', chapters: 31, testament: 'OT', order: 9 },
  { id: '2SA', nameEn: '2 Samuel', nameId: '2 Samuel', abbreviationEn: '2 Sam', abbreviationId: '2Sam', chapters: 24, testament: 'OT', order: 10 },
  { id: '1KI', nameEn: '1 Kings', nameId: '1 Raja-raja', abbreviationEn: '1 Kgs', abbreviationId: '1Raj', chapters: 22, testament: 'OT', order: 11 },
  { id: '2KI', nameEn: '2 Kings', nameId: '2 Raja-raja', abbreviationEn: '2 Kgs', abbreviationId: '2Raj', chapters: 25, testament: 'OT', order: 12 },
  { id: '1CH', nameEn: '1 Chronicles', nameId: '1 Tawarikh', abbreviationEn: '1 Chr', abbreviationId: '1Taw', chapters: 29, testament: 'OT', order: 13 },
  { id: '2CH', nameEn: '2 Chronicles', nameId: '2 Tawarikh', abbreviationEn: '2 Chr', abbreviationId: '2Taw', chapters: 36, testament: 'OT', order: 14 },
  { id: 'EZR', nameEn: 'Ezra', nameId: 'Ezra', abbreviationEn: 'Ezra', abbreviationId: 'Ezr', chapters: 10, testament: 'OT', order: 15 },
  { id: 'NEH', nameEn: 'Nehemiah', nameId: 'Nehemia', abbreviationEn: 'Neh', abbreviationId: 'Neh', chapters: 13, testament: 'OT', order: 16 },
  { id: 'EST', nameEn: 'Esther', nameId: 'Ester', abbreviationEn: 'Esth', abbreviationId: 'Est', chapters: 10, testament: 'OT', order: 17 },
  { id: 'JOB', nameEn: 'Job', nameId: 'Ayub', abbreviationEn: 'Job', abbreviationId: 'Ayb', chapters: 42, testament: 'OT', order: 18 },
  { id: 'PSA', nameEn: 'Psalms', nameId: 'Mazmur', abbreviationEn: 'Ps', abbreviationId: 'Mzm', chapters: 150, testament: 'OT', order: 19 },
  { id: 'PRO', nameEn: 'Proverbs', nameId: 'Amsal', abbreviationEn: 'Prov', abbreviationId: 'Ams', chapters: 31, testament: 'OT', order: 20 },
  { id: 'ECC', nameEn: 'Ecclesiastes', nameId: 'Pengkhotbah', abbreviationEn: 'Eccl', abbreviationId: 'Pkh', chapters: 12, testament: 'OT', order: 21 },
  { id: 'SNG', nameEn: 'Song of Solomon', nameId: 'Kidung Agung', abbreviationEn: 'Song', abbreviationId: 'Kid', chapters: 8, testament: 'OT', order: 22 },
  { id: 'ISA', nameEn: 'Isaiah', nameId: 'Yesaya', abbreviationEn: 'Isa', abbreviationId: 'Yes', chapters: 66, testament: 'OT', order: 23 },
  { id: 'JER', nameEn: 'Jeremiah', nameId: 'Yeremia', abbreviationEn: 'Jer', abbreviationId: 'Yer', chapters: 52, testament: 'OT', order: 24 },
  { id: 'LAM', nameEn: 'Lamentations', nameId: 'Ratapan', abbreviationEn: 'Lam', abbreviationId: 'Rat', chapters: 5, testament: 'OT', order: 25 },
  { id: 'EZK', nameEn: 'Ezekiel', nameId: 'Yehezkiel', abbreviationEn: 'Ezek', abbreviationId: 'Yeh', chapters: 48, testament: 'OT', order: 26 },
  { id: 'DAN', nameEn: 'Daniel', nameId: 'Daniel', abbreviationEn: 'Dan', abbreviationId: 'Dan', chapters: 12, testament: 'OT', order: 27 },
  { id: 'HOS', nameEn: 'Hosea', nameId: 'Hosea', abbreviationEn: 'Hos', abbreviationId: 'Hos', chapters: 14, testament: 'OT', order: 28 },
  { id: 'JOL', nameEn: 'Joel', nameId: 'Yoel', abbreviationEn: 'Joel', abbreviationId: 'Yl', chapters: 3, testament: 'OT', order: 29 },
  { id: 'AMO', nameEn: 'Amos', nameId: 'Amos', abbreviationEn: 'Amos', abbreviationId: 'Am', chapters: 9, testament: 'OT', order: 30 },
  { id: 'OBA', nameEn: 'Obadiah', nameId: 'Obaja', abbreviationEn: 'Obad', abbreviationId: 'Ob', chapters: 1, testament: 'OT', order: 31 },
  { id: 'JON', nameEn: 'Jonah', nameId: 'Yunus', abbreviationEn: 'Jonah', abbreviationId: 'Yun', chapters: 4, testament: 'OT', order: 32 },
  { id: 'MIC', nameEn: 'Micah', nameId: 'Mikha', abbreviationEn: 'Mic', abbreviationId: 'Mi', chapters: 7, testament: 'OT', order: 33 },
  { id: 'NAM', nameEn: 'Nahum', nameId: 'Nahum', abbreviationEn: 'Nah', abbreviationId: 'Nah', chapters: 3, testament: 'OT', order: 34 },
  { id: 'HAB', nameEn: 'Habakkuk', nameId: 'Habakuk', abbreviationEn: 'Hab', abbreviationId: 'Hab', chapters: 3, testament: 'OT', order: 35 },
  { id: 'ZEP', nameEn: 'Zephaniah', nameId: 'Zefanya', abbreviationEn: 'Zeph', abbreviationId: 'Zef', chapters: 3, testament: 'OT', order: 36 },
  { id: 'HAG', nameEn: 'Haggai', nameId: 'Hagai', abbreviationEn: 'Hag', abbreviationId: 'Hag', chapters: 2, testament: 'OT', order: 37 },
  { id: 'ZEC', nameEn: 'Zechariah', nameId: 'Zakharia', abbreviationEn: 'Zech', abbreviationId: 'Za', chapters: 14, testament: 'OT', order: 38 },
  { id: 'MAL', nameEn: 'Malachi', nameId: 'Maleakhi', abbreviationEn: 'Mal', abbreviationId: 'Mal', chapters: 4, testament: 'OT', order: 39 },

  // New Testament (27 books, 260 chapters)
  { id: 'MAT', nameEn: 'Matthew', nameId: 'Matius', abbreviationEn: 'Matt', abbreviationId: 'Mat', chapters: 28, testament: 'NT', order: 40 },
  { id: 'MRK', nameEn: 'Mark', nameId: 'Markus', abbreviationEn: 'Mark', abbreviationId: 'Mrk', chapters: 16, testament: 'NT', order: 41 },
  { id: 'LUK', nameEn: 'Luke', nameId: 'Lukas', abbreviationEn: 'Luke', abbreviationId: 'Luk', chapters: 24, testament: 'NT', order: 42 },
  { id: 'JHN', nameEn: 'John', nameId: 'Yohanes', abbreviationEn: 'John', abbreviationId: 'Yoh', chapters: 21, testament: 'NT', order: 43 },
  { id: 'ACT', nameEn: 'Acts', nameId: 'Kisah Para Rasul', abbreviationEn: 'Acts', abbreviationId: 'Kis', chapters: 28, testament: 'NT', order: 44 },
  { id: 'ROM', nameEn: 'Romans', nameId: 'Roma', abbreviationEn: 'Rom', abbreviationId: 'Rm', chapters: 16, testament: 'NT', order: 45 },
  { id: '1CO', nameEn: '1 Corinthians', nameId: '1 Korintus', abbreviationEn: '1 Cor', abbreviationId: '1Kor', chapters: 16, testament: 'NT', order: 46 },
  { id: '2CO', nameEn: '2 Corinthians', nameId: '2 Korintus', abbreviationEn: '2 Cor', abbreviationId: '2Kor', chapters: 13, testament: 'NT', order: 47 },
  { id: 'GAL', nameEn: 'Galatians', nameId: 'Galatia', abbreviationEn: 'Gal', abbreviationId: 'Gal', chapters: 6, testament: 'NT', order: 48 },
  { id: 'EPH', nameEn: 'Ephesians', nameId: 'Efesus', abbreviationEn: 'Eph', abbreviationId: 'Ef', chapters: 6, testament: 'NT', order: 49 },
  { id: 'PHP', nameEn: 'Philippians', nameId: 'Filipi', abbreviationEn: 'Phil', abbreviationId: 'Flp', chapters: 4, testament: 'NT', order: 50 },
  { id: 'COL', nameEn: 'Colossians', nameId: 'Kolose', abbreviationEn: 'Col', abbreviationId: 'Kol', chapters: 4, testament: 'NT', order: 51 },
  { id: '1TH', nameEn: '1 Thessalonians', nameId: '1 Tesalonika', abbreviationEn: '1 Thess', abbreviationId: '1Tes', chapters: 5, testament: 'NT', order: 52 },
  { id: '2TH', nameEn: '2 Thessalonians', nameId: '2 Tesalonika', abbreviationEn: '2 Thess', abbreviationId: '2Tes', chapters: 3, testament: 'NT', order: 53 },
  { id: '1TI', nameEn: '1 Timothy', nameId: '1 Timotius', abbreviationEn: '1 Tim', abbreviationId: '1Tim', chapters: 6, testament: 'NT', order: 54 },
  { id: '2TI', nameEn: '2 Timothy', nameId: '2 Timotius', abbreviationEn: '2 Tim', abbreviationId: '2Tim', chapters: 4, testament: 'NT', order: 55 },
  { id: 'TIT', nameEn: 'Titus', nameId: 'Titus', abbreviationEn: 'Titus', abbreviationId: 'Tit', chapters: 3, testament: 'NT', order: 56 },
  { id: 'PHM', nameEn: 'Philemon', nameId: 'Filemon', abbreviationEn: 'Phlm', abbreviationId: 'Flm', chapters: 1, testament: 'NT', order: 57 },
  { id: 'HEB', nameEn: 'Hebrews', nameId: 'Ibrani', abbreviationEn: 'Heb', abbreviationId: 'Ibr', chapters: 13, testament: 'NT', order: 58 },
  { id: 'JAS', nameEn: 'James', nameId: 'Yakobus', abbreviationEn: 'Jas', abbreviationId: 'Yak', chapters: 5, testament: 'NT', order: 59 },
  { id: '1PE', nameEn: '1 Peter', nameId: '1 Petrus', abbreviationEn: '1 Pet', abbreviationId: '1Pet', chapters: 5, testament: 'NT', order: 60 },
  { id: '2PE', nameEn: '2 Peter', nameId: '2 Petrus', abbreviationEn: '2 Pet', abbreviationId: '2Pet', chapters: 3, testament: 'NT', order: 61 },
  { id: '1JN', nameEn: '1 John', nameId: '1 Yohanes', abbreviationEn: '1 John', abbreviationId: '1Yoh', chapters: 5, testament: 'NT', order: 62 },
  { id: '2JN', nameEn: '2 John', nameId: '2 Yohanes', abbreviationEn: '2 John', abbreviationId: '2Yoh', chapters: 1, testament: 'NT', order: 63 },
  { id: '3JN', nameEn: '3 John', nameId: '3 Yohanes', abbreviationEn: '3 John', abbreviationId: '3Yoh', chapters: 1, testament: 'NT', order: 64 },
  { id: 'JUD', nameEn: 'Jude', nameId: 'Yudas', abbreviationEn: 'Jude', abbreviationId: 'Yud', chapters: 1, testament: 'NT', order: 65 },
  { id: 'REV', nameEn: 'Revelation', nameId: 'Wahyu', abbreviationEn: 'Rev', abbreviationId: 'Why', chapters: 22, testament: 'NT', order: 66 },
];

export const TOTAL_BIBLE_BOOKS = BIBLE_BOOKS.length; // 66
export const TOTAL_BIBLE_CHAPTERS = BIBLE_BOOKS.reduce((sum, b) => sum + b.chapters, 0); // 1189
export const TOTAL_OT_CHAPTERS = BIBLE_BOOKS.filter((b) => b.testament === 'OT').reduce((sum, b) => sum + b.chapters, 0); // 929
export const TOTAL_NT_CHAPTERS = BIBLE_BOOKS.filter((b) => b.testament === 'NT').reduce((sum, b) => sum + b.chapters, 0); // 260
