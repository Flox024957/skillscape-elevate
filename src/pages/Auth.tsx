import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NeonControls } from "@/components/auth/NeonControls";

const Auth = () => {
  const navigate = useNavigate();
  const [neonIntensity, setNeonIntensity] = useState(25);
  const [blurRadius, setBlurRadius] = useState(40);
  const [colorMix, setColorMix] = useState(60);
  const [pulseSpeed, setPulseSpeed] = useState(2000);
  const [spreadRadius, setSpreadRadius] = useState(30);
  const [textGlow, setTextGlow] = useState(15);
  const [borderWidth, setBorderWidth] = useState(3);
  const [colorSaturation, setColorSaturation] = useState(80);
  const [colorHue, setColorHue] = useState(220);
  const [animationPhase, setAnimationPhase] = useState(45);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--neon-intensity', `${neonIntensity}px`);
    root.style.setProperty('--blur-radius', `${blurRadius}px`);
    root.style.setProperty('--color-mix', `${colorMix}%`);
    root.style.setProperty('--pulse-speed', `${pulseSpeed}ms`);
    root.style.setProperty('--spread-radius', `${spreadRadius}px`);
    root.style.setProperty('--text-glow', `${textGlow}px`);
    root.style.setProperty('--border-width', `${borderWidth}px`);
    root.style.setProperty('--color-saturation', `${colorSaturation}%`);
    root.style.setProperty('--color-hue', `${colorHue}deg`);
    root.style.setProperty('--animation-phase', `${animationPhase}deg`);
  }, [neonIntensity, blurRadius, colorMix, pulseSpeed, spreadRadius, textGlow, borderWidth, colorSaturation, colorHue, animationPhase]);

  return (
    <div className="min-h-screen bg-futuristic-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass-panel p-8">
          <h1 className="text-4xl font-semibold text-center mb-8 futuristic-text">
            Welcome to FLAP
          </h1>
          
          <NeonControls
            neonIntensity={neonIntensity}
            setNeonIntensity={setNeonIntensity}
            blurRadius={blurRadius}
            setBlurRadius={setBlurRadius}
            colorMix={colorMix}
            setColorMix={setColorMix}
            pulseSpeed={pulseSpeed}
            setPulseSpeed={setPulseSpeed}
            spreadRadius={spreadRadius}
            setSpreadRadius={setSpreadRadius}
            textGlow={textGlow}
            setTextGlow={setTextGlow}
            borderWidth={borderWidth}
            setBorderWidth={setBorderWidth}
            colorSaturation={colorSaturation}
            setColorSaturation={setColorSaturation}
            colorHue={colorHue}
            setColorHue={setColorHue}
            animationPhase={animationPhase}
            setAnimationPhase={setAnimationPhase}
          />

          <SupabaseAuth 
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#00A3FF',
                    brandAccent: '#9D4EDD',
                    inputBackground: '#1A1F35',
                    inputText: '#FFFFFF',
                    inputBorder: '#00A3FF40',
                    inputBorderFocus: '#9D4EDD',
                    inputBorderHover: '#00A3FF',
                  },
                  space: {
                    inputPadding: '16px',
                    buttonPadding: '16px',
                  },
                  borderWidths: {
                    buttonBorderWidth: '0px',
                    inputBorderWidth: '1px',
                  },
                  radii: {
                    borderRadiusButton: '12px',
                    buttonBorderRadius: '12px',
                    inputBorderRadius: '12px',
                  },
                  fonts: {
                    bodyFontFamily: `ui-rounded, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,
                    buttonFontFamily: `ui-rounded, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,
                    inputFontFamily: `ui-rounded, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,
                  },
                },
              },
              className: {
                container: 'auth-container',
                button: 'auth-button bg-gradient-to-r from-futuristic-blue to-futuristic-violet hover:opacity-90 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300',
                input: 'auth-input bg-futuristic-gray/30 backdrop-blur-md text-white border border-futuristic-blue/20 focus:border-futuristic-violet/50 rounded-xl px-4 py-3 w-full transition-all duration-300',
                label: 'auth-label block text-sm font-medium text-white/80 mb-2',
                loader: 'auth-loader border-t-2 border-futuristic-blue',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;