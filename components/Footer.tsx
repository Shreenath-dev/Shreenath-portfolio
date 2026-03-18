export default function Footer() {
  return (
    <footer className="border-t border-[#2a2a2a] py-8 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-display text-lg text-[#f0ead6]">
          SS<span className="text-[#f5a623]">.</span>
        </span>
        <p className="font-mono text-xs text-[#555] tracking-widest">
          © {new Date().getFullYear()} Shreenath Subramanian. Built with Next.js & Tailwind.
        </p>
        <a
          href="#"
          className="font-mono text-xs tracking-widest uppercase text-[#555] hover:text-[#f5a623] transition-colors"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
