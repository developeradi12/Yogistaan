
type SectionLabelProps = {
  children: React.ReactNode;
  center: string;
};


const SectionLabel = ({ children, center }: SectionLabelProps) => {
  return (
    <div
      className={`flex items-center gap-2 text-[11.5px] font-medium tracking-[0.15em] uppercase text-[#C4622A] mb-3 ${center ? "justify-center" : ""}`}
    >
      <span className="w-5 h-px bg-[#C4622A]" />
      {children}
      <span className="w-5 h-px bg-[#C4622A]" />
    </div>
  );
};

export default SectionLabel;
