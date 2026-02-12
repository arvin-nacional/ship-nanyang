"use client";

import React, { useEffect, useRef } from "react";

interface GoHighLevelFormProps {
  formId?: string;
  formUrl?: string;
  height?: string;
  className?: string;
}

const GoHighLevelForm: React.FC<GoHighLevelFormProps> = ({
  formId,
  formUrl,
  height = "600px",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the GHL form embed script
    if (formId || formUrl) {
      const existingScript = document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]');
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://link.msgsndr.com/js/form_embed.js";
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, [formId, formUrl]);

  // If using iframe embed (most common method)
  if (formUrl) {
    return (
      <div className={`w-full ${className}`}>
        <iframe
          src={formUrl}
          style={{
            width: "100%",
            height: height,
            border: "none",
            borderRadius: "3px",
          }}
          id={formId ? `inline-${formId}` : undefined}
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Contact Form"
          data-height={height?.replace("px", "")}
          data-layout-iframe-id={formId ? `inline-${formId}` : undefined}
          data-form-id={formId}
          title="Contact Form"
        />
      </div>
    );
  }

  // If using the inline form method with form ID
  if (formId) {
    return (
      <div className={`w-full ${className}`}>
        <div
          ref={containerRef}
          data-form-id={formId}
          data-form-type="inline"
          style={{ minHeight: height }}
        />
      </div>
    );
  }

  // Placeholder when no form is configured
  return (
    <div className={`w-full bg-gray-50 rounded-2xl p-8 text-center ${className}`}>
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-dark-500 mb-2">
          Contact Form Coming Soon
        </h3>
        <p className="text-dark-400 text-sm">
          Please configure your Go High Level form ID or URL to display the contact form.
        </p>
      </div>
    </div>
  );
};

export default GoHighLevelForm;
