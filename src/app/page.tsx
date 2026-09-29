import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, Train } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";

const courses = [
  {
    name: "季節のショートコース",
    price: "6,800円",
    description: "前菜からデザートまで、軽めに楽しめるコースです。",
  },
  {
    name: "KASANEコース",
    price: "9,500円",
    description: "旬の魚と野菜、炭火の肉料理を楽しむ定番コースです。",
  },
  {
    name: "シェフのおまかせ",
    price: "13,000円",
    description: "その日の仕入れに合わせて内容を組み立てます。",
  },
];

const assetBasePath = process.env.GITHUB_ACTIONS === "true" ? "/kasane-dining" : "";

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "KASANE",
        image: "https://kyouichitani-cloud.github.io/kasane-dining/images/hero-kasane.webp",
  servesCuisine: "Contemporary Japanese",
  priceRange: "¥¥¥",
  address: {
    "@type": "PostalAddress",
    streetAddress: "北浜2-8-12",
    addressLocality: "大阪市中央区",
    addressRegion: "大阪府",
    postalCode: "541-0041",
    addressCountry: "JP",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "17:30",
      closes: "22:30",
    },
  ],
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <Image
            className="hero-image"
            src={`${assetBasePath}/images/hero-kasane.webp`}
            alt="青を基調とした店内で、季節の魚料理を楽しむダイニング風景"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero-scrim" />
          <div className="hero-content shell">
            <div className="hero-copy">
              <h1 id="hero-title">
                <span className="heading-line">旬を味わい、</span>
                <span className="heading-line">夜をゆっくり。</span>
              </h1>
              <p className="hero-lead">
                <span className="heading-line">炭火と発酵で仕立てる季節のコース。</span>
                <span className="heading-line">記念日にも、ふだんの夜にも。</span>
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/reservation">
                  席を予約する
                  <ArrowRight aria-hidden="true" size={19} />
                </Link>
                <Link className="text-link" href="#menu">
                  コースを見る
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="concept" className="concept-section section-pad">
          <div className="shell concept-grid">
            <Reveal className="concept-title-wrap">
              <h2>
                <span className="heading-line">おいしい時間を、</span>
                <span className="heading-line">もっと気軽に。</span>
              </h2>
            </Reveal>
            <Reveal className="concept-copy" delay={0.08}>
              <p>
                素材に合わせて火を入れ、発酵の酸味や香りを重ねる。KASANEは、季節の味と会話をゆっくり楽しむ店です。
              </p>
            </Reveal>
          </div>
        </section>

        <section id="menu" className="menu-section section-pad" aria-labelledby="menu-title">
          <div className="shell menu-layout">
            <Reveal className="menu-visual">
              <div className="menu-visual-frame">
                <Image
                  src={`${assetBasePath}/images/course-wagyu.webp`}
                  alt="炭火で焼いた和牛と季節野菜の一皿"
                  fill
                  sizes="(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 44vw"
                />
              </div>
            </Reveal>

            <div className="menu-content">
              <Reveal>
                <h2 id="menu-title">3つのコース</h2>
                <p className="section-intro">軽めのコースから、おまかせまで。表示価格は1名様分・税込です。</p>
              </Reveal>

              <div className="course-list">
                {courses.map((course, index) => (
                  <Reveal key={course.name} delay={index * 0.05}>
                    <article className="course-item">
                      <div>
                        <h3>{course.name}</h3>
                        <p>{course.description}</p>
                      </div>
                      <span>{course.price}</span>
                    </article>
                  </Reveal>
                ))}
              </div>

              <Reveal>
                <Link className="button button-outline" href="/reservation">
                  席を予約する
                  <ArrowRight aria-hidden="true" size={19} />
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="space" className="space-section" aria-labelledby="space-title">
          <div className="space-image-wrap">
            <Image
              src={`${assetBasePath}/images/open-kitchen.webp`}
              alt="料理人の仕事を間近に見られる青いオープンキッチン"
              fill
              sizes="100vw"
            />
          </div>
          <div className="shell space-copy-wrap">
            <Reveal className="space-copy">
              <h2 id="space-title">
                <span className="heading-line">料理が生まれる、</span>
                <span className="heading-line">すぐそばで。</span>
              </h2>
              <p>
                カウンターでは、調理の音や香りも料理の一部に。テーブル席では、会話をゆっくり楽しめます。
              </p>
            </Reveal>
          </div>
        </section>

        <section id="access" className="access-section section-pad" aria-labelledby="access-title">
          <div className="shell access-layout">
            <div>
              <h2 id="access-title">お店のご案内</h2>
              <p className="access-lead">北浜駅から徒歩4分。川沿いの静かな通りにあります。</p>
            </div>
            <dl className="access-details">
              <div>
                <dt><MapPin aria-hidden="true" size={22} />住所</dt>
                <dd>大阪府大阪市中央区北浜2-8-12</dd>
              </div>
              <div>
                <dt><Train aria-hidden="true" size={22} />交通</dt>
                <dd>北浜駅 2番出口より徒歩4分</dd>
              </div>
              <div>
                <dt><Clock aria-hidden="true" size={22} />営業時間</dt>
                <dd>17:30〜22:30／月曜定休</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="final-cta" aria-labelledby="final-cta-title">
          <div className="shell final-cta-inner">
            <div>
              <h2 id="final-cta-title">席のご予約</h2>
              <p>日付・時間・コースをお選びください。</p>
            </div>
            <Link className="button button-primary" href="/reservation">
              席を予約する
              <ArrowRight aria-hidden="true" size={19} />
            </Link>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <div className="footer-brand">
            <strong>KASANE</strong>
            <span>大阪・北浜</span>
          </div>
          <div className="footer-links">
            <Link href="/privacy">プライバシーポリシー</Link>
            <Link href="/reservation">席を予約する</Link>
          </div>
          <p>掲載内容はポートフォリオ用のサンプルです。</p>
        </div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }} />
    </>
  );
}
