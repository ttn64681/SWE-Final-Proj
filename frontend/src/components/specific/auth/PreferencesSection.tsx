'use client';

// PreferencesSection: small section used in Register Step 3 for opt-ins (e.g., promos)
import React from 'react';
import { RegistrationData } from '@/contexts/RegistrationContext';
import Checkbox from '@/components/common/forms/Checkbox';

interface PreferencesSectionProps {
  data: RegistrationData;
  updateData: (stepData: Partial<RegistrationData>) => void;
  isLoading?: boolean;
}

export default function PreferencesSection({ data, updateData, isLoading = false }: PreferencesSectionProps) {
  return (
    <div className="space-y-4 pt-4">
      <h3 className="text-lg font-semibold text-white/90 border-b border-white/10 pb-2">
        Preferences
      </h3>
      <Checkbox
        id="enrollForPromotions"
        label="I would like to receive promotional emails and special offers"
        checked={Boolean(data.enrollForPromotions)}
        onChange={(checked) => updateData({ enrollForPromotions: checked })}
        disabled={isLoading}
      />
    </div>
  );
}

