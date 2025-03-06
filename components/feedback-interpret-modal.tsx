"use client";
import { useEffect, useState } from "react";
import { Modal } from "@/components";
import Image from "next/image";
import { Button } from "@/components";

type FeedbackStep = {
  title: string;
  description: string;
  imagePath: string;
};

export function FeedbackInterpretModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);

  // Reset step when modal is opened
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);

  const steps: FeedbackStep[] = [
    {
      title: "Camera Tracking",
      description:
        "The camera will track your fingers as you type and give you dynamic feedback on your typing technique.",
      imagePath: "/img/feedback-interpretation/normal-typing.png",
    },
    {
      title: "Wrong Letter Detection",
      description:
        "Just as a normal typing test will tell you if you type the wrong letter, this test will indicate that by highlighting a character in red.",
      imagePath: "/img/feedback-interpretation/incorrect-letter.png",
    },
    {
      title: "Finger Technique",
      description:
        "If you type a character with the wrong finger, it will be highlighted in orange. This helps you develop proper finger positioning.",
      imagePath: "/img/feedback-interpretation/incorrect-finger.png",
    },
    {
      title: "Interpreting Both Errors",
      description:
        "If you type a character with the wrong finger and the wrong letter, both errors will be highlighted. Wrong letters in red and wrong fingers in orange.",
      imagePath: "/img/feedback-interpretation/both-mistakes.png",
    },
  ];

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Modal
      modalTitle="How to Interpret Feedback"
      isOpen={isOpen}
      onCloseAction={onClose}
      confirmButtonAction={onClose}
      showCloseButton={false}
      maxWidth="max-w-3xl"
    >
      <div className="px-2 py-4">
        <div className="mb-6 text-center">
          <h3 className="mb-2 text-xl font-bold text-slate-800 dark:text-slate-200">
            {steps[currentStep].title}
          </h3>
          <p className="mx-auto mb-6 max-w-xl text-slate-600 dark:text-slate-400">
            {steps[currentStep].description}
          </p>

          <div className="relative mx-auto mb-8 overflow-hidden rounded-lg border border-slate-200 shadow-md dark:border-slate-700">
            <Image
              src={steps[currentStep].imagePath}
              alt={`${steps[currentStep].title} illustration`}
              width={500}
              height={300}
              className="bg-slate-100 dark:bg-slate-800"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Button
              colorTheme="obsidian"
              variant="previous-nav"
              onClick={goToPrevStep}
              className={currentStep < 1 ? "invisible" : ""}
            >
              Previous
            </Button>
          </div>

          <div className="mx-auto flex space-x-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  currentStep === index ? "bg-cerulean-500" : "bg-slate-300 dark:bg-slate-600"
                }`}
              />
            ))}
          </div>

          <Button colorTheme="cerulean" variant="next-nav" onClick={goToNextStep}>
            {currentStep < steps.length - 1 ? "Next" : "Got it!"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
