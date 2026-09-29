import type { Metadata } from "next";
import Link from "next/link";
import { ReservationForm } from "@/components/reservation-form";

export const metadata: Metadata = {
  title: "席のご予約",
  description: "KASANEの予約フォームです。ご希望の日付、時間、コースを選んでお申し込みください。",
};

export default function ReservationPage() {
  return (
    <main id="main-content" className="reservation-page">
      <header className="subpage-header shell">
        <Link className="brand" href="/" aria-label="KASANE ホーム">
          <span>KASANE</span>
          <small>季節のダイニング</small>
        </Link>
      </header>
      <div className="shell reservation-intro">
        <p className="section-label">Reservation</p>
        <h1>席のご予約</h1>
        <p>入力には約3分かかります。途中まで入力した内容は、確認が終わるまでこの端末に保存されます。</p>
      </div>
      <div className="shell">
        <ReservationForm />
      </div>
    </main>
  );
}
