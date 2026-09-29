"use client";

import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

const links = [
  { href: "/#concept", label: "KASANEについて" },
  { href: "/#menu", label: "料理" },
  { href: "/#space", label: "空間" },
  { href: "/#access", label: "アクセス" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="KASANE ホーム">
          <span>KASANE</span>
          <small>季節のダイニング</small>
        </Link>

        <nav className="desktop-nav" aria-label="メインナビゲーション">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link className="header-reserve" href="/reservation">
          席を予約する
        </Link>

        <button
          className="menu-button"
          type="button"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={25} weight="regular" /> : <List size={27} weight="regular" />}
        </button>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="モバイルナビゲーション">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              {link.label}
            </Link>
          ))}
          <Link className="mobile-reserve" href="/reservation" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            席を予約する
          </Link>
        </nav>
      </div>
    </header>
  );
}
