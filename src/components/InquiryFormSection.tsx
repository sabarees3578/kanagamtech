import { useState, useEffect } from "react";
import {
  Send,
  CheckCircle2,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Sparkles,
  GraduationCap,
  BookOpen,
} from "lucide-react";

// TODO: Replace with your Formspree form IDs (from https://formspree.io → your form → Endpoint)
const FORMSPREE_PARTNERSHIP_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
const FORMSPREE_STUDENT_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

const INSTITUTIONAL_INTEREST_OPTIONS = [
  "Industrial visit",
  "Curriculum Modernization",
  "MOU",
  "BOS",
  "lab setup",
  "New product development ",
  "Center of Excellence (CoE)",
  "Incubation & Startup Hub",
  "Global Certifications & Training",
  "Quantum Hardware / Co-R&D",
  "Semiconductor & Edge Solutions",
];

const STUDENT_INTEREST_OPTIONS = [
  "Industrial vist",
  "hacktaton support",
  "New product development",
  "Hands-on Technical Bootcamps",
  "Workshop",
  "Internship / Industrial Training",
  "Final-Year Project Guidance",
  "AI Learning Tracks",
  "Startup Incubation Support",
];

export const DEPARTMENT_OPTIONS = [
  "Mechanical Engineering",
  "ECE",
  "EEE",
  "Mechatronics Engineering",
  "Automobile Engineering",
  "AIDS",
  "IT",
  "AIML",
  "Others",
];

export const YEAR_OF_STUDY_OPTIONS = ["1-st year", "2nd-year", "3rd-year", "4th-year"];

type TabType = "institutional" | "student";

export function InquiryFormSection() {
  const [activeTab, setActiveTab] = useState<TabType>("institutional");

  // Sync active tab with URL hash if user clicks header nav or direct links
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#student-inquire") {
        setActiveTab("student");
      } else if (
        window.location.hash === "#institutional-inquire" ||
        window.location.hash === "#inquire"
      ) {
        setActiveTab("institutional");
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <section id="inquire" className="relative z-10 mx-auto max-w-4xl px-6 py-24">
      {/* Section Header */}
      <div className="mx-auto max-w-3xl text-center mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-[0.65rem] tracking-[0.25em] text-primary uppercase font-mono font-medium">
          <Sparkles className="h-3.5 w-3.5" />
          Connect, Collaborate &amp; Learn
        </div>
        <h2 className="font-display mt-4 text-[clamp(1.9rem,4.5vw,2.8rem)] font-bold tracking-tight text-foreground">
          Partner With Us or Start Your Journey
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground font-normal">
          Toggle between Institutional Partnerships and Student Enquiries to transmit your
          requirements directly to our team.
        </p>
      </div>

      {/* Interactive Toggle Switch */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex max-w-full flex-wrap justify-center gap-1.5 rounded-full border border-primary/30 bg-background/90 p-1.5 shadow-xl backdrop-blur-md">
          <button
            type="button"
            onClick={() => setActiveTab("institutional")}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 ${
              activeTab === "institutional"
                ? "bg-[#4B1D3F] text-white dark:bg-[#D7AB6A] dark:text-[#4B1D3F] shadow-md scale-[1.02]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            <span>Academic &amp; Enterprise Partnership</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("student")}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 ${
              activeTab === "student"
                ? "bg-[#4B1D3F] text-white dark:bg-[#D7AB6A] dark:text-[#4B1D3F] shadow-md scale-[1.02]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <GraduationCap className="h-3.5 w-3.5 shrink-0" />
            <span>Student Enquire</span>
          </button>
        </div>
      </div>

      {/* Single Dynamic Card Container */}
      <div
        id={activeTab === "institutional" ? "institutional-inquire" : "student-inquire"}
        className="rounded-3xl border border-primary/30 bg-gradient-to-b from-card via-card/80 to-background p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl transition-all duration-300"
      >
        {activeTab === "institutional" ? <InstitutionalInquiryForm /> : <StudentInquiryForm />}
      </div>
    </section>
  );
}

/** Institutional & Enterprise Partnership Form */
function InstitutionalInquiryForm() {
  const [formData, setFormData] = useState({
    institution: "",
    fullName: "",
    email: "",
    phone: "",
    location: "",
    interests: [] as string[],
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(FORMSPREE_PARTNERSHIP_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          formType: "institutional-partnership",
          institution: formData.institution,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          interests: formData.interests.join(", "),
          message: formData.message,
          _subject: `New Partnership Inquiry — ${formData.institution}`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Submission failed (${response.status})`);
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? `Something went wrong while sending your inquiry. (${err.message})`
          : "Something went wrong while sending your inquiry. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300">
      {/* Form Header */}
      <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[0.62rem] tracking-[0.22em] text-primary uppercase font-mono font-medium w-fit">
        <Sparkles className="h-3 w-3" />
        Connect &amp; Collaborate
      </div>

      <h3 className="font-display mt-3 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
        Academic &amp; Enterprise Partnership
      </h3>
      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground font-normal">
        Share your institution's goals, research vision, or deep-tech requirements. Our team will
        tailor a collaboration roadmap for your organization.
      </p>

      {submitted ? (
        <div className="mt-8 rounded-2xl border border-primary/40 bg-primary/5 p-8 text-center animate-in fade-in zoom-in duration-300">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h4 className="font-display mt-3 text-lg font-bold text-foreground">
            Inquiry Submitted Successfully
          </h4>
          <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-muted-foreground">
            Thank you, <span className="font-semibold text-foreground">{formData.fullName}</span>{" "}
            from{" "}
            <span className="font-semibold text-foreground">
              {formData.institution || "your organization"}
            </span>
            . A Kanagam Tech specialist will contact you shortly.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setError(null);
              setFormData({
                institution: "",
                fullName: "",
                email: "",
                phone: "",
                location: "",
                interests: [],
                message: "",
              });
            }}
            className="mt-5 rounded-full border border-border px-5 py-2 text-[0.65rem] font-bold uppercase tracking-widest text-foreground transition-colors hover:bg-secondary"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* 2-column input grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Institution Name */}
            <div>
              <label
                htmlFor="inst-institution"
                className="flex items-center gap-1.5 text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase font-semibold"
              >
                <Building2 className="h-3 w-3 text-primary" />
                Institution / Organization *
              </label>
              <input
                id="inst-institution"
                type="text"
                required
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                placeholder="e.g. Anna University, Chennai"
                className="mt-1.5 w-full rounded-xl border border-border bg-background/80 px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            {/* Contact Full Name */}
            <div>
              <label
                htmlFor="inst-name"
                className="flex items-center gap-1.5 text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase font-semibold"
              >
                <User className="h-3 w-3 text-primary" />
                Contact Person Name *
              </label>
              <input
                id="inst-name"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Dr. Priya Raghavan"
                className="mt-1.5 w-full rounded-xl border border-border bg-background/80 px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="inst-email"
                className="flex items-center gap-1.5 text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase font-semibold"
              >
                <Mail className="h-3 w-3 text-primary" />
                Official Email Address *
              </label>
              <input
                id="inst-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. contact@university.edu"
                className="mt-1.5 w-full rounded-xl border border-border bg-background/80 px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="inst-phone"
                className="flex items-center gap-1.5 text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase font-semibold"
              >
                <Phone className="h-3 w-3 text-primary" />
                Phone / WhatsApp Number
              </label>
              <input
                id="inst-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. +91 98765 43210"
                className="mt-1.5 w-full rounded-xl border border-border bg-background/80 px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>

          {/* Campus Location */}
          <div>
            <label
              htmlFor="inst-location"
              className="flex items-center gap-1.5 text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase font-semibold"
            >
              <MapPin className="h-3 w-3 text-primary" />
              Campus Location &amp; Region
            </label>
            <input
              id="inst-location"
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Chennai, Tamil Nadu / Coimbatore, India"
              className="mt-1.5 w-full rounded-xl border border-border bg-background/80 px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>

          {/* Interest Badges Selection */}
          <div>
            <span className="text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase font-semibold block mb-2">
              Areas of Interest (Select all that apply)
            </span>
            <div className="flex flex-wrap gap-1.5">
              {INSTITUTIONAL_INTEREST_OPTIONS.map((option) => {
                const active = formData.interests.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleInterest(option)}
                    className={`rounded-full px-3 py-1 text-[0.7rem] font-light tracking-wide transition-all ${
                      active
                        ? "bg-primary text-primary-foreground font-medium shadow-sm shadow-primary/20"
                        : "border border-border bg-background/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    {active && "✓ "}
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="inst-message"
              className="flex items-center gap-1.5 text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase font-semibold"
            >
              <MessageSquare className="h-3 w-3 text-primary" />
              Collaboration Scope &amp; Details *
            </label>
            <textarea
              id="inst-message"
              required
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your academic department, current technology setup, research goals, or specific partnership requirements..."
              className="mt-1.5 w-full rounded-xl border border-border bg-background/80 px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-y"
            />
          </div>

          {/* Error Banner */}
          {error && (
            <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-3.5 py-2 text-center text-xs text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2 text-center">
            <button
              type="submit"
              disabled={loading}
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-[image:var(--gradient-gold)] px-9 py-3 text-xs font-bold tracking-[0.22em] text-primary-foreground uppercase shadow-[var(--shadow-gold)] transition-transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              {loading ? (
                <span>Processing...</span>
              ) : (
                <>
                  <span>Transmit Inquiry</span>
                  <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

/** Student & Fresh Engineer Enquiry Form */
function StudentInquiryForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    institution: "",
    department: "",
    customDepartment: "",
    yearOfStudy: "",
    interests: [] as string[],
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const resolvedDepartment =
      formData.department === "Others" && formData.customDepartment.trim()
        ? `Others (${formData.customDepartment.trim()})`
        : formData.department;

    try {
      const response = await fetch(FORMSPREE_STUDENT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          formType: "student-enquiry",
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          institution: formData.institution,
          department: resolvedDepartment,
          customDepartment: formData.customDepartment,
          yearOfStudy: formData.yearOfStudy,
          departmentYear: `${resolvedDepartment} — ${formData.yearOfStudy}`,
          interests: formData.interests.join(", "),
          message: formData.message,
          _subject: `New Student Enquiry — ${formData.fullName} (${resolvedDepartment})`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Submission failed (${response.status})`);
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? `Something went wrong while sending your enquiry. (${err.message})`
          : "Something went wrong while sending your enquiry. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300">
      {/* Form Header */}
      <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[0.62rem] tracking-[0.22em] text-primary uppercase font-mono font-medium w-fit">
        <GraduationCap className="h-3 w-3" />
        For Students &amp; Fresh Engineers
      </div>

      <h3 className="font-display mt-3 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
        Student Enquire
      </h3>
      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground font-normal">
        Kick-start your deep-tech career. Tell us what you're looking for — bootcamps,
        certifications, internships, or project guidance — and our academic team will reach out.
      </p>

      {submitted ? (
        <div className="mt-8 rounded-2xl border border-primary/40 bg-primary/5 p-8 text-center animate-in fade-in zoom-in duration-300">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h4 className="font-display mt-3 text-lg font-bold text-foreground">
            Enquiry Submitted Successfully
          </h4>
          <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-muted-foreground">
            Thank you, <span className="font-semibold text-foreground">{formData.fullName}</span>.
            Our academic team will reach out to you shortly at{" "}
            <span className="font-semibold text-foreground">{formData.email}</span>.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setError(null);
              setFormData({
                fullName: "",
                email: "",
                phone: "",
                institution: "",
                department: "",
                customDepartment: "",
                yearOfStudy: "",
                interests: [],
                message: "",
              });
            }}
            className="mt-5 rounded-full border border-border px-5 py-2 text-[0.65rem] font-bold uppercase tracking-widest text-foreground transition-colors hover:bg-secondary"
          >
            Submit Another Enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* 2-column input grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Full Name */}
            <div>
              <label
                htmlFor="std-name"
                className="flex items-center gap-1.5 text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase font-semibold"
              >
                <User className="h-3 w-3 text-primary" />
                Full Name *
              </label>
              <input
                id="std-name"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Priya Sharma"
                className="mt-1.5 w-full rounded-xl border border-border bg-background/80 px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="std-email"
                className="flex items-center gap-1.5 text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase font-semibold"
              >
                <Mail className="h-3 w-3 text-primary" />
                Email Address *
              </label>
              <input
                id="std-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. priya@college.edu"
                className="mt-1.5 w-full rounded-xl border border-border bg-background/80 px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="std-phone"
                className="flex items-center gap-1.5 text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase font-semibold"
              >
                <Phone className="h-3 w-3 text-primary" />
                Phone / WhatsApp Number
              </label>
              <input
                id="std-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. +91 98765 43210"
                className="mt-1.5 w-full rounded-xl border border-border bg-background/80 px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            {/* College / Institution */}
            <div>
              <label
                htmlFor="std-institution"
                className="flex items-center gap-1.5 text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase font-semibold"
              >
                <Building2 className="h-3 w-3 text-primary" />
                College / Institution *
              </label>
              <input
                id="std-institution"
                type="text"
                required
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                placeholder="e.g. Anna University"
                className="mt-1.5 w-full rounded-xl border border-border bg-background/80 px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>

          {/* 2-column grid for Department & Year of Study */}
          <div className="grid gap-4 sm:grid-cols-2 items-start">
            {/* Department Dropdown & Optional Custom Input */}
            <div>
              <label
                htmlFor="std-dept"
                className="flex items-center gap-1.5 text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase font-semibold"
              >
                <BookOpen className="h-3 w-3 text-primary" />
                Department *
              </label>
              <select
                id="std-dept"
                required
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-border bg-background/80 px-3.5 py-2.5 text-xs sm:text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              >
                <option value="" disabled className="bg-card text-muted-foreground">
                  Select Department
                </option>
                {DEPARTMENT_OPTIONS.map((dept) => (
                  <option key={dept} value={dept} className="bg-card text-foreground">
                    {dept}
                  </option>
                ))}
              </select>

              {/* Specify custom department when "Others" is selected */}
              {formData.department === "Others" && (
                <div className="mt-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
                  <label
                    htmlFor="std-custom-dept"
                    className="flex items-center gap-1.5 text-[0.6rem] tracking-[0.2em] text-primary uppercase font-mono font-semibold"
                  >
                    Specify Your Department *
                  </label>
                  <input
                    id="std-custom-dept"
                    type="text"
                    required
                    value={formData.customDepartment}
                    onChange={(e) => setFormData({ ...formData, customDepartment: e.target.value })}
                    placeholder="e.g. Biomedical / Chemical Engineering"
                    className="mt-1 w-full rounded-xl border border-primary/40 bg-background/90 px-3.5 py-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              )}
            </div>

            {/* Year of Study Dropdown */}
            <div>
              <label
                htmlFor="std-year"
                className="flex items-center gap-1.5 text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase font-semibold"
              >
                <GraduationCap className="h-3 w-3 text-primary" />
                Year of Study *
              </label>
              <select
                id="std-year"
                required
                value={formData.yearOfStudy}
                onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-border bg-background/80 px-3.5 py-2.5 text-xs sm:text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              >
                <option value="" disabled className="bg-card text-muted-foreground">
                  Select Year of Study
                </option>
                {YEAR_OF_STUDY_OPTIONS.map((yr) => (
                  <option key={yr} value={yr} className="bg-card text-foreground">
                    {yr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Interest Badges Selection */}
          <div>
            <span className="text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase font-semibold block mb-2">
              What are you interested in? (Select all that apply)
            </span>
            <div className="flex flex-wrap gap-1.5">
              {STUDENT_INTEREST_OPTIONS.map((option) => {
                const active = formData.interests.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleInterest(option)}
                    className={`rounded-full px-3 py-1 text-[0.7rem] font-light tracking-wide transition-all ${
                      active
                        ? "bg-primary text-primary-foreground font-medium shadow-sm shadow-primary/20"
                        : "border border-border bg-background/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    {active && "✓ "}
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="std-message"
              className="flex items-center gap-1.5 text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase font-semibold"
            >
              <MessageSquare className="h-3 w-3 text-primary" />
              Your Goals &amp; Requirements *
            </label>
            <textarea
              id="std-message"
              required
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your career goals, current skill level, preferred learning mode, or any specific requirements..."
              className="mt-1.5 w-full rounded-xl border border-border bg-background/80 px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-y"
            />
          </div>

          {/* Error Banner */}
          {error && (
            <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-3.5 py-2 text-center text-xs text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2 text-center">
            <button
              type="submit"
              disabled={loading}
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-[image:var(--gradient-gold)] px-9 py-3 text-xs font-bold tracking-[0.22em] text-primary-foreground uppercase shadow-[var(--shadow-gold)] transition-transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              {loading ? (
                <span>Processing...</span>
              ) : (
                <>
                  <span>Submit Enquiry</span>
                  <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
