import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import type { CSSProperties } from "react";
import { KanagamLogo } from "@/components/KanagamLogo";
import { ShiningBackground } from "@/components/ShiningBackground";
import {
  Send,
  CheckCircle2,
  GraduationCap,
  User,
  Mail,
  Phone,
  Building2,
  MessageSquare,
  Sparkles,
  ArrowLeft,
  BookOpen,
} from "lucide-react";

// TODO: Replace with your Formspree form ID for student enquiries
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

const STUDENT_INTEREST_OPTIONS = [
  "Hands-on Technical Bootcamps",
  "Workshop",
  "Global Certifications & Training",
  "Internship / Industrial Training",
  "Final-Year Project Guidance",
  "Startup Incubation Support",
  "Quantum & AI Learning Tracks",
];

const DEPARTMENT_OPTIONS = [
  "Mechanical Engineering",
  "ECE",
  "EEE",
  "Mechatronics Engineering",
  "Automobile Engineering",
  "AIDS",
  "AIML",
  "Others",
];

const YEAR_OF_STUDY_OPTIONS = ["1-st year", "2nd-year", "3rd-year", "4th-year"];

export const Route = createFileRoute("/student-enquire")({
  head: () => ({
    meta: [
      { title: "Student Enquiry | Bootcamps, Internships & Certifications" },
      {
        name: "description",
        content:
          "Students & engineers: hands-on bootcamps, global certifications, internships, industrial training, final-year projects and quantum & AI learning tracks with Kanagam Tech.",
      },
      {
        name: "keywords",
        content:
          "student enquiry, engineering bootcamps, technical training for students, internships, industrial training, certifications, final year projects, startup incubation, quantum AI learning tracks",
      },
      { property: "og:title", content: "Student Enquiry — Kanagam Technology Solutions" },
      {
        property: "og:description",
        content:
          "Hands-on bootcamps, global certifications, internships and deep-tech learning tracks for students and fresh engineers.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://kanagamtech.in/student-enquire" },
    ],
    links: [{ rel: "canonical", href: "https://kanagamtech.in/student-enquire" }],
  }),
  component: StudentEnquirePage,
});

function StudentEnquirePage() {
  return (
    <main
      className="relative min-h-screen overflow-hidden font-sans"
      style={
        {
          background: "linear-gradient(155deg, #7a2a63 0%, #4B1D3F 32%, #2b0b30 64%, #18051e 100%)",
          ["--background"]: "#17061f",
          ["--foreground"]: "#F7EDE3",
          ["--muted-foreground"]: "#D0B8A8",
          ["--card"]: "#23102b",
          ["--card-foreground"]: "#F7EDE3",
          ["--border"]: "rgba(240,196,120,0.24)",
        } as CSSProperties
      }
    >
      <ShiningBackground variant="strong" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.25] [background-image:var(--grain)]" />

      {/* Simple Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-3">
            <KanagamLogo size="md" />
          </Link>
          <Link
            to="/"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[0.6rem] tracking-[0.18em] text-foreground uppercase font-semibold transition-colors hover:bg-secondary sm:px-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </Link>
        </div>
      </header>

      {/* Page Content */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 pt-16 pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-[0.65rem] tracking-[0.25em] text-primary uppercase">
            <GraduationCap className="h-3.5 w-3.5" />
            For Students &amp; Fresh Engineers
          </div>
          <h1 className="font-display mt-4 text-[clamp(2rem,5vw,3rem)] leading-tight font-bold tracking-tight text-foreground">
            Student Enquire
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Kick-start your deep-tech career. Tell us what you're looking for — training,
            certifications, internships, or project guidance — and our academic team will get back
            to you.
          </p>
        </div>

        <StudentEnquiryForm />
      </section>
    </main>
  );
}

function StudentEnquiryForm() {
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
      const response = await fetch(FORMSPREE_ENDPOINT, {
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

  if (submitted) {
    return (
      <div className="mt-12 rounded-2xl border border-primary/40 bg-primary/5 p-8 text-center animate-in fade-in zoom-in duration-300">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-primary">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="font-display mt-4 text-2xl font-bold text-foreground">
          Enquiry Submitted Successfully
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Thank you, <span className="font-semibold text-foreground">{formData.fullName}</span>. Our
          academic team will reach out to you shortly at{" "}
          <span className="font-semibold text-foreground">{formData.email}</span>.
        </p>
        <button
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
          className="mt-6 rounded-full border border-border px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-foreground transition-colors hover:bg-secondary"
        >
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-12 rounded-3xl border border-primary/30 bg-gradient-to-b from-card via-card/80 to-background p-8 md:p-10 shadow-2xl backdrop-blur-xl"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {/* Full Name */}
        <div>
          <label
            htmlFor="student-name"
            className="flex items-center gap-2 text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase font-semibold"
          >
            <User className="h-3.5 w-3.5 text-primary" />
            Full Name *
          </label>
          <input
            id="student-name"
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="e.g. Priya Sharma"
            className="mt-2 w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="student-email"
            className="flex items-center gap-2 text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase font-semibold"
          >
            <Mail className="h-3.5 w-3.5 text-primary" />
            Email Address *
          </label>
          <input
            id="student-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. priya@college.edu"
            className="mt-2 w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="student-phone"
            className="flex items-center gap-2 text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase font-semibold"
          >
            <Phone className="h-3.5 w-3.5 text-primary" />
            Phone / WhatsApp Number
          </label>
          <input
            id="student-phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="e.g. +91 98765 43210"
            className="mt-2 w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>

        {/* Institution */}
        <div>
          <label
            htmlFor="student-institution"
            className="flex items-center gap-2 text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase font-semibold"
          >
            <Building2 className="h-3.5 w-3.5 text-primary" />
            College / Institution *
          </label>
          <input
            id="student-institution"
            type="text"
            required
            value={formData.institution}
            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
            placeholder="e.g. Anna University"
            className="mt-2 w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
      </div>

      {/* 2-column grid for Department & Year of Study */}
      <div className="mt-6 grid gap-6 md:grid-cols-2 items-start">
        {/* Department Dropdown & Optional Custom Input */}
        <div>
          <label
            htmlFor="student-dept"
            className="flex items-center gap-2 text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase font-semibold"
          >
            <BookOpen className="h-3.5 w-3.5 text-primary" />
            Department *
          </label>
          <select
            id="student-dept"
            required
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className="mt-2 w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
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
            <div className="mt-3 animate-in fade-in slide-in-from-top-1 duration-200">
              <label
                htmlFor="student-custom-dept"
                className="flex items-center gap-2 text-[0.6rem] tracking-[0.2em] text-primary uppercase font-mono font-semibold"
              >
                Specify Your Department *
              </label>
              <input
                id="student-custom-dept"
                type="text"
                required
                value={formData.customDepartment}
                onChange={(e) => setFormData({ ...formData, customDepartment: e.target.value })}
                placeholder="e.g. Biomedical / Chemical Engineering"
                className="mt-1 w-full rounded-xl border border-primary/40 bg-background/90 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          )}
        </div>

        {/* Year of Study Dropdown */}
        <div>
          <label
            htmlFor="student-year"
            className="flex items-center gap-2 text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase font-semibold"
          >
            <GraduationCap className="h-3.5 w-3.5 text-primary" />
            Year of Study *
          </label>
          <select
            id="student-year"
            required
            value={formData.yearOfStudy}
            onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })}
            className="mt-2 w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
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
      <div className="mt-6">
        <span className="mb-2 block text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase font-semibold">
          What are you interested in? (Select all that apply)
        </span>
        <div className="flex flex-wrap gap-2">
          {STUDENT_INTEREST_OPTIONS.map((option) => {
            const active = formData.interests.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => toggleInterest(option)}
                className={`rounded-full px-3.5 py-1.5 text-xs tracking-wide transition-all ${
                  active
                    ? "bg-primary font-medium text-primary-foreground shadow-md shadow-primary/20"
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
      <div className="mt-6">
        <label
          htmlFor="student-message"
          className="flex items-center gap-2 text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase font-semibold"
        >
          <MessageSquare className="h-3.5 w-3.5 text-primary" />
          Your Goals &amp; Requirements *
        </label>
        <textarea
          id="student-message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us about your career goals, current skill level, preferred learning mode (online / offline), or any specific requirements..."
          className="mt-2 w-full resize-y rounded-xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
        />
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mt-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-center text-xs text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <div className="mt-8 text-center">
        <button
          type="submit"
          disabled={loading}
          className="group inline-flex items-center justify-center gap-3 rounded-full bg-[image:var(--gradient-gold)] px-9 py-3.5 text-xs font-medium tracking-[0.25em] text-primary-foreground uppercase shadow-[var(--shadow-gold)] transition-transform hover:-translate-y-0.5 disabled:opacity-50"
        >
          {loading ? (
            <span>Processing...</span>
          ) : (
            <>
              <span>Submit Enquiry</span>
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
        <p className="mt-4 flex items-center justify-center gap-1.5 text-[0.6rem] tracking-[0.2em] text-muted-foreground/70 uppercase font-mono">
          <Sparkles className="h-3 w-3 text-primary" />
          Our team typically responds within 24–48 hours
        </p>
      </div>
    </form>
  );
}
