"use client";
import useScrollReveal from '../hooks/useScrollReveal';
import Hero from '../components/sections/Hero';
import MeetTheHost from '../components/sections/MeetTheHost';
import Speakers from '../components/sections/Speakers';
import Benefits from '../components/sections/Benefits';
import Membership from '../components/sections/Membership';
import Partners from '../components/sections/Partners';
import Gallery from '../components/sections/Gallery';
import Faq from '../components/sections/Faq';

export default function Home() {
  useScrollReveal('home');

  return (
    <>
      <Hero />
      <MeetTheHost />
      <Speakers />
      <Partners />
      <Benefits />
      <Membership />
      <Gallery />
      <Faq />
    </>
  );
}
