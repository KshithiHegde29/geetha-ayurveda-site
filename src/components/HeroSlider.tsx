"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    title: "Publish Ayurveda Articles",
    text: "Share free and premium content for students, practitioners, and researchers.",
  },
  {
    title: "WhatsApp-Based Premium Access",
    text: "Simple, personal workflow: request, pay, receive PDF via WhatsApp.",
  },
  {
    title: "Support Pharma & Colleges",
    text: "Formulations, case studies, and research collaboration to advance Ayurveda.",
  },
];

export function HeroSlider() {
  return (
    <div className="rounded-2xl overflow-hidden border border-eggplant/10 shadow-md">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
      >
        {slides.map((s) => (
          <SwiperSlide key={s.title}>
            <div className="min-h-[240px] bg-surface flex flex-col">
              <div className="h-2 w-full bg-gradient-to-r from-butter via-salmon to-eggplant" />
              <div className="p-8 flex flex-col justify-center">
                <h2 className="text-2xl font-semibold text-black tracking-wide">{s.title}</h2>
                <p className="mt-3 max-w-2xl text-muted">{s.text}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
