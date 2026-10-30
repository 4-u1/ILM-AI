import React, { useState } from 'react';
import { Sparkles, X, Eye, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { Teaser } from '../data/teasersData';

interface TeaserInviteModalProps {
  teaser: Teaser;
  language: Language;
  onClose: () => void;
  onAskTutor: (question: string) => void;
}

// Shown to a visitor who opened a shared teaser link (?teaser=...)
export const TeaserInviteModal: React.FC<TeaserInviteModalProps> = ({ teaser, language, onClose, onAskTutor }) => {
  const isAr = language === 'ar';
  const [revealed, setRevealed] = useState(false);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      dir={isAr ? 'rtl' : 'ltr'}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border-2 border-amber-300">
        <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white p-6 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 end-3 p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
            aria-label={isAr ? 'إغلاق' : 'Close'}
          >
            <X className="w-4 h-4" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'سؤال أُرسل لك' : 'A question for you'}</span>
          </div>
          <p className="mt-4 text-base sm:text-lg font-bold leading-relaxed font-serif">
            {isAr ? teaser.questionAr : teaser.questionEn}
          </p>
        </div>

        <div className="p-6 space-y-4">
          {revealed ? (
            <p className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-950 leading-relaxed animate-in fade-in duration-200">
              {isAr ? teaser.answerAr : teaser.answerEn}
            </p>
          ) : (
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4 text-amber-400" />
              <span>{isAr ? 'اكشف الجواب' : 'Reveal the answer'}</span>
            </button>
          )}

          {revealed && (
            <button
              type="button"
              onClick={() => onAskTutor(isAr ? teaser.followUpAr : teaser.followUpEn)}
              className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isAr ? 'تعرّف أكثر في محادثة' : 'Learn more in a conversation'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-full text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
          >
            {isAr ? 'تصفّح المنصة' : 'Browse the platform'}
          </button>
        </div>
      </div>
    </div>
  );
};
