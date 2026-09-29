import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = { title: "プライバシーポリシー" };

export default function PrivacyPage() {
  return (
    <main id="main-content" className="legal-page">
      <header className="subpage-header shell">
        <Link className="brand" href="/" aria-label="KASANE ホーム">
          <span>KASANE</span>
          <small>季節のダイニング</small>
        </Link>
      </header>
      <article className="legal-content shell">
        <p className="section-label">Privacy</p>
        <h1>プライバシーポリシー</h1>
        <p>KASANEでは、ご予約の確認とご連絡に必要な範囲で、お客様の個人情報を取り扱います。</p>
        <h2>利用目的</h2>
        <p>予約内容の確認、ご来店前後の連絡、アレルギーやご要望への対応のために利用します。</p>
        <h2>情報の管理</h2>
        <p>取得した情報は適切に管理し、法令に基づく場合を除き、本人の同意なく第三者へ提供しません。</p>
        <h2>お問い合わせ</h2>
        <p>個人情報の確認や削除をご希望の場合は、店舗へお電話でお問い合わせください。</p>
        <p className="demo-note">こちらはサンプルサイト用の文章です。</p>
        <Link className="back-link" href="/reservation"><ArrowLeft aria-hidden="true" size={18} />予約フォームへ戻る</Link>
      </article>
    </main>
  );
}
