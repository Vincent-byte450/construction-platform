/**
 * ThemeCustomizer — floating panel for live user theme switching
 * Supports: color scheme, dark mode, radius, font size
 */
import { useState } from "react";
import { Settings2, X, Moon, Sun, Monitor, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Theme config ──────────────────────────────────────────────────────────────
const COLOR_SCHEMES = [
  { id: "default", label: "Navy & Amber", primary: "#0e2f5a", accent: "#f07c14" },
  { id: "forest",  label: "Forest",       primary: "#14532d", accent: "#16a34a" },
  { id: "slate",   label: "Slate Pro",    primary: "#1e293b", accent: "#6366f1" },
  { id: "rose",    label: "Rose Gold",    primary: "#881337", accent: "#f43f5e" },
  { id: "ocean",   label: "Ocean",        primary: "#0c4a6e", accent: "#0ea5e9" },
  { id: "earth",   label: "Earth",        primary: "#431407", accent: "#ea580c" },
];

// HSL values for CSS injection
const SCHEME_CSS: Record<string, string> = {
  default: "",
  forest:  "--primary: 142 62% 20%; --primary-foreground: 0 0% 100%; --primary-hover: 142 62% 28%; --accent: 141 72% 37%; --accent-hover: 141 72% 32%; --gradient-primary: linear-gradient(135deg,hsl(142 62% 18%),hsl(142 62% 28%)); --gradient-accent: linear-gradient(135deg,hsl(141 72% 35%),hsl(120 72% 44%)); --gradient-hero: linear-gradient(140deg,hsl(142 62% 14%) 0%,hsl(142 55% 22%) 55%,hsl(120 55% 32%) 100%);",
  slate:   "--primary: 215 28% 17%; --primary-foreground: 0 0% 100%; --primary-hover: 215 28% 26%; --accent: 239 84% 67%; --accent-hover: 239 84% 60%; --gradient-primary: linear-gradient(135deg,hsl(215 28% 14%),hsl(215 28% 24%)); --gradient-accent: linear-gradient(135deg,hsl(239 84% 65%),hsl(250 84% 72%)); --gradient-hero: linear-gradient(140deg,hsl(215 28% 12%) 0%,hsl(215 22% 20%) 55%,hsl(239 60% 40%) 100%);",
  rose:    "--primary: 343 80% 28%; --primary-foreground: 0 0% 100%; --primary-hover: 343 80% 36%; --accent: 347 77% 60%; --accent-hover: 347 77% 52%; --gradient-primary: linear-gradient(135deg,hsl(343 80% 24%),hsl(343 80% 34%)); --gradient-accent: linear-gradient(135deg,hsl(347 77% 58%),hsl(355 77% 65%)); --gradient-hero: linear-gradient(140deg,hsl(343 80% 18%) 0%,hsl(343 72% 28%) 55%,hsl(347 60% 45%) 100%);",
  ocean:   "--primary: 200 80% 22%; --primary-foreground: 0 0% 100%; --primary-hover: 200 80% 30%; --accent: 199 89% 48%; --accent-hover: 199 89% 42%; --gradient-primary: linear-gradient(135deg,hsl(200 80% 18%),hsl(200 80% 28%)); --gradient-accent: linear-gradient(135deg,hsl(199 89% 46%),hsl(188 89% 54%)); --gradient-hero: linear-gradient(140deg,hsl(200 80% 14%) 0%,hsl(200 72% 22%) 55%,hsl(199 60% 38%) 100%);",
  earth:   "--primary: 17 85% 16%; --primary-foreground: 0 0% 100%; --primary-hover: 17 85% 24%; --accent: 25 95% 45%; --accent-hover: 25 95% 38%; --gradient-primary: linear-gradient(135deg,hsl(17 85% 14%),hsl(17 85% 22%)); --gradient-accent: linear-gradient(135deg,hsl(25 95% 43%),hsl(35 95% 52%)); --gradient-hero: linear-gradient(140deg,hsl(17 85% 12%) 0%,hsl(17 78% 20%) 55%,hsl(25 72% 36%) 100%);",
};

const RADIUS_OPTIONS = [
  { id: "sharp",  label: "Sharp",   value: "0.25rem" },
  { id: "medium", label: "Medium",  value: "0.625rem" },
  { id: "round",  label: "Rounded", value: "1rem" },
];

type AppearanceMode = "light" | "dark" | "system";

function applyScheme(id: string) {
  const existing = document.getElementById("__theme_vars__");
  const el = existing ?? document.createElement("style");
  el.id = "__theme_vars__";
  const css = SCHEME_CSS[id];
  el.textContent = css ? `:root { ${css} }` : "";
  if (!existing) document.head.appendChild(el);
}

function applyDark(mode: AppearanceMode) {
  const root = document.documentElement;
  if (mode === "dark") root.classList.add("dark");
  else if (mode === "light") root.classList.remove("dark");
  else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    prefersDark ? root.classList.add("dark") : root.classList.remove("dark");
  }
}

function applyRadius(value: string) {
  document.documentElement.style.setProperty("--radius", value);
}

// ── Component ─────────────────────────────────────────────────────────────────
export function ThemeCustomizer() {
  const [open, setOpen] = useState(false);
  const [scheme, setScheme] = useState("default");
  const [mode, setMode] = useState<AppearanceMode>("light");
  const [radius, setRadius] = useState("medium");

  const handleScheme = (id: string) => { setScheme(id); applyScheme(id); };
  const handleMode = (m: AppearanceMode) => { setMode(m); applyDark(m); };
  const handleRadius = (id: string, value: string) => { setRadius(id); applyRadius(value); };

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-2xl bg-accent shadow-elegant text-white flex items-center justify-center hover:bg-accent-hover transition-colors"
        aria-label="Customize theme"
      >
        <Settings2 className="h-5 w-5" />
      </button>

      {/* Panel */}
      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" onClick={() => setOpen(false)} />

          <div className="fixed bottom-20 right-6 z-50 w-72 rounded-2xl border border-border bg-card shadow-elegant animate-slide-up overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div>
                <div className="text-sm font-semibold">Customize</div>
                <div className="text-xs text-muted-foreground">Personalize your experience</div>
              </div>
              <button onClick={() => setOpen(false)} className="h-7 w-7 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5 space-y-5">

              {/* Appearance */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Appearance</div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "light",  icon: Sun,     label: "Light" },
                    { id: "dark",   icon: Moon,    label: "Dark" },
                    { id: "system", icon: Monitor, label: "System" },
                  ].map(({ id, icon: Icon, label }) => (
                    <button key={id} onClick={() => handleMode(id as AppearanceMode)}
                      className={cn(
                        "flex flex-col items-center gap-1.5 py-3 rounded-xl border text-xs font-medium transition-all",
                        mode === id ? "border-accent bg-accent/10 text-accent" : "border-border hover:border-accent/40 text-muted-foreground"
                      )}>
                      <Icon className="h-4 w-4" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color scheme */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Color scheme</div>
                <div className="grid grid-cols-3 gap-2">
                  {COLOR_SCHEMES.map(({ id, label, primary, accent }) => (
                    <button key={id} onClick={() => handleScheme(id)}
                      className={cn(
                        "relative flex flex-col items-center gap-2 py-3 px-2 rounded-xl border text-xs transition-all",
                        scheme === id ? "border-accent bg-accent/5" : "border-border hover:border-accent/30"
                      )}>
                      {/* Swatch */}
                      <div className="flex gap-0.5">
                        <div className="h-4 w-4 rounded-full" style={{ backgroundColor: primary }} />
                        <div className="h-4 w-4 rounded-full" style={{ backgroundColor: accent }} />
                      </div>
                      <span className={cn("leading-tight text-center", scheme === id ? "text-accent font-medium" : "text-muted-foreground")}>{label}</span>
                      {scheme === id && (
                        <div className="absolute top-1.5 right-1.5 h-3.5 w-3.5 rounded-full bg-accent flex items-center justify-center">
                          <Check className="h-2 w-2 text-white" strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Border radius */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Corner radius</div>
                <div className="flex gap-2">
                  {RADIUS_OPTIONS.map(({ id, label, value }) => (
                    <button key={id} onClick={() => handleRadius(id, value)}
                      className={cn(
                        "flex-1 py-2 text-xs font-medium border transition-all",
                        id === "sharp" ? "rounded" : id === "medium" ? "rounded-lg" : "rounded-full",
                        radius === id ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:border-accent/40"
                      )}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset */}
              <button
                onClick={() => {
                  handleScheme("default");
                  handleMode("light");
                  handleRadius("medium", "0.625rem");
                }}
                className="w-full py-2 text-xs text-muted-foreground hover:text-foreground border border-border rounded-xl hover:border-accent/30 transition-colors">
                Reset to defaults
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
