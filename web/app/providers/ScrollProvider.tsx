import React from "react";

type ScrollOptions = {
  top?: number;
  left?: number;
  behavior?: "auto" | "smooth";
};

const ScrollContext = React.createContext<{
  scrollTo: (options: ScrollOptions) => void;
} | null>(null);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const scrollableRef = React.useRef<HTMLDivElement | null>(null);

  const scrollTo = ({
    top = 0,
    left = 0,
    behavior = "smooth",
  }: ScrollOptions) => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTo({ top, left, behavior });
    }
  };

  return (
    <ScrollContext.Provider value={{ scrollTo }}>
      <div
        ref={scrollableRef}
        className="fixed top-0 left-0 w-full h-dvh overflow-y-scroll text-foreground bg-background"
      >
        {children}
      </div>
    </ScrollContext.Provider>
  );
};

export const useScrollContext = () => {
  const context = React.useContext(ScrollContext);
  if (!context) {
    throw new Error("useScrollContext must be used within ScrollProvider");
  }
  return context;
};
