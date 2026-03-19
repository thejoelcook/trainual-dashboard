export default function Footer() {
  return (
    <footer className="h-[60px] min-h-[60px] bg-white border-t border-gray-100 flex items-center justify-between px-6 pr-10">
      {/* Trainual logo */}
      <div className="text-primary font-semibold italic text-sm opacity-40">
        Trainual
      </div>
      {/* Links */}
      <div className="flex items-center gap-4 text-sm text-gray">
        <a href="#" className="hover:text-foreground">Terms</a>
        <span className="text-gray-300">|</span>
        <a href="#" className="hover:text-foreground">Privacy</a>
      </div>
    </footer>
  );
}
