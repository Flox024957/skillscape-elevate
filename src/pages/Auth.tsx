import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slider } from "@/components/ui/slider";

const Auth = () => {
  const navigate = useNavigate();
  const [neonIntensity, setNeonIntensity] = useState(15);
  const [blurRadius, setBlurRadius] = useState(30);
  const [colorMix, setColorMix] = useState(50);
  const [pulseSpeed, setPulseSpeed] = useState(50);
  const [spreadRadius, setSpreadRadius] = useState(20);
  const [textGlow, setTextGlow] = useState(10);
  const [borderWidth, setBorderWidth] = useState(2);
  const [colorSaturation, setColorSaturation] = useState(100);
  const [colorHue, setColorHue] = useState(180);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Update CSS variables when sliders change
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
        <div className="glass-panel p-8 animate-neon-pulse transition-all duration-1000">
          <h1 className="text-4xl font-semibold text-center mb-8 futuristic-text animate-fade-in">
            Welcome to FLAP
          </h1>
          
          {/* Neon Control Panel */}
          <div className="mb-8 p-4 rounded-lg bg-black/20 backdrop-blur-sm">
            <h2 className="text-white text-sm mb-4 font-medium">Neon Controls</h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs text-white/70">Neon Intensity</label>
                <Slider
                  value={[neonIntensity]}
                  onValueChange={(value) => setNeonIntensity(value[0])}
                  min={0}
                  max={30}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-white/70">Blur Radius</label>
                <Slider
                  value={[blurRadius]}
                  onValueChange={(value) => setBlurRadius(value[0])}
                  min={0}
                  max={50}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-white/70">Color Mix</label>
                <Slider
                  value={[colorMix]}
                  onValueChange={(value) => setColorMix(value[0])}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-white/70">Pulse Speed (ms)</label>
                <Slider
                  value={[pulseSpeed]}
                  onValueChange={(value) => setPulseSpeed(value[0])}
                  min={100}
                  max={2000}
                  step={100}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-white/70">Spread Radius</label>
                <Slider
                  value={[spreadRadius]}
                  onValueChange={(value) => setSpreadRadius(value[0])}
                  min={0}
                  max={50}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-white/70">Text Glow</label>
                <Slider
                  value={[textGlow]}
                  onValueChange={(value) => setTextGlow(value[0])}
                  min={0}
                  max={20}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-white/70">Border Width</label>
                <Slider
                  value={[borderWidth]}
                  onValueChange={(value) => setBorderWidth(value[0])}
                  min={0}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-white/70">Color Saturation</label>
                <Slider
                  value={[colorSaturation]}
                  onValueChange={(value) => setColorSaturation(value[0])}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-white/70">Color Hue</label>
                <Slider
                  value={[colorHue]}
                  onValueChange={(value) => setColorHue(value[0])}
                  min={0}
                  max={360}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-white/70">Animation Phase</label>
                <Slider
                  value={[animationPhase]}
                  onValueChange={(value) => setAnimationPhase(value[0])}
                  min={0}
                  max={360}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          </div>

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