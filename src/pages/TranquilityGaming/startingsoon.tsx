import styles from "../../styles/TranquilityGaming/startingSoon.module.scss";
import Image from "next/image";
import useSWR from "swr";
import { env } from "../../env/client.mjs";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import advancedFormat from "dayjs/plugin/advancedFormat";

import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectFade,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { useRouter } from "next/router";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const URL = env.NEXT_PUBLIC_URL;
const API = URL + `/api/sheets`;

const StartingSoon = (props: any) => {
  //Get URL parameters
  const router = useRouter();
  const [query, setQuery] = useState({ sheet: "" });
  useEffect(() => {
    if (!router.isReady) return;
    const { sheet } = router.query;
    setQuery({ sheet: String(sheet) });
  }, [router.isReady, router.query]);

  const { data } = useSWR(API + `?sheet=${query?.sheet}`, fetcher, {
    refreshWhenHidden: true,
    refreshInterval: 10000,
  });

  const slides = [
    "https://www.tranquility.gg/package/digitize/StartingSoon/Foreground1.png",
    "https://www.tranquility.gg/package/digitize/StartingSoon/Foreground2.png",
    "https://www.tranquility.gg/package/digitize/StartingSoon/Foreground3.png",
    "https://www.tranquility.gg/package/digitize/StartingSoon/Foreground4.png",
    "https://www.tranquility.gg/package/digitize/StartingSoon/Foreground5.png",
    "https://www.tranquility.gg/package/digitize/StartingSoon/Foreground6.png",
    "https://www.tranquility.gg/package/digitize/StartingSoon/Foreground7.png",
    "https://www.tranquility.gg/package/digitize/StartingSoon/Foreground8.png",
    "https://www.tranquility.gg/package/digitize/StartingSoon/Foreground9.png",
    "https://www.tranquility.gg/package/digitize/StartingSoon/Foreground10.png",
    "https://www.tranquility.gg/package/digitize/StartingSoon/Foreground11.png",
    "https://www.tranquility.gg/package/digitize/StartingSoon/Foreground12.png",
  ];
  //TIMER STUFF
  dayjs.extend(duration);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(advancedFormat);

  const endTime = dayjs(data?.match?.dateTime * 1000 - 120000);

  const [dayjsLeft, setDayjsLeft] = useState(
    dayjs.duration(endTime.diff(dayjs()))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const diffMilli = endTime.diff(dayjs());
      if (diffMilli > 0) {
        setDayjsLeft(dayjs.duration(diffMilli));
      } else {
        setDayjsLeft(dayjs.duration(0));
      }
    }, 250);
    return () => clearInterval(interval);
  });

  if (!data) {
    return <>Loading...</>;
  }
  return (
    <>
      <style jsx global>
        {`
          :root {
            --team1PrimaryColor: ${data?.teams?.team1.primaryCol ??
            "var(--tranqBlue)"};
            --team1SecondaryColor: ${data?.teams?.team1.secondaryCol ??
            "var(--tranqBlue)"};
            --team2PrimaryColor: ${data?.teams?.team2.primaryCol ??
            "var(--tranqYellow)"};
            --team2SecondaryColor: ${data?.teams?.team2.secondaryCol ??
            "var(--tranqYellow)"};
            font-family: "Industry";
            font-weight: normal;
            --tickerduration: ${(15 * data?.match?.ticker1.length) / 40}s;
          }
        `}
      </style>
      <Image
        src="https://www.tranquility.gg/package/digitize/StartingSoon/Background.png"
        alt="background"
        height={1080}
        width={1920}
        className={styles.backgroundImage}
      ></Image>
      <Swiper
        modules={[
          EffectFade,
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          Autoplay,
        ]}
        spaceBetween={50}
        slidesPerView={1}
        fadeEffect={{
          crossFade: true,
        }}
        autoplay={{
          delay: 10000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        // navigation
        effect={"fade"}
        speed={1000}
        // pagination={{ clickable: true }}
        loop
        className={styles.slider}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Image
              key={index}
              src={slide}
              alt="Foreground"
              height={1080}
              width={1920}
            ></Image>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.infos}>
        <span className={styles.name1}>{data?.teams?.team1?.short}</span>
        <span className={styles.name2}>{data?.teams?.team2?.short}</span>
        <span className={styles.info1}>{data?.teams?.team1?.info}</span>
        <span className={styles.info2}>{data?.teams?.team2?.info}</span>
        <span className={styles.casterName1}>
          <span>{"Play By Play"}</span>
          {
            data?.twitch?.find(
              (staff: TwitchStaff) => staff.title === "Play By Play"
            ).name
          }
        </span>
        <span className={styles.casterName2}>
          <span>{"Analyst"}</span>
          {
            data?.twitch?.find(
              (staff: TwitchStaff) => staff.title === "Analyst"
            ).name
          }
        </span>
        <div className={styles.otherStaff}>
          {data?.twitch
            ?.filter(
              (staff: TwitchStaff) =>
                !["Play By Play", "Analyst"].includes(staff.title) && staff.name
            )
            .slice(0, 2)
            .map((staff: TwitchStaff, index: number) => (
              <span key={index} className={styles.otherStaffName}>
                <span>{staff.title}</span>
                {staff.name}
              </span>
            ))}
        </div>
        <Image
          src={data?.teams?.team1.logoPath}
          alt="team 1 logo"
          height="600"
          width="600"
          className={styles.logo1}
        ></Image>
        <Image
          src={data?.teams?.team2.logoPath}
          alt="team 1 logo"
          height="600"
          className={styles.logo2}
          width="600"
        ></Image>
        <div className={styles.startingTimer}>{dayjsLeft.format("mm:ss")}</div>
        <div className={styles.hwrap}>
          <div className={styles.hmove}>
            <div className={styles.hitem}>{data?.match?.ticker1}</div>
          </div>
        </div>
        <div className={styles.matchInfo}>
          <div className={styles.title}>{data?.match?.addInfo}</div>
          <div className={styles.dateTime}>
            {dayjs(data?.match?.dateTime * 1000)
              .tz("America/New_York")

              .format("ddd, MMM D, YYYY @ h:mm a")}
          </div>
          <div className={styles.tier}>
            {data?.match?.tier +
              (["harmony", "discord", "transcendence"].includes(
                data?.match?.tier.toLowerCase()
              )
                ? " tier"
                : "")}
          </div>
        </div>
      </div>
    </>
  );
};

export default StartingSoon;
