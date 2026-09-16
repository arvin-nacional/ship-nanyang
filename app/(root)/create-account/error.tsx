"use client";

export default function OnboardingError({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto min-h-[70vh] max-w-xl px-6 pt-40">
      <h1 className="h2-semibold text-primary-500">Unable to load your profile</h1>
      <p className="mt-4">Please try again to finish setting up your account.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded bg-primary-500 px-6 py-3 text-white"
      >
        Try again
      </button>
    </div>
  );
}
