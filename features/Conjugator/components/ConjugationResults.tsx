'use client';

import { useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import type {
  ConjugationResult,
  ConjugationCategory as CategoryType,
  ConjugationForm,
} from '../types';
import { ALL_CONJUGATION_CATEGORIES } from '../types';
import VerbInfoCard from './VerbInfoCard';
import ConjugationCategory from './ConjugationCategory';

interface ConjugationResultsProps {
  /** Conjugation result to display */
  result: ConjugationResult | null;
  /** Whether conjugation is in progress */
  isLoading: boolean;
  /** Callback to copy a single form */
  onCopyForm: (form: ConjugationForm) => void;
}

/**
 * ConjugationResults - Displays all conjugated forms organized by category
 */
export default function ConjugationResults({
  result,
  isLoading,
  onCopyForm,
}: ConjugationResultsProps) {
  // Group forms by category
  const formsByCategory = useMemo(() => {
    if (!result) return new Map<CategoryType, ConjugationForm[]>();

    const grouped = new Map<CategoryType, ConjugationForm[]>();
    for (const form of result.forms) {
      const existing = grouped.get(form.category) || [];
      existing.push(form);
      grouped.set(form.category, existing);
    }
    return grouped;
  }, [result]);

  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center py-20 text-center'>
        <Loader2 className='h-8 w-8 animate-spin text-(--main-color) opacity-20' />
        <p className='mt-4 text-xl font-bold tracking-tight text-(--main-color) opacity-40'>
          Conjugating…
        </p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className='flex flex-col items-center justify-center py-24 text-center'>
        <p className='text-3xl font-black tracking-tight text-(--main-color) opacity-20 sm:text-4xl'>
          Type a verb to start
        </p>
      </div>
    );
  }

  return (
    <div
      className='flex flex-col gap-6'
      role='region'
      aria-label='Conjugation results'
    >
      <div
        className='sr-only'
        role='status'
        aria-live='polite'
        aria-atomic='true'
      >
        {`Conjugation complete for ${result.verb.dictionaryForm}. ${result.forms.length} form${result.forms.length > 0 ? 's' : null} available.`}
      </div>

      <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-2 text-[10px] font-bold tracking-widest text-(--secondary-color)/40 uppercase'>
            <div className='h-px w-4 bg-(--main-color)' />
            <span>Analysis</span>
          </div>
          <h2 className='text-2xl font-bold tracking-tight text-(--main-color)'>
            Conjugations
          </h2>
        </div>

        <section className='border-b border-(--border-color)/10 pb-8'>
          <VerbInfoCard verb={result.verb} />
        </section>
      </div>

      <div className='flex flex-col gap-24' role='list'>
        {ALL_CONJUGATION_CATEGORIES.map(category => (
          <ConjugationCategory
            key={category}
            category={category}
            forms={formsByCategory.get(category) || []}
            isExpanded={true}
            onToggle={() => {}}
            onCopy={onCopyForm}
          />
        ))}
      </div>

      <footer className='mt-8 border-t border-(--border-color)/10 py-12'>
        <p className='text-center text-xs font-bold text-(--secondary-color)/40'>
          Generated {result.forms.length} forms for {result.verb.dictionaryForm}
        </p>
      </footer>
    </div>
  );
}
