 "use client";

import { useState } from "react";
import { sampleJourneys } from "../../lib/sample-content";

export default function AdminHomePage() {
  const journey = sampleJourneys[0];
  const [selectedLevelId, setSelectedLevelId] = useState(
    journey.levels[0]?.id ?? null,
  );
  const selectedLevel = journey.levels.find((l) => l.id === selectedLevelId);

  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {journey.title}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage journeys, levels, lessons, and activities for your English
            learning app.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-[220px,1fr] gap-6">
        {/* Levels list */}
        <aside className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Levels
          </h2>
          <div className="space-y-1">
            {journey.levels.map((level) => {
              const isActive = level.id === selectedLevelId;
              return (
                <button
                  key={level.id}
                  type="button"
                  onClick={() => setSelectedLevelId(level.id)}
                  className={[
                    "block w-full rounded-md px-3 py-2 text-left text-sm transition",
                    isActive
                      ? "bg-slate-800 text-slate-50"
                      : "bg-slate-900 text-slate-300 hover:bg-slate-800/70",
                  ].join(" ")}
                >
                  <div className="font-medium">{level.title}</div>
                  {level.description && (
                    <div className="mt-0.5 text-xs text-slate-400 line-clamp-2">
                      {level.description}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Lessons + activities for selected level */}
        <main className="space-y-4">
          {selectedLevel ? (
            <>
              <div>
                <h2 className="text-lg font-semibold">{selectedLevel.title}</h2>
                {selectedLevel.description && (
                  <p className="mt-1 text-sm text-slate-400">
                    {selectedLevel.description}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                {selectedLevel.lessons.map((lesson) => (
                  <article
                    key={lesson.id}
                    className="rounded-xl border border-slate-800 bg-slate-900/70 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-semibold">
                          {lesson.title}
                        </h3>
                        {lesson.objective && (
                          <p className="mt-1 text-xs text-slate-400">
                            {lesson.objective}
                          </p>
                        )}
                      </div>
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-400">
                        Published
                      </span>
                    </div>

                    <ul className="mt-3 space-y-1 text-xs text-slate-300">
                      {lesson.activities.map((activity) => (
                        <li
                          key={activity.id}
                          className="flex items-center justify-between rounded-md bg-slate-900 px-2 py-1"
                        >
                          <span className="font-semibold">
                            {activity.type}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Story #{activity.order}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-slate-400">
              Select a level on the left to view its lessons and activities.
            </p>
          )}
        </main>
      </div>
    </section>
  );
}
