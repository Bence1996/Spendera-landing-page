import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Smartphone, PieChart, Wallet, Target, ChevronRight, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PreRegistrationForm from '@/components/PreRegistrationForm'

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    {
      title: "Bevétel & kiadás követés",
      description: "Rögzítsd a tranzakcióidat másodpercek alatt. Gyorsgombok a napi szokásos kiadásokhoz, például kávéhoz vagy bérlethez.",
      icon: <Wallet className="w-6 h-6 text-primary" />
    },
    {
      title: "Kategóriák szerint",
      description: "Lakhatás, élelmiszer, közlekedés, szórakozás... saját ikonokkal, színekkel. Azonnal látod, hol áramlik el a pénzed.",
      icon: <PieChart className="w-6 h-6 text-primary" />
    },
    {
      title: "Költségkeretek",
      description: "Állíts be havi kereteket kategóriánként. Vizuális jelzés mutatja, ha közelítesz a határhoz — mielőtt túllépnéd.",
      icon: <Target className="w-6 h-6 text-primary" />
    },
    {
      title: "Havi kimutatás",
      description: "Nettó vagyon trend, havi grafikonok, kategória-eloszlás és előrejelzés a következő hónapra.",
      icon: <PieChart className="w-6 h-6 text-primary" />
    },
    {
      title: "Több számla kezelése",
      description: "Bankszámla, készpénz, megtakarítás — egy helyen, átutalással közöttük. Az összesített egyenleg mindig naprakész.",
      icon: <Wallet className="w-6 h-6 text-primary" />
    },
    {
      title: "Megtakarítási célok",
      description: "Nyaralás, új telefon, vésztartalék. Tűzz ki célokat, kövesd a haladást, és tedd félre a pénzt játszi könnyedséggel.",
      icon: <Target className="w-6 h-6 text-primary" />
    }
  ]

  const steps = [
    {
      num: "01",
      title: "Töltsd le",
      desc: "Google Play áruházból telepíted az appot telefonodra — regisztráció nélkül indulhatsz."
    },
    {
      num: "02",
      title: "Állítsd be",
      desc: "Hozd létre számláidat és kategóriáidat, add meg havi keretedet és a megtakarítási céljaidat."
    },
    {
      num: "03",
      title: "Vedd kézbe",
      desc: "Rögzítsd a tranzakciókat, kövesd a haladást, és hagyd, hogy a Spendera átlátható képet adjon a pénzügyeidről."
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
            <span className="font-display font-bold text-xl tracking-tight">Spendera</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Funkciók</a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Hogyan működik</a>
            <a href="#screens" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Képernyők</a>
            <Button className="rounded-full px-6">
              Hamarosan
            </Button>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 glass pt-24 px-6 md:hidden flex flex-col gap-6">
          <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-display font-semibold">Funkciók</a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-display font-semibold">Hogyan működik</a>
          <a href="#screens" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-display font-semibold">Képernyők</a>
          <Button className="rounded-full w-full mt-4 py-6 text-lg">
            Hamarosan
          </Button>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -z-10 opacity-50"></div>
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Smartphone className="w-4 h-4" />
                <span>Elérhető Androidra</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-[1.1] mb-6 text-balance">
                Költségvetés a <span className="text-gradient">zsebedben.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 text-balance leading-relaxed">
                A Spendera segít átlátni, hová tűnik a pénzed. Kövesd bevételeidet és kiadásaidat kategóriánként, állíts be havi kereteket, és tedd félre, amit céljaidra szánsz — egyetlen, letisztult appban.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-full h-14 px-8 text-base gap-2">
                  Hamarosan Google Play-en
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base">
                  Funkciók böngészése
                </Button>
              </div>
              
              <div className="mt-12 flex items-center gap-8 text-sm text-muted-foreground font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Korlátlan kategória</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Több valuta</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:h-[700px] flex items-center justify-center"
            >
              <div className="relative w-full max-w-[320px] aspect-[1/2] rounded-[3rem] border-[8px] border-zinc-900 bg-zinc-900 shadow-2xl overflow-hidden z-20 animate-float">
                <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80" alt="Spendera App Interface" className="w-full h-full object-cover opacity-80" />
                
                {/* Mock UI Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-white">
                    <span className="font-medium">9:41</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-4 rounded-full bg-white/80"></div>
                      <div className="w-4 h-4 rounded-full bg-white/80"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="glass-card rounded-2xl p-4 text-white">
                      <p className="text-sm opacity-80 mb-1">Egyenleg</p>
                      <h3 className="text-3xl font-display font-bold">207 780 Ft</h3>
                    </div>
                    <div className="glass-card rounded-2xl p-4 text-white">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Költségkeret</span>
                        <span className="text-sm font-medium">76%</span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[76%] rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements behind phone */}
              <div className="absolute top-1/4 -right-12 w-48 h-48 bg-violet-500/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute bottom-1/4 -left-12 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-medium tracking-wider uppercase text-sm mb-4 block">— Amit tud</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Minden, amit egy pénzügyi appnak tudnia kell!</h2>
            <p className="text-lg text-muted-foreground">Egyszerű használat, okos funkciók. A Spendera mindennapi használatra készült — Neked!</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background p-8 rounded-3xl shadow-sm border border-border/50 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-medium tracking-wider uppercase text-sm mb-4 block">— Három lépésben</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-12">Indulás egy perc alatt</h2>
              
              <div className="space-y-12">
                {steps.map((step, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-xl">
                      {step.num}
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-violet-500/20 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1616514197671-15d99ce7a6f8?auto=format&fit=crop&w=1000&q=80" 
                alt="App usage" 
                className="rounded-[3rem] shadow-2xl object-cover aspect-square"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Screens Section */}
      <section id="screens" className="py-24 bg-zinc-50 dark:bg-zinc-900/50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-medium tracking-wider uppercase text-sm mb-4 block">— Képernyők</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Letisztult felület, átlátható pénzügyek</h2>
            <p className="text-lg text-muted-foreground">Nézz bele az app használatába — ahogy a Spendera valójában kinéz majd a telefonodon.</p>
          </div>

          <div className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar">
            {[
              { title: "01 — Kezdőlap", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80" },
              { title: "02 — Tranzakciók", img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80" },
              { title: "03 — Költségkeretek", img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=600&q=80" },
              { title: "04 — Havi kimutatás", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" },
              { title: "05 — Áttekintés", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" }
            ].map((screen, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="min-w-[280px] md:min-w-[320px] snap-center flex flex-col items-center"
              >
                <div className="w-full aspect-[1/2] rounded-[2.5rem] border-[6px] border-zinc-900 bg-zinc-900 shadow-xl overflow-hidden mb-6">
                  <img src={screen.img} alt={screen.title} className="w-full h-full object-cover opacity-90" />
                </div>
                <h3 className="text-lg font-display font-semibold text-center">{screen.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-registration CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=2000&q=80')] opacity-20 mix-blend-overlay bg-cover bg-center"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 text-balance max-w-3xl mx-auto">
            Készen állsz átlátni a pénzügyeidet?
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            A Spendera hamarosan letölthető lesz a Google Play áruházban. Legyen az első, aki értesülésben részesül!
          </p>
          
          {/* Pre-registration Form */}
          <div className="mb-8">
            <PreRegistrationForm />
          </div>
          
          <p className="text-white/60 text-sm">Android 8.0 vagy újabb</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
            <span className="font-display font-bold text-xl tracking-tight">Spendera</span>
          </div>
          
          <p className="text-muted-foreground text-sm">
            © 2026 Spendera. Minden jog fenntartva.
          </p>
          
          <div className="flex gap-6 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Adatvédelem</a>
            <a href="#" className="hover:text-foreground transition-colors">Feltételek</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
