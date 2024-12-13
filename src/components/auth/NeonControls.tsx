import { Slider } from "@/components/ui/slider";
import { NeonControlsProps } from "./types";

export const NeonControls = ({
  neonIntensity, setNeonIntensity,
  blurRadius, setBlurRadius,
  colorMix, setColorMix,
  pulseSpeed, setPulseSpeed,
  spreadRadius, setSpreadRadius,
  textGlow, setTextGlow,
  borderWidth, setBorderWidth,
  colorSaturation, setColorSaturation,
  colorHue, setColorHue,
  animationPhase, setAnimationPhase
}: NeonControlsProps) => {
  return (
    <div className="mb-8 p-4 rounded-lg bg-black/20 backdrop-blur-sm">
      <h2 className="text-white text-sm mb-4 font-medium">Neon Controls</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs text-white/70">Neon Intensity</label>
          <Slider
            value={[neonIntensity]}
            onValueChange={(value) => setNeonIntensity(value[0])}
            min={0}
            max={50}
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
            max={100}
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
            max={3000}
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
            max={100}
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
            max={50}
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
            max={20}
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
  );
};