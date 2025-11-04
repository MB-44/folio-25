import React, { useMemo, useState } from 'react';

export type NaoFieldProps = {
  id: string;
  name: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
  className?: string;
};

export default function NaoField({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  required,
  autoComplete,
  className,
}: NaoFieldProps) {
  const [focused, setFocused] = useState(false);
  const filled = useMemo(() => (value ?? '').trim().length > 0, [value]);
  const wrapperClass = `input input--nao ${filled || focused ? 'input--filled' : ''} ${className ?? ''}`.trim();

  return (
    <div className={wrapperClass}>
      <input
        className="input__field input__field--nao"
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        autoComplete={autoComplete}
        aria-label={label}
      />
      <label className="input__label input__label--nao" htmlFor={id}>
        <span className="input__label-content input__label-content--nao">{label}</span>
      </label>
      <svg className="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,30 L400,30 C440,30 460,30 500,30 C540,30 560,30 600,30 C640,30 660,30 700,30 C740,30 760,30 800,30 C840,30 860,30 900,30 C940,30 960,30 1000,30 C1040,30 1060,30 1100,30 C1140,30 1160,30 1200,30" />
      </svg>

      <style jsx global>{`
        .input { position: relative; z-index: 1; display: block; margin: 1em 0; max-width: 100%; width: 100%; }
        .input__field { position: relative; display: block; width: 100%; border: none; border-radius: 0; background: transparent; color: #9da8b2; font-weight: 400; -webkit-appearance: none; }
        .input__field:focus { outline: none; }
        .input__label { display: block; width: 100%; color: #6a7989; font-weight: 600; font-size: 0.85em; }
        .input__label-content { position: relative; display: block; width: 100%; }
        .graphic { position: absolute; top: 0; left: 0; fill: none; width: 300%; height: 100%; }

        .input--nao { overflow: hidden; padding-top: 1em; }
        .input__field--nao { padding: 0.5em 0 0.25em; font-size: 1.1em; }
        .input__label--nao { position: absolute; top: 0.95em; left: 0; text-align: left; padding: 0; pointer-events: none; transform-origin: 0 0; transition: transform 0.3s 0.1s, color 1s; transition-timing-function: cubic-bezier(0, 0.25, 0.5, 1); }
        .graphic--nao { stroke: #92989e; pointer-events: none; transition: transform 0.7s, stroke 0.7s; transition-timing-function: cubic-bezier(0, 0.25, 0.5, 1); }
        .input__field--nao:focus + .input__label--nao, .input--filled .input__label--nao { color: #333; transform: translate3d(0, -1.25em, 0) scale3d(0.75, 0.75, 1); }
        .input__field--nao:focus ~ .graphic--nao, .input--filled .graphic--nao { stroke: #333; transform: translate3d(-66.6%, 0, 0); }

        @media (max-width: 640px) {
          .input { margin: 0.75em 0; }
          .input__field--nao { font-size: 1em; }
        }
      `}</style>
    </div>
  );
}