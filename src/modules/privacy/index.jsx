'use client';

import PrivacyView from './view';
import { PRIVACY_DATA } from '@/lib/constants';

export default function PrivacyContainer() {
  return <PrivacyView lastUpdated={PRIVACY_DATA.lastUpdated} sections={PRIVACY_DATA.sections} />;
}
