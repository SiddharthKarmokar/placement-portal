import { useState, useRef } from "react";
import { 
  Briefcase, Calendar, Users, FileText, CheckCircle, 
  Search, Send, ListCheck, Clock, Award, Mail 
} from "lucide-react";
import { motion, useInView } from "framer-motion";

const icons = [
  Search, Briefcase, Users, Send, ListCheck,
  CheckCircle, Clock, Users, Award, Mail,
];

const steps = [
  { title: "Job Verification", description: "TPO verifies job details and remuneration." },
  { title: "Job Posting", description: "Verified jobs are published by the Placement Office." },
  { title: "Student Registration", description: "Students apply for available opportunities." },
  { title: "Resume Sharing", description: "Applications are sent to companies." },
  { title: "Assessment Process", description: "Companies conduct tests and screenings." },
  { title: "Shortlisting", description: "Candidates are shortlisted for interviews." },
  { title: "Interview Scheduling", description: "Dates finalized with Placement Office." },
  { title: "Final Interviews", description: "Organizations conduct final rounds." },
  { title: "Selection Notification", description: "Students accept or decline offers." },
  { title: "Offer Letter Distribution", description: "Companies issue final offer letters." },
];

const StepCard = ({ step, index, isEven, isActive, onHover }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const IconComponent = icons[index];

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col md:flex-row items-center ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } mb-6`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Icon */}
      <div className="md:w-1/3 flex justify-center mb-3 md:mb-0 relative">
        <motion.div
          className={`w-12 h-12 rounded-full bg-blue-900 text-white flex items-center justify-center shadow-md`}
          whileHover={{ scale: 1.05 }}
          animate={isActive ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <IconComponent className="w-5 h-5" />
        </motion.div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white border-2 border-lime-500 flex items-center justify-center text-xs font-bold text-blue-900 shadow">
          {index + 1}
        </div>
      </div>

      {/* Content */}
      <div className="md:w-2/3 px-3">
        <motion.div
          className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${
            isEven ? "border-l-blue-900" : "border-l-lime-500"
          } ${isActive ? "scale-[1.02]" : ""}`}
          whileHover={{ y: -3 }}
          
        >
          <h3
            className={`text-lg font-semibold ${
              isEven ? "text-blue-900" : "text-lime-500"
            } mb-1`}
          >
            {step.title}
          </h3>
          <p className="text-gray-600 text-sm">{step.description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const PlacementProcess = () => {
  const [activeStep, setActiveStep] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-lime-50/40" ref={ref}>
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-lime-500 bg-clip-text text-transparent mb-2">
            Placement Process
          </h2>
          <p className="text-base text-gray-600">
            A simple 10-step journey from job verification to offer letters.
          </p>
        </motion.div>

        {/* Steps */}
        <div>
          {steps.map((step, index) => (
            <StepCard
              key={index}
              step={step}
              index={index}
              isEven={index % 2 === 0}
              isActive={activeStep === index}
              onHover={setActiveStep}
              transition={{ duration: 1 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlacementProcess;
