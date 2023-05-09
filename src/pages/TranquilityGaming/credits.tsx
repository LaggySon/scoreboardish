import styles from "../../styles/TranquilityGaming/credits.module.scss";
import Image from "next/image";
import useSWR from "swr";
import { env } from "../../env/client.mjs";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
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

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const URL = env.NEXT_PUBLIC_URL;
const API = URL + "/api/sheets";

const Credits = (props: any) => {
  const { data } = useSWR(API, fetcher, {
    refreshWhenHidden: true,
    refreshInterval: 10000,
  });

  const slides = [
    "https://www.tranquility.gg/package/digitize/Credits/creditsOW2Tracer.png",
    "https://www.tranquility.gg/package/digitize/Credits/creditsOW2Reinhardt.png",
    "https://www.tranquility.gg/package/digitize/Credits/creditsOW2ReaperWidow.png",
  ];

  //TIMER STUFF
  dayjs.extend(duration);

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
            --team1PrimaryColor: var(--tranqBlue);
            --team1SecondaryColor: var(--tranqYellow);
            --team2PrimaryColor: var(--tranqYellow);
            --team2SecondaryColor: var(--tranqBlue);
            font-family: "Industry";
            font-weight: normal;
          }
        `}
      </style>
      <Image
        src="https://www.tranquility.gg/package/digitize/Credits/CreditsBlank.png"
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
              width={1150}
            ></Image>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.infos}>
        {data?.twitch.map((staff: TwitchStaff, index: number) => (
          <div key={index} className={styles.staff}>
            <span className={styles.title}>{staff.title}</span>
            <div>
              <span className={styles.name}>{staff.name}</span>
              {/* <span className={styles.social}>{"(" + staff.social + ")"}</span> */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Credits;
