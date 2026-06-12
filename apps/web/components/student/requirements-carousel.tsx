"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import {
  getBrightFuturesTiers,
  getCategoryGoals,
  getGraduationRequirement,
  getVerifiedHours,
  getVerifiedHoursByCategory,
} from "@/lib/compliance";
import { useStudentData } from "@/lib/student-data";
import { ProgressRing } from "@/components/student/progress-ring";
import type { CategoryKey } from "@/lib/types/student";

const SPRING_EASING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const TRANSITION_MS = 550;
const AUTO_ADVANCE_MS = 6000;
const SWIPE_THRESHOLD = 40;
const SWIPE_VELOCITY = 0.35;
const AXIS_LOCK_PX = 10;

const categoryLabels: Record<CategoryKey, string> = {
  community: "Community",
  environment: "Environment",
  education: "Education",
};

type SlideKind = "graduation" | "silver" | "gold" | "categories";

interface RequirementSlide {
  id: SlideKind;
  eyebrow: string;
  title: string;
  logged: number;
  required: number;
  background: string;
}

function getStatus(logged: number, required: number) {
  if (logged >= required) {
    return { label: "Complete", className: "bg-success/15 text-success" };
  }
  if (logged >= required * 0.6) {
    return { label: "On track", className: "bg-white/60 text-icon-sky" };
  }
  return { label: "Behind", className: "bg-white/60 text-flagged" };
}

function CategoryRows({
  verifiedByCategory,
  categoryGoals,
}: {
  verifiedByCategory: Record<CategoryKey, number>;
  categoryGoals: Record<CategoryKey, number>;
}) {
  return (
    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
      {(Object.keys(categoryGoals) as CategoryKey[]).map((key) => {
        const logged = verifiedByCategory[key];
        const goal = categoryGoals[key];
        const pct = Math.round((logged / goal) * 100);

        return (
          <div key={key} className="min-w-0">
            <div className="mb-1 flex items-center justify-between gap-2 text-[11px]">
              <span className="truncate font-semibold">{categoryLabels[key]}</span>
              <span className="shrink-0 text-muted">
                {logged}/{goal}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-pill bg-white/50">
              <div
                className={`h-full rounded-pill ${key === "environment" ? "bg-icon-sky" : key === "education" ? "bg-icon-pink" : "bg-primary"}`}
                style={{ width: `${Math.min(pct, 100)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RequirementActions() {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-3">
      <Link
        href="/log-hours"
        data-no-swipe
        className="group flex items-center gap-3 rounded-pill bg-ink-button py-2.5 pl-5 pr-2.5 text-[14px] font-semibold text-white transition hover:bg-black"
      >
        Log Hours
        <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-ink transition group-hover:translate-x-0.5">
          <Plus size={15} strokeWidth={2.5} />
        </span>
      </Link>
      <Link
        href="/events"
        data-no-swipe
        className="flex items-center gap-2 rounded-pill bg-white/70 px-5 py-2.5 text-[14px] font-semibold text-ink backdrop-blur transition hover:bg-white"
      >
        Find Events
        <ArrowRight size={15} strokeWidth={2.5} />
      </Link>
    </div>
  );
}

export function RequirementsCarousel() {
  const { hoursLog, student } = useStudentData();
  const state = student.schoolState;
  const graduationRequired = getGraduationRequirement(state);
  const brightFutures = getBrightFuturesTiers(state);
  const categoryGoals = getCategoryGoals(state);
  const verifiedHours = getVerifiedHours(hoursLog);
  const verifiedByCategory = getVerifiedHoursByCategory(hoursLog);
  const totalCategoryGoal = Object.values(categoryGoals).reduce(
    (sum, goal) => sum + goal,
    0,
  );
  const totalCategoryLogged = Object.values(verifiedByCategory).reduce(
    (sum, hours) => sum + hours,
    0,
  );

  const slides = useMemo<RequirementSlide[]>(() => {
    const eyebrow = brightFutures
      ? "FL Bright Futures · Graduation Service Requirement"
      : "Graduation Service Requirement";

    const base: RequirementSlide[] = [
      {
        id: "graduation",
        eyebrow,
        title: `You're ${verifiedHours} of ${graduationRequired} hours toward graduation`,
        logged: verifiedHours,
        required: graduationRequired,
        background: "linear-gradient(135deg, #F3F2EE 0%, #E8E6E0 100%)",
      },
    ];

    if (brightFutures) {
      base.push(
        {
          id: "silver",
          eyebrow,
          title: `You're ${verifiedHours} of ${brightFutures.silver} hours toward Silver`,
          logged: verifiedHours,
          required: brightFutures.silver,
          background: "linear-gradient(135deg, #ECEFF3 0%, #C5CED8 100%)",
        },
        {
          id: "gold",
          eyebrow,
          title: `You're ${verifiedHours} of ${brightFutures.gold} hours toward Gold`,
          logged: verifiedHours,
          required: brightFutures.gold,
          background: "linear-gradient(135deg, #FFF8E7 0%, #FFD87A 100%)",
        },
      );
    }

    base.push({
      id: "categories",
      eyebrow,
      title: "Category breakdown by service type",
      logged: totalCategoryLogged,
      required: totalCategoryGoal,
      background:
        "linear-gradient(135deg, #DDF0FB 0%, rgba(0, 196, 204, 0.28) 100%)",
    });

    return base;
  }, [
    brightFutures,
    graduationRequired,
    totalCategoryGoal,
    totalCategoryLogged,
    verifiedHours,
  ]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const pointerStartX = useRef(0);
  const pointerStartY = useRef(0);
  const pointerStartTime = useRef(0);
  const pointerId = useRef<number | null>(null);
  const dragAxis = useRef<"none" | "x" | "y">("none");
  const isDraggingRef = useRef(false);
  const slideCount = slides.length;

  const isInteractiveTarget = useCallback((target: EventTarget | null) => {
    if (!(target instanceof Element)) {
      return false;
    }
    return Boolean(target.closest("a, button, input, textarea, [data-no-swipe]"));
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) {
        return;
      }
      const next = ((index % slideCount) + slideCount) % slideCount;
      setIsAnimating(true);
      setActiveIndex(next);
      setDragOffset(0);
      window.setTimeout(() => setIsAnimating(false), TRANSITION_MS);
    },
    [isAnimating, slideCount],
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  const finishDrag = useCallback(
    (delta: number, elapsedMs: number) => {
      isDraggingRef.current = false;
      setIsDragging(false);
      pointerId.current = null;
      dragAxis.current = "none";

      const velocity = Math.abs(delta) / Math.max(elapsedMs, 1);
      const shouldAdvance =
        Math.abs(delta) > SWIPE_THRESHOLD ||
        (velocity > SWIPE_VELOCITY && Math.abs(delta) > 16);

      if (shouldAdvance) {
        if (delta < 0) {
          goNext();
        } else {
          goPrev();
        }
        return;
      }

      setIsAnimating(true);
      setDragOffset(0);
      window.setTimeout(() => setIsAnimating(false), TRANSITION_MS);
    },
    [goNext, goPrev],
  );

  const beginDrag = useCallback(
    (clientX: number, clientY: number, id: number, target: EventTarget) => {
      if (isAnimating || isDraggingRef.current || isInteractiveTarget(target)) {
        return false;
      }
      isDraggingRef.current = true;
      pointerStartX.current = clientX;
      pointerStartY.current = clientY;
      pointerStartTime.current = performance.now();
      pointerId.current = id;
      dragAxis.current = "none";
      setIsDragging(true);
      setIsPaused(true);
      return true;
    },
    [isAnimating, isInteractiveTarget],
  );

  const updateDrag = useCallback((clientX: number, clientY: number) => {
    if (!isDraggingRef.current || pointerId.current === null) {
      return;
    }

    const deltaX = clientX - pointerStartX.current;
    const deltaY = clientY - pointerStartY.current;

    if (dragAxis.current === "none") {
      if (
        Math.abs(deltaX) < AXIS_LOCK_PX &&
        Math.abs(deltaY) < AXIS_LOCK_PX
      ) {
        return;
      }
      dragAxis.current =
        Math.abs(deltaX) > Math.abs(deltaY) ? "x" : "y";
    }

    if (dragAxis.current === "y") {
      isDraggingRef.current = false;
      setIsDragging(false);
      setDragOffset(0);
      pointerId.current = null;
      dragAxis.current = "none";
      return;
    }

    setDragOffset(deltaX);
  }, []);

  const endDrag = useCallback(
    (clientX: number) => {
      if (!isDraggingRef.current || pointerId.current === null) {
        return;
      }
      const delta = clientX - pointerStartX.current;
      const elapsed = performance.now() - pointerStartTime.current;
      finishDrag(dragAxis.current === "x" ? delta : 0, elapsed);
      window.setTimeout(() => setIsPaused(false), 800);
    },
    [finishDrag],
  );

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) {
      return;
    }
    const started = beginDrag(
      event.clientX,
      event.clientY,
      event.pointerId,
      event.target,
    );
    if (!started) {
      return;
    }
    setIsPaused(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerId.current !== event.pointerId) {
      return;
    }
    updateDrag(event.clientX, event.clientY);
    if (dragAxis.current === "x") {
      event.preventDefault();
    }
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerId.current !== event.pointerId) {
      return;
    }
    event.currentTarget.releasePointerCapture(event.pointerId);
    endDrag(event.clientX);
  };

  const handlePointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return;
    }
    event.currentTarget.releasePointerCapture(event.pointerId);
    finishDrag(0, 0);
    window.setTimeout(() => setIsPaused(false), 800);
  };

  useEffect(() => {
    const node = containerRef.current;
    if (!node) {
      return;
    }

    const onTouchMove = (event: TouchEvent) => {
      if (dragAxis.current !== "x" || pointerId.current === null) {
        return;
      }
      const touch = event.touches[0];
      if (!touch) {
        return;
      }
      updateDrag(touch.clientX, touch.clientY);
      event.preventDefault();
    };

    node.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => node.removeEventListener("touchmove", onTouchMove);
  }, [updateDrag]);

  useEffect(() => {
    if (isPaused || isDragging) {
      return;
    }

    const timer = window.setInterval(() => {
      setIsAnimating(true);
      setActiveIndex((current) => (current + 1) % slideCount);
      window.setTimeout(() => setIsAnimating(false), TRANSITION_MS);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, isDragging, slideCount]);

  useEffect(() => {
    if (activeIndex >= slideCount) {
      setActiveIndex(0);
    }
  }, [activeIndex, slideCount]);

  if (!slides[activeIndex]) {
    return null;
  }

  return (
    <section className="relative mb-6">
      <div
        ref={containerRef}
        className={`relative overflow-hidden rounded-card shadow-raised touch-pan-y ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ touchAction: "pan-y" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => window.setTimeout(() => setIsPaused(false), 800)}
      >
        <div className="pointer-events-none absolute right-4 top-4 z-10 flex items-center gap-2">
          <button
            type="button"
            data-no-swipe
            onClick={goPrev}
            aria-label="Previous requirement"
            className="pointer-events-auto grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-white/80 text-ink shadow-card backdrop-blur transition hover:text-primary"
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            data-no-swipe
            onClick={goNext}
            aria-label="Next requirement"
            className="pointer-events-auto grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-primary text-white shadow-card transition hover:bg-primary-deep"
          >
            <ChevronRight size={16} strokeWidth={2.5} />
          </button>
        </div>

        <div
          className="flex select-none"
          style={{
            transform: `translateX(calc(-${activeIndex * 100}% + ${dragOffset}px))`,
            transition: isDragging
              ? "none"
              : `transform ${TRANSITION_MS}ms ${SPRING_EASING}`,
          }}
        >
          {slides.map((slide, index) => {
            const status = getStatus(slide.logged, slide.required);
            const pct = Math.round((slide.logged / slide.required) * 100);
            const isActive = index === activeIndex;
            const remaining = Math.max(0, slide.required - slide.logged);

            return (
              <article
                key={slide.id}
                className="w-full shrink-0 px-10 py-9 pb-12"
                style={{ background: slide.background }}
                aria-hidden={!isActive}
              >
                <div
                  className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 ${
                    isActive && !isDragging ? "requirement-card-active" : ""
                  }`}
                >
                  <div className="min-w-0 flex-1 pr-16">
                    <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-muted">
                      {slide.eyebrow}
                    </p>

                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h3 className="max-w-xl text-[28px] font-extrabold leading-[1.12] text-ink lg:text-[32px]">
                        {slide.title}
                      </h3>
                      <span
                        className={`rounded-pill px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </div>

                    <p className="max-w-md text-[14px] text-muted">
                      {slide.id === "categories"
                        ? `${slide.logged} of ${slide.required} category hours logged.`
                        : remaining > 0
                          ? `Just ${remaining} more hours to go — only verified hours count.`
                          : "Requirement complete — great work!"}
                      {brightFutures && slide.id === "graduation"
                        ? ` Gold: ${brightFutures.gold} hrs · Silver: ${brightFutures.silver} hrs.`
                        : null}
                    </p>

                    <div className="mt-3 h-1.5 max-w-md overflow-hidden rounded-pill bg-white/50">
                      <div
                        className="h-full rounded-pill bg-primary"
                        style={{
                          width: `${Math.min(pct, 100)}%`,
                          transition: `width ${TRANSITION_MS}ms ${SPRING_EASING}`,
                        }}
                      />
                    </div>

                    {slide.id === "categories" ? (
                      <CategoryRows
                        verifiedByCategory={verifiedByCategory}
                        categoryGoals={categoryGoals}
                      />
                    ) : null}

                    {status.label === "Behind" ? <RequirementActions /> : null}
                  </div>

                  <div className="hidden shrink-0 sm:block">
                    <ProgressRing
                      size="compact"
                      hoursLogged={slide.logged}
                      hoursRequired={slide.required}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex items-center justify-center gap-2">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.id}
              type="button"
              data-no-swipe
              onClick={() => goTo(slideIndex)}
              aria-label={`Go to ${slide.title}`}
              aria-current={slideIndex === activeIndex ? "true" : undefined}
              className={`pointer-events-auto cursor-pointer rounded-pill transition-all duration-300 ${
                slideIndex === activeIndex
                  ? "h-2 w-6 bg-primary"
                  : "h-2 w-2 bg-black/20 hover:bg-primary/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
