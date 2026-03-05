'use client';

import ProgressBar from './components/ProgressBar';

export default function Home() {
  return (
    <div className="">
      <ProgressBar currentStep={1} totalSteps={3} />
    </div>
  );
}
