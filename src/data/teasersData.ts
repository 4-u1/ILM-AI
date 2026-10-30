// Shareable "teaser" questions that members send to invite people to learn.
// Every fact here must stay accurate and conservative — a wrong number in a
// teaser damages trust in the whole platform. Verify before adding new ones.

export interface Teaser {
  id: string;
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
  // Prefilled into the AI tutor so the recipient can continue the conversation
  followUpAr: string;
  followUpEn: string;
}

export const TEASERS: Teaser[] = [
  {
    id: 'qibla',
    questionAr: 'مكان واحد على وجه الأرض يتّجه إليه أكثر من مليار إنسان خمس مرات كل يوم. هل تعرف ما هو؟',
    questionEn: 'There is one place on Earth that more than a billion people face five times every day. Do you know what it is?',
    answerAr: 'إنها الكعبة المشرّفة في مكة المكرمة، قِبلة المسلمين في صلاتهم أينما كانوا.',
    answerEn: 'It is the Kaaba in Makkah, the direction Muslims face in prayer wherever they are.',
    followUpAr: 'لماذا يتجه المسلمون إلى الكعبة في صلاتهم؟',
    followUpEn: 'Why do Muslims face the Kaaba when they pray?',
  },
  {
    id: 'quran-memorized',
    questionAr: 'كتاب عمره أكثر من 1400 سنة، يحفظه اليوم ملايين البشر كاملاً عن ظهر قلب، وكثير منهم لا يتكلّمون لغته. ما هو؟',
    questionEn: 'A book over 1,400 years old is memorized in full by millions of people today — many of whom don\'t even speak its language. What is it?',
    answerAr: 'إنه القرآن الكريم، كلام الله الذي حُفظ بنصّه في الصدور والمصاحف.',
    answerEn: 'It is the Quran, which Muslims believe is the word of God, preserved both in writing and in memory.',
    followUpAr: 'كيف حُفظ القرآن الكريم عبر القرون؟',
    followUpEn: 'How has the Quran been preserved over the centuries?',
  },
  {
    id: 'ramadan',
    questionAr: 'شهر كامل يمتنع فيه أكثر من مليار إنسان عن الطعام والشراب من الفجر حتى غروب الشمس، باختيارهم. ما سرّه؟',
    questionEn: 'For a whole month, more than a billion people choose to go without food and drink from dawn to sunset. What is the secret?',
    answerAr: 'إنه شهر رمضان، شهر الصيام الذي فرضه الله على المسلمين.',
    answerEn: 'It is Ramadan, the month of fasting prescribed for Muslims.',
    followUpAr: 'ما الحكمة من صيام رمضان؟',
    followUpEn: 'What is the purpose of fasting in Ramadan?',
  },
  {
    id: 'hajj-equality',
    questionAr: 'تجمّع سنوي يلبس فيه ملايين الرجال لباساً أبيض بسيطاً متشابهاً، فلا تفرّق بين الغني والفقير ولا بين الملك والعامل. ما هو؟',
    questionEn: 'Every year, millions of men wear the same simple white garments, so you cannot tell rich from poor or king from worker. What is this gathering?',
    answerAr: 'إنه الحج إلى مكة المكرمة، الركن الخامس من أركان الإسلام.',
    answerEn: 'It is the Hajj pilgrimage to Makkah, the fifth pillar of Islam.',
    followUpAr: 'ما هو الحج ولماذا يلبس الحجاج الإحرام؟',
    followUpEn: 'What is Hajj, and why do pilgrims wear the ihram garments?',
  },
];

export const TEASER_IDS = TEASERS.map((t) => t.id);

export const findTeaser = (id: string | null | undefined): Teaser | undefined =>
  id ? TEASERS.find((t) => t.id === id) : undefined;
