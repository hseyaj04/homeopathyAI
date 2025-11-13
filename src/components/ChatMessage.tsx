import React, { useState } from 'react';
import type { ChatMessage } from '../types';
import { 
    DoctorIcon, 
    BotIcon, 
    TypingIndicator, 
    SummaryIcon, 
    QuestionIcon, 
    RemedyIcon, 
    DisclaimerIcon,
    ChevronDownIcon,
    CopyIcon
} from './icons';
import { marked } from 'marked';

interface ChatMessageProps {
  message: ChatMessage;
}

interface Remedy {
    remedyName: string;
    rationale: string;
    potency: string;
    dosage: string;
    keySymptoms: string[];
    matchStrength: 'High' | 'Medium' | 'Low' | string;
}

interface AnalysisData {
    patientHistorySummary: string;
    suggestedFollowUpQuestions: string[];
    potentialRemedyAnalysis: Remedy[];
    disclaimer: string;
}

const useCopyToClipboard = (): [string, (text: string) => void] => {
    const [copyStatus, setCopyStatus] = useState('Copy');
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopyStatus('Copied!');
            setTimeout(() => setCopyStatus('Copy'), 2000);
        }, () => {
            setCopyStatus('Failed');
            setTimeout(() => setCopyStatus('Copy'), 2000);
        });
    };
    return [copyStatus, copyToClipboard];
};


const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    const html = marked.parse(content, { gfm: true, breaks: true });
    return <div className="prose dark:prose-invert max-w-none prose-p:leading-relaxed prose-headings:font-semibold prose-li:my-1" dangerouslySetInnerHTML={{ __html: html }} />;
};

const CollapsibleSection: React.FC<{title: string, icon: React.ReactNode, children: React.ReactNode, copyText?: string}> = ({title, icon, children, copyText}) => {
    const [isOpen, setIsOpen] = useState(true);
    const [copyStatus, copy] = useCopyToClipboard();

    return (
        <div className="border-b border-black/10 dark:border-white/10 last:border-b-0">
            <div
                className="w-full flex items-center justify-between p-4 text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-3">
                    {icon}
                    <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
                </div>
                <div className="flex items-center gap-2">
                    {copyText && (
                        <button onClick={() => copy(copyText)} className="text-xs font-semibold text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1 p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10">
                            <CopyIcon className="w-4 h-4" />
                            {copyStatus}
                        </button>
                    )}
                    <button onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
                         <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="p-4 pt-0 text-gray-700 dark:text-gray-300">
                    {children}
                </div>
            )}
        </div>
    )
};

const MatchStrengthBadge: React.FC<{ strength: Remedy['matchStrength']}> = ({ strength }) => {
    const styles = {
        High: 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300',
        Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300',
        Low: 'bg-gray-100 text-gray-800 dark:bg-gray-500/20 dark:text-gray-300',
    };
    const strengthKey = strength as keyof typeof styles;
    const style = styles[strengthKey] || styles.Low;
    return <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${style}`}>{strength} Match</span>;
};

const RemedyCard: React.FC<{remedy: Remedy}> = ({remedy}) => {
    const [copyStatus, copy] = useCopyToClipboard();
    const copyContent = `Remedy: ${remedy.remedyName}\nMatch: ${remedy.matchStrength}\nKey Symptoms: ${remedy.keySymptoms.join(', ')}\nRationale: ${remedy.rationale}\nPotency: ${remedy.potency}\nDosage: ${remedy.dosage}`;

    return (
        <div className="bg-white/50 dark:bg-gray-900/50 p-4 rounded-lg border border-black/10 dark:border-white/10 flex flex-col backdrop-blur-sm">
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-md text-green-700 dark:text-green-400">{remedy.remedyName}</h4>
                <MatchStrengthBadge strength={remedy.matchStrength} />
            </div>
            
            <div className="flex-grow space-y-3 text-sm mb-4">
                <div>
                    <h5 className="font-semibold text-gray-600 dark:text-gray-400 text-xs mb-1">Key Symptoms Covered</h5>
                    <ul className="list-disc list-outside pl-4 text-gray-700 dark:text-gray-300">
                        {remedy.keySymptoms.map((symptom, i) => <li key={i} className="mb-0.5">{symptom}</li>)}
                    </ul>
                </div>
                 <p><strong className="font-semibold text-gray-600 dark:text-gray-400">Rationale:</strong> {remedy.rationale}</p>
                 <p><strong className="font-semibold text-gray-600 dark:text-gray-400">Suggested Potency:</strong> {remedy.potency}</p>
                 <p><strong className="font-semibold text-gray-600 dark:text-gray-400">Suggested Dosage:</strong> {remedy.dosage}</p>
            </div>
             <button onClick={() => copy(copyContent)} className="mt-auto text-xs font-semibold text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1 p-1.5 rounded-md hover:bg-black/10 dark:hover:bg-white/10 self-start">
                <CopyIcon className="w-4 h-4" />
                {copyStatus} Details
            </button>
        </div>
    );
};

const StructuredAnalysis: React.FC<{data: AnalysisData}> = ({data}) => (
    <div className="space-y-1">
        <CollapsibleSection 
            title="Patient History Summary" 
            icon={<SummaryIcon className="w-5 h-5 text-gray-500" />}
            copyText={data.patientHistorySummary}
        >
            <p className="whitespace-pre-wrap text-sm leading-relaxed">{data.patientHistorySummary}</p>
        </CollapsibleSection>
        <CollapsibleSection 
            title="Suggested Follow-up Questions" 
            icon={<QuestionIcon className="w-5 h-5 text-gray-500" />}
            copyText={data.suggestedFollowUpQuestions.map(q => `- ${q}`).join('\n')}
        >
            <ul className="list-disc list-outside pl-5 space-y-2 text-sm">
                {data.suggestedFollowUpQuestions.map((q, i) => <li key={i}>{q}</li>)}
            </ul>
        </CollapsibleSection>
        <CollapsibleSection title="Potential Remedy Analysis" icon={<RemedyIcon className="w-5 h-5 text-gray-500" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.potentialRemedyAnalysis.map((remedy, i) => <RemedyCard key={i} remedy={remedy} />)}
            </div>
        </CollapsibleSection>
         <div className="p-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <DisclaimerIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs italic text-yellow-800 dark:text-yellow-300">{data.disclaimer}</p>
            </div>
         </div>
    </div>
);

export const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isLoading = message.role === 'model' && message.text === '...';

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-start p-4">
            <TypingIndicator />
        </div>
      );
    }
    
    try {
        const data: AnalysisData = JSON.parse(message.text);
        // Basic validation to ensure it's our structured data and not some other JSON
        if (data && data.patientHistorySummary && data.potentialRemedyAnalysis) {
            return <StructuredAnalysis data={data} />;
        }
        throw new Error("JSON does not match analysis schema.");
    } catch (error) {
        // Fallback for plain text (welcome, errors), markdown
        return <div className="p-4"><MarkdownRenderer content={message.text} /></div>;
    }
  };


  return (
    <div className={`flex items-start gap-4 p-4 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700/50 flex items-center justify-center text-gray-600 dark:text-gray-300">
          <BotIcon className="w-6 h-6" />
        </div>
      )}

      <div className={`rounded-2xl overflow-hidden shadow-sm ${isUser ? 'bg-green-600/90 text-white max-w-xl' : 'bg-white/60 dark:bg-gray-800/60 dark:text-gray-200 max-w-3xl w-full border border-black/10 dark:border-white/10 backdrop-blur-lg'}`}>
        {message.role === 'user' ? (
          <div className="flex flex-col gap-2 p-3">
            {message.text && <p className="whitespace-pre-wrap">{message.text}</p>}
            {message.imageUrl && <img src={message.imageUrl} alt="Patient History" className="max-w-xs max-h-80 rounded-lg" />}
          </div>
        ) : (
           renderContent()
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-700/50 flex items-center justify-center text-green-600 dark:text-green-400 border border-black/10 dark:border-white/10">
          <DoctorIcon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};
