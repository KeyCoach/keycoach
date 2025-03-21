// components/test-type-selector.tsx
"use client";
import { TestType } from "@/app/lib/types";
import { Hourglass, Quote } from "react-bootstrap-icons";

interface TestTypeSelectorProps {
    testType: TestType;
    setTestType: (type: TestType) => void;
    wordCount: number;
    setWordCount: (count: number) => void;
    duration: number;
    setDuration: (duration: number) => void;
}

export function TestTypeSelector({
    testType,
    setTestType,
    wordCount,
    setWordCount,
    duration,
    setDuration,
}: TestTypeSelectorProps) {
    return (
        <div className="flex justify-center" id="test-type-selector">
            <div>
                <div className="flex rounded-lg bg-slate-100 py-2 dark:bg-slate-900">
                    <div
                        className={`mx-2 flex cursor-pointer items-center ${testType === TestType.Timed ? "text-orange-600 dark:text-yellow-400" : "text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-50"}`}
                        onClick={() => setTestType(TestType.Timed)}
                    >
                        <div className="inline-block pe-1">
                            <Hourglass />
                        </div>
                        Time
                    </div>
                    <div
                        className={`mx-2 flex cursor-pointer items-center ${testType === TestType.Words ? "text-orange-600 dark:text-yellow-400" : "text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-50"}`}
                        onClick={() => setTestType(TestType.Words)}
                    >
                        <span className="pe-2 font-serif">A</span>
                        Words
                    </div>
                    <div
                        className={`mx-2 flex cursor-pointer items-center ${testType === TestType.Quote ? "text-orange-600 dark:text-yellow-400" : "text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-50"}`}
                        onClick={() => setTestType(TestType.Quote)}
                    >
                        <div className="inline-block pe-1 pt-[0.1rem]">
                            <Quote />
                        </div>
                        Quote
                    </div>
                    {testType !== TestType.Quote && (
                        <div className="ms-2 flex items-center text-lg leading-none">|</div>
                    )}

                    <div
                        className={`${testType !== TestType.Quote ? "ms-4" : ""} flex items-center gap-x-6 overflow-hidden leading-none`}
                        style={{
                            width: testType === TestType.Words ? "14rem" : "0",
                            transition: "width 0.5s",
                        }}
                    >
                        <div
                            className={`cursor-pointer ${wordCount === 10 ? "text-orange-600 dark:text-yellow-400" : "text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-50"}`}
                            onClick={() => setWordCount(10)}
                        >
                            10
                        </div>
                        <div
                            className={`cursor-pointer ${wordCount === 25 ? "text-orange-600 dark:text-yellow-400" : "text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-50"}`}
                            onClick={() => setWordCount(25)}
                        >
                            25
                        </div>
                        <div
                            className={`cursor-pointer ${wordCount === 50 ? "text-orange-600 dark:text-yellow-400" : "text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-50"}`}
                            onClick={() => setWordCount(50)}
                        >
                            50
                        </div>
                        <div
                            className={`cursor-pointer ${wordCount === 100 ? "text-orange-600 dark:text-yellow-400" : "text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-50"}`}
                            onClick={() => setWordCount(100)}
                        >
                            100
                        </div>
                        <div>words</div>
                    </div>

                    <div
                        className="flex items-center gap-x-6 overflow-hidden leading-none mr-2"
                        style={{
                            width: testType === TestType.Timed ? "15rem" : "0",
                            transition: "width 0.5s",
                        }}
                    >
                        <div
                            className={`cursor-pointer ${duration === 15 ? "text-orange-600 dark:text-yellow-400" : "text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-50"}`}
                            onClick={() => setDuration(15)}
                        >
                            15
                        </div>
                        <div
                            className={`cursor-pointer ${duration === 30 ? "text-orange-600 dark:text-yellow-400" : "text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-50"}`}
                            onClick={() => setDuration(30)}
                        >
                            30
                        </div>
                        <div
                            className={`cursor-pointer ${duration === 60 ? "text-orange-600 dark:text-yellow-400" : "text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-50"}`}
                            onClick={() => setDuration(60)}
                        >
                            60
                        </div>
                        <div
                            className={`cursor-pointer ${duration === 120 ? "text-orange-600 dark:text-yellow-400" : "text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-50"}`}
                            onClick={() => setDuration(120)}
                        >
                            120
                        </div>
                        <div>seconds</div>
                    </div>
                </div>
            </div>
        </div>
    );
}