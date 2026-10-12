import React from 'react';
import { Nav } from './Nav';
import { Hero } from './Hero';
import { Problem } from './Problem';
import { Workflow } from './Workflow';
import { Demo } from './Demo';
import { Offline } from './Offline';
import { Languages } from './Languages';
import { Prioritization } from './Prioritization';
import { Architecture } from './Architecture';
import { Closing } from './Closing';
import { Footer } from './Footer';

export function Landing() {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main-content" className="flex-1">
        <Hero />
        <Problem />
        <Workflow />
        <Demo />
        <Offline />
        <Languages />
        <Prioritization />
        <Architecture />
        <Closing />
      </main>
      <Footer />
    </div>
  );
}
