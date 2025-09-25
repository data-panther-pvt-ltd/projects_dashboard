
import { useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";

interface FaqItem {
    q: string;
    a: string;
}

interface FaqsCardProps {
    faqsList: FaqItem;
    idx: number;
}

const FaqsCard = (props: FaqsCardProps) => {
    const answerElRef = useRef<HTMLDivElement>(null);
    const [state, setState] = useState<boolean>(false);
    const [answerH, setAnswerH] = useState<string>('0px');
    const { faqsList, idx } = props;

    const handleOpenAnswer = () => {
        if (answerElRef.current && answerElRef.current.childNodes[0] instanceof HTMLElement) {
            const answerElH = answerElRef.current.childNodes[0].offsetHeight;
            setState(!state);
            setAnswerH(`${answerElH + 20}px`);
        }
    };

    return (
        <div 
            className="space-y-3  mt-5 overflow-hidden border-b"
            key={idx}
            onClick={handleOpenAnswer}
        >
            <h4 className="cursor-pointer pb-5 flex items-center justify-between text-lg text-gray-700 font-medium">
                {faqsList.q}
                {
                    state ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    )
                }
            </h4>
            <div
                ref={answerElRef} className="duration-300"
                style={state ? {height: answerH } : {height: '0px'}}
            >
                <div>
                    <p className="text-gray-500">
                        {faqsList.a}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default () => {

    const { t } = useLanguage();

    const faqsList: FaqItem[] = [
        {
            q: t('faq.item1.q'),
            a: t('faq.item1.a')
        },
        {
            q: t('faq.item2.q'),
            a: t('faq.item2.a')
        },
        {
            q: t('faq.item3.q'),
            a: t('faq.item3.a')
        },
        {
            q: t('faq.item4.q'),
            a: t('faq.item4.a')
        }
    ];

    return (
        <section className="bg-white leading-relaxed max-w-screen-xl mt-12 mx-auto py-24 px-4 md:px-8">
            <div className="space-y-3 text-center">
                <h1 className="text-3xl text-gray-800 font-semibold">
                    {t('faqs.heading')}
                </h1>
                <p className="text-gray-600 max-w-lg mx-auto text-lg">
                    {t('faqs.subtitle')}
                </p>
            </div>
            <div className="mt-14 max-w-2xl mx-auto">
                {
                    faqsList.map((item, idx) => (
                        <FaqsCard
                            key={idx}
                            idx={idx}
                            faqsList={item}
                        />
                    ))
                }
            </div>
        </section>
    )
}
