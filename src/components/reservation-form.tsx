"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle, X } from "@phosphor-icons/react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type FormState = {
  date: string;
  time: string;
  guests: string;
  course: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  privacy: boolean;
};

type ErrorState = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  date: "",
  time: "",
  guests: "2",
  course: "",
  name: "",
  email: "",
  phone: "",
  message: "",
  privacy: false,
};

const weekdayTimes = ["17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"];
const sundayTimes = ["17:30", "18:00", "18:30", "19:00", "19:30"];
const storageKey = "kasane-reservation-draft";

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function ReservationForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<ErrorState>({});
  const [status, setStatus] = useState<"idle" | "sending" | "complete">("idle");
  const [storageReady, setStorageReady] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const privacyTriggerRef = useRef<HTMLButtonElement>(null);
  const privacyCloseRef = useRef<HTMLButtonElement>(null);
  const minDate = getLocalDateString();

  useEffect(() => {
    const restoreDraft = window.setTimeout(() => {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          setForm({ ...initialState, ...JSON.parse(saved) });
        } catch {
          localStorage.removeItem(storageKey);
        }
      }
      setStorageReady(true);
    }, 0);

    return () => window.clearTimeout(restoreDraft);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    localStorage.setItem(storageKey, JSON.stringify(form));
  }, [form, storageReady]);

  useEffect(() => {
    if (!privacyOpen) return;
    const previousOverflow = document.body.style.overflow;
    const trigger = privacyTriggerRef.current;
    document.body.style.overflow = "hidden";
    privacyCloseRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPrivacyOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      trigger?.focus();
    };
  }, [privacyOpen]);

  const selectedDay = form.date ? new Date(`${form.date}T12:00:00`).getDay() : null;
  const availableTimes = useMemo(() => {
    if (selectedDay === 0) return sundayTimes;
    if (selectedDay === 1) return [];
    return weekdayTimes;
  }, [selectedDay]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => {
      const next = { ...current, [key]: value };
      localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function handleDateChange(value: string) {
    const day = value ? new Date(`${value}T12:00:00`).getDay() : null;
    const times = day === 0 ? sundayTimes : day === 1 ? [] : weekdayTimes;
    setForm((current) => {
      const next = { ...current, date: value, time: times.includes(current.time) ? current.time : "" };
      localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
    setErrors((current) => ({ ...current, date: undefined, time: undefined }));
  }

  function validate(): keyof FormState | null {
    const nextErrors: ErrorState = {};
    if (!form.date) nextErrors.date = "予約希望日を選んでください。";
    else if (selectedDay === 1) nextErrors.date = "月曜日は定休日です。別の日を選んでください。";
    else if (form.date < minDate) nextErrors.date = "本日以降の日付を選んでください。";
    if (!form.time && selectedDay !== 1) nextErrors.time = "予約希望時間を選んでください。";
    if (!form.course) nextErrors.course = "コースを選んでください。";
    if (!form.name.trim()) nextErrors.name = "お名前を入力してください。";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "メールアドレスを正しく入力してください。";
    if (!/^[0-9+\-\s]{10,}$/.test(form.phone)) nextErrors.phone = "電話番号を正しく入力してください。";
    if (!form.privacy) nextErrors.privacy = "内容を確認し、同意してください。";
    setErrors(nextErrors);
    return (Object.keys(nextErrors)[0] as keyof FormState | undefined) ?? null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const firstError = validate();
    if (firstError) {
      requestAnimationFrame(() => {
        const target = firstError === "course"
          ? document.querySelector<HTMLInputElement>("input[name='course']")
          : firstError === "privacy"
            ? document.querySelector<HTMLInputElement>("input[type='checkbox']")
            : document.getElementById(firstError);
        target?.focus();
      });
      return;
    }
    setStatus("sending");
    await new Promise((resolve) => setTimeout(resolve, 650));
    localStorage.removeItem(storageKey);
    setStatus("complete");
  }

  if (status === "complete") {
    return (
      <section className="form-complete" aria-live="polite">
        <CheckCircle size={44} weight="regular" aria-hidden="true" />
        <h2>入力内容を確認しました</h2>
        <p>こちらはデモのため、実際の予約送信は行われません。</p>
        <Link className="button button-primary" href="/">
          ホームへ戻る
        </Link>
      </section>
    );
  }

  return (
    <form className="reservation-form" onSubmit={handleSubmit} noValidate>
      <section className="form-section" aria-labelledby="visit-heading">
        <div className="form-section-heading">
          <h2 id="visit-heading">日時と人数</h2>
          <p>予約できる時間は、日付ごとに変わります。</p>
        </div>
        <div className="form-grid three-columns">
          <div className="field">
            <label htmlFor="date">予約希望日 <span>必須</span></label>
            <input
              id="date"
              name="date"
              type="date"
              min={minDate}
              value={form.date}
              onChange={(event) => handleDateChange(event.target.value)}
              aria-invalid={Boolean(errors.date)}
              aria-describedby={errors.date ? "date-error" : undefined}
            />
            {errors.date && <p className="field-error" id="date-error">{errors.date}</p>}
          </div>
          <div className="field">
            <label htmlFor="time">予約希望時間 <span>必須</span></label>
            <select
              id="time"
              name="time"
              value={form.time}
              onChange={(event) => updateField("time", event.target.value)}
              disabled={!form.date || selectedDay === 1}
              aria-invalid={Boolean(errors.time)}
              aria-describedby={errors.time ? "time-error" : undefined}
            >
              <option value="">時間を選ぶ</option>
              {availableTimes.map((time) => <option key={time} value={time}>{time}</option>)}
            </select>
            {errors.time && <p className="field-error" id="time-error">{errors.time}</p>}
          </div>
          <div className="field">
            <label htmlFor="guests">利用人数 <span>必須</span></label>
            <select id="guests" name="guests" value={form.guests} onChange={(event) => updateField("guests", event.target.value)}>
              {[1, 2, 3, 4, 5, 6].map((count) => <option key={count} value={count}>{count}名</option>)}
            </select>
          </div>
        </div>
      </section>

      <section className="form-section" aria-labelledby="course-heading">
        <div className="form-section-heading">
          <h2 id="course-heading">コース</h2>
          <p>コース内容は、当日の仕入れ状況により変更になる場合があります。アレルギーや苦手な食材がある方は、ご要望欄にご記入ください。</p>
        </div>
        <fieldset className="course-options" aria-invalid={Boolean(errors.course)} aria-describedby={errors.course ? "course-error" : undefined}>
          <legend className="sr-only">希望するコース</legend>
          {coursesForForm.map((course) => (
            <label key={course.value} className={form.course === course.value ? "is-selected" : ""}>
              <input
                type="radio"
                name="course"
                value={course.value}
                checked={form.course === course.value}
                onChange={(event) => updateField("course", event.target.value)}
              />
              <span><strong>{course.name}</strong><small>{course.price}</small></span>
            </label>
          ))}
        </fieldset>
        {errors.course && <p className="field-error" id="course-error">{errors.course}</p>}
      </section>

      <section className="form-section" aria-labelledby="contact-heading">
        <div className="form-section-heading">
          <h2 id="contact-heading">お客様情報</h2>
          <p>ご予約内容の確認とご連絡のために使用します。</p>
        </div>
        <div className="form-grid two-columns">
          <div className="field">
            <label htmlFor="name">お名前 <span>必須</span></label>
            <input id="name" name="name" autoComplete="name" value={form.name} onChange={(event) => updateField("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
            {errors.name && <p className="field-error" id="name-error">{errors.name}</p>}
          </div>
          <div className="field">
            <label htmlFor="phone">電話番号 <span>必須</span></label>
            <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} />
            {errors.phone && <p className="field-error" id="phone-error">{errors.phone}</p>}
          </div>
          <div className="field span-two">
            <label htmlFor="email">メールアドレス <span>必須</span></label>
            <input id="email" name="email" type="email" inputMode="email" autoComplete="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
            {errors.email && <p className="field-error" id="email-error">{errors.email}</p>}
          </div>
          <div className="field span-two">
            <label htmlFor="message">アレルギー・ご要望 <small>任意</small></label>
            <textarea id="message" name="message" rows={4} value={form.message} onChange={(event) => updateField("message", event.target.value)} />
          </div>
        </div>
      </section>

      <div className="consent-wrap">
        <button ref={privacyTriggerRef} className="privacy-trigger" type="button" onClick={() => setPrivacyOpen(true)}>
          プライバシーポリシーを確認する
        </button>
        <label className="consent-label" htmlFor="privacy-consent">
          <input id="privacy-consent" type="checkbox" checked={form.privacy} onChange={(event) => updateField("privacy", event.target.checked)} aria-invalid={Boolean(errors.privacy)} aria-describedby={errors.privacy ? "privacy-error" : undefined} />
          <span>入力情報の取り扱いに同意します。</span>
        </label>
        {errors.privacy && <p className="field-error" id="privacy-error">{errors.privacy}</p>}
      </div>

      <div className="form-actions">
        <Link className="back-link" href="/"><ArrowLeft aria-hidden="true" size={18} />ホームへ戻る</Link>
        <button className="button button-primary submit-button" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "確認しています" : "入力内容を確認する"}
        </button>
      </div>

      {privacyOpen && (
        <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setPrivacyOpen(false);
        }}>
          <section className="privacy-dialog" role="dialog" aria-modal="true" aria-labelledby="privacy-dialog-title">
            <button ref={privacyCloseRef} className="dialog-close" type="button" onClick={() => setPrivacyOpen(false)} aria-label="プライバシーポリシーを閉じる">
              <X aria-hidden="true" size={24} />
            </button>
            <h2 id="privacy-dialog-title">プライバシーポリシー</h2>
            <div className="dialog-copy">
              <h3>利用目的</h3>
              <p>予約内容の確認、ご来店前後の連絡、アレルギーやご要望への対応のために利用します。</p>
              <h3>情報の管理</h3>
              <p>取得した情報は適切に管理し、法令に基づく場合を除き、本人の同意なく第三者へ提供しません。</p>
              <h3>お問い合わせ</h3>
              <p>個人情報の確認や削除をご希望の場合は、店舗へお電話でお問い合わせください。</p>
              <p className="demo-note">こちらはサンプルサイト用の文章です。</p>
            </div>
            <button className="button button-primary" type="button" onClick={() => setPrivacyOpen(false)}>
              内容を確認した
            </button>
          </section>
        </div>
      )}
    </form>
  );
}

const coursesForForm = [
  { value: "short", name: "季節のショートコース", price: "6,800円" },
  { value: "standard", name: "KASANEコース", price: "9,500円" },
  { value: "chef", name: "シェフのおまかせ", price: "13,000円" },
];
