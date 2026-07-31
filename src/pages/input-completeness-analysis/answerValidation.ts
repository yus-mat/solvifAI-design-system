/**
 * Client-side answer quality check for the ドラフト画面 prototype.
 *
 * Production should replace this with an LLM / embedding relevancy check.
 * Here we approximate "does this answer address the question?" via:
 * - quoted-option overlap (「…」 phrases from the question)
 * - Japanese character n-gram overlap with the question (+ title)
 * - keyword overlap for open-ended questions (short factual answers OK)
 * while still rejecting empty / gibberish input.
 *
 * Short answers are allowed when they are clearly on-topic
 * (e.g. 「担当者が手動で上申する」).
 */

const JP_CHAR = /[\u3040-\u30ff\u3400-\u9fff]/;
const OPEN_ENDED_RE =
  /どのように|どうやって|どのような|何を|どう定義|追記しますか|定義しますか|教えてください|具体的/;
const STOP_NGRAMS = new Set([
  'してい',
  'します',
  'ました',
  'である',
  'です。',
  'ます。',
  'という',
  'として',
  'について',
  'における',
  'および',
  'または',
]);

function normalizeForCompare(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, '')
    .replace(/[「」『』【】（）()［］\[\]、。．，,.!?？！・…ー−-]/g, '');
}

function extractQuotedPhrases(text: string): string[] {
  const phrases: string[] = [];
  const re = /[「『]([^」』]+)[」』]/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) != null) {
    const phrase = match[1]?.trim();
    if (phrase) phrases.push(phrase);
  }
  return phrases;
}

/** Kanji / katakana compounds used as lightweight topic keywords. */
function extractKeywords(text: string): string[] {
  const matches = text.match(/[\u4e00-\u9fff]{2,}|[\u30a0-\u30ff]{2,}/g);
  return matches ?? [];
}

function sharedKeywordCount(answer: string, question: string, title = ''): number {
  const keywords = [...new Set(extractKeywords(`${question}\n${title}`))].filter(
    (keyword) => keyword.length >= 2,
  );
  return keywords.filter((keyword) => answer.includes(keyword)).length;
}

/** Character n-grams from Japanese / alphanumeric content. */
function charNgrams(text: string, n = 2): Set<string> {
  const normalized = normalizeForCompare(text);
  const grams = new Set<string>();
  if (normalized.length < n) {
    if (normalized) grams.add(normalized);
    return grams;
  }
  for (let i = 0; i <= normalized.length - n; i += 1) {
    const gram = normalized.slice(i, i + n);
    if (STOP_NGRAMS.has(gram)) continue;
    grams.add(gram);
  }
  return grams;
}

function overlapRatio(answerGrams: Set<string>, contextGrams: Set<string>): number {
  if (answerGrams.size === 0) return 0;
  let hits = 0;
  for (const gram of answerGrams) {
    if (contextGrams.has(gram)) hits += 1;
  }
  return hits / answerGrams.size;
}

/**
 * How much of the answer looks grounded in the question context (0–1).
 * Higher = more relevant.
 */
export function answerRelevancyScore(
  answer: string,
  question: string,
  title = '',
): number {
  const trimmed = answer.trim();
  if (!trimmed) return 0;

  const quotes = extractQuotedPhrases(question);
  let quoteScore = 0;
  for (const quote of quotes) {
    const quoteNorm = normalizeForCompare(quote);
    const answerNorm = normalizeForCompare(trimmed);
    if (!quoteNorm) continue;

    if (answerNorm.includes(quoteNorm) || quoteNorm.includes(answerNorm)) {
      quoteScore = Math.max(quoteScore, 1);
      continue;
    }

    // Partial quote match (short decisive answers that reuse an option).
    const partial = overlapRatio(charNgrams(trimmed, 2), charNgrams(quote, 2));
    if (partial >= 0.55) {
      quoteScore = Math.max(quoteScore, partial);
    }
  }

  const context = `${question}\n${title}`;
  const ngramScore = overlapRatio(charNgrams(trimmed, 2), charNgrams(context, 2));
  const keywordHits = sharedKeywordCount(trimmed, question, title);
  const keywordScore = Math.min(1, keywordHits / 2);

  return Math.max(quoteScore, ngramScore, keywordScore * 0.5 + ngramScore * 0.5);
}

function isGibberish(answer: string): boolean {
  const trimmed = answer.trim();
  if (!trimmed) return true;
  if (!JP_CHAR.test(trimmed)) return true;
  // Same character repeated (ああああ / aaaaa).
  if (/^(.)\1{4,}$/u.test(trimmed)) return true;
  // Almost no letters / kana / kanji.
  const meaningful = trimmed.replace(/[\s\p{P}\p{S}\d]+/gu, '');
  if (meaningful.length < 2) return true;
  return false;
}

function isOpenEndedQuestion(question: string): boolean {
  return OPEN_ENDED_RE.test(question);
}

/**
 * Returns true when the answer should block opening the apply dialog.
 * Prefers relevancy to the question over raw word/character count.
 */
export function isAnswerErroneous(
  answer: string,
  question: string,
  title = '',
): boolean {
  if (isGibberish(answer)) return true;

  const trimmed = answer.trim();
  const score = answerRelevancyScore(trimmed, question, title);
  const length = trimmed.length;
  const keywordHits = sharedKeywordCount(trimmed, question, title);

  // Short but clearly on-topic (e.g. choosing one quoted option).
  if (score >= 0.45) return false;

  // Medium answers with solid topical overlap.
  if (length >= 8 && score >= 0.2) return false;

  // Longer free-form answers can be a bit looser on overlap.
  if (length >= 18 && score >= 0.12) return false;

  // Open questions often need new specifics (e.g. "24時間以内").
  // Accept when the answer shares topic keywords and has some substance.
  if (
    isOpenEndedQuestion(question) &&
    keywordHits >= 1 &&
    length >= 6
  ) {
    return false;
  }

  return true;
}
