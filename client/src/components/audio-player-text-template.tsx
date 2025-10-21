import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface AudioPlayerTextTemplateProps {
  title: string;
  subtitle?: string;
  content: React.ReactNode;
}

export const AudioPlayerTextTemplate: React.FC<AudioPlayerTextTemplateProps> = ({
  title,
  subtitle,
  content
}) => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
      <CardContent className="prose prose-invert max-w-none">
        <div className="text-white leading-relaxed space-y-6">
          {content}
        </div>
      </CardContent>
    </Card>
  );
};

// Reusable section components for consistent beautiful formatting
export const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-2xl font-bold mb-6 text-yellow-300">{children}</h2>
);

export const SubSectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-xl font-bold mb-4 text-green-300">{children}</h3>
);

export const StepHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 className="text-lg font-semibold mb-3 text-blue-200">{children}</h4>
);

export const Paragraph: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = "mb-4 text-lg leading-relaxed" 
}) => (
  <p className={className}>{children}</p>
);

export const StepContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mb-6">
    {children}
  </div>
);

export const StepParagraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="mb-4 text-base leading-relaxed">{children}</p>
);

export const FinalParagraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="mb-2 text-lg leading-relaxed">{children}</p>
);

// Beautiful themed section containers
export const BlueSection: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
    {title && <p className="text-lg font-semibold mb-4 text-blue-300">{title}</p>}
    {children}
  </div>
);

export const GreenSection: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
    {title && <p className="text-lg font-semibold mb-4 text-green-300">{title}</p>}
    {children}
  </div>
);

export const PurpleSection: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
    {title && <p className="text-lg font-semibold mb-4 text-purple-300">{title}</p>}
    {children}
  </div>
);

export const RedSection: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
    {title && <p className="text-lg font-semibold mb-4 text-red-300">{title}</p>}
    {children}
  </div>
);

export const OrangeSection: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <div className="bg-orange-900/20 p-6 rounded-lg border border-orange-400/30 mb-6">
    {title && <p className="text-lg font-semibold mb-4 text-orange-300">{title}</p>}
    {children}
  </div>
);

export const YellowSection: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-400/30 mb-6">
    {title && <p className="text-lg font-semibold mb-4 text-yellow-300">{title}</p>}
    {children}
  </div>
);

export const GraySection: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-600/30 mb-6">
    {title && <p className="text-lg font-semibold mb-4 text-gray-300">{title}</p>}
    {children}
  </div>
);

// Scripture and quote components
export const ScriptureQuote: React.FC<{ 
  children: React.ReactNode; 
  reference?: string;
  color?: 'blue' | 'green' | 'purple' | 'red' | 'orange' | 'yellow' | 'gray';
}> = ({ children, reference, color = 'blue' }) => {
  const colorClasses = {
    blue: 'border-blue-400',
    green: 'border-green-400',
    purple: 'border-purple-400',
    red: 'border-red-400',
    orange: 'border-orange-400',
    yellow: 'border-yellow-400',
    gray: 'border-gray-400'
  };

  return (
    <div className="mb-6">
      {reference && <p className="text-sm text-gray-300 mb-2">{reference}</p>}
      <blockquote className={`border-l-4 ${colorClasses[color]} pl-4 mb-4 italic text-gray-200`}>
        {children}
      </blockquote>
    </div>
  );
};

// List components
export const BulletList: React.FC<{ 
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "list-disc list-inside ml-6 mb-4 space-y-1" }) => (
  <ul className={className}>
    {children}
  </ul>
);

export const BulletItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li>{children}</li>
);

// Grid layout for lists and comparisons
export const TwoColumnGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
    {children}
  </div>
);

export const ThreeColumnGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
    {children}
  </div>
);

// Highlighted text components
export const HighlightText: React.FC<{ 
  children: React.ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'red' | 'orange' | 'yellow';
}> = ({ children, color = 'blue' }) => {
  const colorClasses = {
    blue: 'text-blue-300 font-semibold',
    green: 'text-green-300 font-semibold',
    purple: 'text-purple-300 font-semibold',
    red: 'text-red-300 font-semibold',
    orange: 'text-orange-300 font-semibold',
    yellow: 'text-yellow-300 font-semibold'
  };

  return <span className={colorClasses[color]}>{children}</span>;
};

// Center text component
export const CenterText: React.FC<{ 
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "text-center text-lg font-semibold" }) => (
  <p className={className}>{children}</p>
);

// Warning/Important callout boxes
export const WarningBox: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <div className="bg-red-900/20 p-4 rounded border border-red-400/30 mt-4">
    {title && <p className="font-semibold text-red-300 mb-2">{title}</p>}
    {children}
  </div>
);

export const InfoBox: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <div className="bg-blue-900/20 p-4 rounded border border-blue-400/30 mt-4">
    {title && <p className="font-semibold text-blue-300 mb-2">{title}</p>}
    {children}
  </div>
);

// Special content cards
export const ContentCard: React.FC<{ 
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "bg-gray-800/30 p-6 rounded-lg border border-gray-600/30 mb-6" }) => (
  <div className={className}>
    {children}
  </div>
);

export const ComparisonCard: React.FC<{ 
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "bg-gray-800/30 p-3 rounded border border-gray-600/30" }) => (
  <div className={className}>
    {children}
  </div>
);