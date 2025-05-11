import React from 'react'
import LandingPageCTA from './LandingPageCTA'

const LandingPageBody = () => {
  return (
    <div className="w-full overflow-hidden h-full bg-background text-foreground flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center text-center py-4">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 max-w-3xl">
          Plan Sprints Like You’re Playing Poker at the Big Table
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl">
          Estimate tasks, assign stories, and bet your points like a strategist.
          Bring fun, focus, and firepower to your agile planning sessions.
        </p>
        <div className="flex gap-4">
          <LandingPageCTA />
        </div>
      </main>

      <section className="bg-muted py-6 px-6 w-full overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-4">Why SprintPoker?</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
            Sprint planning can be dry. Poker brings estimation, anonymity, and consensus-driven scoring.
            Level up your retros and keep your team engaged.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              {
                title: "Estimate Like a Pro",
                desc: "Turn story points into strategic bets with interactive voting.",
              },
              {
                title: "Stay Synchronized",
                desc: "Real-time room-based planning keeps everyone in sync, remote or in-office.",
              },
              {
                title: "Data-Driven Delivery",
                desc: "Export scores, track consensus, and improve iteration by iteration.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-background p-6 rounded-2xl border border-border shadow-sm hover:shadow transition"
              >
                <h4 className="text-lg font-medium mb-2">{feature.title}</h4>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="h-[65px] border-t px-2 border-border justify-center items-center flex text-sm text-muted-foreground">
        Built for dev teams who play to win 🃏
      </footer>
    </div>
  )
}

export default LandingPageBody