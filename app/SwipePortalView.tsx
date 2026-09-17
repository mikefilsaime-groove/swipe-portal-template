"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { type Campaign, type Swipe } from "./swipe-data";
import { type PortalConfig } from "./portal-config";

type SwipePortalViewProps = {
  config: PortalConfig;
  brands: string[];
  campaigns: Campaign[];
};

type ScheduledEntry = {
  campaign: Campaign;
  swipe: Swipe;
};

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function parseDateKey(key: string) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(date: Date, amount: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function startOfWeek(date: Date) {
  return addDays(date, -date.getDay());
}

function buildMonthCells(year: number, month: number) {
  const first = new Date(year, month, 1);
  const start = addDays(first, -first.getDay());
  return Array.from({ length: 42 }, (_, index) => addDays(start, index));
}

function ordinal(value: number) {
  const remainder100 = value % 100;
  if (remainder100 >= 11 && remainder100 <= 13) return `${value}th`;
  if (value % 10 === 1) return `${value}st`;
  if (value % 10 === 2) return `${value}nd`;
  if (value % 10 === 3) return `${value}rd`;
  return `${value}th`;
}

function formatStartDate(key: string) {
  const date = parseDateKey(key);
  return `${date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
  })} ${ordinal(date.getDate())}`;
}

function buildEmailSource(html: string) {
  const wrapper = document.createElement("div");
  wrapper.setAttribute(
    "style",
    "max-width:680px;font-family:Arial,Helvetica,sans-serif;font-size:17px;line-height:1.65;color:#202124;"
  );
  wrapper.innerHTML = html.trim();

  wrapper.querySelectorAll("p").forEach((element) => {
    element.setAttribute("style", "margin:0 0 18px;");
  });
  wrapper.querySelectorAll("ul").forEach((element) => {
    element.setAttribute("style", "margin:0 0 22px;padding-left:24px;");
  });
  wrapper.querySelectorAll("li").forEach((element) => {
    element.setAttribute("style", "margin:0 0 8px;");
  });
  wrapper.querySelectorAll("a").forEach((element) => {
    element.setAttribute("style", "color:#166534;text-decoration:underline;");
  });

  return wrapper.outerHTML;
}

export default function SwipePortalView({ config, brands, campaigns }: SwipePortalViewProps) {
  const [today] = useState(() => new Date());
  const todayKey = toDateKey(today);
  const [brand, setBrand] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [channel, setChannel] = useState<"email" | "text">("email");
  const [view, setView] = useState<"month" | "week">("month");
  const [selectedDate, setSelectedDate] = useState(todayKey);
  const [displayMonth, setDisplayMonth] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const [weekStart, setWeekStart] = useState(startOfWeek(today));
  const [copyMessage, setCopyMessage] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedBrand = params.get("brand");
    const requestedCampaign = params.get("campaign");
    const requestedDate = params.get("date");

    if (!requestedBrand || !requestedCampaign || !requestedDate) return;

    const deepLinkedCampaign = campaigns.find(
      (campaign) =>
        campaign.brand === requestedBrand && campaign.name === requestedCampaign
    );
    const deepLinkedSwipe = deepLinkedCampaign?.swipes.find(
      (swipe) => swipe.date === requestedDate
    );

    if (!deepLinkedCampaign || !deepLinkedSwipe) return;

    const timeoutId = window.setTimeout(() => {
      const date = parseDateKey(deepLinkedSwipe.date);
      setBrand(deepLinkedCampaign.brand);
      setCampaignName(deepLinkedCampaign.name);
      setChannel("email");
      setView("month");
      setSelectedDate(deepLinkedSwipe.date);
      setDisplayMonth({ year: date.getFullYear(), month: date.getMonth() });
      setWeekStart(startOfWeek(date));
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [campaigns]);

  const campaignOptions = useMemo(
    () => campaigns.filter((campaign) => campaign.brand === brand),
    [brand, campaigns]
  );
  const selectedCampaign = campaigns.find(
    (campaign) => campaign.brand === brand && campaign.name === campaignName
  );
  const selectedSwipe = selectedCampaign?.swipes.find(
    (swipe) => swipe.date === selectedDate
  );
  const allScheduledEntries = useMemo(
    () =>
      campaigns.flatMap((campaign) =>
        campaign.swipes.map((swipe) => ({ campaign, swipe }))
      ),
    [campaigns]
  );
  const calendarEntries: ScheduledEntry[] = useMemo(
    () =>
      selectedCampaign
        ? selectedCampaign.swipes.map((swipe) => ({ campaign: selectedCampaign, swipe }))
        : allScheduledEntries,
    [allScheduledEntries, selectedCampaign]
  );

  const monthCells = useMemo(
    () => buildMonthCells(displayMonth.year, displayMonth.month),
    [displayMonth]
  );
  const weekCells = useMemo(
    () => Array.from({ length: 7 }, (_, index) => addDays(weekStart, index)),
    [weekStart]
  );

  function moveCalendarTo(date: Date, dateKey = toDateKey(date)) {
    setSelectedDate(dateKey);
    setDisplayMonth({ year: date.getFullYear(), month: date.getMonth() });
    setWeekStart(startOfWeek(date));
  }

  function selectCalendarDate(dateKey: string, entry?: ScheduledEntry) {
    const date = parseDateKey(dateKey);
    moveCalendarTo(date, dateKey);

    if (!selectedCampaign && entry) {
      setBrand(entry.campaign.brand);
      setCampaignName(entry.campaign.name);
      setChannel("email");
    }
  }

  function handleBrandChange(nextBrand: string) {
    setBrand(nextBrand);
    setCampaignName("");
    setChannel("email");
    setView("month");
    moveCalendarTo(today, todayKey);
  }

  function handleCampaignChange(nextCampaignName: string) {
    setCampaignName(nextCampaignName);
    setChannel("email");

    const nextCampaign = campaignOptions.find(
      (campaign) => campaign.name === nextCampaignName
    );
    if (!nextCampaign) {
      moveCalendarTo(today, todayKey);
      return;
    }

    const targetDate =
      nextCampaign.swipes.find((swipe) => swipe.date === todayKey)?.date ??
      nextCampaign.startDate;
    moveCalendarTo(parseDateKey(targetDate), targetDate);
  }

  function showCopyMessage(message: string) {
    setCopyMessage(message);
    window.setTimeout(() => setCopyMessage(""), 2400);
  }

  async function copyPlain(value: string, label: string) {
    await navigator.clipboard.writeText(value);
    showCopyMessage(`${label} copied`);
  }

  async function copyHtmlSource() {
    if (!selectedSwipe) return;
    await navigator.clipboard.writeText(buildEmailSource(selectedSwipe.html));
    showCopyMessage("HTML source copied");
  }

  async function copyRichHtml() {
    if (!selectedSwipe) return;
    const html = buildEmailSource(selectedSwipe.html);
    const plain = bodyRef.current?.innerText.trim() ?? "";

    if (navigator.clipboard && window.ClipboardItem) {
      const item = new ClipboardItem({
        "text/html": new Blob([html], { type: "text/html" }),
        "text/plain": new Blob([plain], { type: "text/plain" }),
      });
      await navigator.clipboard.write([item]);
    } else {
      const onCopy = (event: ClipboardEvent) => {
        event.clipboardData?.setData("text/html", html);
        event.clipboardData?.setData("text/plain", plain);
        event.preventDefault();
      };
      document.addEventListener("copy", onCopy);
      document.execCommand("copy");
      document.removeEventListener("copy", onCopy);
    }

    showCopyMessage("Rich email copied — paste it into your email editor");
  }

  function changeMonth(amount: number) {
    const next = new Date(displayMonth.year, displayMonth.month + amount, 1);
    setDisplayMonth({ year: next.getFullYear(), month: next.getMonth() });
  }

  const calendarCells = view === "month" ? monthCells : weekCells;
  const monthTitle = new Date(displayMonth.year, displayMonth.month, 1).toLocaleDateString(
    "en-US",
    { month: "long", year: "numeric" }
  );
  const weekTitle = `${weekStart.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })} – ${addDays(weekStart, 6).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <p className="eyebrow">{config.eyebrow}</p>
          <h1>{config.title}</h1>
          <p>{config.tagline}</p>
        </div>

        <div className="top-controls">
          <label>
            <span>Brand</span>
            <select value={brand} onChange={(event) => handleBrandChange(event.target.value)}>
              <option value="">Choose a brand</option>
              {brands.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>

          <label>
            <span>Campaign</span>
            <select
              disabled={!brand || campaignOptions.length === 0}
              value={campaignName}
              onChange={(event) => handleCampaignChange(event.target.value)}
            >
              <option value="">
                {brand && campaignOptions.length === 0
                  ? "No campaigns yet"
                  : "Choose a campaign"}
              </option>
              {campaignOptions.map((campaign) => (
                <option key={campaign.name} value={campaign.name}>{campaign.name}</option>
              ))}
            </select>
          </label>
        </div>
      </header>

      <section className="campaign-heading">
        <div>
          <p className="eyebrow">
            {selectedCampaign
              ? `${selectedCampaign.brand} · ${selectedCampaign.name}`
              : "All scheduled campaigns"}
          </p>
          <h2>
            {selectedCampaign
              ? `Starting ${formatStartDate(selectedCampaign.startDate)}`
              : monthTitle}
          </h2>
        </div>

        {selectedCampaign && (
          <div className="segmented" aria-label="Swipe channel">
            <button
              className={channel === "email" ? "active" : ""}
              onClick={() => setChannel("email")}
              type="button"
            >
              Email
            </button>
            <button
              className={channel === "text" ? "active" : ""}
              onClick={() => setChannel("text")}
              type="button"
            >
              Text
            </button>
          </div>
        )}
      </section>

      {selectedCampaign && channel === "email" && (
        <nav className="sequence-tabs" aria-label={`${selectedCampaign.name} email sequence`}>
          {selectedCampaign.swipes.map((swipe) => (
            <button
              aria-selected={selectedDate === swipe.date}
              className={selectedDate === swipe.date ? "active" : ""}
              key={swipe.date}
              onClick={() => selectCalendarDate(swipe.date, { campaign: selectedCampaign, swipe })}
              role="tab"
              type="button"
            >
              <span>{swipe.day}</span>
              <small>{swipe.shortDate}</small>
            </button>
          ))}
        </nav>
      )}

      <section className="workspace">
        <aside className="calendar-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Calendar</p>
              <h3>{view === "month" ? monthTitle : weekTitle}</h3>
            </div>
            <div className="view-toggle" aria-label="Calendar view">
              <button
                className={view === "month" ? "active" : ""}
                onClick={() => setView("month")}
                type="button"
              >
                Month
              </button>
              <button
                className={view === "week" ? "active" : ""}
                onClick={() => setView("week")}
                type="button"
              >
                Week
              </button>
            </div>
          </div>

          <div className="calendar-nav">
            <button
              aria-label={view === "month" ? "Previous month" : "Previous week"}
              onClick={() =>
                view === "month" ? changeMonth(-1) : setWeekStart(addDays(weekStart, -7))
              }
              type="button"
            >
              ←
            </button>
            <button
              onClick={() => {
                setView("month");
                moveCalendarTo(today, todayKey);
              }}
              type="button"
            >
              Today
            </button>
            <button
              aria-label={view === "month" ? "Next month" : "Next week"}
              onClick={() =>
                view === "month" ? changeMonth(1) : setWeekStart(addDays(weekStart, 7))
              }
              type="button"
            >
              →
            </button>
          </div>

          <div className={`calendar-grid ${view}`}>
            {weekdayLabels.map((day) => (
              <span className="weekday" key={day}>{day}</span>
            ))}

            {calendarCells.map((date) => {
              const key = toDateKey(date);
              const entry = calendarEntries.find((item) => item.swipe.date === key);
              const outsideMonth = view === "month" && date.getMonth() !== displayMonth.month;
              const isToday = key === todayKey;
              return (
                <button
                  aria-current={isToday ? "date" : undefined}
                  aria-label={`${date.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}${entry ? `: ${entry.swipe.subject}` : ": no swipe"}`}
                  className={`${selectedDate === key ? "selected" : ""} ${
                    isToday ? "today" : ""
                  } ${entry ? "has-swipe" : ""} ${outsideMonth ? "outside" : ""}`}
                  key={key}
                  onClick={() => selectCalendarDate(key, entry)}
                  type="button"
                >
                  <span>{date.getDate()}</span>
                  {entry && <i aria-hidden="true" />}
                </button>
              );
            })}
          </div>

          <div className="calendar-legend">
            <span><i /> Swipe available</span>
            <span>Today is always highlighted</span>
          </div>
        </aside>

        {!selectedCampaign ? (
          <article className="swipe-panel empty-selection">
            <p className="eyebrow">Month calendar</p>
            <h3>No campaign selected</h3>
            <p>
              Choose a brand and campaign above, or select a marked date on the calendar
              to open its swipe copy.
            </p>
          </article>
        ) : channel === "text" ? (
          <article className="swipe-panel empty-selection">
            <p className="eyebrow">{selectedCampaign.name} · Text</p>
            <h3>No text swipes in this campaign yet.</h3>
            <p>Email swipes are ready. Text messages can be added here next.</p>
            <button className="primary-button" onClick={() => setChannel("email")} type="button">
              View email swipes
            </button>
          </article>
        ) : !selectedSwipe ? (
          <article className="swipe-panel empty-selection">
            <p className="eyebrow">{selectedCampaign.name}</p>
            <h3>No swipe scheduled for this date.</h3>
            <p>Choose one of the marked dates to open its email copy.</p>
          </article>
        ) : (
          <article className="swipe-panel">
            <div className="swipe-meta">
              <div>
                <p className="eyebrow">
                  {selectedSwipe.day}, {selectedSwipe.shortDate} · {selectedSwipe.angle}
                </p>
                <h3>{selectedSwipe.subject}</h3>
              </div>
              <span className="ready-badge">Ready to send</span>
            </div>

            <dl className="field-list">
              <div>
                <dt>From</dt>
                <dd>{config.fromName}</dd>
              </div>
              <div>
                <dt>Subject</dt>
                <dd>{selectedSwipe.subject}</dd>
                <button onClick={() => copyPlain(selectedSwipe.subject, "Subject")} type="button">
                  Copy
                </button>
              </div>
              {selectedSwipe.alternateSubject && (
                <div>
                  <dt>Alt subject</dt>
                  <dd>{selectedSwipe.alternateSubject}</dd>
                  <button
                    onClick={() => copyPlain(selectedSwipe.alternateSubject ?? "", "Alternate subject")}
                    type="button"
                  >
                    Copy
                  </button>
                </div>
              )}
              <div>
                <dt>Preview</dt>
                <dd>{selectedSwipe.preview}</dd>
                <button onClick={() => copyPlain(selectedSwipe.preview, "Preview")} type="button">
                  Copy
                </button>
              </div>
            </dl>

            <div className="copy-bar">
              <div>
                <strong>Copy the email body</strong>
                <span>Use rich copy for a visual editor or HTML source for a code editor.</span>
              </div>
              <div className="copy-actions">
                <button className="secondary-button" onClick={copyHtmlSource} type="button">
                  Copy HTML source
                </button>
                <button className="primary-button" onClick={copyRichHtml} type="button">
                  Copy rich HTML
                </button>
              </div>
            </div>

            <p className="copy-status" aria-live="polite">{copyMessage}</p>

            <div
              className="email-content"
              dangerouslySetInnerHTML={{ __html: selectedSwipe.html }}
              ref={bodyRef}
            />

            <div className="bottom-copy">
              <button className="primary-button" onClick={copyRichHtml} type="button">
                Copy rich HTML
              </button>
              <button className="secondary-button" onClick={copyHtmlSource} type="button">
                Copy HTML source
              </button>
            </div>
          </article>
        )}
      </section>
    </main>
  );
}
