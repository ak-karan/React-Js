import { useEffect, useState } from "react";
import { ThemeProvider } from "./contexts/ThemeMode";
import ThemeBtn from "./components/ThemeBtn";
import Card from "./components/Card";

function App() {
  const [themeMode, setThemeMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  const lightMode = () => setThemeMode("light");
  const darkMode = () => setThemeMode("dark");

  // Logic 1: Jab bhi themeMode badle (Manual ya Auto), HTML class aur LocalStorage update karo
  useEffect(() => {
    const html = document.querySelector('html');
    html.classList.remove('light', 'dark');
    html.classList.add(themeMode);
    
    // Save to localStorage so it persists on refresh
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  // Logic 2: System preference changes ko listen karo
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      // Agar user ne manually koi setting nahi ki hai, tabhi auto-switch karo
      if (!localStorage.getItem("theme")) {
        setThemeMode(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <ThemeProvider value={{ themeMode, lightMode, darkMode }}>
      {/* Container mein dark mode background colors add kiye hain */}
      <div className="flex flex-wrap min-h-screen items-center bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-5">
            <ThemeBtn />
          </div>
          <div className="w-full max-w-sm mx-auto">
            <Card />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;