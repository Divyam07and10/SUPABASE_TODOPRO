'use client';

import TermsView from './view';
import { TERMS_DATA } from '@/lib/constants';

export default function TermsContainer() {
    return <TermsView lastUpdated={TERMS_DATA.lastUpdated} termsContent={TERMS_DATA.termsContent} />;
}
